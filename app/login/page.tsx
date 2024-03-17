
import FormLogin from '../components/formLogin'
import { IProps } from '@/types/interface'
import Header from '@/components/header'

const Login = ({ searchParams }: IProps) => {

    return (
        <>
            <Header />
            <div className="h-full flex items-center justify-center w-full">
                <div className="bg-blue-400 border shadow-md rounded-lg px-8 py-6 w-11/12 md:w-[360px] max-w-lg">
                    <h1 className="text-2xl font-bold text-center mb-4 text-white">Masuk</h1>
                    <FormLogin message={searchParams?.message} />
                </div>
            </div >

        </>
    )
}

export default Login