"use client"

import { handleFormat } from '@/app/utils/helper'
import { DataTable } from '@/components/data-table'
import { ListSaving, SubCategoryState } from '@/types/interface'
import { Icon } from '@iconify/react/dist/iconify.js'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import DetailSavingMember from './detailSaving'

const ListSavingMember = ({ listSavings, subCategories }: { listSavings: ListSaving[], subCategories: SubCategoryState[] }) => {

    const columns: ColumnDef<ListSaving>[] = [
        {
            accessorKey: "name",
            header: "Nama",
        },
        {
            accessorKey: "position",
            header: "Jabatan",
        },
        {
            accessorKey: "total_saving",
            header: () => <div className='text-center'>Total Simpanan</div>,
            cell: ({row}) => {
                const value = Number(row.getValue('total_saving'));

                return <div className='text-center'>Rp. {handleFormat(value)}</div>
            }
        },
        {
            id: "actions",
            header: () => <div className="text-center">Detail Simpanan</div>,
            cell: ({ row }) => {
                const data = row.original;

                return <div className='flex justify-center'>
                    <DetailSavingMember data={data} subCategories={subCategories} />    
                </div>
            }
        },
    ]

    return (
        <>
            <DataTable columns={columns} data={listSavings} />
        </>
    )
}

export default ListSavingMember