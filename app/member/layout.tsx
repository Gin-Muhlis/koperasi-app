"use client"
import MainLayout from '@/components/mainLayout'
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