import MainLayout from "@/components/mainLayout";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { MemberState, RoleState } from "@/types/interface";
import AddMember from "./addMember";
import DeleteMember from "./deleteMember";
import EditMember from "./editMember";
import { getMembers, getRoles } from "@/app/utils/featuresApi";
import DetailMember from "./detailMember";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

export const metadata: Metadata = {
  title: "Member",
  description: "Data member dari Zie Koperasi",
};

const Member = async () => {
  const session = await getServerSession(authOptions);
  const members: MemberState[] = await getMembers(session?.user.accessToken);
  const roles: RoleState[] = await getRoles(session?.user.accessToken);

  return (
    <MainLayout>
      <div className="bg-white rounded p-4 w-full">
        <h1 className="text-3xl font-bold mb-10 inline-block text-black pb-1 border-b-4 border-b-solid border-b-amber-400">
          Member
        </h1>

        <div className="mb-10">
          <AddMember roles={roles} />
        </div>

        <DataTable columns={columns} data={members} />
        {/* <div className="relative overflow-x-auto">

          <table className="table w-full table-sm">
            <thead className='bg-amber-400 text-black'>
              <tr>
                <th className='text-center'>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>No Telepon</th>
                <th>Alamat</th>
                <th>Jabatan</th>
                <th>Agama</th>
                <th className='text-center'>Aksi</th>
              </tr>
            </thead>
            <tbody className='text-slate-800 text-sm'>
              {members?.map((item, index) => (
                <tr key={item.id}>
                  <th className='text-center'>{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone_number}</td>
                  <td>{item.address}</td>
                  <td>{item.position}</td>
                  <td>{item.religion}</td>
                  <td className='flex items-center justify-center gap-1'>
                    <EditMember member={item} roles={roles} />
                    <DetailMember member={item} />
                    <DeleteMember member={item} />
                  </td>
                </tr>))}
            </tbody>
          </table>
        </div> */}
      </div>
    </MainLayout>
  );
};

export default Member;
