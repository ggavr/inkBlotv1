import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export const metadata = {
  title: 'Collaborate | Inkblot Crew',
  description: 'Partner with Inkblot Crew. Collaboration opportunities for brands, influencers, and creators.',
}

export default function CollaboratePage() {
  return (
    <>
      <Section className="pt-32 pb-16" background="white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-6">Collaborate With Us</h1>
          <p className="text-xl md:text-2xl text-ink-800 leading-relaxed mb-8">
            We&apos;re always looking for creative partners who share our passion for indie romance.
          </p>
        </div>
      </Section>

      <Section withBorder background="grey">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-12">Partnership Opportunities</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-paper-50 border border-ink-900/10">
              <h3 className="text-2xl mb-4">Brand Collaborations</h3>
              <p className="text-ink-800 leading-relaxed mb-4">
                Partner with us for co-branded merchandise, exclusive box inclusions, 
                or sponsored content that resonates with our community of romance readers.
              </p>
            </div>

            <div className="p-8 bg-paper-50 border border-ink-900/10">
              <h3 className="text-2xl mb-4">Influencer Partnerships</h3>
              <p className="text-ink-800 leading-relaxed mb-4">
                Are you a bookstagrammer, BookToker, or book blogger? We&apos;d love to 
                work with content creators who are passionate about indie romance.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section withBorder background="white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-6">Get in Touch</h2>
          <p className="text-lg text-ink-800 leading-relaxed mb-8">
            Interested in collaborating? We&apos;d love to hear from you.
          </p>
          <p className="text-ink-900 mb-8">
            Email us at{' '}
            <a href="mailto:collaborate@inkblotcrew.com" className="underline hover:no-underline">
              collaborate@inkblotcrew.com
            </a>
          </p>
          <Button asChild variant="outline" size="lg">
            <Link href="/about">Learn More About Us</Link>
          </Button>
        </div>
      </Section>
    </>
  )
}

