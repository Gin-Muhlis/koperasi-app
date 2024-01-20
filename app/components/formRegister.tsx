"use client"

import { registerAPI } from '@/api/api-features'
import { signUp } from '@/redux/features/register-slice'
import { appDispatch, useAppSelector } from '@/redux/store'
import React, { SyntheticEvent, useState } from 'react'
import { useDispatch } from 'react-redux'

const FormRegister = () => {
    const [imageProfile, setImageProfile] = useState(null)
    const dispatch = useDispatch<appDispatch>()
    const selector = useAppSelector((state) => state.registerReducer)

    const handleInput = (name: string, value: any) => {
        dispatch(signUp({ type: `SET_${name}`, value: value }))
    }

    const handleImageInput = (e: any) => {
        const file = e.target.files[0]

        if (file) {
            setImageProfile(file)
        }

    }

    const handleRegister = async (event: SyntheticEvent) => {
        event.preventDefault()

        try {
            const data = {
                ...selector,
                imageProfile: imageProfile
            }

            const response = await registerAPI(data)

            console.log(response)
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <form onSubmit={handleRegister} className='w-full' encType='multipart/form-data'>
            <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-4 mb-4">
                <div>
                    <label htmlFor="name" className='label text-black text-xs'>Nama Lengkap</label>
                    <div className="flex items-start justify-start w-full h-8 mb-3">
                        <div className="w-1 h-full bg-amber-400"></div>
                        <input type="text" value={selector.name} onChange={(e) => handleInput("NAME", e.target.value)} className="p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none " id='name' />
                    </div>
                </div>
                <div>
                    <label htmlFor="email" className='label text-black text-xs'>Email</label>
                    <div className="flex items-start justify-start w-full h-8 mb-3">
                        <div className="w-1 h-full bg-amber-400"></div>
                        <input type="email" value={selector.email} onChange={(e) => handleInput("EMAIL", e.target.value)} className="p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none " id='email' />
                    </div>
                </div>
                <div>
                    <label htmlFor="phone" className='label text-black text-xs'>No Telepon</label>
                    <div className="flex items-start justify-start w-full h-8 mb-3">
                        <div className="w-1 h-full bg-amber-400"></div>
                        <input type="number" value={selector.phone} onChange={(e) => handleInput("PHONE", e.target.value)} className="p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none " id='phone' />
                    </div>
                </div>
                <div>
                    <label htmlFor="address" className='label text-black text-xs'>Alamat</label>
                    <div className="flex items-start justify-start w-full h-8 mb-3">
                        <div className="w-1 h-full bg-amber-400"></div>
                        <input type="text" value={selector.address} onChange={(e) => handleInput("ADDRESS", e.target.value)} className="p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none " id='address' />
                    </div>
                </div>
                <div>
                    <label htmlFor="gender" className='label text-black text-xs'>Jenis kelamin</label>
                    <div className="flex items-start justify-start w-full h-8 mb-3">
                        <div className="w-1 h-full bg-amber-400"></div>
                        <select value={selector.gender} onChange={(e) => handleInput("GENDER", e.target.value)} id="gender" className="p-2 bg-slate-200 w-full text-sm opacity-70  text-slate-500 rounded-e-sm focus:outline-none ">
                            <option className="p-2 bg-slate-200 w-full text-sm opacity-70  text-slate-500 rounded-e-sm focus:outline-none" value="pilih">Silahkan pilih jenis kelamin</option>
                            <option className="p-2 bg-slate-200 w-full text-sm opacity-70  text-slate-500 rounded-e-sm focus:outline-none" value="L">Laki-laki</option>
                            <option className="p-2 bg-slate-200 w-full text-sm opacity-70  text-slate-500 rounded-e-sm focus:outline-none" value="P">Perempuan</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="religion" className='label text-black text-xs'>Agama</label>
                    <div className="flex items-start justify-start w-full h-8 mb-3">
                        <div className="w-1 h-full bg-amber-400"></div>
                        <input type="text" value={selector.religion} onChange={(e) => handleInput("RELIGION", e.target.value)} className="p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none " id='religion' />
                    </div>
                </div>
                <div>
                    <label htmlFor="role" className='label text-black text-xs'>Jabatan</label>
                    <div className="flex items-start justify-start w-full h-8 mb-3">
                        <div className="w-1 h-full bg-amber-400"></div>
                        <select id="role" value={selector.role} onChange={(e) => handleInput("ROLE", e.target.value)} className="p-2 bg-slate-200 w-full text-sm opacity-70  text-slate-500 rounded-e-sm focus:outline-none ">
                            <option className="p-2 bg-slate-200 w-full text-sm opacity-70  text-slate-500 rounded-e-sm focus:outline-none" value="pilih">Silahkan pilih Jabatan</option>
                            <option className="p-2 bg-slate-200 w-full text-sm opacity-70  text-slate-500 rounded-e-sm focus:outline-none" value="pns">PNS</option>
                            <option className="p-2 bg-slate-200 w-full text-sm opacity-70  text-slate-500 rounded-e-sm focus:outline-none" value="p3k">P3K</option>
                            <option className="p-2 bg-slate-200 w-full text-sm opacity-70  text-slate-500 rounded-e-sm focus:outline-none" value="cpns">CPNS</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="image" className='label text-black text-xs'>Gambar Profile</label>
                    <div className="flex items-start justify-start w-full h-8 mb-3">
                        <input type="file" onChange={handleImageInput} id='image' className='text-sm' />
                    </div>
                </div>
                <div>
                    <label htmlFor="password" className='label text-black text-xs'>Password</label>
                    <div className="flex items-start justify-start w-full h-8 mb-3">
                        <div className="w-1 h-full bg-amber-400"></div>
                        <input type="password" value={selector.password} onChange={(e) => handleInput("PASSWORD", e.target.value)} className="p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none " id='password' />
                    </div>
                </div>
                <div>
                    <label htmlFor="match-password" className='label text-black text-xs'>Konfirmasi Password</label>
                    <div className="flex items-start justify-start w-full h-8 mb-3">
                        <div className="w-1 h-full bg-amber-400"></div>
                        <input type="password" value={selector.confirmPassword} onChange={(e) => handleInput("CONFIRM_PASSWORD", e.target.value)} className="p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none " id='match-password' />
                    </div>
                </div>
            </div>

            <div className="w-full flex items-center justify-end">
                <button type='submit' className='outline-none border-none bg-amber-400 text-sm text-white rounded-md px-6 py-2 mb-3'>
                    Daftar
                </button>
            </div>
        </form>
    )
}

export default FormRegister