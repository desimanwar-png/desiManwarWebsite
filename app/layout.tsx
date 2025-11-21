import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-provider'
import FooterWrapper from './components/FooterWrapper'
import NavbarWrapper from './components/NavbarWrapper'

export const metadata: Metadata = {
  title: 'Desi Manwar',
  description:
    'Desi Manwar, A one stop place for exotic blend of spices from India.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NavbarWrapper />
          {children}
          <Toaster richColors />
          <FooterWrapper />
        </ThemeProvider>
      </body>
    </html>
  )
}
