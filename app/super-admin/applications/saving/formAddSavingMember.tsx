"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PositionCategory, Status, SubCategoryState } from '@/types/interface';
import React, { useEffect, useState } from 'react'
import SavingTime from './savingTime';
import Description from './description';
import { capitalizeString, handleFormat } from '@/app/utils/helper';
import { useDispatch } from 'react-redux';
import { appDispatch, useAppSelector } from '@/redux/store';
import { createSaving, resetState } from '@/redux/features/saving-slice';
import Loader from '@/app/components/loader';
import { createSavingMembers } from '@/app/utils/featuresApi';
import { useSession } from 'next-auth/react';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { months } from '@/constants/CONSTS';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import SweetAlertPopup from '@/app/components/sweetAlertPopup';
import { useRouter } from 'next/navigation';

const FormAddSavingMember = ({ member, subCategory, positionCategories, setSubCategory }: { member: any, subCategory: SubCategoryState, positionCategories: PositionCategory[], setSubCategory: React.Dispatch<React.SetStateAction<SubCategoryState | undefined>> }) => {
    const { data: session } = useSession();

    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | boolean>(false);
    const [status, setStatus] = useState<number | boolean>(false);
    const [success, setSuccess] = useState<number | boolean>(false);
    const [subCategoryName, setSubCategoryName] = useState(subCategory.name)
    const [typePayment, setTypePayment] = useState<string>(subCategory.type_payment)

    const [amount, setAmount] = useState("0")
    const [month, setMonth] = useState(new Date().getMonth() + 1)
    const [year, setYear] = useState(new Date().getFullYear())
    const [description, setDescription] = useState("-")

    const currentyear = new Date().getFullYear();
    const nextYear = currentyear + 1;

    const router = useRouter()

    useEffect(() => {
        if (member) {
            const payment: string = handleValueAmount(member.position_category_id, member.id)

            setAmount(payment)

        }
    }, [member])

    const handleModal = () => {
        setModal(!modal);
    };

    const handleChangeTime = (type: string, value: string) => {
       

        if (type == "MONTH") {
            setMonth(Number(value))
        } else {
            setYear(Number(value))
        }
        
      };

    const handlePayedMember = (dataPayments: Status[] | undefined) => {
        if (typePayment != 'monthly') {
            return false
        }

        const monthData = month < 10 ? `0${month}` : month;
        const yearData = year;
        let status: string | boolean = false

        dataPayments?.map((data) => {
            if (data.month_year == `${monthData}-${yearData}`) {
                status = data.status
                return
            }
        })
        return status
    }

    const handleValueAmount = (positionCategoryId: number, id: number) => {
        if (member.data[subCategoryName].amount) {
            const lastPayment = member.data[subCategoryName].amount;

            return lastPayment;
        }
        

        const defaultAmount: any = positionCategories.find((data) => data.id == positionCategoryId);

        const payment = defaultAmount[subCategoryName] ?? 0

        return payment.toString()

    }

    const handleUpdateAmount = (amount: string, id: number) => {
        const numericValue = amount.replace(/\D/g, '');

        setAmount(numericValue)

    }

    const saveSaving = async () => {
        setIsLoading(true);

        if (Number(amount) == 0) {
            setIsLoading(true);
            setError('Jumlah pembayaran anggota tidak boleh 0')
            return
        }

        const arrayData: any[] = [];

        const memberData = {
            id: member.id,
            amount
        }

        arrayData.push(memberData)

        const data = {
            members: arrayData,
            month_year: `${month < 9 ? `0${month}` : `${month}`
                }-${year}`,
            sub_category_id: subCategory.id,
            description: description,
        };

        const response = await createSavingMembers(data, session?.user.accessToken);
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
            <Button className='bg-blue-400 text-white' onClick={handleModal}>Tambah Simpanan</Button>
            <div
                className={`p-5 fixed inset-0 z-50 w-full min-h-screen bg-black/80 flex items-center justify-center ${modal ? "block" : "hidden"
                    }`}
            >
                <div
                    className={`w-11/12 max-w-4xl bg-white rounded transition-transform max-h-[90vh] ${modal ? "scale-100" : "scale-0"
                        }`}
                >
                    <div className="p-4 border-b border-b-slate-300 mb-4">
                        <h3 className="font-bold text-lg text-black">Tambah {capitalizeString(subCategory.name)}</h3>
                    </div>
                    <div className='p-4 w-full'>
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 mb-3">
                            <div className="flex items-center justify-start gap-4">
                                <div>
                                    <Label className="mb-2">Waktu Simpanan (Bulan)</Label>
                                    <Select
                                        value={month.toString()}
                                        onValueChange={(value) => handleChangeTime('MONTH', value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Bulan" />
                                        </SelectTrigger>
                                        <SelectGroup>
                                            <SelectContent>
                                                {months.map((item, index) => (
                                                    <SelectItem key={index} value={(index + 1).toString()}>
                                                        {item}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </SelectGroup>
                                    </Select>
                                </div>
                                <div>
                                    <Label className="mb-2">Waktu Simpanan (Tahun)</Label>
                                    <Select
                                        value={year.toString()}
                                        onValueChange={(value) => handleChangeTime('YEAR', value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Tahun" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={currentyear.toString()}>
                                                {currentyear}
                                            </SelectItem>
                                            <SelectItem value={nextYear.toString()}>{nextYear}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div>
                                <Label>Keterangan (opsional)</Label>
                                <Textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-5">
                            <Label>Jumlah Pembayaran</Label>
                            <Input className="w-full" value={handleFormat(Number(amount))} onChange={(event) => handleUpdateAmount(event.target.value, member.id)} disabled={isLoading || handlePayedMember(member.data[subCategoryName].months_status)} />
                        </div>
                        <div className="flex items-center justify-end gap-3">
                            <Button onClick={handleModal}>Batal</Button>
                            { handlePayedMember(member.data[subCategoryName].months_status) ? <Button disabled className={`text-white ${ handlePayedMember(member.data[subCategoryName].months_status).toString() == 'dibayar' ? 'bg-green-500' : 'bg-red-500'}`}>{ handlePayedMember(member.data[subCategoryName].months_status).toString() == 'dibayar' ?  handlePayedMember(member.data[subCategoryName].months_status) : 'Menunggu Pembayaran'}</Button> : <Button className="bg-green-500 text-white" disabled={isLoading} onClick={saveSaving}>{isLoading ? <Loader /> : 'Simpan Data'}</Button>}
                        </div>
                    </div>

                </div>
            </div>
            {success && <SweetAlertPopup message={success.toString()} status={status} resetState={resetStateAction} />}
            {error && <SweetAlertPopup message={error.toString()} status={status} resetState={resetStateAction} />}
        </>
    )
}

export default FormAddSavingMember