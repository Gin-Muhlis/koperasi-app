"use client"

import Loader from '@/app/components/loader'
import SweetAlertPopup from '@/app/components/sweetAlertPopup'
import { importSubCategories } from '@/app/utils/featuresApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const ImportExcel = () => {
    const [modal, setModal] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | boolean>(false)
    const [success, setSuccess] = useState<string | boolean>(false)
    const [status, setStatus] = useState<number | boolean>(false)
    const [file, setFile] = useState<File | string | Blob | undefined>()

    const router = useRouter()
    const { data: session } = useSession()

    const handleModal = () => {
        setModal(!modal)
    }

    const handleSubmitImport = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setIsLoading(true)

        const data = new FormData()
        data.append("file", file as Blob)

        const response = await importSubCategories(session?.user.accessToken, data)
        console.log(response)
        setStatus(response.status)
        setIsLoading(false)

        if (response.status == 200) {
            setSuccess(response.data.message)
            setFile(undefined)
        } else if (response.status == 422) {
            const errorsData = response.data.errors
            const keys = Object.keys(errorsData)
            const firstKey = keys[0]
            const message = errorsData[firstKey][0]

            setError(message)
        } else if (response.status != 500) {
            const message = response.data.message;

            setError(message)
        } else {
            setError('Terjadi kesalahan dengan sistem!')
        }
    }

    const resetStateAction = () => {
        setSuccess(false);
        setStatus(false);
        setError(false)
        setModal(false)
        router.refresh();
    }

    return (
        <>
            <Button className='bg-green-500 text-white flex items-center gap-1' onClick={handleModal}>
                <Icon icon="lucide:file" width={16} height={16}></Icon>
                <span>Import Data</span>
            </Button>
            <div className={`p-5 fixed inset-0 z-50 w-full min-h-screen bg-black/80 flex items-center justify-center ${modal ? 'block' : 'hidden'}`}>
                <div className={`w-11/12 max-w-lg bg-white rounded transition-transform max-h-[90vh] overflow-y-scroll ${modal ? 'scale-100' : 'scale-0'}`}>
                    <div className="p-4 border-b border-b-slate-300 mb-4">
                        <h3 className="font-bold text-lg text-black">Import Data Sub Kategori</h3>
                    </div>
                    <form encType='multipart/form-data' onSubmit={handleSubmitImport} className="p-4">
                        <div className="w-full mb-1">
                            <Label>File Data</Label>
                            <Input type='file' onChange={(e: any) => setFile(e.target.files[0])} accept=".xlsx" required disabled={isLoading} />
                        </div>
                        <div className="mb-3">
                            <p className="text-xs text-slate-400 italic opacity-80">
                                File harus berekstensi .xlsx
                            </p>
                        </div>
                        <div className="w-full flex items-center justify-end gap-3">
                            <Button type="button" onClick={handleModal}>
                                Batal
                            </Button>
                            <Button type="submit" className="bg-blue-400 text-white" disabled={isLoading}>
                                {isLoading ? <Loader /> : 'Simpan'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            {success && <SweetAlertPopup message={success.toString()} status={status} resetState={resetStateAction} />}
            {error && <SweetAlertPopup message={error.toString()} status={status} resetState={resetStateAction} />}
        </>
    )
}

export default ImportExcel