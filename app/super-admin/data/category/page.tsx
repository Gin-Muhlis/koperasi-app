import MainLayout from "@/components/mainLayout";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CategoryState } from "@/types/interface";
import { getCategories } from "@/app/utils/featuresApi";
import Content from "./content";

export const metadata: Metadata = {
  title: "Kategori",
  description: "Data kategori dari Zie Koperasi",
};

const Category = async () => {
  const session = await getServerSession(authOptions);
  const categories: CategoryState[] = await getCategories(session?.user.accessToken);

  return (
    <>
      <div className="bg-white shadow-md border rounded p-4 w-full">
        <h1 className="text-3xl font-bold mb-10 inline-block text-black pb-1 border-b-4 border-b-solid border-b-blue-400">
          Kategori
        </h1>

        <Content categories={categories} />

      </div>

    </>
  );
};

export default Category;
