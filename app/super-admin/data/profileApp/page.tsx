import MainLayout from "@/components/mainLayout";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CategoryState, ProfileApp } from "@/types/interface";
import { getCategories, getProfilApp } from "@/app/utils/featuresApi";
import Content from "./content";
import EditProfile from "./editProfile";

export const metadata: Metadata = {
  title: "Kategori",
  description: "Data kategori dari Zie Koperasi",
};

const Category = async () => {
  const session = await getServerSession(authOptions);
  const profile: ProfileApp = await getProfilApp(session?.user.accessToken);
  console.log(profile)
  return (
    <MainLayout>
      <div className="bg-white rounded p-4 w-full">
        <h1 className="text-3xl font-bold mb-10 inline-block text-black pb-1 border-b-4 border-b-solid border-b-amber-400">
          Profile Koperasi
        </h1>

        <Content profile={profile} />

        <div className="mb-8">
          <EditProfile profile={profile} />
        </div>

      </div>

    </MainLayout>
  );
};

export default Category;
