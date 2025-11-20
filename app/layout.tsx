import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'Desi Manwar',
  description:
    'Desi Manwar, A one stop place for exotic blend of spices from India.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="">
        {children}
        <Toaster richColors />
      </body>
    </html>
  )
}
