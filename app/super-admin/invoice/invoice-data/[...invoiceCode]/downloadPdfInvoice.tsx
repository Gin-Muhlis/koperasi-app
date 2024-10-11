"use client"
import AlertError from '@/app/components/alertError';
import AlertSuccess from '@/app/components/alertSuccess';
import Loader from '@/app/components/loader';
import SweetAlertPopup from '@/app/components/sweetAlertPopup';
import { downloadPdfInvoice } from '@/app/utils/featuresApi';
import { Button } from '@/components/ui/button';
import { Invoice } from '@/types/interface';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const DownloadPdfInvoiceButton = ({invoiceCode, timeInvoice}: {invoiceCode: string, timeInvoice: string}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<string | boolean>(false)
    const [error, setError] = useState<string | boolean>(false)
    const [status, setStatus] = useState<number | boolean>(false)

    const router = useRouter()
    const { data: session } = useSession()

    const handleDownloadPdf = async () => {
        setIsLoading(true);

        const splitTime = timeInvoice.split(' ')
        const time = `${splitTime[1]} ${splitTime[2]}`

        const response = await downloadPdfInvoice(
            invoiceCode,
            session?.user.accessToken
        );
        setStatus(response.status)
        setIsLoading(false);
        console.log(response)

        if (response.status == 200) {
            const blob = await response.data;
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `Pembayaran Invoice ${time}`); // or any other extension
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);

            setSuccess("Download data berhasil");
        } else if (response.status === 422) {
            const errorsData = response.data.errors;
            const keys = Object.keys(errorsData);
            const firstKey = keys[0];
            const message = errorsData[firstKey][0];

            setError(message);
        } else {
            setError('Terjadi kesalahan dengan sistem');
        }
    };

    const resetStateAction = () => {
        setStatus(false)
        setSuccess(false)
        setError(false)
    }

    return (
        <>
            <Button onClick={handleDownloadPdf} className='text-white bg-red-600 flex items-center justify-center gap-1' disabled={isLoading}>
                {isLoading ? <Loader /> : <>
                    <Icon icon="lucide:file" width={16} height={16}></Icon>
                    <span>Download PDF</span>
                </>}
            </Button>
            {success && <SweetAlertPopup message={success.toString()} status={status} resetState={resetStateAction} />}
            {error && <SweetAlertPopup message={error.toString()} status={status} resetState={resetStateAction} />}
        </>
    )
}

export default DownloadPdfInvoiceButton