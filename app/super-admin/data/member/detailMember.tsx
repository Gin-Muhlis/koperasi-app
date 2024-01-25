"use client"

import { MemberState } from '@/types/interface'
import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useState } from 'react'

const DetailMember = ({ member }: { member: MemberState }) => {
    const [modal, setModal] = useState<boolean>(false);

    const handleModal = () => {
        
        setModal(!modal)
      
        
    }
  


    return (
        <>

            <button className="btn btn-xs bg-blue-600 text-white border-none" onClick={handleModal}>
                <Icon icon="solar:eye-bold" width="15" height="15" />
            </button>
            <input type="checkbox" checked={modal} onChange={handleModal} className='modal-toggle' />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-4xl bg-white">
                    <h3 className="font-bold text-lg mb-5">Detail Member</h3>
                    <div className='w-full'>
                        <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-4 mb-4">
                            <div className='mb-3'>
                                <label htmlFor="name" className='label text-black text-xs'>Nama Lengkap</label>
                                <div className="flex items-start justify-start w-full h-8 mb-1">
                                    <div className="w-1 h-full bg-amber-400"></div>
                                    <input type="text" defaultValue={member.name} readOnly  className="p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none " />
                                </div>

                            </div>
                            <div className='mb-3'>
                                <label htmlFor="email" className='label text-black text-xs'>Email</label>
                                <div className="flex items-start justify-start w-full h-8">
                                    <div className="w-1 h-full bg-amber-400"></div>
                                    <input type="email" defaultValue={member.email} readOnly className="p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none " />
                                </div>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="phone" className='label text-black text-xs'>No Telepon</label>
                                <div className="flex items-start justify-start w-full h-8">
                                    <div className="w-1 h-full bg-amber-400"></div>
                                    <input type="text" defaultValue={member.phone_number} readOnly className="p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none " />
                                </div>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="address" className='label text-black text-xs'>Alamat</label>
                                <div className="flex items-start justify-start w-full h-8">
                                    <div className="w-1 h-full bg-amber-400"></div>
                                    <input type="text" defaultValue={member.address} readOnly className="p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none " />
                                </div>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="gender" className='label text-black text-xs'>Jenis kelamin</label>
                                <div className="flex items-start justify-start w-full h-8">
                                    <div className="w-1 h-full bg-amber-400"></div>
                                    <input type="text" defaultValue={member.gender == "L" ? "Laki-laki" : "Perempuan"} readOnly className="p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none " />
                                </div>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="religion" className='label text-black text-xs'>Agama</label>
                                <div className="flex items-start justify-start w-full h-8">
                                    <div className="w-1 h-full bg-amber-400"></div>
                                    <input type="text" defaultValue={member.religion} readOnly className="p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none " />
                                </div>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="role" className='label text-black text-xs'>Jabatan/Posisi</label>
                                <div className="flex items-start justify-start w-full h-8">
                                    <div className="w-1 h-full bg-amber-400"></div>
                                    <input type="text" defaultValue={member.position} readOnly className="p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none " />
                                </div>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="image" className='label text-black text-xs'>Gambar Profile</label>

                                <img src={member.imageProfile?.toString()} className="w-14 h-14 mb-1 object-cover" />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="username" className='label text-black text-xs'>Username</label>
                                <div className="flex items-start justify-start w-full h-8">
                                    <div className="w-1 h-full bg-amber-400"></div>
                                    <input type="text" defaultValue={member.username}  className={`p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none`} />
                                </div>

                            </div>
                            <div className='mb-3'>
                                <label className='label text-black text-xs'>Role Member</label>
                                <div className="flex items-start justify-start w-full h-8">
                                <input type="text" defaultValue={member.role} readOnly className="p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none " />
                                </div>

                            </div>
                            <div className='mb-3'>
                                <label htmlFor="active" className='label text-black text-xs'>Aktif</label>
                                <div className="flex items-start justify-start w-full h-8">
                                    <input type="checkbox" readOnly className="toggle toggle-warning"  checked={member.active} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-action">
                            <button type='button' onClick={handleModal} className="btn btn-sm">Tutup</button>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default DetailMember