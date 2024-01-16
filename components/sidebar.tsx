"use client"

import { SIDENAV_ITEMS } from '@/constants/SIDENAV_ITEM'
import { SideNavItem } from '@/types/typeLayout'
import { Icon } from '@iconify/react/dist/iconify.js'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

const Sidebar = () => {
  return (
    <div className='w-[300px] h-screen overflow-y-scroll p-4 bg-[#191C24] sidenav'>
      <div className="w-full bg-white rounded-md p-3 flex items-center justify-start gap-3 mb-8">
        <div className="w-11 h-11 rounded-full bg-red-500"></div>
        <div>
          <span className="text-sm text-black font-extrabold block">Gin Gin NM</span>
          <span className="text-xs text-black opacity-70 italic font-semibold">super-admin</span>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        {SIDENAV_ITEMS.map((item, idx) => {
          return <MenuItem key={idx} item={item} />
        })}
        <div className={`flex flex-row space-x-4 hover:text-slate-600 items-center p-2 rounded-lg hover:bg-zinc-100 cursor-pointer`} onClick={() => signOut()}>
          <Icon icon="lucide:file" width="22" height="22" />
          <span className="font-semibold text-md flex pt-1">Keluar</span>
        </div>
      </div>

    </div>
  )
}

export default Sidebar


const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();

  return (
    <div className="">
      <Link
        href={item.path}
        className={`flex flex-row space-x-4 hover:text-slate-600 items-center p-2 rounded-lg hover:bg-zinc-100 ${item.path === pathname ? 'bg-zinc-100 text-slate-600' : ''
          }`}
      >
        {item.icon}
        <span className="font-semibold text-md flex pt-1">{item.title}</span>
      </Link>
    </div>
  );
};
