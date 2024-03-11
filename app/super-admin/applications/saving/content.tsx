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
import { ListSaving, PositionCategory, SubCategoryState } from '@/types/interface'
import ListSavingMember from './listSaving'
import SavingPopup from './savingPopup'

const ContentSaving = ({listSavings, subCategories, listMembers, positionCategories}: {listSavings: ListSaving[], subCategories: SubCategoryState[], listMembers: any[], positionCategories: PositionCategory[],}) => {
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
                        <Button className='bg-amber-400 text-white'>Tambah Simpanan</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-amber-400 text-white">
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
                <h3 className='text-lg font-bold mb-5'>Data Simpanan Anggota</h3>
                <ListSavingMember listSavings={listSavings} subCategories={subCategories} />
            </div>

            {subCategory && <SavingPopup listMembers={listMembers} positionCategories={positionCategories} subCategory={subCategory} setSubCategory={setSubCategory} />}
        </>
    )
}

export default ContentSaving