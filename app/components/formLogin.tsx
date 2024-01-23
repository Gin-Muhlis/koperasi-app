"use client"

import { Icon } from '@iconify/react/dist/iconify.js'
import { getSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import AlertError from './alertError'

const FormLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState<any>(false)
    const [passwordShow, setPasswordShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

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
                setIsLoading(false)

                const updatedSession = await getSession();
                
                push(`${updatedSession?.user?.role}/dashboard`)
            } else {
                setIsLoading(false)

                switch (res.error) {
                    case 'Request failed with status code 422':
                        setErrorMessage('Format data tidak valid!')
                        break
                    case 'Request failed with status code 400':
                        setErrorMessage('Email atau password salah!')
                        break
                    default:
                        setErrorMessage('Terjadi kesalahan')
                }
            }
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }

    return (
        <>
            <form className='w-full' onSubmit={handleLogin}>
                <div className="w-full mb-3">
                    {/* <label htmlFor="email" className='label text-black text-sm'>Email</label> */}
                    <div className="flex items-start justify-start w-full h-8 mb-4">
                        <div className="w-1 h-full bg-amber-400"></div>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 p-2 bg-slate-200 h-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none focus:border focus:border-solid " placeholder='email@domain.com' />
                    </div>
                    <div className="flex items-start justify-start w-full h-8 mb-4 relative">
                        <div className="w-1 h-full bg-amber-400"></div>
                        <input type={passwordShow ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="flex-1 p-2 bg-slate-200 h-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none focus:border focus:border-solid " placeholder='Password' />

                        {passwordShow ? <Icon icon="mingcute:eye-close-fill" width={22} height={22} onClick={handleShowPassword} className='cursor-pointer absolute right-1 top-1 text-amber-500 text-md' /> : <Icon icon="solar:eye-bold" width={22} height={22} onClick={handleShowPassword} className='cursor-pointer absolute right-1 top-1 text-amber-500 text-md' />}

                    </div>
                    <Link href="/">
                        <span className='inline-block text-xs text-red-500 mb-5'>Lupa Password?</span>
                    </Link>
                    
                    <button type='submit' className='outline-none border-none bg-amber-400 text-white w-full rounded-full p-1 h-9 mb-3 flex items-center justify-center' disabled={isLoading}>
                        {isLoading ? <span className="loading loading-infinity loading-md"></span> : 'Masuk'}
                    </button>
                    <span className='block text-xs text-black mb-4 text-center'>
                        Belum punya akun? <Link href="/register"><span className='text-amber-500'>Daftar</span></Link>
                    </span>
                </div>
            </form>
            {errorMessage && <div className='p-4 bg-red-500 rounded fixed bottom-7 right-7 text-white flex items-center gap-1'>
                <Icon icon="mingcute:alert-fill" width={24} height={24} />
                <span className=" font-semibold text-md alert-access">
                    {errorMessage}
                </span>
                <span onClick={() => setErrorMessage(false)} className='w-6 h-6 cursor-pointer text-md rounded-full flex items-center justify-center bg-white text-black absolute right-[-10px] top-[-10px]'>
                    <Icon icon="jam:close" />
                </span>
            </div>}
        </>
    )
}

export default FormLogin