"use client"
import React, { ReactNode } from 'react'
import Sidebar from './sidebar'
import Header from './header'
import { SessionProvider } from 'next-auth/react'

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SessionProvider>
        <div className='flex min-h-screen items-start justify-between bg-[#f0e7ff]'>
          <Sidebar />
          <div className="w-full relative md:ml-72">
            <Header />
            <main className='w-full p-5'>
              {children}
            </main>
          </div>
        </div>
      </SessionProvider>
    </>

  )
}

export default MainLayout