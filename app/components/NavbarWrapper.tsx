'use client'
import Navbar from '@/app/Navbar'
import { usePathname } from 'next/navigation'

export default function NavbarWrapper() {
  const pathname = usePathname()
  // Hide on admin routes
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/login'))
    return null
  return <Navbar />
}
