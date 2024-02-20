"use client"

import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const ConfirmInvoiceButton = () => {
  return (
    <>
           <Button className='text-white bg-green-500 flex items-center justify-center gap-1'>
                <Icon icon="lucide:wallet" width={16} height={16}></Icon>
                <span>Bayar Invoice</span>
            </Button>
    </>
  )
}

export default ConfirmInvoiceButton