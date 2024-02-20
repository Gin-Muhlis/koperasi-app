"use client"

import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const DownloadPdfInvoiceButton = () => {
    return (
        <>
            <Button className='text-white bg-red-500 flex items-center justify-center gap-1'>
                <Icon icon="lucide:file" width={16} height={16}></Icon>
                <span>Download PDF</span>
            </Button>
        </>
    )
}

export default DownloadPdfInvoiceButton