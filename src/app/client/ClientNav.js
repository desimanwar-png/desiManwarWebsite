'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MenuIcon, X } from 'lucide-react'
import slugify from 'slugify'

function ClientNav() {
  const navElements = [
    'Home',
    'Products',
    'Certificates',
    'About Us',
    'Contact',
  ]
  const currentRoute = usePathname().split('/')[2]
  const [isNavbarOpen, setIsNavbarOpen] = useState(false)

  useEffect(() => {
    // Close navbar and remove overflow-hidden on route change
    setIsNavbarOpen(false)
    document.body.classList.remove('overflow-hidden')
  }, [currentRoute]) // Runs when route changes

  useEffect(() => {
    // Toggle body scrolling when navbar is opened
    if (isNavbarOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isNavbarOpen])

  const handleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen)
  }

  return (
    <div className="h-16 flex items-center sticky top-0 z-10 bg-primary-base dark:bg-secondary-dark dark:text-primary-base px-4 lg:px-20 shadow-lg">
      <Link href="/client">
        <div className="rounded-full h-12 w-12 flex items-center justify-center hover:scale-110 transition-all ease-in-out">
          <Image
            src="/images/logo-image-light.jpg"
            alt="Desi Manwar Logo"
            width={50}
            height={50}
            className="hidden dark:block w-full h-full rounded-full"
          />
          <Image
            src="/images/logo-image-dark.jpg"
            alt="Desi Manwar Logo"
            width={50}
            height={50}
            className="dark:hidden w-full h-full rounded-full"
          />
        </div>
      </Link>
      <div
        className="m-auto mr-0 cursor-pointer lg:hidden"
        onClick={handleNavbar}
      >
        <MenuIcon />
      </div>
      <div
        className={`flex items-center justify-center lg:justify-end m-auto mr-0 bg-primary-base dark:bg-secondary-dark h-[100vh] top-0 w-full absolute flex-col lg:flex-row lg:relative lg:dark:bg-secondary-dark lg:h-12 lg:w-[40.1vw] transition-all ease-in-out ${
          isNavbarOpen ? 'left-0' : '-left-[100%] lg:left-0'
        }`}
      >
        {navElements.map((element, index) => (
          <Link
            key={index}
            href={`/client/${slugify(element, { lower: true })}`} // 👈 add '/client/' here
            onClick={handleNavbar}
          >
            <div
              className={
                slugify(element, { lower: true }) === currentRoute
                  ? 'text-primary-dark lg:ml-8 font-semibold tracking-wide hover:scale-105 transition-all border-b-primary-dark border-b-2 mb-12 lg:mb-0'
                  : 'lg:ml-8 font-semibold tracking-wide hover:text-primary-dark hover:scale-105 transition-all mb-12 lg:mb-0'
              }
            >
              {element}
            </div>
          </Link>
        ))}
        <div
          className="border-2 border-black rounded-full p-4 dark:border-primary-base hover:scale-105 transition-all ease-in-out cursor-pointer lg:hidden"
          onClick={handleNavbar}
        >
          <X />
        </div>
      </div>
    </div>
  )
}

export default ClientNav
