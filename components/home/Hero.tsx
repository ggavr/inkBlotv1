import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'

export function Hero() {
  return (
    <Section className="pt-32 pb-24 md:pt-40 md:pb-32" background="white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="mb-6">
          A Quarterly Indie Romance Subscription Box
        </h1>
        <p className="text-xl md:text-2xl text-ink-800 leading-relaxed mb-8 max-w-3xl mx-auto">
          Discover hidden gems from independent romance authors. Every quarter, 
          receive curated books, bookish goodies, and exclusive digital content.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-6">
          <Button asChild size="lg" className="px-12 py-5 text-xl">
            <Link href="/box">Subscribe</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="px-10 py-5 text-lg">
            <Link href="/community/login">Log-In to Community</Link>
          </Button>
        </div>
        <p className="text-sm text-grey-500">
          Next box ships February 2026
        </p>
      </div>
    </Section>
  )
}

