'use client'

import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import React, { useEffect, useState } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { StarRating } from '@/components/StarRating'
import imageCompression from 'browser-image-compression'
import convertToBase64 from '@/lib/convertToBase64'
import Image from 'next/image'
import {
  addTestimonial,
  getTestimonials,
} from '@/app/admin/testimonials/actions'
import { toast } from '@/hooks/use-toast'
import { Star, Star as StarOutline } from 'lucide-react'

const plugin = Autoplay({ delay: 3000 })

function Testimonials() {
  const [rating, setRating] = useState(0)
  const [preview, setPreview] = useState({ myFile: '/images/dummyImage.jpg' })
  const [testimonials, setTestimonials] = useState([])

  const handleImageChange = async (e) => {
    const file = e.target.files[0]

    const compressedFile = await imageCompression(file, {
      maxSizeMB: 0.05,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    })
    const base64 = await convertToBase64(compressedFile)
    setPreview({ ...preview, myFile: base64 })
  }

  const handleSubmit = async (formData) => {
    formData.set('image', preview.myFile)
    formData.set('rating', rating)

    const res = await addTestimonial(formData)

    if (res.status === 'success') {
      toast({
        title: 'Success',
        description: res.message + '. It will be visible so on our Website.',
        variant: 'default',
      })
    } else {
      toast({
        title: 'Error',
        description: res.message,
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    async function fetchData() {
      const res = await getTestimonials(true)

      if (res.status === 'success') {
        setTestimonials(res.testimonials)
      } else {
        console.error(res.message)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="px-4 lg:px-20 bg-primary-dark pt-16 py-20">
      <div className="flex justify-center text-4xl lg:text-7xl font-semibold pb-6 bg-gradient-to-tr from-primary-base to-accent-base bg-clip-text text-transparent">
        <h1 className="py-4">_ Testimonials _</h1>
      </div>
      <div>
        <Carousel
          plugins={[plugin]}
          className="w-full "
          opts={{
            loop: true,
          }}
        >
          <CarouselContent className="-ml-1">
            {testimonials?.map((testimonial) => (
              <CarouselItem key={testimonial._id} className="pl-1 basis-full">
                <div className="p-1">
                  <Card className="w-full rounded-lg">
                    <CardContent className="flex flex-col gap-2 items-center text-center p-6">
                      {testimonial.profileImage && (
                        <Image
                          src={testimonial.profileImage}
                          alt={testimonial.name}
                          width={64}
                          height={64}
                          className="rounded-full object-cover w-32 h-32"
                        />
                      )}
                      <p className="text-lg dark:text-primary-base font-semibold">
                        {testimonial.name}
                      </p>
                      <p className="text-sm dark:text-primary-base/50 text-muted-foreground">
                        {testimonial.message}
                      </p>
                      <div className="flex items-center justify-center gap-1 text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>
                            {i < testimonial.rating ? (
                              <Star className="fill-yellow-500 w-5 h-5" />
                            ) : (
                              <Star className="w-5 h-5" />
                            )}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <Sheet>
          <SheetTrigger asChild>
            <div className="w-full flex justify-end cursor-pointer">
              <span className="inline-block lg:text-xl font-semibold tracking-wide hover:text-accent-base hover:scale-105 transition-transform ease-in-out">
                Share Your Experience
              </span>
            </div>
          </SheetTrigger>

          <SheetContent side="right" className="space-y-4 p-6">
            <SheetHeader>
              <SheetTitle>Write a Testimonial</SheetTitle>
              <SheetDescription>
                We'd love to hear what you think about our products.
              </SheetDescription>
            </SheetHeader>

            <form
              className="space-y-4"
              action={async (formData) => handleSubmit(formData)}
            >
              <Input type="text" name="name" placeholder="Your Name" required />
              <Textarea name="message" placeholder="Your Message" required />
              <div>
                <label className="text-sm font-medium mb-1 block">Rating</label>
                <StarRating value={rating} onChange={setRating} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Profile Image (optional)
                </label>
                <Image
                  src={preview.myFile}
                  alt="Profile Preview"
                  className="w-32 h-32 object-cover mb-2 rounded-md border"
                  width={128}
                  height={128}
                />
                <Input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleImageChange}
                />
              </div>

              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default Testimonials
