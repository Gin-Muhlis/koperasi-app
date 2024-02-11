"use client";
import { useAppSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";
import TableDataReport from "./tableDataReport";
import { Member, MemberState } from "@/types/interface";
import { handleFormat } from "@/app/utils/helper";

const DetailPayment = ({ members }: { members: MemberState[] }) => {
  const [totalPokok, setTotalPokok] = useState<number>(0);
  const [totalWajib, setTotalWajib] = useState<number>(0);
  const [totalWajibKhusus, setTotalWajibKhusus] = useState<number>(0);
  const [totalSukarela, setTotalSukarela] = useState<number>(0);
  const [totalTabunganRekreasi, setTotalTabunganRekreasi] = useState<number>(0);
  const [totalPiutangSp, setTotalPiutangSp] = useState<number>(0);
  const [totalPiutangDagang, setTotalPiutangDagang] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);

  const selector = useAppSelector((state) => state.invoiceReducer);

  useEffect(() => {
    if (selector) {
      let totalPokok = 0;
      let totalWajib = 0;
      let totalWajibKhusus = 0;
      let totalSukarela = 0;
      let totalTabunganRekreasi = 0;
      let totalPiutangSp = 0;
      let totalPiutangDagang = 0;

      JSON.parse(selector.listSimpananPokok).map((item: Member) => {
        if (item.status == "confirmed") {
          totalPokok += Number(item.amount);
        }
      });
      JSON.parse(selector.listSimpananWajib).map((item: Member) => {
        if (item.status == "confirmed") {
          totalWajib += Number(item.amount);
        }
      });
      JSON.parse(selector.listSimpananWajibKhusus).map((item: Member) => {
        if (item.status == "confirmed") {
          totalWajibKhusus += Number(item.amount);
        }
      });
      JSON.parse(selector.listSimpananSukarela).map((item: Member) => {
        if (item.status == "confirmed") {
          totalSukarela += Number(item.amount);
        }
      });
      JSON.parse(selector.listTabunganRekreasi).map((item: Member) => {
        if (item.status == "confirmed") {
          totalTabunganRekreasi += Number(item.amount);
        }
      });
      JSON.parse(selector.listPiutangSp).map((item: Member) => {
        if (item.status == "confirmed") {
          totalPiutangSp += Number(item.amount);
        }
      });
      JSON.parse(selector.listPiutangDagang).map((item: Member) => {
        if (item.status == "confirmed") {
          totalPiutangDagang += Number(item.amount);
        }
      });

      setTotalPokok(totalPokok);
      setTotalWajib(totalWajib);
      setTotalWajibKhusus(totalWajibKhusus);
      setTotalSukarela(totalSukarela);
      setTotalTabunganRekreasi(totalTabunganRekreasi);
      setTotalPiutangSp(totalPiutangSp);
      setTotalPiutangDagang(totalPiutangDagang);
      setTotalPayment(
        totalPokok +
        totalWajib +
        totalWajibKhusus +
        totalSukarela +
        totalTabunganRekreasi +
        totalPiutangSp +
        totalPiutangDagang
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
            <span className="text-sm font-bold italic"> Rp. {handleFormat(totalPokok)}</span>
          </div>
          <div className="flex items center justify-between gap-3 pb-3 border-b border-solid">
            <span className="text-sm">Simpanan Wajib:</span>
            <span className="text-sm font-bold italic"> Rp. {handleFormat(totalWajib)}</span>
          </div>
          <div className="flex items center justify-between gap-3 pb-3 border-b border-solid">
            <span className="text-sm">Simpanan Wajib Khusus:</span>
            <span className="text-sm font-bold italic">
              Rp. {handleFormat(totalWajibKhusus)}
            </span>
          </div>
          <div className="flex items center justify-between gap-3 pb-3 border-b border-solid">
            <span className="text-sm">Simpanan Sukarela:</span>
            <span className="text-sm font-bold italic">
              Rp. {handleFormat(totalSukarela)}
            </span>
          </div>
          <div className="flex items center justify-between gap-3 pb-3 border-b border-solid">
            <span className="text-sm">Tabungan Rekreasi:</span>
            <span className="text-sm font-bold italic">
              Rp. {handleFormat(totalTabunganRekreasi)}
            </span>
          </div>
          <div className="flex items center justify-between gap-3 pb-3 border-b border-solid">
            <span className="text-sm">Piutang S/P:</span>
            <span className="text-sm font-bold italic">
              Rp. {handleFormat(totalPiutangSp)}
            </span>
          </div>
          <div className="flex items center justify-between gap-3 pb-3 border-b border-solid mb-4">
            <span className="text-sm">Piutang Dagang:</span>
            <span className="text-sm font-bold italic">
              Rp. {handleFormat(totalPiutangDagang)}
            </span>
          </div>
          <div className="flex items center justify-between gap-3 pb-3 border-b border-solid">
            <span className="text-lg">Total Pembayaran:</span>
            <span className="text-lg font-bold italic">Rp. {handleFormat(totalPayment)}</span>
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
