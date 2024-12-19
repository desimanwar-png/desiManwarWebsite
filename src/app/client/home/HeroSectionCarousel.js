'use client'

import React from 'react'
import Autoplay from 'embla-carousel-autoplay'

import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'
import { Dot } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/Button'

// Define the plugin outside to avoid re-creating it unnecessarily
const plugin = Autoplay({ delay: 3000 })

function HeroSectionCarousel() {
  return (
    <div>
      <Carousel
        plugins={[plugin]}
        className="w-full h-[95vh] hidden lg:flex"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {Array.from({ length: 4 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="">
                <Card className="h-full w-full">
                  <CardContent className="flex h-[90vh] items-center justify-center">
                    <Image
                      src={`/images/hero-pc-${index + 1}.jpg`}
                      alt="hero"
                      width={1500}
                      height={1000}
                      className="aspect-[2/1.5] object-contain brightness-50"
                    />
                    {/* Gradient Overlay */}
                    <div className="w-full aspect-[2/1] absolute bg-gradient-to-r from-black/100 to-transparent">
                      <div className="absolute flex flex-col justify-center items-baseline inset-0 px-20 mx-2">
                        <p className=" text-md text-secondary-base font-semibold tracking-wider">
                          Welcome to DESI MANWAR
                        </p>
                        <h1 className="text-6xl font-extrabold max-w-[27rem] text-primary-base">
                          Savor the true essence of Indian flavors
                          <div className="inline-block ml-1 bg-accent-base h-2 aspect-square rounded-full" />
                        </h1>
                        <div className="flex my-4">
                          <Link href="/client/read-more">
                            {/* //TODO: Add read more page */}
                            <Button
                              text="Read More"
                              className="mr-8 px-8 hover:bg-transparent hover:dark:bg-transparent"
                            />
                          </Link>
                          <Link href="/client/get-a-quote">
                            {/* //TODO: Add read more page */}
                            <Button
                              text="Get A Quote"
                              className="mr-8 px-8"
                              outline={true}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious /> */}
        {/* <CarouselNext /> */}
      </Carousel>

      <Carousel
        plugins={[plugin]}
        className="w-full h-[95vh] flex lg:hidden"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {Array.from({ length: 4 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="">
                <Card className="h-full w-full">
                  <CardContent className="flex h-[90vh] items-center justify-center">
                    <Image
                      src={`/images/hero-mobile-${index + 1}.jpg`}
                      alt="hero"
                      width={1000}
                      height={1500}
                      className="aspect-[1/2] object-cover brightness-50"
                    />
                    {/* Gradient Overlay */}
                    <div className="w-full aspect-[1/1.75] absolute bg-gradient-to-r from-black/100 to-transparent">
                      <div className="absolute flex flex-col justify-center items-baseline inset-0 px-4 lg:px-20 mx-2">
                        <p className=" text-md text-secondary-base font-semibold tracking-wider">
                          Welcome to DESI MANWAR
                        </p>
                        <h1 className="text-6xl font-extrabold max-w-[27rem] text-primary-base">
                          Savor the true essence of Indian flavors
                          <div className="inline-block ml-1 bg-accent-base h-2 aspect-square rounded-full" />
                        </h1>
                        <div className="flex flex-col gap-4 my-4">
                          <Link href="/client/read-more">
                            {/* //TODO: Add read more page */}
                            <Button
                              text="Read More"
                              className="lg:mr-8 px-8 hover:bg-transparent hover:dark:bg-transparent w-full"
                            />
                          </Link>
                          <Link href="/client/get-a-quote">
                            {/* //TODO: Add read more page */}
                            <Button
                              text="Get a Quote"
                              className="mr-8 px-8 w-full"
                              outline={true}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious /> */}
        {/* <CarouselNext /> */}
      </Carousel>
    </div>
  )
}

export default HeroSectionCarousel
