"use client";

import { MemberState } from "@/types/interface";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { DataTable } from "./data-table";

import { Checkbox } from "@/components/ui/checkbox";

const Member = ({ members }: { members: MemberState[] }) => {
  const columns: ColumnDef<MemberState>[] = [
    {
      id: "select",
          header: ({ table }) => {
          console.log(table.getFilteredSelectedRowModel());
        return (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value: any) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        );
      },
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: any) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Nama",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "address",
      header: "Alamat",
    },
    {
      accessorKey: "phone_number",
      header: "No telepon",
    },
    {
      accessorKey: "gender",
      header: "Gender",
    },
    {
      accessorKey: "position",
      header: "jabatan",
    },
    {
      accessorKey: "religion",
      header: "Agama",
    },
  ];

  return (
    <div>
      <span className="text-lg font-bold">Member</span>
      <DataTable columns={columns} data={members} />
    </div>
  );
};

export default Member;
