import Link from 'next/link'
import { Section } from '@/components/ui/Section'
import { Accordion, AccordionItem } from '@/components/ui/Accordion'
import { Button } from '@/components/ui/Button'

export function FAQTeaser() {
  const faqs = [
    {
      question: 'When do boxes ship?',
      answer: 'Boxes ship quarterly in February, May, August, and November. Order by the 15th of the previous month to receive that quarter\'s box.',
    },
    {
      question: 'Can I cancel my subscription?',
      answer: 'Yes! You can pause or cancel your subscription at any time through your account portal. Cancel before the next billing cycle to avoid being charged.',
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Currently we ship to the UK and EU only. We hope to expand to other regions in the future.',
    },
    {
      question: 'What if I don\'t like a book?',
      answer: 'Every reader has different tastes! While we can\'t offer refunds on opened boxes, we carefully curate diverse selections and provide detailed content warnings so you know what to expect.',
    },
  ]

  return (
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

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/faq">View All FAQs</Link>
          </Button>
        </div>
      </div>
    </Section>
  )
}

