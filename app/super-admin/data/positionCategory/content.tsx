"use client";

import { handleFormat } from "@/app/utils/helper";
import { DataTable } from "@/components/data-table";
import { PositionCategory } from "@/types/interface";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import DeletePositionCategory from "./deletePositionCategory";
import EditPositionCategory from "./editPositionCategory";

const Content = ({
  positionCategories,
}: {
  positionCategories: PositionCategory[];
}) => {
  const columns: ColumnDef<PositionCategory>[] = [
    {
      accessorKey: "name",
      header: "Posisi",
    },
    {
      accessorKey: "pokok",
      header: () => <div className="text-center">Pembayaran Pokok</div>,
      cell: ({ row }) => {
        const value = parseFloat(row.getValue("pokok"));

        return <div className="text-center">{handleFormat(value)}</div>;
      },
    },
    {
      accessorKey: "wajib",
      header: () => <div className="text-center">Pembayaran Wajib</div>,
      cell: ({ row }) => {
        const value = parseFloat(row.getValue("wajib"));

        return <div className="text-center">{handleFormat(value)}</div>;
      },
    },
    {
      accessorKey: "wajib_khusus",
      header: () => <div className="text-center">Pembayaran Wajib Khusus</div>,
      cell: ({ row }) => {
        const value = parseFloat(row.getValue("wajib_khusus"));

        return <div className="text-center">{handleFormat(value)}</div>;
      },
    },
    {
      id: "actions",
      header: () => <div className="text-center">Aksi</div>,
      cell: ({ row }) => {
        const positionCategory = row.original;

        return (
          <div className="flex items-center justify-center gap-1">
            <EditPositionCategory positionCategory={positionCategory} />
            <DeletePositionCategory positionCategory={positionCategory} />
          </div>
        );
      },
    },
  ];
  return (
    <>
      <DataTable columns={columns} data={positionCategories} />
    </>
  );
};

export default Content;
