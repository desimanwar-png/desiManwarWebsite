'use client'

import { useRouter } from 'next/navigation'
import {
  Home,
  User,
  LogOut,
  Box,
  Database,
  User2,
  PersonStanding,
  PackageSearch,
  Mailbox,
  UserRoundPen,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const menuItems = [
  { name: 'Dashboard', icon: Home, route: '/admin' },
  { name: 'Users', icon: User, route: '/admin/users' },
]

const settingsItems = [
  { name: 'Users', icon: User2, route: '/admin/users' },
  { name: 'Members', icon: PersonStanding, route: '/admin/members' },
  { name: 'Products', icon: PackageSearch, route: '/admin/products' },
  {
    name: 'NewsLetter Subs',
    icon: Mailbox,
    route: '/admin/newsletterSubscriber',
  },
  {
    name: 'Contacted Persons',
    icon: UserRoundPen,
    route: '/admin/contactedPerson',
  },
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
    <div className="w-16 md:w-20 h-screen bg-secondary-dark text-primary-base p-4 flex flex-col items-center border-r-2 border-primary-base">
      {/* Accordion with Tooltip for Box Icon */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="main-nav">
                <AccordionTrigger className="flex justify-center">
                  <Box className="w-6 h-6 text-white" />
                </AccordionTrigger>
                <AccordionContent>
                  <nav className="flex flex-col space-y-2">
                    {menuItems.map((item) => (
                      <TooltipProvider key={item.name}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              onClick={() => router.push(item.route)}
                              className="flex justify-center p-1.5 w-full rounded-lg"
                            >
                              <item.icon className="w-6 h-6" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{item.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </nav>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TooltipTrigger>
          <TooltipContent>
            <p>Modeler</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Accordion with Tooltip for Database Icon */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="settings">
                <AccordionTrigger className="flex justify-center">
                  <Database className="w-6 h-6 text-white" />
                </AccordionTrigger>
                <AccordionContent>
                  <nav className="flex flex-col space-y-2">
                    {settingsItems.map((item) => (
                      <TooltipProvider key={item.name}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              onClick={() => router.push(item.route)}
                              className="flex justify-center p-1.5 w-full rounded-lg"
                            >
                              <item.icon className="w-6 h-6" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{item.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </nav>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TooltipTrigger>
          <TooltipContent>
            <p>Data</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Logout Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="mt-auto flex justify-center p-1.5 w-full rounded-lg"
            >
              <LogOut className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Logout</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default AdminNav
