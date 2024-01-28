'use client'

import React from 'react';
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { CategoryState, MemberState } from '@/types/interface';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useSession } from 'next-auth/react';
import AlertSuccess from '@/app/components/alertSuccess';
import AlertError from '@/app/components/alertError';
import { deleteCategory } from '@/app/utils/featuresApi';
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


const DeleteCategory = ({ category }: { category: CategoryState }) => {
    const { data: session } = useSession()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<string | boolean>(false)
    const [error, setError] = useState<string | boolean>(false)

    const router = useRouter();

    const handleDelete = async () => {
        setIsLoading(true)
        const response = await deleteCategory(category.id, session?.user.accessToken);

        if (response.status === 200) {
            setIsLoading(false)
            setSuccess(response.data.message)
            router.refresh();
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
                            Data {category.name} akan dihapus!
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

            {success && <AlertSuccess message={success.toString()} isShow={true} />}
            {error && <AlertError message={error.toString()} isShow={true} />}
        </div>
    )
}

export default DeleteCategory;