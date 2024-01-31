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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
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
  

  const updateInputData = (id: number, amount: number) => {
    const existingItemIndex = selectedMember.findIndex(
      (item: any) => item.id === id
    );

    if (existingItemIndex >= 0) {
      // Update the existing item
      const updatedItems = [...selectedMember];
      updatedItems[existingItemIndex] = { id, amount };
      setSelectedMember(updatedItems);
    } else {
      // Add a new item
      setSelectedMember([...selectedMember, { id, amount }]);
    }
  };

  const handleInputAmount = (event: any) => {
    const id = event.target.getAttribute("data-id");
    const amount = event.target.value;

    updateInputData(id, amount);
  };

  const handleAddMember = (id: number) => {
    const payment = selectedMember.find((item: any) => item.id == id);
    const arrayData = selectedMember;

    arrayData.push(payment);

    dispatch(
      setInvoice({
        type: "SET_SIMPANAN_POKOK",
        value: JSON.stringify(arrayData),
      })
    );
  };


  return (
    <div className="w-full flex flex-col gap-5">
      <table className="border border-solid">
        <thead className="border border-solid">
          <tr>
            <th className="text-start p-3">Nama</th>
            <th className="text-start p-3">Jabatan</th>
            <th className="text-start p-3">Kategori</th>
            <th className="text-start p-3">Jumlah</th>
            <th className="text-center p-3">Aksi</th>
          </tr>
        </thead>
        <tbody className="border border-solid">
        {data.map((item) => (<tr key={item.id}>
            <td className="p-3">{item.member_name}</td> 
            <td className="p-3">{item.member_position}</td>
            <td className="text-center p-3">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="pilih kategori" />
              </SelectTrigger>
              <SelectGroup>
                <SelectContent>
                  <SelectItem value="pns">PNS</SelectItem>
                  <SelectItem value="p3k">P3K</SelectItem>
                  <SelectItem value="cpns">CPNS</SelectItem>
                </SelectContent>
              </SelectGroup>
            </Select>
            </td>
            <td className="p-3">
              <Input type="number" placeholder="Jumlah pembayaran" />
            </td>
            <td className="text-center p-3">
              <Button className="text-white bg-amber-400">Tambah</Button>
            </td>
          </tr>))}
        </tbody>
      </table>
      <div className="w-full flex flex-end">
      <Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>

      </div>
    </div>
  );
};

export default TabSimpananPokok;
