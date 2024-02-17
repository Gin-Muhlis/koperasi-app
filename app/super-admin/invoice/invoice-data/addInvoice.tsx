"use client"

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import FormInvoice from './formAddInvoice';
import { InvoiceState, MemberState, SubCategoryInvoice } from '@/types/interface';
import DetailInvoice from './detailInvoice';

const AddInvoice = ({members, membersPrincipal, membersMandatory}: {members: MemberState[], membersPrincipal: SubCategoryInvoice[], membersMandatory: SubCategoryInvoice[]}) => {
    const [modal, setModal] = useState(false);
    const [dataInvoice, setDataInvoice] = useState<InvoiceState | null>(null)

    const handleModal = () => {
        setModal(!modal);
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

            {dataInvoice != null && <DetailInvoice memberPrincipalSaving={membersPrincipal} members={members} memberMandatorySaving={membersMandatory} dataInvoice={dataInvoice} />}

        </div>
    )
}

export default AddInvoice