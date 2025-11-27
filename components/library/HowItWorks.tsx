import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'

export function LibraryHowItWorks() {
  const steps = [
    {
      title: 'Tell us what you love',
      description: 'Choose your favourite tropes and spice level when you sign up.',
      icon: '❤️' 
    },
    {
      title: 'We send you 6 books',
      description: 'A curated stack of pre-loved indie romance paperbacks arrives at your door every quarter.',
      icon: '📦'
    },
    {
      title: 'Read for up to 3 months',
      description: 'Take your time and join discussions in the Inkblot community as you go.',
      icon: '📖'
    },
    {
      title: 'Return & repeat',
      description: 'Use the prepaid return label, send the books back, and get a fresh stack next quarter.',
      icon: '🔄'
    },
  ]

  return (
    <Section id="library-how-it-works" background="grey">
       <div className="text-center mb-12">
        <h2 className="mb-4">How Inkblot Library works</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <Card key={index} className="p-8 text-center h-full">
             <div className="text-4xl mb-4">{step.icon}</div>
            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
            <p className="text-ink-800 leading-relaxed text-sm">
              {step.description}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  )
}

