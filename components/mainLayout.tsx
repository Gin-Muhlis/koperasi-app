"use client"
import React, { ReactNode } from 'react'
import Sidebar from './sidebar'
import Header from './header'
import { SessionProvider } from 'next-auth/react'

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex min-h-screen items-start justify-start bg-[#1E1C30]'>
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className='p-5'>
          <SessionProvider>
            {children}
          </SessionProvider>
        </main>
      </div>

    </div>
  )
}

export default MainLayout