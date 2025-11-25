import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'

export function WhatsInTheBox() {
  const inclusions = [
    {
      icon: '📚',
      title: 'Indie Romance Books',
      description: '1-2 handpicked titles from talented independent authors across diverse romance subgenres.',
    },
    {
      icon: '✨',
      title: 'Bookish Goodies',
      description: 'Curated merchandise like candles, stationery, bookmarks, and other cozy reading essentials.',
    },
    {
      icon: '🎵',
      title: 'Digital Extras',
      description: 'Exclusive Spotify playlists, recorded author Q&As, and downloadable content for each box.',
    },
    {
      icon: '💬',
      title: 'Community Access',
      description: 'Join our book club discussions, connect with fellow readers, and participate in live events.',
    },
  ]

  return (
    <Section withBorder background="white">
      <div className="text-center mb-16">
        <h2 className="mb-4">What&apos;s in the Box</h2>
        <p className="text-lg text-ink-800 max-w-2xl mx-auto">
          Every quarterly box is packed with carefully selected items to enhance your reading experience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {inclusions.map((item) => (
          <Card key={item.title} className="p-8" hoverable>
            <div className="text-5xl mb-4">{item.icon}</div>
            <h3 className="text-2xl mb-3">{item.title}</h3>
            <p className="text-ink-800 leading-relaxed">
              {item.description}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  )
}

