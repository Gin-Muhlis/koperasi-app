"use client"

import { Icon } from '@iconify/react/dist/iconify.js'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const NavHome = () => {
    const { data: session, status } = useSession()
    
    return (
        <div className="w-full flex items-center justify-between h-14 px-10 bg-amber-300">
            <Link href={'/'} className='font-bold text-xl italic text-black'>
                <span>Zie Koperasi</span>
            </Link>
            {status === "authenticated" ? (<Link href={`/${session.user?.role}/dashboard`} className='text-black font-bold text-sm flex items-center'>
                <Icon icon="ic:round-home" width="22" height="22" />
                <span>Dashboard</span>
            </Link>) : (<div className="flex items-center gap-4">
                <Link href={'/login'} className='text-black font-bold text-sm'>
                    Masuk
                </Link>
                <Link href={'/register'} className='text-white font-bold text-sm bg-black rounded px-5 py-2'>
                    Daftar
                </Link>
            </div>)}
        </div>
    )
}

export default NavHome