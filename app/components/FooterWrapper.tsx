'use client'
import Footer from '@/app/Footer'
import { usePathname } from 'next/navigation'

export default function FooterWrapper() {
  const pathname = usePathname()
  // Hide on admin and login routes
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/login'))
    return null
  return <Footer />
}
