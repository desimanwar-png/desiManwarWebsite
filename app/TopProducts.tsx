import { getAllProducts } from './admin/products/actions'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Package } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default async function TopProducts() {
  const result = await getAllProducts()

  // Filter for visible products; fallback to all if none are visible
  let products: any[] = []
  if (result.status === 'success' && result.products) {
    const visible = result.products.filter((p) => p.productVisibility)
    products =
      visible.length > 0 ? visible.slice(0, 4) : result.products.slice(0, 4)
  }

  return (
    <section suppressHydrationWarning className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Our Top Products
          </h2>
          <p className="text-muted-foreground">Discover our finest selection</p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {products.map((product) => (
              <Card
                suppressHydrationWarning
                key={product._id}
                className="overflow-hidden hover:shadow-xl transition-all border-border bg-card"
              >
                <div className="relative h-56 bg-muted/20 border-b border-border">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      height={1920}
                      width={1920}
                      className="h-full object-contain p-4"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      <Package className="w-12 h-12" />
                    </div>
                  )}
                </div>
                <CardContent className="p-4 space-y-3">
                  <h3 className="text-lg font-semibold text-card-foreground">
                    {product.name}
                  </h3>
                  <Badge variant="secondary" className="text-xs font-medium">
                    {product.category}
                  </Badge>
                  {product.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  <Link href={`/products/${product.slug}`}>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No products available at the moment.
            </p>
          </div>
        )}

        {/* See More Link */}
        <div className="text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            See More <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
