'use client'

import React from 'react';
import { useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js';
import { signOut, useSession } from 'next-auth/react';
import AlertError from '@/app/components/alertError';
import { logout } from '@/app/utils/featuresApi';
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

const LogoutDialog = () => {
    const { data: session } = useSession()
    const [error, setError] = useState<string | boolean>(false);


    const handleLogout = async () => {
        const response = await logout(session?.user.accessToken);
        
        if (response.status === 200) {
            signOut();
        } else {
            setError(response.data?.message);
        }
    };

    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <div
                        className={`flex flex-row space-x-4 cursor-pointer items-center overflow-hidden p-2 rounded text-gray-100 text-sm mb-3`}
                    >
                        <Icon icon="lucide:log-out" width="24" height="24" />
            <span className="font-semibold text-md flex pt-1">Keluar</span>
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Apakah kamu yakin?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah anda yakin untuk keluar?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogout} className="bg-red-500">
                            Keluar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {error && <AlertError message={error.toString()} isShow={true} setError={setError} />}
        </div>
    )
}

export default LogoutDialog;