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
import { Member, SubCategoryInvoice } from '@/types/interface'
import { handleFormat } from '@/app/utils/helper'
import { setInvoice } from '@/redux/features/invoice-slice'

const RecretionalSavingPopup = ({ memberRecretionalSaving, setSubCategory }: { memberRecretionalSaving: SubCategoryInvoice[], setSubCategory: React.Dispatch<React.SetStateAction<string>> }) => {
    const dispatch = useDispatch<appDispatch>();
    const selector = useAppSelector((state) => state.invoiceReducer);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [members, setMembers] = useState<SubCategoryInvoice[]>(memberRecretionalSaving);
    const [listTabunganRekreasi, setTabunganRekreasi] = useState<Member[]>([])

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = members.slice(firstItemIndex, lastItemIndex);

    // parse state list simpanan sukarela
    useEffect(() => {
        if (selector) {
            const data = JSON.parse(selector.listTabunganRekreasi)

            setTabunganRekreasi(data)
        }
    }, [selector, selector.listTabunganRekreasi])

    useEffect(() => {
        if (memberRecretionalSaving) {
            const filteredMember = memberRecretionalSaving.filter((member) => member.payment != 0)
            const dataSet: Member[] = []

            filteredMember.map((member) => {
                const data = {
                    id: member.id,
                    amount: member.payment,
                    status: "not_added"
                }

                dataSet.push(data)
            })

            setStateData(dataSet)

        }
    }, [memberRecretionalSaving])

    // handle set state data list
    const setStateData = (data: Member[]) => {
        dispatch(
            setInvoice({
                type: "SET_TABUNGAN_REKREASI",
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
        const newMembers = memberRecretionalSaving.filter((member) => member.position == value);

        setMembers(newMembers);
    };

    // tambah member ke state data
    const handleAddMember = (id: number) => {
        const existingItemIndex = listTabunganRekreasi.findIndex(
            (item: Member) => item.id == id
        );

        if (existingItemIndex >= 0) {
            const data = listTabunganRekreasi[existingItemIndex];
            const updatedItems: Member[] = [...listTabunganRekreasi];
            updatedItems[existingItemIndex] = {
                ...data,
                status: "added",
            };
            setStateData(updatedItems)
        } else {
            const amount = members.find((data) => data.id == id)?.payment
            const newMembers: Member[] = [
                ...listTabunganRekreasi,
                { id, amount: Number(amount), status: "added" },
            ];
            setStateData(newMembers)
        }

        handleCountData('add')
    };

    //   hapus member dari state data
    const handleDeleteMember = (id: number) => {
        let newMembers: Member[] = listTabunganRekreasi.filter((item: any) => item.id != id);
        setStateData(newMembers)
    };

    //handle tampilan button tabel   
    const handleButtonAdd = (id: number) => {
        const isInputed = listTabunganRekreasi.find(
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

    // handle disable input pembayaran
    const handleDisableInput = (id: number) => {
        const isAdded = listTabunganRekreasi.find(data => data.id == id && data.status == "added");

        return isAdded != undefined ? true : false;
    }

    // handle tambah semua member ke state data
    const handleAddAllmember = () => {
        const updatedList: Member[] = [...listTabunganRekreasi];

        listTabunganRekreasi.map((item) => {
            if (item.status == 'not_added') {
                const index = listTabunganRekreasi.findIndex((data) => data.id == item.id)
                const data = { ...item, status: "added" }

                updatedList[index] = data
            }
        });

        setStateData(updatedList)
        handleCountData('add');
    };

    // handle batalkan semua data yang dipilih
    const cancelAllMember = () => {
        const updatedList: Member[] = [];

        setStateData(updatedList)
    }

    // handle update data jumlah pembayaran
    const handleUpdateAmount = (amount: string, id: number) => {
        const existingItemIndex = listTabunganRekreasi.findIndex(
            (item: Member) => item.id === id
        );

        const numericValue = amount.replace(/\D/g, '');

        if (existingItemIndex >= 0) {
            const updatedItems = [...listTabunganRekreasi];
            const data = updatedItems[existingItemIndex];
            updatedItems[existingItemIndex] = { ...data, amount: Number(numericValue) };
            setStateData(updatedItems)
        } else {
            const newMembers = [
                ...listTabunganRekreasi,
                { id, amount: Number(numericValue), status: "not_added" },
            ];
            setStateData(newMembers)
        }
    }

    // handle value oembayaran
    const handleValueAmount = (id: number) => {
        const isInputed = listTabunganRekreasi.find((data) => data.id == id)

        if (isInputed != undefined) {
            return handleFormat(isInputed.amount)
        }

        const defaultAmount = members.find((data) => data.id == id)?.payment

        return handleFormat(Number(defaultAmount))

    }

    // handle jumlah data
    const handleCountData = (type: string) => {
        if (type == 'cancel') {
            const dataAdded = listTabunganRekreasi.filter(data => data.status === 'added')

            return dataAdded.length
        } else {
            const dataNotAdded = []
            listTabunganRekreasi.map((member) => {
                if (member.status == "not_added") {
                    dataNotAdded.push(member)
                }
            })

            return dataNotAdded.length
        }
    }

    return (
        <>
            <div className={`p-5 fixed inset-0 z-50 w-full min-h-screen bg-black/80 flex items-start justify-center overflow-y-scroll`}>
                <div className="bg-white rounded p-5 w-full">
                    <div className="w-full flex flex-col gap-5 mb-5">
                        <div className="w-1/2">
                            <h1 className="text-black text-xl font-bold mb-3">Tabungan Rekreasi</h1>
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
                        </table>
                        <div className="flex justify-end gap-3">
                            <Button size={"sm"} onClick={cancelAllMember}>
                                Batalkan Semua ({handleCountData("cancel")})
                            </Button>
                            <Button size={"sm"} onClick={handleAddAllmember}>
                                Tambah Semua ({handleCountData('add')})
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
                        <Button size={"sm"} onClick={handleModal}>Batal</Button>
                        <Button size={"sm"} className='bg-green-400' onClick={handleModal}>Konfirmasi</Button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default RecretionalSavingPopup