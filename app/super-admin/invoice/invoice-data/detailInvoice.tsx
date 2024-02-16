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
import { useDispatch } from 'react-redux'
import { appDispatch, useAppSelector } from '@/redux/store'
import PrincipalSavingPopup from './subCategory/principalSaving'
import { MemberState, SubCategoryInvoice } from '@/types/interface'
import TableDetailInvoice from './tableDetailInvoice'

const DetailInvoice = ({members, memberPrincipalSaving}: {members: MemberState[], memberPrincipalSaving: SubCategoryInvoice[]}) => {
    const dipatch = useDispatch<appDispatch>()
    const selector = useAppSelector((state) => state.invoiceReducer)
    const [subCategory, setSubCategory] = useState<string>("")

    return (
        <div className='w-full min-h-screen z-50 bg-black p-5 md:p-12 fixed inset-0 overflow-y-scroll'>
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
                                : adkfaldfjw
                            </span>
                        </div>
                        <div className="w-full mb-3 flex items-center">
                            <span className="basis-1/3">
                                Nama Invoice
                            </span>
                            <span className='flex-1 font-semibold'>
                                : adkfaldfjw
                            </span>
                        </div>
                        <div className="w-full mb-3 flex items-center">
                            <span className="basis-1/3">
                                Sumber Pembayaran
                            </span>
                            <span className='flex-1 font-semibold'>
                                : adkfaldfjw
                            </span>
                        </div>
                    </div>
                    <div className="basis-2/5">
                        <div className="w-full mb-3 flex items-center">
                            <span className="basis-1/3">
                                Tanggal Dibuat
                            </span>
                            <span className='flex-1 font-semibold'>
                                : adkfaldfjw
                            </span>
                        </div>
                        <div className="w-full mb-3 flex items-center">
                            <span className="basis-1/3">
                                Tenggat Pembayaran
                            </span>
                            <span className='flex-1 font-semibold'>
                                : adkfaldfjw
                            </span>
                        </div>
                        <div className="w-full mb-3 flex items-center">
                            <span className="basis-1/3">
                                Metode Pembayaran
                            </span>
                            <span className='flex-1 font-semibold'>
                                : adkfaldfjw
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mb-7">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className='bg-amber-400 text-white'>Tambah Data Invoice</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Sub Kategori</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup value={subCategory} onValueChange={setSubCategory}>
                                <DropdownMenuRadioItem value="simpanan pokok">Simpanan Pokok</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {subCategory == "simpanan pokok" && <PrincipalSavingPopup memberPrincipalSaving={memberPrincipalSaving} setSubCategory={setSubCategory} />}

                <TableDetailInvoice members={members} />
            </div>

        </div>
    )
}

export default DetailInvoice