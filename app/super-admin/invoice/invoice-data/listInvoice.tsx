"use client"

import { InvoiceState } from '@/types/interface'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { DataTable } from './data-table'
import { months } from '@/constants/CONSTS'
import Link from 'next/link'
import { Icon } from '@iconify/react/dist/iconify.js'

const ListInvoice = ({ invoices }: { invoices: InvoiceState[] }) => {

  const columns: ColumnDef<InvoiceState>[] = [
    {
      accessorKey: "invoice_code",
      header: "Kode",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const value: 'dibayar' | 'belum bayar' = row.getValue('status')
        const style = {
          'dibayar': 'px-2 py-1 text-xs border border-solid border-green-400 bg-green-400 rounded text-white text-center inline-block',
          'belum bayar': 'px-2 py-1 text-xs border border-solid border-red-400 bg-red-400 rounded text-white text-center inline-block',
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
      cell: ({ row }) => {
        const value: string = row.getValue('date')

        const split = value.split("-")
        const date = Number(split[2])
        const year = Number(split[0])
        let month: number | string = Number(split[1])

        month = month < 10 ? month.toString().replace('0', '') : month;
        const textMonth = months[Number(month) - 1]

        const fullDate = `${date} ${textMonth} ${year}`

        return <div>{fullDate}</div>
      }
    },
    {
      accessorKey: "due_date",
      header: "Tenggat",
      cell: ({ row }) => {
        const value: string = row.getValue('due_date')

        const split = value.split("-")
        const date = Number(split[2])
        const year = Number(split[0])
        let month: number | string = Number(split[1])

        month = month < 10 ? month.toString().replace('0', '') : month;
        const textMonth = months[Number(month) - 1]

        const fullDate = `${date} ${textMonth} ${year}`

        return <div>{fullDate}</div>
      }
    },
    {
      id: "actions",
      header: () => <div className="text-center">Aksi</div>,
      cell: ({ row }) => {
        const code: string = row.getValue('invoice_code')

        return <div className='flex justify-center'>
          <Link href={`/super-admin/invoice/invoice-data/${code}`} className='text-center'>
            <span className="w-5 h-5 rounded bg-blue-500 text-white flex items-center justify-center cursor-pointer">
              <Icon icon="lucide:eye" width="16" height="16" />
            </span>
          </Link>

        </div>
      }
    },
  ]

  return (
    <>
      <DataTable data={invoices} columns={columns} />
    </>
  )
}

export default ListInvoice