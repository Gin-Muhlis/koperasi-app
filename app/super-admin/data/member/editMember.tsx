"use client"

import AlertError from '@/app/components/alertError'
import AlertSuccess from '@/app/components/alertSuccess'
import { editMember } from '@/app/utils/featuresApi'
import { stateEditMember, resetStateMember } from '@/redux/features/editMember-slice'
import { appDispatch, useAppSelector } from '@/redux/store'
import { MemberState, RoleState } from '@/types/interface'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { SyntheticEvent, useState } from 'react'
import { useDispatch } from 'react-redux'

const EditMember = ({ member, roles }: { member: MemberState, roles: RoleState[] }) => {
    const { data: session } = useSession()
    const [imageProfile, setImageProfile] = useState<File | string | Blob | undefined>(member.imageProfile)
    const [previewImage, setPreviewImage] = useState<string | undefined>(undefined)
    const [modal, setModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<string | boolean>(false)
    const [error, setError] = useState<string | boolean>(false)
    const selector = useAppSelector(state => state.editMemberReducer)
    const dispatch = useDispatch<appDispatch>()
    const router = useRouter();

    const handleModal = () => {
        dispatch(resetStateMember())
        setModal(!modal)
        dispatch(stateEditMember({ type: "SET_ID", value: member.id }))
        dispatch(stateEditMember({ type: "SET_NAME", value: member.name }))
        dispatch(stateEditMember({ type: "SET_EMAIL", value: member.email }))
        dispatch(stateEditMember({ type: "SET_ADDRESS", value: member.address }))
        dispatch(stateEditMember({ type: "SET_PHONE", value: member.phone_number }))
        dispatch(stateEditMember({ type: "SET_GENDER", value: member.gender }))
        dispatch(stateEditMember({ type: "SET_RELIGION", value: member.religion }))
        dispatch(stateEditMember({ type: "SET_POSITION", value: member.position }))
        dispatch(stateEditMember({ type: "SET_USERNAME", value: member.username }))
        dispatch(stateEditMember({ type: "SET_ACTIVE", value: member.active }))
        dispatch(stateEditMember({ type: "SET_ROLE", value: member.role }))
        
    }

    const handleInput = (name: string, value: any) => {
        dispatch(stateEditMember({ type: `SET_${name}`, value: value }))
    }

    const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.checked
        dispatch(stateEditMember({ type: "SET_ACTIVE", value }))
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

        const response = await editMember(data, session?.user.accessToken, previewImage)
        setModal(false);

        setIsLoading(false)

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

            <button className="btn btn-xs bg-green-600 text-white border-none" onClick={handleModal}>
                <Icon icon="solar:pen-bold" width="15" height="15" />
            </button>
            <input type="checkbox" checked={modal} onChange={handleModal} className='modal-toggle' />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-4xl bg-white">
                    <h3 className="font-bold text-lg mb-5">Edit Member</h3>
                    <form onSubmit={handleSubmit} className='w-full' encType='multipart/form-data'>
                        <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-4 mb-4">
                            <div className='mb-3'>
                                <label htmlFor="name" className='label text-black text-xs'>Nama Lengkap</label>
                                <div className="flex items-start justify-start w-full h-8 mb-1">
                                    <div className="w-1 h-full bg-amber-400"></div>
                                    <input type="text" value={selector.name} onChange={(e) => handleInput("NAME", e.target.value)} className="p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none " />
                                </div>

                            </div>
                            <div className='mb-3'>
                                <label htmlFor="email" className='label text-black text-xs'>Email</label>
                                <div className="flex items-start justify-start w-full h-8">
                                    <div className="w-1 h-full bg-amber-400"></div>
                                    <input type="email" value={selector.email} onChange={(e) => handleInput("EMAIL", e.target.value)} className="p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none " />
                                </div>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="phone" className='label text-black text-xs'>No Telepon</label>
                                <div className="flex items-start justify-start w-full h-8">
                                    <div className="w-1 h-full bg-amber-400"></div>
                                    <input type="number" value={selector.phone_number} onChange={(e) => handleInput("PHONE", e.target.value)} className="p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none " />
                                </div>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="address" className='label text-black text-xs'>Alamat</label>
                                <div className="flex items-start justify-start w-full h-8">
                                    <div className="w-1 h-full bg-amber-400"></div>
                                    <input type="text" value={selector.address} onChange={(e) => handleInput("ADDRESS", e.target.value)} className="p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none " />
                                </div>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="gender" className='label text-black text-xs'>Jenis kelamin</label>
                                <div className="flex items-start justify-start w-full h-8">
                                    <div className="w-1 h-full bg-amber-400"></div>
                                    <select value={selector.gender} onChange={(e) => handleInput("GENDER", e.target.value)} className="p-2 bg-slate-200 w-full text-sm opacity-70  text-slate-500 rounded-e-sm focus:outline-none ">
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
                                    <input type="text" value={selector.religion} onChange={(e) => handleInput("RELIGION", e.target.value)} className="p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none " />
                                </div>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="role" className='label text-black text-xs'>Jabatan/Posisi</label>
                                <div className="flex items-start justify-start w-full h-8">
                                    <div className="w-1 h-full bg-amber-400"></div>
                                    <select value={selector.role} onChange={(e) => handleInput("ROLE", e.target.value)} className="p-2 bg-slate-200 w-full text-sm opacity-70  text-slate-500 rounded-e-sm focus:outline-none ">
                                        <option className="p-2 bg-slate-200 w-full text-sm opacity-70  text-slate-500 rounded-e-sm focus:outline-none" disabled value="pilih">Silahkan pilih Jabatan</option>
                                        <option className="p-2 bg-slate-200 w-full text-sm opacity-70  text-slate-500 rounded-e-sm focus:outline-none" value="pns">PNS</option>
                                        <option className="p-2 bg-slate-200 w-full text-sm opacity-70  text-slate-500 rounded-e-sm focus:outline-none" value="p3k">P3K</option>
                                        <option className="p-2 bg-slate-200 w-full text-sm opacity-70  text-slate-500 rounded-e-sm focus:outline-none" value="cpns">CPNS</option>
                                    </select>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="image" className='label text-black text-xs'>Gambar Profile</label>

                                {previewImage ? <img src={previewImage} className="w-14 h-14 mb-1 object-cover" /> : <img src={imageProfile?.toString()} className="w-14 h-14 mb-1 object-cover" />}
                                <div className="flex items-start justify-start w-full h-8">
                                    <input type="file" accept=".jpg, .jpeg, .png" onChange={handleImageInput} className='text-sm' />
                                </div>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="username" className='label text-black text-xs'>Username</label>
                                <div className="flex items-start justify-start w-full h-8">
                                    <div className="w-1 h-full bg-amber-400"></div>
                                    <input type="text" value={selector.username} onChange={(e) => handleInput("USERNAME", e.target.value)} className={`p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none`} />
                                </div>

                            </div>
                            <div className='mb-3'>
                                <label htmlFor="password" className='label text-black text-xs'>Password</label>
                                <div className="flex items-start justify-start w-full h-8">
                                    <div className="w-1 h-full bg-amber-400"></div>
                                    <input type="password" value={selector.password} onChange={(e) => handleInput("PASSWORD", e.target.value)} className={`p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none`} />
                                </div>

                            </div>
                            <div className='mb-3'>
                                <label className='label text-black text-xs'>Role Member</label>
                                <div className="flex items-start justify-start w-full h-8">
                                    <select  value={selector.role} onChange={(e) => handleInput('ROLE', e.target.value)} className='select w-full bg-slate-200 select-sm'>
                                        <option value="pilih" disabled >Pilihkah Pilih Role</option>
                                        {roles?.map((item, index) => (
                                            <option key={item.id} value={item.name} >{item.name}</option>
                                        ))}
                                    </select>
                                </div>

                            </div>
                            <div className='mb-3'>
                                <label htmlFor="active" className='label text-black text-xs'>Aktif</label>
                                <div className="flex items-start justify-start w-full h-8">
                                    <input type="checkbox" className="toggle toggle-warning" onChange={handleChecked} checked={selector.active} />
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
                </div>
            </div>

            {success && <AlertSuccess message={success.toString()} isShow={true} />}
            {error && <AlertError message={error.toString()} isShow={true} />}
        </>
    )
}

export default EditMember