import Image from 'next/image'
import React from 'react'

function ProductsPage() {
  // return <div className="px-4 lg:px-20">
  return (
    <div>
      <div className="relative">
        <Image
          src="/images/our-products.jpg"
          alt="about-us"
          height={100}
          width={500}
          className="w-full aspect-video object-contain"
        />
        <div className="absolute top-0 bg-gradient-to-l from-secondary-dark to-transparent w-full aspect-video">
          <div className="h-full flex items-center px-4 lg:px-20">
            <h1 className="text-4xl lg:text-8xl text-secondary-dark font-bold ">
              <span className="bg-gradient-to-tr from-primary-base to-accent-base bg-clip-text text-transparent">
                Our{' '}
              </span>
              Products
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
