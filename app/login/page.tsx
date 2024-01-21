import DefaultLayout from '@/components/defaultLayout'
import FormLogin from '../components/formLogin'
import { getSession } from 'next-auth/react'
import { IProps } from '@/types/interface'
import AlertSuccess from '../components/alertSuccess'
import NavHome from '../components/navHome'

const Login = ({ searchParams }: IProps) => {

    return (
        <DefaultLayout>
            <div className="w-full min-h-screen">
                <NavHome />
                <div className="w-full p-5 mt-20 flex items-center justify-center">
                    <div className="w-[350px] h-[360px] overflow-hidden">
                        <div className=" w-full h-full shadow-sm bg-white p-4 md:p-8 flex flex-col items-center justify-center rounded-sm">
                            <span className="text-lg font-bold text-amber-400 mb-5">Masuk Akun</span>
                            <FormLogin />
                        </div>
                    </div>
                </div>
            </div>
            {searchParams?.message && <AlertSuccess message={searchParams.message.toString()} isShow={true} />}
        </DefaultLayout>
    )
}

export default Login