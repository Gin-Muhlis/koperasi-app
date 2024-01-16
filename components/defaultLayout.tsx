import React, { ReactNode } from 'react'

const DefaultLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-full min-h-screen flex items-center justify-center px-5 py-10 bg-[#1E1C30]">
            {children}
        </div>
    )
}

export default DefaultLayout