import { Button } from "@/components/ui/button";
import React from "react";

const DetailPayment = () => {
  return (
    <>
      <div className="w- full p-4 border border-solid">
        <h2 className="text-lg mb-4 font-bold pb-2 border-b-2 border-b-amber-400">
          Detail
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex items center justify-between gap-3">
            <span className="text-sm">Simpanan Pokok:</span>
            <span className="text-sm font-bold italic"> Rp. 100000</span>
          </div>
          <div className="flex items center justify-between gap-3">
            <span className="text-sm">Simpanan Wajib:</span>
            <span className="text-sm italic"> Rp. 100000</span>
          </div>
          <div className="flex items center justify-between gap-3">
            <span className="text-sm">Simpanan Wajib Khusus:</span>
            <span className="text-sm italic"> Rp. 100000</span>
          </div>
          <div className="flex items center justify-between gap-3">
            <span className="text-sm">Simpanan Sukarela:</span>
            <span className="text-sm italic"> Rp. 100000</span>
          </div>
          <div className="flex items center justify-between gap-3">
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
