import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getReportLoanMembers, getReportMembers, getReportSavingMembers, getSubCategoriesInvoice, getSubCategoriesLoan, getSubCategoriesSaving } from '@/app/utils/featuresApi';
import MainLayout from '@/components/mainLayout';
import { ReportMember, SubCategoryState } from '@/types/interface';
import { getServerSession } from 'next-auth'
import React from 'react'
import Content from './content';

const ReportMembers = async () => {
    const session = await getServerSession(authOptions);
    const reports: ReportMember[] = await getReportLoanMembers(session?.user.accessToken);
    const subCategories: SubCategoryState[] = await getSubCategoriesLoan(session?.user.accessToken);

  return (
    <>
        <div className="bg-white rounded border shadow-lg p-4 w-full">
        <h1 className="text-3xl font-bold mb-10 inline-block text-black pb-1 border-b-4 border-b-solid border-b-blue-400">
          Laporan Pinjaman Anggota
        </h1>
        <Content data={reports} subCategories={subCategories} />
      </div>
    </>
  )
}

export default ReportMembers