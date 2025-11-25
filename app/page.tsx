import { Hero } from '@/components/home/Hero'
import { HowItWorks } from '@/components/home/HowItWorks'
import { WhatsInTheBox } from '@/components/home/WhatsInTheBox'
import { WhyIndieRomance } from '@/components/home/WhyIndieRomance'
import { PastBoxes } from '@/components/home/PastBoxes'
import { CommunityTeaser } from '@/components/home/CommunityTeaser'
import { PublishersTeaser } from '@/components/home/PublishersTeaser'
import { FAQTeaser } from '@/components/home/FAQTeaser'

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <WhatsInTheBox />
      <WhyIndieRomance />
      <PastBoxes />
      <CommunityTeaser />
      <PublishersTeaser />
      <FAQTeaser />
    </>
  )
}

