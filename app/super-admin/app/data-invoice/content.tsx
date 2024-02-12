"use client"

import React from 'react'
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { InvoiceState } from '@/types/interface';
import { handleFormat } from '@/app/utils/helper';

const Content = ({ invoices }: { invoices: InvoiceState[] }) => {


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
            cell: ({row}) => {
                const formated = handleFormat(row.getValue("principal_saving"))

                return <div className="text-center">{formated}</div>
            }
        },
        {
            accessorKey: "mandatory_saving",    
            header: "Wajib",
            cell: ({row}) => {
                const formated = handleFormat(row.getValue("mandatory_saving"))

                return <div className="text-center">{formated}</div>
            }
        },
        {
            accessorKey: "special_mandatory_saving",    
            header: "Wajib Khusus",
            cell: ({row}) => {
                const formated = handleFormat(row.getValue("special_mandatory_saving"))

                return <div className="text-center">{formated}</div>
            }
        },
        {
            accessorKey: "voluntary_saving",    
            header: "Sukarela",
            cell: ({row}) => {
                const formated = handleFormat(row.getValue("voluntary_saving"))

                return <div className="text-center">{formated}</div>
            }
        },
        {
            accessorKey: "recretional_saving",    
            header: "Tabungan Rekreasi",
            cell: ({row}) => {
                const formated = handleFormat(row.getValue("recretional_saving"))

                return <div className="text-center">{formated}</div>
            }
        },
        {
            accessorKey: "receivable",    
            header: "Piutang S/P",
            cell: ({row}) => {
                const formated = handleFormat(row.getValue("receivable"))

                return <div className="text-center">{formated}</div>
            }
        },
        {
            accessorKey: "account_receivable",    
            header: "Piutang Dagang",
            cell: ({row}) => {
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
            <DataTable columns={columns} data={invoices} />
        </>
    )
}

export default Content