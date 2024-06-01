import MainLayout from "@/components/mainLayout";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PositionCategory } from "@/types/interface";
import { getPositionCategories } from "@/app/utils/featuresApi";
import Content from "./content";
import AddPositionCategory from "./addPositionCategory";
import ExportPdf from "./exportPdf";
import ImportExcel from "./importExcel";

export const metadata: Metadata = {
  title: "Golongan",
  description: "Data golongan dari Zie Koperasi",
};

const PositionCategoryMember = async () => {
  const session = await getServerSession(authOptions);
  const positionCategories: PositionCategory[] = await getPositionCategories(
    session?.user.accessToken
  );
  return (
    <>
      <div className="bg-white shadow-md border rounded p-4 w-full">
        <h1 className="text-3xl font-bold mb-10 inline-block text-black pb-1 border-b-4 border-b-solid border-b-blue-400">
          Golongan Anggota
        </h1>

        <div className="w-full flex items-center justify-start gap-3 mb-5">
          <AddPositionCategory />
          <ExportPdf />
          <ImportExcel />
        </div>

        <Content positionCategories={positionCategories} />
      </div>
    </>
  );
};

export default PositionCategoryMember;
