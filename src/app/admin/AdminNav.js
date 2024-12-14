'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { AlignJustify, LogOut, X } from 'lucide-react'

function AdminNav() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    document.cookie = 'userId=; max-age=0; path=/'
    document.cookie = 'accessToken=; max-age=0; path=/'

    router.push('/login')
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="flex flex-col md:flex-row">
      <Button onClick={toggleSidebar} className="w-12 h-8 m-2">
        <AlignJustify size={24} />
      </Button>
      <div
        className={`${
          isOpen ? 'left-0' : 'left-[-100%]'
        } md:block w-64 h-[100vh] p-2 border-r-4 fixed md:absolute top-0 left-0 z-40 bg-secondary-dark dark:bg-primary-dark text-white transition-all duration-500 ease-in-out`}
      >
        <div className="flex items-center mb-6 ">
          <Button onClick={toggleSidebar} className="mr-2">
            <X />
          </Button>
          <h2 className="text-xl font-semibold">Hello, Admin</h2>
        </div>

        <nav className="flex flex-col space-y-4"></nav>
        <div className="absolute bottom-2 ">
          <Button className="w-full">
            <LogOut />
            <span onClick={handleLogout} className="font-semibold">
              Logout
            </span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AdminNav
