'use client'

import { useState } from 'react'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export function Plans() {
  const [expandedTier, setExpandedTier] = useState<string | null>(null)

  const plans = [
    {
      name: 'Essentials',
      price: '£29',
      priceEur: '€34',
      billing: 'Billed quarterly',
      features: [
        '1 indie romance book',
        'Digital extras (playlists, Q&As)',
        'Full community access',
        'Free UK/EU shipping',
      ],
      exampleContents: [
        'Paperback indie romance novel',
        'Curated Spotify playlist',
        'Digital author Q&A access',
        'Book club discussion guide',
      ],
      popular: false,
    },
    {
      name: 'Standard',
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
      exampleContents: [
        '1-2 paperback indie romance novels',
        'Themed bookish candle',
        'Character art bookmark',
        'Curated Spotify playlist',
        'Digital author Q&A access',
      ],
      popular: true,
    },
    {
      name: 'Premium',
      price: '£65',
      priceEur: '€75',
      billing: 'Billed quarterly',
      features: [
        '2-3 indie romance books',
        'Premium bookish merchandise',
        'Exclusive signed bookplate',
        'All digital extras',
        'Full community access',
        'Free UK/EU shipping',
      ],
      exampleContents: [
        '2-3 paperback indie romance novels',
        'Premium themed candle',
        'Exclusive character art print',
        'Signed bookplate from author',
        'Themed enamel pin',
        'Deluxe bookmark set',
        'All digital extras',
      ],
      popular: false,
    },
  ]

  return (
    <Section withBorder background="grey" id="plans">
      <div className="text-center mb-16">
        <h2 className="mb-4">Choose Your Plan</h2>
        <p className="text-lg text-ink-800 max-w-2xl mx-auto">
          Three tiers to match your reading appetite. Cancel anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.name} className="p-8 relative flex flex-col">
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-ink-900 text-paper-50 px-4 py-1 text-sm">
                Most Popular
              </div>
            )}
            <div className="text-center mb-6">
              <h3 className="text-3xl mb-2">{plan.name}</h3>
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-4xl font-serif">{plan.price}</span>
                <span className="text-lg text-grey-500">/ {plan.priceEur}</span>
              </div>
              <p className="text-sm text-grey-600">{plan.billing}</p>
              <p className="text-xs text-grey-500 mt-1">VAT included</p>
            </div>

            <ul className="space-y-3 mb-6 flex-grow">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-ink-900 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-ink-800 text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Example contents reveal */}
            <div className="mb-6">
              <button
                onClick={() => setExpandedTier(expandedTier === plan.name ? null : plan.name)}
                className="text-sm text-ink-700 hover:text-ink-900 underline flex items-center gap-1 mx-auto"
              >
                {expandedTier === plan.name ? 'Hide' : 'See'} example contents
                <svg 
                  className={`w-4 h-4 transition-transform ${expandedTier === plan.name ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {expandedTier === plan.name && (
                <div className="mt-4 p-4 bg-grey-100 border border-ink-900/10 text-sm">
                  <p className="font-medium text-ink-900 mb-2">Previous box included:</p>
                  <ul className="space-y-1 text-ink-800">
                    {plan.exampleContents.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-grey-400">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Button fullWidth size="lg" variant={plan.popular ? 'primary' : 'outline'}>
              Subscribe Now
            </Button>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8 text-sm text-grey-600">
        <p>Free shipping to UK & EU • Cancel or pause anytime • No commitments</p>
      </div>
    </Section>
  )
}

