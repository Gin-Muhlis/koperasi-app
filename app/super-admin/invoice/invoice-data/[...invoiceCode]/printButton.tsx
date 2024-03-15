"use client"

import Loader from '@/app/components/loader'
import SweetAlertPopup from '@/app/components/sweetAlertPopup'
import { downloadPdfInvoiceMember } from '@/app/utils/featuresApi'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'

const PrintButton = ({ memberName, memberId, invoiceCode }: { memberName: string, memberId: number, invoiceCode: string }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<string | boolean>(false)
    const [error, setError] = useState<string | boolean>(false)
    const [status, setStatus] = useState<number | boolean>(false)

    const { data: session } = useSession();

    const handleDownloadInvoice = async () => {
        setIsLoading(true)

        const response = await downloadPdfInvoiceMember(memberId, invoiceCode, session?.user.accessToken)
        setStatus(response.status)
        setIsLoading(false)
        console.log(response)

        if (response.status == 200) {
            const nameFile = memberName.replaceAll('.', ' ')
            const blob = await response.data;
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `Zie Koperasi ${nameFile}`); 
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);

            setSuccess("Download data berhasil");
        } else {
            setError('Gagal mendownload data')
        }
    }

    const resetStateAction = () => {
        setSuccess(false)
        setError(false)
        setStatus(false)
    }

    return (
        <>
            <button className='bg-indigo-500 text-white p-1 outline-none rounded text-xs cursor-pointer' onClick={handleDownloadInvoice}>{isLoading ? <Loader /> :  <Icon icon="lucide:file" width={16} height={16}></Icon>}</button>

            {success && <SweetAlertPopup status={status} message={success.toString()} resetState={resetStateAction} />}

            {error && <SweetAlertPopup status={status} message={error.toString()} resetState={resetStateAction} />}
        </>
    )
}

export default PrintButton