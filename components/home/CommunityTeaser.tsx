import Link from 'next/link'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'

export function CommunityTeaser() {
  return (
    <Section withBorder background="grey">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="mb-6">Join the Crew</h2>
            <p className="text-lg text-ink-800 leading-relaxed mb-4">
              Reading is better together. Connect with fellow indie romance fans, 
              participate in monthly book club discussions, and get access to 
              exclusive author Q&As and live events.
            </p>
            <p className="text-lg text-ink-800 leading-relaxed mb-6">
              Every subscription includes full access to our private community 
              and all digital events.
            </p>
            <Button asChild variant="outline" size="lg">
              <Link href="/community">Learn About the Community</Link>
            </Button>
          </div>
          <div className="aspect-square bg-grey-200 border border-ink-900/10" />
        </div>
      </div>
    </Section>
  )
}

