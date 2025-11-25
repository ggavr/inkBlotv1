'use client'

import { useState } from 'react'
import { ProductCard } from './ProductCard'

export function ProductGrid() {
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest')

  // Mock products - in production, fetch from Shopify
  const products = [
    {
      id: '1',
      handle: 'romance-reading-candle',
      title: 'Romance Reading Candle',
      price: '£24.00',
      imageUrl: '/images/product-placeholder.jpg',
      tags: ['Candles'],
    },
    {
      id: '2',
      handle: 'book-lover-tote',
      title: 'Book Lover Tote Bag',
      price: '£18.00',
      imageUrl: '/images/product-placeholder.jpg',
      tags: ['Apparel'],
    },
    {
      id: '3',
      handle: 'reading-journal',
      title: 'Reading Journal',
      price: '£15.00',
      imageUrl: '/images/product-placeholder.jpg',
      tags: ['Stationery'],
    },
  ]

  return (
    <div>
      {/* Sort controls */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-ink-900/10">
        <p className="text-sm text-grey-600">
          {products.length} product{products.length !== 1 ? 's' : ''}
        </p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-4 py-2 text-sm border border-ink-900/20 bg-white focus:outline-none focus:ring-2 focus:ring-ink-900"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

