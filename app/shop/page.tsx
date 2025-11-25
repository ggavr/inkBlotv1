import { ProductGrid } from '@/components/shop/ProductGrid'
import { ShopFilters } from '@/components/shop/ShopFilters'
import { Container } from '@/components/ui/Container'

export const metadata = {
  title: 'Shop | Inkblot Crew',
  description: 'Browse our curated collection of bookish merchandise. Candles, apparel, stationery, and more.',
}

export default function ShopPage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <div className="mb-12">
          <h1 className="mb-4">Shop</h1>
          <p className="text-xl text-ink-800 max-w-2xl">
            Discover bookish goodies to enhance your reading experience
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <ShopFilters />
          </aside>
          <main className="lg:col-span-3">
            <ProductGrid />
          </main>
        </div>
      </Container>
    </div>
  )
}

