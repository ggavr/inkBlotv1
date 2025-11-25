import { ProductDetails } from '@/components/product/ProductDetails'
import { RelatedProducts } from '@/components/product/RelatedProducts'

export default function ProductPage({ params }: { params: { handle: string } }) {
  return (
    <>
      <ProductDetails handle={params.handle} />
      <RelatedProducts />
    </>
  )
}

