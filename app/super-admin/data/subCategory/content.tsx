"use client"

import React from 'react'
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { CategoryState, SubCategoryState } from '@/types/interface';
import EditSubCategory from './editSubCategory';
import DeleteSubCategory from './deleteSubCategory';

const Content = ({ subCategories, categories }: { subCategories: SubCategoryState[], categories: CategoryState[] }) => {

    const columns: ColumnDef<SubCategoryState>[] = [
        {
            accessorKey: "name",
            header: "Nama",
        },
        {
            accessorKey: "code",
            header: "Kode",
        },
        {
            accessorKey: "type",
            header: "Tipe",
        },
        {
            accessorKey: "category",
            header: "Kategori",
        },
        {
            id: "actions",
            header: "Aksi",
            cell: ({ row }: { row: any }) => {
                const subCategory = row.original;

                return (
                    <div className="flex items-center justify-center gap-1">
                        <EditSubCategory subCategory={subCategory} categories={categories} />
                        <DeleteSubCategory subCategory={subCategory} />
                    </div>
                );
            },
        },
    ]
    return (
        <>
            <DataTable columns={columns} data={subCategories} />
        </>
    )
}

export default Content