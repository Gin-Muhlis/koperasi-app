"use client";

import { PositionCategory, TypeTabPrincipalSaving } from "@/types/interface";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectValue,
} from "@/components/ui/select";
import { SelectItem, SelectTrigger } from "@radix-ui/react-select";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { appDispatch, useAppSelector } from "@/redux/store";
import { setInvoice } from "@/redux/features/invoice-slice";

const TabSimpananPokok = ({
  data,
  positionCategories,
}: {
  data: TypeTabPrincipalSaving[];
  positionCategories: PositionCategory[];
}) => {
  const dispatch = useDispatch<appDispatch>();
  const selector = useAppSelector((state) => state.invoiceReducer);
  const [selectedMember, setSelectedMember] = useState<any>([]);
  let inputState: any = [];

  const updateInputData = (inputData: any, id: number, amount: number) => {
    const existingItemIndex = inputData.findIndex(
      (item: any) => item.id === id
    );

    if (existingItemIndex >= 0) {
      // Update the existing item
      const updatedItems = [...inputData];
      updatedItems[existingItemIndex] = { id, amount };
      return updatedItems;
    } else {
      // Add a new item
      return [...inputData, { id, amount }];
    }
  };

  const handleInputAmount = (event: any) => {
    const id = event.target.getAttribute("data-id");
    const amount = event.target.value;

    const updatedInputData = updateInputData(selectedMember, id, amount);

    inputState = updatedInputData;
  };

  const handleAddMember = (id: number) => {
    setSelectedMember(inputState);
    const payment = inputState.find((item: any) => item.id == id);
    const arrayData = inputState;

    arrayData.push(payment);

    dispatch(
      setInvoice({
        type: "SET_SIMPANAN_POKOK",
        value: JSON.stringify(arrayData),
      })
    );
  };

  console.log(selectedMember);

  const columns: ColumnDef<TypeTabPrincipalSaving>[] = [
    {
      accessorKey: "member_name",
      header: "Nama",
    },
    {
      accessorKey: "member_position",
      header: "jabatan",
    },
    {
      id: "category",
      header: "Kategori",
      cell: ({ row }) => {
        return (
          <select data-id={row.original.id}>
            {positionCategories.map((item) => (
              <option value={item.position} key={item.id}>
                {item.position}
              </option>
            ))}
          </select>
        );
      },
    },
    {
      id: "amount",
      header: "Jumlah",
      cell: ({ row }) => {
        let isInputed = selectedMember.find(
          (item: any) => item.id == row.original.id
        );
        return (
          <>
            <Input
              type="number"
              min={0}
              onChange={handleInputAmount}
              data-id={row.original.id}
              value={isInputed ? isInputed.amount : 0}
            />
          </>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-center">Aksi</div>,
      cell: ({ row }) => {
        let paymentData = JSON.parse(selector.listSimpananPokok).find(
          (item: any) => item.id == row.original.id
        );
        return (
          <div className="flex items-center justify-center gap-1">
            {paymentData ? (
              <Button className="bg-red-400 text-white">Batal</Button>
            ) : (
              <Button
                className="bg-amber-400 text-white"
                onClick={() => handleAddMember(row.original.id)}
              >
                Tambah
              </Button>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <div className="w-full">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default TabSimpananPokok;
