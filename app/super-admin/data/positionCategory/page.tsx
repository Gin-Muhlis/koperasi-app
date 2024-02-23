import MainLayout from "@/components/mainLayout";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PositionCategory } from "@/types/interface";
import { getPositionCategories } from "@/app/utils/featuresApi";

export const metadata: Metadata = {
  title: "Golongan",
  description: "Data golongan dari Zie Koperasi",
};

const PositionCategoryMember = async () => {
  const session = await getServerSession(authOptions);
  const positionCategories: PositionCategory[] = await getPositionCategories(session?.user.accessToken);

  return (
    <MainLayout>
      <div className="bg-white rounded p-4 w-full">
        <h1 className="text-3xl font-bold mb-10 inline-block text-black pb-1 border-b-4 border-b-solid border-b-amber-400">
          Produk
        </h1>

        <div className="mb-5">
            {/* <AddProduct /> */}
        </div>

        {/* <Content products={products} /> */}

      </div>

    </MainLayout>
  );
};

export default PositionCategoryMember;
