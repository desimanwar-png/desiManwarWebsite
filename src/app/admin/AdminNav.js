'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sidebar, SidebarContent, SidebarFooter } from '@/components/ui/sidebar'
import Link from 'next/link'
import {
  Users,
  LayoutDashboard,
  ShoppingCart,
  Mail,
  Phone,
  MessageSquare,
  Quote,
} from 'lucide-react'

const menuItems = [
  { name: 'Dashboard', route: '/admin' },
  { name: 'Users', route: '/admin/users' },
]

const settingsItems = [
  { name: 'Users', route: '/admin/users', icon: Users },
  { name: 'Members', route: '/admin/members', icon: Users },
  { name: 'Products', route: '/admin/products', icon: ShoppingCart },
  { name: 'NewsLetter Subs', route: '/admin/newsletterSubscriber', icon: Mail },
  { name: 'Contacted Persons', route: '/admin/contactedPerson', icon: Phone },
  { name: 'Testimonials', route: '/admin/testimonials', icon: MessageSquare },
  { name: 'User Quotes', route: '/admin/userQuotes', icon: Quote },
]

const AdminNav = () => {
  const router = useRouter()

  const handleLogout = () => {
    document.cookie =
      'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    router.push('/admin')
  }

  return (
    <Sidebar className="">
      <SidebarContent className="py-2 dark:bg-secondary-dark dark:text-primary-base">
        {/* {menuItems.map((item) => (
          <Link
            key={item.route}
            href={item.route}
            className="px-4 py-1 w-full rounded-lg hover:bg-muted transition"
          >
            {item.name}
          </Link>
        ))} */}
        {settingsItems.map((item) => (
          <Link
            key={item.route}
            href={item.route}
            className="flex items-center gap-3 px-4 py-2 w-full rounded-lg transition-all duration-300 ease-in-out hover:bg-primary-base/20 hover:text-primary font-medium"
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </SidebarContent>
      <SidebarFooter className="dark:bg-secondary-dark dark:text-primary-base">
        <Button variant="destructive" className="w-full" onClick={handleLogout}>
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AdminNav
