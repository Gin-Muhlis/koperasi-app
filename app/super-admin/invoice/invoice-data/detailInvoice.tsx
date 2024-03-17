"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useDispatch } from 'react-redux'
import { appDispatch, useAppSelector } from '@/redux/store'
import { InvoiceState, MemberState, PositionCategory, Receivable, SubCategoryInvoice, SubCategoryState } from '@/types/interface'
import TableDetailInvoice from './tableDetailInvoice'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { setInvoice } from '@/redux/features/invoice-slice'
import { months, numberMonths } from '@/constants/CONSTS';
import SubCategorySavingInvoicePopup from './subCategorySavingInvoice';
import SubCategoryReceivablePopup from './subCategoryReceivableInvoice';
import { Badge } from '@/components/ui/badge';
import { capitalizeString } from '@/app/utils/helper';

const DetailInvoice = ({ subCategories, members, positionCategories, dataInvoice, resetState }: { subCategories: SubCategoryState[], members: MemberState[], positionCategories: PositionCategory[], dataInvoice: InvoiceState, resetState: () => void }) => {
    const dispatch = useDispatch<appDispatch>()
    const selector = useAppSelector((state) => state.invoiceReducer)
    const [subCategory, setSubCategory] = useState<SubCategoryState | undefined>(undefined)
    const [category, setCategory] = useState<string>('')

    const currentyear = new Date().getFullYear();
    const nextYear = currentyear + 1;

    const handleDescription = (event: any) => {
        dispatch(setInvoice({ type: "SET_DESCRIPTION", value: event.target.value }))
    }

    const handleTimeChange = (type: string, value: number) => {
        dispatch(setInvoice({ type: `SET_${type}`, value }));
    };

    const handleDropdownChange = (selectedSubCategory: string) => {
        const subCategoryData = subCategories.find((item) => item.name == selectedSubCategory);
        setSubCategory(subCategoryData);

        setCategory(subCategoryData?.category as string);
    }

    return (
        <div className='w-full min-h-screen z-50 scroll-element bg-zinc-200 p-5 md:p-12 fixed inset-0 overflow-y-scroll'>
            <div className="w-full rounded bg-white p-5">
                <h1 className='text-2xl font-bold text-black mb-7'>Detail Invoice</h1>
                {/* detail invoice */}
                <div className="w-full flex justify-start items-start gap-5 text-sm mb-7">

                    <div className="basis-2/5">
                        <div className="w-full mb-3 flex items-center">
                            <span className="basis-1/3">
                                Kode Invoice
                            </span>
                            <span className='flex-1 font-semibold'>
                                : {dataInvoice.invoice_code}
                            </span>
                        </div>
                        <div className="w-full mb-3 flex items-center">
                            <span className="basis-1/3">
                                Nama Invoice
                            </span>
                            <span className='flex-1 font-semibold'>
                                : {dataInvoice.invoice_name}
                            </span>
                        </div>
                        <div className="w-full mb-3 flex items-center">
                            <span className="basis-1/3">
                                Sumber Pembayaran
                            </span>
                            <span className='flex-1 font-semibold'>
                                : {dataInvoice.payment_source}
                            </span>
                        </div>
                    </div>
                    <div className="basis-2/5">
                        <div className="w-full mb-3 flex items-center">
                            <span className="basis-1/3">
                                Tanggal Dibuat
                            </span>
                            <span className='flex-1 font-semibold'>
                                : {dataInvoice.date}
                            </span>
                        </div>
                        <div className="w-full mb-3 flex items-center">
                            <span className="basis-1/3">
                                Tenggat Pembayaran
                            </span>
                            <span className='flex-1 font-semibold'>
                                : {dataInvoice.due_date}
                            </span>
                        </div>
                        <div className="w-full mb-3 flex items-center">
                            <span className="basis-1/3">
                                Status
                            </span>
                            <span className='flex-1 font-semibold'>
                                : {dataInvoice.status != 'dibayar' ? <Badge className='bg-red-500'>{dataInvoice.status}</Badge> : <Badge className='bg-green-500'>{dataInvoice.status}</Badge>}
                            </span>
                        </div>
                    </div>
                </div>

                {/* time */}
                <div className="w-full mb-7 grid grid-cols-1 md:grid-cols-2 items-start justify-between gap-4">
                    <div className="flex items-center justify-start gap-4 w-full">
                        <div className='w-full'>
                            <Label className="mb-2 font-bold">Waktu Invoice (Bulan)</Label>
                            <Select
                                value={selector.month.toString()}
                                onValueChange={(value) => handleTimeChange("MONTH", Number(value))}
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
                        <div className='w-full'>
                            <Label className="mb-2 font-bold">Waktu Invoice (Tahun)</Label>
                            <Select
                                value={selector.year.toString()}
                                onValueChange={(value) => handleTimeChange("YEAR", Number(value))}
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
                    <div className='w-full'>
                        <Label className="mb-1 font-bold">Deskripsi (opsional)</Label>
                        <Textarea onChange={handleDescription} className="w-full border border-solid border-slate-300 h-16" defaultValue={selector.description} />
                    </div>
                </div>

                <div className="mb-7">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className='bg-blue-400 text-white'>Tambah Data Invoice</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-blue-400 text-white">
                            <DropdownMenuLabel>Sub Kategori</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup value={subCategory?.toString()} onValueChange={(value) => handleDropdownChange(value)}>
                                {subCategories.map((item) => (
                                    <DropdownMenuRadioItem key={item.id} value={item.name} className="cursor-pointer">{capitalizeString(item.name)}</DropdownMenuRadioItem>
                                ))}

                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {subCategory && subCategory.category == "simpanan" ? <SubCategorySavingInvoicePopup listMembers={members} positionCategories={positionCategories} subCategory={subCategory} setSubCategory={setSubCategory} /> : null}

                {subCategory && subCategory.category == "piutang" ? <SubCategoryReceivablePopup listMembers={members} subCategory={subCategory} setSubCategory={setSubCategory} /> : null}

                <TableDetailInvoice subCategories={subCategories} dataInvoice={dataInvoice} resetStateAction={resetState} />
            </div>

        </div>
    )
}

export default DetailInvoice