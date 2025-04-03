'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function AdminPage() {
  const { push } = useRouter()

  useEffect(() => {
    push('/admin/users')
  }, [])

  return (
    <div className="flex dark:bg-secondary-dark dark:text-primary-base px-4 lg:px-20 py-4">
      Admin
    </div>
  )
}

export default AdminPage
