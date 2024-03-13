"use client"

import React from 'react'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ProfileApp } from '@/types/interface';

const Content = ({ profile }: { profile: ProfileApp }) => {

    return (
        <div className='w-full flex flex-col justify-start items-start gap-5 mb-7'>
            <div className='w-full'>
                <Label>Nama Aplikasi</Label>
                <Input value={profile.app_name} readOnly className='w-full' />
            </div>
            <div className='w-full'>
                <Label>Nama Ketua</Label>
                <Input value={profile.chairmans_name} readOnly className='w-full' />
            </div>
            <div className='w-full'>
                <Label>Nama Sekretaris</Label>
                <Input value={profile.secretary_name} readOnly className='w-full' />
            </div>
            <div className='w-full'>
                <Label>Nama Bendahara</Label>
                <Input value={profile.treasurer_name} readOnly className='w-full' />
            </div>
            <div className='w-full'>
                <Label>Logo</Label>
                <figure>
                    <img src={profile.icon} alt="Gambar Logo Aplikasi" className='w-20 h-20 rounded object-cover' />
                </figure>
            </div>
            <div className='w-full'>
                <Label>Nomor Telepon</Label>
                <Input value={profile.phone_number} readOnly />
            </div>
            <div className='w-full'>
                <Label>Alamat</Label>
                <textarea className='w-full p-2 rounded h-20 border border-solid' value={profile.address} readOnly></textarea>
            </div>
            <div className='w-full'>
                <Label>Tentang</Label>
                <textarea className='w-full p-2 rounded h-52 border border-solid' value={profile.about} readOnly></textarea>
            </div>
        </div>
    )
}

export default Content