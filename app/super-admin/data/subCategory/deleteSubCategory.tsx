'use client'

import React from 'react';
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { SubCategoryState } from '@/types/interface';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useSession } from 'next-auth/react';
import AlertSuccess from '@/app/components/alertSuccess';
import AlertError from '@/app/components/alertError';
import { deleteSubCategory } from '@/app/utils/featuresApi';
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
import SweetAlertPopup from '@/app/components/sweetAlertPopup';


const DeleteSubCategory = ({ subCategory }: { subCategory: SubCategoryState }) => {
    const { data: session } = useSession()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<string | boolean>(false)
    const [error, setError] = useState<string | boolean>(false)
    const [status, setStatus] = useState<number | boolean>(false)

    const router = useRouter();

    const resetStateAction = () => {
        setSuccess(false)
        setError(false)
        setStatus(false)
        router.refresh();
    }

    const handleDelete = async () => {
        setIsLoading(true)
        const response = await deleteSubCategory(subCategory.id, session?.user.accessToken);
        setStatus(response.status);
        if (response.status === 200) {
            setIsLoading(false)
            router.refresh();
            setSuccess(response.data.message)
        } else {
            setIsLoading(false)
            setError('Data member gagal dihapus')
        }
    }

    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <span className="w-5 h-5 rounded bg-red-500 text-white flex items-center justify-center cursor-pointer">

                        <Icon icon="lucide:trash-2" width="16" height="16" />
                    </span>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Apakah kamu yakin?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Data {subCategory.name} akan dihapus!
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-500" disabled={isLoading}>
                            {isLoading ? <Loader /> : 'Hapus'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {success && <SweetAlertPopup message={success.toString()} status={status} resetState={resetStateAction} />}
            {error && <SweetAlertPopup message={error.toString()} status={status} resetState={resetStateAction} />}
        </div>
    )
}

export default DeleteSubCategory;