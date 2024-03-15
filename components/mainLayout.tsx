"use client"
import React, { ReactNode } from 'react'
import Sidebar from './sidebar'
import { SessionProvider, useSession } from 'next-auth/react'
import { Icon } from '@iconify/react/dist/iconify.js'

const MainLayout = ({ children }: { children: ReactNode }) => {
  

  return (
    <>
      <SessionProvider>
        <div className="min-h-screen overflow-hidden flex items-start justify-center bg-white 2xl:container 2xl:mx-auto">
          <div className="w-full h-full">
              <div className="flex flex-no-wrap">
                <Sidebar />
                <div className="md:ml-64 w-full pb-5">
                  <div className="w-full h-full">
                    <div className="w-full h-14 px-6 flex items-center justify-start mb-8">
                      {/* Toggle Menu */}
                      <Icon icon="ic:round-menu" width={30} height={30} />
                    </div>
                    <div className="px-6">
                      {children}
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </SessionProvider>
    </>

  )
}

export default MainLayout