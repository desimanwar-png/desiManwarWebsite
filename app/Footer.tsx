'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { toast } from 'sonner'

import { createSubscriber } from './admin/newsletter/actions'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error('Please enter your email')
      return
    }

    setLoading(true)
    try {
      const result = await createSubscriber(email)
      if (result.success) {
        toast.success(result.message)
        setEmail('')
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="bg-accent/20 text-primary-foreground border-t">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Address Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Address
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
                <a href="https://www.google.com/maps/search/Plot+no.+3,+Park+House,+Infornt+of+Akashvani,+M.I+Road,+Jaipur,+Rajasthan+302001/@26.82394,75.7151575,10z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
                  <span>
                    Plot no. 3, Park House, Infornt of Akashvani, M.I Road,
                    Jaipur, Rajasthan 302001
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+918290445443"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  +91 829 044 5443
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@desimanwar.com"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  info@desimanwar.com
                </a>
              </li>
            </ul>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Services
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/our-services"
                  className="hover:text-primary transition-colors"
                >
                  Global Sourcing & Export
                </Link>
              </li>
              <li>
                <Link
                  href="/our-services"
                  className="hover:text-primary transition-colors"
                >
                  Private Label & Custom Packaging
                </Link>
              </li>
              <li>
                <Link
                  href="/our-services"
                  className="hover:text-primary transition-colors"
                >
                  Wholesale & Bulk Supply
                </Link>
              </li>
              <li>
                <Link
                  href="/our-services"
                  className="hover:text-primary transition-colors"
                >
                  Trade Consulting & Docs Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/about-us"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/our-services"
                  className="hover:text-primary transition-colors"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="hover:text-primary transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Newsletter
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to get updates about new products and offers.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-muted-foreground text-sm">
            <p>
              © {new Date().getFullYear()} Desi Manwar. All rights reserved.
            </p>
            <p>
              Developed by{' '}
              <a
                href="https://ashutosh-portfolio-one.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-300 transition-colors"
              >
                @shutosh
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
