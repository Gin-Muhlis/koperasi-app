"use client"

import { handleFormat } from '@/app/utils/helper'
import { NotPayed } from '@/types/interface'
import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useState } from 'react'

const AlertPayment = ({ dataAlerts }: { dataAlerts: NotPayed[] }) => {
    const [alerts, setAlerts] = useState<NotPayed[]>(dataAlerts);
    const [showAlert, setShowAlert] = useState(false)

    const today = new Date();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate() - 5;

    const handleRemoveAlert = (id: number) => {
        let listAlerts = [...alerts]

        listAlerts = listAlerts.filter((item) => item.id != id)

        setAlerts(listAlerts)
    }

    const handleShowAlert = () => {
        setShowAlert(!showAlert)
    }


    return (
        <div className='fixed right-6 top-4 flex flex-col gap-5'>
            {dataAlerts.length > 0 && !showAlert && today.getDate() >= lastDayOfMonth ? <div className='bg-red-500  cursor-pointer rounded text-sm text-white relative shadow-md shadow-red-500 p-2' onClick={handleShowAlert}>Terdapat pembayaran yang belum dibayar
                <span className="absolute flex h-4 w-4 -top-2 -right-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
            </div> : null}
            {showAlert && alerts.length > 0 ? dataAlerts.map((data) => (
                <>
                    {alerts.find((item) => item.id == data.id) != undefined && (

                        <div className="w-full p-4 rounded bg-red-500 text-white text-sm shadow-sm shadow-red-400 flex gap-2 relative" key={data.id}>
                            <span>{data.category}</span>
                            <span className='font-bold'>Rp. {handleFormat(data.amount)}</span>
                            <div className="w-5 h-5 bg-black text-white rounded-full absolute -right-2 -top-2 flex items-center justify-center cursor-pointer" onClick={() => handleRemoveAlert(data.id)}>
                                <Icon icon="lucide:x" width={"16"} height={"16"}></Icon>
                            </div>
                        </div>
                    )}
                </>
            )) : null}
        </div>
    )
}

export default AlertPayment
