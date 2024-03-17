import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import AlertError from '@/app/components/alertError';
import { DashboardMember, IProps, SubCategoryState } from '@/types/interface';
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth';
import React from 'react'
import DataSavingMember from './dataSavingMember';
import HistoryInstallments from './historyInstallments';
import HistorySavings from './historySavings';
import { getDashboardMember, getSubCategoriesSaving } from '@/app/utils/featuresApi';

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Aplikasi untuk pendataan di koperasi',
}

const Dashboard = async ({ searchParams }: IProps) => {
    const session = await getServerSession(authOptions)
    const dashboardData: DashboardMember = await getDashboardMember(session?.user.accessToken);
    const subCategories: SubCategoryState[] = await getSubCategoriesSaving(session?.user.accessToken);
    
    console.log(dashboardData)
    return (
        <>
            <div className="w-full">
                <DataSavingMember data={dashboardData} subCategories={subCategories} />
                <div className='gap-5 grid grid-cols-1 md:grid-cols-2 mt-10'>
                    <HistorySavings data={dashboardData} />
                    <HistoryInstallments data={dashboardData} />
                </div>
            </div>

            {searchParams?.message && <AlertError message={searchParams.message.toString()} isShow={true} />}
        </>
    )
}

export default Dashboard