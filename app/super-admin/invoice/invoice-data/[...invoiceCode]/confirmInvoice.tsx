"use client"

import AlertError from '@/app/components/alertError'
import AlertSuccess from '@/app/components/alertSuccess'
import Loader from '@/app/components/loader'
import SweetAlertPopup from '@/app/components/sweetAlertPopup'
import { createPaymentInvoice } from '@/app/utils/featuresApi'
import { handleFormat } from '@/app/utils/helper'
import { Button } from '@/components/ui/button'
import { FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


const ConfirmInvoiceButton = ({ paymentMethod, invoiceId, totalPayment, statusInvoice }: { paymentMethod: string, invoiceId: number, totalPayment: string, statusInvoice: string }) => {
  const [modal, setModal] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<string | boolean>(false)
  const [error, setError] = useState<string | boolean>(false)
  const [status, setStatus] = useState<number | boolean>(false)
  const [amount, setAmount] = useState(totalPayment.replaceAll('.', ''));
  const [noRek, setNoRek] = useState<string>("");
  const [transferName, setTransferName] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<File | string | undefined>(
    undefined
  );
  const [imageProfile, setImageProfile] = useState<
  File | string | Blob | undefined
>();

  const router = useRouter()
  const { data: session } = useSession()

  // handle muncul modal
  const handleModal = () => {
    setModal(!modal);
  }

  const resetStateAction = () => {
    setError(false)
    setSuccess(false)
    setStatus(false)
    setPreviewImage(undefined)
    setImageProfile(undefined)
    setAmount(totalPayment.replaceAll('.', ''))
    setNoRek("")
    setTransferName("")
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true)

    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("invoice_id", invoiceId.toString());
    formData.append("total_invoice", totalPayment.replaceAll('.', ''));
    if (noRek.length > 0) {
      formData.append("no_rek", noRek);
    }
    if (transferName.length > 0) {
      formData.append("transfer_name", transferName);
    }
    if (imageProfile) {
      formData.append("image", imageProfile);
    }


    const response = await createPaymentInvoice(formData, session?.user.accessToken)
    console.log(response)

    setStatus(response.status)
    setIsLoading(false)
    if (response.status == 200) {
      setSuccess(response.data.message)
      handleModal()
      router.refresh()
    } else if (response.status == 422) {
      const errors = response.data.errors;
      const objectKeys = Object.keys(errors);
      const firstKey = objectKeys[0]
      const message = errors[firstKey][0]

      setError(message)
    } else if (response.status == 400) {
      const message = response.data.message

      setError(message)
    } else {
      setError("Terjadi kesalahan dengan sistem")
    }
  }

  const handleImageInput = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      setImageProfile(file);

      const render = new FileReader();

      render.onloadend = () => {
        setPreviewImage(render.result as string);
      };

      render.readAsDataURL(file);
    } else {
      setPreviewImage(undefined);
    }
  };


  // handle inputan jumlah pembayaran
  const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event?.target.value

    const numericValue = value.replace(/\D/g, '');

    setAmount(numericValue)
  }

  // handle inputan no rekening
  const handleChangeNoRek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event?.target.value

    const filteredValue = value.replace(/[^0-9-]/g, '')

    setNoRek(filteredValue)
  }

  // handle inputan nama peneransfer
  const handleChangeTransferName = (event: React.ChangeEvent<HTMLInputElement>) => {

    const value = event?.target.value

    const filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
    setTransferName(filteredValue)
  }


  // handle value dari jumlah pembayaran
  const handleValueAmount = () => {
    const formated = handleFormat(Number(amount))

    return formated;
  }

  return (
    <>
      {statusInvoice == "dibayar" ? <Button className='text-white flex items-center justify-center gap-1' disabled>
        <Icon icon="lucide:check-circle" width={16} height={16}></Icon>
        <span>Dibayar</span>
      </Button> : <><Button className='text-white  flex items-center justify-center gap-1' onClick={handleModal}>
        <Icon icon="lucide:wallet" width={16} height={16}></Icon>
        <span>Bayar Invoice</span>
      </Button></>}

      <div className={`p-5 fixed inset-0 z-50 w-full min-h-screen bg-black/80 flex items-center justify-center ${modal ? 'block' : 'hidden'}`}>
        <div className="bg-white rounded p-5 w-full md:w-1/2">
          <h3 className='text-black text-lg mb-7 font-bold'>Konfirmasi Bayar Invoice</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="w-full ">
              <Label>Total Pembayaran</Label>
              <div className="flex items-center gap-1 justify-start">
                <div className="w-10 h-10 rounded-md border border-solid text-center flex items-center justify-center">
                  <span>Rp.</span>
                </div>
                <Input placeholder="0" required onChange={handleChangeAmount} disabled={isLoading} value={handleValueAmount()} className="flex-1" />
              </div>
            </div>
            <div className="w-full mb-3">
              <Label>Bukti pembayaran</Label>
              {previewImage ? <img src={previewImage.toString()} alt="Gambar member" className="w-28 h-28 object-cover rounded mb-2" /> : <div className="w-28 h-28 bg-slate-300 rounded mb-2"></div>}

              <Input type="file" required accept=".jpg, .jpeg, .png" onChange={handleImageInput} disabled={isLoading} />
            </div>
            {paymentMethod == "transfer" && <>
              <div className="w-full mb-3">
                <Label>No Rekening</Label>
                <Input placeholder="No Rekening" onChange={handleChangeNoRek} value={noRek} />
              </div>
              <div className="w-full mb-3">
                <Label>Nama Pembayar</Label>
                <Input placeholder="Nama Pembayar" onChange={handleChangeTransferName} value={transferName} />
              </div>
            </>}
            <div className="w-full flex items-center justify-end gap-3">
              <Button type='button' onClick={handleModal}>Batal</Button>
              <Button type="submit" className='bg-green-400 text-white' disabled={isLoading}>
                {isLoading ? <Loader /> : 'Konfirmasi'}
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

export default ConfirmInvoiceButton