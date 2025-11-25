import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Accordion, AccordionItem } from '@/components/ui/Accordion'

export const metadata = {
  title: 'For Publishers | Inkblot Crew',
  description: 'Partner with Inkblot Crew to reach passionate indie romance readers through our curated quarterly boxes.',
}

export default function PublishersPage() {
  const benefits = [
    {
      title: 'Guaranteed Reach',
      description: '50-100+ engaged readers per title with guaranteed sell-through via bulk purchase model.',
    },
    {
      title: 'Targeted Audience',
      description: 'Reach romance readers aged 25-40 who actively discover new books through BookTok and Bookstagram.',
    },
    {
      title: 'Marketing Support',
      description: 'Unboxing content, social media promotion, author Q&As, and community engagement included.',
    },
    {
      title: 'Flexible Opportunities',
      description: 'Options for both backlist and frontlist titles across all romance subgenres.',
    },
  ]

  const process = [
    {
      step: '1',
      title: 'Initial Contact',
      description: 'Reach out via our contact form or email. We\'ll schedule an intro call to discuss your titles and goals.',
    },
    {
      step: '2',
      title: 'Title Selection',
      description: 'We review available titles and select the best fit for upcoming box cycles based on theme and audience.',
    },
    {
      step: '3',
      title: 'Agreement',
      description: 'We finalize pricing, quantities, and campaign details. Bulk purchase orders are placed.',
    },
    {
      step: '4',
      title: 'Fulfilment & Campaign',
      description: 'Books arrive, boxes ship, and we execute the marketing campaign with unboxings, reviews, and community events.',
    },
  ]

  const faqs = [
    {
      question: 'What volume can you commit to?',
      answer: 'We start at 50 copies for our founding cohort and expect to reach 100+ subscribers by Q2 2026. Volume commitments are confirmed quarterly.',
    },
    {
      question: 'How does pricing work?',
      answer: 'We purchase books at wholesale or bulk discount rates (typically 40-50% off retail). Specific pricing is negotiated per title.',
    },
    {
      question: 'What genres do you feature?',
      answer: 'All romance subgenres: contemporary, fantasy, historical, paranormal, romantic suspense, etc. We focus on indie-published titles with strong character development.',
    },
    {
      question: 'Can you feature debut authors?',
      answer: 'Absolutely! We love showcasing talented debuts alongside established indie authors.',
    },
    {
      question: 'What about rights and territories?',
      answer: 'We operate in UK + EU only. Authors/publishers must have distribution rights for these territories.',
    },
  ]

  return (
    <>
      <Section className="pt-32 pb-16" background="white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-6">Partner with Inkblot Crew</h1>
          <p className="text-xl md:text-2xl text-ink-800 leading-relaxed mb-8">
            Reach passionate readers through our curated quarterly subscription boxes. 
            We provide guaranteed discoverability for indie romance titles.
          </p>
        </div>
      </Section>

      <Section withBorder background="grey">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4">Why Partner with Us</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="p-8">
                <h3 className="text-2xl mb-3">{benefit.title}</h3>
                <p className="text-ink-800 leading-relaxed">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section withBorder background="white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4">How We Work</h2>
          </div>

          <div className="space-y-8">
            {process.map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="w-16 h-16 bg-ink-900 text-paper-50 rounded-full flex items-center justify-center text-2xl font-serif flex-shrink-0">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl mb-2">{item.title}</h3>
                  <p className="text-lg text-ink-800 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section withBorder background="grey">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4">Frequently Asked Questions</h2>
          </div>

          <Accordion>
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} title={faq.question}>
                <p>{faq.answer}</p>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      <Section withBorder background="white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4">Get in Touch</h2>
            <p className="text-lg text-ink-800">
              Interested in featuring your titles? Fill out the form below or email us directly.
            </p>
          </div>

          <Card className="p-8">
            <form className="space-y-6">
              <Input label="Name" type="text" required />
              <Input label="Email" type="email" required />
              <Input label="Publisher/Company" type="text" required />
              <div>
                <label className="block text-sm font-medium text-ink-900 mb-2">
                  Message
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 border border-ink-900/20 bg-white text-ink-900 placeholder:text-grey-400 focus:outline-none focus:ring-2 focus:ring-ink-900 focus:border-transparent"
                  placeholder="Tell us about your titles and what you're looking for..."
                  required
                />
              </div>
              <Button type="submit" size="lg" fullWidth>
                Send Message
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-ink-900/10 text-center">
              <p className="text-sm text-grey-600">
                Or email us directly at{' '}
                <a href="mailto:publishers@inkblotcrew.com" className="text-ink-900 hover:underline">
                  publishers@inkblotcrew.com
                </a>
              </p>
            </div>
          </Card>
        </div>
      </Section>
    </>
  )
}

