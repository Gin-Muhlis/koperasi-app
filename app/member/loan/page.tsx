import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import React from 'react'
import Content from './content';
import { ListLoan } from '@/types/interface';
import { getDataLoanMember } from '@/app/utils/featuresApi';

const LoanMember = async () => {
    const session = await getServerSession(authOptions);
    const dataLoan: ListLoan = await getDataLoanMember(session?.user.accessToken)

    return (
        <>
            <div className="bg-white rounded border shadow-lg p-4 w-full">
                <h1 className="text-3xl font-bold mb-10 inline-block text-black pb-1 border-b-4 border-b-solid border-b-blue-400">
                    Data Simpanan
                </h1>

                <Content data={dataLoan} /> 
            </div>
        </>
    )
}

export default LoanMember