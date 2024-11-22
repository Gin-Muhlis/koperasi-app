"use client"

import React from 'react'
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { ProductState, StuffState } from '@/types/interface';
import EditStuff from './editStuff';
import DeleteStuff from './deleteStuff';
import { handleFormat } from '@/app/utils/helper';
import Image from 'next/image';

const Content = ({ stuffs, products }: { stuffs: StuffState[], products: ProductState[] }) => {

    const columns: ColumnDef<StuffState>[] = [
        {
            accessorKey: "name",
            header: "Nama",
        },
        {
            accessorKey: "price",
            header: "Harga",
            cell: ({ row }) => {
                const value = row.getValue('price');

                return <>{handleFormat(Number(value))}</>
            }
        },
        {
            accessorKey: "product_name",
            header: "Jenis Produk",
        },
        {
            accessorKey: "image",
            header: "Gambar",
            cell: ({ row }) => {
                return <img src={row.getValue("image")} alt="Gambar barang" className='w-12 h-12 object-cover rounded' />
            },
        },
        {
            id: "actions",
            header: () => <div className="text-center">Aksi</div>,
            cell: ({ row }) => {
                const stuff = row.original;

                return (
                    <div className="flex items-center justify-center gap-1">
                        <EditStuff stuff={stuff} products={products} />
                        <DeleteStuff stuff={stuff} />
                    </div>
                );
            },
        },
    ]
    return (
        <>
            <DataTable columns={columns} data={stuffs} />
        </>
    )
}

export default Content