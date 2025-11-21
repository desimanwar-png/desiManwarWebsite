'use client'

import { getAllTestimonials } from './admin/testimonials/actions'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface Testimonial {
  _id: string
  name: string
  message: string
  rating: number
  profileImage?: string
  isApproved: boolean
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    async function fetchTestimonials() {
      const result = await getAllTestimonials()
      if (result.success && result.testimonials) {
        const approved = result.testimonials.filter(
          (t: Testimonial) => t.isApproved
        )
        setTestimonials(approved)
      }
      setLoading(false)
    }
    fetchTestimonials()
  }, [])

  useEffect(() => {
    if (testimonials.length <= 1 || isPaused) return

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [testimonials.length, isPaused])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    )
  }

  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <p className="text-secondary-500 dark:text-secondary-400">
            Loading testimonials...
          </p>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return null // Don't show section if no testimonials
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Testimonials
          </h2>
          <p className="text-muted-foreground">What our clients say about us</p>
        </div>

        {/* Testimonial Carousel */}
        <div
          className="mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <Card className="relative bg-card border-border">
            <CardContent className="p-8 md:p-12">
              {/* Profile Image or Quote Icon */}
              <div className="flex justify-center mb-6">
                {currentTestimonial.profileImage ? (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted border-2 border-border shadow-md">
                    <Image
                      src={currentTestimonial.profileImage}
                      alt={currentTestimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <Quote className="w-8 h-8" />
                  </div>
                )}
              </div>

              {/* Rating */}
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(Number(currentTestimonial.rating))
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>

              {/* Message */}
              <p className="text-base md:text-lg text-card-foreground text-center mb-4 leading-relaxed italic">
                "{currentTestimonial.message}"
              </p>

              {/* Name */}
              <p className="text-lg font-semibold text-primary text-center">
                {currentTestimonial.name}
              </p>

              {/* Navigation Arrows */}
              {testimonials.length > 1 && (
                <>
                  <button
                    onClick={prevTestimonial}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-muted hover:bg-muted/80 text-muted-foreground p-2 rounded-full transition-colors shadow-sm"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-muted hover:bg-muted/80 text-muted-foreground p-2 rounded-full transition-colors shadow-sm"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Indicators */}
          {testimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary w-6'
                      : 'bg-muted-foreground/30 w-1.5 hover:bg-primary/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
