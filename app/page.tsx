import { Hero } from '@/components/home/Hero'
import { WhyIndieRomance } from '@/components/home/WhyIndieRomance'
import { WhatsInTheBox } from '@/components/home/WhatsInTheBox'
import { Community } from '@/components/home/Community'
import { Testimonials } from '@/components/home/Testimonials'
import { PublishersTeaser } from '@/components/home/PublishersTeaser'
import { FAQTeaser } from '@/components/home/FAQTeaser'
import { HowItWorks } from '@/components/home/HowItWorks'
import { Section } from '@/components/ui/Section'

export default function Home() {
  return (
    <>
      <Hero />
      <WhyIndieRomance />
      <HowItWorks />
      <WhatsInTheBox />
      <Community />
      <Testimonials />
      <PublishersTeaser />
      <FAQTeaser />
      
      {/* Contact Section */}
      <Section withBorder background="grey">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-6">Get in Touch</h2>
          <p className="text-lg text-ink-800 leading-relaxed mb-8">
            Have questions or need help? We&apos;d love to hear from you.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 max-w-xl mx-auto">
            {/* WhatsApp */}
            <a 
              href="https://wa.me/44XXXXXXXXXX" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-6 bg-paper-50 border border-ink-900/10 hover:border-ink-900/20 transition-colors flex flex-col items-center gap-3"
            >
              <span className="text-3xl">💬</span>
              <span className="font-medium text-ink-900">WhatsApp</span>
              <span className="text-sm text-grey-600">(Placeholder number)</span>
            </a>

            {/* Email */}
            <a 
              href="mailto:hello@inkblotcrew.com"
              className="p-6 bg-paper-50 border border-ink-900/10 hover:border-ink-900/20 transition-colors flex flex-col items-center gap-3"
            >
              <span className="text-3xl">✉️</span>
              <span className="font-medium text-ink-900">Email</span>
              <span className="text-sm text-grey-600">hello@inkblotcrew.com</span>
            </a>
          </div>

          <p className="text-sm text-grey-600 mt-8">
            We typically respond within 24-48 hours
          </p>
        </div>
      </Section>
    </>
  )
}

