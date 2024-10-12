"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { DetailLoan, ListLoan } from "@/types/interface";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { capitalizeString, convertDateFormat, handleFormat } from "@/app/utils/helper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const DetailLoanMember = ({ data }: { data: ListLoan }) => {
    const [modal, setModal] = useState(false);

    const handleModal = () => {
        setModal(!modal);
    };

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
                        <h3 className="font-bold text-lg text-black">Detail Pinjaman {data.name}</h3>
                    </div>
                    <div className="p-4 w-full grid grid-cols-1 gap-10">
                        {/* <DataTable columns={columns} data={data.detail_loans} /> */} 
                        {data.detail_loans.map((data: any) => (
                            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 border border-solid shadow px-4 py-6">
                                <div className="absolute left-5 -top-3 rounded text-white bg-blue-400 h-6 text-xs p-1 flex items-center justify-center text-center">
                                    {data.sub_category}
                                </div>
                                <div>
                                    <Label>Total Pinjaman</Label>
                                    <Input value={`Rp. ${handleFormat(data.total_loan)}`} />
                                </div>
                                <div>
                                    <Label>Dibayar</Label>
                                    <Input value={`Rp. ${handleFormat(data.paid)}`} />
                                </div>
                                <div>
                                    <Label>Durasi Pinjaman</Label>
                                    <Input value={data.duration} />
                                </div>
                                <div>
                                    <Label>Sisa Pembayaran</Label>
                                    <Input value={handleFormat(data.remain_payment)} />
                                </div>
                                <div>
                                    <Label>Tenggat Pembayaran</Label>
                                    <Input value={convertDateFormat(data.deadline)} />
                                </div>
                                <div>
                                    <Label>Tanggal Pelunasan</Label>
                                    <Input value={data.date_completion ? convertDateFormat(data.date_completion) : 'Masih Berjalan'} />
                                </div>
                                <div>
                                    <Label>Status</Label>
                                    <Badge className={`${data.status == 'lunas' ? 'bg-green-400' : 'bg-red-400'}`}>{capitalizeString(data.status)}</Badge>
                                </div>
                            </div>
                        ))}

                    </div>
                    <div className="p-4 w-full flex items-center justify-end">
                        <Button onClick={handleModal}>Tutup</Button>
                    </div>
                </div>
            </div>

        </>
    );
};

export default DetailLoanMember;
