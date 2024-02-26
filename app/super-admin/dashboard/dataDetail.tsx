import { handleFormat } from '@/app/utils/helper'
import { DashboardAdmin } from '@/types/interface'
import React from 'react'

const DataDetail = ({ data }: { data: DashboardAdmin }) => {
    return (
        <div className='flex flex-wrap items-start justify-start gap-5'>
            <div className="shadow bg-white border border-solid rounded-lg p-4 flex flex-col basis-[18%]">
                <span className="text-2xl font-bold text-amber-400">{data.count_member}</span>
                <span className='text-sm text-gray-500'>Member</span>
            </div>
            <div className="shadow bg-white border border-solid rounded-lg p-4 flex flex-col basis-[18%]">
                <span className="text-2xl font-bold text-amber-400">{data.count_invoices_not_paid}</span>
                <span className='text-sm text-gray-500'>Invoice Belum Dibayar</span>
            </div>
            <div className="shadow bg-white border border-solid rounded-lg p-4 flex flex-col basis-[18%]">
                <span className="text-2xl font-bold text-amber-400">{data.count_invoices_paid}</span>
                <span className='text-sm text-gray-500'>Invoice Selesai</span>
            </div>
            <div className="shadow bg-white border border-solid rounded-lg p-4 flex flex-col basis-[18%]">
                <span className="text-2xl font-bold text-amber-400">{handleFormat(data.total_savings)}</span>
                <span className='text-sm text-gray-500'>Total Simpanan</span>
            </div>
            <div className="shadow bg-white border border-solid rounded-lg p-4 flex flex-col basis-[18%]">
                <span className="text-2xl font-bold text-amber-400">{handleFormat(data.total_loans)}</span>
                <span className='text-sm text-gray-500'>Total Pinjaman</span>
            </div>
        </div>
    )
}

export default DataDetail