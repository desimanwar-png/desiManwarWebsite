import { getProductBySlug } from '@/app/admin/products/actions'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, Download, FileText } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function ProductDetailsPage({
  params,
}: {
  params: { slug: string }
}) {
  // The params object is a Promise, so we need to await it
  const awaitedParams = await params;
  const decodedSlug = decodeURIComponent(awaitedParams.slug)
  const { product } = await getProductBySlug(decodedSlug)

  if (!product) {
    notFound()
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              <div className="lg:order-2 lg:ml-5">
                <div className="max-w-xl overflow-hidden rounded-lg">
                  <Image
                    className="h-full w-full max-w-full object-cover"
                    src={product.image || '/images/dummyImage.jpg'}
                    alt={product.name}
                    width={576}
                    height={576}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl dark:text-gray-50">
              {product.name}
            </h1>
            <div className="mt-2 flex items-center">
              <Badge variant="secondary">{product.category}</Badge>
            </div>
            {product.description && product.visibility.descriptionVisibility && (
              <p className="mt-6 text-base text-gray-700 dark:text-gray-300">
                {product.description}
              </p>
            )}
            {product.isFSSAICertified && (
              <div className="mt-4 flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">FSSAI Certified</span>
              </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <Link href="/contact" className="w-full">
                <Button size="lg" className="w-full">Get a Quote</Button>
              </Link>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              {product.onePagerURL && (
                <a
                  href={product.onePagerURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button size="lg" variant="outline" className="w-full">
                    <Download className="w-5 h-5 mr-2" />
                    One Pager
                  </Button>
                </a>
              )}
              {product.coaReportURL && (
                <a
                  href={product.coaReportURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button size="lg" variant="outline" className="w-full">
                    <FileText className="w-5 h-5 mr-2" />
                    COA Report
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            Specifications
          </h3>
          {product.specification &&
          product.specification.length > 0 &&
          product.visibility.specificationVisibility ? (
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:bg-gray-800 dark:divide-gray-700">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {product.specification.map((spec: any, index: number) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                        {spec.title}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No specifications available, coming soon.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
