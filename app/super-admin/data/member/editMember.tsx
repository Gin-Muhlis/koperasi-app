"use client";

import AlertError from "@/app/components/alertError";
import AlertSuccess from "@/app/components/alertSuccess";
import { updateMember } from "@/app/utils/featuresApi";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectGroup,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { updateMemberSchema } from "@/app/utils/formSchema";
import { MemberState, PositionCategory, RoleState } from "@/types/interface";
import { Icon } from '@iconify/react/dist/iconify.js';
import { Switch } from "@/components/ui/switch";
import SweetAlertPopup from "@/app/components/sweetAlertPopup";
import Image from "next/image";

const formSchema = updateMemberSchema;

const EditMember = ({ isModal, resetModal, member, roles, positionCategories }: { isModal: boolean, resetModal: () => void, member: MemberState | undefined, roles: RoleState[] | undefined, positionCategories: PositionCategory[] }) => {
    const { data: session } = useSession();
    const [imageProfile, setImageProfile] = useState<
        File | string | Blob | undefined
    >(member?.imageProfile);
    const [previewImage, setPreviewImage] = useState<File | string | undefined>(
        undefined
    );
    const [modal, setModal] = useState(isModal);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<string | boolean>(false);
    const [error, setError] = useState<string | boolean>(false);
    const [status, setStatus] = useState<number | boolean>(false);
    const [passwordShow, setPasswordShow] = useState<boolean>(false)

    const router = useRouter();

    const handleModal = () => {
        setModal(!modal);
        resetModal()
    };

    const handleShowPassword = () => {
        setPasswordShow(!passwordShow);
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: member?.name,
            email: member?.email,
            address: member?.address,
            phone_number: member?.phone_number,
            religion: member?.religion,
            gender: member?.gender,
            position: member?.position,
            username: member?.username,
            role: member?.role,
            active: member?.active == 1 ? true : false,
            position_category: member?.position_category
        },
    })

    const resetStateAction = () => {
        setSuccess(false);
        setStatus(false);
        setError(false)
        setImageProfile(undefined)
        setPreviewImage(undefined)
        router.refresh();
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        const formData = new FormData();

        const positionCategory = positionCategories.find((position) => position.name == values.position_category);

        formData.append("_method", "PUT");
        formData.append("username", values.username);
        formData.append("email", values.email);
        formData.append("name", values.name);
        formData.append("address", values.address);
        formData.append("phone_number", values.phone_number);
        formData.append("position", values.position);
        formData.append("gender", values.gender);
        formData.append("religion", values.religion.toLowerCase());
        formData.append("role", values.role);
        formData.append("active", values.active ? '1' : '0');
        formData.append("password", values.password as string);
        formData.append("group_id", positionCategory?.id.toString() as string)

        if (previewImage) {
            formData.append("image", imageProfile as Blob);
        }

        const response = await updateMember(member?.id as number, formData, session?.user.accessToken)
        setStatus(Number(response.status))
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
        } else if (response.status === 400) {
            const message = response.data.message;

            setError(message)
        } else {
            setError("Terjadi kesalahan dengan sistem!")
        }
    }

    const handleImageInput = (event: any) => {
        const file = event.target.files[0];

        if (file) {
            setImageProfile(file);

            const render = new FileReader();

            render.onloadend = () => {
                setPreviewImage(render.result as string);
            };

            render.readAsDataURL(file);
        } else {
            setPreviewImage(undefined);
        }
    };


    return (
        <>
            <div className={`p-5 fixed inset-0 z-50 w-full min-h-screen bg-black/80 flex items-center justify-center ${modal ? 'block' : 'hidden'}`}>
                <div className={`w-11/12 max-w-4xl bg-white rounded h-full transition-transform max-h-[90vh] overflow-y-scroll ${modal ? 'scale-100' : 'scale-0'}`}>
                    <div className="p-4 border-b border-b-slate-300 mb-4">
                        <h3 className="font-bold text-lg text-black">Edit Data Anggota</h3>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="p-4 grid grid-col-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nama Lengkap</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nama Lengkap" {...field} disabled={isLoading} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="Email" {...field} disabled={isLoading} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Alamat</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Alamat" {...field} disabled={isLoading} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="phone_number"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>No Telp</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="No Telepon" {...field} disabled={isLoading} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="religion"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Agama</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Agama" {...field} disabled={isLoading} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Jenis Kelamin</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih jenis kelamin" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="L">Laki-laki</SelectItem>
                                                    <SelectItem value="P">Perempuan</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="position"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Jabatan</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Silahkan pilih jabatan" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="pns">PNS</SelectItem>
                                                    <SelectItem value="p3k">P3K</SelectItem>
                                                    <SelectItem value="cpns">CPNS</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="position_category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Golongan</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Silahkan pilih Golongan" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Golongan</SelectLabel>
                                                        {positionCategories.map((position) => (
                                                            <SelectItem key={position.id} value={position.name}>{position.name}</SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Username" {...field} disabled={isLoading} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>password</FormLabel>
                                            <FormControl>
                                                <div className="w-full flex items-center justify-center relative">
                                                    <Input type={passwordShow ? 'text' : 'password'} placeholder="password" {...field} disabled={isLoading} />
                                                    <Icon icon={passwordShow ? "mingcute:eye-close-fill" : "solar:eye-bold"} width={22} height={22} onClick={handleShowPassword} className='cursor-pointer absolute right-1 top-1/2 -translate-y-1/2 text-blue-400 text-md' />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Role</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Silahkan pilih jabatan" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Jabatan/Posisi</SelectLabel>
                                                        {roles && roles.map((role) => (
                                                            <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Gambar</FormLabel>
                                            {previewImage ? <img src={previewImage.toString()} alt="Gambar member" className="w-14 h-14 object-cover rounded mb-2" /> : <img src={imageProfile?.toString() as string} alt="Gambar member" className="w-14 h-14 object-cover rounded mb-2" />}
                                            <FormControl>
                                                <Input type="file" {...field} accept=".jpg, .jpeg, .png" onChange={handleImageInput} disabled={isLoading} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="active"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block mb-2">Aktif</FormLabel>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    disabled={isLoading}
                                                />
                                            </FormControl>
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

export default EditMember;
