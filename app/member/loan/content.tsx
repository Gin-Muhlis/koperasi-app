"use client"

import { capitalizeString, convertDateFormat, handleFormat } from '@/app/utils/helper'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DetailLoan, ListLoan } from '@/types/interface'
import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const Content = ({ data }: { data: ListLoan }) => {
    return (
        <div className="p-4 w-full grid grid-cols-1 gap-10">
           {data.detail_loans.length > 0 ? 
           (
            <>
                {data.detail_loans.map((data: DetailLoan) => (
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 border border-solid shadow px-4 py-6">
                    <div className="absolute left-5 -top-3 rounded text-white bg-blue-400 h-6 text-xs p-1 flex items-center justify-center text-center">
                        {data.sub_category}
                    </div>
                    <div>
                        <Label>Total Pinjaman</Label>
                        <Input value={`Rp. ${handleFormat(data.total_loan)}`} />
                    </div>
                    <div>
                        <Label>Dibayar</Label>
                        <Input value={`Rp. ${handleFormat(data.paid)}`} />
                    </div>
                    <div>
                        <Label>Durasi Pinjaman</Label>
                        <Input value={data.duration} />
                    </div>
                    <div>
                        <Label>Sisa Pembayaran</Label>
                        <Input value={handleFormat(data.remain_payment)} />
                    </div>
                    <div>
                        <Label>Tenggat Pembayaran</Label>
                        <Input value={convertDateFormat(data.deadline)} />
                    </div>
                    <div>
                        <Label>Tanggal Pelunasan</Label>
                        <Input value={data.date_completion ? convertDateFormat(data.date_completion) : 'Masih Berjalan'} />
                    </div>
                    <div>
                        <Label>Status</Label>
                        <Badge className={`${data.status == 'lunas' ? 'bg-green-400' : 'bg-red-400'}`}>{capitalizeString(data.status)}</Badge>
                    </div>
                </div>
            ))}
            </>
           )  : <div className='flex items-center justity-start gap-1 text-blue-400'><Icon icon="mingcute:alert-fill" width={24} height={24} />
           <span className=" font-semibold text-md alert-access">
               Tidak ada data
           </span></div>}

        </div>
    )
}

export default Content