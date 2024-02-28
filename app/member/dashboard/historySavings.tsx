"use client"
import { convertDateFormat, handleFormat } from '@/app/utils/helper'
import { DashboardMember } from '@/types/interface'
import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const HistorySavings = ({ data }: { data: DashboardMember }) => {
    return (
        <div>
            <h2 className='text-md font-bold mb-5 text-gray-700'>Catatan Simpanan</h2>
            <div className="flex flex-col items-start justify-start gap-4">
                {data.history_savings.length > 0 ? data.history_savings.map((saving) => (
                    <div key={saving.code} className="rounded shadow-md p-2 w-full bg-white">
                        <div className="flex justify-between items-center">
                            <div>
                                <h5 className='text-sm font-bold'>{saving.code}</h5>
                                <span className="text-xs text-gray-600 opacity-80">{convertDateFormat(saving.date)}</span>
                            </div>
                            <div className='text-sm font-bold'>
                                Rp. {handleFormat(saving.amount)}
                            </div>
                        </div>
                    </div>
                )) : <div className='flex items-center justity-start gap-1 text-amber-500'><Icon icon="mingcute:alert-fill" width={24} height={24} />
                    <span className=" font-semibold text-md alert-access">
                        Tidak ada data
                    </span></div>}

            </div>
        </div>
    )
}

export default HistorySavings