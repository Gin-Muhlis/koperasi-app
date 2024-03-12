"use client"

import { ReportMember, SubCategoryState } from '@/types/interface'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/react/dist/iconify.js'
import ListReportMember from './listReport'
import DownloadExcelReportMembers from './downloadExcelReportMembers'

const Content = ({ data, subCategories }: { data: ReportMember[], subCategories: SubCategoryState[] }) => {

    return (
        <div className='w-full'>
            <div className="mb-5">
                <DownloadExcelReportMembers />
            </div>
            <ListReportMember data={data} subCategories={subCategories} />
        </div>
    )
}

export default Content