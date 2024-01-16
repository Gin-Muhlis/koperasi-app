"use client" 

import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { SyntheticEvent, useState } from 'react'

const FormLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { push } = useRouter()

    const handleLogin = async (event: SyntheticEvent) => {
        event.preventDefault()
        console.log(email)
        console.log(password)
        try {
            const res: any = await signIn("credentials", {
                redirect: false,
                email: email,
                password: password,
                callbackUrl: '/dashboard'
            })
            if (!res.error) {
                push('/dashboard')
            } else {
                console.log(res.error)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form className='w-full' onSubmit={handleLogin}>
            <div className="w-full mb-3">
                {/* <label htmlFor="email" className='label text-black text-sm'>Email</label> */}
                <div className="flex items-start justify-start w-full h-8 mb-4">
                    <div className="w-1 h-full bg-sky-400"></div>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 p-2 bg-slate-200 h-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none focus:border focus:border-solid " placeholder='email@domain.com' />
                </div>
                <div className="flex items-start justify-start w-full h-8 mb-4">
                    <div className="w-1 h-full bg-sky-400"></div>
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="flex-1 p-2 bg-slate-200 h-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none focus:border focus:border-solid " placeholder='Password' />
                </div>
                <Link href="/">
                    <span className='block text-xs text-red-500 mb-5'>Lupa Password?</span>
                </Link>
                <button type='submit' className='outline-none border-none bg-sky-400 text-white w-full rounded-full p-1 mb-3'>
                    Masuk
                </button>
                <span className='block text-xs text-black mb-4 text-center'>
                    Belum punya akun? <Link href="/register"><span className='text-sky-500'>Daftar</span></Link>
                </span>
            </div>
        </form>
    )
}

export default FormLogin