"use client"

import NavHome from '@/app/components/navHome'
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

const DefaultLayout = ({ children }: { children: ReactNode }) => {
    return (

        <div className="w-full min-h-screen bg-zinc-200">
            <SessionProvider>
                {children}
            </SessionProvider>
        </div>
    )
}

export default DefaultLayout