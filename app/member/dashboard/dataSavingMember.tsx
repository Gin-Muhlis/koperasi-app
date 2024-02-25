import { handleFormat } from '@/app/utils/helper'
import { DashboardMember } from '@/types/interface'
import React from 'react'

const DataSavingMember = ({ data }: { data: DashboardMember }) => {
    return (
        <div>
            <h2 className='text-md font-bold mb-5 text-gray-700'>Data Simpanan</h2>
            <div className='w-full flex items-start justify-start gap-5'>
                <div className="flex flex-col gap-1 rounded bg-[#a6004a] p-4 w-full">
                    <span className="text-md font-bold text-white">
                        Rp. {handleFormat(data.total_mandatory_saving)}
                    </span>
                    <span className='opacity-80 text-xs text-gray-100'>Simpanan Wajib</span>
                </div>
                <div className="flex flex-col gap-1 rounded bg-[#6982c7] p-4 w-full">
                    <span className="text-md font-bold text-white">
                        Rp. {handleFormat(data.total_special_mandatory_saving)}
                    </span>
                    <span className='opacity-80 text-xs text-gray-100'>Simpanan Wajib Khusus</span>
                </div>
                <div className="flex flex-col gap-1 rounded bg-[#9e379f] p-4 w-full">
                    <span className="text-md font-bold text-white">
                        Rp. {handleFormat(data.total_voluntary_saving)}
                    </span>
                    <span className='opacity-80 text-xs text-gray-100'>Simpanan Sukarela</span>
                </div>
                <div className="flex flex-col gap-1 rounded bg-[#493267] p-4 w-full">
                    <span className="text-md font-bold text-white">
                        Rp. {handleFormat(data.total_recretional_saving)}
                    </span>
                    <span className='opacity-80 text-xs text-gray-100'>Tabungan Rekreasi</span>
                </div>
            </div>
        </div>
    )
}

export default DataSavingMember