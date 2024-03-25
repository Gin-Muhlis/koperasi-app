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
            header: () => <div className="text-center text-xs md:text-sm lg:text-md">Nama Invoice</div>,
            cell: ({ row }) => {
                const value: string = row.getValue("invoice_name")
                return <div className="text-xs md:text-sm lg:text-md">{value}</div>
            }
        },
        {
            accessorKey: "date",
            header: () => <div className="text-center text-xs md:text-sm lg:text-md">Tanggal Dibuat</div>,
            cell: ({ row }) => {
                const value: string = row.getValue('date');

                return <div className="text-xs md:text-sm lg:text-md">{convertDateFormat(value)}</div>
            }
        },
        {
            accessorKey: "payment_source",
            header: () => <div className="text-center text-xs md:text-sm lg:text-md">Sumber Bayar</div>,
            cell: ({ row }) => {
                const value: string = row.getValue('payment_source');

                return <div className="text-xs md:text-sm lg:text-md">{capitalizeString(value)}</div>
            }
        },
        {
            accessorKey: "status",
            header: () => <div className="text-center text-xs md:text-sm lg:text-md">Status</div>,
            cell: ({ row }) => {
                const value: string = row.getValue('status');

                return <div className="text-xs md:text-sm lg:text-md text-center">
                    <Badge className={`text-white ${value == 'dibayar' ? 'bg-green-400' : 'bg-red-400'}`}>{capitalizeString(value)}</Badge>
                </div>
            }
        },
    ]
    

    return (
        <>
            <h2 className='text-lg mb-3 text-gray-600 font-bold'>Catatan Invoice</h2>

            <DataTable columns={columns} data={historyInvoices} />

        </>
    )
}

export default HistoryInvoices