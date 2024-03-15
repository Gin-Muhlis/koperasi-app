import MainLayout from '@/components/mainLayout'
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { ListLoan, ListSaving, PositionCategory, SubCategoryState } from '@/types/interface'
import { getLoansMember, getPositionCategories, getSubCategoriesLoan } from '@/app/utils/featuresApi'
import ContentLoan from './content'

const SavingApp = async () => {
    const session = await getServerSession(authOptions);
    const subCategories: SubCategoryState[] = await getSubCategoriesLoan(session?.user.accessToken);
    const loanMembers: ListLoan[] = await getLoansMember(session?.user.accessToken);
    const positionCategories: PositionCategory[] = await getPositionCategories(session?.user.accessToken);

    console.log(subCategories)

    return (
        <>
            <div className="bg-white rounded border shadow-lg p-4 w-full">
                <h1 className="text-3xl font-bold mb-10 inline-block text-black pb-1 border-b-4 border-b-solid border-b-amber-400">
                    Pinjaman Anggota
                </h1>

                <ContentLoan positionCategories={positionCategories} listLoan={loanMembers} subCategories={subCategories} />
            </div>
        </>
    )
}

export default SavingApp