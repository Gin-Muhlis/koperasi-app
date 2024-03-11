"use client"

import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch } from 'react-redux';
import { appDispatch, useAppSelector } from '@/redux/store';
import { createSaving } from '@/redux/features/saving-slice';
import { DataTable } from './dataTable/data-table-add';
import { PositionCategory, Status, SubCategoryState } from '@/types/interface';
import { handleFormat } from '@/app/utils/helper';
import { Input } from '@/components/ui/input';

const ListMembers = ({ members, subCategory, positionCategories }: { members: any[], subCategory: SubCategoryState, positionCategories: PositionCategory[] }) => {
    const dispatch = useDispatch<appDispatch>();
    const selector = useAppSelector((state) => state.savingReducer);
    const [listMembers, setListmembers] = useState<any[]>(members)
    const [subCategoryName, setSubCategoryName] = useState(subCategory.name)
    const [selectedMembers, setSelectedMembers] = useState<any[]>([])
    const [typePayment, setTypePayment] = useState<string>(subCategory.type_payment)

    useEffect(() => {
        if (selector) {
            const data = JSON.parse(selector.selectedMembers)

            setSelectedMembers(data)
        }
    }, [selector, selector.selectedMembers])

    useEffect(() => {
        if (members && subCategory.type_payment == 'once') {
            const dataMembers = members.filter((member) => member.data[subCategory.name].length == 0)

            setListmembers(dataMembers)
        }
    }, [members, subCategory])

    const setStateData = (data: any[]) => {
        dispatch(
            createSaving({
                type: "SET_SELECTED_MEMBERS",
                value: JSON.stringify(data),
            })
        );
    }

    const handleValueAmount = (positionCategoryId: number, id: number) => {
        const isInputed = selectedMembers.find((data) => data.id == id)

        if (isInputed != undefined) {
            return handleFormat(isInputed.amount)
        }

        const member = members.find((member) => member.id == id)

        if (member.data[subCategoryName].amount) {
            const lastPayment = member.data[subCategoryName].amount;

            return handleFormat(lastPayment);
        }

        const defaultAmount: any = positionCategories.find((data) => data.id == positionCategoryId);
        

        const payment = defaultAmount[subCategoryName] ?? 0

        return handleFormat(Number(payment))

    }

    const handleUpdateAmount = (amount: string, id: number) => {
        const existingItemIndex = selectedMembers.findIndex(
            (item: any) => item.id === id
        );

        const numericValue = amount.replace(/\D/g, '');

        const member = members.find((member) => member.id == id);


        if (existingItemIndex >= 0) {
            const updatedItems = [...selectedMembers];
            const data = updatedItems[existingItemIndex];

            updatedItems[existingItemIndex] = { ...data, amount: Number(numericValue)};
            setStateData(updatedItems)
        } else {
            const newMembers = [
                ...selectedMembers,
                { id, name: member.name, amount: Number(numericValue) },
            ];
            setStateData(newMembers)
        }
    }

    const handlePayedMember = (dataPayments: Status[] | undefined) => {
        if (typePayment != 'monthly') {
            return false
        }
        
        const month = selector.month < 10 ? `0${selector.month}` : selector.month;
        const year = selector.year;
        let status: string | boolean = false

        dataPayments?.map((data) => {
            if (data.month_year == `${month}-${year}`) {
                status = data.status
                return
            }
        })
        return status
    }


    const handleTotalPayment = () => {
        let total = 0;

        selectedMembers.map((data) => {
            total += Number(data.amount)
        })

        return `Rp. ${handleFormat(total)}`;
    }

    const columns: ColumnDef<any>[] = [
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
                            const members = selectedMembers;

                            if (value) {
                                rows.map((item) => {
                                    if (
                                        members.find((member: any) => member.id == item.original.id)
                                    )
                                        return;

                                    const data = {
                                        'id': item.original.id,
                                        'name': item.original.name,
                                        'amount': handleValueAmount(item.original.position_category_id, item.original.id).replaceAll(".", ""),
                                    }

                                    members.push(data)
                                });

                                setStateData(members)
                            } else {
                                const newMembers = members.filter(
                                    (member: any) =>
                                        !rows.some((item) => item.original.id === member.id)
                                );

                                setStateData(newMembers)
                            }
                        }}
                        aria-label="Select all"
                    />
                );
            },
            cell: ({ row }) => {
                let member = row.original;
                const isPayed = handlePayedMember(member.data[subCategoryName].months_status)
                return (
                    <Checkbox
                        checked={row.getIsSelected()}
                        className={`${isPayed ? 'opacity-50' : ''}`}
                        disabled={isPayed ? true : false}
                        onCheckedChange={(value: any) => {
                            row.toggleSelected(!!value);
                            if (value) {
                                const members = selectedMembers;

                                const data = {
                                    'id': member.id,
                                    'name': member.name,
                                    'amount': handleValueAmount(member.position_category_id, member.id).replaceAll(".", ""),
                                }

                                members.push(data)

                                setStateData(members)
                            } else {
                                const members = selectedMembers;
                                const newMembers = members.filter(
                                    (item: any) => item.id !== member.id
                                );

                                setStateData(newMembers)
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
            cell: ({ row }) => {
                let member = row.original;
                const isPayed = handlePayedMember(member.data[subCategoryName].months_status)

                return <span className={`${isPayed ? 'opacity-50' : ''}`}>{member.name}</span>
            }
        },
        {
            accessorKey: "position",
            header: "jabatan",
            cell: ({ row }) => {
                let member = row.original;
                const isPayed = handlePayedMember(member.data[subCategoryName].months_status)

                return <span className={`${isPayed ? 'opacity-50' : ''}`}>{member.position}</span>
            }
        },
    ];


    return (
        <div className="w-full grid grid-cols 1 md:grid-cols-2 gap-10 py-5">
            <div>
                <span className="text-lg font-bold">Pilih Anggota</span>
                <DataTable
                    columns={columns}
                    data={listMembers}
                    isReset={selectedMembers.length == 0}
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
                            {selectedMembers.map(
                                (member: any, index: number) => (
                                    <tr key={member.id} className="border border-solid">
                                        <td className="text-center border border-solid p-2">
                                            {index + 1}
                                        </td>
                                        <td className="border border-solid p-2">{member.name}</td>
                                        <td className="text-center border border-solid p-2">
                                            <Input
                                                value={handleValueAmount(member.position_category_id, member.id)}
                                                onChange={(event) => handleUpdateAmount(event.target.value, member.id)}
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
                                    {handleTotalPayment()}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ListMembers