import React from 'react';
import Link from 'next/link';
import Header from '@/components/header';

export default function Home() {

  return (
    <>
    <Header />
      <div className="px-7 h-full">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
            <p className="uppercase tracking-loose w-full mb-5 opacity-90">Selamat Datang di Zie Koperasi.</p>
            <p className="leading-normal text-2xl mb-8">
              Sejalin Harapan, Bangun Bersama. Koperasi, Ladang Kesejahteraan Kita.
            </p>
            <button className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
              <Link href={'/login'}>Login</Link>
            </button>
          </div>
          <div className="w-full md:w-3/5 py-6 flex justify-center">
            <img className="w-full md:w-8/12 z-50" src="/images/hero.png" />
          </div>
        </div>
      </div>
    </>

  )
}
