import Button from '@/components/Button'
import {
  Blend,
  CircleCheckBig,
  Headset,
  ShieldCheck,
  Truck,
  Users,
} from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const points = [
  {
    icon: (
      <Blend
        size={75}
        className="p-4 mb-4 shadow-md border border-secondary-dark dark:border-primary-base rounded "
      />
    ),
    title: 'Exquisite Spice Blends',
  },
  {
    icon: (
      <ShieldCheck
        size={75}
        className="p-4 mb-4 shadow-md border border-secondary-dark dark:border-primary-base rounded"
      />
    ),
    title: 'Premium Quality Guaranteed',
  },
  {
    icon: (
      <Truck
        size={75}
        className="p-4 mb-4 shadow-md border border-secondary-dark dark:border-primary-base rounded"
      />
    ),
    title: 'Global Shipping Solutions',
  },
  {
    icon: (
      <Headset
        size={75}
        className="p-4 mb-4 shadow-md border border-secondary-dark dark:border-primary-base rounded"
      />
    ),
    title: 'Dedicated Customer Care',
  },
]

function WhyUs() {
  return (
    <div className="w-screen flex flex-col lg:flex-row text-primary-base h-[140vh] lg:h-screen">
      <div className="w-full lg:w-1/2 px-4 lg:pl-20 lg:pr-20 bg-primary-dark flex flex-col justify-center pb-12 lg:pb-0">
        <h1 className="text-5xl lg:text-6xl font-semibold text-secondary-dark mt-16 lg:mt-0">
          Why Choose Us _
        </h1>
        <p className="text-justify text-lg font-semibold mt-4 leading-6">
          Our mission is to bring the authentic flavors of India to your table,
          creating a nostalgic and memorable culinary experience. We are
          dedicated to delivering exceptional customer service, from seamless
          order processing to efficient delivery. Your satisfaction is our
          priority, and we are committed to serving you with care and
          excellence.
        </p>
        <div className="flex flex-col lg:flex-row mt-8 lg:justify-start space-y-8 lg:space-y-0 lg:space-x-8">
          <div className="grid grid-cols-1">
            {points.map((point, index) => (
              <div key={index} className="flex items-center ">
                {point.icon}
                <div className="pl-4">
                  <h3 className="text-xl lg:text-2xl text-secondary-dark">
                    {point.title.split(' ')[0]}
                  </h3>
                  <h3 className="text-xl lg:text-2xl font-extrabold text-secondary-dark">
                    {point.title.split(' ')[1]} {point.title.split(' ')[2]}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 shadow-lg">
        <Image
          src="/images/why-us.jpg"
          alt="About Us"
          width={3500}
          height={500}
          className="h-full w-full object-cover rounded-bl-lg rounded-br-lg lg:rounded-br-none lg:rounded-tl-lg lg:rounded-bl-lg"
        />
      </div>
    </div>
  )
}

export default WhyUs
