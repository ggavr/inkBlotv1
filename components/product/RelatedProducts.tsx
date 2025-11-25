import { Section } from '@/components/ui/Section'
import { ProductCard } from '@/components/shop/ProductCard'

export function RelatedProducts() {
  // Mock related products
  const products = [
    {
      id: '1',
      handle: 'book-lover-tote',
      title: 'Book Lover Tote Bag',
      price: '£18.00',
      imageUrl: '/images/product-placeholder.jpg',
      tags: ['Apparel'],
    },
    {
      id: '2',
      handle: 'reading-journal',
      title: 'Reading Journal',
      price: '£15.00',
      imageUrl: '/images/product-placeholder.jpg',
      tags: ['Stationery'],
    },
    {
      id: '3',
      handle: 'bookmark-set',
      title: 'Bookmark Set',
      price: '£12.00',
      imageUrl: '/images/product-placeholder.jpg',
      tags: ['Accessories'],
    },
  ]

  return (
    <Section withBorder background="grey">
      <div className="text-center mb-12">
        <h2 className="mb-4">You May Also Like</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Section>
  )
}

