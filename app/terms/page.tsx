import { Section } from '@/components/ui/Section'

export const metadata = {
  title: 'Terms & Conditions | Inkblot Crew',
}

export default function TermsPage() {
  return (
    <Section className="pt-24 pb-32">
      <div className="max-w-4xl mx-auto prose prose-lg">
        <h1>Terms & Conditions</h1>
        <p className="text-grey-600">Last updated: November 2025</p>
        
        <p>
          These terms and conditions outline the rules and regulations for the use of Inkblot Crew&apos;s website and services.
        </p>

        <h2>Subscription Terms</h2>
        <p>
          By subscribing to our quarterly box service, you agree to be billed quarterly until you cancel your subscription. 
          You may cancel at any time through your account portal.
        </p>

        <h2>Shipping & Delivery</h2>
        <p>
          We ship to UK and EU addresses only. Delivery times vary by location but typically range from 3-10 business days 
          after dispatch.
        </p>

        <h2>Returns & Refunds</h2>
        <p>
          Due to the curated nature of our subscription boxes, we cannot accept returns on opened boxes. Refunds may be 
          issued for damaged or missing items at our discretion.
        </p>

        <p className="text-sm text-grey-600 mt-12">
          For complete terms and conditions, please contact us at hello@inkblotcrew.com
        </p>
      </div>
    </Section>
  )
}

