"use client";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";

const DetailPayment = () => {
  const [totalPokok, setTotalPokok] = useState<number>(0);
  const [totalWajib, setTotalWajib] = useState<number>(0);
  const [totalWajibKhusus, setTotalWajibKhusus] = useState<number>(0);
  const selector = useAppSelector((state) => state.invoiceReducer);

  useEffect(() => {
    if (selector) {
      let totalPokok = 0;
      let totalWajib = 0;
      let totalWajibKhusus = 0;

      JSON.parse(selector.listSimpananPokok).map((item: any) => {
        totalPokok += Number(item.amount);
      });
      JSON.parse(selector.listSimpananWajib).map((item: any) => {
        totalWajib += Number(item.amount);
      });
      JSON.parse(selector.listSimpananWajibKhusus).map((item: any) => {
        totalWajibKhusus += Number(item.amount);
      });

      setTotalPokok(totalPokok);
      setTotalWajib(totalWajib);
      setTotalWajibKhusus(totalWajibKhusus);
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
            <span className="text-sm font-bold italic"> Rp. {totalWajibKhusus}</span>
          </div>
          <div className="flex items center justify-between gap-3 pb-3 border-b border-solid">
            <span className="text-sm">Simpanan Sukarela:</span>
            <span className="text-sm italic"> Rp. 100000</span>
          </div>
          <div className="flex items center justify-between gap-3 pb-3 border-b border-solid">
            <span className="text-sm">Piutang:</span>
            <span className="text-sm italic"> Rp. 100000</span>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button>Cetak Data</Button>
      </div>
    </>
  );
};

export default DetailPayment;
