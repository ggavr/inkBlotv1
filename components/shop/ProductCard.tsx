import Link from 'next/link'
import { Card } from '@/components/ui/Card'

interface ProductCardProps {
  product: {
    id: string
    handle: string
    title: string
    price: string
    imageUrl: string
    tags?: string[]
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.handle}`}>
      <Card hoverable className="overflow-hidden group">
        <div className="aspect-square bg-grey-200 overflow-hidden">
          {/* Product image would go here */}
          <div className="w-full h-full bg-grey-200 group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="p-4">
          {product.tags && product.tags.length > 0 && (
            <p className="text-xs text-grey-500 mb-1">{product.tags[0]}</p>
          )}
          <h3 className="font-sans text-base font-medium mb-2 line-clamp-2">
            {product.title}
          </h3>
          <p className="font-medium text-ink-900">{product.price}</p>
        </div>
      </Card>
    </Link>
  )
}

