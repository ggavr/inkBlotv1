import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'

export const metadata = {
  title: 'For Authors | Inkblot Crew',
  description: 'Information for indie romance authors interested in being featured in Inkblot Crew subscription boxes.',
}

export default function AuthorsPage() {
  const benefits = [
    {
      icon: '📚',
      title: 'Reach New Readers',
      description: 'Get your books into the hands of engaged romance readers who love discovering indie authors.',
    },
    {
      icon: '💬',
      title: 'Community Engagement',
      description: 'Connect with readers through our book club discussions, Q&A sessions, and live events.',
    },
    {
      icon: '✨',
      title: 'Author Spotlights',
      description: 'Be featured in our digital content, newsletters, and social media channels.',
    },
    {
      icon: '🤝',
      title: 'Fair Partnerships',
      description: 'We believe in supporting indie authors and building mutually beneficial relationships.',
    },
  ]

  return (
    <>
      <Section className="pt-32 pb-16" background="white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-6">For Authors</h1>
          <p className="text-xl md:text-2xl text-ink-800 leading-relaxed mb-8">
            Join our mission to connect indie romance authors with passionate readers.
          </p>
        </div>
      </Section>

      <Section withBorder background="grey">
        <div className="text-center mb-16">
          <h2 className="mb-4">Why Partner With Us</h2>
          <p className="text-lg text-ink-800 max-w-2xl mx-auto">
            We&apos;re dedicated to showcasing the best indie romance has to offer
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="p-8">
              <div className="text-5xl mb-4">{benefit.icon}</div>
              <h3 className="text-2xl mb-3">{benefit.title}</h3>
              <p className="text-ink-800 leading-relaxed">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section withBorder background="white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-12">What We Look For</h2>
          
          <div className="space-y-6 text-lg text-ink-800 leading-relaxed">
            <p>
              We feature indie-published romance across all subgenres: contemporary, fantasy, 
              historical, paranormal, romantic suspense, and more. We prioritize:
            </p>
            
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Strong writing and character development</li>
              <li>Emotional depth and satisfying romance arcs</li>
              <li>Diverse voices and representation</li>
              <li>Professional editing and cover design</li>
            </ul>

            <p>
              We welcome debut authors as well as established indie authors. 
              If you&apos;re passionate about your craft and have a story that will resonate 
              with romance readers, we want to hear from you.
            </p>
          </div>
        </div>
      </Section>

      <Section withBorder background="grey">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-6">Submit Your Book</h2>
          <p className="text-lg text-ink-800 leading-relaxed mb-8">
            Interested in having your book featured? We&apos;d love to hear from you.
          </p>
          <p className="text-ink-900 mb-8">
            Email us at{' '}
            <a href="mailto:authors@inkblotcrew.com" className="underline hover:no-underline">
              authors@inkblotcrew.com
            </a>
            {' '}with information about your book(s).
          </p>
          <Button asChild variant="outline" size="lg">
            <Link href="/publishers">Publisher Information</Link>
          </Button>
        </div>
      </Section>
    </>
  )
}

