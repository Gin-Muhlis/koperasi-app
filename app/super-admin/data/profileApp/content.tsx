"use client"

import React from 'react'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ProfileApp } from '@/types/interface';

const Content = ({ profile }: { profile: ProfileApp }) => {

    return (
        <div className='w-full flex flex-col justify-start items-start gap-5 mb-7'>
            
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
                <Label>Alamat</Label>
                <textarea className='w-full p-2 rounded h-20 border border-solid' value={profile.address} readOnly></textarea>
            </div>
        </div>
    )
}

export default Content