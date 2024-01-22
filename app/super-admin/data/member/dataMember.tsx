"use client"
import { getMembers } from '@/api/api-features';
import { MemberState } from '@/types/interface';
import { Icon } from '@iconify/react/dist/iconify.js';
import axios from 'axios';
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import DeleteMember from './deleteMember';

const DataMember: React.FC = () => {
    const { data: session } = useSession();
    const [memberData, setMemberData] = useState<MemberState[]>();
    const [loading, setLoading] = useState<boolean>(true);

    const getData = async (token: string) => {
        console.log(session)
        const response = await getMembers(token)

        setMemberData(response.data.data)
        setLoading(false)
    };

    useEffect(() => {
        if (session?.user.accessToken) {
            getData(session?.user.accessToken);
        }
    }, [session]);

    if (loading) {
        return (
            <div>
                <p className='text-amber-400 text-lg'>Mengambil data...</p>
            </div>
        )
    }

    if (memberData) {
        return (
            <table className="table w-full table-sm">
                <thead className='bg-amber-400 text-black'>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>No Telepon</th>
                        <th>Alamat</th>
                        <th>Jabatan</th>
                        <th>Agama</th>
                        <th className='text-center'>Aksi</th>
                    </tr>
                </thead>
                <tbody className='text-slate-800 text-sm'>
                    {memberData.map((item, index) => (
                        <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone_number}</td>
                            <td>{item.address}</td>
                            <td>{item.position}</td>
                            <td>{item.religion}</td>
                            <td className='flex items-center justify-center gap-1'>
                                <button className="btn btn-xs bg-green-600 text-white border-none">
                                    <Icon icon="solar:pen-bold" width="15" height="15" />
                                </button>
                                <DeleteMember {...item} />

                            </td>
                        </tr>))}
                </tbody>
            </table>
        );
    }


};

export default DataMember;