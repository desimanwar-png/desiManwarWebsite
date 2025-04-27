import React from 'react'
import AdminNav from './AdminNav'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

function AdminLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        <div className="">
          <AdminNav />
        </div>
        <SidebarTrigger />
        <div className="w-full overflow-auto">{children}</div>
      </div>
    </SidebarProvider>
  )
}

export default AdminLayout
