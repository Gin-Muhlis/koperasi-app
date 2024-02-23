import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getDetailInvoice } from '@/app/utils/featuresApi';
import MainLayout from '@/components/mainLayout';
import { InvoiceState } from '@/types/interface';
import { getServerSession } from 'next-auth'
import React from 'react'
import Content from './content';

const DetailInvoice = async ({ params }: { params: { invoiceCode: string } }) => {
  const session = await getServerSession(authOptions);
  const detailInvoice: InvoiceState = await getDetailInvoice(session?.user.accessToken, params.invoiceCode);

  return (
    <MainLayout>
      <Content detailInvoice={detailInvoice} />
    </MainLayout>
  )
}

export default DetailInvoice
