'use client'

import { useCartStore } from '@/lib/store/useCartStore'

export function CartButton() {
  const { toggleCart } = useCartStore()
  // TODO: Get actual cart quantity from Shopify
  const itemCount = 0

  return (
    <button
      onClick={toggleCart}
      className="relative p-2 text-ink-900 hover:text-ink-700 transition-colors"
      aria-label="Shopping cart"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
        />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-ink-900 text-paper-50 text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  )
}

