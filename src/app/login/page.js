'use client'

import { login } from './actions'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'

function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleEmailBlur = () => {
    if (email && !email.includes('@')) {
      setEmail(`${email}@desimanwar.com`)
    } else if (email && !email.endsWith('@desimanwar.com')) {
      setEmail(`${email.split('@')[0]}@desimanwar.com`)
    }
  }

  const handleSubmit = async (formData) => {
    const result = await login(formData)

    if (result.status === 'error') {
      setError(result.message)
      toast({
        title: 'Error',
        description: result.message,
        variant: 'destructive',
      })
    } else {
      const { user, accessToken } = result

      document.cookie = `accessToken=${accessToken}; path=/; Secure`
      document.cookie = `userId=${user.id}; path=/; Secure`

      toast({
        title: 'Success',
        message: 'Login successful',
        type: 'success',
      })

      router.push('/admin')
    }
  }

  return (
    <div className="flex items-center justify-center w-[100vw] h-[95vh] text-secondary-dark dark:text-primary-base">
      <div className="flex flex-col px-8 py-12 border rounded-md border-secondary-dark dark:border-primary-base">
        <h1 className="flex justify-center w-full text-2xl font-bold">
          Desi Manwar Pvt Ltd
        </h1>
        <h1 className="flex justify-center w-full pb-8 text-2xl font-bold">
          Admin Login
        </h1>
        <form action={async (formData) => handleSubmit(formData)}>
          <Label htmlFor="email" className="mb-2 font-semibold text-md">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleEmailBlur}
            className="mb-4 border-secondary-dark dark:border-primary-base"
            required
          />
          <Label htmlFor="password" className="mb-2 font-semibold text-md">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-8 border-secondary-dark dark:border-primary-base"
            required
          />
          <Button
            type="submit"
            className="w-full font-semibold dark:bg-primary-base dark:text-secondary-dark bg-secondary-dark text-primary-base"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
