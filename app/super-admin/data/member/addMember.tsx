"use client"
import { Icon } from '@iconify/react/dist/iconify.js'
import React, { SyntheticEvent } from 'react'

const AddMember = () => {


    const handleSubmit = async(event: SyntheticEvent) => {

    }

    return (
        <>
            <button className="btn btn-sm bg-amber-400 border-none text-white mb-10 block" onClick={() => {
                const dialogElement = document.getElementById('addData') as HTMLDialogElement;
                if ('showModal' in dialogElement) {
                    dialogElement.showModal();
                }
            }}>Tambah Data</button>

            <dialog id="addData" className="modal">
                <div className="modal-box w-11/12 max-w-4xl bg-white">
                    <h3 className="font-bold text-lg text-black">Tambah Data Member</h3>
                    <div className="modal-action">
                            <form method="dialog">
                                <button className="btn btn-sm">Batal</button>
                            </form>
                            <button type='submit' className='btn btn-sm bg-amber-400 text-sm text-white border-none'>
                            <span className="loading loading-spinner loading-xs"></span>
                            </button>
                        </div>

                </div>
            </dialog>
        </>
    )
}

export default AddMember