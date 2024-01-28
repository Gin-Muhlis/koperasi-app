"use client"

import React from 'react'
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { MemberState, RoleState } from '@/types/interface';
import DeleteMember from "./deleteMember";
import EditMember from "./editMember";
import DetailMember from './detailMember';

const Content = ({ members, roles }: { members: MemberState[], roles: RoleState[] }) => {

    const columns: ColumnDef<MemberState>[] = [
        {
            accessorKey: "name",
            header: "Nama",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "address",
            header: "Alamat",
        },
        {
            accessorKey: "phone_number",
            header: "No telepon",
        },
        {
            accessorKey: "gender",
            header: "Gender",
        },
        {
            accessorKey: "position",
            header: "jabatan",
        },
        {
            accessorKey: "religion",
            header: "Agama",
        },
        {
            id: "actions",
            header: "Aksi",
            cell: ({ row }: { row: any }) => {
                const member = row.original;

                return (
                    <div className="flex items-center justify-center gap-1">
                        <EditMember member={member} roles={roles} />
                        <DetailMember member={member} />
                        <DeleteMember member={member} />
                    </div>
                );
            },
        },
    ]
    return (
        <>
            <DataTable columns={columns} data={members} />
        </>
    )
}

export default Content