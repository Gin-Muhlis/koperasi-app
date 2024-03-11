"use client"

import { handleFormat } from '@/app/utils/helper'
import { DataTable } from '@/components/data-table'
import { ListLoan, ListSaving, SubCategoryState } from '@/types/interface'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import DetailLoanMember from './detailLoan'

const ListLoanMember = ({ listLoan, subCategories }: { listLoan: ListLoan[], subCategories: SubCategoryState[] }) => {

    const columns: ColumnDef<ListLoan>[] = [
        {
            accessorKey: "name",
            header: "Nama",
        },
        {
            accessorKey: "position",
            header: "Jabatan",
        },
        {
            accessorKey: "total_loan",
            header: () => <div className='text-center'>Total Pinjaman</div>,
            cell: ({row}) => {
                const value = Number(row.getValue('total_loan'));

                return <div className='text-center'>Rp. {handleFormat(value)}</div>
            }
        },
        {
            id: "actions",
            header: () => <div className="text-center">Detail Pinjaman</div>,
            cell: ({ row }) => {
                const data = row.original;

                return <div className='flex justify-center'>
                    <DetailLoanMember data={data} />
                </div>
            }
        },
    ]

    return (
        <>
            <DataTable columns={columns} data={listLoan} />
        </>
    )
}

export default ListLoanMember