"use client"

import { ReportMember } from '@/types/interface'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { DataTable } from './data-table'
import { handleFormat } from '@/app/utils/helper'

const Content = ({data}: {data: ReportMember[]}) => {

  const columns: ColumnDef<ReportMember>[] = [
    {
        accessorKey: "name",
        header: "Nama Anggota"
    },
    {
        accessorKey: "position",
        header: "Jabatan"
    },
    {
        accessorKey: "principal_saving",
        header: "Pokok",
        cell: ({row}) => {
            const value = row.getValue('principal_saving');

            return <>{handleFormat(Number(value))}</>
        }
    },
    {
        accessorKey: "mandatory_saving",
        header: "Wajib",
        cell: ({row}) => {
            const value = row.getValue('mandatory_saving');

            return <>{handleFormat(Number(value))}</>
        }
    },
    {
        accessorKey: "special_mandatory_saving",
        header: "Wajib Khusus",
        cell: ({row}) => {
            const value = row.getValue('special_mandatory_saving');

            return <>{handleFormat(Number(value))}</>
        }
    },
    {
        accessorKey: "voluntary_saving",
        header: "Sukarela",
        cell: ({row}) => {
            const value = row.getValue('voluntary_saving');

            return <>{handleFormat(Number(value))}</>
        }
    },
    {
        accessorKey: "recretional_saving",
        header: "Tabungan Rekreasi",
        cell: ({row}) => {
            const value = row.getValue('recretional_saving');

            return <>{handleFormat(Number(value))}</>
        }
    },
    {
        accessorKey: "receivable",
        header: "Piutang S/P",
        cell: ({row}) => {
            const value = row.getValue('receivable');

            return <>{handleFormat(Number(value))}</>
        }
    },
    {
        accessorKey: "account_receivable",
        header: "Piutang Dagang",
        cell: ({row}) => {
            const value = row.getValue('account_receivable');

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