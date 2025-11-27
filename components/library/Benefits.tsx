import { Section } from '@/components/ui/Section'

export function LibraryBenefits() {
  const benefits = [
    {
      title: '6 books for about the price of 1',
      description: 'Get a whole mini library instead of a single bookstore paperback.',
    },
    {
      title: 'Discover more indie romance',
      description: 'Try new authors and tropes you won’t find in most local libraries.',
    },
    {
      title: 'Pre-loved & planet-friendly',
      description: 'Books are shared between readers instead of sitting on shelves.',
    },
    {
      title: 'No clutter at home',
      description: 'Enjoy physical books without growing an endless TBR pile.',
    },
    {
      title: 'Built-in community',
      description: 'Discuss each quarterly stack in our private book club spaces.',
    },
    {
      title: 'Support indie authors',
      description: 'We buy books in bulk from indie-friendly publishers and creators.',
    },
  ]

  return (
    <Section withBorder background="white">
       <div className="text-center mb-12">
        <h2 className="mb-4">Why readers love Inkblot Library</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl mx-auto">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex flex-col gap-2">
            <h3 className="text-lg font-bold text-ink-900">{benefit.title}</h3>
            <p className="text-ink-800 leading-relaxed">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}

