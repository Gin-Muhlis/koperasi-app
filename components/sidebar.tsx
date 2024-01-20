"use client"

import { SIDENAV_ITEMS } from '@/constants/SIDENAV_ITEM'
import { SideNavItem } from '@/types/interface'
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
          <Icon icon="lucide:log-in" width="22" height="22" />
          <span className="font-semibold text-md flex pt-1">Keluar</span>
        </div>
      </div>

    </div>
  )
}

export default Sidebar


const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg  hover:text-slate-600 w-full justify-between hover:bg-zinc-100 ${
              pathname.includes(item.path) ? 'bg-zinc-100 text-slate-600' : ''
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon}
              <span className="font-semibold text-md flex pt-1">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? 'rotate-180' : ''} flex`}>
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${
                      subItem.path === pathname ? 'font-bold text-slate-300' : ''
                    }`}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:text-slate-600 hover:bg-zinc-100 ${
            item.path === pathname ? 'bg-zinc-100 text-slate-600' : ''
          }`}
        >
          {item.icon}
          <span className="font-semibold text-md flex pt-1">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
