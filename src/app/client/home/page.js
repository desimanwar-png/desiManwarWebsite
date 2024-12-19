import React from 'react'
import HeroSectionCarousel from './HeroSectionCarousel'
import { Blend, Headset, ShieldCheck, Truck } from 'lucide-react'
import AboutUs from './AboutUs'
import OurProducts from './OurProducts'
import WhyUs from './WhyUs'
import OurMembers from './OurMembers'
import Testimonials from './Testimonials'
import Footer from './Footer'

const points = [
  {
    icon: (
      <Blend
        size={100}
        className="p-4 shadow-md border border-secondary-dark dark:border-primary-base rounded "
      />
    ),
    title: 'Exquisite Spice Blends',
    number: '01',
  },
  {
    icon: (
      <ShieldCheck
        size={100}
        className="p-4 shadow-md border border-secondary-dark dark:border-primary-base rounded"
      />
    ),
    title: 'Premium Quality Guaranteed',
    number: '02',
  },
  {
    icon: (
      <Truck
        size={100}
        className="p-4 shadow-md border border-secondary-dark dark:border-primary-base rounded"
      />
    ),
    title: 'Global Shipping Solutions',
    number: '03',
  },
  {
    icon: (
      <Headset
        size={100}
        className="p-4 shadow-md border border-secondary-dark dark:border-primary-base rounded"
      />
    ),
    title: 'Dedicated Customer Care',
    number: '04',
  },
]

function HomePage() {
  return (
    <div className="">
      {/* <div className="px-4 lg:px-20"> */}
      <HeroSectionCarousel />
      <div className="px-4 lg:px-20 py-20 flex flex-col lg:flex-row justify-between">
        {points.map((point, index) => (
          <div
            key={index}
            className="flex w-full justify-between px-4 py-12 lg:px-0 lg:justify-around pb-4"
          >
            <div className="">
              <div className="">{point.icon}</div>
              <div className="text-md font-semibold py-4 pr-2 tracking-wide">
                {point.title}
              </div>
            </div>
            <div className="font-extrabold text-4xl tracking-wider bg-primary-dark p-2 rounded-md">
              {point.number}
            </div>
          </div>
        ))}
      </div>
      <AboutUs />
      <OurProducts />
      <WhyUs />
      <OurMembers />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default HomePage
