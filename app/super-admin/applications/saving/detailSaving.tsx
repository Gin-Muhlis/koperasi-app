"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { HistorySaving, ListSaving, SubCategoryState } from "@/types/interface";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { convertDateFormat, handleFormat } from "@/app/utils/helper";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "./dataTable/data-table-list";
import { Button } from "@/components/ui/button";

const DetailSavingMember = ({ data, subCategories }: { data: ListSaving, subCategories: SubCategoryState[] }) => {
    const [modal, setModal] = useState(false);

    const handleModal = () => {
        setModal(!modal);
    };

    const columns: ColumnDef<HistorySaving>[] = [
        {
            accessorKey: "sub_category",
            header: "Jenis Simpanan",
            cell: ({ row }) => {
                const value: string = row.getValue('sub_category');

                return <div className='text-sm'>{value}</div>
            }
        },
        {
            accessorKey: "date",
            header: "Tanggal",
            cell: ({ row }) => {
                const value: string = row.getValue('date');

                return <div className='text-sm'>{convertDateFormat(value)}</div>
            }
        },
        {
            accessorKey: "amount",
            header: () => <div className='text-center'>Jumlah</div>,
            cell: ({ row }) => {
                const value = Number(row.getValue('amount'));

                return <div className='text-center text-sm'>Rp. {handleFormat(value)}</div>
            }
        },
        {
            accessorKey: "status",
            header: () => <div className='text-center'>Status</div>,
            cell: ({ row }) => {
                const value: string = row.getValue('status');

                return <div className="text-center"><Badge className={`${value == 'dibayar' ? 'bg-green-400' : 'bg-red-400'}`}>{value}</Badge></div>
            }
        },
    ]


    return (
        <>
            <span onClick={handleModal} className="w-5 h-5 rounded bg-blue-500 text-white flex items-center justify-center cursor-pointer">
                <Icon icon="lucide:eye" width="16" height="16" />
            </span>
            <div
                className={`p-5 fixed inset-0 z-50 w-full min-h-screen bg-black/80 flex items-center justify-center ${modal ? "block" : "hidden"
                    }`}
            >
                <div
                    className={`w-11/12 max-w-4xl bg-white rounded transition-transform max-h-[90vh] overflow-y-scroll ${modal ? "scale-100" : "scale-0"
                        }`}
                >
                    <div className="p-4 border-b border-b-slate-300 mb-4">
                        <h3 className="font-bold text-lg text-black">Detail Simpanan {data.name}</h3>
                    </div>
                    <div className="mb-5 px-4 text-md">
                        Total Simpanan: <span className="font-bold">Rp. {handleFormat(data.total_saving)}</span>
                    </div>
                    <div className="p-4 grid grid-col-1 md:grid-cols-2 gap-4">
                        {subCategories.map((item) => (
                            <div key={item.id}>
                                <Label>{item.name}</Label>
                                <Input readOnly value={handleFormat(data.detail_savings[item.name])} className="w-full" />
                            </div>
                        ))}

                    </div>
                    <div className="p-4 w-full">
                        <h3 className='text-lg font-bold mb-5'>Catatan Simpanan</h3>
                        <DataTable columns={columns} data={data.history_savings} />
                    </div>
                    <div className="p-4 w-full flex items-center justify-end">
                        <Button onClick={handleModal}>Tutup</Button>
                    </div>
                </div>
            </div>

        </>
    );
};

export default DetailSavingMember;
