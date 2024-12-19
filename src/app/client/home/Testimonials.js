import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import React from 'react'

function Testimonials() {
  return (
    <div className="px-4 lg:px-20 bg-primary-dark pt-16 py-20">
      <div className="flex justify-center text-5xl lg:text-7xl font-semibold pb-6 bg-gradient-to-tr from-primary-base to-accent-base bg-clip-text text-transparent">
        <h1 className="py-4">_ Testimonials _</h1>
      </div>
      <div>
        <Carousel
          className="w-full "
          opts={{
            loop: true,
          }}
        >
          <CarouselContent className="-ml-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-2xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}

export default Testimonials
