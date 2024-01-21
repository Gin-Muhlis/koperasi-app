import MainLayout from '@/components/mainLayout'
import { Metadata } from 'next'
import React, { Suspense } from 'react'
import AddMember from './addMember'
import DataMember from './dataMember'
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { getMembers } from '@/api/api-features'
import Loading from './loading'

export const metadata: Metadata = {
  title: 'Member',
  description: 'Data member dari Zie Koperasi',
}

const Member = (context: GetServerSidePropsContext) => {

  return (
    <MainLayout>
      <div className="bg-white rounded p-4 w-full">
        <h1 className="text-3xl font-bold mb-5 inline-block text-black pb-1 border-b-4 border-b-solid border-b-amber-400">
          Member
        </h1>
        <AddMember />
        <div className="relative overflow-x-auto">
        <DataMember />
        </div>
      </div>


    </MainLayout>
  )
}

export default Member