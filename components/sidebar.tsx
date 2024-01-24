import { getProfile } from '@/api/api-features'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import SidebarMenus from '@/app/components/sidebarMenus'
import { MemberState } from '@/types/interface'
import { getServerSession } from 'next-auth'
import React from 'react'

const Sidebar = async () => {
  // const session = await getServerSession(authOptions)
  // const memberProfile: MemberState = await getProfile(session?.user.accessToken)

  return (
    <div className='w-72 flex-1 h-screen fixed overflow-y-scroll p-4 bg-gradient-to-r from-[rgba(249,232,51,1)] to-[rgba(250,196,59,1)] sidenav'>
      {/* <div className="w-full bg-white rounded-md p-3 flex items-center justify-start gap-3 mb-8">

        <img src={memberProfile.imageProfile} alt="user-image" className="w-11 h-11 rounded-full object-cover border border-solid border-amber-400" />
        <div className='flex flex-col'>
          <span className="text-md text-black font-extrabold">{memberProfile.name}</span>
          <span className="text-sm text-black opacity-70 italic font-semibold">{memberProfile.role}</span>
        </div>
      </div>
      <SidebarMenus token={session?.user.accessToken} /> */}
    </div>
  )
}

export default Sidebar

