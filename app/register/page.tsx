import DefaultLayout from '@/components/defaultLayout'
import React from 'react'

const Register = () => {
    return (
        <DefaultLayout>
            <div className="md:w-[800px] w-[360px] rounded-md bg-white shadow-white p-5 ">
                <h1 className='text-lg text-sky-400 font-bold mb-5 pb-2 border-2 border-transparent border-solid border-b-sky-400'>Daftar Akun</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-4 mb-4">
                    <div>
                        <label htmlFor="name" className='label text-black text-xs'>Nama Lengkap</label>
                        <div className="flex items-start justify-start w-full h-8 mb-3">
                            <div className="w-1 h-full bg-sky-400"></div>
                            <input type="text" className="p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none " id='name' />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className='label text-black text-xs'>Email</label>
                        <div className="flex items-start justify-start w-full h-8 mb-3">
                            <div className="w-1 h-full bg-sky-400"></div>
                            <input type="email" className="p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none " id='email' />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="phone" className='label text-black text-xs'>No Telepon</label>
                        <div className="flex items-start justify-start w-full h-8 mb-3">
                            <div className="w-1 h-full bg-sky-400"></div>
                            <input type="number" className="p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none " id='phone' />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="address" className='label text-black text-xs'>Alamat</label>
                        <div className="flex items-start justify-start w-full h-8 mb-3">
                            <div className="w-1 h-full bg-sky-400"></div>
                            <input type="text" className="p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none " id='address' />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="gender" className='label text-black text-xs'>Jenis kelamin</label>
                        <div className="flex items-start justify-start w-full h-8 mb-3">
                            <div className="w-1 h-full bg-sky-400"></div>
                            <select id="gender" className="p-2 bg-slate-200 w-full text-sm opacity-70  text-slate-500 rounded-e-sm focus:outline-none ">
                                <option className="p-2 bg-slate-200 w-full text-sm opacity-70  text-slate-500 rounded-e-sm focus:outline-none" value="pilih">Silahkan pilih jenis kelamin</option>
                                <option className="p-2 bg-slate-200 w-full text-sm opacity-70  text-slate-500 rounded-e-sm focus:outline-none" value="L">Laki-laki</option>
                                <option className="p-2 bg-slate-200 w-full text-sm opacity-70  text-slate-500 rounded-e-sm focus:outline-none" value="P">Perempuan</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="religion" className='label text-black text-xs'>Agama</label>
                        <div className="flex items-start justify-start w-full h-8 mb-3">
                            <div className="w-1 h-full bg-sky-400"></div>
                            <input type="text" className="p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none " id='religion' />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="role" className='label text-black text-xs'>Jabatan</label>
                        <div className="flex items-start justify-start w-full h-8 mb-3">
                            <div className="w-1 h-full bg-sky-400"></div>
                            <select id="role" className="p-2 bg-slate-200 w-full text-sm opacity-70  text-slate-500 rounded-e-sm focus:outline-none ">
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
                            <input type="file" id='image' className='text-sm' />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className='label text-black text-xs'>Password</label>
                        <div className="flex items-start justify-start w-full h-8 mb-3">
                            <div className="w-1 h-full bg-sky-400"></div>
                            <input type="password" className="p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none " id='password' />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="match-password" className='label text-black text-xs'>Konfirmasi Password</label>
                        <div className="flex items-start justify-start w-full h-8 mb-3">
                            <div className="w-1 h-full bg-sky-400"></div>
                            <input type="password" className="p-2 bg-slate-200 w-full text-sm opacity-70 placeholder-slate-400 text-slate-500 rounded-e-sm focus:outline-none " id='match-password' />
                        </div>
                    </div>
                </div>
                <div className="w-full flex items-center justify-end">
                    <button type='submit' className='outline-none border-none bg-sky-400 text-sm text-white rounded-md px-6 py-2 mb-3'>
                        Daftar
                    </button>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default Register