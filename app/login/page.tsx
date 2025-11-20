'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { toast } from 'sonner'
import { loginUser } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const result = await loginUser(email, password)

    if (result.success) {
      toast.success('Login successful! Redirecting...')
      // Redirect to admin dashboard after a short delay to show the message
      setTimeout(() => {
        router.push('/admin')
      }, 1000)
    } else {
      toast.error(result.message || 'Login failed.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full lg:grid lg:grid-cols-2 h-screen overflow-hidden">
      <div className="hidden bg-muted lg:block relative">
        <Image
          src="/images/why-us.jpg"
          alt="Authentic Indian Spices"
          fill
          className="object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@desimanwar.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={(e) => {
                  const currentValue = e.target.value;
                  if (currentValue && !currentValue.endsWith('@desimanwar.com')) {
                    const localPart = currentValue.split('@')[0];
                    setEmail(`${localPart}@desimanwar.com`);
                  }
                }}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Sign In'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
