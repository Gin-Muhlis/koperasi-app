"use client"

import AlertError from '@/app/components/alertError'
import AlertSuccess from '@/app/components/alertSuccess'
import Loader from '@/app/components/loader'
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
  const [amount, setAmount] = useState(totalPayment.replaceAll('.', ''));
  const [noRek, setNoRek] = useState<string>("");
  const [transferName, setTransferName] = useState<string>("");

  const router = useRouter()
  const { data: session } = useSession()
  
  // handle muncul modal
  const handleModal = () => {
    setModal(!modal);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true)

    const data = {
      amount: Number(amount),
      no_rek: noRek.length > 0 ? noRek : null,
      transfer_name: transferName.length > 0 ? transferName : null,
      invoice_id: invoiceId,
      total_invoice: Number(totalPayment.replaceAll('.', ''))
    }

    const response = await createPaymentInvoice(data, session?.user.accessToken)
    setIsLoading(false)
    console.log(response)
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
  console.log(amount)
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
      {statusInvoice == "dibayar" ?<Button className='text-white flex items-center justify-center gap-1' disabled>
        <Icon icon="lucide:check-circle" width={16} height={16}></Icon>
        <span>Dibayar</span>
      </Button> : <><Button className='text-white  flex items-center justify-center gap-1' onClick={handleModal}>
        <Icon icon="lucide:wallet" width={16} height={16}></Icon>
        <span>Bayar Invoice</span>
      </Button></>}

      <div className={`p-5 fixed inset-0 z-50 w-full min-h-screen bg-black/80 flex items-center justify-center ${modal ? 'block' : 'hidden'}`}>
        <div className="bg-white rounded p-5 w-full md:w-1/2">
        <h3 className='text-black text-lg mb-7 font-bold'>Konfirmasi Bayar Invoice</h3>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="w-full mb-3">
              <Label>Total Pembayaran</Label>
              <div className="flex items-center gap-1 justify-start">
                <div className="w-10 h-10 rounded-md border border-solid text-center flex items-center justify-center">
                  <span>Rp.</span>
                </div>
              <Input placeholder="0" onChange={handleChangeAmount} value={handleValueAmount()} className="flex-1" />
              </div>
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
      {success && <AlertSuccess message={success.toString()} isShow={true} setSuccess={setSuccess} />}
      {error && <AlertError message={error.toString()} isShow={true} setError={setError} />}
    </>
  )
}

export default ConfirmInvoiceButton