"use client";

import { SubCategoryInvoice } from "@/types/interface";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";

import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch } from "react-redux";
import { appDispatch, useAppSelector } from "@/redux/store";
import { createSaving } from "@/redux/features/saving-slice";
import { handleFormat } from "@/app/utils/helper";
import { Input } from "@/components/ui/input";

const Member = ({ members }: { members: SubCategoryInvoice[] }) => {
  const dispatch = useDispatch<appDispatch>();
  const selector = useAppSelector((state) => state.savingReducer);
  const [listMembers, setListMembers] = useState<SubCategoryInvoice[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (selector) {
      const membersData = JSON.parse(selector.members);
      let subTotal = 0;

      membersData.map((member: SubCategoryInvoice) => {
        subTotal += member.payment;
      });

      setTotal(subTotal);
      setListMembers(membersData);
    }
  }, [selector]);

  const handlePaymentMember = (id: number, amount: string) => {
    const formatValue = amount.replaceAll(".", "");

    const indexMember = listMembers.findIndex((member) => member.id == id);

    const updatedMembers = [...listMembers];
    const data = updatedMembers[indexMember];

    updatedMembers[indexMember] = { ...data, payment: Number(formatValue) };

    setListMembers(updatedMembers);

    dispatch(
      createSaving({
        type: "SET_MEMBERS",
        value: JSON.stringify(updatedMembers),
      })
    );
  };
  console.log(selector);

  const handleValuePayment = (id: number) => {
    const isInputed = listMembers.find((member) => member.id == id);

    return handleFormat(isInputed?.payment as number);
  };

  const columns: ColumnDef<SubCategoryInvoice>[] = [
    {
      id: "select",
      header: ({ table }) => {
        return (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value);
              const rows = table.getRowModel().rows;
              const members = JSON.parse(selector.members);

              if (value) {
                rows.map((item) => {
                  if (
                    members.find((member: any) => member.id == item.original.id)
                  )
                    return;

                  members.push(item.original);
                });

                dispatch(
                  createSaving({
                    type: "SET_MEMBERS",
                    value: JSON.stringify(members),
                  })
                );
              } else {
                const newMembers = members.filter(
                  (member: any) =>
                    !rows.some((item) => item.original.id === member.id)
                );

                dispatch(
                  createSaving({
                    type: "SET_MEMBERS",
                    value: JSON.stringify(newMembers),
                  })
                );
              }
            }}
            aria-label="Select all"
          />
        );
      },
      cell: ({ row }) => {
        let member = row.original;
        return (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value: any) => {
              row.toggleSelected(!!value);
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
          <span className="text-lg font-bold">Pilih Anggota</span>
          <DataTable
            columns={columns}
            data={members}
            isReset={JSON.parse(selector.members).length == 0}
          />
        </div>
        <div>
          <span className="text-lg font-bold inline-block mb-4">
            Data Pembayaran
          </span>
          <div className="w-full">
            <table className="w-full border border-solid text-sm">
              <thead>
                <tr className="border border-solid">
                  <th className="border border-solid p-2">No</th>
                  <th className="border border-solid p-2">Nama Anggota</th>
                  <th className="border border-solid p-2">Jumlah Bayar</th>
                </tr>
              </thead>
              <tbody>
                {listMembers.map(
                  (member: SubCategoryInvoice, index: number) => (
                    <tr key={member.id} className="border border-solid">
                      <td className="text-center border border-solid p-2">
                        {index + 1}
                      </td>
                      <td className="border border-solid p-2">{member.name}</td>
                      <td className="text-center border border-solid p-2">
                        <Input
                          value={handleValuePayment(member.id)}
                          onChange={(e) =>
                            handlePaymentMember(member.id, e.target.value)
                          }
                        />
                      </td>
                    </tr>
                  )
                )}
                <tr>
                  <td colSpan={2} className="border border-solid text-center">
                    Total
                  </td>
                  <td className="text-center border border-solid p-2">
                    {handleFormat(total)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Member;
