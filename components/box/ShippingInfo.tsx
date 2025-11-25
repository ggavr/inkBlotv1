import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'

export function ShippingInfo() {
  return (
    <Section withBorder background="grey">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4">Shipping & Regions</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8">
            <h3 className="text-2xl mb-4">United Kingdom</h3>
            <p className="text-ink-800 leading-relaxed mb-4">
              Free standard shipping to all UK addresses. Boxes typically arrive 
              within 3-5 business days of dispatch.
            </p>
            <p className="text-sm text-grey-600">
              All prices include VAT. No additional customs fees.
            </p>
          </Card>

          <Card className="p-8">
            <h3 className="text-2xl mb-4">European Union</h3>
            <p className="text-ink-800 leading-relaxed mb-4">
              Free standard shipping to all EU countries. Boxes typically arrive 
              within 7-10 business days of dispatch.
            </p>
            <p className="text-sm text-grey-600">
              All prices include applicable VAT. No additional customs fees.
            </p>
          </Card>
        </div>

        <div className="mt-8 p-6 bg-paper-50 border border-ink-900/10">
          <p className="text-center text-ink-800">
            <strong>Note:</strong> Exact shipping costs and delivery estimates are calculated 
            at checkout based on your specific location.
          </p>
        </div>
      </div>
    </Section>
  )
}

