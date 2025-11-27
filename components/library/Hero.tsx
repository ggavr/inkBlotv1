import Link from 'next/link'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'

export function LibraryHero() {
  return (
    <Section className="pt-32 pb-16 md:pt-40 md:pb-24" background="white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <div className="inline-block px-3 py-1 mb-6 text-sm font-medium tracking-wide text-ink-800 bg-paper-50 border border-ink-900/10 rounded-full">
            6 books · 3 months · 1 simple price
          </div>
          <h1 className="mb-6">
            Inkblot Library – 6 Indie Romance Books for the Price of 1
          </h1>
          <p className="text-xl text-ink-800 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
            A quarterly at-home library: we deliver a stack of gently used indie romance books to your door. 
            You read them for up to 3 months, then send them back for the next round.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-stretch sm:items-center">
            <Button asChild size="lg" className="w-full sm:w-auto px-8 py-4 text-lg">
              <Link href="#library-waitlist">Join Library Waitlist</Link>
            </Button>
          </div>
          <div className="mt-4 text-center lg:text-left">
             <Link href="#library-how-it-works" className="text-sm text-ink-700 hover:text-ink-900 underline underline-offset-4">
                How it works
             </Link>
          </div>
        </div>
        <div className="relative aspect-[4/3] lg:aspect-square bg-grey-100 rounded-2xl border border-ink-900/10 overflow-hidden flex items-center justify-center">
          <span className="text-grey-400 font-medium">Illustration / Visual</span>
        </div>
      </div>
    </Section>
  )
}

