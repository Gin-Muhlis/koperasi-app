import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getInvoices } from '@/app/utils/featuresApi';
import MainLayout from '@/components/mainLayout';
import { InvoiceState } from '@/types/interface';
import { getServerSession } from 'next-auth';
import React from 'react'
import Content from './content';

const Invoice = async () => {
    const session = await getServerSession(authOptions);
    const invoices: InvoiceState[] = await getInvoices(session?.user.accessToken);
    console.log(invoices)
    return (
      <MainLayout>
        <div className="bg-white rounded p-4 w-full">
          <h1 className="text-3xl font-bold mb-10 inline-block text-black pb-1 border-b-4 border-b-solid border-b-amber-400">
            Kategori
          </h1>
  
          <div className="mb-5">
            download
          </div>
  
          <Content invoices={invoices} />
  
        </div>
  
      </MainLayout>
    );
}

export default Invoice