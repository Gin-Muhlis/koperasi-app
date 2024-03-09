
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ReduxProvider } from '@/redux/provider'
import { Suspense } from 'react'
import LoadingPage from './components/loading'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Koperasi App',
  description: 'Aplikasi untuk pendataan di koperasi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Suspense fallback={<LoadingPage />}>
          {children}
          </Suspense>
        </ReduxProvider>
      </body>
    </html>
  )
}
