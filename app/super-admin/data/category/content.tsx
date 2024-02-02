"use client"

import React from 'react'
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { CategoryState, MemberState, RoleState } from '@/types/interface';
import EditCategory from './editCategory';
import DeleteCategory from './deleteCategory';

const Content = ({ categories }: { categories: CategoryState[] }) => {

    const columns: ColumnDef<CategoryState>[] = [
        {
            accessorKey: "name",
            header: "Nama",
        },
        {
            id: "actions",
            header: () => <div className="text-center">Aksi</div>,
            cell: ({ row }: { row: any }) => {
                const category = row.original;

                return (
                    <div className="flex items-center justify-center gap-1">
                        <EditCategory category={category} />
                        <DeleteCategory category={category} />
                    </div>
                );
            },
        },
    ]
    return (
        <>
            <DataTable columns={columns} data={categories} />
        </>
    )
}

export default Content