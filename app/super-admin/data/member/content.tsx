"use client"

import React, { useState } from 'react'
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { MemberState, PositionCategory, RoleState } from '@/types/interface';
import DeleteMember from "./deleteMember";
import EditMember from "./editMember";
import DetailMember from './detailMember';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import ChangePassword from './changePassword';

const Content = ({ members, roles, positionCategories }: { members: MemberState[], roles: RoleState[], positionCategories: PositionCategory[] }) => {
    const [menu, setMenu] = useState<string | boolean>(false);
    const [member, setmember] = useState<MemberState | undefined>(undefined);

    const handleMenu = (type: string, data: MemberState) => {
        setMenu(type)
        setmember(data)
    }

    const resetModal = () => {
        setMenu(false)
        setmember(undefined)
    }
    
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
            cell: ({ row }: { row: any }) => {
                const member = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <DotsHorizontalIcon className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleMenu('detail', member)}>Detail</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleMenu('edit', member)}>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleMenu('delete', member)}>
                            Hapus
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleMenu('reset password', member)}>Reset Password</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]
    return (
        <>
            <DataTable columns={columns} data={members} />

            {menu && menu == "detail" ? <DetailMember isModal={true} resetModal={resetModal} member={member} />  : null}
            {menu && menu == "edit" ? <EditMember member={member} roles={roles} positionCategories={positionCategories} isModal={true} resetModal={resetModal} />  : null}
            {menu && menu == "delete" ? <DeleteMember member={member} isModal={true} resetModal={resetModal} />  : null}
            {menu && menu == "reset password" ? <ChangePassword member={member} isModal={true} resetModal={resetModal} />  : null}
        </>
    )
}

export default Content