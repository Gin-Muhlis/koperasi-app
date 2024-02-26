import DefaultLayout from '@/components/defaultLayout'
import React from 'react'
import FormRegister from '../components/formRegister'
import NavHome from '../components/navHome'
import { PositionCategory } from '@/types/interface'
import { getRegisterPositioCategories } from '../utils/featuresApi'

const Register = async () => {
    const positionCategories: PositionCategory[] = await getRegisterPositioCategories();

    return (
        <DefaultLayout>
            <div className="w-full min-h-screen">
                <NavHome />
                <div className="w-full p-5 flex items-center justify-center">
                    <div className="md:w-[800px] w-[360px] rounded-md bg-white shadow-white p-5 ">
                        <h1 className='text-lg text-amber-400 font-bold mb-5 pb-2 border-2 border-transparent border-solid border-b-amber-400'>Daftar Akun</h1>
                        <FormRegister positionCategories={positionCategories} />

                    </div>
                </div>
            </div>


        </DefaultLayout>
    )
}

export default Register