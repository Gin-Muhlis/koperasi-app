"use client"

import { ListLoan, SubCategoryState } from '@/types/interface';
import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react'
import FormAddLoan from './formAddLoan';
import { DataTable } from './data-table';
import { Icon } from '@iconify/react/dist/iconify.js';
import { capitalizeString } from '@/app/utils/helper';
import { Badge } from '@/components/ui/badge';

const LoanPopup = ({ members, subCategory, setSubCategory }: { members: ListLoan[], subCategory: SubCategoryState, setSubCategory: React.Dispatch<React.SetStateAction<SubCategoryState | undefined>> }) => {
    const [listMembers, setListmembers] = useState<any[]>(members)


    const columns: ColumnDef<ListLoan>[] = [
        {
            accessorKey: "name",
            header: "Nama",
            cell: ({ row }) => {
                let member = row.original;

                return <span>{member.name}</span>
            }
        },
        {
            accessorKey: "position",
            header: "jabatan",
            cell: ({ row }) => {
                let member = row.original;

                return <span>{member.position}</span>
            }
        },
        {
            id: "actions",
            header: () => <div className="text-center">Aksi</div>,
            cell: ({ row }) => {
                const data = row.original;

                return <div className='flex justify-center'>
                    {data.loan_progress ? <Badge className='text-white'>Tidak tersedia</Badge> : <FormAddLoan member={data} subCategory={subCategory} setSubCategory={setSubCategory} />}
                </div>
            }
        },
    ];


    return (
        <>
            <div className='w-full min-h-screen scroll-element z-50 bg-zinc-200 p-5 md:p-12 fixed inset-0 overflow-y-scroll'>
                <div className="flex items-center justify-start gap-1 mb-3 text-black cursor-pointer" onClick={() => setSubCategory(undefined)}>
                    <Icon icon="lucide:arrow-left" width={20} height={20} />
                    <span>Kembali</span>
                </div>
                <div className="w-full rounded bg-white p-5">
                    <h1 className='text-2xl font-bold text-black mb-7'>{capitalizeString(subCategory.name)}</h1>
                    <div>
                        <span className="text-lg font-bold">Pilih Anggota</span>
                        <DataTable
                            columns={columns}
                            data={listMembers}
                            isReset={false}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoanPopup