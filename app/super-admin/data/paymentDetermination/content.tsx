"use client";

import React from "react";
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import {
  MemberState,
  PaymentDeterminationState,
  RoleState,
  SubCategoryState,
} from "@/types/interface";

const Content = ({
  payments,
  subCategories,
  members,
}: {
  payments: PaymentDeterminationState[];
  members: MemberState[];
  subCategories: SubCategoryState[];
}) => {
  const columns: ColumnDef<PaymentDeterminationState>[] = [
    {
      accessorKey: "name",
      header: "Member",
    },
    {
      accessorKey: "sub_category",
      header: "Sub Kategori",
    },
    {
      accessorKey: "amount",
      header: "Jumlah Pembayaran",
    },
    {
      accessorKey: "payment_month",
      header: "Bulan Pemabayaran",
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }: { row: any }) => {
        const payment = row.original;

        return <div className="flex items-center justify-center gap-1"></div>;
      },
    },
  ];
  return (
    <>
      <DataTable columns={columns} data={payments} />
    </>
  );
};

export default Content;
