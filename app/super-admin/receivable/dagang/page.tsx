import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  getMemberMandatorySaving,
  getSubCategories,
} from "@/app/utils/featuresApi";
import MainLayout from "@/components/mainLayout";
import {
  MemberState,
  SubCategoryInvoice,
  SubCategoryState,
} from "@/types/interface";
import { getServerSession } from "next-auth";
import React from "react";
import SavingTime from "./savingTime";
import Description from "./description";
import Member from "./member";
import SaveSaving from "./saveSaving";

const Saving = async () => {
  const session = await getServerSession(authOptions);
  const members: SubCategoryInvoice[] = await getMemberMandatorySaving(
    session?.user.accessToken
  );
  const subCategories: SubCategoryState[] = await getSubCategories(
    session?.user.accessToken
  );
  console.log(members);
  return (
    <MainLayout>
      <div className="bg-white rounded p-4 w-full">
        <h1 className="text-3xl font-bold mb-10 inline-block text-black pb-1 border-b-4 border-b-solid border-b-amber-400">
          Simpanan Wajib
        </h1>
        <div className="w-full border-b border-b-slate-400 pb-14">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
            <SavingTime />
            <Description />
          </div>
        </div>
        <div className="w-full pt-14 mb-7">
          <Member members={members} />
        </div>
        <SaveSaving subCategories={subCategories} />
      </div>
    </MainLayout>
  );
};

export default Saving;