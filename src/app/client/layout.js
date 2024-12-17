import Link from 'next/link'
import React from 'react'
import ClientNav from './ClientNav'
import { ArrowRight, Copyright } from 'lucide-react'
import Button from '@/components/Button'

function RootLayout({ children }) {
  return (
    <div>
      <div className="h-16 flex place-content-center tracking-wider font-bold px-4 lg:px-20">
        <div className="flex place-items-center text-primary-dark ">
          <Link href="tel:+918290445443">
            <div className="mr-8 hover:text-black hover:dark:text-primary-base cursor-pointer">
              +91 82904 45443
            </div>
          </Link>
          <Link href="mailto:desimanwar@gmail.com">
            <div className="hidden hover:text-black hover:dark:text-primary-base cursor-pointer lg:flex">
              desimanwar@gmail.com
            </div>
          </Link>
        </div>
        <div className="m-auto mr-0">
          <Link href="#newsletter">
            <Button text="Get a Quote" outline={false} />
          </Link>
        </div>
      </div>
      <ClientNav />
      {children}
      {/* <Footer /> */}
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
    </div>
  )
}

export default RootLayout
