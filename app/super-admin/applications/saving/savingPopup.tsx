"use client"

import { capitalizeString } from '@/app/utils/helper'
import { PositionCategory, SubCategoryState } from '@/types/interface'
import React, { useEffect, useState } from 'react'

import { Button } from "@/components/ui/button"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import { useDispatch } from 'react-redux'
import { appDispatch, useAppSelector } from '@/redux/store'
import ListMembers from './listMembers'
import SavingTime from './savingTime'
import Description from './description'
import { createSaving, resetState } from '@/redux/features/saving-slice'
import Loader from '@/app/components/loader'
import { useSession } from 'next-auth/react'
import { createSavingMembers } from '@/app/utils/featuresApi'
import { useRouter } from 'next/navigation'
import SweetAlertPopup from '@/app/components/sweetAlertPopup'
import ListMember from './listMember'
import { Icon } from '@iconify/react/dist/iconify.js'

const SavingPopup = ({ listMembers, positionCategories, subCategory, setSubCategory }: { listMembers: any[], positionCategories: PositionCategory[], subCategory: SubCategoryState, setSubCategory: React.Dispatch<React.SetStateAction<SubCategoryState | undefined>> }) => {
    const { data: session } = useSession();
    const [tab, setTab] = useState('addMembers')
    const [error, setError] = useState<string | boolean>(false);
    const [status, setStatus] = useState<number | boolean>(false);
    const [success, setSuccess] = useState<number | boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const dispatch = useDispatch<appDispatch>();
    const selector = useAppSelector((state) => state.savingReducer);

    const router = useRouter()

    const handleTab = (type: string) => {
        if (tab != type) {
            dispatch(
                resetState()
            );
        }
        setTab(type)

    }

    const saveSaving = async () => {
        setIsLoading(true);

        const selectedMembers: any[] = JSON.parse(selector.selectedMembers)

        if (selectedMembers.length < 1) {
            setIsLoading(false)
            setError('Pilih anggota terlebih dahulu!')
            return

        }

        let isZeroData = false
        selectedMembers.map(data => {
            if (data.amount == 0) {
                isZeroData = true
                return
            }
        })

        if (isZeroData) {
            setIsLoading(false)
            setError('Terdapat anggota dengan jumlah pembayaran 0')
            return
        }


        const data = {
            members: selectedMembers,
            month_year: `${selector.month < 9 ? `0${selector.month}` : `${selector.year}`
                }-${selector.year}`,
            sub_category_id: subCategory.id,
            description: selector.description,
        };

        const response = await createSavingMembers(data, session?.user.accessToken);
        setIsLoading(false)
        setStatus(response.status)
        console.log(response)
        if (response.status == 200) {
            setSuccess(response.data.message);
            dispatch(resetState());
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
            <div className='w-full min-h-screen z-50 bg-zinc-200 p-5 md:p-12 fixed inset-0 overflow-y-scroll'>
                <div className="flex items-center justify-start gap-1 mb-3 text-black cursor-pointer" onClick={() => setSubCategory(undefined)}>
                    <Icon icon="lucide:arrow-left" width={20} height={20}/>
                    <span>Kembali</span>
                </div>
                <div className="w-full rounded bg-white p-5">
                    <h1 className='text-2xl font-bold text-black mb-7'>{capitalizeString(subCategory.name)}</h1>

                    <Tabs defaultValue="account" className="w-full" value={tab}>
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="addMembers" onClick={() => handleTab('addMembers')}>Tambahkan Banyak</TabsTrigger>
                            <TabsTrigger value="addMember" onClick={() => handleTab('addMember')}>Tambahkan per orang</TabsTrigger>
                        </TabsList>
                        <TabsContent value="addMembers">
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 mb-7 pt-4">
                                <SavingTime />
                                <Description />
                            </div>
                            <ListMembers members={listMembers} subCategory={subCategory} positionCategories={positionCategories} />
                            <div className="w-full flex items-center justify-end">
                                <Button className='text-white bg-amber-400' disabled={isLoading} onClick={saveSaving}>
                                    {isLoading ? <Loader /> : 'Simpan Data'}
                                </Button>
                            </div>
                        </TabsContent>
                        <TabsContent value="addMember">
                            <ListMember members={listMembers} subCategory={subCategory} positionCategories={positionCategories} setSubCategory={setSubCategory} />
                        </TabsContent>
                    </Tabs>

                </div>
            </div>
            {success && <SweetAlertPopup message={success.toString()} status={status} resetState={resetStateAction} />}
            {error && <SweetAlertPopup message={error.toString()} status={status} resetState={resetStateAction} />}
        </>
    )
}

export default SavingPopup