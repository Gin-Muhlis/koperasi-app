import MainLayout from '@/components/mainLayout'
import type { Metadata } from 'next'
import React from 'react'
import Content from './content'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Aplikasi untuk pendataan di koperasi',
}

const Dashboard = () => {

  return (
    <MainLayout>
      <Content />
    </MainLayout>
  )
}

export default Dashboard