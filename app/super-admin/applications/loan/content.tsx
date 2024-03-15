"use client"

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ListLoan, PositionCategory, SubCategoryState } from '@/types/interface'
import ListLoanMember from './listLoan'
import LoanPopup from './loanPopup'

const ContentLoan = ({listLoan, subCategories, positionCategories}: {listLoan: ListLoan[], subCategories: SubCategoryState[], positionCategories: PositionCategory[],}) => {
    const [subCategory, setSubCategory] = useState<SubCategoryState | undefined>(undefined)


    const handleDropdownChange = (selectedSubCategory: string) => {
        const subCategoryData = subCategories.find((item) => item.name == selectedSubCategory);
        setSubCategory(subCategoryData);
    }
    return (
        <>
            <div className="mb-10">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className='bg-indigo-500 text-white'>Tambah Pinjaman</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-indigo-500 text-white">
                        <DropdownMenuLabel>Sub Kategori</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={subCategory?.toString()} onValueChange={(value) => handleDropdownChange(value)}>
                            {subCategories.map((item) => (
                                <DropdownMenuRadioItem key={item.id} value={item.name} className="cursor-pointer">{item.name}</DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="w-full">
                <h3 className='text-lg font-bold mb-5'>Data Pinjaman Anggota</h3>
                <ListLoanMember listLoan={listLoan} subCategories={subCategories} />
            </div>

            {subCategory && <LoanPopup members={listLoan} subCategory={subCategory} setSubCategory={setSubCategory} />}
        </>
    )
}

export default ContentLoan