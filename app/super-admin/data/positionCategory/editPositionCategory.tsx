"use client";

import AlertError from "@/app/components/alertError";
import AlertSuccess from "@/app/components/alertSuccess";
import {
  createPositionCategory,
  updatePositionCategory,
} from "@/app/utils/featuresApi";
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
import { PositionCategory } from "@/types/interface";
import { Icon } from "@iconify/react/dist/iconify.js";
import SweetAlertPopup from "@/app/components/sweetAlertPopup";
import { handleFormat } from "@/app/utils/helper";
import { Label } from "@/components/ui/label";

const formSchema = positionCategorySchema;

const EditPositionCategory = ({
  positionCategory,
}: {
  positionCategory: PositionCategory;
}) => {
  const { data: session } = useSession();

  const [modal, setModal] = useState(false);
  const [pokok, setPokok] = useState(positionCategory["simpanan pokok"].toString())
  const [wajib, setWajib] = useState(positionCategory["simpanan wajib"].toString())
  const [wajibKhusus, setWajibKhusus] = useState(positionCategory["simpanan wajib khusus"].toString())
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
      position: positionCategory.name,
    },
  });

  const resetStateAction = () => {
    setSuccess(false)
    setError(false)
    setStatus(false)
    router.refresh()
  }

  const handlePokok = (amount: string) => {
    const numericValue = amount.replace(/\D/g, '');

    setPokok(numericValue)

  }

  const handleWajib = (amount: string) => {
    const numericValue = amount.replace(/\D/g, '');

    setWajib(numericValue)

  }

  const handleWajibKhusus = (amount: string) => {
    const numericValue = amount.replace(/\D/g, '');

    setWajibKhusus(numericValue)

  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const formData = new FormData();

    formData.append("_method", "PUT");
    formData.append("position", values.position);
    formData.append("pokok", pokok.toString());
    formData.append("wajib", wajib.toString());
    formData.append("wajib_khusus", wajibKhusus.toString());

    const response = await updatePositionCategory(
      positionCategory.id,
      formData,
      session?.user.accessToken
    );
    setStatus(response.status)

    setIsLoading(false);

    if (response.status === 200) {
      setModal(!modal);
      form.reset();
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
      <span
        className="w-5 h-5 rounded bg-green-500 text-white flex items-center justify-center cursor-pointer"
        onClick={handleModal}
      >
        <Icon icon="lucide:square-pen" width="16" height="16" />
      </span>
      <div
        className={`p-5 fixed inset-0 z-50 w-full min-h-screen bg-black/80 flex items-center justify-center ${modal ? "block" : "hidden"
          }`}
      >
        <div
          className={`w-11/12 max-w-lg bg-white rounded transition-transform max-h-[90vh] overflow-y-scroll ${modal ? "scale-100" : "scale-0"
            }`}
        >
          <div className="p-4 border-b border-b-slate-300 mb-4">
            <h3 className="font-bold text-lg text-black">Edit Data Golongan</h3>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="p-4 grid grid-col-1">
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem className="mb-3">
                      <FormLabel>Nama Golongan</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nama Golongan"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="mb-5">
                  <Label>Jumlah Pokok</Label>
                  <Input className="w-full" value={handleFormat(Number(pokok))} onChange={(event) => handlePokok(event.target.value)} disabled={isLoading} />
                </div>

                <div className="mb-5">
                  <Label>Jumlah Wajib</Label>
                  <Input className="w-full" value={handleFormat(Number(wajib))} onChange={(event) => handleWajib(event.target.value)} disabled={isLoading} />
                </div>

                <div className="mb-5">
                  <Label>Jumlah Wajib Khusus</Label>
                  <Input className="w-full" value={handleFormat(Number(wajibKhusus))} onChange={(event) => handleWajibKhusus(event.target.value)} disabled={isLoading} />
                </div>
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
                  className="bg-blue-400 text-white"
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
        <SweetAlertPopup
          message={success.toString()}
          status={status}
          resetState={resetStateAction}
        />
      )}
      {error && (
        <SweetAlertPopup
          message={error.toString()}
          status={status}
          resetState={resetStateAction}
        />
      )}
    </>
  );
};

export default EditPositionCategory;
