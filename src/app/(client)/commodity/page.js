'use client'
import React from 'react'
import Image from 'next/image'
import { BadgeCheck, ShoppingCart, DollarSign, Globe, Leaf } from 'lucide-react'
import Button from '@/components/Button'
import Link from 'next/link'

const cardItems = [
  {
    title: 'QUALITY',
    icon: <BadgeCheck className="text-secondary-base w-10 h-10 mx-auto mb-4" />,
    text: 'Brazilian ICUMSA 45 sets the global gold standard for refined sugar purity, backed by ISO-certified mills. ',
  },
  {
    title: 'VOLUME',
    icon: (
      <ShoppingCart className="text-secondary-base w-10 h-10 mx-auto mb-4" />
    ),
    text: 'Contract-based allocations from 12,500 MT upwards, sourced through our exclusive Brazilian network for stable, long-term supply. ',
  },
  {
    title: 'SPEED',
    icon: <DollarSign className="text-secondary-base w-10 h-10 mx-auto mb-4" />,
    text: 'Binding quotes in 24 hours, with pre-vetted suppliers and streamlined documentation for fast execution. ',
  },
  {
    title: 'EDGE',
    icon: <Globe className="text-secondary-base w-10 h-10 mx-auto mb-4" />,
    text: 'We leverage Brazil’s pricing cycles to secure your contract terms – whether fixed or index-linked. ',
  },
  {
    title: 'CONTROL',
    icon: <Leaf className="text-secondary-base w-10 h-10 mx-auto mb-4" />,
    text: 'Flexible CIF contracts with SGS-verified quality and real-time shipment tracking - no surprises.',
  },
]

function CommodityPage() {
  return (
    <>
      <div className="relative w-screen h-[90vh] mb-8">
        {/* Mobile image */}
        <Image
          src="/images/commodity_sugar_mobile.jpg"
          alt="Commodity Header Mobile"
          fill
          className="object-cover lg:hidden"
          priority
        />
        {/* Desktop image */}
        <Image
          src="/images/commodity_sugar_pc.jpg"
          alt="Commodity Header Desktop"
          fill
          className="object-cover hidden lg:block"
          priority
        />
        {/* Translucent Overlay with Text */}
        <div className="absolute inset-0 bg-secondary-dark/60 flex flex-col items-left justify-center pl-4 lg:pl-20">
          <h1 className="text-5xl lg:text-7xl font-bold text-primary-base tracking-wide">
            Brazilian Sugar
          </h1>
          <p className="py-2 font-semibold">
            THE GOLD STANDARD OF SUGAR{' '}
            <span className="text-accent-base">
              ICUMSA 45 Straight from Brazil
            </span>
          </p>
          <p>
            <Link href={'/client/contact'}>
              <Button
                text={'Get a Quote'}
                className={
                  'hover:border-accent-base hover:bg-accent-base hover:!text-accent-base'
                }
              />
            </Link>
          </p>
        </div>
      </div>

      <div className="px-4 lg:px-20 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 dark:text-primary-base">
          {cardItems.map((card, idx) => (
            <div
              key={idx}
              className="border border-secondary-base dark:text-primary-base rounded-xl p-6 text-center shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="text-secondary-base text-4xl mb-4">
                {card.icon}
              </div>
              <h3 className="text-secondary-dark dark:text-primary-base text-lg font-semibold mb-2 tracking-wide">
                {card.title}
              </h3>
              <p className="text-secondary-dark dark:text-primary-base text-sm text-justify">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Image Section */}
      {/* Parallax Footer Image Section */}
      <div
        className="w-full h-[80vh] mt-16 bg-fixed bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/images/commodity_bg.png')" }}
      >
        <div className="w-full h-full bg-secondary-dark/60 flex items-center justify-center">
          {/* <h2 className="text-3xl lg:text-5xl font-bold text-primary-base text-center px-4">
            Direct Access to Brazil’s Sugar Supply Chain
          </h2> */}
        </div>
      </div>

      {/* CTA SECTION for BUYERS */}
      {/* <section className="bg-secondary-dark text-primary-base py-12 px-4 lg:px-20 text-center mt-16 rounded-xl shadow-md">
        <h2 className="text-2xl lg:text-3xl font-bold mb-6 tracking-wide">
          FOR BUYERS
        </h2>
        <Link href={'/client/contact'}>
          <Button
            text="Request Spot Offer"
            className="bg-accent-base text-primary-base px-6 py-3 font-semibold rounded hover:!text-primary-base hover:bg-accent-dark transition duration-300"
          />
        </Link>

        {/* Trust Badges
        <div className="mt-8 flex justify-center items-center flex-wrap gap-6">
          <div className="bg-primary-base text-secondary-dark font-semibold px-4 py-2 rounded-full shadow">
            SGS
          </div>
          <div className="bg-primary-base text-secondary-dark font-semibold px-4 py-2 rounded-full shadow">
            ISO
          </div>
          <div className="bg-primary-base text-secondary-dark font-semibold px-4 py-2 rounded-full shadow">
            ANP
          </div>
        </div>
      </section> */}
    </>
  )
}

export default CommodityPage
