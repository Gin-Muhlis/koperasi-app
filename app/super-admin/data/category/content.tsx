"use client"

import React from 'react'
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { CategoryState } from '@/types/interface';
import ExportPdf from './exportPdf';
const Content = ({ categories }: { categories: CategoryState[] }) => {

    const columns: ColumnDef<CategoryState>[] = [
        {
            accessorKey: "name",
            header: "Nama Kategori",
        }
    ]

    return (
        <>
        <div className="w-full flex items-center justify-start gap-3">
            <ExportPdf />
        </div>
            <DataTable columns={columns} data={categories} />
        </>
    )
}

export default Content