import React from 'react'
import {
  Mail,
  MapPin,
  Phone,
  Twitter,
  Facebook,
  Youtube,
  Linkedin,
  CircleChevronRight,
  ChevronsRight,
  MessageSquare,
} from 'lucide-react'
import Link from 'next/link'

function Footer() {
  return (
    <footer className="bg-secondary-dark text-primary-base py-10 px-4 lg:px-20 shadow-lg">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Address Section */}
        <div>
          <h3 className="text-xl font-semibold text-primary-base mb-4">
            Address
          </h3>
          <ul>
            <li className="flex items-center mb-2">
              <MapPin className="w-5 h-5 mr-2 text-accent-base" />
              <span className="hover:text-accent-base transition-colors">
                Jaipur, Rajasthan, India
              </span>
            </li>
            <li className="flex items-center mb-2">
              <Link href="tel:+918290445443" className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-accent-base" />
                <span className="hover:text-accent-base transition-colors">
                  +91 829 044 5443
                </span>
              </Link>
            </li>
            <li className="flex items-center mb-2">
              <Link
                href="mailto:desimanwar@gmail.com"
                className="flex items-center"
              >
                <Mail className="w-5 h-5 mr-2 text-accent-base" />
                <span className="hover:text-accent-base transition-colors">
                  desimanwar@gmail.com
                </span>
              </Link>
            </li>
          </ul>
          <div className="flex space-x-2 mt-4">
            <Link
              href="https://x.com/"
              className="p-2 bg-primary-base hover:bg-accent-base rounded transition-all"
              target="_blank"
            >
              <Twitter className="w-5 h-5 text-secondary-dark" />
            </Link>
            <Link
              href="https://facebook.com/"
              className="p-2 bg-primary-base hover:bg-accent-base rounded transition-all"
              target="_blank"
            >
              <Facebook className="w-5 h-5 text-secondary-dark" />
            </Link>
            <Link
              href="https://youtube.com/"
              className="p-2 bg-primary-base hover:bg-accent-base rounded transition-all"
              target="_blank"
            >
              <Youtube className="w-5 h-5 text-secondary-dark" />
            </Link>
            <Link
              href="https://linkedin.com/"
              className="p-2 bg-primary-base hover:bg-accent-base rounded transition-all"
              target="_blank"
            >
              <Linkedin className="w-5 h-5 text-secondary-dark" />
            </Link>
            <Link
              href="https://api.whatsapp.com/send/?phone=%2B918290445443&text&type=phone_number&app_absent=0"
              className="p-2 bg-primary-base hover:bg-accent-base rounded transition-all"
              target="_blank"
            >
              <MessageSquare className="w-5 h-5 text-secondary-dark" />
            </Link>
          </div>
        </div>

        {/* Services Section */}
        <div>
          <h3 className="text-xl font-semibold text-primary-base mb-4">
            Services
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <CircleChevronRight size={20} />
              Global Shipping Solutions
            </li>
            <li className="flex items-center gap-2">
              <CircleChevronRight size={20} />
              Eco-Friendly Packaging
            </li>
            <li className="flex items-center gap-2">
              <CircleChevronRight size={20} />
              Certified Quality
            </li>
            <li className="flex items-center gap-2">
              <CircleChevronRight size={20} />
              Bulk Orders
            </li>
            <li className="flex items-center gap-2">
              <CircleChevronRight size={20} />
              Authentic Flavours
            </li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-xl font-semibold text-primary-base mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li className="hover:text-accent-base transition-colors">
              {/* // TODO: Add herf  */}
              <Link href="/" className="flex items-center gap-2">
                <ChevronsRight size={20} />
                About Us
              </Link>
            </li>
            <li className="hover:text-accent-base transition-colors">
              {/* // TODO: Add herf  */}
              <Link href="/" className="flex items-center gap-2">
                <ChevronsRight size={20} />
                Contact Us
              </Link>
            </li>
            <li className="hover:text-accent-base transition-colors">
              {/* // TODO: Add herf  */}
              <Link href="/" className="flex items-center gap-2">
                <ChevronsRight size={20} />
                Our Services
              </Link>
            </li>
            <li className="hover:text-accent-base transition-colors">
              {/* // TODO: Add herf  */}
              <Link href="/" className="flex items-center gap-2">
                <ChevronsRight size={20} />
                Terms & Conditions
              </Link>
            </li>
            <li className="hover:text-accent-base transition-colors">
              {/* // TODO: Add herf  */}
              <Link href="/" className="flex items-center gap-2">
                <ChevronsRight size={20} />
                Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="text-xl font-semibold text-primary-base mb-4">
            Get Updates & Offers
          </h3>
          <p className="text-sm mb-4 text-justify">
            Subscribe to our newsletter to get updates about new products and
            offers directly to your inbox.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 w-full text-secondary-dark rounded-l-md focus:outline-none"
            />
            <button className="px-4 py-2 bg-accent-base hover:bg-primary-dark text-secondary-dark font-semibold rounded-r-md transition-all">
              SignUp
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
