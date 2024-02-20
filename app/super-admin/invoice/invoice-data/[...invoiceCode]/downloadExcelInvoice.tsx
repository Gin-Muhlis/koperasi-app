"use client"

import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const DownloadExcelInvoiceButton = () => {
    return (
        <>
            <Button className='text-white bg-green-600 flex items-center justify-center gap-1'>
                <Icon icon="lucide:file" width={16} height={16}></Icon>
                <span>Download Excel</span>
            </Button>
        </>
    )
}

export default DownloadExcelInvoiceButton