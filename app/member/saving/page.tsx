import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import React from 'react'
import Content from './content';
import { ListSaving, SubCategoryState } from '@/types/interface';
import { getDataSavingMember, getSubCategoriesSaving } from '@/app/utils/featuresApi';

const MemberSaving = async () => {
    const session = await getServerSession(authOptions);
    const subCategories: SubCategoryState[] = await getSubCategoriesSaving(session?.user.accessToken);
    const dataSaving: ListSaving = await getDataSavingMember(session?.user.accessToken)

    return (
        <>
            <div className="bg-white rounded border shadow-lg p-4 w-full">
                <h1 className="text-3xl font-bold mb-10 inline-block text-black pb-1 border-b-4 border-b-solid border-b-blue-400">
                    Data Simpanan
                </h1>

                <Content data={dataSaving} subCategories={subCategories} /> 
            </div>
        </>
    )
}

export default MemberSaving