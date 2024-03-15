"use client"

import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'
import Header from './header'

const DefaultLayout = ({ children }: { children: ReactNode }) => {

    return (

        <div className="2xl:container 2xl:mx-auto min-h-screen bg-white">
            <SessionProvider>
                <div className="height-section">
                    {children}
                </div>
            </SessionProvider>
        </div>
    )
}

export default DefaultLayout