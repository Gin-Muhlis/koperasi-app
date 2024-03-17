"use client"

import Loader from '@/app/components/loader';
import SweetAlertPopup from '@/app/components/sweetAlertPopup';
import { changePassword, changePasswordMember, logout } from '@/app/utils/featuresApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MemberState } from '@/types/interface';
import { Icon } from '@iconify/react/dist/iconify.js';
import { randomBytes } from 'crypto';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Content = () => {
    const { data: session } = useSession();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<string | boolean>(false);
    const [error, setError] = useState<string | boolean>(false);
    const [status, setStatus] = useState<number | boolean>(false);
    const [errorPassword, setErrorPassword] = useState<string | boolean>(false)
    const [errorCurrentPassword, setErrorCurrentPassword] = useState<string | boolean>(false)
    const [password, setPassword] = useState<string>("")
    const [currentPassword, setCurrentPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [generatedPassword, setGeneratedPassword] = useState<string | boolean>("")
    const [currentPasswordShow, setCurrentPasswordShow] = useState<boolean>(false)
    const [passwordShow, setPasswordShow] = useState<boolean>(false)
    const [confirmPasswordShow, setConfirmPasswordShow] = useState<boolean>(false)

    const router = useRouter()

    const resetStateAction = async () => {
        setSuccess(false);
        setStatus(false);
        setError(false)
        if (success) {
            const response = await logout(session?.user.accessToken);
            if (response.status === 200) {
                await signOut()
            } else {
                setError("Terjadi kesalahan dengan sistem!");
            }
        }
    }

    const handleShowPassword = () => {
        setPasswordShow(!passwordShow)
    }

    const handleShowConfirmPassword = () => {
        setConfirmPasswordShow(!confirmPasswordShow)
    }

    const handleShowCurrentPassword = () => {
        setCurrentPasswordShow(!currentPasswordShow)
    }

    const generatePassword = () => {
        const length = 12;

        try {
            // Menghasilkan byte acak menggunakan crypto
            const randomBytesBuffer = randomBytes(Math.ceil(length * 3 / 4));

            // Mengonversi byte acak menjadi string base64
            const password = randomBytesBuffer.toString('base64').slice(0, length);

            setGeneratedPassword(password)
        } catch (error) {
            setGeneratedPassword('Gagal membuat password!')
        }
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setIsLoading(true)

        if (currentPassword.length < 1) {
            setErrorCurrentPassword('Password saat ini tidak boleh kosong')
            setIsLoading(false)
            return
        }

        if (password.length < 8) {
            setErrorPassword('Password harus lebih dari 8 karakter')
            setIsLoading(false)
            return
        }

        const formData = new FormData();

        formData.append("_method", "PUT"),
            formData.append("current_password", currentPassword)
            formData.append("password", password)
            formData.append("confirm_password", confirmPassword)

        const response = await changePasswordMember(formData, session?.user.accessToken);
        setStatus(response.status);
        setIsLoading(false)


        if (response.status == 200) {
            setPassword("")
            setConfirmPassword("")
            setGeneratedPassword(false)
            setErrorPassword(false)
            setPasswordShow(false)
            setConfirmPasswordShow(false)
            setSuccess(response.data.message)
        } else if (response.status === 422) {
            const errorsData = response.data.errors
            const keys = Object.keys(errorsData)
            const firstKey = keys[0]
            const message = errorsData[firstKey][0]

            setError(message)
        } else {
            setError("Terjadi kesalahan dengan sistem!")
        }

    }

    return (
        <>
            <div className={`w-full bg-white rounded shadow-lg border transition-transform`}>
                <div className="p-4 border-b border-b-slate-300 mb-4">
                    <h3 className="font-bold text-lg text-black">Ganti Password</h3>
                </div>
                <form onSubmit={onSubmit} className='w-full'>
                    <div className='w-full md:w-1/2 pl-4 pr-4 md:pr-2'>
                        <Label>Password Saat Ini</Label>
                        <div className="relative">
                            <Input type={currentPasswordShow ? 'text' : 'password'} placeholder='Password Saat Ini' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                            <Icon icon={currentPasswordShow ? "mingcute:eye-close-fill" : "solar:eye-bold"} width={22} height={22} onClick={handleShowCurrentPassword} className='cursor-pointer absolute right-1 top-1/2 -translate-y-1/2 text-blue-400 text-md' />
                        </div>
                        {errorCurrentPassword && currentPassword.length < 1 ? <p className='text-sm text-red-500'>{errorCurrentPassword}</p> : null}
                    </div>
                    <div className="p-4 grid grid-col-1 md:grid-cols-2 gap-4 mb-4">

                        <div>
                            <Label>Password Baru</Label>
                            <div className="relative">
                                <Input type={passwordShow ? 'text' : 'password'} placeholder='Password Baru' value={password} onChange={(e) => setPassword(e.target.value)} />
                                <Icon icon={passwordShow ? "mingcute:eye-close-fill" : "solar:eye-bold"} width={22} height={22} onClick={handleShowPassword} className='cursor-pointer absolute right-1 top-1/2 -translate-y-1/2 text-blue-400 text-md' />
                            </div>
                            {errorPassword && password.length < 8 ? <p className='text-sm text-red-500'>Password minimal 8 karakter!</p> : null}
                        </div>
                        <div>
                            <Label>Konfirmasi Password</Label>
                            <div className="relative">
                                <Input value={confirmPassword} type={confirmPasswordShow ? 'text' : 'password'} placeholder='Konfirmasi Password Baru' onChange={(e) => setConfirmPassword(e.target.value)} />
                                <Icon icon={confirmPasswordShow ? "mingcute:eye-close-fill" : "solar:eye-bold"} width={22} height={22} onClick={handleShowConfirmPassword} className='cursor-pointer absolute right-1 top-1/2 -translate-y-1/2 text-blue-400 text-md' />
                            </div>
                            {password != confirmPassword && <p className='text-sm text-red-500'>Password tidak sama!</p>}
                        </div>
                        <div>
                            <Button type='button' className='flex items-center justify-center gap-1 mb-2' onClick={generatePassword}>
                                <Icon icon="lucide:lock-keyhole" width={20} height={20} />
                                <span>Generate Password</span>
                            </Button>
                            {generatedPassword && <p>Password Generated: {generatedPassword}</p>}
                        </div>
                    </div>
                    <div className="p-4 flex items-center justify-end gap-3">
                        <Button type="submit" className="bg-blue-400 text-white" disabled={isLoading}>
                            {isLoading ? <Loader /> : 'Perbarui'}
                        </Button>
                    </div>
                </form>

            </div>
            {success && <SweetAlertPopup confirmText='Login Kembali' message={success.toString()} status={status} resetState={resetStateAction} />}
            {error && <SweetAlertPopup message={error.toString()} status={status} resetState={resetStateAction} />}
        </>
    )
}

export default Content