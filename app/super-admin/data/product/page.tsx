import MainLayout from "@/components/mainLayout";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ProductState } from "@/types/interface";
import { getProducts } from "@/app/utils/featuresApi";
import Content from "./content";
import AddProduct from "./addProduct";

export const metadata: Metadata = {
  title: "Produk",
  description: "Data produk dari Zie Koperasi",
};

const Product = async () => {
  const session = await getServerSession(authOptions);
  const products: ProductState[] = await getProducts(session?.user.accessToken);

  return (
    <>
      <div className="bg-white shadow-md border rounded p-4 w-full">
        <h1 className="text-3xl font-bold mb-10 inline-block text-black pb-1 border-b-4 border-b-solid border-b-blue-400">
          Produk
        </h1>

        <div className="mb-5">
            <AddProduct />
        </div>

        <Content products={products} />

      </div>

    </>
  );
};

export default Product;
