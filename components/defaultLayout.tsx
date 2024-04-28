"use client"

import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'
import Header from './header'

const DefaultLayout = ({ children }: { children: ReactNode }) => {

    return (

        <div className="min-h-screen bg-white">
            <SessionProvider>
                <div>
                    {children}
                </div>
            </SessionProvider>
        </div>
    )
}

export default DefaultLayout