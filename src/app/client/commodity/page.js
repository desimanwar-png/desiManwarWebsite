'use client'
import React from 'react'
import Image from 'next/image'
import { BadgeCheck, ShoppingCart, DollarSign, Globe, Leaf } from 'lucide-react'

const cardItems = [
  {
    title: 'QUALITY',
    icon: <BadgeCheck className="text-secondary-base w-10 h-10 mx-auto mb-4" />,
    text: 'Brazil stands out for its superior sugar production, especially the ICUMSA 45 variety, which is recognized globally as a high-purity refined sugar.',
  },
  {
    title: 'QUANTITY',
    icon: (
      <ShoppingCart className="text-secondary-base w-10 h-10 mx-auto mb-4" />
    ),
    text: 'As the top sugar-producing country in the world, Brazil consistently meets large-scale demand, making it a dependable partner for bulk sugar procurement.',
  },
  {
    title: 'COMPETITIVE PRICING',
    icon: <DollarSign className="text-secondary-base w-10 h-10 mx-auto mb-4" />,
    text: 'Thanks to its vast output, Brazil is able to keep sugar prices competitive, offering cost-effective options compared to many other nations.',
  },
  {
    title: 'LOGISTICS',
    icon: <Globe className="text-secondary-base w-10 h-10 mx-auto mb-4" />,
    text: 'With multiple well-connected ports across the country, Brazil provides efficient global shipping routes for sugar exports.',
  },
  {
    title: 'SUSTAINABILITY',
    icon: <Leaf className="text-secondary-base w-10 h-10 mx-auto mb-4" />,
    text: 'Sustainable practices are integral to Brazilian sugarcane farming, with policies that promote environmental stewardship and responsible land use.',
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
        <div className="absolute inset-0 bg-secondary-dark/60 flex items-center justify-start pl-4 lg:pl-20">
          <h1 className="text-5xl lg:text-7xl font-bold text-primary-base tracking-wide">
            Brazilian Sugar
          </h1>
        </div>
      </div>

      <div className="px-4 lg:px-20 py-12">
        <p className="text-secondary-dark dark:text-primary-base text-lg text-center font-medium mb-12">
          Top Selling Brazilian Sugars - ICUMSA 45 and VHP 600-1200.
        </p>

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
      <div className="relative w-full h-[80vh] mt-16">
        <Image
          src="/images/commodity_bg.jpg"
          alt="Footer Image"
          fill
          className="object-cover"
        />
      </div>
    </>
  )
}

export default CommodityPage
