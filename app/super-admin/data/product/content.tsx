"use client"

import React from 'react'
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { ProductState } from '@/types/interface';
import EditProduct from './editProduct';
import DeleteProduct from './deleteProduct';

const Content = ({ products }: { products: ProductState[] }) => {

    const columns: ColumnDef<ProductState>[] = [
        {
            accessorKey: "name",
            header: "Nama",
        },
        {
            id: "actions",
            header: "Aksi",
            cell: ({ row }) => {
                const product = row.original;

                return (
                    <div className="flex items-center justify-center gap-1">
                        <EditProduct product={product} />
                        <DeleteProduct product={product} />
                    </div>
                );
            },
        },
    ]
    return (
        <>
            <DataTable columns={columns} data={products} />
        </>
    )
}

export default Content