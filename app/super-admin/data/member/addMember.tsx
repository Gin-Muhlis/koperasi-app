"use client"

import AlertError from '@/app/components/alertError'
import AlertSuccess from '@/app/components/alertSuccess'
import { createMember } from '@/app/utils/featuresApi'
import { stateAddMember, resetStateMember } from '@/redux/features/addMember-slice'
import { appDispatch, useAppSelector } from '@/redux/store'
import { RoleState } from '@/types/interface'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const AddMember = ({roles}: {roles: RoleState[] | undefined}) => {
    const { data: session } = useSession()
    const [imageProfile, setImageProfile] = useState<File | string | Blob | undefined>()
    const [previewImage, setPreviewImage] = useState<File | string | undefined>(undefined)
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<string | boolean>(false)
    const [error, setError] = useState<string | boolean>(false)

    const selector = useAppSelector(state => state.addMemmberReducer)
    const dispatch = useDispatch<appDispatch>()
    const router = useRouter();

    const handleModal = () => {
        setModal(!modal)
    }

    const handleInput = (name: string, value: any) => {
        dispatch(stateAddMember({ type: `SET_${name}`, value: value }))
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
            setPreviewImage(undefined)
        }

    }

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault()
        setIsLoading(true)

        const data = {
            ...selector,
            imageProfile: imageProfile
        }

        const response = await createMember(data, session?.user.accessToken)
        
        setIsLoading(false)
        setModal(!modal)

        if (response.status === 200) {
            dispatch(resetStateMember())
            
            setSuccess(response.data.message)

        } else if (response.status === 422) {
            const errorsData = response.data.errors
                const keys = Object.keys(errorsData)
                const firstKey = keys[0]
                const message = errorsData[firstKey][0]

                setError(message)
        } else {
            setError('Terjadi kesalahan dengan sistem!')
        }
        router.refresh()

    }

    return (
        <>
            <button className="btn btn-sm bg-amber-400 border-none text-white mb-10 block" onClick={handleModal}>Tambah Data</button>
            <input type="checkbox" checked={modal} onChange={handleModal} className='modal-toggle' />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-4xl bg-white">
                    <h3 className="font-bold text-lg text-black">Tambah Data Member</h3>
                    {/*  */}
                    <form onSubmit={handleSubmit} className='w-full' encType='multipart/form-data'>
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
                                    <input type="number" value={selector.phone_number} onChange={(e) => handleInput("PHONE", e.target.value)} className="p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none " id='phone' />
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
                                    <select id="role" value={selector.position} onChange={(e) => handleInput("POSITION", e.target.value)} className="p-2 bg-slate-200 w-full text-sm opacity-70  text-slate-500 rounded-e-sm focus:outline-none ">
                                        <option className="p-2 bg-slate-200 w-full text-sm opacity-70  text-slate-500 rounded-e-sm focus:outline-none" disabled value="pilih">Silahkan pilih Jabatan</option>
                                        <option className="p-2 bg-slate-200 w-full text-sm opacity-70  text-slate-500 rounded-e-sm focus:outline-none" value="pns">PNS</option>
                                        <option className="p-2 bg-slate-200 w-full text-sm opacity-70  text-slate-500 rounded-e-sm focus:outline-none" value="p3k">P3K</option>
                                        <option className="p-2 bg-slate-200 w-full text-sm opacity-70  text-slate-500 rounded-e-sm focus:outline-none" value="cpns">CPNS</option>
                                    </select>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="image" className='label text-black text-xs'>Gambar Profile</label>

                                {previewImage ? <img src={previewImage.toString()} className="w-14 h-14 mb-1 object-cover" /> : <div className="w-14 h-14 bg-slate-200 opacity-70 mb-1"></div>}
                                <div className="flex items-start justify-start w-full h-8">
                                    <input type="file" accept=".jpg, .jpeg, .png" onChange={handleImageInput} id='image' className='text-sm' />
                                </div>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="username" className='label text-black text-xs'>Username</label>
                                <div className="flex items-start justify-start w-full h-8">
                                    <div className="w-1 h-full bg-amber-400"></div>
                                    <input type="text" value={selector.username} onChange={(e) => handleInput("USERNAME", e.target.value)} className={`p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none`} id='username' />
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
                                <label  className='label text-black text-xs'>Role Member</label>
                                <div className="flex items-start justify-start w-full h-8">
                                    <select  value={selector.role} onChange={(e) => handleInput('ROLE', e.target.value)} className='select w-full bg-slate-200 select-sm'>
                                        <option value="pilih" disabled >Pilihkah Pilih Role</option>
                                        {roles?.map((item, index) => (
                                            <option key={item.id} value={item.name} >{item.name}</option>
                                        ))}
                                    </select>
                                </div>

                            </div>

                        </div>

                        <div className="modal-action">
                            <button type='button' onClick={handleModal} className="btn btn-sm">Batal</button>

                            <button type='submit' className='btn btn-sm bg-amber-400 text-sm text-white border-none' disabled={isLoading}>
                                {isLoading ? <span className="loading loading-spinner loading-xs"></span> : 'Simpan'}
                            </button>
                        </div>
                    </form>
                    {/*  */}


                </div>
            </div>
            {success && <AlertSuccess message={success.toString()} isShow={true} />}
            {error && <AlertError message={error.toString()} isShow={true} />}
        </>
    )
}

export default AddMember