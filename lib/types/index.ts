// Common types used across the application

export type Currency = 'GBP' | 'EUR'

export type Region = 'UK' | 'EU'

export interface RegionSettings {
  region: Region
  currency: Currency
}

export interface Product {
  id: string
  handle: string
  title: string
  description: string
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  images: {
    edges: Array<{
      node: {
        url: string
        altText: string | null
      }
    }>
  }
  variants: {
    edges: Array<{
      node: ProductVariant
    }>
  }
}

export interface ProductVariant {
  id: string
  title: string
  priceV2: {
    amount: string
    currencyCode: string
  }
  availableForSale: boolean
  selectedOptions: Array<{
    name: string
    value: string
  }>
}

export interface CartItem {
  variantId: string
  quantity: number
  product: Product
  variant: ProductVariant
}

export interface Cart {
  id: string
  items: CartItem[]
  totalQuantity: number
  subtotal: string
  currencyCode: string
}

export interface BoxCycle {
  id: string
  title: string
  quarter: string
  year: string
  description: string
  theme?: string
  imageUrl: string
  cutoffDate: string
  shipDate: string
  isAvailable: boolean
  digitalExtras?: {
    spotifyPlaylist?: string
    qaSessions?: string[]
    downloads?: Array<{
      title: string
      url: string
    }>
  }
}

export interface FAQItem {
  question: string
  answer: string
  category: 'subscription' | 'shipping' | 'payment' | 'gifting' | 'publishers'
}

export interface Testimonial {
  id: string
  author: string
  role?: string
  content: string
  imageUrl?: string
  rating?: number
}

