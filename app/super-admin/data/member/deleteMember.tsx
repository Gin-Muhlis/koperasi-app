'use client'
import axios from 'axios';
import React from 'react';
import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/navigation';
import { MemberState } from '@/types/interface';
import { Icon } from '@iconify/react/dist/iconify.js';
import { deleteMember } from '@/api/api-features';
import { useSession } from 'next-auth/react';
import AlertSuccess from '@/app/components/alertSuccess';
import AlertError from '@/app/components/alertError';


const DeleteMember = ({member}: {member: MemberState}) => {
    const { data: session } = useSession()
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState<any>(false)
    const [error, setError] = useState<any>(false)

    const router = useRouter();

    const handleModal = () => {
        setModal(!modal)
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        setIsLoading(true);

        const response = await deleteMember(member.id, session?.user.accessToken);

        setModal(false);
        setIsLoading(false);
        
        
        if (response.status === 200) {
            setSuccess('Data member berhasil dihapus')
            router.refresh();
        } else {
            setError('Data member gagal dihapus')
        }
    }

    return (
        <div>

            <button className="btn btn-xs bg-red-600 text-white border-none" onClick={handleModal}>
                <Icon icon="mdi:trash" width="15" height="15" />
            </button>
            <input type="checkbox" checked={modal} onChange={handleModal} className='modal-toggle' />
            <div className="modal">
                <div className="modal-box bg-white">
                    <h3 className="font-bold text-lg mb-5">Hapus Member </h3>
                    <p className='mb-5 text-red-600'>Data {member.name} akan dihapus</p>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-action">
                            <button type='button' onClick={handleModal} className="btn btn-sm">Batal</button>

                            <button type='submit' className='btn btn-sm bg-red-400 text-sm text-white border-none'>
                                {isLoading ? <span className="loading loading-spinner loading-xs"></span> : 'Hapus'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {success && <AlertSuccess message={success} isShow={true} />}
            {error && <AlertError message={error} isShow={true} />}
        </div>
    )
}

export default DeleteMember;