import { Section } from '@/components/ui/Section'

export function Timeline() {
  const steps = [
    {
      date: 'By Jan 15',
      title: 'Order Cutoff',
      description: 'Subscribe by this date to receive the current box',
    },
    {
      date: 'Jan 20-31',
      title: 'Box Preparation',
      description: 'We curate and pack your box with care',
    },
    {
      date: 'Feb 1-5',
      title: 'Shipping',
      description: 'Your box ships with tracking information',
    },
    {
      date: 'Feb 8-15',
      title: 'Delivery',
      description: 'Box arrives at your door, ready to enjoy',
    },
  ]

  return (
    <Section withBorder background="white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4">Timeline & Cut-off</h2>
          <p className="text-lg text-ink-800">
            Here&apos;s what to expect when you subscribe
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-ink-900/10" />
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-ink-900 text-paper-50 rounded-full flex items-center justify-center text-sm font-medium mx-auto mb-4 relative z-10">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="text-sm font-medium text-ink-700 mb-2">
                  {step.date}
                </div>
                <h4 className="text-xl font-serif mb-2">{step.title}</h4>
                <p className="text-sm text-ink-800 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 p-6 bg-grey-100 border border-ink-900/10 text-center">
          <p className="text-lg">
            <strong>Important:</strong> Orders placed after January 15 will receive the next quarterly box (Spring 2026).
          </p>
        </div>
      </div>
    </Section>
  )
}

