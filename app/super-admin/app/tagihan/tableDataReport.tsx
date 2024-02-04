"use client";

import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/store";
import { Member, MemberState, TotalColumn } from "@/types/interface";
import React, { useEffect, useState } from "react";

const TableDataReport = ({ members }: { members: MemberState[] }) => {
  const [modal, setModal] = useState(false);
  const [colSimpananPokok, setColSimpananPokok] = useState<Member[]>();
  const [colSimpananWajib, setColSimpananWajib] = useState<Member[]>();
  const [colSimpananWajibKhusus, setColSimpananWajibKhusus] =
    useState<Member[]>();
  const [colSimpananSukarela, setcolSimpananSukarela] = useState<Member[]>();
  const [colTabunganRekreasi, setColTabunganRekreasi] = useState<Member[]>();
  const [totalCol, setTotalCol] = useState<TotalColumn>();

  const selector = useAppSelector((state) => state.invoiceReducer);

  const handleModal = () => {
    setModal(!modal);

    // simpanan pokok
    const listSimpananPokok: Member[] = JSON.parse(selector.listSimpananPokok);

    setColSimpananPokok(listSimpananPokok);

    // simpanan wajib
    const listSimpananWajib: Member[] = JSON.parse(selector.listSimpananWajib);
    setColSimpananWajib(listSimpananWajib);

    // simpanan wajib khusus
    const listSimpananWajibKhusus: Member[] = JSON.parse(
      selector.listSimpananWajibKhusus
    );
    setColSimpananWajibKhusus(listSimpananWajibKhusus);

    // simpanan sukarela
    const listSimpananSukarela: Member[] = JSON.parse(
      selector.listSimpananSukarela
    );
    setcolSimpananSukarela(listSimpananSukarela);

    // tabungan rekreasi
    const listTabunganRekreasi: Member[] = JSON.parse(
      selector.listTabunganRekreasi
    );
    setColTabunganRekreasi(listTabunganRekreasi);

    // total column
    let dataTotalColumn = {
      totalPokok: 0,
      totalWajib: 0,
      totalWajibKhusus: 0,
      totalSukarela: 0,
      totalTabunganRekreasi: 0,
    };
    listSimpananPokok.map((item) => {
      dataTotalColumn = {
        ...dataTotalColumn,
        totalPokok: (dataTotalColumn.totalPokok += Number(item.amount)),
      };
    });
    listSimpananWajib.map((item) => {
      dataTotalColumn = {
        ...dataTotalColumn,
        totalWajib: (dataTotalColumn.totalWajib += Number(item.amount)),
      };
    });
    listSimpananWajibKhusus.map((item) => {
      dataTotalColumn = {
        ...dataTotalColumn,
        totalWajibKhusus: (dataTotalColumn.totalWajibKhusus += Number(
          item.amount
        )),
      };
    });
    listSimpananSukarela.map((item) => {
      dataTotalColumn = {
        ...dataTotalColumn,
        totalSukarela: (dataTotalColumn.totalSukarela += Number(item.amount)),
      };
    });
    listTabunganRekreasi.map((item) => {
      dataTotalColumn = {
        ...dataTotalColumn,
        totalTabunganRekreasi: (dataTotalColumn.totalTabunganRekreasi += Number(
          item.amount
        )),
      };
    });

    setTotalCol(dataTotalColumn);
  };

  const handleValueSimpananPokok = (id: number) => {
    const data = colSimpananPokok?.find((member: Member) => member.id == id);

    if (data) return data.amount;

    return 0;
  };

  const handleValueSimpananWajib = (id: number) => {
    const data = colSimpananWajib?.find((member: Member) => member.id == id);

    if (data) return data.amount;

    return 0;
  };

  const handleValueSimpananWajibKhusus = (id: number) => {
    const data = colSimpananWajibKhusus?.find(
      (member: Member) => member.id == id
    );

    if (data) return data.amount;

    return 0;
  };

  const handleValueSimpananSukarela = (id: number) => {
    const data = colSimpananSukarela?.find((member: Member) => member.id == id);

    if (data) return data.amount;

    return 0;
  };

  const handleValueTabunganRekreasi = (id: number) => {
    const data = colTabunganRekreasi?.find((member: Member) => member.id == id);

    if (data) return data.amount;

    return 0;
  };

  const handleValueTotalRow = (id: number) => {
    let total =
      Number(handleValueSimpananPokok(id)) +
      Number(handleValueSimpananWajib(id)) +
      Number(handleValueSimpananWajibKhusus(id)) +
      Number(handleValueSimpananSukarela(id)) +
      Number(handleValueTabunganRekreasi(id));
    return total;
  };

  const handleTotalData = () => {
    let pokok = totalCol?.totalPokok ?? 0;
    let wajib = totalCol?.totalWajib ?? 0;
    let wajibKhusus = totalCol?.totalWajibKhusus ?? 0;
    let sukarela = totalCol?.totalSukarela ?? 0;
    let tabunganRekreasi = totalCol?.totalTabunganRekreasi ?? 0;
    return (
      Number(pokok) +
      Number(wajib) +
      Number(wajibKhusus) +
      Number(sukarela) +
      Number(tabunganRekreasi)
    );
  };

  return (
    <>
      <Button
        size={"sm"}
        className="text-white bg-amber-400"
        onClick={handleModal}
      >
        Generate Invoice
      </Button>
      <div
        className={`p-5 fixed inset-0 z-50 w-full min-h-screen bg-black/80 flex items-center justify-center ${modal ? "block" : "hidden"
          }`}
      >
        <div
          className={`w-11/12 bg-white p-5 rounded transition-transform max-h-[90vh] overflow-y-scroll ${modal ? "scale-100" : "scale-0"
            }`}
        >
          <h1 className="text-2xl text-black font-bold mb-7">Data Invoice</h1>
          <div className="w-full mb-2">
            <table className="text-sm w-full border border-solid mb-5">
              <thead>
                <tr className="border border-solid">
                  <th className="text-center p-3 border border-solid">No</th>
                  <th className="p-3 border border-solid">Nama</th>
                  <th className="text-center border border-solid p-3">
                    Simpanan Pokok
                  </th>
                  <th className="text-center border border-solid p-3">
                    Simpanan Wajib
                  </th>
                  <th className="text-center border border-solid p-3">
                    Simpanan Wajib Khusus
                  </th>
                  <th className="text-center border border-solid p-3">
                    Simpanan Sukarela
                  </th>
                  <th className="text-center border border-solid p-3">
                    Tabungan Rekreasi
                  </th>
                  <th className="text-center border border-solid p-3">
                    Jumlah
                  </th>
                </tr>
              </thead>
              <tbody>
                {members.map((item, index) => (
                  <tr key={item.id}>
                    <td className="text-center border border-solid p-3">
                      {index + 1}
                    </td>
                    <td className="border border-solid p-3">{item.name}</td>
                    <td className="text-center border border-solid p-3">
                      {handleValueSimpananPokok(item.id)}
                    </td>
                    <td className="text-center border border-solid p-3">
                      {handleValueSimpananWajib(item.id)}
                    </td>
                    <td className="text-center border border-solid p-3">
                      {handleValueSimpananWajibKhusus(item.id)}
                    </td>
                    <td className="text-center border border-solid p-3">
                      {handleValueSimpananSukarela(item.id)}
                    </td>
                    <td className="text-center border border-solid p-3">
                      {handleValueTabunganRekreasi(item.id)}
                    </td>
                    <td className="text-center border border-solid p-3">
                      {handleValueTotalRow(item.id)}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td
                    className="text-center border border-solid p-3"
                    colSpan={2}
                  >
                    Jumlah
                  </td>
                  <td className="text-center border border-solid p-3">
                    {totalCol?.totalPokok ?? 0}
                  </td>
                  <td className="text-center border border-solid p-3">
                    {totalCol?.totalWajib ?? 0}
                  </td>
                  <td className="text-center border border-solid p-3">
                    {totalCol?.totalWajibKhusus ?? 0}
                  </td>
                  <td className="text-center border border-solid p-3">
                    {totalCol?.totalSukarela ?? 0}
                  </td>
                  <td className="text-center border border-solid p-3">
                    {totalCol?.totalTabunganRekreasi ?? 0}
                  </td>
                  <td className="text-center border border-solid p-3">
                    {handleTotalData()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="px-4 flex items-center justify-end gap-3">
            <Button
              type="button"
              size={"sm"}
              className="text-white"
              onClick={handleModal}
            >
              Batal
            </Button>
            <Button
              type="button"
              size={"sm"}
              className="text-white bg-green-500"
            >
              Download Excel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableDataReport;
