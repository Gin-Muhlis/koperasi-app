"use client";

import AlertError from "@/app/components/alertError";
import AlertSuccess from "@/app/components/alertSuccess";
import { createCategory, createProduct } from "@/app/utils/featuresApi";
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
import { productSchema } from "@/app/utils/formSchema";

const formSchema = productSchema;

const AddProduct = () => {
  const { data: session } = useSession();
  
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
      name: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    const formData = new FormData();

    formData.append("name", values.name);

    const response = await createProduct(formData, session?.user.accessToken)
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


  return (
    <>
      <Button className="text-white bg-amber-400" onClick={handleModal}>Tambah Data</Button>
      <div className={`p-5 fixed inset-0 z-50 w-full min-h-screen bg-black/80 flex items-center justify-center ${modal ? 'block' : 'hidden'}`}>
        <div className={`w-11/12 max-w-lg bg-white rounded transition-transform max-h-[90vh] overflow-y-scroll ${modal ? 'scale-100' : 'scale-0'}`}>
          <div className="p-4 border-b border-b-slate-300 mb-4">
            <h3 className="font-bold text-lg text-black">Tambah Data Produk</h3>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="p-4 grid grid-col-1">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama jenis produk</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama Lengkap" {...field} disabled={isLoading} />
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

export default AddProduct;
