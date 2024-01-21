"use client"

import { registerAPI } from '@/api/api-features'
import { signUp } from '@/redux/features/register-slice'
import { appDispatch, useAppSelector } from '@/redux/store'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useRouter } from 'next/navigation'
import React, { SyntheticEvent, useState } from 'react'
import { useDispatch } from 'react-redux'

const FormRegister = () => {
    const [imageProfile, setImageProfile] = useState(null)
    const [previewImage, setPreviewImage] = useState<any>(null)
    const dispatch = useDispatch<appDispatch>()
    const selector = useAppSelector((state) => state.registerReducer)
    const { push } = useRouter()

    const handleInput = (name: string, value: any) => {
        dispatch(signUp({ type: `SET_${name}`, value: value }))
    }

    const handleImageInput = (e: any) => {
        const file = e.target.files[0]

        if (file) {
            setImageProfile(file)

            const render = new FileReader()

            render.onloadend = () => {
                setPreviewImage(render.result as string)
            }

            render.readAsDataURL(file);
        } else {
            setPreviewImage(null)
        }

    }


    const handleRegister = async (event: SyntheticEvent) => {
        event.preventDefault()
        dispatch(signUp({ type: `SET_IS_LOADING`, value: true }))

        try {
            if (selector.password !== selector.confirmPassword) {
                dispatch(signUp({ type: `SET_IS_LOADING`, value: false }))
                return
            }

            const data = {
                ...selector,
                imageProfile: imageProfile
            }

            const response = await registerAPI(data)

            dispatch(signUp({ type: `SET_IS_LOADING`, value: false }))

            if (response.status === 200) {
                push("/login?message=Pendaftaran berhasil")
            }

        } catch (error: any) {
            dispatch(signUp({ type: `SET_IS_LOADING`, value: false }))

            const errorsData = error.response.data.errors
            const keys = Object.keys(errorsData)
            const firstKey = keys[0]
            const message = errorsData[firstKey][0]

            dispatch(signUp({ type: `SET_ERROR`, value: message }))
        }

    }


    return (
        <form onSubmit={handleRegister} className='w-full' encType='multipart/form-data'>
            <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-4 mb-4">
                <div className='mb-3'>
                    <label htmlFor="name" className='label text-black text-xs'>Nama Lengkap</label>
                    <div className="flex items-start justify-start w-full h-8 mb-1">
                        <div className="w-1 h-full bg-amber-400"></div>
                        <input type="text" value={selector.name} onChange={(e) => handleInput("NAME", e.target.value)} className="p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none " id='name' />
                    </div>

                </div>
                <div className='mb-3'>
                    <label htmlFor="email" className='label text-black text-xs'>Email</label>
                    <div className="flex items-start justify-start w-full h-8">
                        <div className="w-1 h-full bg-amber-400"></div>
                        <input type="email" value={selector.email} onChange={(e) => handleInput("EMAIL", e.target.value)} className="p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none " id='email' />
                    </div>
                </div>
                <div className='mb-3'>
                    <label htmlFor="phone" className='label text-black text-xs'>No Telepon</label>
                    <div className="flex items-start justify-start w-full h-8">
                        <div className="w-1 h-full bg-amber-400"></div>
                        <input type="number" value={selector.phone} onChange={(e) => handleInput("PHONE", e.target.value)} className="p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none " id='phone' />
                    </div>
                </div>
                <div className='mb-3'>
                    <label htmlFor="address" className='label text-black text-xs'>Alamat</label>
                    <div className="flex items-start justify-start w-full h-8">
                        <div className="w-1 h-full bg-amber-400"></div>
                        <input type="text" value={selector.address} onChange={(e) => handleInput("ADDRESS", e.target.value)} className="p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none " id='address' />
                    </div>
                </div>
                <div className='mb-3'>
                    <label htmlFor="gender" className='label text-black text-xs'>Jenis kelamin</label>
                    <div className="flex items-start justify-start w-full h-8">
                        <div className="w-1 h-full bg-amber-400"></div>
                        <select value={selector.gender} onChange={(e) => handleInput("GENDER", e.target.value)} id="gender" className="p-2 bg-slate-200 w-full text-sm opacity-70  text-slate-500 rounded-e-sm focus:outline-none ">
                            <option className="p-2 bg-slate-200 w-full text-sm opacity-70  text-slate-500 rounded-e-sm focus:outline-none" disabled value="pilih">Silahkan pilih jenis kelamin</option>
                            <option className="p-2 bg-slate-200 w-full text-sm opacity-70  text-slate-500 rounded-e-sm focus:outline-none" value="L">Laki-laki</option>
                            <option className="p-2 bg-slate-200 w-full text-sm opacity-70  text-slate-500 rounded-e-sm focus:outline-none" value="P">Perempuan</option>
                        </select>
                    </div>
                </div>
                <div className='mb-3'>
                    <label htmlFor="religion" className='label text-black text-xs'>Agama</label>
                    <div className="flex items-start justify-start w-full h-8">
                        <div className="w-1 h-full bg-amber-400"></div>
                        <input type="text" value={selector.religion} onChange={(e) => handleInput("RELIGION", e.target.value)} className="p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none " id='religion' />
                    </div>
                </div>
                <div className='mb-3'>
                    <label htmlFor="role" className='label text-black text-xs'>Jabatan/Posisi</label>
                    <div className="flex items-start justify-start w-full h-8">
                        <div className="w-1 h-full bg-amber-400"></div>
                        <select id="role" value={selector.role} onChange={(e) => handleInput("ROLE", e.target.value)} className="p-2 bg-slate-200 w-full text-sm opacity-70  text-slate-500 rounded-e-sm focus:outline-none ">
                            <option className="p-2 bg-slate-200 w-full text-sm opacity-70  text-slate-500 rounded-e-sm focus:outline-none" disabled value="pilih">Silahkan pilih Jabatan</option>
                            <option className="p-2 bg-slate-200 w-full text-sm opacity-70  text-slate-500 rounded-e-sm focus:outline-none" value="pns">PNS</option>
                            <option className="p-2 bg-slate-200 w-full text-sm opacity-70  text-slate-500 rounded-e-sm focus:outline-none" value="p3k">P3K</option>
                            <option className="p-2 bg-slate-200 w-full text-sm opacity-70  text-slate-500 rounded-e-sm focus:outline-none" value="cpns">CPNS</option>
                        </select>
                    </div>
                </div>
                <div className='mb-3'>
                    <label htmlFor="image" className='label text-black text-xs'>Gambar Profile</label>

                    {previewImage ? <img src={previewImage} className="w-14 h-14 mb-1 object-cover" /> : <div className="w-14 h-14 bg-slate-200 opacity-70 mb-1"></div>}
                    <div className="flex items-start justify-start w-full h-8">
                        <input type="file" accept=".jpg, .jpeg, .png" onChange={handleImageInput} id='image' className='text-sm' />
                    </div>
                </div>
                <div className='mb-3'>
                    <label htmlFor="password" className='label text-black text-xs'>Password</label>
                    <div className="flex items-start justify-start w-full h-8">
                        <div className="w-1 h-full bg-amber-400"></div>
                        <input type="password" value={selector.password} onChange={(e) => handleInput("PASSWORD", e.target.value)} className={`p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none`} id='password' />
                    </div>

                </div>
                <div className='mb-3'>
                    <label htmlFor="match-password" className='label text-black text-xs'>Konfirmasi Password</label>
                    <div className="flex items-start justify-start w-full h-8 mb-1">
                        <div className="w-1 h-full bg-amber-400"></div>
                        <input type="password" value={selector.confirmPassword} onChange={(e) => handleInput("CONFIRM_PASSWORD", e.target.value)} className={`p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none`} id='match-password' />
                    </div>
                    {selector.password != selector.confirmPassword ? <p className='text-sm text-red-500'>Password tidak sama</p> : ''}
                </div>
            </div>

            <div className="w-full flex items-center justify-end">
                <button type='submit' className='btn btn-sm bg-amber-400 text-sm text-white border-none'>
                    {selector.isLoading ? <span className="loading loading-spinner loading-xs"></span> : 'Daftar'}
                </button>
            </div>
            {selector.error && <div className='p-4 bg-red-500 rounded fixed bottom-7 right-7 text-white flex items-center gap-1'>
                <Icon icon="mingcute:alert-fill" width={24} height={24} />
                <span className=" font-semibold text-md alert-access">
                    {selector.error}
                </span>
                <span onClick={() => dispatch(signUp({ type: `SET_ERROR`, value: false }))} className='w-6 h-6 cursor-pointer text-md rounded-full flex items-center justify-center bg-white text-black absolute right-[-10px] top-[-10px]'>
                    <Icon icon="jam:close" />
                </span>
            </div>}
        </form>
    )
}

export default FormRegister