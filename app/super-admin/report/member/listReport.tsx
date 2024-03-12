"use client"

import PaginationSection from '@/app/components/paginationSection';
import { capitalizeString, handleFormat } from '@/app/utils/helper';
import { ReportMember, SubCategoryState } from '@/types/interface'
import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react'

const ListReportMember = ({ data, subCategories }: { data: ReportMember[], subCategories: SubCategoryState[] }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    // konfigurasi pagination
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = data.slice(firstItemIndex, lastItemIndex);

    // handle value kolom
    const handleTotalData = (memberId: number, type: string) => {
        const memberData = data.find((item) => item.id == memberId);
     
        const total = memberData?.list[type]

        return handleFormat(Number(total));
    }

    return (
        <>
            <div className="w-full">
                <table className="text-sm w-full border border-solid mb-5">
                    <thead>
                        <tr className="border border-solid">
                            <th className="p-3 border border-solid">Nama</th>

                            {subCategories.map((item) => (
                                <th key={item.id} className="text-center border border-solid p-3">
                                    {capitalizeString(item.name)}
                                </th>
                            ))}
                            <th className="text-center border border-solid p-3">
                                Download
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? <>
                            {currentItems.map((member, index) => (
                                <tr key={member.id}>
                                    <td className="border border-solid p-3">{member.name}</td>
                                    {subCategories.map((item) => (
                                        <td key={item.id} className="text-center border border-solid p-3">
                                            {handleTotalData(member.id, item.name)}
                                        </td>
                                    ))}
                                    <td className="text-center border border-solid p-3">
                                        <button className='bg-amber-400 text-white p-1 outline-none rounded text-xs cursor-pointer'><Icon icon="lucide:file" width={16} height={16}></Icon></button>
                                    </td>
                                </tr>
                            ))}
                        </> : <tr><td className="text-center border border-solid p-3" colSpan={subCategories.length + 2}>Tidak ada data</td></tr>}
                    </tbody>
                </table>
            </div>

            <div className="w-full flex flex-end">
                <PaginationSection
                    totalItems={data.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </>
    )
}

export default ListReportMember