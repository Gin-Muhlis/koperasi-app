import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  getMemberReceivable,
  getMembers,
  getSubCategories,
} from "@/app/utils/featuresApi";
import MainLayout from "@/components/mainLayout";
import {
  MemberState,
  Receivable,
  SubCategoryState,
} from "@/types/interface";
import { getServerSession } from "next-auth";
import React from "react";
import Member from "./member";
import SaveSaving from "./saveReceivable";
import SaveReceivable from "./saveReceivable";

const Saving = async () => {
  const session = await getServerSession(authOptions);
  const members: MemberState[] = await getMembers(
    session?.user.accessToken
  );
  const subCategories: SubCategoryState[] = await getSubCategories(
    session?.user.accessToken
  );
  
  return (
    <MainLayout>
      <div className="bg-white rounded p-4 w-full">
        <h1 className="text-3xl font-bold mb-7 inline-block text-black pb-1 border-b-4 border-b-solid border-b-amber-400">
          Piutang S/P
        </h1>
        <div className="w-full pt-14 mb-7">
          <Member members={members} />
        </div>
        <SaveReceivable subCategories={subCategories} />
      </div>
    </MainLayout>
  );
};

export default Saving;
