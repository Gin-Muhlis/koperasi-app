"use client"

import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

const DefaultLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-full min-h-screen">
            <SessionProvider>
                {children}
            </SessionProvider>
        </div>
    )
}

export default DefaultLayout