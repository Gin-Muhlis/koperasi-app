"use client";

// import React from "react";
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { CategoryState, SubCategoryState } from "@/types/interface";
import EditSubCategory from "./editSubCategory";
import DeleteSubCategory from "./deleteSubCategory";
import { capitalizeString } from "@/app/utils/helper";

const Content = ({
  subCategories,
  categories,
}: {
  subCategories: SubCategoryState[];
  categories: CategoryState[];
}) => {
  const columns: ColumnDef<SubCategoryState>[] = [
    {
      accessorKey: "name",
      header: "Nama",
      cell: ({row}) => {
        const value: string = row.getValue("name");

        return <div>{capitalizeString(value)}</div>
      }
    },
    {
      accessorKey: "code",
      header: "Kode",
    },
    {
      accessorKey: "type",
      header: "Tipe",
      cell: ({row}) => {
        const value: string = row.getValue("type");

        return <div>{capitalizeString(value)}</div>
      }
    },
    {
      accessorKey: "category",
      header: "Kategori",
      cell: ({row}) => {
        const value: string = row.getValue("category");

        return <div>{capitalizeString(value)}</div>
      }
    },
    {
      id: "actions",
      header: () => <div className="text-center">Aksi</div>,
      cell: ({ row }: { row: any }) => {
        const subCategory = row.original;

        return (
          <div className="flex items-center justify-center gap-1">
            <EditSubCategory
              subCategory={subCategory}
              categories={categories}
            />
            <DeleteSubCategory subCategory={subCategory} />
          </div>
        );
      },
    },
  ];
  return <DataTable columns={columns} data={subCategories} />;
};

export default Content;
