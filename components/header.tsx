"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { data: session, status } = useSession();
  return (
    <div className="bg-blue-400 shadow-lg py-3 px-7 w-full">
      <nav className="2xl:container 2xl:mx-auto flex justify-between">
        <div className="flex items-center space-x-3 lg:pr-16 pr-6">
          <Link href={"/"}>
            <h2 className="text-xl md:text-2xl font-bold leading-6 text-white">
              Zie Koperasi
            </h2>
          </Link>
        </div>
        {status === "authenticated" ? (
          <Link
            href={`/${session.user?.role}/dashboard`}
            className="text-black font-bold text-sm flex items-center"
          >
            <Icon icon="ic:round-home" width="22" height="22" />
            <span>Dashboard</span>
          </Link>
        ) : (
          <div className="flex items-center gap-4">
            <Link href={"/login"} className="text-black font-bold text-sm">
              Masuk
            </Link>
            <Link
              href={"/register"}
              className="text-black font-bold text-sm bg-white rounded px-5 py-2"
            >
              Daftar
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
