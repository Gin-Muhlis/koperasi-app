"use client"

import Loader from '@/app/components/loader'
import SweetAlertPopup from '@/app/components/sweetAlertPopup'
import { createPaymentInvoice } from '@/app/utils/featuresApi'
import { handleFormat } from '@/app/utils/helper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ConfirmInvoiceButton = ({ invoiceId, totalPayment, statusInvoice }: { invoiceId: number, totalPayment: string, statusInvoice: string }) => {
  const [modal, setModal] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<string | boolean>(false)
  const [error, setError] = useState<string | boolean>(false)
  const [status, setStatus] = useState<number | boolean>(false)
  const [amount, setAmount] = useState(totalPayment.replaceAll('.', ''));
  const [noRek, setNoRek] = useState<string>("");
  const [payer, setPayer] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  const router = useRouter()
  const { data: session } = useSession()

  const handleModal = () => {
    setModal(!modal);
  }

  const resetStateAction = () => {
    setError(false)
    setSuccess(false)
    setStatus(false)
    setAmount(totalPayment.replaceAll('.', ''))
    setNoRek("")
    setPayer("")
    setPaymentMethod("")
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true)

    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("invoice_id", invoiceId.toString());
    formData.append("total_invoice", totalPayment.replaceAll('.', ''));
    formData.append("payer", payer);
    formData.append("payment_method", paymentMethod);
    if (noRek.length > 0) {
      formData.append("no_rek", noRek);
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
  const handlePayer = (event: React.ChangeEvent<HTMLInputElement>) => {

    const value = event?.target.value

    const filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
    setPayer(filteredValue)
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
              <Label>Nama Pembayar</Label>
              <Input placeholder="Nama Pembayar" onChange={handlePayer} value={payer} disabled={isLoading} />
            </div>
            <div className="w-full mb-3">
              <Label>Metode Pembayaran</Label>
              <Select onValueChange={(value) => setPaymentMethod(value)} disabled={isLoading}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Metode Pembayaran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Metode Pembayaran</SelectLabel>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="transfer">Transfer</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {paymentMethod == "transfer" && <>
              <div className="w-full mb-3">
                <Label>No Rekening</Label>
                <Input placeholder="No Rekening" onChange={handleChangeNoRek} value={noRek} disabled={isLoading} />
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