import MainLayout from "@/components/mainLayout";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { MemberState, PositionCategory, RoleState } from "@/types/interface";
import { getMembers, getPositionCategories, getRoles } from "@/app/utils/featuresApi";
import Content from "./content";
import AddMember from "./addMember";

export const metadata: Metadata = {
  title: "Member",
  description: "Data member dari Zie Koperasi",
};

const Member = async () => {
  const session = await getServerSession(authOptions);
  const members: MemberState[] = await getMembers(session?.user.accessToken);
  const roles: RoleState[] = await getRoles(session?.user.accessToken);
  const positionCategories: PositionCategory[] = await getPositionCategories(session?.user.accessToken);

  return (
    <MainLayout>
      <div className="bg-white rounded p-4 w-full">
        <h1 className="text-3xl font-bold mb-10 inline-block text-black pb-1 border-b-4 border-b-solid border-b-amber-400">
          Member
        </h1>

        <div className="mb-5">
          <AddMember roles={roles} positionCategories={positionCategories} />
        </div>

        <Content members={members} roles={roles} positionCategories={positionCategories} />

      </div>

    </MainLayout>
  );
};

export default Member;
