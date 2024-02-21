import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getDetailInvoice } from '@/app/utils/featuresApi';
import { convertDateFormat, handleFormat } from '@/app/utils/helper';
import MainLayout from '@/components/mainLayout';
import { Invoice, InvoiceState } from '@/types/interface';
import { getServerSession } from 'next-auth'
import React from 'react'
import ConfirmInvoiceButton from './confirmInvoice';
import PrintInvoiceButton from './printInvoice';
import DownloadPdfInvoiceButton from './downloadPdfInvoice';
import DownloadExcelInvoiceButton from './downloadExcelInvoice';

const DetailInvoice = async ({ params }: { params: { invoiceCode: string } }) => {
  const session = await getServerSession(authOptions);
  const detailInvoice: InvoiceState = await getDetailInvoice(session?.user.accessToken, params.invoiceCode);
  
  const handleValueTotalRow = (data: Invoice) => {
    let total = Number(data.principalSaving) + Number(data.mandatorySaving) + Number(data.specialMandatorySaving) + Number(data.voluntarySaving) + Number(data.recretionalSaving) + Number(data.receivable) + Number(data.accountReceivable)

    return total
  }

  const handleTotalCol = (key: 'principalSaving' | 'mandatorySaving' | 'specialMandatorySaving' | 'voluntarySaving' | 'recretionalSaving' | 'receivable' | 'accountReceivable') => {
    let total = 0

    detailInvoice.details?.map((item) => {
      total += Number(item[key])
    })

    return handleFormat(total)
  }

  const handleTotalData = () => {
    let total = 0;

    detailInvoice.details?.map((item) => {
      total += handleValueTotalRow(item)
    })

    return handleFormat(total)
  }

  return (
    <MainLayout>
      <div className="bg-white rounded p-4 w-full">
        <h1 className="text-3xl font-bold mb-10 inline-block text-black pb-1 border-b-4 border-b-solid border-b-amber-400">
          Detail Invoice
        </h1>
        {/* data invoice */}
        <div className="w-full flex justify-start items-start gap-5 text-sm mb-10">
          <div className="basis-2/5">
            <div className="w-full mb-3 flex items-center">
              <span className="basis-1/3">
                Kode Invoice
              </span>
              <span className='flex-1 font-semibold'>
                : {detailInvoice.invoice_code}
              </span>
            </div>
            <div className="w-full mb-3 flex items-center">
              <span className="basis-1/3">
                Nama Invoice
              </span>
              <span className='flex-1 font-semibold'>
                : {detailInvoice.invoice_name}
              </span>
            </div>
            <div className="w-full mb-3 flex items-center">
              <span className="basis-1/3">
                Sumber Pembayaran
              </span>
              <span className='flex-1 font-semibold capitalize'>
                : {detailInvoice.payment_source}
              </span>
            </div>
          </div>
          <div className="basis-2/5">
            <div className="w-full mb-3 flex items-center">
              <span className="basis-1/3">
                Tanggal Dibuat
              </span>
              <span className='flex-1 font-semibold'>
                : {convertDateFormat(detailInvoice.date)}
              </span>
            </div>
            <div className="w-full mb-3 flex items-center">
              <span className="basis-1/3">
                Tenggat Pembayaran
              </span>
              <span className='flex-1 font-semibold'>
                : {convertDateFormat(detailInvoice.due_date)}
              </span>
            </div>
            <div className="w-full mb-3 flex items-center">
              <span className="basis-1/3">
                Metode Pembayaran
              </span>
              <span className='flex-1 font-semibold capitalize'>
                : {detailInvoice.payment_method}
              </span>
            </div>
          </div>
        </div>

        {/* button aksi */}
        <div className="w-full flex items-center justify-start gap-2 mb-5">
            <ConfirmInvoiceButton paymentMethod={detailInvoice.payment_method} invoiceId={detailInvoice.id} totalPayment={handleTotalData()} />
            <PrintInvoiceButton />
            <DownloadPdfInvoiceButton />
            <DownloadExcelInvoiceButton detailInvoice={detailInvoice.details} />
        </div>

        {/* detail data invoice */}
        <div className="w-full">
        <table className="text-sm w-full border border-solid mb-5">
                    <thead>
                        <tr className="border border-solid">
                            <th className="text-center p-3 border border-solid">No</th>
                            <th className="p-3 border border-solid">Nama</th>
                            <th className="text-center border border-solid p-3">
                                Simpanan Pokok
                            </th>
                            <th className="text-center border border-solid p-3">
                                Simpanan Wajib
                            </th>
                            <th className="text-center border border-solid p-3">
                                Simpanan Wajib Khusus
                            </th>
                            <th className="text-center border border-solid p-3">
                                Simpanan Sukarela
                            </th>
                            <th className="text-center border border-solid p-3">
                                Tabungan Rekreasi
                            </th>
                            <th className="text-center border border-solid p-3">
                                Piutang S/P
                            </th>
                            <th className="text-center border border-solid p-3">
                                Piutang Dagang
                            </th>
                            <th className="text-center border border-solid p-3">
                                Jumlah
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {detailInvoice.details?.map((item, index) => (
                            <tr key={item.memberId}>
                                <td className="text-center border border-solid p-3">
                                    {index + 1}
                                </td>
                                <td className="border border-solid p-3">{item.memberName}</td>
                                <td className="text-center border border-solid p-3">
                                    {handleFormat(item.principalSaving)}
                                </td>
                                <td className="text-center border border-solid p-3">
                                    {handleFormat(item.mandatorySaving)}
                                </td>
                                <td className="text-center border border-solid p-3">
                                    {handleFormat(item.specialMandatorySaving)}
                                </td>
                                <td className="text-center border border-solid p-3">
                                    {handleFormat(item.voluntarySaving)}
                                </td>
                                <td className="text-center border border-solid p-3">
                                    {handleFormat(item.recretionalSaving)}
                                </td>
                                <td className="text-center border border-solid p-3">
                                    {handleFormat(item.receivable)}
                                </td>
                                <td className="text-center border border-solid p-3">
                                    {handleFormat(item.accountReceivable)}
                                </td>
                                <td className="text-center border border-solid p-3">
                                    {handleFormat(handleValueTotalRow(item))}
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td
                                className="text-center border border-solid p-3"
                                colSpan={2}
                            >
                                Jumlah
                            </td>
                            <td className="text-center border border-solid p-3">
                                {handleTotalCol('principalSaving')}
                            </td>
                            <td className="text-center border border-solid p-3">
                                {handleTotalCol('mandatorySaving')}
                            </td>
                            <td className="text-center border border-solid p-3">
                                {handleTotalCol('specialMandatorySaving')}
                            </td>
                            <td className="text-center border border-solid p-3">
                                {handleTotalCol('voluntarySaving')}
                            </td>
                            <td className="text-center border border-solid p-3">
                                {handleTotalCol('recretionalSaving')}
                            </td>
                            <td className="text-center border border-solid p-3">
                                {handleTotalCol('receivable')}
                            </td>
                            <td className="text-center border border-solid p-3">
                                {handleTotalCol('accountReceivable')}
                            </td>
                            <td className="text-center border border-solid p-3">
                                {handleTotalData()}
                            </td>
                        </tr>
                    </tbody>
                </table>
        </div>
      </div>
    </MainLayout>
  )
}

export default DetailInvoice
