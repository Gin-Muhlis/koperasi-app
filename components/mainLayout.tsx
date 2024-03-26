"use client"
import React, { ReactNode, useState } from 'react'
import Sidebar from './sidebar'
import { SessionProvider, useSession } from 'next-auth/react'
import { Icon } from '@iconify/react/dist/iconify.js'

const MainLayout = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true)

  const handleIsOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <SessionProvider>
        <div className="min-h-screen overflow-hidden flex items-start justify-center bg-gray-100 2xl:container 2xl:mx-auto">
          <div className="w-full h-full">
            <div className="flex flex-no-wrap">
              <Sidebar isOpen={isOpen} handleIsOpen={handleIsOpen} />
              <div className={`${isOpen ? 'open-section' : ''} w-full transition-all duration-1000 pb-5`}>
                <div className="w-full">
                  <div className={`w-full h-14 px-6 flex items-center justify-start mb-8`}>
                    <Icon icon="ri:menu-4-line" width={30} height={30} onClick={handleIsOpen} className='cursor-pointer' />
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