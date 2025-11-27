import { Metadata } from 'next'
import { LibraryHero } from '@/components/library/Hero'
import { LibraryHowItWorks } from '@/components/library/HowItWorks'
import { LibraryBenefits } from '@/components/library/Benefits'
import { LibraryWaitlist } from '@/components/library/Waitlist'

export const metadata: Metadata = {
  title: 'Inkblot Library | 6 Indie Romance Books for the Price of 1',
  description: 'A quarterly at-home library delivering a stack of gently used indie romance books to your door. Read them for up to 3 months, then return for more.',
}

export default function LibraryPage() {
  return (
    <>
      <LibraryHero />
      <LibraryHowItWorks />
      <LibraryBenefits />
      <LibraryWaitlist />
    </>
  )
}

