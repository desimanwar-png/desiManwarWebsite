'use client'

import React, { useState, useEffect } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
import { isMobile as detectMobile } from 'react-device-detect'

// Define the plugin outside to avoid re-creating it unnecessarily
const plugin = Autoplay({ delay: 3000 })

function HeroSectionCarousel() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check device type after component mounts
    setIsMobile(detectMobile)
  }, [])

  if (isMobile === null) {
    return null // Render nothing until hydration completes
  }

  return (
    <div>
      {!isMobile ? (
        <Carousel
          plugins={[plugin]}
          className="w-full h-[95vh]"
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
                        width={1920}
                        height={1080}
                        className="h-full w-full brightness-50"
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
                              <Button
                                text="Read More"
                                className="mr-8 px-8 hover:bg-transparent hover:dark:bg-transparent"
                              />
                            </Link>
                            <Link href="/client/get-a-quote">
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
        </Carousel>
      ) : (
        <Carousel
          plugins={[plugin]}
          className="w-full h-[95vh]"
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
                              <Button
                                text="Read More"
                                className="lg:mr-8 px-8 hover:bg-transparent hover:dark:bg-transparent w-full"
                              />
                            </Link>
                            <Link href="/client/get-a-quote">
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
        </Carousel>
      )}
    </div>
  )
}

export default HeroSectionCarousel
