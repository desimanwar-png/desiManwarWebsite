import { Toaster } from '@/components/ui/toaster'
import './globals.css'
import { Copyright, icons } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/Button'
import ClientNav from './(client)/ClientNav'
import Footer from './(client)/Footer'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

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
        <div className="relative">
          <div className="h-16 flex place-content-center tracking-wider font-bold px-4 lg:px-20 z-50">
            <div className="flex place-items-center text-primary-dark ">
              <Link href="tel:+918290445443">
                <div className="mr-8 hover:text-black hover:dark:text-primary-base cursor-pointer">
                  +91 82904 45443
                </div>
              </Link>
              <Link href="mailto:info@desimanwar.com">
                <div className="hidden hover:text-black hover:dark:text-primary-base cursor-pointer lg:flex">
                  info@desimanwar.com
                </div>
              </Link>
            </div>
            <div className="m-auto mr-0">
              <Link href="get-a-quote">
                <Button text="Get a Quote" outline={false} />
              </Link>
            </div>
          </div>
          <ClientNav />
          {children}
          <Footer />
          <div className="flex flex-col lg:flex-row items-center justify-center text-secondary-dark dark:text-primary-base p-4 font-semibold tracking-wide bg-white dark:bg-primary-dark ">
            <div className="flex">
              <span className="px-1 flex items-center">
                Copyright <Copyright />
                {new Date().getFullYear()}
              </span>
              | All rights reserved.
            </div>
            <div className="p-0 lg:px-1">
              This website was developed by
              <Link
                href="https://ashutosh-portfolio-one.vercel.app/"
                target="_blank"
                className="px-2 text-secondary-dark hover:text-accent-base/75 hover:scale-105 transition-all ease-in-out"
              >
                @shutosh
              </Link>
            </div>
          </div>

          <div className="fixed bottom-4 right-4 z-50 hover:scale-105 transition-all ease-in-out">
            <Link href="https://api.whatsapp.com/send/?phone=%2B918290445443&text&type=phone_number&app_absent=0">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/images/whatsapp_logo.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  )
}
