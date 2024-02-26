"use client"

import { ReportLoanmember } from '@/types/interface'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { DataTable } from './data-table'
import { handleFormat } from '@/app/utils/helper'

const Content = ({ data }: { data: ReportLoanmember[] }) => {

    const columns: ColumnDef<ReportLoanmember>[] = [
        {
            accessorKey: "name",
            header: "Nama Anggota"
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
            header: "Pembayaran Bulanan",
            cell: ({ row }) => {
                const value = row.getValue('monthly');

                return <>{handleFormat(Number(value))}</>
            }
        },
    ]
    return (
        <div className='w-full'>
            <DataTable data={data} columns={columns} />
        </div>
    )
}

export default Content