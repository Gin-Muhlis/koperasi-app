"use client"

import { handleFormat } from '@/app/utils/helper'
import { Button } from '@/components/ui/button'
import { NotPayed } from '@/types/interface'
import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useState } from 'react'

const AlertPayment = ({ dataAlerts }: { dataAlerts: NotPayed[] }) => {
    const [alerts, setAlerts] = useState(dataAlerts);
    const [showAlert, setShowAlert] = useState(false)

    const today = new Date();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    const handleRemoveAlert = (id: number) => {
        let listAlerts = [...alerts]

        listAlerts = listAlerts.filter((item) => item.id != id)

        setAlerts(listAlerts)
    }

    const handleShowAlert = () => {
        setShowAlert(!showAlert)
    }

    console.log(alerts)

    return (
        <div className='absolute right-6 top-4 flex flex-col gap-3'>
            {dataAlerts.length > 0 && !showAlert ? <div className='bg-red-500  cursor-pointer rounded text-sm text-white relative shadow-md shadow-red-500 p-2' onClick={handleShowAlert}>Terdapat simpanan yang yang belum dibayar
                <span className="absolute flex h-4 w-4 -top-2 -right-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
            </div> : null}
            {showAlert && alerts.length > 0 ? dataAlerts.map((data) => (
                <div className="w-full p-4 rounded bg-red-500 text-white text-sm shadow-sm shadow-red-400 flex gap-2 relative" key={data.id}>
                    <span>{data.category}</span>
                    <span className='font-bold'>Rp. {handleFormat(data.amount)}</span>
                    <div className="w-5 h-5 bg-black text-white rounded-full absolute -right-2 -top-2 flex items-center justify-center cursor-pointer" onClick={() => handleRemoveAlert(data.id)}>
                        <Icon icon="lucide:x" width={"16"} height={"16"}></Icon>
                    </div>
                </div>
            )) : null}
        </div>
    )
}

export default AlertPayment
