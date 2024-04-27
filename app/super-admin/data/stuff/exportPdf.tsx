"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Loader from '@/app/components/loader'
import { downloadStuffsDataPdf } from '@/app/utils/featuresApi'
import SweetAlertPopup from '@/app/components/sweetAlertPopup'

const ExportPdf = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | boolean>(false)
  const [success, setSuccess] = useState<string | boolean>(false)
  const [status, setStatus] = useState<number | boolean>(false)

  const router = useRouter()
  const { data: session } = useSession()

  const handleDownloadPdf = async () => {
    setIsLoading(true)

    const response = await downloadStuffsDataPdf(session?.user.accessToken)

    setStatus(response.status)
    setIsLoading(false)

    if (response.status == 200) {
      const blob = await response.data
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url;
      link.setAttribute("download", "Data Barang.pdf")
      document.body.appendChild(link)
      link.click()
      link.parentNode?.removeChild(link)

      router.refresh()
      setSuccess("Download data berhasil")
    } else {
      setError("Terjadi kesalahan dengan sistem")
    }
  }

  const resetStateAction = () => {
    setStatus(false)
    setSuccess(false)
    setError(false)
  }
  return (
    <>
      <Button onClick={handleDownloadPdf} disabled={isLoading} className='bg-red-500 text-white flex items-center justify-start gap-1'>
        {isLoading ? <Loader /> : (
          <>
            <Icon icon="lucide:file" width={16} height={16}></Icon>
            <span>Download Data</span>
          </>
        )}
      </Button>
      {success && <SweetAlertPopup message={success.toString()} status={status} resetState={resetStateAction} />}
      {error && <SweetAlertPopup message={error.toString()} status={status} resetState={resetStateAction} />}
    </>
  )
}

export default ExportPdf