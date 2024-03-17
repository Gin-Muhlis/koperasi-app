
import React from 'react'
import FormRegister from '../components/formRegister'
import { PositionCategory } from '@/types/interface'
import { getRegisterPositioCategories } from '../utils/featuresApi'
import Header from '@/components/header'

const Register = async () => {
    const positionCategories: PositionCategory[] = await getRegisterPositioCategories();

    return (
        <>
        <Header />
            <div className="h-full flex items-start justify-center w-full py-10 px-5">
                <div className="bg-blue-400 border shadow-lg rounded-lg px-8 py-6 w-full md:w-[720px]">
                    <h1 className="text-2xl font-bold text-center mb-4 text-white">Daftar Keanggotaan</h1>
                    <FormRegister positionCategories={positionCategories} />
                </div>
            </div >
        </>

    )
}

export default Register