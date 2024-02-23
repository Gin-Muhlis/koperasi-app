import React from 'react';
import styles from '../styles/home.module.css';
import NavHome from './components/navHome';
import DefaultLayout from '@/components/defaultLayout';

export default function Home() {

  return (
    <DefaultLayout>
      <div className={`w-full min-h-screen ${styles.hero}`} >
        <NavHome />
        <div className="px-10 w-full md:w-1/2 hero-section flex flex-col items-start justify-center">
          <h1 className='text-white text-4xl font-bold mb-7'>Sejalin Harapan, Bangun Bersama. Koperasi, Ladang Kesejahteraan Kita.</h1>
          <p className='text-slate-300 text-sm leading-6'>Zie Koperasi, layanan simpan pinjam untuk merangkul impian finansial Anda. Dengan keamanan dan kenyamanan sebagai prioritas. Bergabunglah dengan kami, karena di Zie Koperasi, kita membangun masa depan bersama. </p>
        </div>
      </div>
    </DefaultLayout>
  )
}
