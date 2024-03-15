"use client"

import { Badge } from '@/components/ui/badge'
import { HistoryInvoice } from '@/types/interface'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { DataTable } from './data-table'
import { capitalizeString, convertDateFormat } from '@/app/utils/helper'

const HistoryInvoices = ({ historyInvoices }: { historyInvoices: HistoryInvoice[] }) => {
    const columns: ColumnDef<HistoryInvoice>[] = [
        {
            accessorKey: "invoice_name",
            header: "Nama Invoice",
        },
        {
            accessorKey: "date",
            header: "Tanggal Dibuat",
            cell: ({ row }) => {
                const value: string = row.getValue('date');

                return <div>{convertDateFormat(value)}</div>
            }
        },
        {
            accessorKey: "payment_source",
            header: "Sumber Pembayaran",
            cell: ({ row }) => {
                const value: string = row.getValue('payment_source');

                return <div>{capitalizeString(value)}</div>
            }
        },
        {
            accessorKey: "status",
            header: "status",
            cell: ({ row }) => {
                const value: string = row.getValue('status');

                return <Badge className={`text-white ${value == 'dibayar' ? 'bg-green-400' : 'bg-red-400'}`}>{capitalizeString(value)}</Badge>
            }
        },
    ]

    return (
        <div className='w-full'>
            <h2 className='text-lg mb-3 text-gray-600 font-bold'>Catatan Invoice</h2>

            <DataTable columns={columns} data={historyInvoices} />

        </div>
    )
}

export default HistoryInvoices