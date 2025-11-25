'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

interface ProductDetailsProps {
  handle: string
}

export function ProductDetails({ handle }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState('default')

  // Mock product data - in production, fetch from Shopify
  const product = {
    title: 'Romance Reading Candle',
    price: '£24.00',
    description: 'Hand-poured soy candle with notes of vanilla, amber, and sandalwood. Perfect for creating a cozy reading atmosphere.',
    longDescription: 'Our Romance Reading Candle is carefully crafted to enhance your reading experience. Made with premium soy wax and natural fragrances, this candle burns clean for up to 40 hours. The warm, inviting scent creates the perfect ambiance for getting lost in your favorite romance novel.',
    variants: [
      { id: '1', title: 'Standard Size', available: true },
    ],
    images: ['/images/product-placeholder.jpg'],
  }

  const handleAddToCart = () => {
    // TODO: Implement Shopify cart functionality
    console.log('Add to cart', { handle, quantity, selectedVariant })
  }

  return (
    <div className="py-16 md:py-24">
      <Container>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Image gallery */}
          <div>
            <div className="aspect-square bg-grey-200 border border-ink-900/10 mb-4" />
            {/* Thumbnail gallery would go here */}
          </div>

          {/* Product info */}
          <div>
            <h1 className="mb-4">{product.title}</h1>
            <div className="text-3xl font-serif mb-6">{product.price}</div>
            
            <p className="text-lg text-ink-800 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Variants */}
            {product.variants.length > 1 && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">Size</label>
                <div className="flex gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant.id)}
                      disabled={!variant.available}
                      className={`px-4 py-2 border transition-colors ${
                        selectedVariant === variant.id
                          ? 'border-ink-900 bg-ink-900 text-paper-50'
                          : 'border-ink-900/20 hover:border-ink-900'
                      } ${!variant.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {variant.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-medium mb-3">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-ink-900/20 hover:border-ink-900 transition-colors"
                >
                  −
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-ink-900/20 hover:border-ink-900 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <Button onClick={handleAddToCart} size="lg" fullWidth className="mb-6">
              Add to Cart
            </Button>

            <div className="text-sm text-grey-600 space-y-1">
              <p>• Free shipping to UK & EU</p>
              <p>• 30-day return policy</p>
              <p>• Ships within 3-5 business days</p>
            </div>
          </div>
        </div>

        {/* Long description */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-3xl mb-6">Product Details</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-ink-800 leading-relaxed">{product.longDescription}</p>
          </div>
        </div>
      </Container>
    </div>
  )
}

