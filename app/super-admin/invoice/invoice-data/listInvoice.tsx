"use client"

import { InvoiceState } from '@/types/interface'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { DataTable } from './data-table'

const ListInvoice = ({invoices}: {invoices: InvoiceState[]}) => {

    const columns: ColumnDef<InvoiceState>[] = [
        {
          accessorKey: "invoice_code",
          header: "Kode",
        },
        {
          accessorKey: "status",
          header: "Status",
          cell: ({row}) => {
            const value: 'dibayar' | 'belum bayar' = row.getValue('status')
            const style = {
                'dibayar': 'px-2 py-1text-xs border border-solid border-green-400 bg-green-400 rounded text-white inline',
                'belum bayar': 'px-2 py-1text-xs border border-solid border-red-400 bg-red-400 rounded text-white inline',
            }

            return <div className={`${style[value]}`}>{value}</div>
          }
        },
        {
          accessorKey: "invoice_name",
          header: "Nama Invoice",
        },
        {
          accessorKey: "date",
          header: "Tanggal Dibuat",
        },
        {
          accessorKey: "due_date",
          header: "Tenggat",
        },
      ]

  return (
    <div>
        <DataTable data={invoices} columns={columns} />
    </div>
  )
}

export default ListInvoice