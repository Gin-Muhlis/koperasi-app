import { handleFormat } from '@/app/utils/helper'
import { DashboardAdmin } from '@/types/interface'
import React from 'react'

const DataDetail = ({ data }: { data: DashboardAdmin }) => {
    return (
        <div className='flex flex-wrap items-start justify-start gap-5'>
            <div className="shadow-md bg-blue-400 border border-solid rounded-lg p-4 flex flex-col gap-1 md:w-[20%] w-full">
                <span className="text-xl font-bold text-white">{data.count_member}</span>
                <span className='text-xs text-gray-200'>Member</span>
            </div>
            <div className="shadow-md bg-blue-400 border border-solid rounded-lg p-4 flex flex-col gap-1 md:w-[20%] w-full">
                <span className="text-xl font-bold text-white">{data.count_invoices_not_paid}</span>
                <span className='text-xs text-gray-200'>Invoice Belum Dibayar</span>
            </div>
            <div className="shadow-md bg-blue-400 border border-solid rounded-lg p-4 flex flex-col gap-1 md:w-[20%] w-full">
                <span className="text-xl font-bold text-white">{data.count_invoices_paid}</span>
                <span className='text-xs text-gray-200'>Invoice Selesai</span>
            </div>
            <div className="shadow-md bg-blue-400 border border-solid rounded-lg p-4 flex flex-col gap-1 md:w-[20%] w-full">
                <span className="text-xl font-bold text-white">{handleFormat(data.total_savings)}</span>
                <span className='text-xs text-gray-200'>Total Simpanan</span>
            </div>
            <div className="shadow-md bg-blue-400 border border-solid rounded-lg p-4 flex flex-col gap-1 md:w-[20%] w-full">
                <span className="text-xl font-bold text-white">{handleFormat(data.total_loans)}</span>
                <span className='text-xs text-gray-200'>Total Pinjaman</span>
            </div>
        </div>
    )
}

export default DataDetail