import DefaultLayout from '@/components/defaultLayout'
import FormLogin from '../components/formLogin'
import { getSession } from 'next-auth/react'

const Login = async () => {
    const session = await getSession()
    if (session) {
        const {user} = session
        console.log(user)
    }

    return (
        <DefaultLayout>
            <div className="w-full min-h-screen p-5 flex items-center justify-center">
                <div className="w-[350px] h-[360px] overflow-hidden">
                    <div className=" w-full h-full shadow-sm bg-white p-4 md:p-8 flex flex-col items-center justify-center rounded-sm">
                        <span className="text-lg font-bold text-amber-400 mb-5">Masuk Akun {session?.user?.name}</span>

                        <FormLogin />

                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default Login