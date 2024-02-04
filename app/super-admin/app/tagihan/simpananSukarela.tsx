"use client";

import { PositionCategory, MemberState, Member } from "@/types/interface";
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
import { setInvoice } from "@/redux/features/invoice-slice";
import PaginationSection from "@/app/components/paginationSection";
const TabSimpananSukarela = ({
  data,
}: {
  data: MemberState[];
}) => {
  const dispatch = useDispatch<appDispatch>();
  const selector = useAppSelector((state) => state.invoiceReducer);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [members, setMembers] = useState<MemberState[]>(data);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = members.slice(firstItemIndex, lastItemIndex);

  const updateInputData = (amount: number, id: number,) => {
    const listSimpananSukarela = JSON.parse(selector.listSimpananSukarela)
    const existingItemIndex = listSimpananSukarela.findIndex(
      (item: Member) => item.id === id
    );

    if (existingItemIndex >= 0) {

      const updatedItems = [...listSimpananSukarela];
      updatedItems[existingItemIndex] = { id, amount, status: 'not_confirmed' };
      dispatch(
        setInvoice({
          type: "SET_SIMPANAN_SUKARELA",
          value: JSON.stringify(updatedItems),
        })
      );
    } else {
      const newMembers = [...listSimpananSukarela, { id, amount, status: 'not_confirmed' }]
      dispatch(
        setInvoice({
          type: "SET_SIMPANAN_SUKARELA",
          value: JSON.stringify(newMembers),
        })
      );
    }
  };
  
  const handleValueAmount = (id: number) => {
    const isData = JSON.parse(selector.listSimpananSukarela).find((item: Member) => item.id == id)
    if (isData) {
      return isData.amount
    }

    return "";
  };


  const handleAddMember = (id: number) => {
    const listSimpananSukarela = JSON.parse(selector.listSimpananSukarela)
    const existingItemIndex = listSimpananSukarela.findIndex((item: Member) => item.id == id)

    if (existingItemIndex >= 0) {
      const dataExisted: Member = listSimpananSukarela[existingItemIndex]
      const updatedItems = [...listSimpananSukarela];
      updatedItems[existingItemIndex] = { id: dataExisted['id'], amount: dataExisted['amount'], status: 'confirmed' };
      dispatch(
        setInvoice({
          type: "SET_SIMPANAN_SUKARELA",
          value: JSON.stringify(updatedItems),
        })
      );
    } else {
      const newMembers = [...listSimpananSukarela, { id, amount: 0, status: 'not_confirmed' }]
      dispatch(
        setInvoice({
          type: "SET_SIMPANAN_SUKARELA",
          value: JSON.stringify(newMembers),
        })
      );
    }
  };

  const handleDeleteMember = (id: number) => {
    const listSimpananSukarela = JSON.parse(selector.listSimpananSukarela);
    let newMembers = listSimpananSukarela.filter((item: any) => item.id != id);
    dispatch(
      setInvoice({
        type: "SET_SIMPANAN_SUKARELA",
        value: JSON.stringify(newMembers),
      })
    );
  };

  const handleButtonAdd = (id: number) => {
    const isInputed = JSON.parse(selector.listSimpananSukarela).find(
      (item: any) => item.id == id
    );

    if (!isInputed || isInputed.status == 'not_confirmed') {
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
    const listSimpananSukarela = JSON.parse(selector.listSimpananSukarela);
    const updatedList = listSimpananSukarela.map((item: Member) => {
      if (item.status == "not_confirmed") {
        return {
          ...item,
          status: "confirmed"
        }
      } else {
        return item
      }
    })

    dispatch(
      setInvoice({
        type: "SET_SIMPANAN_SUKARELA",
        value: JSON.stringify(updatedList),
      })
    );
  };

  const handleLengthDataNotConfirmed = () => {
    const listSimpananSukarela = JSON.parse(selector.listSimpananSukarela);

    return listSimpananSukarela.filter((item: Member) => item.status == "not_confirmed").length
  }

  const handleDisable = (id: number) => {
    const listSimpananSukarela = JSON.parse(selector.listSimpananSukarela);

    const isInputed = listSimpananSukarela.find((item: Member) => item.id == id)
    if (isInputed && isInputed.status == "confirmed") {
      return true
    }
    return false
  }

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-1/2">
        <h1 className="text-black text-lg font-bold mb-3">Simpanan Sukarela</h1>
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
            <th className="text-start p-3">Jumlah</th>
            <th className="text-center p-3">Aksi</th>
          </tr>
        </thead>
        <tbody className="border border-solid">
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td className="p-3">{item.name}</td>
              <td className="p-3">{item.position}</td>
              <td className="p-3">
                <Input
                  type="number"
                  placeholder="Jumlah pembayaran"
                  data-id={item.id}
                  value={handleValueAmount(item.id)}
                  onChange={(event: any) => updateInputData(Number(event.target.value), item.id)}
                  disabled={handleDisable(item.id)}
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

export default TabSimpananSukarela;
