"use client";

import { createStuff } from "@/app/utils/featuresApi";
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
import { addStuffSchema } from "@/app/utils/formSchema";
import { ProductState } from "@/types/interface";
import SweetAlertPopup from "@/app/components/sweetAlertPopup";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Label } from "@/components/ui/label";
import { handleFormat } from "@/app/utils/helper";
import Image from "next/image";

const formSchema = addStuffSchema;

const AddStuff = ({ products }: { products: ProductState[] }) => {
    const { data: session } = useSession();

    const [image, setImage] = useState<
        File | string | Blob | undefined
    >();
    const [previewImage, setPreviewImage] = useState<File | string | undefined>(
        undefined
    );
    const [modal, setModal] = useState(false);
    const [price, setPrice] = useState("0")
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
            name: "",
        },
    })

    const resetStateAction = () => {
        setSuccess(false)
        setError(false)
        setStatus(false)
        setImage(undefined)
        setPreviewImage(undefined)
        router.refresh()
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("price", price.toString());
        formData.append("product_id", values.product_id);

        if (image) {
            formData.append("image", image);
        }
        const response = await createStuff(formData, session?.user.accessToken)
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

    const handlePrice = (amount: string) => {
        const numericValue = amount.replace(/\D/g, '');

        setPrice(numericValue)

    }

    const handleImageInput = (event: any) => {
        const file = event.target.files[0];

        if (file) {
            setImage(file);

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
            <Button className="text-white bg-blue-400 flex items-center gap-1 justify-start" onClick={handleModal}>
                <Icon icon="lucide:plus" width={"16"} height={"16"}></Icon>
                <span>Tambah Data</span>
            </Button>
            <div className={`p-5 fixed inset-0 z-50 w-full min-h-screen bg-black/80 flex items-center justify-center ${modal ? 'block' : 'hidden'}`}>
                <div className={`w-11/12 max-w-lg bg-white rounded transition-transform max-h-[90vh] overflow-y-scroll ${modal ? 'scale-100' : 'scale-0'}`}>
                    <div className="p-4 border-b border-b-slate-300 mb-4">
                        <h3 className="font-bold text-lg text-black">Tambah Data Barang</h3>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="p-4 grid grid-col-1 gap-3">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nama Barang</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nama barang" {...field} disabled={isLoading} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="mb-5">
                                    <Label>Harga</Label>
                                    <Input className="w-full" value={handleFormat(Number(price))} onChange={(event) => handlePrice(event.target.value)} disabled={isLoading} />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="product_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Produk</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Silahkan pilih jenis produk" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {products.map((item) => (
                                                        <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>
                                                    ))}
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
                                            {previewImage ? <img src={previewImage.toString()} alt="Gambar barang" className="w-14 h-14 object-cover rounded mb-2" /> : <div className="w-14 h-14 bg-slate-300 rounded mb-2"></div>}
                                            <FormControl>
                                                <Input type="file" {...field} accept=".jpg, .jpeg, .png" onChange={handleImageInput} disabled={isLoading} />
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

export default AddStuff;
