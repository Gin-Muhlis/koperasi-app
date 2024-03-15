"use client";

import { signUp } from "@/redux/features/register-slice";
import { appDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../utils/featuresApi";
import AlertError from "./alertError";
import { PositionCategory } from "@/types/interface";
import Loader from "./loader";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import SweetAlertPopup from "./sweetAlertPopup";

const FormRegister = ({ positionCategories }: { positionCategories: PositionCategory[] }) => {
  const [imageProfile, setImageProfile] = useState(null);
  const [previewImage, setPreviewImage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | boolean>(false);
  const [status, setStatus] = useState<number | boolean>(false);
  const dispatch = useDispatch<appDispatch>();
  const selector = useAppSelector((state) => state.registerReducer);
  const { push } = useRouter();

  const handleInput = (name: string, value: any) => {
    dispatch(signUp({ type: `SET_${name}`, value: value }));
  };

  const handleImageInput = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      setImageProfile(file);

      const render = new FileReader();

      render.onloadend = () => {
        setPreviewImage(render.result as string);
      };

      render.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const resetStateAction = () => {
    setStatus(false)
    setError(false)
  }

  const handleRegister = async (event: SyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);

    if (selector.password !== selector.confirmPassword) {
      setIsLoading(false);
      return;
    }

    const data = {
      ...selector,
      imageProfile: imageProfile,
    };

    const response = await register(data);
    setStatus(response.status)
    setIsLoading(false);
    console.log(response)

    if (response.status === 200) {
      push("/login?message=Pendaftaran berhasil");
    } else if (response.status == 422) {
      const errorsData = response.data.errors;
      const keys = Object.keys(errorsData);
      const firstKey = keys[0];
      const message = errorsData[firstKey][0];

      setError(message);
    } else {
      setError("Terjadi kesalahan dengan sistem!");
    }
  };

  return (
    <>
      <form
        onSubmit={handleRegister}
        className="w-full"
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-4 mb-4">
          <div className="">
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nama Lengkap</Label>
            <Input type="text" disabled={isLoading} value={selector.name} onChange={(e) => handleInput("NAME", e.target.value)} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Nama Lengkap" required />
          </div>
          <div className="">
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</Label>
            <Input type="email" disabled={isLoading} value={selector.email}
              onChange={(e) => handleInput("EMAIL", e.target.value)} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Email" required />
          </div>
          <div className="">
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">No Telepon</Label>
            <Input type="number" disabled={isLoading} min={0}
              value={selector.phone}
              onChange={(e) => handleInput("PHONE", e.target.value)} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="No Telepon" required />
          </div>
          <div className="">
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Alamat</Label>
            <Input type="text" disabled={isLoading} min={0}
              value={selector.address}
              onChange={(e) => handleInput("ADDRESS", e.target.value)} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Alamat" required />
          </div>
          <div className="">
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Jenis Kelamin</Label>
            <Select value={selector.gender}
              onValueChange={(e) => handleInput("GENDER", e)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Jenis Kelamin" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                <SelectItem value="pilih" disabled>Pilih Jenis Kelamin</SelectItem>                  

                  <SelectItem value="L">Laki-Laki</SelectItem>
                  <SelectItem value="P">Perempuan</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="">
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Agama</Label>
            <Input type="text" disabled={isLoading} min={0}
              value={selector.religion}
              onChange={(e) => handleInput("RELIGION", e.target.value)} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Agama" required />
          </div>
          <div className="">
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Jabatan/Posisi</Label>
            <Select value={selector.role}
              onValueChange={(e) => handleInput("ROLE", e)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Jabatan" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="pilih" disabled>Pilih Jabatan</SelectItem>
                  <SelectItem value="pns">PNS</SelectItem>
                  <SelectItem value="p3k">P3K</SelectItem>
                  <SelectItem value="cpns">CPNS</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="">
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Golongan</Label>
            <Select value={selector.group_id}
              onValueChange={(e) => handleInput("POSITION_CATEGORY", e)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Golongan" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="pilih" disabled>Pilih Golongan</SelectItem>
                  {positionCategories.map((data) => (
                    <SelectItem key={data.id} value={data.id.toString()}>{data.name}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="">
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</Label>
            <Input  type="password" disabled={isLoading}
             value={selector.password}
             onChange={(e) => handleInput("PASSWORD", e.target.value)} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Password" required />
          </div>
          <div className="">
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Konfirmasi Password</Label>
            <Input  type="password" disabled={isLoading}
             value={selector.confirmPassword}
             onChange={(e) => handleInput("CONFIRM_PASSWORD", e.target.value)} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Konfirmasi Password" required />
             {selector.password != selector.confirmPassword ? (
              <p className="text-xs text-red-500">Password tidak sama</p>
            ) : (
              ""
            )}
          </div>


         
          <div className="mb-3">
            <label htmlFor="image" className="label text-black text-xs">
              Gambar Profile
            </label>

            {previewImage ? (
              <img src={previewImage} className="w-14 h-14 mb-1 object-cover" />
            ) : (
              <div className="w-14 h-14 bg-indigo-500 opacity-70 mb-1"></div>
            )}
            <div className="flex items-start justify-start w-full h-8">
              <Input
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleImageInput}
                id="image"
                className="text-sm"
              />
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-end">
          <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" disabled={isLoading}>
            {isLoading ? <Loader /> : 'Daftar'}
          </button>

        </div>
        {error && <SweetAlertPopup message={error.toString()} status={status} resetState={resetStateAction} />}
      </form>


    </>
  );
};

export default FormRegister;
