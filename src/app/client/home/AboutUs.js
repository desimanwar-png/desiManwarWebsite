import Button from '@/components/Button'
import { CircleCheckBig, Users } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function AboutUs() {
  return (
    <div className="flex flex-col lg:flex-row text-primary-base h-[130vh] lg:h-screen">
      <div className="w-full lg:w-1/2 shadow-lg">
        <Image
          src="/images/about-us.jpg"
          alt="About Us"
          width={3500}
          height={500}
          className="h-full w-full object-cover rounded-tl-lg rounded-tr-lg lg:rounded-tl-none lg:rounded-tr-lg lg:rounded-br-lg"
        />
      </div>

      <div className="w-full lg:w-1/2 px-4 lg:pl-8 lg:pr-20 bg-primary-dark flex flex-col justify-center pb-12 lg:pb-0">
        <h1 className="text-5xl lg:text-6xl font-semibold text-secondary-dark mt-8 lg:mt-0">
          About Us _
        </h1>
        <p className="text-justify text-lg font-semibold mt-4 leading-6">
          Our mission is to bring the authentic flavors of India to your table,
          creating a nostalgic and memorable culinary experience. We are
          dedicated to delivering exceptional customer service, from seamless
          order processing to efficient delivery. Your satisfaction is our
          priority, and we are committed to serving you with care and
          excellence.
        </p>
        <div className="flex flex-col lg:flex-row mt-8 lg:justify-start space-y-12 lg:space-y-0 lg:space-x-12">
          <div className="flex items-center">
            <div className="p-[3px] bg-gradient-to-tl from-accent-base to-primary-base rounded-lg">
              <Users
                size={75}
                className="p-2 bg-secondary-base text-secondary-dark rounded-lg"
              />
            </div>

            <div className="pl-4">
              <h3 className="text-3xl font-bold text-primary-base mt-2">
                50 +
              </h3>
              <p className="text-lg font-semibold tracking-wider">
                Happy Clients
              </p>
            </div>
          </div>

          <div className="flex items-center mt-6">
            <div className="p-[3px] bg-gradient-to-tl from-accent-base to-primary-base rounded-lg">
              <CircleCheckBig
                size={75}
                className="p-2 bg-secondary-base text-secondary-dark rounded-lg"
              />
            </div>

            <div className="pl-4">
              <h3 className="text-3xl font-bold text-primary-base mt-2">
                179 +
              </h3>
              <p className="text-lg font-semibold tracking-wider">
                Delivery Completed
              </p>
            </div>
          </div>
        </div>
        <Button
          text="Explore More"
          outline
          className="max-w-40 mt-8 lg:mt-12 !border-primary-base !text-primary-base hover:!text-secondary-dark hover:!border-secondary-dark"
        />
      </div>
    </div>
  )
}

export default AboutUs
