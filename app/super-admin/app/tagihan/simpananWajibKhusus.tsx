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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { appDispatch, useAppSelector } from "@/redux/store";
import { setInvoice } from "@/redux/features/invoice-slice";
import { resetState } from "../../../../redux/features/invoice-slice";

const TabSimpananWajibKhusus = ({
  data,
  positionCategories,
}: {
  data: MemberState[];
  positionCategories: PositionCategory[];
}) => {
  const dispatch = useDispatch<appDispatch>();
  const selector = useAppSelector((state) => state.invoiceReducer);
  const [selectedMember, setSelectedMember] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [members, setMembers] = useState<MemberState[]>(data);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = members.slice(firstItemIndex, lastItemIndex);


  const updateInputData = (amount: number, id: number, ) => {
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


  // const handleInputAmount = (event: any) => {
  //   const id = event.target.getAttribute("data-id");
  //   const amount = event.target.value;

  //   updateInputData(id, amount);
  // };

  const handleValueAmount = (id: number): number => {
    const isInputed = selectedMember.find((item: any) => item.id == id);

    if (isInputed) return isInputed.amount;

    const isData = JSON.parse(selector.listSimpananWajibKhusus).find((item: Member) => item.id == id)

    if (isData) return isData.amount

    return 0;
  };

  const handleAddMember = (id: number) => {
    const payment = selectedMember.find((item: any) => item.id == id) ?? {
      id: id,
      amount: 0,
    };

    const arrayData = JSON.parse(selector.listSimpananWajibKhusus);

    arrayData.push(payment);

    dispatch(
      setInvoice({
        type: "SET_SIMPANAN_WAJIB_KHUSUS",
        value: JSON.stringify(arrayData),
      })
    );
  };

  const handleDeleteMember = (id: number) => {
    const arrayData = JSON.parse(selector.listSimpananWajibKhusus);
    let newMembers = arrayData.filter((item: any) => item.id != id);
    setSelectedMember(newMembers);
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

    if (!isInputed) {
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

  const handleChangeCategory = (amount: string, id: number) => {
    const listPayments = selectedMember;

    const isPaymentIndex = listPayments.findIndex((item: any) => item.id == id);
    if (isPaymentIndex >= 0) {
      listPayments[isPaymentIndex] = { id, amount };
      setSelectedMember(listPayments);
    } else {
      const newMembers = [...listPayments, { id, amount }];
      setSelectedMember(newMembers);
    }
  };

  const filterMembersByPosition = (value: string) => {
    const newMembers = data.filter((member) => member.position == value);

    setMembers(newMembers);
  };

  const handleAddAllmember = () => {
    let selectMember = selectedMember;
    members.map((item) => {
      if (
        selectMember.find((member: any) => member.id == item.id) == undefined
      ) {
        selectMember.push({ id: item.id, amount: 0 });
      }
    });

    setSelectedMember(selectMember);
    dispatch(
      setInvoice({
        type: "SET_SIMPANAN_WAJIB_KHUSUS",
        value: JSON.stringify(selectMember),
      })
    );
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-1/2">
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
            <th className="text-start p-3">Jumlah</th>
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
                  value={handleValueAmount(item.id)}
                  onChange={(event) =>
                    updateInputData(Number(event.target.value), item.id)
                  }
                >
                  <option value="0" disabled>
                    Kategori
                  </option>
                  {positionCategories.map((category) => (
                    <option key={category.id} value={category.wajib_khusus}>
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
                  disabled
                  value={handleValueAmount(item.id)}
                />
              </td>
              <td className="text-center p-3">{handleButtonAdd(item.id)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end">
        <Button className="text-white bg-black" onClick={handleAddAllmember}>
          Tambah Semua ({members.length})
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

function PaginationSection({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}: {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: any;
}) {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }

  const handleNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <>
      {totalItems > itemsPerPage ? (
        <Pagination>
          <PaginationContent>
            <PaginationItem className="cursor-pointer">
              <PaginationPrevious onClick={handlePrevPage} />
            </PaginationItem>
            {pages.map((page, index) => (
              <PaginationItem
                key={index}
                className={`cursor-pointer ${
                  currentPage === page ? "bg-neutral-200 rounded" : ""
                }`}
              >
                <PaginationLink onClick={() => setCurrentPage(page)}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem className="cursor-pointer">
              <PaginationNext onClick={handleNextPage} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ) : null}
    </>
  );
}
