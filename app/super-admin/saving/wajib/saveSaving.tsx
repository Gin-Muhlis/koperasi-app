"use client"

import { createSavingMembers } from '@/app/utils/featuresApi';
import { Button } from '@/components/ui/button'
import { createSaving } from '@/redux/features/saving-slice';
import { appDispatch, useAppSelector } from '@/redux/store';
import { SubCategoryState } from '@/types/interface';
import { useSession } from 'next-auth/react';
import React from 'react'
import { useDispatch } from 'react-redux';

const SaveSaving = ({ subCategories }: { subCategories: SubCategoryState[] }) => {
    const { data: session } = useSession()
    const dispatch = useDispatch<appDispatch>();
    const selector = useAppSelector((state) => state.savingReducer);

    

    const handleSaveSaving = async () => {
        const subCategory: SubCategoryState | undefined = subCategories.find(item => item.name == "simpanan wajib")

        const arrayIdMembers = JSON.parse(selector.members).map((member: any) => member.id)

        const data = {
            members_id: arrayIdMembers,
            month_year: `${selector.month}-${selector.year}`,
            sub_category_id: subCategory?.id,
            description: selector.description,
            amount: selector.amount,
            type_saving: subCategory?.name
        }


        const response = await createSavingMembers(data, session?.user.accessToken)
        console.log(response)
    }

    return (
        <div className='w-full flex justify-end'>
            <Button className='bg-amber-400 text-white' onClick={handleSaveSaving}>Simpan Data Simpanan</Button>
        </div>
    )
}

export default SaveSaving