import { createClient } from 'next-sanity'
import { sanityConfig } from './config'

export const sanityClient = createClient(sanityConfig)

// Helper function to get image URLs
export function urlForImage(source: any) {
  // This would use @sanity/image-url in production
  // For now, return a placeholder
  return source?.asset?.url || ''
}

