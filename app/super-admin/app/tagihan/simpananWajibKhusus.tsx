"use client";

import {
  Member,
  MemberState,
  PositionCategory,
  TypeTab,
} from "@/types/interface";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { appDispatch, useAppSelector } from "@/redux/store";
import PaginationSection from "@/app/components/paginationSection";
import { setInvoice } from "@/redux/features/invoice-slice";

const TabSimpananWajibKhusus = ({
  data,
  positionCategories,
}: {
  data: MemberState[];
  positionCategories: PositionCategory[];
}) => {
  const dispatch = useDispatch<appDispatch>();
  const selector = useAppSelector((state) => state.invoiceReducer);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [members, setMembers] = useState<MemberState[]>(data);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = members.slice(firstItemIndex, lastItemIndex);

  const currentYear = new Date().getFullYear();

  const updateInputData = (categoryId: number, id: number) => {
    const listSimpananWajibKhusus = JSON.parse(selector.listSimpananWajibKhusus);
    const existingItemIndex = listSimpananWajibKhusus.findIndex(
      (item: any) => item.id === id
    );

    const amount = positionCategories.find((data) => data.id == categoryId)?.wajib_khusus;

    if (existingItemIndex >= 0) {
      const updatedItems = [...listSimpananWajibKhusus];
      const data = updatedItems[existingItemIndex];
      updatedItems[existingItemIndex] = {
        ...data, amount
      };
      dispatch(
        setInvoice({
          type: "SET_SIMPANAN_WAJIB_KHUSUS",
          value: JSON.stringify(updatedItems),
        })
      );
    } else {
      const newMembers = [
        ...listSimpananWajibKhusus,
        { id, amount, status: "not_confirmed", categoryId },
      ];
      dispatch(
        setInvoice({
          type: "SET_SIMPANAN_WAJIB_KHUSUS",
          value: JSON.stringify(newMembers),
        })
      );
    }
  };

  const handleValueAmount = (id: number) => {
    const isData = JSON.parse(selector.listSimpananWajibKhusus).find(
      (item: Member) => item.id == id
    );
    if (isData) {
      return isData.amount;
    }

    return "";
  };

  const handleValueCategory = (id: number) => {
    const isData = JSON.parse(selector.listSimpananWajibKhusus).find(
      (item: Member) => item.id == id
    );
    if (isData) {
      return isData.categoryId;
    }

    return "";
  };

  const handleAddMember = (id: number) => {
    const listSimpananWajibKhusus = JSON.parse(selector.listSimpananWajibKhusus);
    const existingItemIndex = listSimpananWajibKhusus.findIndex(
      (item: Member) => item.id == id
    );

    if (existingItemIndex >= 0) {
      const updatedItems = [...listSimpananWajibKhusus];
      const data = updatedItems[existingItemIndex];
      updatedItems[existingItemIndex] = { ...data, status: "confirmed" };
      dispatch(
        setInvoice({
          type: "SET_SIMPANAN_WAJIB_KHUSUS",
          value: JSON.stringify(updatedItems),
        })
      );
    } else {
      const newMembers = [
        ...listSimpananWajibKhusus,
        { id, amount: 0, status: "confirmed", categoryId: "" },
      ];
      dispatch(
        setInvoice({
          type: "SET_SIMPANAN_WAJIB_KHUSUS",
          value: JSON.stringify(newMembers),
        })
      );
    }
  };

  const handleDeleteMember = (id: number) => {
    const listSimpananWajibKhusus = JSON.parse(selector.listSimpananWajibKhusus);
    let newMembers = listSimpananWajibKhusus.filter((item: any) => item.id != id);
    dispatch(
      setInvoice({
        type: "SET_SIMPANAN_WAJIB_KHUSUS",
        value: JSON.stringify(newMembers),
      })
    );
  };

  const handleButtonAdd = (id: number) => {
    const isInputed = JSON.parse(selector.listSimpananWajibKhusus).find(
      (item: any) => item.id == id
    );

    if (!isInputed || isInputed.status == "not_confirmed") {
      return (
        <Button
          className="text-white bg-amber-400"
          onClick={() => handleAddMember(id)}
        >
          Tambah
        </Button>
      );
    } else {
      return (
        <Button
          className="text-white bg-red-400"
          onClick={() => handleDeleteMember(id)}
        >
          batal
        </Button>
      );
    }
  };

  const filterMembersByPosition = (value: string) => {
    const newMembers = data.filter((member) => member.position == value);

    setMembers(newMembers);
  };

  const handleAddAllmember = () => {
    const listSimpananWajibKhusus = JSON.parse(selector.listSimpananWajibKhusus);
    const updatedList = listSimpananWajibKhusus.map((item: Member) => {
      if (item.status == "not_confirmed") {
        return {
          ...item,
          status: "confirmed",
        };
      } else {
        return item;
      }
    });

    dispatch(
      setInvoice({
        type: "SET_SIMPANAN_WAJIB_KHUSUS",
        value: JSON.stringify(updatedList),
      })
    );
  };

  const handleLengthDataNotConfirmed = () => {
    const listSimpananWajibKhusus = JSON.parse(selector.listSimpananWajibKhusus);

    return listSimpananWajibKhusus.filter(
      (item: Member) => item.status == "not_confirmed"
    ).length;
  };

  const handleDisable = (id: number) => {
    const listSimpananWajibKhusus = JSON.parse(selector.listSimpananWajibKhusus);

    const isInputed = listSimpananWajibKhusus.find((item: Member) => item.id == id);
    if (isInputed && isInputed.status == "confirmed") {
      return true;
    }
    return false;
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-1/2">
        <h1 className="text-black text-lg font-bold mb-3">Simpanan Wajib Khusus</h1>
        <Select onValueChange={filterMembersByPosition}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih Jabatan" />
          </SelectTrigger>
          <SelectGroup>
            <SelectContent>
              <SelectItem value="pns">PNS</SelectItem>
              <SelectItem value="p3k">P3K</SelectItem>
              <SelectItem value="cpns">CPNS</SelectItem>
            </SelectContent>
          </SelectGroup>
        </Select>
      </div>
      <table className="border border-solid text-sm">
        <thead className="border border-solid">
          <tr>
            <th className="text-start p-3">Nama</th>
            <th className="text-start p-3">Jabatan</th>
            <th className="text-center p-3">Kategori</th>
            <th className="text-start p-3">Pembayaran</th>
            <th className="text-center p-3">Aksi</th>
          </tr>
        </thead>
        <tbody className="border border-solid">
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td className="p-3">{item.name}</td>
              <td className="p-3">{item.position}</td>
              <td className="text-center p-3">
                <select
                  onChange={(event) =>
                    updateInputData(Number(event.target.value), item.id)
                  }
                  disabled={handleDisable(item.id)}
                  className={`bg-transparent ${
                    handleDisable(item.id) ? "opacity-50" : ""
                  }`}
                  value={handleValueCategory(item.id)}
                >
                  <option value="" className="font-sans" disabled>
                    Kategori
                  </option>
                  {positionCategories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                      className="font-sans"
                    >
                      {category.position}
                    </option>
                  ))}
                </select>
              </td>
              <td className="p-3">
                <Input
                  type="number"
                  placeholder="Jumlah pembayaran"
                  data-id={item.id}
                  value={handleValueAmount(item.id)}
                  disabled
                  min={0}
                />
              </td>
              <td className="text-center p-3">{handleButtonAdd(item.id)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end">
        <Button className="text-white bg-black" onClick={handleAddAllmember}>
          Tambah Semua ({handleLengthDataNotConfirmed()})
        </Button>
      </div>
      <div className="w-full flex flex-end">
        <PaginationSection
          totalItems={members.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default TabSimpananWajibKhusus;
