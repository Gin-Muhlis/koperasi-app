"use client";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";
import TableDataReport from "./tableDataReport";
import { MemberState } from "@/types/interface";

const DetailPayment = ({ members }: { members: MemberState[] }) => {
  const [totalPokok, setTotalPokok] = useState<number>(0);
  const [totalWajib, setTotalWajib] = useState<number>(0);
  const [totalWajibKhusus, setTotalWajibKhusus] = useState<number>(0);
  const [totalSukarela, setTotalSukarela] = useState<number>(0);
  const [totalTabunganRekreasi, setTotalTabunganRekreasi] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);

  const selector = useAppSelector((state) => state.invoiceReducer);

  useEffect(() => {
    if (selector) {
      let totalPokok = 0;
      let totalWajib = 0;
      let totalWajibKhusus = 0;
      let totalSukarela = 0;
      let totalTabunganRekreasi = 0;

      JSON.parse(selector.listSimpananPokok).map((item: any) => {
        totalPokok += Number(item.amount);
      });
      JSON.parse(selector.listSimpananWajib).map((item: any) => {
        totalWajib += Number(item.amount);
      });
      JSON.parse(selector.listSimpananWajibKhusus).map((item: any) => {
        totalWajibKhusus += Number(item.amount);
      });
      JSON.parse(selector.listSimpananSukarela).map((item: any) => {
        totalSukarela += Number(item.amount);
      });
      JSON.parse(selector.listTabunganRekreasi).map((item: any) => {
        totalTabunganRekreasi += Number(item.amount);
      });
      JSON.parse(selector.listPiutangSp).map((item: any) => {
        totalTabunganRekreasi += Number(item.amount);
      });

      setTotalPokok(totalPokok);
      setTotalWajib(totalWajib);
      setTotalWajibKhusus(totalWajibKhusus);
      setTotalSukarela(totalSukarela);
      setTotalTabunganRekreasi(totalTabunganRekreasi);
      setTotalPayment(
        totalPokok +
          totalWajib +
          totalWajibKhusus +
          totalSukarela +
          totalTabunganRekreasi
      );
    }
  }, [selector]);

  return (
    <>
      <div className="w- full p-4 border border-solid">
        <h2 className="text-lg mb-4 font-bold pb-2 border-b-2 border-b-amber-400">
          Detail Tagihan
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex items center justify-between gap-3 pb-3 border-b border-solid">
            <span className="text-sm">Simpanan Pokok:</span>
            <span className="text-sm font-bold italic"> Rp. {totalPokok}</span>
          </div>
          <div className="flex items center justify-between gap-3 pb-3 border-b border-solid">
            <span className="text-sm">Simpanan Wajib:</span>
            <span className="text-sm font-bold italic"> Rp. {totalWajib}</span>
          </div>
          <div className="flex items center justify-between gap-3 pb-3 border-b border-solid">
            <span className="text-sm">Simpanan Wajib Khusus:</span>
            <span className="text-sm font-bold italic">
              Rp. {totalWajibKhusus}
            </span>
          </div>
          <div className="flex items center justify-between gap-3 pb-3 border-b border-solid">
            <span className="text-sm">Simpanan Sukarela:</span>
            <span className="text-sm font-bold italic">
              Rp. {totalSukarela}
            </span>
          </div>
          <div className="flex items center justify-between gap-3 pb-3 border-b border-solid mb-4">
            <span className="text-sm">Tabungan Rekreasi:</span>
            <span className="text-sm font-bold italic">
              Rp. {totalTabunganRekreasi}
            </span>
          </div>
          <div className="flex items center justify-between gap-3 pb-3 border-b border-solid">
            <span className="text-sm">Total Pembayaran:</span>
            <span className="text-sm font-bold italic">Rp. {totalPayment}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <TableDataReport members={members} />
      </div>
    </>
  );
};

export default DetailPayment;
