'use client'

import { PlusCircle, UserRoundX } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { toast } from '@/hooks/use-toast'
import { deleteUser, getUsers, signup } from './action'

function UsersPage() {
  const [email, setEmail] = useState('')
  const [users, setUsers] = useState([])
  const [error, setError] = useState([])

  useEffect(() => {
    async function fetchUsers() {
      const data = await getUsers()
      setUsers(data.users)
    }

    fetchUsers()
  }, [])

  const handleEmailBlur = () => {
    if (email && !email.includes('@')) {
      setEmail(`${email}@desimanwar.com`)
    } else if (email && !email.endsWith('@desimanwar.com')) {
      setEmail(`${email.split('@')[0]}@desimanwar.com`)
    }
  }

  const handleSubmit = async (formData) => {
    const updatedFormData = new FormData()

    for (let [key, value] of formData.entries()) {
      if (key === 'email') {
        value = value.includes('@desimanwar.com')
          ? value
          : `${value.split('@')[0]}@desimanwar.com`
      }
      updatedFormData.append(key, value)
    }

    const result = await signup(updatedFormData)

    if (result.status === 'error') {
      setError(result.message)
      toast({
        title: 'Error',
        description: result.message,
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'Success',
        description: 'User created successfully',
      })
    }
  }

  const handleDelete = async (email) => {
    if (confirm('Delete user with email: ' + email) != true) return

    const result = await deleteUser(email)

    if (result.status === 'error') {
      setError(result.message)
      toast({
        title: 'Error',
        description: result.message,
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'Success',
        description: 'User deleted successfully',
      })
    }
  }

  return (
    <div className="py-4 px-4 lg:px-24">
      <div className="flex justify-between py-2">
        <div className="text-lg tracking-wider font-semibold">Users</div>
        <div>
          <Sheet>
            <SheetTrigger>
              <PlusCircle />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Create new User?</SheetTitle>
                <SheetDescription className="pt-8">
                  <form
                    action={async (formData) => handleSubmit(formData)}
                    className="space-y-8"
                  >
                    <div>
                      <Label className="block text-sm text-primary-dark dark:text-primary-base mb-2">
                        User Name
                      </Label>
                      <input
                        type="text"
                        name="name"
                        className="w-full rounded-md border p-2 text-primary-dark focus:border-secondary-dark focus:ring-secondary-dark"
                        required
                      />
                    </div>
                    <div>
                      <Label className="block text-sm text-primary-dark dark:text-primary-base mb-2">
                        Email
                      </Label>
                      <input
                        type="email"
                        name="email"
                        value={email} // Bind input field to state
                        onChange={(e) => setEmail(e.target.value)} // Update state on change
                        onBlur={handleEmailBlur} // Call function on blur
                        className="w-full rounded-md border p-2 text-primary-dark focus:border-secondary-dark focus:ring-secondary-dark"
                        required
                      />
                    </div>
                    <div>
                      <Label className="block text-sm text-primary-dark dark:text-primary-base mb-2">
                        Password
                      </Label>
                      <input
                        type="password"
                        name="password"
                        className="w-full rounded-md border p-2 text-primary-dark focus:border-secondary-dark focus:ring-secondary-dark"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full rounded-md bg-secondary-dark p-2 text-white "
                    >
                      Create User
                    </Button>
                  </form>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div>
        <Table>
          <TableCaption>Create or Modify User access</TableCaption>
          <TableHeader className="border-2">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-2">
            {users?.map((user) => (
              <TableRow key={user.email}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                {user.email === 'su@desimanwar.com' ? (
                  <TableCell></TableCell>
                ) : (
                  <TableCell onClick={() => handleDelete(user.email)}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <UserRoundX />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Remove User</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default UsersPage
