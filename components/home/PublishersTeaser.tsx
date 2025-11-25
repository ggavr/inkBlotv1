import Link from 'next/link'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'

export function PublishersTeaser() {
  return (
    <Section withBorder background="white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="mb-6">For Publishers & Authors</h2>
        <p className="text-lg text-ink-800 leading-relaxed mb-8 max-w-2xl mx-auto">
          Are you an indie romance author or publisher? Partner with us to reach 
          passionate readers through our curated quarterly boxes and engaged community.
        </p>
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="text-3xl font-serif text-ink-900 mb-2">50-100+</div>
            <p className="text-sm text-ink-800">Guaranteed readers per title</p>
          </div>
          <div>
            <div className="text-3xl font-serif text-ink-900 mb-2">UK + EU</div>
            <p className="text-sm text-ink-800">Geographic reach</p>
          </div>
          <div>
            <div className="text-3xl font-serif text-ink-900 mb-2">100%</div>
            <p className="text-sm text-ink-800">Engaged BookTok/IG audience</p>
          </div>
        </div>
        <Button asChild size="lg">
          <Link href="/publishers">Learn More</Link>
        </Button>
      </div>
    </Section>
  )
}

