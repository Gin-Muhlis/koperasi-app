"use client";

import { MemberReceivable, MemberState } from "@/types/interface";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";

import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch } from "react-redux";
import { appDispatch, useAppSelector } from "@/redux/store";
import { convertDateFormat, handleFormat } from "@/app/utils/helper";
import { Input } from "@/components/ui/input";
import { createReceivable } from "@/redux/features/receivable-slice";

const Member = ({ members }: { members: MemberState[] }) => {
  const dispatch = useDispatch<appDispatch>();
  const selector = useAppSelector((state) => state.receivableReducer);
  const [listMembers, setListMembers] = useState<MemberReceivable[]>([]);
  const [total, setTotal] = useState(0);

  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1;
  const day = new Date().getDate()


  useEffect(() => {
    if (selector) {
      const membersData = JSON.parse(selector.members);

      setListMembers(membersData);
    }
  }, [selector, selector.members]);

  const setStateMember = (data: MemberReceivable[]) => {
    dispatch(
      createReceivable({
        type: "SET_MEMBERS",
        value: JSON.stringify(data),
      })
    );
  }

  const columns: ColumnDef<MemberState>[] = [
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
                  const date = new Date(`${year}-${month}-${day}`);
                  date.setMonth(date.getMonth() + 1)

                  const deadline = date.toISOString().slice(0, 10);

                  const dataMember = {
                    id: item.original.id,
                    name: item.original.name,
                    amount: 0,
                    date: `${year}-${month}-${day}`,
                    duration: 1,
                    deadline: deadline,
                    total: 0
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
                const date = new Date(`${year}-${month}-${day}`);
                date.setMonth(date.getMonth() + 1)

                const deadline = date.toISOString().slice(0, 10);

                const dataMember = {
                  id: member.id,
                  name: member.name,
                  amount: 0,
                  date: `${year}-${month}-${day}`,
                  duration: 1,
                  deadline: deadline,
                  total: 0
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
      header: "Nama",
    },
    {
      accessorKey: "position",
      header: "jabatan",
    },
  ];
  
  // handle value pinjaman member
  const handleAmountMember = (id: number) => {
    const member = listMembers.find((member) => member.id == id);

    return handleFormat(member?.amount as number)
  }

  // handle value duras member
  const handleDurationMember = (id: number) => {
    const member = listMembers.find((member) => member.id == id);

    return member?.duration;
  }

  // handle total pinjaman member
  const handleTotalLoanMember = (amount: number, duration: number) => {
    const interest = 1.5 / 100;

    let interestAmount = Number(amount) * Number(interest) * Number(duration)
    const total = Number(amount) + interestAmount;

    return total;
  }

  // handle input jumlah pinjaman member
  const handleInputAmount = (id: number, amount: string) => {
    const numericValue = amount.replace(/\D/g, '');
    

    const updatedMembers = [...listMembers];

    const index = updatedMembers.findIndex((member) => member.id == id);
    const data = updatedMembers[index];

    const total = handleTotalLoanMember(Number(numericValue), data.duration);

    updatedMembers[index] = { ...data, amount: Number(numericValue), total: Number(total) }

    setStateMember(updatedMembers)
  }

  // handle durasi pinjaman
  const handleDurationChange = (id: number, duration: number) => {
    const updatedMembers = [...listMembers];

    const index = updatedMembers.findIndex((member) => member.id == id);
    const data = updatedMembers[index];

    const date = new Date(data.date);
    date.setMonth(date.getMonth() + Number(duration))

    const deadline = date.toISOString().slice(0, 10);

    const total = handleTotalLoanMember(Number(data.amount), duration);

    updatedMembers[index] = { ...data, duration: Number(duration), deadline, total }
    setStateMember(updatedMembers)
  }
  console.log(selector)
  // handle deadline pinjaman member
  const handleValueDeadlineMember = (id: number) => {
    const member = listMembers.find((member) => member.id == id);

    return convertDateFormat(member?.deadline as string);
  }

  // handle total simapan member
  const handleValueTotalMember = (id: number) => {
    const member = listMembers.find((member) => member.id == id);

    return handleFormat(member?.total as number);
  }

  // handle total
  const handleTotal = () => {
    let total = 0;

    listMembers.map((member) => {
      total += member.total
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
                  <th className="border border-solid p-2">Tanggal Pinjaman</th>
                  <th className="border border-solid p-2">Jumlah Pinjaman</th>
                  <th className="border border-solid p-2">Durasi Pinjaman (Bulan)</th>
                  <th className="border border-solid p-2">Tenggat Bayar</th>
                  <th className="border border-solid p-2">Total Pinjaman</th>
                </tr>
              </thead>
              <tbody>
                {listMembers.map(
                  (member: MemberReceivable, index: number) => (
                    <tr key={member.id} className="border border-solid">
                      <td className="text-center border border-solid p-2">
                        {index + 1}
                      </td>
                      <td className="border border-solid p-2">{member.name}</td>
                      <td className="border border-solid p-2">{convertDateFormat(`${year}-${month}-${day}`)}</td>
                      <td className="border border-solid p-2">
                        <Input value={handleAmountMember(member.id)} onChange={(e) => handleInputAmount(member.id, e.target.value)} />
                      </td>
                      <td className="border border-solid p-2">
                        <Input value={handleDurationMember(member.id)} min={1} type="number" onChange={(e) => handleDurationChange(member.id, Number(e.target.value))} defaultValue={1} />
                      </td>
                      <td className="border border-solid p-2">
                      {handleValueDeadlineMember(member.id)}
                      </td>
                      <td className="border border-solid p-2">
                        {handleValueTotalMember(member.id)}
                      </td>
                    </tr>
                  )
                )}
                <tr>
                  <td colSpan={6} className="border border-solid text-center">
                    Total
                  </td>
                  <td className="border border-solid p-2">
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
