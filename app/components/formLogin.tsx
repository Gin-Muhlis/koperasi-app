"use client"

import { Icon } from '@iconify/react/dist/iconify.js'
import { getSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import AlertError from './alertError'
import Loader from './loader'
import NavHome from '../components/navHome'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import SweetAlertPopup from './sweetAlertPopup'


const FormLogin = ({message}: {message: string | string[] | undefined}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordShow, setPasswordShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | boolean>(false)

    const { push } = useRouter()

    const handleShowPassword = () => {
        setPasswordShow(!passwordShow)
    }

    const handleLogin = async (event: SyntheticEvent) => {
        event.preventDefault()
        try {
            setIsLoading(true)
            const res: any = await signIn("credentials", {
                redirect: false,
                email: email,
                password: password,
                callbackUrl: '/'
            })



            if (res.ok && res.status === 200) {

                const updatedSession = await getSession();
                push(`${updatedSession?.user?.role}/dashboard`)
            } else {
                setIsLoading(false)

                switch (res.error) {
                    case 'Request failed with status code 422':
                        setError('Email atau password salah!')
                        break
                    case 'Request failed with status code 400':
                        setError('Email atau password salah!')
                        break
                    default:
                        setError('Terjadi kesalahan')
                }
            }
        } catch (error: any) {
            setIsLoading(false)
            setError('Terjadi kesalahan dengan sistem!')
        }
    }

    return (
        <>
            <form onSubmit={handleLogin}>
                <div className="mb-4">
                    <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</Label>
                    <Input type="email" value={email} disabled={isLoading} onChange={(e) => setEmail(e.target.value)} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-white focus:border-white" placeholder="example@gmail.com" required />
                </div>
                <div className="mb-4">
                    <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</Label>
                    <div className="relative w-full">
                        <Input type={passwordShow ? "text" : "password"} disabled={isLoading} value={password} onChange={(e) => setPassword(e.target.value)} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-white focus:border-white" placeholder="Enter your password" required />
                        {passwordShow ? <Icon icon="mingcute:eye-close-fill" width={22} height={22} onClick={handleShowPassword} className='cursor-pointer absolute right-1 top-1/2 -translate-y-1/2 text-blue-400 text-md' /> : <Icon icon="solar:eye-bold" width={22} height={22} onClick={handleShowPassword} className='cursor-pointer absolute right-1 top-1/2 -translate-y-1/2 text-blue-400 text-md' />}
                    </div>

                </div>
                <div className="flex items-center justify-between mb-4">
                    <a href="#"
                        className="text-xs text-white hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">Belum punya akun? <span className='underline'>
                            Daftar</span></a>
                </div>
                <button type="submit" className={`w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black focus:outline-none focus:ring-2 focus:ring-offset-2 ${isLoading ? 'bg-black opacity-80' : 'bg-white'}`} disabled={isLoading}>
                    {isLoading ? <Loader /> : 'Masuk'}
                </button>
            </form>

            {error && <SweetAlertPopup message={error.toString()} status={500} resetState={() => setError(false)} />}

            {message && <SweetAlertPopup message={message.toString()} status={200} resetState={() => {}} />}
            
        </>
    )
}

export default FormLogin