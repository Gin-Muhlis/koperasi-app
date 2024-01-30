import MainLayout from "@/components/mainLayout";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  MemberState,
  PaymentDeterminationState,
  ProductState,
  StuffState,
  SubCategoryState,
} from "@/types/interface";
import {
  getMembers,
  getPayments,
  getProducts,
  getStuffs,
  getSubCategories,
} from "@/app/utils/featuresApi";
import Content from "./content";
import AddPaymentDetermination from "./addPayment";

export const metadata: Metadata = {
  title: "Ketentuan Pembayaran",
  description: "Data ketentuan pembayaran dari Zie Koperasi",
};

const PaymentDetermination = async () => {
  const session = await getServerSession(authOptions);
  const payments: PaymentDeterminationState[] = await getPayments(
    session?.user.accessToken
  );
  const members: MemberState[] = await getMembers(session?.user.accessToken);
  const subCategories: SubCategoryState[] = await getSubCategories(
    session?.user.accessToken
  );

  return (
    <MainLayout>
      <div className="bg-white rounded p-4 w-full">
        <h1 className="text-3xl font-bold mb-10 inline-block text-black pb-1 border-b-4 border-b-solid border-b-amber-400">
          Ketentuan Pembayaran
        </h1>

        <div className="mb-5"></div>
        <AddPaymentDetermination
          members={members}
          subCategories={subCategories}
        />
        <Content
          payments={payments}
          members={members}
          subCategories={subCategories}
        />
      </div>
    </MainLayout>
  );
};

export default PaymentDetermination;
