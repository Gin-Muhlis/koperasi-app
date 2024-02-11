"use client";

import AlertError from "@/app/components/alertError";
import AlertSuccess from "@/app/components/alertSuccess";
import Loader from "@/app/components/loader";
import { createInvoice, downloadPaymentReport } from "@/app/utils/featuresApi";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { months } from "@/constants/CONSTS";
import { setInvoice } from "@/redux/features/invoice-slice";
import { appDispatch, useAppSelector } from "@/redux/store";
import { Invoice, Member, MemberState, TotalColumn } from "@/types/interface";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { handleFormat } from "@/app/utils/helper";

const TableDataReport = ({ members }: { members: MemberState[] }) => {
  const [modal, setModal] = useState(false);
  const [success, setSuccess] = useState<string | boolean>(false);
  const [error, setError] = useState<string | boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [listMembers, setListMembers] = useState<MemberState[]>([]);
  const [colSimpananPokok, setColSimpananPokok] = useState<Member[]>();
  const [colSimpananWajib, setColSimpananWajib] = useState<Member[]>();
  const [colSimpananWajibKhusus, setColSimpananWajibKhusus] =
    useState<Member[]>();
  const [colSimpananSukarela, setcolSimpananSukarela] = useState<Member[]>();
  const [colTabunganRekreasi, setColTabunganRekreasi] = useState<Member[]>();
  const [colPiutangSp, setColPiutangSp] = useState<Member[]>();
  const [colPiutangDagang, setColPiutangDagang] = useState<Member[]>();
  const [totalCol, setTotalCol] = useState<TotalColumn>();
  const [dataInvoice, setDataInvoice] = useState<Invoice[]>([]);

  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useDispatch<appDispatch>()
  const selector = useAppSelector((state) => state.invoiceReducer);


  const handleModal = () => {
    setModal(!modal);

    const listId: number[] = [];

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

    // piutang s/p
    const listPiutangSp: Member[] = JSON.parse(
      selector.listPiutangSp
    );
    setColPiutangSp(listPiutangSp);

    // piutang dagang
    const listPiutangDagang: Member[] = JSON.parse(
      selector.listPiutangDagang
    );
    setColPiutangDagang(listPiutangDagang);

    // total column
    let dataTotalColumn = {
      totalPokok: 0,
      totalWajib: 0,
      totalWajibKhusus: 0,
      totalSukarela: 0,
      totalTabunganRekreasi: 0,
      totalPiutangSp: 0,
      totalPiutangDagang: 0,
    };

    listSimpananPokok.map((item) => {
      listId.push(item.id)
      handleDataInvoice(item.id, 'principal_saving', item.amount)
      dataTotalColumn = {
        ...dataTotalColumn,
        totalPokok: (dataTotalColumn.totalPokok += Number(item.amount)),
      };
    });

    listSimpananWajib.map((item) => {
      listId.push(item.id)
      handleDataInvoice(item.id, 'mandatory_saving', item.amount)
      dataTotalColumn = {
        ...dataTotalColumn,
        totalWajib: (dataTotalColumn.totalWajib += Number(item.amount)),
      };
    });

    listSimpananWajibKhusus.map((item) => {
      listId.push(item.id)
      handleDataInvoice(item.id, 'special_mandatory_saving', item.amount)
      dataTotalColumn = {
        ...dataTotalColumn,
        totalWajibKhusus: (dataTotalColumn.totalWajibKhusus += Number(
          item.amount
        )),
      };
    });

    listSimpananSukarela.map((item) => {
      listId.push(item.id)
      handleDataInvoice(item.id, 'voluntary_saving', item.amount)
      dataTotalColumn = {
        ...dataTotalColumn,
        totalSukarela: (dataTotalColumn.totalSukarela += Number(item.amount)),
      };
    });

    listTabunganRekreasi.map((item) => {
      listId.push(item.id)
      handleDataInvoice(item.id, 'recretioan_saving', item.amount)
      dataTotalColumn = {
        ...dataTotalColumn,
        totalTabunganRekreasi: (dataTotalColumn.totalTabunganRekreasi += Number(
          item.amount
        )),
      };
    });

    listPiutangSp.map((item) => {
      listId.push(item.id)
      handleDataInvoice(item.id, 'receivable', item.amount)
      dataTotalColumn = {
        ...dataTotalColumn,
        totalPiutangSp: (dataTotalColumn.totalPiutangSp += Number(
          item.amount
        )),
      };
    });

    listPiutangDagang.map((item) => {
      listId.push(item.id)
      handleDataInvoice(item.id, 'account_receivable', item.amount)
      dataTotalColumn = {
        ...dataTotalColumn,
        totalPiutangDagang: (dataTotalColumn.totalPiutangDagang += Number(
          item.amount
        )),
      };
    });

    setTotalCol(dataTotalColumn);

    const filterIdList = listId.filter((value, index) => listId.indexOf(value) === index);

    const filteredMember = members.filter((member) =>
      filterIdList.includes(member.id)
    );

    setListMembers(filteredMember);
  };

  const handleDataInvoice = (id: number, type: string, amount: number) => {
    const existIndexData = dataInvoice.findIndex((item) => item.memberId === id);
    let updatedListData = [...dataInvoice];
    console.log(existIndexData)
    if (existIndexData < 0) {
      updatedListData.push({
        memberId: id,
        principalSaving: 0,
        mandatorySaving: 0,
        specialMandatorySaving: 0,
        voluntarySaving: 0,
        recretionalSaving: 0,
        receivable: 0,
        accountReceivable: 0
      });
    }

    const newIndexData = updatedListData.findIndex((item) => item.memberId === id);

    switch (type) {
      case 'principal_saving':
        updatedListData[newIndexData] = {
          ...updatedListData[newIndexData],
          principalSaving: amount
        };
        break;
      case 'mandatory_saving':
        updatedListData[newIndexData] = {
          ...updatedListData[newIndexData],
          mandatorySaving: amount
        };
        break;
      case 'special_mandatory_saving':
        updatedListData[newIndexData] = {
          ...updatedListData[newIndexData],
          specialMandatorySaving: amount
        };
        break;
      case 'voluntary_saving':
        updatedListData[newIndexData] = {
          ...updatedListData[newIndexData],
          voluntarySaving: amount
        };
        break;
      case 'recretional_saving':
        updatedListData[newIndexData] = {
          ...updatedListData[newIndexData],
          recretionalSaving: amount
        };
        break;
      case 'receivable':
        updatedListData[newIndexData] = {
          ...updatedListData[newIndexData],
          receivable: amount
        };
        break;
      case 'account_receivable':
        updatedListData[newIndexData] = {
          ...updatedListData[newIndexData],
          accountReceivable: amount
        };
        break;
      default:
        return;
    }
    setDataInvoice(updatedListData);
  };
  console.log(dataInvoice)
  const handleValueSimpananPokok = (id: number) => {
    const data = colSimpananPokok?.find((member: Member) => member.id == id);

    if (data) {
      return data.amount
    }

    return 0;
  };

  const handleValueSimpananWajib = (id: number) => {
    const data = colSimpananWajib?.find((member: Member) => member.id == id);

    if (data) {
      return data.amount
    }


    return 0;
  };

  const handleValueSimpananWajibKhusus = (id: number) => {
    const data = colSimpananWajibKhusus?.find(
      (member: Member) => member.id == id
    );

    if (data) {
      return data.amount
    }


    return 0;
  };

  const handleValueSimpananSukarela = (id: number) => {
    const data = colSimpananSukarela?.find((member: Member) => member.id == id);

    if (data) {
      return data.amount
    }


    return 0;
  };

  const handleValueTabunganRekreasi = (id: number) => {
    const data = colTabunganRekreasi?.find((member: Member) => member.id == id);

    if (data) {
      return data.amount
    }


    return 0;
  };

  const handleValuePiutangSp = (id: number) => {
    const data = colPiutangSp?.find((member: Member) => member.id == id);

    if (data) {
      return data.amount
    }


    return 0;
  };

  const handleValuePiutangDagang = (id: number) => {
    const data = colPiutangDagang?.find((member: Member) => member.id == id);

    if (data) {
      return data.amount
    }


    return 0;
  };

  const handleValueTotalRow = (id: number) => {
    let total =
      Number(handleValueSimpananPokok(id)) +
      Number(handleValueSimpananWajib(id)) +
      Number(handleValueSimpananWajibKhusus(id)) +
      Number(handleValueSimpananSukarela(id)) +
      Number(handleValueTabunganRekreasi(id)) +
      Number(handleValuePiutangSp(id)) +
      Number(handleValuePiutangDagang(id));
    return total;
  };

  const handleTotalData = () => {
    let pokok = totalCol?.totalPokok ?? 0;
    let wajib = totalCol?.totalWajib ?? 0;
    let wajibKhusus = totalCol?.totalWajibKhusus ?? 0;
    let sukarela = totalCol?.totalSukarela ?? 0;
    let tabunganRekreasi = totalCol?.totalTabunganRekreasi ?? 0;
    let piutangSp = totalCol?.totalPiutangSp ?? 0;
    let piutangDagang = totalCol?.totalPiutangDagang ?? 0;
    return (
      Number(pokok) +
      Number(wajib) +
      Number(wajibKhusus) +
      Number(sukarela) +
      Number(tabunganRekreasi) +
      Number(piutangSp) +
      Number(piutangDagang)
    );
  };

  const handleDescription = (event: any) => {
    dispatch(setInvoice({ type: "SET_DESCRIPTION", value: event.target.value }))
  }

  const handleInvoice = async () => {
    setIsLoading(true)

    const monthYear = `${selector.month < 10 ? `0${selector.month}` : selector.month}-${selector.year}`

    const response = await createInvoice(colSimpananPokok, colSimpananWajib, colSimpananWajibKhusus, colSimpananSukarela, colTabunganRekreasi, colPiutangSp, colPiutangDagang, session?.user.accessToken, monthYear, selector.description)
    setIsLoading(false)

    if (response.status == 200) {
      setSuccess(response.data.message)
    } else if (response.status == 422) {
      const errorData = response.data.errors;
      const keys = Object.keys(errorData)
      const firstKey = keys[0]
      const message = errorData[firstKey][0]

      setError(message)
    } else {
      setError(response.data.message)
    }

  }

  const handleDownloadExcel = async () => {
    setIsLoading(true);

    const response = await downloadPaymentReport(
      colSimpananPokok,
      colSimpananWajib,
      colSimpananWajibKhusus,
      colSimpananSukarela,
      colTabunganRekreasi,
      session?.user.accessToken
    );

    if (response.status == 200) {
      const blob = await response.data;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "tagihan_gabungan.xlsx"); // or any other extension
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);

      setIsLoading(false);
      router.refresh();
      setSuccess("Download data berhasil");
    } else if (response.status === 422) {
      setIsLoading(false);
      const errorsData = response.data.errors;
      const keys = Object.keys(errorsData);
      const firstKey = keys[0];
      const message = errorsData[firstKey][0];

      setError(message);
    } else {
      setIsLoading(false);
      setError(response.data.message);
    }
  };

  return (
    <>
      <Button
        size={"sm"}
        className="text-white bg-amber-400"
        onClick={handleModal}
      >
        Detail Data
      </Button>
      <div
        className={`p-5 fixed inset-0 z-50 w-full min-h-screen bg-black/80 flex items-center justify-center ${modal ? "block" : "hidden"
          }`}
      >
        <div
          className={`w-11/12 bg-white p-5 rounded transition-transform max-h-[90vh] overflow-y-scroll ${modal ? "scale-100" : "scale-0"
            }`}
        >
          <h1 className="text-2xl text-black font-bold mb-7">Data Pembayaran {months[selector.month]} {selector.year}</h1>
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
                    Piutang S/P
                  </th>
                  <th className="text-center border border-solid p-3">
                    Piutang Dagang
                  </th>
                  <th className="text-center border border-solid p-3">
                    Jumlah
                  </th>
                </tr>
              </thead>
              <tbody>
                {listMembers.map((item, index) => (
                  <tr key={item.id}>
                    <td className="text-center border border-solid p-3">
                      {index + 1}
                    </td>
                    <td className="border border-solid p-3">{item.name}</td>
                    <td className="text-center border border-solid p-3">
                      {handleFormat(handleValueSimpananPokok(item.id))}
                    </td>
                    <td className="text-center border border-solid p-3">
                      {handleFormat(handleValueSimpananWajib(item.id))}
                    </td>
                    <td className="text-center border border-solid p-3">
                      {handleFormat(handleValueSimpananWajibKhusus(item.id))}
                    </td>
                    <td className="text-center border border-solid p-3">
                      {handleFormat(handleValueSimpananSukarela(item.id))}
                    </td>
                    <td className="text-center border border-solid p-3">
                      {handleFormat(handleValueTabunganRekreasi(item.id))}
                    </td>
                    <td className="text-center border border-solid p-3">
                      {handleFormat(handleValuePiutangSp(item.id))}
                    </td>
                    <td className="text-center border border-solid p-3">
                      {handleFormat(handleValuePiutangDagang(item.id))}
                    </td>
                    <td className="text-center border border-solid p-3">
                      {handleFormat(handleValueTotalRow(item.id))}
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
                    {totalCol?.totalPokok ? handleFormat(totalCol?.totalPokok) : 0}
                  </td>
                  <td className="text-center border border-solid p-3">
                    {totalCol?.totalWajib ? handleFormat(totalCol?.totalWajib) : 0}
                  </td>
                  <td className="text-center border border-solid p-3">
                    {totalCol?.totalWajibKhusus ? handleFormat(totalCol?.totalWajibKhusus) : 0}
                  </td>
                  <td className="text-center border border-solid p-3">
                    {totalCol?.totalSukarela ? handleFormat(totalCol?.totalSukarela) : 0}
                  </td>
                  <td className="text-center border border-solid p-3">
                    {totalCol?.totalTabunganRekreasi ? handleFormat(totalCol?.totalTabunganRekreasi) : 0}
                  </td>
                  <td className="text-center border border-solid p-3">
                    {totalCol?.totalPiutangSp ? handleFormat(totalCol?.totalPiutangSp) : 0}
                  </td>
                  <td className="text-center border border-solid p-3">
                    {totalCol?.totalPiutangDagang ? handleFormat(totalCol?.totalPiutangDagang) : 0}
                  </td>
                  <td className="text-center border border-solid p-3">
                    {handleFormat(handleTotalData())}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-full mb-5">
            <Label className="mb-1">Deskripsi</Label>
            <Textarea onChange={handleDescription} className="w-full border border-solid h-14" defaultValue={selector.description} />
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
              className="text-white bg-amber-400"
              onClick={handleInvoice}
              disabled={isLoading}


            >
              {isLoading ? <Loader /> : "Simpan Data"}
            </Button>
            <Button
              type="button"
              size={"sm"}
              className="text-white bg-green-400"
              onClick={handleDownloadExcel}
              disabled={isLoading}


            >
              {isLoading ? <Loader /> : "Download Excel"}
            </Button>
          </div>
        </div>
        {success && <AlertSuccess message={success.toString()} isShow={true} setSuccess={setSuccess} />}
        {error && <AlertError message={error.toString()} isShow={true} setError={setError} />}
      </div>
    </>
  );
};

export default TableDataReport;
