import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'

export function SneakPeak() {
  // Teaser items - easy to swap with real content later
  const teaserItems = [
    {
      id: '1',
      title: 'Featured Book',
      description: 'A swoon-worthy indie romance with unforgettable characters and a guaranteed HEA.',
      imageSlot: true,
    },
    {
      id: '2',
      title: 'Bookish Candle',
      description: 'Hand-poured soy candle with a scent inspired by the featured book\'s setting.',
      imageSlot: true,
    },
    {
      id: '3',
      title: 'Character Art Print',
      description: 'Exclusive artwork featuring beloved characters from this quarter\'s selection.',
      imageSlot: true,
    },
    {
      id: '4',
      title: 'Themed Bookmark',
      description: 'A beautifully designed bookmark that complements this quarter\'s theme.',
      imageSlot: true,
    },
  ]

  return (
    <Section withBorder background="grey" id="sneak-peak">
      <div className="text-center mb-16">
        <h2 className="mb-4">Sneak Peak</h2>
        <p className="text-lg text-ink-800 max-w-2xl mx-auto">
          Get a glimpse of what&apos;s coming in the next box
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {teaserItems.map((item) => (
          <Card key={item.id} className="overflow-hidden" hoverable>
            {/* Image placeholder slot */}
            <div className="aspect-square bg-grey-200 border-b border-ink-900/10 flex items-center justify-center">
              <span className="text-grey-400 text-sm">Image coming soon</span>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-serif mb-2">{item.title}</h3>
              <p className="text-sm text-ink-800 leading-relaxed">
                {item.description}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-sm text-grey-600">
          Final contents may vary. Subscribe to see the full reveal!
        </p>
      </div>
    </Section>
  )
}

