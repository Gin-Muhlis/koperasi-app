"use client"

import React, { useEffect, useState } from 'react'
import { ColumnDef } from "@tanstack/react-table";
import { InvoiceState } from '@/types/interface';
import { handleFormat } from '@/app/utils/helper';
import { DataTable } from './data-table';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { months } from '@/constants/CONSTS';
import { Input } from '@/components/ui/input';

const Content = ({ invoices }: { invoices: InvoiceState[] }) => {
    const [filteredInvoices, setFilteredInvoices] = useState<InvoiceState[]>([])
    const [month, setMonth] = useState<number>(new Date().getMonth() + 1)
    const [year, setYear] = useState<number>(new Date().getFullYear())

    useEffect(() => {
        if (invoices) {
            const monthlyInvoices = invoices.filter((item) => item.month_year == `${month < 10 ? `0${month}` : month}-${year}`)

            setFilteredInvoices(monthlyInvoices)
        }
    }, [invoices])

    const handleFilterMonth = (month: string) => {
        console.log(month)
        const newInvoices = invoices.filter((item) => item.month_year == `${Number(month) < 10 ? `0${Number(month)}` : Number(month)}-${year}`)

        setMonth(Number(month))
        setFilteredInvoices(newInvoices)
    }

    const columns: ColumnDef<InvoiceState>[] = [
        {
            accessorKey: "name",
            header: "Nama Member",
        },
        {
            accessorKey: "month_year",
            header: "Bulan",
        },
        {
            accessorKey: "principal_saving",
            header: "Pokok",
            cell: ({ row }) => {
                const formated = handleFormat(row.getValue("principal_saving"))

                return <div className="text-center">{formated}</div>
            }
        },
        {
            accessorKey: "mandatory_saving",
            header: "Wajib",
            cell: ({ row }) => {
                const formated = handleFormat(row.getValue("mandatory_saving"))

                return <div className="text-center">{formated}</div>
            }
        },
        {
            accessorKey: "special_mandatory_saving",
            header: "Wajib Khusus",
            cell: ({ row }) => {
                const formated = handleFormat(row.getValue("special_mandatory_saving"))

                return <div className="text-center">{formated}</div>
            }
        },
        {
            accessorKey: "voluntary_saving",
            header: "Sukarela",
            cell: ({ row }) => {
                const formated = handleFormat(row.getValue("voluntary_saving"))

                return <div className="text-center">{formated}</div>
            }
        },
        {
            accessorKey: "recretional_saving",
            header: "Tabungan Rekreasi",
            cell: ({ row }) => {
                const formated = handleFormat(row.getValue("recretional_saving"))

                return <div className="text-center">{formated}</div>
            }
        },
        {
            accessorKey: "receivable",
            header: "Piutang S/P",
            cell: ({ row }) => {
                const formated = handleFormat(row.getValue("receivable"))

                return <div className="text-center">{formated}</div>
            }
        },
        {
            accessorKey: "account_receivable",
            header: "Piutang Dagang",
            cell: ({ row }) => {
                const formated = handleFormat(row.getValue("account_receivable"))

                return <div className="text-center">{formated}</div>
            }
        },
        // {
        //     id: "actions",
        //     header: () => <div className="text-center">Aksi</div>,
        //     cell: ({ row }: { row: any }) => {
        //         const invoice = row.original;

        //         return (
        //             <div className="flex items-center justify-center gap-1">

        //             </div>
        //         );
        //     },
        // },
    ]


    return (
        <>
            <div className="mb-5 flex items-center justify-start gap-4 w-full md:w-1/2">
                <div className='basis-4/5'>
                    <Label className="mb-2">Bulan</Label>
                    <Select
                        value={month.toString()}
                        onValueChange={handleFilterMonth}
                    >
                        <SelectTrigger className="w-full" >
                            <SelectValue placeholder="Bulan" />
                        </SelectTrigger>
                        <SelectGroup>
                            <SelectContent>
                                {months.map((item, index) => (
                                    <SelectItem key={index} value={(index + 1).toString()}>
                                        {item}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </SelectGroup>
                    </Select>
                </div>
                <div className='basis-1/5'>
                    <Label className="mb-2">Tahun</Label>
                    <Input value={year} readOnly />
                </div>
            </div>
            <DataTable columns={columns} data={filteredInvoices} />
        </>
    )
}

export default Content