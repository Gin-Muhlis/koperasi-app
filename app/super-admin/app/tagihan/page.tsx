import MainLayout from "@/components/mainLayout";
import React from "react";
import TabContent from "./tab";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { MandatorySaving, MemberState, PositionCategory, Receivable, TypeTab } from "@/types/interface";
import {
  getMandatorySavings,
  getMembers,
  getPositionCategories,
  getPrincivalSavings,
  getReceivables,
} from "@/app/utils/featuresApi";
import DetailPayment from "./detailPayment";
import Time from "./time";

const Tagihan = async () => {
  const session = await getServerSession(authOptions);
  const positionCategories: PositionCategory[] = await getPositionCategories(
    session?.user.accessToken
  );
  const members: MemberState[] = await getMembers(session?.user.accessToken);
  const principalSavings: TypeTab[] = await getPrincivalSavings(
    session?.user.accessToken
  );
  const receivables: Receivable[] = await getReceivables(session?.user.accessToken);
  const mandatorySavings: MandatorySaving[] = await getMandatorySavings(session?.user.accessToken)
  
  return (
    <MainLayout>
      <div className="bg-white rounded p-4 w-full">
        <h1 className="text-3xl font-bold mb-10 inline-block text-black pb-1 border-b-4 border-b-solid border-b-amber-400">
          Tagihan Gabungan
        </h1>
        <div className="mb-5">
          {/* <Time /> */}
        </div>
        <div className="w-full flex flex-col gap-8">
          <TabContent
            principalSavings={principalSavings}
            positionCategories={positionCategories}
            members={members}
            receivables={receivables}
            mandatorySavings={mandatorySavings}
          />
          <DetailPayment members={members} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Tagihan;
