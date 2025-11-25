import Link from 'next/link'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export function PastBoxes() {
  // This would come from CMS in production
  const boxes = [
    {
      id: '1',
      title: 'Winter 2025 Box',
      quarter: 'Q1 2025',
      theme: 'Cozy Reads',
      description: 'Heartwarming stories perfect for cold winter nights, featuring small-town romance and second chances.',
      imageUrl: '/images/box-placeholder.jpg',
    },
    {
      id: '2',
      title: 'Autumn 2024 Box',
      quarter: 'Q4 2024',
      theme: 'Spicy Season',
      description: 'Hot and steamy indie romances with unforgettable chemistry and passion.',
      imageUrl: '/images/box-placeholder.jpg',
    },
    {
      id: '3',
      title: 'Summer 2024 Box',
      quarter: 'Q3 2024',
      theme: 'Beach Reads',
      description: 'Light, fun romances perfect for lazy summer days and vacation reading.',
      imageUrl: '/images/box-placeholder.jpg',
    },
  ]

  return (
    <Section withBorder background="white">
      <div className="text-center mb-16">
        <h2 className="mb-4">Past & Upcoming Boxes</h2>
        <p className="text-lg text-ink-800 max-w-2xl mx-auto">
          Each quarter brings a new theme and carefully curated selection
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {boxes.map((box) => (
          <Card key={box.id} className="overflow-hidden" hoverable>
            <div className="aspect-[4/3] bg-grey-200 border-b border-ink-900/10" />
            <div className="p-6">
              <div className="text-sm text-grey-500 mb-2">{box.quarter}</div>
              <h3 className="text-2xl mb-2">{box.title}</h3>
              {box.theme && (
                <div className="text-sm font-medium text-ink-700 mb-3">
                  Theme: {box.theme}
                </div>
              )}
              <p className="text-ink-800 leading-relaxed">
                {box.description}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button asChild variant="outline" size="lg">
          <Link href="/box">View Current Box</Link>
        </Button>
      </div>
    </Section>
  )
}

