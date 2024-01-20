"use client"

import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

const DefaultLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-full min-h-screen bg-gradient-to-r from-[rgba(249,232,51,1)] to-[rgba(250,196,59,1)]">
            <SessionProvider>
                {children}
            </SessionProvider>
        </div>
    )
}

export default DefaultLayout