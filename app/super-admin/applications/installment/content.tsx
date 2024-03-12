"use client"


import { handleFormat } from '@/app/utils/helper'
import { DataTable } from '@/components/data-table'
import { MemberInstallment } from '@/types/interface'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import FormAddInstallment from './formAddInstallment'

const ContentInstallment = ({members}: {members: MemberInstallment[]}) => {

    const columns: ColumnDef<MemberInstallment>[] = [
        {
            accessorKey: "name",
            header: "Nama",
        },
        {
            accessorKey: "total_payment",
            header: () => <div className='text-center'>Total Pinjaman</div>,
            cell: ({row}) => {
                const value = Number(row.getValue('total_payment'));

                return <div className='text-center'>Rp. {handleFormat(value)}</div>
            }
        },
        {
            accessorKey: "paid",
            header: () => <div className='text-center'>Dibayar</div>,
            cell: ({row}) => {
                const value = Number(row.getValue('paid'));

                return <div className='text-center'>Rp. {handleFormat(value)}</div>
            }
        },
        {
            accessorKey: "remain_payment",
            header: () => <div className='text-center'>Sisa Pembayaran</div>,
            cell: ({row}) => {
                const value = Number(row.getValue('remain_payment'));

                return <div className='text-center'>Rp. {handleFormat(value)}</div>
            }
        },
        {
            accessorKey: "duration",
            header: () => <div className='text-center'>Durasi Pinjaman</div>,
            cell: ({row}) => {
                const value = Number(row.getValue('duration'));

                return <div className='text-center'>{value} Bulan</div>
            }
        },
        {
            accessorKey: "remain_duration",
            header: () => <div className='text-center'>Sisa Bulan Pembayaran</div>,
            cell: ({row}) => {
                const value = Number(row.getValue('remain_duration'));

                return <div className='text-center'>{value} Bulan</div>
            }
        },
        {
            id: "actions",
            header: () => <div className="text-center">Tambahkan Pembayaran</div>,
            cell: ({ row }) => {
                const data = row.original;

                return <div className='flex justify-center'>
                    <FormAddInstallment key={data.id} member={data} />
                </div>
            }
        },
    ]

  return (
    <>
        <DataTable data={members} columns={columns} />
    </>
  )
}

export default ContentInstallment