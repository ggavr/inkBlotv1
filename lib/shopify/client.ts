import { GraphQLClient } from 'graphql-request'

const endpoint = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`

export const shopifyClient = new GraphQLClient(endpoint, {
  headers: {
    'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
    'Content-Type': 'application/json',
  },
})

export async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string
  variables?: Record<string, any>
}): Promise<T> {
  try {
    const data = await shopifyClient.request<T>(query, variables)
    return data
  } catch (error) {
    console.error('Shopify API Error:', error)
    throw error
  }
}

