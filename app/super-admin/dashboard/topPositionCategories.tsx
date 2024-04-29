"use client"

import React from 'react'
import { DataTable } from './data-table'
import { ColumnDef } from '@tanstack/react-table'
import { TopPositionCategoriesLoan } from '@/types/interface'
import { handleFormat } from '@/app/utils/helper'

const TopPositionCategories = ({ listPosition }: { listPosition: TopPositionCategoriesLoan[] }) => {
    const columns: ColumnDef<TopPositionCategoriesLoan>[] = [
        {
            accessorKey: "position",
            header: () => <div className="text-center text-xs md:text-sm lg:text-md">Posisi</div>,
            cell: ({ row }) => {
                const value: string = row.getValue("position")
                return <div className="text-xs md:text-sm lg:text-md">{value}</div>
            }
        },
        {
            accessorKey: "total",
            header: () => <div className="text-center text-xs md:text-sm lg:text-md">Total Pinjaman</div>,
            cell: ({ row }) => {
                const value: number = row.getValue('total');

                return <div className="text-xs md:text-sm lg:text-md">Rp. {handleFormat(value)}</div>
            }
        },
    ]
    return (
        <div className='w-full md:basis-1/3 bg-white rounded border p-4 shadow-md'>
            <h2 className='text-lg mb-3 text-gray-600 font-bold'>Top Melakukan Pinjaman</h2>

            <DataTable columns={columns} data={listPosition} />
        </div>
    )
}

export default TopPositionCategories
