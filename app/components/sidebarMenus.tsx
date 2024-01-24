"use client"

import React, { useState } from 'react'
import { logout } from '@/api/api-features'
import { SIDENAV_ITEMS } from '@/constants/SIDENAV_ITEM'
import { SideNavItem } from '@/types/interface'
import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import AlertError from './alertError'

const SidebarMenus = ({token}: {token: string | undefined}) => {
    const [error, setError] = useState<string | boolean>(false)

    const handleLogout = async () => {
    
        const response = await logout(token)
    
        if (response.status === 200) {
          signOut()
        } else {
          setError(response.data?.message)
        }
      } 

    return (
        <>
        <div className="flex flex-col space-y-2">
            {SIDENAV_ITEMS.map((item, idx) => {
                return <MenuItem key={idx} item={item} />
            })}
            <div className={`flex flex-row space-x-4 text-black items-center p-2 rounded-lg hover:bg-zinc-100 cursor-pointer`} onClick={handleLogout}>
                <Icon icon="lucide:log-in" width="22" height="22" />
                <span className="font-semibold text-md flex pt-1">Keluar</span>
            </div>
        </div>
        {error && <AlertError message={error.toString()} isShow={true} />}
        </>
    )
}

export default SidebarMenus


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
              className={`flex flex-row items-center p-2 rounded-lg text-black w-full justify-between hover:bg-zinc-100 ${
                pathname.includes(item.path) ? 'bg-zinc-100 ' : ''
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
                        subItem.path === pathname ? 'font-bold text-slate-900' : ''
                      }`}
                    >
                      <span className='text-slate-800'>{subItem.title}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <Link
            href={item.path}
            className={`flex flex-row space-x-4 items-center p-2 rounded-l text-black hover:bg-zinc-100 ${
              item.path === pathname ? 'bg-zinc-100' : ''
            }`}
          >
            {item.icon}
            <span className="font-semibold text-md flex pt-1">{item.title}</span>
          </Link>
        )}
      </div>
    );
  };
  