"use client";

import AlertError from "@/app/components/alertError";
import AlertSuccess from "@/app/components/alertSuccess";
import { createSubCategory } from "@/app/utils/featuresApi";
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
import { createSubCategorySchema } from "@/app/utils/formSchema";
import { CategoryState } from "@/types/interface";

const formSchema = createSubCategorySchema;

const AddSubCategory = ({categories}: {categories: CategoryState[]}) => {
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
      name: "",
      type: "debit",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("type", values.type);
    formData.append("category_id", values.category_id);

    const response = await createSubCategory(formData, session?.user.accessToken)
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
            <h3 className="font-bold text-lg text-black">Tambah Data Kategori</h3>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="p-4 grid grid-col-1 gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Sub Kategori</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama Sub Kategori" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipe</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Silahkan pilih tipe" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="debit">Debit</SelectItem>
                          <SelectItem value="kredit">Kredit</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kategori</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Silahkan pilih kategori" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {categories.map((item) => (
                                <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
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

export default AddSubCategory;
