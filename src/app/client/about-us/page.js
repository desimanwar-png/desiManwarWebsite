import { Blend, Headset, ShieldCheck, Truck } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import AboutUs from '../home/AboutUs'
import OurMembers from '../home/OurMembers'

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

function AboutUsPage() {
  {
    /* return <div className="px-4 lg:px-20"> */
  }
  return (
    <div>
      <div className="relative">
        <Image
          src="/images/about-us-2.jpg"
          alt="about-us"
          height={100}
          width={500}
          className="w-full aspect-video object-contain"
        />
        <div className="absolute top-0 bg-gradient-to-l from-secondary-dark to-transparent w-full aspect-video">
          <div className="h-full flex items-center px-4 lg:px-20">
            <h1 className="text-4xl lg:text-8xl text-secondary-dark font-bold ">
              About{' '}
              <span className="bg-gradient-to-tr from-primary-base to-accent-base bg-clip-text text-transparent">
                Us
              </span>
            </h1>
          </div>
        </div>
      </div>
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
      <OurMembers />
      {/* <div className="px-4 lg:px-20 h-screen"></div> */}
    </div>
  )
}

export default AboutUsPage
