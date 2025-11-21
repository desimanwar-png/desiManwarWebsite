import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Package } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function ProductCard({ product }: { product: any }) {
  return (
    <Card
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
      <CardContent className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-card-foreground">
          {product.name}
        </h3>
        <Badge variant="outline" className="text-xs font-medium">
          {product.category}
        </Badge>
        {product.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        )}
        <Link href={`/products/${product.slug}`} className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors">
          View Details <ArrowRight className="w-4 h-4" />
        </Link>
      </CardContent>
    </Card>
  )
}
