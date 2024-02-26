import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getReportMembers } from '@/app/utils/featuresApi';
import MainLayout from '@/components/mainLayout';
import { ReportMember } from '@/types/interface';
import { getServerSession } from 'next-auth'
import React from 'react'
import Content from './content';

const ReportMembers = async () => {
    const session = await getServerSession(authOptions);
    const reports: ReportMember[] = await getReportMembers(session?.user.accessToken);

  return (
    <MainLayout>
        <div className="bg-white rounded p-4 w-full">
        <h1 className="text-3xl font-bold mb-7 inline-block text-black pb-1 border-b-4 border-b-solid border-b-amber-400">
          Laporan Anggota
        </h1>
        <Content data={reports} />
      </div>
    </MainLayout>
  )
}

export default ReportMembers