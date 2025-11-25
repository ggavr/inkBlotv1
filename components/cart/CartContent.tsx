'use client'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'

export function CartContent() {
  // Mock cart data - in production, fetch from Shopify
  const cartItems = []
  const subtotal = '£0.00'
  const isEmpty = cartItems.length === 0

  if (isEmpty) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-6">🛒</div>
        <h2 className="text-3xl mb-4">Your cart is empty</h2>
        <p className="text-lg text-ink-800 mb-8">
          Start adding items to your cart to get started
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/box">Subscribe to Box</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/shop">Shop Merch</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Cart items */}
      <div className="lg:col-span-2 space-y-4">
        {cartItems.map((item: any) => (
          <Card key={item.id} className="p-6">
            <div className="flex gap-6">
              <div className="w-24 h-24 bg-grey-200 border border-ink-900/10 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-medium text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-grey-600 mb-4">{item.variant}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button className="w-8 h-8 border border-ink-900/20 hover:border-ink-900 transition-colors text-sm">
                      −
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button className="w-8 h-8 border border-ink-900/20 hover:border-ink-900 transition-colors text-sm">
                      +
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <span className="font-medium">{item.price}</span>
                    <button className="text-sm text-grey-600 hover:text-ink-900 transition-colors">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Cart summary */}
      <div className="lg:col-span-1">
        <Card className="p-6 sticky top-24">
          <h3 className="text-2xl font-serif mb-6">Order Summary</h3>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-lg">
              <span className="text-grey-700">Subtotal</span>
              <span className="font-medium">{subtotal}</span>
            </div>
            <div className="pt-3 border-t border-ink-900/10">
              <p className="text-sm text-grey-600">
                Shipping and taxes calculated at checkout
              </p>
            </div>
          </div>

          <Button fullWidth size="lg" className="mb-4">
            Proceed to Checkout
          </Button>

          <Button asChild fullWidth size="lg" variant="outline">
            <Link href="/shop">Continue Shopping</Link>
          </Button>

          <div className="mt-6 pt-6 border-t border-ink-900/10">
            <div className="flex items-start gap-2 text-sm text-grey-600">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p>Secure checkout powered by Shopify</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

