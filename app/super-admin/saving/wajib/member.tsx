"use client";

import { MemberState } from "@/types/interface";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { DataTable } from "./data-table";

import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch } from "react-redux";
import { appDispatch, useAppSelector } from "@/redux/store";
import { createSaving } from "@/redux/features/saving-slice";
import { Icon } from "@iconify/react/dist/iconify.js";

const Member = ({ members }: { members: MemberState[] }) => {
  const dispatch = useDispatch<appDispatch>();
  const selector = useAppSelector((state) => state.savingReducer);

  const columns: ColumnDef<MemberState>[] = [
    {
      id: "select",
      header: ({ table }) => {
        return "";
      },
      cell: ({ row }) => {
        return (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value: any) => {
              row.toggleSelected(!!value);
              let member = row.original;
              if (value) {
                const members = JSON.parse(selector.members);
                members.push(member);
                const stringMembers = JSON.stringify(members);
                dispatch(
                  createSaving({
                    type: "SET_MEMBERS",
                    value: stringMembers,
                  })
                );
              } else {
                const members = JSON.parse(selector.members);
                const newMembers = members.filter(
                  (item: any) => item.id !== member.id
                );

                const stringNewMembers = JSON.stringify(newMembers);
                dispatch(
                  createSaving({
                    type: "SET_MEMBERS",
                    value: stringNewMembers,
                  })
                );
              }
            }}
            aria-label="Select row"
          />
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Nama",
    },
    {
      accessorKey: "position",
      header: "jabatan",
    },
  ];

  return (
    <div>
      <div className="w-full grid grid-cols 1 md:grid-cols-2 gap-10">
        <div>
          <span className="text-lg font-bold">Pilih Member</span>
          <DataTable columns={columns} data={members} />
        </div>
        <div>
          <span className="text-lg font-bold inline-block mb-4">
            Member Pilihan
          </span>
          <div className="grid grid-cols-2 gap-3 mb-2">
            {JSON.parse(selector.members).length > 0 &&
              JSON.parse(selector.members).map((item: any) => (
                <div
                  key={item.id}
                  className="rounded p-2 bg-gradient-to-r from-[rgba(249,232,51,1)] to-[rgba(250,196,59,1)] sidenav flex items-center justify-start gap-4"
                >
                  <img
                    src={item.imageProfile}
                    className="w-12 h-12 object-cover rounded-full bg-white"
                  />
                  <div className="flex flex-col items-start justify-start flex-1">
                    <span className="text-sm text-black font-bold">
                      {item.name}
                    </span>
                    <span className="text-xs italic text-black">
                      {item.position}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Member;
