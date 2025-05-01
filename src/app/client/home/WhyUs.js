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
    title: 'Authenticity and Purity',
    desc: 'We are committed to delivering genuine, unadulterated products that reflect the rich agricultural heritage of India.',
  },
  {
    icon: (
      <ShieldCheck
        size={75}
        className="p-4 mb-4 shadow-md border border-secondary-dark dark:border-primary-base rounded"
      />
    ),
    title: 'Direct Sourcing',
    desc: 'Our direct relationships with local farmers ensure the highest quality and authenticity of our products.',
  },
  {
    icon: (
      <Truck
        size={75}
        className="p-4 mb-4 shadow-md border border-secondary-dark dark:border-primary-base rounded"
      />
    ),
    title: 'Global Reach',
    desc: 'We cater to diverse markets worldwide, ensuring the availability of authentic Indian agriculture products globally.',
  },
  {
    icon: (
      <Headset
        size={75}
        className="p-4 mb-4 shadow-md border border-secondary-dark dark:border-primary-base rounded"
      />
    ),
    title: 'Sustainable Practices',
    desc: 'Our sourcing and production methods are environmentally conscious, promoting sustainable farming and ethical practices.',
  },
]

function WhyUs() {
  return (
    <div className="w-screen flex flex-col lg:flex-row text-primary-base h-[140vh] lg:h-screen">
      <div className="w-full lg:w-1/2 px-4 lg:pl-20 lg:pr-20 bg-primary-dark flex flex-col justify-center pb-12 lg:pb-0">
        <h1 className="text-5xl lg:text-6xl font-semibold text-secondary-dark mt-16 lg:mt-0">
          Why Choose Desi Manwar _
        </h1>
        <div className="flex">
          <p className="text-accent-base text-justify text-lg font-semibold mt-4 leading-6">
            The Desi Manwar Advantange -
            <span className="text-primary-base px-2">
              Choose us for authentic and high quality Indian agriculture
              products that showcase the diversity of Indian farming.
            </span>
          </p>
        </div>
        <div className="flex flex-col lg:flex-row mt-8 lg:justify-start space-y-8 lg:space-y-0 lg:space-x-8">
          <div className="grid grid-cols-1 gap-6">
            {points.map((point, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="min-w-[40px] min-h-[40px] lg:min-w-[32px] lg:min-h-[32px]">
                  {point.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl lg:text-2xl font-extrabold text-secondary-dark">
                    {point.title}
                  </h3>
                  <p className="text-base lg:text-lg text-justify text-secondary-dark/75 font-semibold">
                    {point.desc}
                  </p>
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
