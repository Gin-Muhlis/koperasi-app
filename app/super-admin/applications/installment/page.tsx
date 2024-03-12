import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getInstallmentMembers } from '@/app/utils/featuresApi';
import MainLayout from '@/components/mainLayout';
import { MemberInstallment } from '@/types/interface';
import { getServerSession } from 'next-auth';
import React from 'react'
import ContentInstallment from './content';

const InstallmentMember = async () => {
    const session = await getServerSession(authOptions);
    const members: MemberInstallment[] = await getInstallmentMembers(session?.user.accessToken);
    return (
        <MainLayout>
            <div className="bg-white rounded p-4 w-full">
                <h1 className="text-3xl font-bold mb-10 inline-block text-black pb-1 border-b-4 border-b-solid border-b-amber-400">
                    Angsuran Anggota
                </h1>
                
                <ContentInstallment members={members} />
            </div>
        </MainLayout>
    )
}

export default InstallmentMember