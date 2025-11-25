import { CartContent } from '@/components/cart/CartContent'
import { Section } from '@/components/ui/Section'

export const metadata = {
  title: 'Cart | Inkblot Crew',
  description: 'Review your cart and proceed to checkout.',
}

export default function CartPage() {
  return (
    <Section className="pt-24 pb-32">
      <div className="max-w-5xl mx-auto">
        <h1 className="mb-12">Your Cart</h1>
        <CartContent />
      </div>
    </Section>
  )
}

