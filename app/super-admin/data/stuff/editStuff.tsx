"use client";

import AlertError from "@/app/components/alertError";
import AlertSuccess from "@/app/components/alertSuccess";
import { createCategory, createProduct, createStuff, updateStuff } from "@/app/utils/featuresApi";
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
import { addStuffSchema, editStuffSchema } from "@/app/utils/formSchema";
import { ProductState, StuffState } from "@/types/interface";
import { Icon } from "@iconify/react/dist/iconify.js";

const formSchema = editStuffSchema;

const EditStuff = ({ stuff, products }: { stuff: StuffState, products: ProductState[] }) => {
    const { data: session } = useSession();

    const [image, setImage] = useState<
        File | string | Blob | undefined
    >(stuff.image);
    const [previewImage, setPreviewImage] = useState<File | string | undefined>(
        undefined
    );
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<string | boolean>(false);
    const [error, setError] = useState<string | boolean>(false);
    const router = useRouter();

    const handleModal = () => {
        setModal(!modal);
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: stuff.name,
            price: stuff.price.toString(),
            product_id: stuff.product_id.toString()
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        const formData = new FormData();

        formData.append("_method", "PUT");
        formData.append("name", values.name);
        formData.append("price", values.price.toString());
        formData.append("product_id", values.product_id as string);

        if (previewImage) {
            formData.append("image", image as Blob);
        }

        const response = await updateStuff(stuff.id, formData, session?.user.accessToken)
        console.log(response)
        setIsLoading(false)

        if (response.status === 200) {
            setModal(!modal)
            form.reset();
            router.refresh();
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
           <span className="w-5 h-5 rounded bg-green-500 text-white flex items-center justify-center cursor-pointer" onClick={handleModal}>
                <Icon icon="lucide:square-pen" width="16" height="16" />
            </span>
            <div className={`p-5 fixed inset-0 z-50 w-full min-h-screen bg-black/80 flex items-center justify-center ${modal ? 'block' : 'hidden'}`}>
                <div className={`w-11/12 max-w-lg bg-white rounded transition-transform max-h-[90vh] overflow-y-scroll ${modal ? 'scale-100' : 'scale-0'}`}>
                    <div className="p-4 border-b border-b-slate-300 mb-4">
                        <h3 className="font-bold text-lg text-black">Edit Data Barang</h3>
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

                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Harga Barang</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="Harga barang" {...field} disabled={isLoading} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="product_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Produk</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value?.toString()} disabled={isLoading}>
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
                                            {previewImage ? <img src={previewImage.toString()} alt="Gambar member" className="w-14 h-14 object-cover rounded mb-2" /> : <img src={image?.toString()} alt="Gambar member" className="w-14 h-14 object-cover rounded mb-2" />}
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
                                <Button type="submit" className="bg-amber-400 text-white" disabled={isLoading}>
                                    {isLoading ? <Loader /> : 'Simpan'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>

            </div>
            {success && <AlertSuccess message={success.toString()} isShow={true} />}
            {error && <AlertError message={error.toString()} isShow={true} />}
        </>
    );
};

export default EditStuff;