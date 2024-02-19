import MainLayout from '@/components/mainLayout'
import React from 'react'
import AddInvoice from './addInvoice'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getInvoices, getMemberAccountReceivable, getMemberMandatorySaving, getMemberPrincipalSaving, getMemberReceivable, getMemberRecretionalSaving, getMemberSpecialMandatorySaving, getMemberVoluntarySaving, getMembers } from '@/app/utils/featuresApi'
import ListInvoice from './listInvoice'
import { InvoiceState, MemberState, Receivable, SubCategoryInvoice } from '@/types/interface'

const Invoice = async () => {
    const session = await getServerSession(authOptions)
    const invoices: InvoiceState[] = await getInvoices(session?.user.accessToken)
    const membersPrincipal: SubCategoryInvoice[] = await getMemberPrincipalSaving(session?.user.accessToken)
    const membersMandatory: SubCategoryInvoice[] = await getMemberMandatorySaving(session?.user.accessToken)
    const membersSpecialMandatory: SubCategoryInvoice[] = await getMemberSpecialMandatorySaving(session?.user.accessToken)
    const memberVoluntary: SubCategoryInvoice[] = await getMemberVoluntarySaving(session?.user.accessToken)
    const memberRecretional: SubCategoryInvoice[] = await getMemberRecretionalSaving(session?.user.accessToken)
    const memberReceivable: Receivable[] = await getMemberReceivable(session?.user.accessToken)
    const memberAccountReceivable: Receivable[] = await getMemberAccountReceivable(session?.user.accessToken)
    const members: MemberState[] = await getMembers(session?.user.accessToken)

    return (
        <MainLayout>
            <div className="bg-white rounded p-4 w-full">
                <h1 className="text-3xl font-bold mb-10 inline-block text-black pb-1 border-b-4 border-b-solid border-b-amber-400">
                    Invoice
                </h1>
                <AddInvoice members={members} membersPrincipal={membersPrincipal} membersMandatory={membersMandatory} memberSpecialMandatory={membersSpecialMandatory} memberVoluntary={memberVoluntary} memberRecretional={memberRecretional} memberReceivable={memberReceivable} memberAccountReceivable={memberAccountReceivable} />
                <ListInvoice invoices={invoices} />
            </div>

        </MainLayout>
    )
}

export default Invoice