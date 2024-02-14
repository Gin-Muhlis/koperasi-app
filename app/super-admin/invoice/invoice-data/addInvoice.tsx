"use client"

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import FormInvoice from './formAddInvoice';

const AddInvoice = () => {
    const [modal, setModal] = useState(false);

    const handleModal = () => {
        setModal(!modal);
    }

    return (
        <div className='mb-10'>
            <Button className='text-white bg-amber-400' onClick={handleModal}>Tambah Invoice</Button>

            <div className={`p-5 fixed inset-0 z-50 w-full min-h-screen bg-black/80 flex items-center justify-center ${modal ? 'block' : 'hidden'}`}>
                <div className="bg-white rounded p-5 w-full md:w-1/2">
                    <h3 className='text-black text-lg mb-7'>Data Invoice</h3>
                    <FormInvoice handleModal={handleModal} />
                </div>
            </div>
        </div>
    )
}

export default AddInvoice