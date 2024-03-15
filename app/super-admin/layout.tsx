"use client"
import MainLayout from '@/components/mainLayout'
import Sidebar from '@/components/sidebar'
import { SessionProvider } from 'next-auth/react'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>
        <MainLayout>
            {children}
        </MainLayout>
    </>
}