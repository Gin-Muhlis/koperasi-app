"use client"

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import FormInvoice from './formAddInvoice';
import { InvoiceState, MemberState, PositionCategory, Receivable, SubCategoryInvoice, SubCategoryState } from '@/types/interface';
import DetailInvoice from './detailInvoice';
import AlertSuccess from '@/app/components/alertSuccess';
import SweetAlertPopup from '@/app/components/sweetAlertPopup';

const AddInvoice = ({ subCategories, members, positionCategories }: { subCategories: SubCategoryState[], members: any[], positionCategories: PositionCategory[] }) => {
    const [modal, setModal] = useState(false);
    const [dataInvoice, setDataInvoice] = useState<InvoiceState | null>(null)
    const [success, setSuccess] = useState<string | boolean>(false)
    const [status, setStatus] = useState<number | boolean>(false)

    const handleModal = () => {
        setModal(!modal);
    }

    const resetStateAction = () => {
        setStatus(false)
        setSuccess(false)
        setDataInvoice(null)
    }

    return (
        <div className='mb-10'>
            <Button className='text-white bg-amber-400' onClick={handleModal}>Tambah Invoice</Button>

            <div className={`p-5 fixed inset-0 z-50 w-full min-h-screen bg-black/80 flex items-center justify-center ${modal ? 'block' : 'hidden'}`}>
                <div className="bg-white rounded p-5 w-full md:w-1/2">
                    <h3 className='text-black text-lg mb-7'>Data Invoice</h3>
                    <FormInvoice handleModal={handleModal} setDataInvoice={setDataInvoice} />
                </div>
            </div>

            {dataInvoice != null && <DetailInvoice subCategories={subCategories} members={members} positionCategories={positionCategories} dataInvoice={dataInvoice} resetState={resetStateAction} />}

            {success && <SweetAlertPopup message={success.toString()} status={status} resetState={resetStateAction} />}
        </div>
    )
}

export default AddInvoice