import DefaultLayout from '@/components/defaultLayout'
import FormLogin from './components/formLogin'

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
            
             <FormLogin />

          </div>
      </div>
    </DefaultLayout>
  )
}
