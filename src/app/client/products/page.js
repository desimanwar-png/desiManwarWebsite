'use client'

import { getProducts } from '@/app/admin/products/actions'
import Card from '@/components/Card'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function ProductsPage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getProducts()

      if (result.status === 'success') {
        setProducts(result.data)
      } else {
        console.error('Failed to fetch products:', result.message)
      }
    }

    fetchProducts()
  }, [])

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
      <div className="px-4 lg:px-20 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <Card
            key={index}
            title={product.name}
            content={product.description}
            imageBase64={product.image}
            glow={false}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductsPage
