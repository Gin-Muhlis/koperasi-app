import MainLayout from "@/components/mainLayout";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CategoryState, SubCategoryState } from "@/types/interface";
import { getCategories, getSubCategories } from "@/app/utils/featuresApi";
import Content from "./content";
import AddSubCategory from "./addSubCategory";

export const metadata: Metadata = {
  title: "Kategori",
  description: "Data sub kategori dari Zie Koperasi",
};

const SubCategory = async () => {
  const session = await getServerSession(authOptions);
  const subCategories: SubCategoryState[] = await getSubCategories(session?.user.accessToken);
  const categories: CategoryState[] = await getCategories(session?.user.accessToken);

  return (
    <>
      <div className="bg-white shadow-md border rounded p-4 w-full">
        <h1 className="text-3xl font-bold mb-10 inline-block text-black pb-1 border-b-4 border-b-solid border-b-blue-400">
          Sub Kategori
        </h1>

        <div className="mb-5">
          <AddSubCategory categories={categories} />
        </div>

        <Content subCategories={subCategories} categories={categories} />

      </div>

    </>
  );
};

export default SubCategory;
