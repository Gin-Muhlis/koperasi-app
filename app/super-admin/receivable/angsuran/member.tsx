"use client";

import { MemberInstallment, MemberState, Receivable } from "@/types/interface";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";

import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch } from "react-redux";
import { appDispatch, useAppSelector } from "@/redux/store";
import { handleFormat } from "@/app/utils/helper";
import { createInstallment } from "@/redux/features/installment-slice";

const Member = ({ members }: { members: Receivable[] }) => {
  const dispatch = useDispatch<appDispatch>();
  const selector = useAppSelector((state) => state.installmentReducer);
  const [listMembers, setListMembers] = useState<MemberInstallment[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (selector) {
      const membersData = JSON.parse(selector.members);

      setListMembers(membersData);
    }
  }, [selector, selector.members]);

  const setStateMember = (data: MemberInstallment[]) => {
    dispatch(
      createInstallment({
        type: "SET_MEMBERS",
        value: JSON.stringify(data),
      })
    );
  }

  const columns: ColumnDef<Receivable>[] = [
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


                  const dataMember = {
                    id: item.original.id,
                    name: item.original.name,
                    amount: item.original.monthly,
                    loanId: item.original.loan_id,
                    remain_payment: item.original.remain_payment - item.original.monthly,
                    sub_category_id: item.original.sub_category_id
                  }


                  members.push(dataMember);
                });

                setStateMember(members)
              } else {
                const newMembers = members.filter(
                  (member: any) =>
                    !rows.some((item) => item.original.id === member.id)
                );

                setStateMember(newMembers)
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

                const dataMember = {
                  id: member.id,
                  name: member.name,
                  amount: member.monthly,
                  loanId: member.loan_id,
                  remain_payment: member.remain_payment - member.monthly,
                  sub_category_id: member.sub_category_id
                }

                members.push(dataMember);
                setStateMember(members)

              } else {
                const members = JSON.parse(selector.members);
                const newMembers = members.filter(
                  (item: any) => item.id !== member.id
                );

                setStateMember(newMembers)
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
      header: "Nama"
    },
    {
      accessorKey: "position",
      header: "Jabatan"
    },
    {
      accessorKey: "total_payment",
      header: "Total Pinjaman",
      cell: ({ row }) => {
        const value = row.getValue('total_payment');

        return <>{handleFormat(Number(value))}</>
      }
    },
    {
      accessorKey: "paid",
      header: "Dibayar",
      cell: ({ row }) => {
        const value = row.getValue('paid');

        return <>{handleFormat(Number(value))}</>
      }
    },
    {
      accessorKey: "remain_payment",
      header: "Sisa Pembayaran",
      cell: ({ row }) => {
        const value = row.getValue('remain_payment');

        return <>{handleFormat(Number(value))}</>
      }
    },
    {
      accessorKey: "monthly",
      header: "Pembayaran (perbulan)",
      cell: ({ row }) => {
        const value = row.getValue('monthly');

        return <>{handleFormat(Number(value))}</>
      }
    }
  ];


  // handle total
  const handleTotal = () => {
    let total = 0;

    listMembers.map((member) => {
      total += member.amount
    })

    return handleFormat(total);
  }

  return (
    <div>
      <div className="w-full">
        <div className="w-full mb-10 border-b pb-7 border-b-slate-300">
          <span className="text-lg font-bold">Pilih Anggota</span>
          <DataTable
            columns={columns}
            data={members}
            isReset={JSON.parse(selector.members).length == 0}
          />
        </div>
        <div className="w-full mb-10">
          <span className="text-lg font-bold inline-block mb-4">
            Data Pembayaran
          </span>
          <div className="w-full">
            <table className="w-full border border-solid text-sm">
              <thead>
                <tr className="border border-solid">
                  <th className="border border-solid p-2">No</th>
                  <th className="border border-solid p-2">Nama</th>
                  <th className="border border-solid p-2">Pembayaran</th>
                  <th className="border border-solid p-2">Sisa Pembayaran</th>
                  <th className="border border-solid p-2">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {listMembers.map(
                  (member: MemberInstallment, index: number) => (
                    <tr key={member.id} className="border border-solid">
                      <td className="text-center border border-solid p-2">
                        {index + 1}
                      </td>
                      <td className="text-center border border-solid p-2">
                        {member.name}
                      </td>
                      <td className="text-center border border-solid p-2">
                        {handleFormat(member.amount)}
                      </td>
                      <td className="text-center border border-solid p-2">
                        {handleFormat(member.remain_payment)}
                      </td>
                      <td className="text-center border border-solid p-2">
                        {handleFormat(member.amount)}
                      </td>
                    </tr>
                  )
                )}
                <tr>
                  <td colSpan={4} className="border border-solid text-center">
                    Total
                  </td>
                  <td className="border border-solid p-2 text-center">
                    {handleTotal()}
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
