"use client"

import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const PrintInvoiceButton = () => {
    

    return (
        <>
            <Button className='flex items-center justify-center gap-1' >
                <Icon icon="lucide:printer" width={16} height={16}></Icon>
                <span>Print Invoice</span>
            </Button>
        </>
    )
}

export default PrintInvoiceButton