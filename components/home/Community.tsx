import Link from 'next/link'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export function Community() {
  const features = [
    {
      icon: '💬',
      title: 'Discussion Forums',
      description: 'Connect with fellow readers in our private community space. Share recommendations, theories, and your love of romance.',
    },
    {
      icon: '📖',
      title: 'Book Club',
      description: 'Monthly deep-dive discussions on featured titles. Read along with the crew and share your thoughts.',
    },
    {
      icon: '🎤',
      title: 'Live Events',
      description: 'Exclusive access to author Q&As, influencer chats, read-alongs, and special community celebrations.',
    },
  ]

  return (
    <Section withBorder background="grey">
      <div className="text-center mb-16">
        <h2 className="mb-4">Join the Community</h2>
        <p className="text-lg text-ink-800 max-w-2xl mx-auto">
          Reading is better together. Our community is what sets Inkblot Crew apart.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
        {features.map((feature) => (
          <Card key={feature.title} className="p-8 text-center" hoverable>
            <div className="text-5xl mb-4">{feature.icon}</div>
            <h3 className="text-2xl mb-3">{feature.title}</h3>
            <p className="text-ink-800 leading-relaxed">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>

      <div className="text-center px-4 sm:px-0">
        <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
          <Link href="/community">Learn More About Community</Link>
        </Button>
      </div>
    </Section>
  )
}

