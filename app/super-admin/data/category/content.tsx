"use client"

import React from 'react'
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { CategoryState, MemberState, RoleState } from '@/types/interface';
const Content = ({ categories }: { categories: CategoryState[] }) => {

    const columns: ColumnDef<CategoryState>[] = [
        {
            accessorKey: "name",
            header: "Nama Kategori",
        }
    ]
    return (
        <>
            <DataTable columns={columns} data={categories} />
        </>
    )
}

export default Content