'use client'

import { getTopThreeProducts } from '@/app/admin/products/actions'
import Card from '@/components/Card'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { SkeletonCard } from '@/components/SkeletonCard'

function OurProducts() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const resProducts = await getTopThreeProducts()

      if (resProducts) {
        setProducts(resProducts.data)
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div className="px-4 lg:px-20">
      <div className="flex justify-center py-12">
        <h1 className="text-3xl lg:text-5xl font-semibold">
          _ Our Top Products _
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : products.length > 0 ? (
          products.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product.slug}`}
              className="hover:scale-105 transition-all ease-in-out"
            >
              <Card
                title={product.name}
                content={product.description}
                imageBase64={product.image}
                glow={false}
              />
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">
            No products found
          </p>
        )}
      </div>

      <div className="w-full py-4 dark:text-secondary-base hover:text-secondary-base dark:hover:text-accent-base mb-24">
        <Link
          href="/products"
          className="float-end flex gap-2 hover:scale-105 transition-all ease-in-out text-xl cursor-pointer mx-2"
        >
          See More <ArrowRight size={25} />
        </Link>
      </div>
    </div>
  )
}

export default OurProducts
