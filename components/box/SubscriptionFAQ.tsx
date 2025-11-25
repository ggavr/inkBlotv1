import { Section } from '@/components/ui/Section'
import { Accordion, AccordionItem } from '@/components/ui/Accordion'

export function SubscriptionFAQ() {
  const faqs = [
    {
      question: 'How does billing work?',
      answer: 'You\'re billed quarterly, approximately 2-3 weeks before each box ships. You\'ll receive a reminder email before each billing date.',
    },
    {
      question: 'Can I pause my subscription?',
      answer: 'Yes! You can pause your subscription for up to 3 quarters through your account portal. This is perfect if you need a break or have too many books in your TBR.',
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Absolutely. Cancel anytime through your account portal. Just make sure to cancel before the next billing cycle to avoid being charged.',
    },
    {
      question: 'Can I gift a subscription?',
      answer: 'Yes! Gift subscriptions are available for 1, 2, or 4 quarters. The recipient will receive a beautiful welcome card and full access to the community.',
    },
    {
      question: 'What if I already own one of the books?',
      answer: 'While we can\'t guarantee you won\'t receive a book you own, we carefully select titles that are lesser-known indie releases. Duplicates make great gifts or donations!',
    },
    {
      question: 'Are there content warnings?',
      answer: 'Yes. We provide detailed content warnings and spice ratings for all books in advance through your account portal and community access.',
    },
  ]

  return (
    <Section withBorder background="grey">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4">Subscription FAQs</h2>
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
  )
}

