import Card from '@/components/Card'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function OurProducts({ products }) {
  return (
    <div className="px-4 lg:px-20 h-[100vh] lg:h-[100vh]">
      <div className="flex justify-center py-12">
        <h1 className="text-3xl lg:text-5xl font-semibold">
          _ Our Top Products _
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/client/products/${product.slug}`}
            className="hover:scale-105 transition-all ease-in-out"
          >
            <Card
              title={product.name}
              content={product.description}
              imageBase64={product.image}
              glow={false}
            />
          </Link>
        ))}
      </div>

      <div className="w-full py-4 dark:text-secondary-base hover:text-secondary-base dark:hover:text-accent-base mb-24">
        <Link
          href="/client/products"
          className="float-end flex gap-2 hover:scale-105 transition-all ease-in-out text-xl cursor-pointer mx-2"
        >
          See More <ArrowRight size={25} />
        </Link>
      </div>
    </div>
  )
}

export default OurProducts
