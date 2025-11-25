import { Section } from '@/components/ui/Section'
import { Accordion, AccordionItem } from '@/components/ui/Accordion'

export const metadata = {
  title: 'FAQ | Inkblot Crew',
  description: 'Frequently asked questions about Inkblot Crew subscription boxes, shipping, billing, and more.',
}

export default function FAQPage() {
  const faqCategories = [
    {
      category: 'Subscription',
      faqs: [
        {
          question: 'When do boxes ship?',
          answer: 'Boxes ship quarterly in February, May, August, and November. You must order by the 15th of the previous month to receive that quarter\'s box. Orders placed after the cutoff receive the next cycle.',
        },
        {
          question: 'How does billing work?',
          answer: 'You\'re billed quarterly, approximately 2-3 weeks before each box ships. You\'ll receive a reminder email before each billing date. You can view your billing history and manage your subscription through your account portal.',
        },
        {
          question: 'Can I pause my subscription?',
          answer: 'Yes! You can pause your subscription for up to 3 quarters through your account portal. This is perfect if you need a break or have too many books in your TBR pile.',
        },
        {
          question: 'Can I cancel anytime?',
          answer: 'Absolutely. You can cancel your subscription at any time through your account portal. Just make sure to cancel before the next billing cycle to avoid being charged. There are no cancellation fees or penalties.',
        },
      ],
    },
    {
      category: 'Shipping & Returns',
      faqs: [
        {
          question: 'Where do you ship?',
          answer: 'We currently ship to the United Kingdom and European Union only. We hope to expand to other regions in the future.',
        },
        {
          question: 'How much is shipping?',
          answer: 'Shipping is FREE to all UK and EU addresses for subscription boxes. For individual merch purchases, shipping costs are calculated at checkout based on your location.',
        },
        {
          question: 'Can I return my box?',
          answer: 'Due to the curated nature of subscription boxes, we cannot accept returns on opened boxes. However, if your box arrives damaged or with missing items, please contact us immediately and we\'ll make it right.',
        },
        {
          question: 'What if I didn\'t receive my box?',
          answer: 'All boxes are shipped with tracking. If your tracking shows delivered but you haven\'t received it, please contact us within 7 days and we\'ll investigate. We may be able to file a claim with the carrier or send a replacement.',
        },
      ],
    },
    {
      category: 'Payment & Billing',
      faqs: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit and debit cards (Visa, Mastercard, American Express) through our secure Shopify checkout. We also support PayPal and Shop Pay.',
        },
        {
          question: 'Is VAT included in the price?',
          answer: 'Yes! All prices shown include applicable VAT for your region. There are no hidden fees or additional charges at checkout.',
        },
        {
          question: 'Will there be customs fees?',
          answer: 'No. Since we ship within UK and EU only, and all VAT is included in the price, there are no additional customs fees or import duties.',
        },
        {
          question: 'Can I change my billing date?',
          answer: 'Billing dates are set quarterly to align with box preparation and shipping schedules, so they cannot be changed individually. However, you can pause a cycle and restart the next quarter.',
        },
      ],
    },
    {
      category: 'Gifting',
      faqs: [
        {
          question: 'Can I gift a subscription?',
          answer: 'Yes! Gift subscriptions are available for 1, 2, or 4 quarters. When purchasing a gift, you can provide the recipient\'s shipping address and an optional gift message. They\'ll receive a beautiful welcome card with their first box.',
        },
        {
          question: 'Will the gift recipient see the price?',
          answer: 'No, the price is never shown to the gift recipient. They will only receive the box and a gift message (if you provided one).',
        },
        {
          question: 'Can the recipient manage their gift subscription?',
          answer: 'Yes. After receiving their first box, gift recipients can create an account to access digital content and community features. If they want to continue after the gift period ends, they can convert to a paid subscription.',
        },
      ],
    },
    {
      category: 'Publishers',
      faqs: [
        {
          question: 'How do I submit my book for consideration?',
          answer: 'Please visit our For Publishers page and fill out the contact form, or email us directly at publishers@inkblotcrew.com with information about your titles.',
        },
        {
          question: 'What genres do you feature?',
          answer: 'We feature all romance subgenres: contemporary, fantasy, historical, paranormal, romantic suspense, etc. We focus on indie-published titles with strong character development and emotional depth.',
        },
        {
          question: 'Do you feature debut authors?',
          answer: 'Absolutely! We love showcasing talented debuts alongside established indie authors.',
        },
      ],
    },
  ]

  return (
    <>
      <Section className="pt-32 pb-16" background="white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-ink-800">
            Find answers to common questions about subscriptions, shipping, billing, and more
          </p>
        </div>
      </Section>

      {faqCategories.map((category, index) => (
        <Section 
          key={category.category}
          withBorder 
          background={index % 2 === 0 ? 'grey' : 'white'}
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl mb-8">{category.category}</h2>
            <Accordion>
              {category.faqs.map((faq) => (
                <AccordionItem key={faq.question} title={faq.question}>
                  <p>{faq.answer}</p>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Section>
      ))}

      <Section withBorder background="grey">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-6">Still Have Questions?</h2>
          <p className="text-lg text-ink-800 mb-6">
            Can&apos;t find what you&apos;re looking for? Get in touch and we&apos;ll be happy to help.
          </p>
          <p className="text-ink-900">
            Email us at{' '}
            <a href="mailto:hello@inkblotcrew.com" className="underline hover:no-underline">
              hello@inkblotcrew.com
            </a>
          </p>
        </div>
      </Section>
    </>
  )
}

