import { Toaster } from '@/components/ui/toaster'
import './globals.css'

export const metadata = {
  title: 'Desi Manwar',
  description: 'Desi Manwar Website',
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
