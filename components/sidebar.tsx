"use client";

import { MemberState } from "@/types/interface";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { SIDENAV_ITEMS } from "@/constants/SIDENAV_ITEM";
import { SideNavItem } from "@/types/interface";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getProfile, logout } from "@/app/utils/featuresApi";
import { useDispatch } from "react-redux";
import { appDispatch } from "@/redux/store";
import { resetState as resetInvoice } from "@/redux/features/invoice-slice";
import { resetState as resetInstallment } from "@/redux/features/installment-slice";
import { resetState as resetDataInvoice } from "@/redux/features/dataInvoice-slice";
import { resetState as resetPayment } from "@/redux/features/paymenMember-slice";
import { resetState as resetReceivable } from "@/redux/features/receivable-slice";
import { resetState as resetSaving } from "@/redux/features/saving-slice";
import LogoutDialog from "@/app/components/logoutDialog";
import Image from "next/image";

const Sidebar = ({ isOpen, handleIsOpen }: { isOpen: boolean, handleIsOpen: () => void }) => {
  const { data: session } = useSession();
  const [memberProfile, setMemberProfile] = useState<MemberState | undefined>(undefined);
  const [menus, setMenus] = useState<SideNavItem[]>([])

  const getDataProfile = async (token: string | undefined) => {
    const response = await getProfile(token);

    setMemberProfile(response);
  };

  useEffect(() => {
    if (session) {
      console.log(session?.user.accessToken)
      getDataProfile(session?.user.accessToken);

      const role = session?.user.role
      const menusByRole = SIDENAV_ITEMS.filter((menu) => menu.role == role)

      setMenus(menusByRole)
    }
  }, [session]);

  return (
    <div className={`w-64 h-screen fixed ${isOpen ? 'left-0' : '-left-64'} md:${isOpen ? 'left-0' : '-left-64'} transition-all duration-1000 top-0 z-50 overflow-y-scroll hidden-scroll shadow-lg bg-blue-400 flex-col justify-between flex`}>
      {memberProfile ? <div className="px-5 py-5 relative">
        <div className="w-full flex items-center justify-start mb-5 gap-1 text-white md:hidden">
          <div onClick={handleIsOpen} className="cursor-pointer flex items-center">
            <Icon icon="mingcute:arrow-left-line" width={20} height={20} className='cursor-pointer' />
            <span className="text-sm">Tutup</span>
          </div>

        </div>
        <div className="h-16 w-full flex items-center justify-start bg-white rounded shadow-md p-3 gap-2">
          <img src={memberProfile?.imageProfile as string} alt="image profile" className="w-10 h-10 rounded-full border border-solid border-blue-400 object-cover" />
          <div className="flex flex-col text-sm">
            <span className="text-black">{memberProfile?.username}</span>
            <span className="text-xs italic text-blue-500">{memberProfile?.role}</span>
          </div>
        </div>
        <ul className="mt-12">
          {menus.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}

          <LogoutDialog />
        </ul>

      </div> : <div className="flex items-center justify-center h-full">
        <div className="flex justify-center items-center font-bold text-lg text-white">

          <svg fill='none' className="w-10 h-10 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
            <path clipRule='evenodd'
              d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
              fill='currentColor' fillRule='evenodd' />
          </svg>


          <div>Loading...</div>
        </div>
      </div>}

    </div>
  );
};

export default Sidebar;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };
  const dispatch = useDispatch<appDispatch>();

  const handleResetState = () => {
    dispatch(resetInvoice());
    dispatch(resetInstallment());
    dispatch(resetDataInvoice());
    dispatch(resetPayment());
    dispatch(resetReceivable());
    dispatch(resetSaving());
  };

  return (
    <div className="">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded text-gray-100 w-full justify-between text-sm mb-3 ${pathname.includes(item.path) ? "text-white font-bold" : ""
              }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon}
              <span className="font-semibold text-sm flex pt-1">
                {item.title}
              </span>
            </div>

            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4 overflow-hidden">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${subItem.path === pathname
                      ? "font-bold"
                      : ""
                      }`}
                    onClick={handleResetState}
                  >
                    <span className="text-gray-100 text-sm">{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center overflow-hidden p-2 rounded text-gray-100 text-sm mb-3 ${item.path === pathname ? "text-white font-bold" : ""
            }`}
        >
          {item.icon}
          <span className="font-semibold text-md flex pt-1">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
