"use client";

import { convertDateFormat, handleFormat } from '@/app/utils/helper';
import { Invoice, InvoiceState, SubCategoryState } from '@/types/interface';
import React from 'react'
import ConfirmInvoiceButton from './confirmInvoice';
import DownloadPdfInvoiceButton from './downloadPdfInvoice';
import DownloadExcelInvoiceButton from './downloadExcelInvoice';
import PrintButton from './printButton';
import { Badge } from '@/components/ui/badge';

const Content = ({ detailInvoice, subCategories }: { detailInvoice: InvoiceState, subCategories: SubCategoryState[] }) => {

  const handleValueTotalRow = (data: any) => {
    let total = 0;

    subCategories.map((item) => {
      total += data[item.name];
    })

    return total
  }

  const handleTotalCol = (key: string) => {
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
    <div className="bg-white rounded border shadow-lg p-4 w-full">
      <h1 className="text-3xl font-bold mb-10 inline-block text-black pb-1 border-b-4 border-b-solid border-b-amber-400">
        Detail Invoice
      </h1>
      {/* data invoice */}
      <div className="w-full block md:flex justify-start items-start gap-5 text-sm mb-7">
        <div className="w-full">
          <div className="w-full mb-3 flex items-center">
            <span className="basis-2/5 md:basis-1/3">
              Kode Invoice
            </span>
            <span className='flex-1 font-semibold'>
              : {detailInvoice.invoice_code}
            </span>
          </div>
          <div className="w-full mb-3 flex items-center">
            <span className="basis-2/5 md:basis-1/3">
              Nama Invoice
            </span>
            <span className='flex-1 font-semibold'>
              : {detailInvoice.invoice_name}
            </span>
          </div>
          <div className="w-full mb-3 flex items-center">
            <span className="basis-2/5 md:basis-1/3">
              Sumber Pembayaran
            </span>
            <span className='flex-1 font-semibold'>
              : {detailInvoice.payment_source}
            </span>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full mb-3 flex items-center">
            <span className="basis-2/5 md:basis-1/3">
              Tanggal Dibuat
            </span>
            <span className='flex-1 font-semibold'>
              : {convertDateFormat(detailInvoice.date)}
            </span>
          </div>
          <div className="w-full mb-3 flex items-center">
            <span className="basis-2/5 md:basis-1/3">
              Tenggat Pembayaran
            </span>
            <span className='flex-1 font-semibold'>
              : {convertDateFormat(detailInvoice.due_date)}
            </span>
          </div>
          <div className="w-full mb-3 flex items-center">
            <span className="basis-2/5 md:basis-1/3">
              Status
            </span>
            <span className='flex-1 font-semibold'>
              : {detailInvoice.status != 'dibayar' ? <Badge className='bg-red-500'>{detailInvoice.status}</Badge> : <Badge className='bg-green-500'>{detailInvoice.status}</Badge>}
            </span>
          </div>
        </div>
      </div>
      {/* button aksi */}
      <div className="w-full flex items-center justify-start gap-2 mb-5 flex-wrap">
        <ConfirmInvoiceButton statusInvoice={detailInvoice.status} invoiceId={detailInvoice.id} totalPayment={handleTotalData()} />
        <DownloadPdfInvoiceButton invoiceCode={detailInvoice.invoice_code} timeInvoice={convertDateFormat(detailInvoice.date)} />
        <DownloadExcelInvoiceButton invoiceCode={detailInvoice.invoice_code} timeInvoice={convertDateFormat(detailInvoice.date)} />
      </div>

      {/* detail data invoice */}
      <div className="position-relative overflow-auto border">
        <table className="text-sm w-full mb-5">
          <thead>
            <tr className="border border-solid">
              <th className="text-center p-3 border border-solid">No</th>
              <th className="p-3 border border-solid">Nama</th>
              {subCategories.map((item) => (
                <th key={item.id} className="text-center border border-solid p-3">
                  {item.name}
                </th>
              ))}
              <th className="text-center border border-solid p-3">
                Jumlah
              </th>
              <th className="text-center border border-solid p-3">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {detailInvoice.details?.map((data, index) => (
              <tr key={data.member_id}>
                <td className="text-center border border-solid p-3">
                  {index + 1}
                </td>
                <td className="border border-solid p-3">{data.member_name}</td>
                {subCategories.map(item => (
                  <td key={item.id} className="text-center border border-solid p-3">
                    {handleFormat(data[item.name])}
                  </td>
                ))}

                <td className="text-center border border-solid p-3">
                  {handleFormat(handleValueTotalRow(data))}
                </td>
                <td className="text-center border border-solid p-3">
                  <PrintButton memberName={data.member_name} memberId={data.member_id} invoiceCode={detailInvoice.invoice_code} />
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
              {subCategories.map((item) => (
                <td key={item.id} className="text-center border border-solid p-3">
                  {handleTotalCol(item.name)}
                </td>
              ))}
              <td className="text-center border border-solid p-3">
                {handleTotalData()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Content