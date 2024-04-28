"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ListLoan, PositionCategory, ReceivableData, Status, SubCategoryState } from '@/types/interface';
import React, { ReactElement, useEffect, useState } from 'react'
import { capitalizeString, convertDateFormat, handleFormat } from '@/app/utils/helper';
import Loader from '@/app/components/loader';
import { useSession } from 'next-auth/react';
import SweetAlertPopup from '@/app/components/sweetAlertPopup';
import { useRouter } from 'next/navigation';
import { createLoanMember } from '@/app/utils/featuresApi';
import { Textarea } from '@/components/ui/textarea';

const FormAddLoan = ({ member, subCategory, setSubCategory }: { member: ListLoan, subCategory: SubCategoryState, setSubCategory: React.Dispatch<React.SetStateAction<SubCategoryState | undefined>> }) => {
    const { data: session } = useSession();

    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | boolean>(false);
    const [status, setStatus] = useState<number | boolean>(false);
    const [success, setSuccess] = useState<number | boolean>(false);

    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1;
    const day = new Date().getDate()

    const [amount, setAmount] = useState("0")
    const [duration, setDuration] = useState(1)
    const [deadline, setDeadline] = useState(`${year}-${Number(month) + 1}-${day}`)
    const [description, setDescription] = useState("-")
    const [total, setTotal] = useState(0)

    const router = useRouter()



    const handleModal = () => {
        setModal(!modal);
    };

    const handleInputAmount = (event: React.ChangeEvent<HTMLInputElement>) => {

        const amount = event.target.value
        const numericValue = amount.replace(/\D/g, '');

        setAmount(numericValue)
        setTotal(handleTotalLoanMember(Number(numericValue), duration))
    }
    
    const handleTotalLoanMember = (amount: number, duration: number) => {
        const interest = 1.5 / 100;

        let interestAmount = Number(amount) * Number(interest) * Number(duration)
        const total = Number(amount) + interestAmount;

        return total;
    }

    const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        const date = new Date(`${year}-${month}-${day}`);
        date.setMonth(date.getMonth() + Number(value))

        const deadline = date.toISOString().slice(0, 10);

        setDuration(Number(value))
        
        const total = handleTotalLoanMember(Number(amount), Number(value));
        
        setDeadline(deadline)
        setTotal(total)
    }


    const saveLoan = async () => {
        setIsLoading(true);

        if (Number(amount) == 0) {
            setIsLoading(true);
            setError('Jumlah pinjaman anggota tidak boleh 0')
            return
        }


        const data: ReceivableData = {
            member_id: member.id,
            amount: Number(amount),
            sub_category_id: subCategory.id,
            duration,
            date: `${year}-${month}-${day}`,
            total,
            deadline,
            description
        };

        const response = await createLoanMember(data, session?.user.accessToken);
        setIsLoading(false)
        setStatus(response.status)

        if (response.status == 200) {
            setModal(!modal)
            setSuccess(response.data.message);
        } else if (response.stsatus == 422) {
            const errorsData = response.data.errors;
            const keys = Object.keys(errorsData);
            const firstKey = keys[0];
            const message = errorsData[firstKey][0];

            setError(message);
        } else {
            setError(response.data.message);
        }
    }

    const resetStateAction = () => {
        setStatus(false)
        setError(false)
        if (success) {
            setSuccess(false)
            setSubCategory(undefined)
            router.refresh()
        }

    }

    return (
        <>
            <Button className='bg-blue-400 text-white' onClick={handleModal}>Tambah Pinjaman</Button>
            <div
                className={`p-5 fixed inset-0 z-50 w-full min-h-screen bg-black/80 flex items-center justify-center ${modal ? "block" : "hidden"
                    }`}
            >
                <div
                    className={`w-11/12 max-w-4xl bg-white rounded transition-transform max-h-[90vh] overflow-y-scroll ${modal ? "scale-100" : "scale-0"
                        }`}
                >
                    <div className="p-4 border-b border-b-slate-300 mb-4">
                        <h3 className="font-bold text-lg text-black">Tambah {capitalizeString(subCategory.name)}</h3>
                    </div>
                    <div className='p-4 w-full'>
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 mb-3">

                            <div className="mb-5">
                                <Label>Jumlah Peminjaman</Label>
                                <Input value={handleFormat(Number(amount))} onChange={handleInputAmount} disabled={isLoading} />
                            </div>
                            <div className="mb-5">
                                <Label>Durasi Peminjaman (bulan)</Label>
                                <Input type='number' min={1} value={duration} disabled={isLoading} onChange={handleDurationChange} />
                            </div>
                            <div className="mb-5">
                                <Label>Tanggal Peminjaman</Label>
                                <Input readOnly value={convertDateFormat(`${year}-${month}-${day}`)} />
                            </div>
                            <div className="mb-5">
                                <Label>Tenggat Pembayaran</Label>
                                <Input readOnly value={convertDateFormat(deadline)} />
                            </div>
                            <div className="mb-5">
                                <Label>Total Pinjaman</Label>
                                <Input readOnly value={handleFormat(total)} />
                            </div>
                        </div>
                        <div className='mb-3'>
                            <Label>Keterangan (opsional)</Label>
                            <Textarea
                                disabled={isLoading}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-end gap-3">
                            <Button onClick={handleModal}>Batal</Button>
                            <Button className='bg-green-500 text-white' disabled={isLoading} onClick={saveLoan}>
                                {isLoading ? <Loader /> : 'Simpan Data'}
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
            {success && <SweetAlertPopup message={success.toString()} status={status} resetState={resetStateAction} />}
            {error && <SweetAlertPopup message={error.toString()} status={status} resetState={resetStateAction} />}
        </>
    )
}

export default FormAddLoan