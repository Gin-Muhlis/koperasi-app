"use client"

import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useState } from 'react'

const AlertSuccess = ({ message, isShow }: { message: string | boolean, isShow: boolean }) => {
  const [show, setShow] = useState(isShow)

  return (
    <>
      {show && <div className='z-50 p-4 bg-green-500 rounded fixed bottom-7 right-7 text-white flex items-center gap-1'>
        <Icon icon="mingcute:alert-fill" width={24} height={24} />
        <span className=" font-semibold text-md alert-access">
          {message}
        </span>
        <span onClick={() => setShow(false)} className='w-6 h-6 cursor-pointer text-md rounded-full flex items-center justify-center bg-white text-black absolute right-[-10px] top-[-10px]'>
          <Icon icon="jam:close" />
        </span>
      </div>}
    </>
  )
}

export default AlertSuccess