import MainLayout from '@/components/mainLayout'
import type { Metadata } from 'next'
import React from 'react'
import Content from './content'
import { IProps } from '@/types/interface'
import AlertError from '@/app/components/alertError'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Aplikasi untuk pendataan di koperasi',
}


const Dashboard = async ({ searchParams }: IProps) => {

  return (
    <MainLayout>
      <Content />

      {searchParams?.message && <AlertError message={searchParams.message.toString()} isShow={true} />}
    </MainLayout>
  )
}

export default Dashboard