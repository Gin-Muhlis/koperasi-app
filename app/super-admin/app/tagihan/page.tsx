import MainLayout from "@/components/mainLayout";
import React from "react";
import TabContent from "./tab";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PositionCategory, TypeTabPrincipalSaving } from "@/types/interface";
import {
  getPositionCategories,
  getPrincivalSavings,
} from "@/app/utils/featuresApi";
import DetailPayment from "./detailPayment";

const Tagihan = async () => {
  const session = await getServerSession(authOptions);
  const principalSavings: TypeTabPrincipalSaving[] = await getPrincivalSavings(
    session?.user.accessToken
  );
  const positionCategories: PositionCategory[] = await getPositionCategories(
    session?.user.accessToken
  );
  
  return (
    <MainLayout>
      <div className="bg-white rounded p-4 w-full">
        <h1 className="text-3xl font-bold mb-10 inline-block text-black pb-1 border-b-4 border-b-solid border-b-amber-400">
          Tagihan Gabungan
        </h1>
        <div className="w-full flex flex-col gap-8">
          <TabContent
            principalSavings={principalSavings}
            positionCategories={positionCategories}
          />
          <DetailPayment />
        </div>
      </div>
    </MainLayout>
  );
};

export default Tagihan;
