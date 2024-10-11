"use client"

import { DataTable } from '@/app/super-admin/applications/saving/dataTable/data-table-list';
import { convertDateFormat, handleFormat } from '@/app/utils/helper';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HistorySaving, ListSaving, SubCategoryState } from '@/types/interface';
import { ColumnDef } from '@tanstack/react-table';;
import { Button } from 'react-day-picker';

const Content = ({ data, subCategories }: { data: ListSaving, subCategories: SubCategoryState[] }) => {
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
            <div
                className={`w-full bg-white rounded transition-transform`}
            >
                <div className="mb-5 px-4 text-md">
                    Total Simpanan: <span className="font-bold">Rp. {handleFormat(data.total_saving)}</span>
                </div>
                <div className="p-4 grid grid-col-1 md:grid-cols-2 gap-4">
                    {subCategories.map((item) => (
                        <div key={item.id}>
                            <Label>{item.name}</Label>
                            <Input readOnly value={`Rp. ${handleFormat(data.detail_savings[item.name])}`} className="w-full" />
                        </div>
                    ))}

                </div>
                <div className="p-4 w-full">
                    <h3 className='text-lg font-bold mb-5'>Catatan Simpanan</h3>
                    <DataTable columns={columns} data={data.history_savings} />
                </div>
            </div>
        </>
    )
}

export default Content