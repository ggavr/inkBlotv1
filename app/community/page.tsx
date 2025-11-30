import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { DiscordAccess } from '@/components/community/DiscordAccess'

export const metadata = {
  title: 'Community | Inkblot Crew',
  description: 'Join our community of indie romance readers. Book club discussions, author Q&As, and exclusive events.',
}

export default function CommunityPage() {
  const features = [
    {
      icon: '📚',
      title: 'Monthly Book Club',
      description: 'Deep-dive discussions on featured titles with fellow readers. Share your thoughts, theories, and favorite moments.',
    },
    {
      icon: '💬',
      title: 'Private Community Space',
      description: 'Connect with other members in our Discord server. Chat about books, share recommendations, and make friends.',
    },
    {
      icon: '🎤',
      title: 'Author Q&As',
      description: 'Exclusive access to live and recorded Q&A sessions with the indie authors featured in each box.',
    },
    {
      icon: '✨',
      title: 'Digital Events',
      description: 'Participate in read-alongs, themed events, and special celebrations throughout the year.',
    },
  ]

  return (
    <>
      <Section className="pt-32 pb-16" background="white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-6">Join the Crew</h1>
          <p className="text-xl md:text-2xl text-ink-800 leading-relaxed mb-8">
            Reading is better together. Connect with passionate indie romance readers, 
            participate in book club discussions, and get exclusive access to author events.
          </p>
        </div>
      </Section>

      {/* Discord Access Section - Auth-gated */}
      <DiscordAccess />

      <Section withBorder background="grey">
        <div className="text-center mb-16">
          <h2 className="mb-4">What&apos;s Included</h2>
          <p className="text-lg text-ink-800 max-w-2xl mx-auto">
            All community features are included with your subscription at no extra cost
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature) => (
            <Card key={feature.title} className="p-8">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl mb-3">{feature.title}</h3>
              <p className="text-ink-800 leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section withBorder background="white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-12">How It Works</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl mb-3">1. Subscribe</h3>
              <p className="text-lg text-ink-800 leading-relaxed">
                When you subscribe to the quarterly box, you automatically get full access to all community features.
              </p>
            </div>

            <div>
              <h3 className="text-2xl mb-3">2. Get Your Invite</h3>
              <p className="text-lg text-ink-800 leading-relaxed">
                After your first payment, you&apos;ll receive an email with instructions to join our private Discord server and access digital content.
              </p>
            </div>

            <div>
              <h3 className="text-2xl mb-3">3. Start Connecting</h3>
              <p className="text-lg text-ink-800 leading-relaxed">
                Introduce yourself, browse upcoming events, and start chatting with fellow readers. The book club schedule is posted monthly.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}

