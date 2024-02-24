"use client";

import AlertError from "@/app/components/alertError";
import AlertSuccess from "@/app/components/alertSuccess";
import { createPositionCategory } from "@/app/utils/featuresApi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Loader from "@/app/components/loader";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { positionCategorySchema } from "@/app/utils/formSchema";

const formSchema = positionCategorySchema;

const AddPositionCategory = () => {
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
      position: "",
      pokok: "0",
      wajib: "0",
      wajib_khusus: "0",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const formData = new FormData();

    formData.append("position", values.position);
    formData.append("pokok", values.pokok.toString());
    formData.append("wajib", values.wajib.toString());
    formData.append("wajib_khusus", values.wajib_khusus.toString());

    const response = await createPositionCategory(
      formData,
      session?.user.accessToken
    );
    console.log(response);

    setIsLoading(false);

    if (response.status === 200) {
      setModal(!modal);
      form.reset();
      router.refresh();
      setSuccess(response.data.message);
    } else if (response.status === 422) {
      const errorsData = response.data.errors;
      const keys = Object.keys(errorsData);
      const firstKey = keys[0];
      const message = errorsData[firstKey][0];

      setError(message);
    } else {
      setError(response.data.message);
    }
  };

  return (
    <>
      <Button className="text-white bg-amber-400" onClick={handleModal}>
        Tambah Data
      </Button>
      <div
        className={`p-5 fixed inset-0 z-50 w-full min-h-screen bg-black/80 flex items-center justify-center ${
          modal ? "block" : "hidden"
        }`}
      >
        <div
          className={`w-11/12 max-w-lg bg-white rounded transition-transform max-h-[90vh] overflow-y-scroll ${
            modal ? "scale-100" : "scale-0"
          }`}
        >
          <div className="p-4 border-b border-b-slate-300 mb-4">
            <h3 className="font-bold text-lg text-black">Tambah Data Produk</h3>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="p-4 grid grid-col-1">
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem className="mb-3">
                      <FormLabel>Nama Posisi</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nama Posisi"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pokok"
                  render={({ field }) => (
                    <FormItem className="mb-3">
                      <FormLabel>Jumlah Pokok</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          placeholder="Jumlah Pokok"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="wajib"
                  render={({ field }) => (
                    <FormItem className="mb-3">
                      <FormLabel>Jumlah Wajib</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          placeholder="Jumlah Wajib"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="wajib_khusus"
                  render={({ field }) => (
                    <FormItem className="mb-3">
                      <FormLabel>Jumlah Wajib Khusus</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          placeholder="Jumlah Wajib Khusus"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="p-4 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  className="text-white"
                  onClick={handleModal}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  className="bg-amber-400 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader /> : "Simpan"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      {success && (
        <AlertSuccess
          message={success.toString()}
          isShow={true}
          setSuccess={setSuccess}
        />
      )}
      {error && (
        <AlertError
          message={error.toString()}
          isShow={true}
          setError={setError}
        />
      )}
    </>
  );
};

export default AddPositionCategory;