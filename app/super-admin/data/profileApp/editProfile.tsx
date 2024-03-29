"use client";

import AlertError from "@/app/components/alertError";
import AlertSuccess from "@/app/components/alertSuccess";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Loader from "@/app/components/loader";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { profileSchema } from "@/app/utils/formSchema";
import { ProfileApp } from "@/types/interface";
import { updateCategory, updateProfile, updateProfileApp } from "@/app/utils/featuresApi";
import SweetAlertPopup from "@/app/components/sweetAlertPopup";

const formSchema = profileSchema;

const EditProfile = ({ profile }: { profile: ProfileApp }) => {
    const { data: session } = useSession();

    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<string | boolean>(false);
    const [error, setError] = useState<string | boolean>(false);
    const [status, setStatus] = useState<number | boolean>(false);

    const router = useRouter();

    const handleModal = () => {
        setModal(!modal);
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            chairmans_name: profile.chairmans_name,
            secretary_name: profile.secretary_name,
            treasurer_name: profile.treasurer_name,
            address: profile.address,
        },
    })


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        const formData = new FormData();

        formData.append("_method", "PUT");
        formData.append("chairmans_name", values.chairmans_name);
        formData.append("secretary_name", values.secretary_name);
        formData.append("treasurer_name", values.treasurer_name);
        formData.append("address", values.address);


        const response = await updateProfileApp(profile.id, formData, session?.user.accessToken);
        setStatus(response.status)
        setIsLoading(false)

        if (response.status === 200) {
            setModal(!modal)
            form.reset();

            setSuccess(response.data.message)
        } else if (response.status === 422) {
            const errorsData = response.data.errors
            const keys = Object.keys(errorsData)
            const firstKey = keys[0]
            const message = errorsData[firstKey][0]

            setError(message)
        } else {
            setError(response.data.message)
        }
    }

    const resetStateAction = () => {
        setStatus(false)
        setSuccess(false)
        setError(false)
        router.refresh();
    }


    return (
        <>
            <Button className="text-white bg-blue-400" onClick={handleModal}>Edit Data Profile</Button>
            <div className={`p-5 w-full fixed inset-0 z-50  min-h-screen bg-black/80 flex items-center justify-center ${modal ? 'block' : 'hidden'}`}>
                <div className={`w-full max-w-xl bg-white rounded transition-transform max-h-[90vh] overflow-y-scroll ${modal ? 'scale-100' : 'scale-0'}`}>
                    <div className="p-4 border-b border-b-slate-300 mb-4">
                        <h3 className="font-bold text-lg text-black">Edit Data Profile Aplikasi</h3>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="p-4 grid grid-col-1">
                                
                                <FormField
                                    control={form.control}
                                    name="chairmans_name"
                                    render={({ field }) => (
                                        <FormItem className="mb-3">
                                            <FormLabel>Nama Ketua</FormLabel>
                                            <FormControl>
                                                <Input className="text-sm" placeholder="Nama Ketua" {...field} disabled={isLoading} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="secretary_name"
                                    render={({ field }) => (
                                        <FormItem className="mb-3">
                                            <FormLabel>Nama Sekretaris</FormLabel>
                                            <FormControl>
                                                <Input className="text-sm" placeholder="Nama Sekretaris" {...field} disabled={isLoading} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="treasurer_name"
                                    render={({ field }) => (
                                        <FormItem className="mb-3">
                                            <FormLabel>Nama Bendahara</FormLabel>
                                            <FormControl>
                                                <Input className="text-sm" placeholder="Nama Bendahara" {...field} disabled={isLoading} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem className="mb-3">
                                            <FormLabel>Alamat</FormLabel>
                                            <FormControl>
                                                <textarea className="w-full h-20 rounded border border-solid p-2 text-sm" {...field} disabled={isLoading}></textarea>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>
                            <div className="p-4 flex items-center justify-end gap-3">
                                <Button type="button" className="text-white" onClick={handleModal}>Batal</Button>
                                <Button type="submit" className="bg-blue-400 text-white" disabled={isLoading}>
                                    {isLoading ? <Loader /> : 'Simpan'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>

            </div>
            {success && <SweetAlertPopup message={success.toString()} status={status} resetState={resetStateAction} />}
            {error && <SweetAlertPopup message={error.toString()} status={status} resetState={resetStateAction} />}
        </>
    );
};

export default EditProfile;
