"use client";

import AlertError from "@/app/components/alertError";
import AlertSuccess from "@/app/components/alertSuccess";
import { createCategory, createProduct } from "@/app/utils/featuresApi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Loader from "@/app/components/loader";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ColumnDef } from "@tanstack/react-table";
import {
  MemberState,
  PaymentDeterminationState,
  SubCategoryState,
} from "@/types/interface";
import { DataTable } from "./data-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const AddPaymentDetermination = ({
  members,
  subCategories,
}: {
  members: MemberState[];
  subCategories: SubCategoryState[];
}) => {
  const { data: session } = useSession();

  const [modal, setModal] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<MemberState[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | boolean>(false);
  const [reset, setReset] = useState<boolean>(false);
  const [error, setError] = useState<string | boolean>(false);
  const router = useRouter();
  const currentyear = new Date().getFullYear();
  const nextYear = currentyear + 1;
  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    10,
    11,
    12,
  ];

  const handleModal = () => {
    setModal(!modal);
  };

  const columns: ColumnDef<MemberState>[] = [
    {
      id: "select",
      header: ({ table }) => {
        return (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value);
              const rows = table.getRowModel().rows;
              const arrayMembers: MemberState[] = [];

              if (value) {
                rows.map((item) => {
                  if (
                    selectedMembers.find(
                      (member: any) => member.id == item.original.id
                    )
                  )
                    return;

                  arrayMembers.push(item.original);
                });
                setSelectedMembers(arrayMembers);
              } else {
                const newMembers = selectedMembers.filter(
                  (member: any) =>
                    !rows.some((item) => item.original.id === member.id)
                );

                setSelectedMembers(newMembers);
              }
            }}
            aria-label="Select all"
          />
        );
      },
      cell: ({ row }) => {
        let member = row.original;
        const newMembers: MemberState[] = [];
        return (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value: any) => {
              row.toggleSelected(!!value);
              if (value) {
                newMembers.push(member);

                setSelectedMembers(newMembers);
              } else {
                const newMembers = members.filter(
                  (item: any) => item.id !== member.id
                );

                const stringNewMembers = JSON.stringify(newMembers);
                dispatch(
                  createSaving({
                    type: "SET_MEMBERS",
                    value: stringNewMembers,
                  })
                );
              }
            }}
            aria-label="Select row"
          />
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Member",
    },
    {
      accessorKey: "position",
      header: "Jabatan",
    },
  ];

  //   const response = await createProduct(formData, session?.user.accessToken);
  //   console.log(response);
  //   setIsLoading(false);

  //   if (response.status === 200) {
  //     setModal(!modal);
  //     form.reset();
  //     router.refresh();
  //     setSuccess(response.data.message);
  //   } else if (response.status === 422) {
  //     const errorsData = response.data.errors;
  //     const keys = Object.keys(errorsData);
  //     const firstKey = keys[0];
  //     const message = errorsData[firstKey][0];

  //     setError(message);
  //   } else {
  //     setError(response.data.message);
  //   }
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
          className={`w-11/12 max-w-xl bg-white rounded transition-transform max-h-[90vh] overflow-y-scroll ${
            modal ? "scale-100" : "scale-0"
          }`}
        >
          <div className="p-4 border-b border-b-slate-300 mb-4">
            <h3 className="font-bold text-lg text-black">
              Tambah Data Ketentuan Pembayaran
            </h3>
          </div>
          <div className="w-full p-4">
            <div className="mb-5">
              <Label>Member</Label>
              <DataTable columns={columns} data={members} isReset={reset} />
            </div>
            <div className="mb-5">
              <Label>Sub Kategori</Label>
              <Select disabled={isLoading}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Silahkan pilih sub kategori" />
                </SelectTrigger>
                <SelectGroup>
                  <SelectContent>
                    {subCategories.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectGroup>
              </Select>
            </div>
            <div className="mb-5">
              <Label>Jumlah</Label>
              <Input type="number" />
            </div>
            <div className="w-full grid grid-cols-2 gap-2 mb-5">
              <div className="border border-solid">
                <Label className="mb-2">Waktu Simpanan (Bulan)</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Bulan" />
                  </SelectTrigger>
                  <SelectGroup>
                    <SelectContent>
                      {months.map((item, index) => (
                        <SelectItem key={index} value={item.toString()}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectGroup>
                </Select>
              </div>
              <div>
                <Label className="mb-2">Waktu Simpanan (Tahun)</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Tahun" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={currentyear.toString()}>
                      {currentyear}
                    </SelectItem>
                    <SelectItem value={nextYear.toString()}>
                      {nextYear}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end">
              <Button size="sm" className="bg-amber-500 text-white">
                Simpan Data
              </Button>
            </div>
          </div>
        </div>
      </div>
      {success && <AlertSuccess message={success.toString()} isShow={true} />}
      {error && <AlertError message={error.toString()} isShow={true} />}
    </>
  );
};

export default AddPaymentDetermination;
