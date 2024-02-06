"use client"

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { setInvoice } from '@/redux/features/invoice-slice';
import { appDispatch, useAppSelector } from '@/redux/store';
import React from 'react'
import { useDispatch } from 'react-redux';

const Time = () => {
    const dispatch = useDispatch<appDispatch>();
    const selector = useAppSelector((state) => state.invoiceReducer)

    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;

    const handleMonth = (value: string) => {
        dispatch(setInvoice({type: "SET_MONTH", value}))
    }

    const handleYear = (value: string) => {
        dispatch(setInvoice({type: "SET_YEAR", value}))
    }

  return (
    <div className='w-1/2 flex flex-wrap sm:flex-nowrap gap-2 align-center justify-start'>
        <Select defaultValue={selector.month.toString()} onValueChange={handleMonth}>
            <SelectTrigger>
                <SelectValue placeholder="Pilih Bulan" />
            </SelectTrigger>
            <SelectGroup>
                <SelectContent>
                    {months.map((month, index) => (
                        <SelectItem key={index} value={(index + 1).toString()}>
                            {month}
                        </SelectItem>
                    ))}
                    
                </SelectContent>
            </SelectGroup>
        </Select>
        <Select defaultValue={selector.year.toString()} onValueChange={handleYear}>
            <SelectTrigger>
                <SelectValue placeholder="Pilih Tahun" />
            </SelectTrigger>
            <SelectGroup>
                <SelectContent>
                    <SelectItem value={currentYear.toString()}>{currentYear}</SelectItem>
                    <SelectItem value={nextYear.toString()}>{nextYear}</SelectItem>
        
                </SelectContent>
            </SelectGroup>
        </Select>
    </div>
  )
}

export default Time