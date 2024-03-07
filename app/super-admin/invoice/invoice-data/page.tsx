import MainLayout from '@/components/mainLayout'
import React from 'react'
import AddInvoice from './addInvoice'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getInvoices, getMembersInvoice, getPositionCategories,  getSubCategoriesInvoice } from '@/app/utils/featuresApi'
import ListInvoice from './listInvoice'
import { InvoiceState, PositionCategory, SubCategoryState } from '@/types/interface'

const Invoice = async () => {
    const session = await getServerSession(authOptions)
    const invoices: InvoiceState[] = await getInvoices(session?.user.accessToken)
    const membersInvoice: any[] = await getMembersInvoice(session?.user.accessToken);
    const subCategories: SubCategoryState[] = await getSubCategoriesInvoice(session?.user.accessToken);
    const positionCategories: PositionCategory[] = await getPositionCategories(session?.user.accessToken);

    return (
        <MainLayout>
            <div className="bg-white rounded p-4 w-full">
                <h1 className="text-3xl font-bold mb-10 inline-block text-black pb-1 border-b-4 border-b-solid border-b-amber-400">
                    Invoice
                </h1>
                <AddInvoice subCategories={subCategories} members={membersInvoice} positionCategories={positionCategories} />
                <ListInvoice invoices={invoices} />
            </div>

        </MainLayout>
    )
}

export default Invoice