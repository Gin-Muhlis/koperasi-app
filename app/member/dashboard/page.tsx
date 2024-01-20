import AlertError from '@/app/components/alertError';
import MainLayout from '@/components/mainLayout'
import { IProps } from '@/types/interface';
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Aplikasi untuk pendataan di koperasi',
}

const Dashboard = ({ searchParams }: IProps) => {
    
    return (
        <MainLayout>
            <h1>Dashboard Member</h1>

            {searchParams?.message && <AlertError message={searchParams.message.toString()} />}
        </MainLayout>
    )
}

export default Dashboard