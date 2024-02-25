"use client";

import { MemberState } from "@/types/interface";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { SIDENAV_ITEMS } from "@/constants/SIDENAV_ITEM";
import { SideNavItem } from "@/types/interface";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import AlertError from "@/app/components/alertError";
import { getProfile, logout } from "@/app/utils/featuresApi";
import { useDispatch } from "react-redux";
import { appDispatch } from "@/redux/store";
import { resetState } from "@/redux/features/saving-slice";

const Sidebar = () => {
  const { data: session } = useSession();
  const [memberProfile, setMemberProfile] = useState<MemberState>();
  const [error, setError] = useState<string | boolean>(false);
  const [menus, setMenus] = useState<SideNavItem[]>([])
  
  const getDataProfile = async (token: string | undefined) => {
    const response = await getProfile(token);

    setMemberProfile(response);
  };

  useEffect(() => {
    if (session) {
      getDataProfile(session?.user.accessToken);

      const role = session?.user.role
      const menusByRole = SIDENAV_ITEMS.filter((menu) => menu.role == role)

      setMenus(menusByRole)
    }
  }, [session]);

  const handleLogout = async () => {
    const response = await logout(session?.user.accessToken);

    if (response.status === 200) {
      signOut();
    } else {
      setError(response.data?.message);
    }
  };

  return (
    <div className="w-72 flex-1 h-screen fixed overflow-y-scroll p-4 bg-gradient-to-r from-[rgba(249,232,51,1)] to-[rgba(250,196,59,1)] sidenav">
      <div className="w-full bg-white rounded-md p-3 flex items-center justify-start gap-3 mb-8">
        <img
          src={memberProfile?.imageProfile?.toString()}
          alt="user-image"
          className="w-11 h-11 rounded-full object-cover border border-solid border-amber-400"
        />
        <div className="flex flex-col">
          <span className="text-md text-black font-extrabold">
            {memberProfile?.username}
          </span>
          <span className="text-sm text-black opacity-70 italic font-semibold">
            {memberProfile?.role}
          </span>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        {menus.map((item, idx) => {
          return <MenuItem key={idx} item={item} />;
        })}
        <div
          className={`flex flex-row space-x-4 text-black items-center p-2 rounded hover:bg-zinc-100 cursor-pointer`}
          onClick={handleLogout}
        >
          <Icon icon="lucide:log-in" width="22" height="22" />
          <span className="font-semibold text-md flex pt-1">Keluar</span>
        </div>
      </div>
      {error && <AlertError message={error.toString()} isShow={true} />}
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
    dispatch(resetState());
  };

  return (
    <div className="">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded text-black w-full justify-between hover:bg-zinc-100 ${
              pathname.includes(item.path) ? "bg-zinc-100 " : ""
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon}
              <span className="font-semibold text-md flex pt-1">
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
                    className={`${
                      subItem.path === pathname
                        ? "font-bold text-slate-900"
                        : ""
                    }`}
                    onClick={handleResetState}
                  >
                    <span className="text-slate-800">{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center overflow-hidden p-2 rounded text-black hover:bg-zinc-100 ${
            item.path === pathname ? "bg-zinc-100" : ""
          }`}
        >
          {item.icon}
          <span className="font-semibold text-md flex pt-1">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
