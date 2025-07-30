import { Toaster } from '@/components/ui/toaster'
import './globals.css'
import { icons } from 'lucide-react'

export const metadata = {
  title: 'Desi Manwar',
  description: 'Desi Manwar Website',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-primary-base text-secondary-dark dark:bg-secondary-dark dark:text-primary-base">
        {children}
        <Toaster />
      </body>
    </html>
  )
}
