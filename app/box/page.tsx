import { BoxHero } from '@/components/box/BoxHero'
import { SneakPeak } from '@/components/box/SneakPeak'
import { Plans } from '@/components/box/Plans'
import { WhatYouGet } from '@/components/box/WhatYouGet'
import { ShippingInfo } from '@/components/box/ShippingInfo'
import { Timeline } from '@/components/box/Timeline'
import { SubscriptionFAQ } from '@/components/box/SubscriptionFAQ'
import { Testimonials } from '@/components/box/Testimonials'

export const metadata = {
  title: 'Subscription Box | Inkblot Crew',
  description: 'Subscribe to our quarterly indie romance box. Get curated books, bookish goodies, digital extras, and community access.',
}

export default function BoxPage() {
  return (
    <>
      <BoxHero />
      <SneakPeak />
      <Plans />
      <WhatYouGet />
      <ShippingInfo />
      <Timeline />
      <SubscriptionFAQ />
      <Testimonials />
    </>
  )
}

