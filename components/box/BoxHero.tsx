import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'

export function BoxHero() {
  // In production, this would come from CMS with current box status
  const boxStatus = {
    isAvailable: true,
    currentBox: 'Spring 2026 Box',
    shipDate: 'February 2026',
    cutoffDate: 'January 15, 2026',
  }

  return (
    <Section className="pt-32 pb-16" background="white">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-block px-3 py-1 bg-ink-900 text-paper-50 text-sm mb-4">
            {boxStatus.isAvailable ? 'Now Available' : 'Coming Soon'}
          </div>
          <h1 className="mb-6">{boxStatus.currentBox}</h1>
          <p className="text-xl text-ink-800 leading-relaxed mb-6">
            Discover handpicked indie romance titles, exclusive bookish merchandise, 
            digital extras, and access to our vibrant reading community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {boxStatus.isAvailable ? (
              <Button size="lg">Subscribe Now</Button>
            ) : (
              <Button size="lg">Join Waitlist</Button>
            )}
            <Button size="lg" variant="outline">Learn More</Button>
          </div>
          <div className="text-sm text-grey-600">
            <p className="mb-1">
              <strong>Ships:</strong> {boxStatus.shipDate}
            </p>
            <p>
              <strong>Order by {boxStatus.cutoffDate}</strong> to receive this box
            </p>
          </div>
        </div>
        <div className="aspect-square bg-grey-200 border border-ink-900/10" />
      </div>
    </Section>
  )
}

