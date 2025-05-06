'use server'

import React from 'react'
import dbConnect from '@/lib/dbConnect'
import Product from '@/models/Product'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export async function generateStaticParams() {
  await dbConnect()
  const products = await Product.find({}, 'slug')
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params
  return {
    title: `${resolvedParams.slug} | Product Details`,
  }
}

async function ProductBySlugPage({ params: rawParams }) {
  const params = await rawParams
  await dbConnect()
  const product = await Product.findOne({ slug: params.slug }).lean()

  if (!product) return notFound()

  return (
    <div className="px-4 md:px-12 lg:px-20 py-8 text-gray-800 dark:text-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="h-[300px] sm:h-[400px] relative bg-primary-base dark:bg-secondary-dark rounded-xl shadow-md">
          {product.image && (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain rounded-lg"
            />
          )}
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-dark dark:text-accent-base">
            {product.name}
          </h1>
          <p className="text-lg">{product.description}</p>

          <div className="text-sm">
            <p className="py-2">
              <span className="font-semibold">Category:</span>{' '}
              {product.category}
            </p>
            {/* {product.pricePerKg.amount && (
              <p>
                <span className="font-semibold">Price/Kg:</span>{' '}
                {product.pricePerKg.amount} {product.pricePerKg.currency}
              </p>
            )} */}
            {/* <p>
              <span className="font-semibold">Certified:</span>{' '}
              {product.isFSSAICertified ? 'Yes' : 'No'}
            </p> */}
            <div className="py-2">
              <span className="font-semibold">One Pager URL - </span>
              {product.onePagerURL ? (
                <Link
                  href={product.onePagerURL}
                  className="text-accent-base"
                  target="_blank"
                >
                  Link
                </Link>
              ) : (
                <span className="text-muted-foreground">Coming Soon</span>
              )}
            </div>

            <div className="py-2">
              <span className="font-semibold">COA Report URL - </span>
              {product.coaReportURL ? (
                <Link
                  href={product.coaReportURL}
                  className="text-accent-base"
                  target="_blank"
                >
                  Link
                </Link>
              ) : (
                <span className="text-muted-foreground">Coming Soon</span>
              )}
            </div>
          </div>

          {product.specification?.length > 0 && (
            <div className="pt-4">
              <h2 className="text-xl font-semibold mb-2 text-accent-base">
                Specifications
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.specification.map((spec, idx) => (
                  <li
                    key={idx}
                    className="bg-primary-base dark:bg-secondary-dark p-3 rounded"
                  >
                    <strong>{spec.title}:</strong>{' '}
                    <span className="text-primary-base/75">{spec.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductBySlugPage
