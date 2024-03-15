import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getDetailInvoice, getSubCategoriesInvoice } from '@/app/utils/featuresApi';
import MainLayout from '@/components/mainLayout';
import { InvoiceState, SubCategoryState } from '@/types/interface';
import { getServerSession } from 'next-auth'
import React from 'react'
import Content from './content';

const DetailInvoice = async ({ params }: { params: { invoiceCode: string } }) => {
  const session = await getServerSession(authOptions);
  const detailInvoice: InvoiceState = await getDetailInvoice(session?.user.accessToken, params.invoiceCode);
  const subCategories: SubCategoryState[] = await getSubCategoriesInvoice(session?.user.accessToken);

  return (
    <>
      <Content detailInvoice={detailInvoice} subCategories={subCategories} />
    </>
  )
}

export default DetailInvoice
