"use client"

import PaginationSection from '@/app/components/paginationSection'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useDispatch } from 'react-redux'
import { appDispatch, useAppSelector } from '@/redux/store'
import { Member, Receivable, SubCategoryInvoice } from '@/types/interface'
import { handleFormat } from '@/app/utils/helper'
import { setInvoice } from '@/redux/features/invoice-slice'

const ReceivablePopup = ({ memberReceivable, setSubCategory }: { memberReceivable: Receivable[], setSubCategory: React.Dispatch<React.SetStateAction<string>> }) => {
    const dispatch = useDispatch<appDispatch>();
    const selector = useAppSelector((state) => state.invoiceReducer);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [members, setMembers] = useState<Receivable[]>(memberReceivable);
    const [listPiutangSp, setListPiutangSp] = useState<Member[]>([])

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = members.slice(firstItemIndex, lastItemIndex);

    // parse state list piutang s/p
    useEffect(() => {
        if (selector) {
            const data = JSON.parse(selector.listPiutangSp)

            setListPiutangSp(data)
        }
    }, [selector, selector.listPiutangSp])


    // handle set state data list
    const setStateData = (data: Member[]) => {
        dispatch(
            setInvoice({
                type: "SET_PIUTANG_SP",
                value: JSON.stringify(data),
            })
        );
    }

    // handle pop up modal
    const handleModal = () => {
        setSubCategory("")
    }

    // filter member berdasarkan jabatan
    const filterMembersByPosition = (value: string) => {
        const newMembers = memberReceivable.filter((member) => member.position == value);

        setMembers(newMembers);
    };

    // tambah member ke state data
    const handleAddMember = (id: number) => {
        const data = members.find((data) => data.id == id)
        const newMembers: Member[] = [
            ...listPiutangSp,
            { id, amount: Number(data?.monthly), status: "added", loanId: data?.loan_id },
        ];
        setStateData(newMembers)
    };

    //   hapus member dari state data
    const handleDeleteMember = (id: number) => {
        let newMembers: Member[] = listPiutangSp.filter((item: any) => item.id != id);
        setStateData(newMembers)
    };

    //handle tampilan button tabel   
    const handleButtonAdd = (id: number) => {
        const isInputed = listPiutangSp.find(
            (item: any) => item.id == id
        );

        if (!isInputed || isInputed.status == "not_added") {
            return (
                <Button
                    className="text-white bg-amber-400"
                    onClick={() => handleAddMember(id)}
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

    // handle tambah semua member ke state data
    const handleAddAllmember = () => {
        const updatedList: Member[] = [...listPiutangSp];

        members.map((item) => {
            const isAdded = listPiutangSp.find((data) => data.id == item.id);
            if (isAdded == undefined) {
                const data = { id: item.id, amount: item.monthly, status: "added", loanId: item.loan_id }

                updatedList.push(data)
            }
        });

        setStateData(updatedList)
    };

    // handle batalkan semua data yang dipilih
    const cancelAllMember = () => {
        const updatedList: Member[] = [];

        setStateData(updatedList)
    }

    // handle value oembayaran
    const handleValueAmount = (id: number) => {
        const isInputed = listPiutangSp.find((data) => data.id == id)

        if (isInputed != undefined) {
            return handleFormat(isInputed.amount)
        }

        const defaultAmount = members.find((data) => data.id == id)?.monthly

        return handleFormat(Number(defaultAmount))

    }

    return (
        <>
            <div className={`p-5 fixed inset-0 z-50 w-full min-h-screen bg-black/80 flex items-start justify-center overflow-y-scroll`}>
                <div className="bg-white rounded p-5 w-full">
                    <div className="w-full flex flex-col gap-5 mb-5">
                        <div className="w-1/2">
                            <h1 className="text-black text-xl font-bold mb-3">Piutang S/P</h1>
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
                        {/* <table className="border border-solid text-sm">
                            <thead className="border border-solid">
                                <tr>
                                    <th className="text-start p-3">Nama</th>
                                    <th className="text-start p-3">Pembayaran</th>
                                    <th className="text-center p-3">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="border border-solid">
                                {currentItems.map((item) => (
                                    <tr key={item.id}>
                                        <td className="p-3">{item.name}</td>
                                        <td className="p-3">
                                            <Input
                                                type="text"
                                                placeholder="Pembayaran"
                                                data-id={item.id}
                                                value={handleValueAmount(item.id)}
                                                onChange={(event) => handleUpdateAmount(event.target.value, item.id)}
                                                min={0}
                                                disabled={handleDisableInput(item.id)}
                                            />
                                        </td>
                                        <td className="text-center p-3">{handleButtonAdd(item.id)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table> */}
                        <table className="border border-solid text-sm">
                            <thead className="border border-solid">
                                <tr>
                                    <th className="text-start p-3">Nama</th>
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
                                        <td className="text-center p-3">{handleButtonAdd(item.id)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-end gap-3">
                            <Button size={"sm"} onClick={cancelAllMember}>
                                Batalkan Semua ({listPiutangSp.length})
                            </Button>
                            <Button size={"sm"} onClick={handleAddAllmember}>
                                Tambah Semua ({members.length})
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
                    <div className="w-full flex items-center justify-end gap-3">
                        <Button size={"sm"} className='bg-green-400' onClick={handleModal}>Konfirmasi</Button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ReceivablePopup