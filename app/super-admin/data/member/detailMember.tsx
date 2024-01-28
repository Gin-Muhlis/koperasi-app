"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button"
import { MemberState, RoleState } from "@/types/interface";
import { Icon } from '@iconify/react/dist/iconify.js';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";


const DetailMember = ({ member }: { member: MemberState }) => {
    const [modal, setModal] = useState(false);

    const handleModal = () => {
        setModal(!modal);
    };


    return (
        <>
            <span className="w-5 h-5 rounded bg-blue-500 text-white flex items-center justify-center cursor-pointer" onClick={handleModal}>
                <Icon icon="lucide:eye" width="16" height="16" />
            </span>
            <div className={`p-5 fixed inset-0 z-50 w-full min-h-screen bg-black/80 flex items-center justify-center ${modal ? 'block' : 'hidden'}`}>
                <div className={`w-11/12 max-w-4xl bg-white rounded h-full transition-transform max-h-[90vh] overflow-y-scroll ${modal ? 'scale-100' : 'scale-0'}`}>
                    <div className="p-4 border-b border-b-slate-300 mb-4">
                        <h3 className="font-bold text-lg text-black">Edit Data Member</h3>
                    </div>
                    <div className="p-4 grid grid-col-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label>Nama</Label>
                            <Input value={member.name} readOnly />
                        </div>
                        <div>
                            <Label>Email</Label>
                            <Input value={member.email} readOnly />
                        </div>
                        <div>
                            <Label>Alamat</Label>
                            <Input value={member.address} readOnly />
                        </div>
                        <div>
                            <Label>No Telp</Label>
                            <Input value={member.phone_number} readOnly />
                        </div>
                        <div>
                            <Label>Jabatan</Label>
                            <Input value={member.position} readOnly />
                        </div>
                        <div>
                            <Label>Gambar Profile</Label>
                            <img src={member.imageProfile?.toString()} alt="Gambar member" className="w-14 h-14 rounded object-cover" />
                        </div>
                        <div>
                            <Label>Username</Label>
                            <Input value={member.username} readOnly />
                        </div>
                        <div>
                            <Label>Role</Label>
                            <Input value={member.role} readOnly />
                        </div>
                        <div>
                            <Label className="block mb-2">Aktif</Label>
                            <Switch checked={member.active == 1 ? true : false}  />
                        </div>
                    </div>
                    <div className="p-4 flex items-center justify-end gap-3">
                        <Button type="button" className="text-white" onClick={handleModal}>Tutup</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailMember;
