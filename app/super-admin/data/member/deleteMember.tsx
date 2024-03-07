'use client'

import React from 'react';
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { MemberState } from '@/types/interface';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useSession } from 'next-auth/react';
import AlertSuccess from '@/app/components/alertSuccess';
import AlertError from '@/app/components/alertError';
import { deleteMember } from '@/app/utils/featuresApi';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Loader from '@/app/components/loader';
import SweetAlertPopup from "@/app/components/sweetAlertPopup";


const DeleteMember = ({ isModal, resetModal, member }: { isModal: boolean, member: MemberState | undefined, resetModal: () => void }) => {
    const { data: session } = useSession()
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState<string | boolean>(false)
    const [error, setError] = useState<string | boolean>(false)
    const [status, setStatus] = useState<number | boolean>(false)
    const [modal, setModal] = useState(isModal);

    const router = useRouter();

    const resetStateAction = () => {
        setSuccess(false);
        setStatus(false);
        setError(false);
        router.refresh();
        resetModal()
    }

    const handleDelete = async () => {

        setIsLoading(true);

        const response = await deleteMember(member?.id as number, session?.user.accessToken);
        setStatus(response.status)

        if (response.status === 200) {
            setIsLoading(false)
            setSuccess(response.data.message)
            setModal(false)
        } else {
            setIsLoading(false)
            setError('Data member gagal dihapus')
        }
    }

    return (
        <>
            <AlertDialog open={modal}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Apakah kamu yakin?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Data {member?.name} akan dihapus!
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={resetModal}>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-500" disabled={isLoading}>
                            {isLoading ? <Loader /> : 'Hapus'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {success && <SweetAlertPopup message={success.toString()} status={status} resetState={resetStateAction} />}
            {error && <SweetAlertPopup message={error.toString()} status={status} resetState={resetStateAction} />}
        </>
    )
}

export default DeleteMember;