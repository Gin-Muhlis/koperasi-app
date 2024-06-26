import React from 'react';
import Link from 'next/link';
import Header from '@/components/header';
import Image from 'next/image';

export default function Home() {

  return (
    <div className='w-full'>
      <Header />
      <div className="px-7">
        <div className="2xl:container 2xl:mx-auto">
          <div className="flex flex-wrap flex-col md:flex-row items-center height-section">
            <div className="flex flex-col w-full md:w-2/5 justify-center items-start">
              <p className="uppercase tracking-loose w-full mb-5 opacity-90 text-sm">Selamat Datang di Zie Koperasi.</p>
              <p className="leading-normal text-2xl mb-6 font-bold">
                Sejalin Harapan, Bangun Bersama. Koperasi, Ladang Kesejahteraan Kita.
              </p>
              <button className="lg:mx-0 hover:underline bg-blue-400 text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                <Link href={'/login'}>Masuk</Link>
              </button>
            </div>
            <div className="w-full md:w-3/5 py-6 flex justify-center">
              <img className="w-full md:w-8/12 z-50" src="/images/hero.png" alt="Hero image" />
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
