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
import { Member, Receivable, Status, SubCategoryInvoice, SubCategoryState } from '@/types/interface'
import { capitalizeString, handleFormat } from '@/app/utils/helper'
import { setInvoice } from '@/redux/features/invoice-slice'
import { Badge } from '@/components/ui/badge'

const SubCategoryReceivablePopup = ({ listMembers, subCategory, setSubCategory }: { listMembers: any[], subCategory: SubCategoryState, setSubCategory: React.Dispatch<React.SetStateAction<SubCategoryState | undefined>> }) => {
    const dispatch = useDispatch<appDispatch>();
    const selector = useAppSelector((state) => state.invoiceReducer);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [members, setMembers] = useState<any[]>(listMembers);
    const [selectedMembers, setSelectedMembers] = useState<any[]>([])
    const [typePayment, setTypePayment] = useState<string>(subCategory.type_payment)
    const [subCategoryName, setSubCategoryName] = useState<string>(subCategory.name)

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = members.slice(firstItemIndex, lastItemIndex);

    // parse state list piutang s/p
    useEffect(() => {
        if (selector) {
            const data = JSON.parse(selector.selectedMembers)

            setSelectedMembers(data)
        }
    }, [selector, selector.selectedMembers])

    useEffect(() => {
        if (listMembers && subCategoryName) {
            const dataMembers = listMembers.filter((member) => member.data[subCategoryName].amount)

            setMembers(dataMembers)
        }
    }, [listMembers, subCategoryName])

    // handle set state data list
    const setStateData = (data: any[]) => {
        dispatch(
            setInvoice({
                type: "SET_SELECTED_MEMBERS",
                value: JSON.stringify(data),
            })
        );
    }
    console.log(selectedMembers)
    // handle pop up modal
    const handleModal = () => {
        setSubCategory(undefined)
    }

    // filter member berdasarkan jabatan
    const filterMembersByPosition = (value: string) => {
        const newMembers = members.filter((member) => member.position == value);

        setMembers(newMembers);
    };

    // tambah member ke state data
    const handleAddMember = (id: number) => {
        const existingItemIndex = selectedMembers.findIndex(
            (item: any) => item.id == id
        );

        const member = members.find((member) => member.id == id);

        if (existingItemIndex >= 0) {
            const data = selectedMembers[existingItemIndex];
            const updatedItems: any[] = [...selectedMembers];
            updatedItems[existingItemIndex] = {
                ...data,
                [subCategoryName]: {
                    amount: member.data[subCategoryName].monthly,
                    loanId: member.data[subCategoryName].loan_id,
                    status: 'added'
                },
            };
            setStateData(updatedItems)
        } else {
            const subData = {
                amount: member.data[subCategoryName].monthly,
                loanId: member.data[subCategoryName].loan_id,
                status: 'added',
            }

            const newMembers: any[] = [
                ...selectedMembers,
                { id, name: member.name, [subCategoryName]: subData },
            ];
            setStateData(newMembers)
        }
    };

    //   hapus member dari state data
    const handleDeleteMember = (id: number) => {
        const indexMember = selectedMembers.findIndex((data) => data.id == id);
        const updatedMembers = [...selectedMembers];

       
        const keysMember = Object.getOwnPropertyNames(updatedMembers[indexMember]);
        
        if (keysMember.length <= 2) {
            console.log('cuma dua')
            const filterMembers = updatedMembers.filter((data) => data.id != id)
            setStateData(filterMembers)
        } else {
            setStateData(updatedMembers)
        }
        
    };

    //handle tampilan button tabel   
    const handleButtonAdd = (id: number) => {
        const isInputed = selectedMembers.find(
            (item: any) => item.id == id
        );

        if (!isInputed || !isInputed[subCategoryName] || isInputed[subCategoryName]?.status == "not_added") {
            return (
                <Button
                    className="text-white bg-blue-400"
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

    // handle cek is payed member
    const handlePayedMember = (dataPayments: Status[] | undefined) => {
        if (typePayment != 'monthly') {
            return false
        }
        
        const month = selector.month < 10 ? `0${selector.month}` : selector.month;
        const year = selector.year;
        let status: string | boolean = false

        dataPayments?.map((data) => {
            if (data.month_year == `${month}-${year}`) {
                status = data.status
                return
            }
        })
        return status
    }

    // handle tambah semua member ke state data
    const handleAddAllMember = () => {
        const updatedList: any[] = [...selectedMembers];

        members.map((item) => {
            const subData = {
                amount: item.data[subCategoryName].monthly,
                status: "added",
                loanId: item.data[subCategoryName].loan_id
            }
            
            const indexAdded = updatedList.findIndex((data) => data.id == item.id);

            if (indexAdded >= 0) {
                const data = updatedList[indexAdded];

                if (!data.hasOwnProperty(subCategory)) {
                    const newData = { ...data, [subCategoryName]: subData }
                    
                    updatedList[indexAdded] = newData
                }
            }

            if (indexAdded < 0 && !handlePayedMember(item.data[subCategoryName].months_status)) {
                const data = { id: item.id, name: item.name, [subCategoryName]: subData }

                updatedList.push(data)
            }
        });

        setStateData(updatedList)
    };

    // handle batalkan semua data yang dipilih
    const cancelAllMember = () => {
        const updatedList: any[] = selectedMembers.filter(data => {
            const dataMember = data;
            delete dataMember[subCategoryName]
            const keysMember = Object.getOwnPropertyNames(dataMember);
            if (keysMember.length <= 2) {
                return false;
            } else {
                return true;
            }
        });

        setStateData(updatedList)
    }

    // handle tampilan status
    const handleShowStatus = (status: boolean | string) => {
        let textStatus = ""
        if (status && status == "dibayar") {
            textStatus = "Dibayar"
        } else {
            textStatus = "Menunggu Pembayaran"
        }

        return <Badge className='bg-green-400 text-white'>{textStatus}</Badge>
    }

    // handle length available member
    const handleLengthAvailableMember = () => {
        const availables: SubCategoryInvoice[] = []

        members.map((member) => {
            const isAdded = selectedMembers.find((data) => data.id == member.id);
            
            if (isAdded != undefined) {
                if ((!isAdded.hasOwnProperty(subCategoryName) || (isAdded.hasOwnProperty(subCategoryName) && isAdded[subCategoryName].status == 'not_added')) && !handlePayedMember(member.data[subCategoryName].months_status)) {
                    availables.push(member) 
                }   
            }

            if (isAdded == undefined && !handlePayedMember(member.data[subCategoryName].months_status)) {
                availables.push(member)
            } 
        })

        return availables.length;
    }

     // handle jumlah data yang bisa di cancel
     const handleCountCancel = () => {
        const dataAdded = selectedMembers.filter(data => {
            if (data.hasOwnProperty(subCategoryName) && data[subCategoryName].status == 'added') {
                return true
            } else {
                return false
            }
        })

        return dataAdded.length
    }

    return (
        <>
            <div className={`p-5 fixed inset-0 z-50 w-full min-h-screen bg-black/80 flex items-start justify-center overflow-y-scroll`}>
                <div className="bg-white rounded p-5 w-full">
                    <div className="w-full flex flex-col gap-5 mb-5">
                        <div className="w-1/2">
                            <h1 className="text-black text-xl font-bold mb-3">{capitalizeString(subCategoryName)}</h1>
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
                                        <td className="p-3">Rp. {handleFormat(item.data[subCategoryName].total_payment)}</td>
                                        <td className="p-3">Rp. {handleFormat(item.data[subCategoryName].paid)}</td>
                                        <td className="p-3">Rp. {handleFormat(item.data[subCategoryName].remain_payment)}</td>
                                        <td className="p-3">
                                            {<Input
                                                type="text"
                                                placeholder="Jumlah pembayaran"
                                                data-id={item.id}
                                                value={handleFormat(item.data[subCategoryName].monthly)}
                                                readOnly
                                            />}
                                        </td>
                                        <td className="text-center p-3">
                                        {handlePayedMember(item.data[subCategoryName].months_status) ? handleShowStatus(handlePayedMember(item.data[subCategoryName].months_status)) : handleButtonAdd(item.id)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-end gap-3">
                            <Button onClick={cancelAllMember}>
                                Batalkan Semua ({handleCountCancel()})
                            </Button>
                            <Button onClick={handleAddAllMember}>
                                Tambah Semua ({handleLengthAvailableMember()})
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
                        <Button onClick={handleModal}>Batal</Button>
                        <Button className='bg-green-400' onClick={handleModal}>Konfirmasi</Button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default SubCategoryReceivablePopup