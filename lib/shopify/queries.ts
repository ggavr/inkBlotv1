export const PRODUCT_FRAGMENT = `
  fragment ProductFragment on Product {
    id
    handle
    title
    description
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 10) {
      edges {
        node {
          url
          altText
        }
      }
    }
    variants(first: 100) {
      edges {
        node {
          id
          title
          priceV2 {
            amount
            currencyCode
          }
          availableForSale
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`

export const GET_PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      edges {
        cursor
        node {
          ...ProductFragment
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`

export const GET_PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`

export const GET_COLLECTION_QUERY = `
  query GetCollection($handle: String!, $first: Int!, $after: String) {
    collection(handle: $handle) {
      id
      title
      description
      products(first: $first, after: $after) {
        edges {
          cursor
          node {
            ...ProductFragment
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`

export const CART_FRAGMENT = `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              priceV2 {
                amount
                currencyCode
              }
              product {
                id
                handle
                title
                images(first: 1) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
  }
`

export const CREATE_CART_MUTATION = `
  mutation CreateCart($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`

export const ADD_TO_CART_MUTATION = `
  mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`

export const UPDATE_CART_MUTATION = `
  mutation UpdateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`

export const REMOVE_FROM_CART_MUTATION = `
  mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`

export const GET_CART_QUERY = `
  query GetCart($id: ID!) {
    cart(id: $id) {
      ...CartFragment
    }
  }
  ${CART_FRAGMENT}
`

