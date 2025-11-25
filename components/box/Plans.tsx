import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export function Plans() {
  const plans = [
    {
      name: 'Quarterly Box',
      price: '£45',
      priceEur: '€52',
      billing: 'Billed quarterly',
      features: [
        '1-2 indie romance books',
        'Curated bookish goodies',
        'Digital extras (playlists, Q&As)',
        'Full community access',
        'Free UK/EU shipping',
      ],
      popular: true,
    },
  ]

  return (
    <Section withBorder background="grey" id="plans">
      <div className="text-center mb-16">
        <h2 className="mb-4">Choose Your Plan</h2>
        <p className="text-lg text-ink-800 max-w-2xl mx-auto">
          One simple plan with everything included. Cancel anytime.
        </p>
      </div>

      <div className="max-w-md mx-auto">
        {plans.map((plan) => (
          <Card key={plan.name} className="p-8 relative">
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-ink-900 text-paper-50 px-4 py-1 text-sm">
                Most Popular
              </div>
            )}
            <div className="text-center mb-6">
              <h3 className="text-3xl mb-2">{plan.name}</h3>
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-4xl font-serif">{plan.price}</span>
                <span className="text-xl text-grey-500">/ {plan.priceEur}</span>
              </div>
              <p className="text-sm text-grey-600">{plan.billing}</p>
              <p className="text-xs text-grey-500 mt-1">VAT included</p>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-ink-900 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-ink-800">{feature}</span>
                </li>
              ))}
            </ul>

            <Button fullWidth size="lg">Subscribe Now</Button>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8 text-sm text-grey-600">
        <p>Free shipping to UK & EU • Cancel or pause anytime • No commitments</p>
      </div>
    </Section>
  )
}

