"use client"

import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react'
import { appDispatch, useAppSelector } from '@/redux/store';
import { DataTable } from './dataTable/data-table-add';
import { PositionCategory, Status, SubCategoryState } from '@/types/interface';
import FormAddSavingMember from './formAddSavingMember';
import { Badge } from '@/components/ui/badge';

const ListMember = ({ members, subCategory, positionCategories, setSubCategory }: { members: any[], subCategory: SubCategoryState, positionCategories: PositionCategory[], setSubCategory: React.Dispatch<React.SetStateAction<SubCategoryState | undefined>> }) => {
    const [listMembers, setListmembers] = useState<any[]>(members)

    useEffect(() => {
        if (members && subCategory.type_payment == 'once') {
            const dataMembers = members.filter((member) => member.data[subCategory.name].length == 0)

            setListmembers(dataMembers)
        }
    }, [members, subCategory])

    

    const columns: ColumnDef<any>[] = [
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
                    <FormAddSavingMember member={data} subCategory={subCategory} positionCategories={positionCategories} setSubCategory={setSubCategory} />
                </div>
            }
        },
    ];


    return (
        <div>
            <span className="text-lg font-bold">Pilih Anggota</span>
            <DataTable
                columns={columns}
                data={listMembers}
                isReset={false}
            />
        </div>
    )
}

export default ListMember