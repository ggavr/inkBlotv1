import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'

export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'You Subscribe',
      description: 'Choose your quarterly subscription and join our community of indie romance readers.',
    },
    {
      number: '02',
      title: 'We Curate',
      description: 'Our team handpicks the best indie romance titles and pairs them with thoughtful bookish goodies.',
    },
    {
      number: '03',
      title: 'We Ship',
      description: 'Your box arrives quarterly with 1-2 books, exclusive merch, and digital extras.',
    },
    {
      number: '04',
      title: 'You Read & Connect',
      description: 'Dive into your new books and join the Crew for book club discussions and author Q&As.',
    },
  ]

  return (
    <Section withBorder background="grey">
      <div className="text-center mb-16">
        <h2 className="mb-4">How It Works</h2>
        <p className="text-lg text-ink-800 max-w-2xl mx-auto">
          Four simple steps to discovering your next favorite romance read
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => (
          <Card key={step.number} className="p-8 text-center">
            <div className="font-serif text-5xl text-ink-900/20 mb-4">
              {step.number}
            </div>
            <h3 className="text-2xl mb-3">{step.title}</h3>
            <p className="text-ink-800 leading-relaxed">
              {step.description}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  )
}

