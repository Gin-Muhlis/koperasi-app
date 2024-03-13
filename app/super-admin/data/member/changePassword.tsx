"use client"

import Loader from '@/app/components/loader';
import SweetAlertPopup from '@/app/components/sweetAlertPopup';
import { changePassword } from '@/app/utils/featuresApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MemberState } from '@/types/interface';
import { Icon } from '@iconify/react/dist/iconify.js';
import { randomBytes } from 'crypto';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const ChangePassword = ({ isModal, resetModal, member }: { isModal: boolean, resetModal: () => void, member: MemberState | undefined }) => {
    const { data: session } = useSession();

    const [modal, setModal] = useState(isModal);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<string | boolean>(false);
    const [error, setError] = useState<string | boolean>(false);
    const [status, setStatus] = useState<number | boolean>(false);
    const [errorPassword, setErrorPassword] = useState<string | boolean>(false)
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [generatedPassword, setGeneratedPassword] = useState<string | boolean>("")
    const [passwordShow, setPasswordShow] = useState<boolean>(false)
    const [confirmPasswordShow, setConfirmPasswordShow] = useState<boolean>(false)

    const router = useRouter();

    const handleModal = () => {
        setModal(!modal)
        resetModal();
    }

    const resetStateAction = () => {
        setSuccess(false);
        setStatus(false);
        setError(false)
        router.refresh();
    }

    const handleShowPassword = () => {
        setPasswordShow(!passwordShow)
    }

    const handleShowConfirmPassword = () => {
        setConfirmPasswordShow(!confirmPasswordShow)
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

        
        if (password !== confirmPassword) {
            return
        }
        
        setIsLoading(true)
        
        if (password.length < 8) {
            setErrorPassword('Password harus lebih dari 8 karakter')
            setIsLoading(false)
            return
        }

        const formData = new FormData();

        formData.append("_method", "PUT"),
            formData.append("password", password)

        const response = await changePassword(formData, member?.id as number, session?.user.accessToken);
        setStatus(response.status);
        setIsLoading(false)

        if (response.status == 200) {
            setPassword("")
            setConfirmPassword("")
            setGeneratedPassword(false)
            setErrorPassword(false)
            setPasswordShow(false)
            setConfirmPasswordShow(false)
            setModal(!modal)
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
            <div className={`p-5 fixed inset-0 z-50 w-full min-h-screen bg-black/80 flex items-center justify-center ${modal ? 'block' : 'hidden'}`}>
                <div className={`w-11/12 max-w-4xl bg-white rounded transition-transform overflow-y-scroll ${modal ? 'scale-100' : 'scale-0'}`}>
                    <div className="p-4 border-b border-b-slate-300 mb-4">
                        <h3 className="font-bold text-lg text-black">Reset Password Anggota {member?.name}</h3>
                    </div>
                    <form onSubmit={onSubmit} className='w-full'>
                        <div className="p-4 grid grid-col-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <Label>Password baru</Label>
                                <div className="relative">
                                    <Input type={passwordShow ? 'text' : 'password'} placeholder='Password Baru' value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <Icon icon={passwordShow ? "mingcute:eye-close-fill" : "solar:eye-bold"} width={22} height={22} onClick={handleShowPassword} className='cursor-pointer absolute right-1 top-1/2 -translate-y-1/2 text-amber-500 text-md' />
                                </div>
                                {errorPassword && password.length < 8 ? <p className='text-sm text-red-500'>Password minimal 8 karakter!</p> : null}
                            </div>
                            <div>
                                <Label>Konfirmasi Password</Label>
                                <div className="relative">
                                    <Input value={confirmPassword} type={confirmPasswordShow ? 'text' : 'password'} placeholder='Konfirmasi Password Baru' onChange={(e) => setConfirmPassword(e.target.value)} />
                                    <Icon icon={confirmPasswordShow ? "mingcute:eye-close-fill" : "solar:eye-bold"} width={22} height={22} onClick={handleShowConfirmPassword} className='cursor-pointer absolute right-1 top-1/2 -translate-y-1/2 text-amber-500 text-md' />
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
                            <Button type="button" className="text-white" onClick={handleModal}>Batal</Button>
                            <Button type="submit" className="bg-amber-400 text-white" disabled={isLoading}>
                                {isLoading ? <Loader /> : 'Simpan'}
                            </Button>
                        </div>
                    </form>

                </div>
            </div>
            {success && <SweetAlertPopup message={success.toString()} status={status} resetState={resetStateAction} />}
            {error && <SweetAlertPopup message={error.toString()} status={status} resetState={resetStateAction} />}
        </>
    )
}

export default ChangePassword