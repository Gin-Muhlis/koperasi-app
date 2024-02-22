"use client"

import AlertError from '@/app/components/alertError'
import AlertSuccess from '@/app/components/alertSuccess'
import Loader from '@/app/components/loader'
import { downloadExcelInvoice } from '@/app/utils/featuresApi'
import { Button } from '@/components/ui/button'
import { Invoice } from '@/types/interface'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const DownloadExcelInvoiceButton = ({detailInvoice}: {detailInvoice: Invoice[]}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<string | boolean>(false)
    const [error, setError] = useState<string | boolean>(false)

    const router = useRouter()
    const { data: session } = useSession()

    const handleDownloadExcel = async () => {
        setIsLoading(true);

        const response = await downloadExcelInvoice(
            detailInvoice,
            session?.user.accessToken
        );
        console.log(response)

        if (response.status == 200) {
            const blob = await response.data;
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "tagihan_gabungan.xlsx"); // or any other extension
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);

            setIsLoading(false);
            router.refresh();
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
            <Button onClick={handleDownloadExcel} className='text-white bg-green-600 flex items-center justify-center gap-1' disabled={isLoading}>
                {isLoading ? <Loader /> : <>
                    <Icon icon="lucide:file" width={16} height={16}></Icon>
                    <span>Download Excel</span>
                </>}
            </Button>
            {success && <AlertSuccess message={success.toString()} isShow={true} setSuccess={setSuccess} />}
            {error && <AlertError message={error.toString()} isShow={true} setError={setError} />}
        </>
    )
}

export default DownloadExcelInvoiceButton