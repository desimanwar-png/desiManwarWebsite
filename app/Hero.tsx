'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    id: 1,
    title: 'Savor the true essence of Indian flavors',
    subtitle: 'Welcome to DESI MANWAR',
    desktopImage: '/images/hero-pc-1.jpg',
    mobileImage: '/images/hero-mobile-1.jpg',
  },
  {
    id: 2,
    title: 'Authentic Indian Agricultural Products',
    subtitle: 'Quality You Can Trust',
    desktopImage: '/images/hero-pc-2.jpg',
    mobileImage: '/images/hero-mobile-2.jpg',
  },
  {
    id: 3,
    title: 'From Farm to Your Table',
    subtitle: 'Direct Sourcing Excellence',
    desktopImage: '/images/hero-pc-3.jpg',
    mobileImage: '/images/hero-mobile-3.jpg',
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-muted">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.desktopImage}
              alt={slide.title}
              fill
              className="object-cover hidden md:block"
              priority={index === 0}
            />
            <Image
              src={slide.mobileImage}
              alt={slide.title}
              fill
              className="object-cover md:hidden"
              priority={index === 0}
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

          {/* Content */}
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <p className="text-base md:text-lg mb-3 font-medium text-primary-foreground/90">
                {slide.subtitle}
              </p>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight text-white">
                {slide.title}
              </h1>
              <div className="flex flex-wrap gap-3">
                <Link href="/about-us">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Read More
                  </Button>
                </Link>
                <Link href="/get-a-quote">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white bg-transparent hover:bg-white/10"
                  >
                    Get A Quote
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50 w-1.5'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
