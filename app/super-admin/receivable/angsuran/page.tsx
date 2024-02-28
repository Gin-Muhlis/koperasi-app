import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  getMemberAccountReceivable,
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
import SaveInstallment from "./saveInstallment";
import InstallmentTime from "./installmentTime";
import Description from "./description";

const Saving = async () => {
  const session = await getServerSession(authOptions);
  const membersReceivable: Receivable[] = await getMemberReceivable(session?.user.accessToken)
  const memberAccountReceivable: Receivable[] = await getMemberAccountReceivable(session?.user.accessToken)

  const data = [...membersReceivable, ...memberAccountReceivable];
  
  return (
    <MainLayout>
      <div className="bg-white rounded p-4 w-full">
        <h1 className="text-3xl font-bold mb-7 inline-block text-black pb-1 border-b-4 border-b-solid border-b-amber-400">
          Pembayaran Angsuran
        </h1>
        <div className="w-full border-b border-b-slate-400 pb-14">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
            <InstallmentTime />
            <Description />
          </div>
        </div>
        <div className="w-full pt-14 mb-7">
          <Member members={data} />
        </div>
        <SaveInstallment />
      </div>
    </MainLayout>
  );
};

export default Saving;
