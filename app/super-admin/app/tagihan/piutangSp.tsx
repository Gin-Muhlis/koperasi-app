"use client";

import { Member, Receivable } from "@/types/interface";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { appDispatch, useAppSelector } from "@/redux/store";
import { setInvoice } from "@/redux/features/invoice-slice";
import PaginationSection from "@/app/components/paginationSection";
import { handleFormat } from "@/app/utils/helper";
const PiutangSp = ({
    data,
}: {
    data: Receivable[];
}) => {
    const dispatch = useDispatch<appDispatch>();
    const selector = useAppSelector((state) => state.invoiceReducer);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [members, setMembers] = useState<Receivable[]>(data);

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = members.slice(firstItemIndex, lastItemIndex);

    const handleAddMember = (amount: number, id: number, loanId: number) => {
        const listPiutangSp = JSON.parse(selector.listPiutangSp)

        const newMembers = [...listPiutangSp, { id, amount, status: 'confirmed', loanId }]

        dispatch(
            setInvoice({
                type: "SET_PIUTANG_SP",
                value: JSON.stringify(newMembers),
            })
        );
    };

    const handleDeleteMember = (id: number) => {
        const listPiutangSp = JSON.parse(selector.listPiutangSp);
        let newMembers = listPiutangSp.filter((item: any) => item.id != id);
        dispatch(
            setInvoice({
                type: "SET_PIUTANG_SP",
                value: JSON.stringify(newMembers),
            })
        );
    };

    const handleButtonAdd = (amount: number, id: number, loanId: number) => {
        const isInputed = JSON.parse(selector.listPiutangSp).find(
            (item: any) => item.id == id
        );

        if (!isInputed || isInputed.status == 'not_confirmed') {
            return (
                <Button
                    className="text-white bg-amber-400"
                    onClick={() => handleAddMember(amount, id, loanId)}
                >
                    Tambah
                </Button>
            );
        } else {
            return (
                <Button
                    className="text-white bg-red-400"
                    onClick={() => handleDeleteMember(id)}
                >
                    batal
                </Button>
            );
        }
    };

    const filterMembersByPosition = (value: string) => {
        const newMembers = data.filter((member) => member.position == value);

        setMembers(newMembers);
    };

    const handleAddAllmember = () => {
        const listPiutangSp: Member[] = JSON.parse(selector.listPiutangSp);
        const newList: Member[] = [];

        currentItems.map((item) => {
            if (!listPiutangSp.find((data) => data.id === item.id)) {
                newList.push({id: item.id, amount: item.monthly, status: "confirmed", loanId: item.loan_id})
            }
        })

        const updatedList = [...listPiutangSp, ...newList];

        dispatch(
            setInvoice({
                type: "SET_PIUTANG_SP",
                value: JSON.stringify(updatedList),
            })
        );
    };

    return (
        <div className="w-full flex flex-col gap-5">
            <div className="w-1/2">
                <h1 className="text-black text-lg font-bold mb-3">Piutang S/P</h1>
                <Select onValueChange={filterMembersByPosition}>
                    <SelectTrigger>
                        <SelectValue placeholder="Pilih Jabatan" />
                    </SelectTrigger>
                    <SelectGroup>
                        <SelectContent>
                            <SelectItem value="pns">PNS</SelectItem>
                            <SelectItem value="p3k">P3K</SelectItem>
                            <SelectItem value="cpns">CPNS</SelectItem>
                        </SelectContent>
                    </SelectGroup>
                </Select>
            </div>
            <table className="border border-solid text-sm">
                <thead className="border border-solid">
                    <tr>
                        <th className="text-start p-3">Nama</th>
                        <th className="text-start p-3">Jabatan</th>
                        <th className="text-start p-3">Total Pinjaman</th>
                        <th className="text-start p-3">Dibayar</th>
                        <th className="text-start p-3">Sisa Pembayaran</th>
                        <th className="text-start p-3">Pembayaran (perbulan)</th>
                        <th className="text-center p-3">Aksi</th>
                    </tr>
                </thead>
                <tbody className="border border-solid">
                    {currentItems.map((item) => (
                        <tr key={item.id}>
                            <td className="p-3">{item.name}</td>
                            <td className="p-3">{item.position}</td>
                            <td className="p-3">Rp. {handleFormat(item.total_payment)}</td>
                            <td className="p-3">Rp. {handleFormat(item.paid)}</td>
                            <td className="p-3">Rp. {handleFormat(item.remain_payment)}</td>
                            <td className="p-3">
                                <Input
                                    type="text"
                                    placeholder="Jumlah pembayaran"
                                    data-id={item.id}
                                    value={handleFormat(item.monthly)}
                                    disabled
                                />
                            </td>
                            <td className="text-center p-3">{handleButtonAdd(item.monthly, item.id, item.loan_id)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-end">
                <Button className="text-white bg-black" onClick={handleAddAllmember}>
                    Tambah Semua ({currentItems.length})
                </Button>
            </div>
            <div className="w-full flex flex-end">
                <PaginationSection
                    totalItems={members.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default PiutangSp;