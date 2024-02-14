"use client"

import AlertError from '@/app/components/alertError'
import AlertSuccess from '@/app/components/alertSuccess'
import Loader from '@/app/components/loader'
import { downloadInvoiceReport } from '@/app/utils/featuresApi'
import { Button } from '@/components/ui/button'
import { appDispatch, useAppSelector } from '@/redux/store'
import { InvoiceState } from '@/types/interface'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const ButtonAction = ({ invoices }: { invoices: InvoiceState[] }) => {
    const [success, setSuccess] = useState<string | boolean>(false);
    const [error, setError] = useState<string | boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { data: session } = useSession();
    const dispatch = useDispatch<appDispatch>()
    const selector = useAppSelector((state) => state.dataInvoiceReducer)

    const handleDownloadExcel = async () => {
        setIsLoading(true);

        const monthYear = `${selector.month < 10 ? `0${selector.month}` : selector.month}-${selector.year}`

        const response = await downloadInvoiceReport(
            monthYear,
            session?.user.accessToken
        );

        if (response.status == 200) {
            const blob = await response.data;
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `invoice_${monthYear}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);

            setIsLoading(false);
            setSuccess("Download data berhasil");
        } else if (response.status === 422) {
            setIsLoading(false);
            const errorsData = response.data.errors;
            const keys = Object.keys(errorsData);
            const firstKey = keys[0];
            const message = errorsData[firstKey][0];

            setError(message);
        } else {
            setIsLoading(false);
            setError(response.data.message);
        }
    };

    return (
        <>
            <div className="w-full flex justify-end gap-3 align-center">
                <Button className='bg-amber-400 text-white'>Konfirmasi Bayar</Button>
                <Button onClick={handleDownloadExcel} className='bg-green-400 text-white'>
                    {isLoading ? <Loader /> : 'Download Excel'}
                </Button>
            </div>
            {success && <AlertSuccess message={success.toString()} isShow={true} setSuccess={setSuccess} />}
            {error && <AlertError message={error.toString()} isShow={true} setError={setError} />}
        </>
    )
}

export default ButtonAction