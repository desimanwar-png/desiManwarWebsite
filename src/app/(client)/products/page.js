'use client'

import { getProducts } from '@/app/admin/products/actions'
import Card from '@/components/Card'
import { SkeletonCard } from '@/components/SkeletonCard'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import Link from 'next/link'

const categories = [
  'Whole Spices',
  'Ground Spices',
  'Edible Oils',
  'Millets',
  'Pulses(Dal)',
  'Rice',
]

function ProductsPage() {
  const [products, setProducts] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const result = await getProducts(filter)

      if (result.status === 'success') {
        setProducts(result.data)
      } else {
        console.error('Failed to fetch products:', result.message)
      }
      setLoading(false)
    }

    fetchProducts()
  }, [filter])

  return (
    <div>
      {/* Banner Section */}
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
              Our{' '}
              <span className="bg-gradient-to-tr from-primary-base to-accent-base bg-clip-text text-transparent">
                Products
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="px-4 lg:px-20 py-4 flex flex-col lg:flex-row items-baseline">
        <h1 className="text-xl font-semibold pr-12">Filters </h1>
        <ToggleGroup
          type="single"
          variant="outline"
          value={filter}
          className="flex flex-wrap"
        >
          <ToggleGroupItem
            key={'all'}
            value={'all'}
            onClick={() => setFilter('all')}
          >
            All
          </ToggleGroupItem>
          {categories.map((category) => (
            <ToggleGroupItem
              key={category}
              value={category}
              onClick={() => setFilter(category)}
            >
              {category}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {/* Products / Skeleton Section */}
      <div className="px-4 lg:px-20 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          // While loading, show 6 SkeletonCards
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : products.length > 0 ? (
          // After loading, show real products
          products.map((product, index) => (
            <Link
              key={product._id}
              href={`/client/products/${product.slug}`}
              className="hover:scale-105 transition-all ease-in-out"
            >
              <Card
                key={index}
                title={product.name}
                content={product.description}
                imageBase64={product.image}
                glow={false}
              />
            </Link>
          ))
        ) : (
          <div className="text-center text-lg font-semibold col-span-3">
            No products found.
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductsPage
