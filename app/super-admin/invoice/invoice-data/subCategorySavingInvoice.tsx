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
import { Member, PositionCategory, Status, SubCategoryInvoice, SubCategoryState } from '@/types/interface'
import { capitalizeString, handleFormat } from '@/app/utils/helper'
import { setInvoice } from '@/redux/features/invoice-slice'
import { Badge } from '@/components/ui/badge'

const SubCategorySavingInvoicePopup = ({ listMembers, positionCategories, subCategory, setSubCategory }: { listMembers: any[], positionCategories: PositionCategory[], subCategory: SubCategoryState, setSubCategory: React.Dispatch<React.SetStateAction<SubCategoryState | undefined>> }) => {
    const dispatch = useDispatch<appDispatch>();
    const selector = useAppSelector((state) => state.invoiceReducer);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [members, setMembers] = useState<any[]>(listMembers);
    const [selectedMembers, setSelectedMembers] = useState<any[]>([])
    const [typePayment, setTypePayment] = useState<string>(subCategory.type_payment)
    const [subCategoryName, setSubCategoryName] = useState<string>(subCategory.name)
    
    useEffect(() => {
        if (selector) {
            const data = JSON.parse(selector.selectedMembers)

            setSelectedMembers(data)
        }
    }, [selector, selector.selectedMembers])
    
    useEffect(() => {
        if (listMembers && subCategoryName == "simpanan pokok") {
            const dataMembers = listMembers.filter((member) => member.data['simpanan pokok'].length == 0)
            
            setMembers(dataMembers)
        }
    }, [listMembers, subCategoryName])

    // konfigurasi pagination
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = members.slice(firstItemIndex, lastItemIndex);

    // handle set state data list
    const setStateData = (data: Member[]) => {
        dispatch(
            setInvoice({
                type: "SET_SELECTED_MEMBERS",
                value: JSON.stringify(data),
            })
        );
    }

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
                    amount: Number(handleValueAmount(member.position_category_id, member.id).replaceAll(".", "")),
                    status: 'added'
                },
            };
            setStateData(updatedItems)
        } else {
            const subData = {
                amount: Number(handleValueAmount(member.position_category_id, member.id).replaceAll(".", "")), 
                status: 'added',
            }
            
            const newMembers: any[] = [
                ...selectedMembers,
                { id, name: member.name, [subCategoryName]: subData },
            ];
            setStateData(newMembers)
        }
    };
    

    //  hapus member dari state data
    const handleDeleteMember = (id: number) => {
        const indexMember = selectedMembers.findIndex((data) => data.id == id);
        const updatedMembers = [...selectedMembers];

        delete updatedMembers[indexMember][subCategoryName]

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

    // handle disable input pembayaran
    const handleDisableInput = (dataPayments: Status[] | undefined, id: number) => {
        if (subCategoryName == "simpanan pokok") {
            return true;
        }
        const isAdded = selectedMembers.find(data => data.id == id);
        const isPayed = handlePayedMember(dataPayments) ? true : false;
        

        if (isAdded != undefined && isAdded.hasOwnProperty(subCategoryName) && isAdded[subCategoryName].status == "added") {
            return true
        }
        

        if (isAdded == undefined && isPayed) {
            return true
        }
      
        return false
    }

    // handle tambah semua member ke state data
    const handleAddAllMember = () => {
        const updatedList: any[] = [...selectedMembers];

        members.map((item) => {
            const subData = {
                amount: Number(handleValueAmount(item.position_category_id, item.id).replaceAll(".", "")),
                status: "added"
            }
            
            const indexAdded = updatedList.findIndex((data) => data.id == item.id);
            const amountMember = Number(handleValueAmount(item.position_category_id, item.id).replaceAll(".", ""));

            if (indexAdded >= 0) {
                const data = updatedList[indexAdded];

                if ((!data.hasOwnProperty(subCategoryName) || (data.hasOwnProperty(subCategoryName) && data[subCategoryName].status == 'not_added')) && !handlePayedMember(item.data[subCategoryName].months_status) && amountMember != 0) {
                    const newData = { ...data, [subCategoryName]: subData }
                    
                    updatedList[indexAdded] = newData
                }
            }

            if (indexAdded < 0 && !handlePayedMember(item.data[subCategoryName].months_status) && amountMember != 0) {
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
    console.log(selectedMembers)
    // handle update data jumlah pembayaran
    const handleUpdateAmount = (amount: string, id: number) => {
        const existingItemIndex = selectedMembers.findIndex(
            (item: any) => item.id === id
        );

        const numericValue = amount.replace(/\D/g, '');

        const member = members.find((member) => member.id == id);

        const subData = {
            amount: Number(numericValue),
            status: "not_added"
        }

        if (existingItemIndex >= 0) {
            const updatedItems = [...selectedMembers];
            const data = updatedItems[existingItemIndex];

            updatedItems[existingItemIndex] = { ...data, [subCategoryName]: subData};
            setStateData(updatedItems)
        } else {
            const newMembers = [
                ...selectedMembers,
                { id, name: member.name, [subCategoryName]: subData },
            ];
            setStateData(newMembers)
        }
    }
    
    // handle value oembayaran
    const handleValueAmount = (positionCategoryId: number, id: number) => {
        const isInputed = selectedMembers.find((data) => data.id == id)

        if (isInputed != undefined && isInputed[subCategoryName]) {
            return handleFormat(isInputed[subCategoryName].amount)
        }

        const member = members.find((member) => member.id == id)
        
        if (member.data[subCategoryName].amount) {
            const lastPayment = member.data[subCategoryName].amount;
            
            return handleFormat(lastPayment);
        }

        const defaultAmount: any = positionCategories.find((data) => data.id == positionCategoryId);
        
        const payment = defaultAmount != undefined  ? defaultAmount[subCategoryName] : 0

        return handleFormat(Number(payment))

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
            const amountMember = Number(handleValueAmount(member.position_category_id, member.id).replaceAll(".", ""));
            
            if (isAdded != undefined) {
                if ((!isAdded.hasOwnProperty(subCategoryName) || (isAdded.hasOwnProperty(subCategoryName) && isAdded[subCategoryName].status == 'not_added')) && !handlePayedMember(member.data[subCategoryName].months_status) && amountMember != 0) {
                    availables.push(member) 
                }   
            }

            if (isAdded == undefined && !handlePayedMember(member.data[subCategoryName].months_status) && amountMember != 0) {
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
                                    <th className="text-start p-3">Pembayaran</th>
                                    <th className="text-center p-3">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="border border-solid">
                                {currentItems.map((member) => (
                                    <tr key={member.id}>
                                        <td className="p-3">{member.name}</td>
                                        <td className="p-3">
                                            <Input
                                                type="text"
                                                placeholder="Pembayaran"
                                                data-id={member.id}
                                                value={handleValueAmount(member.position_category_id, member.id)}
                                                onChange={(event) => handleUpdateAmount(event.target.value, member.id)}
                                                min={0}
                                                disabled={handleDisableInput(member.data[subCategoryName].months_status, member.id)}
                                            />
                                        </td>
                                        <td className="text-center p-3">
                                            {handlePayedMember(member.data[subCategoryName].months_status) ? handleShowStatus(handlePayedMember(member.data[subCategoryName].months_status)) : handleButtonAdd(member.id)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-end gap-3">
                            <Button size={"sm"} onClick={cancelAllMember}>
                                Batalkan Semua ({handleCountCancel()})
                            </Button>
                            <Button size={"sm"} onClick={handleAddAllMember}>
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
                    <Button size={"sm"} onClick={handleModal}>Batal</Button>
                        <Button size={"sm"} className='bg-green-400' onClick={handleModal}>Konfirmasi</Button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default SubCategorySavingInvoicePopup