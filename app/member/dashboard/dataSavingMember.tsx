import { capitalizeString, handleFormat } from '@/app/utils/helper'
import { DashboardMember, SubCategoryState } from '@/types/interface'
import React from 'react'

const DataSavingMember = ({ data, subCategories }: { data: DashboardMember, subCategories: SubCategoryState[] }) => {

    const handleTotalSaving = (data: DashboardMember, subCategories: SubCategoryState[]) => {
        let total = 0;

        subCategories.map((item: SubCategoryState) => {
            total += data.data_saving[item.name]
        })

        return handleFormat(total)
    }
    return (
        <div>
            <h2 className='text-md font-bold mb-5 text-gray-700'>Data Simpanan</h2>
            <p className='mb-5'>Total Simpanan : <span className='font-bold'>Rp. {handleTotalSaving(data, subCategories)}</span></p>
            <div className='w-full flex items-start justify-start flex-wrap gap-5'>
                {subCategories.map(item => (
                    <div className="flex flex-col gap-1 rounded bg-blue-400 border shadow-lg p-4 md:w-[200px] w-full">
                        <span className="text-lg font-bold text-white">
                            Rp. {handleFormat(data.data_saving[item.name])}
                        </span>
                        <span className='opacity-80 text-xs text-gray-100'>{capitalizeString(item.name)}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DataSavingMember