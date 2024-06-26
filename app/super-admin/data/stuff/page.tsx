import MainLayout from "@/components/mainLayout";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ProductState, StuffState } from "@/types/interface";
import { getProducts, getStuffs } from "@/app/utils/featuresApi";
import Content from "./content";
import AddStuff from "./addStuff";
import ExportPdf from "./exportPdf";
import ImportExcel from "./importExcel";

export const metadata: Metadata = {
  title: "Barang",
  description: "Data barang dari Zie Koperasi",
};

const Stuff = async () => {
  const session = await getServerSession(authOptions);
  const stuffs: StuffState[] = await getStuffs(session?.user.accessToken);
  const products: ProductState[] = await getProducts(session?.user.accessToken);

  return (
    <>
      <div className="bg-white shadow-md border rounded p-4 w-full">
        <h1 className="text-3xl font-bold mb-10 inline-block text-black pb-1 border-b-4 border-b-solid border-b-blue-400">
          Barang
        </h1>

        <div className="w-full flex items-center justify-start gap-3 mb-5">
            <AddStuff products={products} />
            <ExportPdf />
            <ImportExcel />
        </div>

        <Content stuffs={stuffs} products={products} />

      </div>

    </>
  );
};

export default Stuff;
