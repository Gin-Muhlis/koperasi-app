import MainLayout from '@/components/mainLayout'
import React from 'react'
import ContentSaving from './content'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { ListSaving, PositionCategory, SubCategoryState } from '@/types/interface'
import { getMemberSaving, getPositionCategories, getSavingsMember, getSubCategoriesSaving } from '@/app/utils/featuresApi'

const SavingApp = async () => {
    const session = await getServerSession(authOptions);
    const subCategories: SubCategoryState[] = await getSubCategoriesSaving(session?.user.accessToken);
    const savingMembers: ListSaving[] = await getSavingsMember(session?.user.accessToken);
    const positionCategories: PositionCategory[] = await getPositionCategories(session?.user.accessToken);
    const memberSaving: any[] = await getMemberSaving(session?.user.accessToken);

    return (
        <MainLayout>
            <div className="bg-white rounded p-4 w-full">
                <h1 className="text-3xl font-bold mb-10 inline-block text-black pb-1 border-b-4 border-b-solid border-b-amber-400">
                    Simpanan Anggota
                </h1>

                <ContentSaving positionCategories={positionCategories} listMembers={memberSaving} listSavings={savingMembers} subCategories={subCategories} />
            </div>
        </MainLayout>
    )
}

export default SavingApp