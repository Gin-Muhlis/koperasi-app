"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ListLoan, MemberInstallment, PositionCategory, ReceivableData, Status, SubCategoryState, installmentData } from '@/types/interface';
import React, { ReactElement, useEffect, useState } from 'react'
import { capitalizeString, convertDateFormat, handleFormat } from '@/app/utils/helper';
import Loader from '@/app/components/loader';
import { useSession } from 'next-auth/react';
import SweetAlertPopup from '@/app/components/sweetAlertPopup';
import { useRouter } from 'next/navigation';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { createInstallmentMember } from '@/app/utils/featuresApi';


const FormAddInstallment = ({ member }: { member: MemberInstallment }) => {
    const { data: session } = useSession();

    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | boolean>(false);
    const [status, setStatus] = useState<number | boolean>(false);
    const [success, setSuccess] = useState<number | boolean>(false);
    const [remainDuration, setRemainDuration] = useState<number[]>([])

    const [monthPayment, setMonthPayment] = useState(1)
    const [remainDurationPayment, setRemainDurationPayment] = useState(0)
    const [payment, setPayment] = useState(member.monthly)
    const [remainPayment, setRemainPayment] = useState(member.remain_payment - member.monthly)
    const [estimate, setEstimate] = useState("")

    useEffect(() => {
        if (member) {
            const data = [];
            for (let i = 1; i <= member.remain_duration; i++) {
                data.push(i)
            }

            setRemainDuration(data)
            setRemainDurationPayment(data.length - 1)

            const date = new Date()
            date.setMonth(date.getMonth() + member.remain_duration)
            const fullEstimate = date.toISOString().slice(0, 10);

            setEstimate(fullEstimate)

        }
    }, [member])

    const router = useRouter()



    const handleModal = () => {
        setModal(!modal);
    };

    const handleMonthPaymentChange = (value: string) => {
        setMonthPayment(Number(value))

        const remainMonth = remainDuration.length - Number(value);
        setRemainDurationPayment(remainMonth)

        const paymentMember = member.monthly * Number(value)
        setPayment(paymentMember)

        const remainPaymentMember = member.remain_payment - paymentMember;
        setRemainPayment(remainPaymentMember)

        const date = new Date()
        date.setMonth(date.getMonth() + remainMonth + 1)
        const fullEstimate = date.toISOString().slice(0, 10);

        setEstimate(fullEstimate)
    }

    const handleEstimate = () => {
        const estimateDate = convertDateFormat(estimate);
        const splitDate = estimateDate.split(' ')
        return `${splitDate[1]} ${splitDate[2]}`
    }

    const saveInsallment = async () => {
        setIsLoading(true);

        const installmentData: installmentData = {
            member_id: member.id,
            amount: payment,
            loan_id: member.loan_id,
            sub_category_id: member.sub_category_id
        };

        const response = await createInstallmentMember(installmentData, session?.user.accessToken);
        setIsLoading(false)
        setStatus(response.status)
        console.log(response)

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
            router.refresh()
        }

    }

    return (
        <div>
            <Button className='bg-blue-400 text-white' onClick={handleModal}>Tambah Angsuran</Button>
            <div
                className={`p-5 fixed inset-0 z-50 w-full min-h-screen bg-black/80 flex items-center justify-center ${modal ? "block" : "hidden"
                    }`}
            >
                <div
                    className={`w-11/12 max-w-4xl bg-white rounded transition-transform max-h-[90vh] overflow-y-scroll ${modal ? "scale-100" : "scale-0"
                        }`}
                >
                    <div className="p-4 border-b border-b-slate-300 mb-4">
                        <h3 className="font-bold text-lg text-black">Tambah Pembayaran</h3>
                    </div>
                    <div className='p-4 w-full'>
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 mb-3">
                            <div className='w-full'>
                                <Label>Jumlah Bulan Pembayaran</Label>
                                <Select value={monthPayment.toString()} disabled={isLoading} onValueChange={(value) => handleMonthPaymentChange(value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Jumlah Bulan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {remainDuration.map((value) => (
                                                <SelectItem key={value} value={value.toString()}>{value}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className='w-full'>
                                <Label>Sisa Bulan Pembayaran</Label>
                                <Input readOnly value={remainDurationPayment} />
                            </div>
                            <div className='w-full'>
                                <Label>Pembayaran</Label>
                                <Input readOnly value={handleFormat(payment)} />
                            </div>
                            <div className='w-full'>
                                <Label>Sisa Pembayaran</Label>
                                <Input readOnly value={handleFormat(remainPayment)} />
                            </div>
                        </div>
                        <p className="text-slate-600 my-2 italic">
                            Estimasi Lunas: {handleEstimate()}
                        </p>
                        <div className="flex items-center justify-end gap-3">
                            <Button onClick={handleModal}>Batal</Button>
                            <Button className='bg-green-500 text-white' disabled={isLoading} onClick={saveInsallment}>
                                {isLoading ? <Loader /> : 'Simpan Data'}
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
            {success && <SweetAlertPopup message={success.toString()} status={status} resetState={resetStateAction} />}
            {error && <SweetAlertPopup message={error.toString()} status={status} resetState={resetStateAction} />}
        </div>
    )
}

export default FormAddInstallment