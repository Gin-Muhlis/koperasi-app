"use client";

import AlertError from "@/app/components/alertError";
import AlertSuccess from "@/app/components/alertSuccess";
import Loader from "@/app/components/loader";
import { createDetailInvoice, createInvoice } from "@/app/utils/featuresApi";
import { Button } from "@/components/ui/button";
import { resetState } from "@/redux/features/invoice-slice";
import { appDispatch, useAppSelector } from "@/redux/store";
import { Invoice, InvoiceState, Member, MemberState, SubCategoryState, TotalColumn } from "@/types/interface";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { capitalizeString, handleFormat } from "@/app/utils/helper";
import { useDispatch } from "react-redux";
import SweetAlertPopup from "@/app/components/sweetAlertPopup";

const TableDetailInvoice = ({ subCategories, dataInvoice, resetStateAction }: { subCategories: SubCategoryState[], dataInvoice: InvoiceState, resetStateAction: () => void }) => {

    const [error, setError] = useState<string | boolean>(false);
    const [status, setStatus] = useState<number | boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedMembers, setSelectedMembers] = useState<any[]>([])

    const { data: session } = useSession();
    const router = useRouter();

    const dispatch = useDispatch<appDispatch>()
    const selector = useAppSelector((state) => state.invoiceReducer);

    useEffect(() => {
        if (selector) {
            const data = JSON.parse(selector.selectedMembers)

            setSelectedMembers(data)
        }
    }, [selector, selector.selectedMembers])

    const resetError = () => {
        setStatus(false)
        setError(false)
    }


    const handleSaveDetailInvoice = async () => {
        setIsLoading(true)

        const monthYear = `${selector.month < 10 ? `0${selector.month}` : selector.month}-${selector.year}`

        const response = await createDetailInvoice(selectedMembers, monthYear, selector.description, dataInvoice.id, session?.user.accessToken)
        
        setIsLoading(false);
        if (response.status == 200) {
            resetStateAction()
            dispatch(resetState())
            router.refresh()
        } else if (response.status == 422) {
            setStatus(response.status)
            const errorData = response.data.errors;
            const keys = Object.keys(errorData)
            const firstKey = keys[0]
            const message = errorData[firstKey][0]

            setError(message)
        } else {
            setStatus(response.status)
            setError("Terjadi kesalahan dengan sistem")
        }

    }

    const handleValueCol = (member: any, subCategoryName: string) => {
        if (!member.hasOwnProperty(subCategoryName)) {
            return 0
        }

        return handleFormat(member[subCategoryName].amount)
    }

    const handleValueRow = (member: any,subCategories: SubCategoryState[]) => {
        let total = 0
        subCategories.map((item) => {
            if (!member.hasOwnProperty(item.name)) {
                total += 0
            } else {
                total += Number(member[item.name].amount)
            }
        })

        return handleFormat(total);
    }   

    const handleTotalCol = (subCategoryName: string) => {
        let total = 0;
        selectedMembers.forEach((data) => {
            if (!data.hasOwnProperty(subCategoryName)) {
                total += 0
            } else {
                total += data[subCategoryName].amount
            }
        })

        return total
    }

    const handleTotalData = () => {
        let total = 0;

        selectedMembers.map((data) => {
            subCategories.map((subCategory) => {
                if (!data.hasOwnProperty(subCategory.name)) {
                    total += 0
                } else {
                    total += data[subCategory.name].amount
                }
            })
        })

        return total;
        
    }

    return (
        <div>
            <div className="w-full mb-2">
                <table className="text-sm w-full border border-solid mb-5">
                    <thead>
                        <tr className="border border-solid">
                            <th className="text-center p-3 border border-solid">No</th>
                            <th className="p-3 border border-solid">Nama</th>

                            {subCategories.map((item) => (
                                <th key={item.id} className="text-center border border-solid p-3">
                                    {capitalizeString(item.name)}
                                </th>
                            ))}
                            <th className="text-center border border-solid p-3">
                                Jumlah
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedMembers.length > 0 ? <>
                            {selectedMembers.map((member, index) => (
                                <tr key={member.id}>
                                    <td className="text-center border border-solid p-3">
                                        {index + 1}
                                    </td>
                                    <td className="border border-solid p-3">{member.name}</td>
                                    {subCategories.map((item) => (
                                        <td key={item.id} className="text-center border border-solid p-3">
                                            {handleValueCol(member, item.name)}
                                        </td>
                                    ))}
                                     <td className="text-center border border-solid p-3">
                                        {handleValueRow(member, subCategories)}
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td
                                    className="text-center border border-solid p-3"
                                    colSpan={2}
                                >
                                    Jumlah
                                </td>
                                {subCategories.map((item) => (
                                    <td key={item.id} className="text-center border border-solid p-3">
                                        {handleFormat(handleTotalCol(item.name))}
                                    </td>
                                ))}
                                <td className="text-center border border-solid p-3">
                                    {handleFormat(handleTotalData())}
                                </td>
                            </tr>
                        </> : <tr><td className="text-center border border-solid p-3" colSpan={subCategories.length + 3}>Tidak ada data</td></tr>}
                    </tbody>
                </table>
            </div>
            <div className="px-4 flex items-center justify-end gap-3">
                <Button
                    type="button"
                    size={"sm"}
                    className="text-white bg-green-400"
                    disabled={isLoading}
                    onClick={handleSaveDetailInvoice}
                >
                    {isLoading ? <Loader /> : "Simpan Data"}
                </Button>
            </div>
            {error && <SweetAlertPopup message={error.toString()} status={status} resetState={resetError} />}
        </div>
    );
};

export default TableDetailInvoice;
