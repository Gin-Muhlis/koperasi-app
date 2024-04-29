import MainLayout from '@/components/mainLayout'
import type { Metadata } from 'next'
import React from 'react'
import { DashboardAdmin, IProps } from '@/types/interface'
import AlertError from '@/app/components/alertError'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getDashboardAdmin } from '@/app/utils/featuresApi'
import DataDetail from './dataDetail'
import HistoryInvoices from './historyInvoice'
import TopPositionCategories from './topPositionCategories'
import ChartLoan from '@/app/components/barChart'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Aplikasi untuk pendataan di koperasi',
}

const Dashboard = async ({ searchParams }: IProps) => {
  const session = await getServerSession(authOptions);
  const dashboardData: DashboardAdmin = await getDashboardAdmin(session?.user.accessToken);

  return (
    <>
      <div className="w-full grid grid-cols-1 gap-5">
        <DataDetail data={dashboardData} />
        <ChartLoan data={dashboardData.loan_grafik} />
        <div className="block md:flex md:gap-4">
          <HistoryInvoices historyInvoices={dashboardData.history_invoices} />
          <TopPositionCategories listPosition={dashboardData.top_position_categories_loan} />
        </div>
      </div>

      {searchParams?.message && <AlertError message={searchParams.message.toString()} isShow={true} />}
    </>
  )
}

export default Dashboard