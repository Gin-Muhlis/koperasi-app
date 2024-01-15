import DefaultLayout from '@/components/defaultLayout'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <DefaultLayout>
      <div className="md:w-[680px] w-[360px] h-[360px] rounded-md flex items-center justify-center overflow-hidden">
          <div className="basis-1/2 h-full hidden md:flex bg-gradient-to-br from-cyan-500 to-blue-500 p-4 md:p-6 flex-col items-center justify-center text-center">
            <span className="text-xs text-white opacity-75 block mb-1">Selamat datang di</span>
            <span className="block text-4xl text-white font-bold blcok mb-5">Zie Koperasi</span>
            <div className="w-7 h-2 rounded-md bg-white mb-5"></div>
            <p className="text-slate-300 text-xs">
            Koperasi adalah sebuah organisasi ekonomi yang dimiliki dan dioperasikan oleh orang-seorang demi kepentingan bersama.
            </p>
          </div>
          <div className="basis-1/2 h-full bg-white p-4 md:p-8 flex flex-col items-center justify-center">
              <span className="text-lg font-bold text-sky-400 mb-5">Masuk Akun</span>
            
              <form className='w-full'>
                <div className="w-full mb-3">
                  {/* <label htmlFor="email" className='label text-black text-sm'>Email</label> */}
                  <div className="flex items-start justify-start w-full h-8 mb-4">
                    <div className="w-1 h-full bg-sky-400"></div>
                    <input type="text" className="flex-1 p-2 bg-slate-200 h-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none focus:border focus:border-solid " placeholder='email@domain.com' />
                  </div>
                  <div className="flex items-start justify-start w-full h-8 mb-4">
                    <div className="w-1 h-full bg-sky-400"></div>
                    <input type="text" className="flex-1 p-2 bg-slate-200 h-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none focus:border focus:border-solid " placeholder='Password' />
                  </div>
                  <Link href="/">
                    <span className='block text-xs text-red-500 mb-5'>Lupa Password?</span>
                  </Link>
                  <button type='submit' className='outline-none border-none bg-sky-400 text-white w-full rounded-full p-1 mb-3'>
                    Masuk
                  </button>
                    <span className='block text-xs text-black mb-4 text-center'>
                    Belum punya akun? <Link href="/register"><span className='text-sky-500'>Daftar</span></Link>
                    </span>
                </div>
              </form>
          </div>
      </div>
    </DefaultLayout>
  )
}
