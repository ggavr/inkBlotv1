import { Suspense } from 'react'
import { Section } from '@/components/ui/Section'
import { OnboardingForm } from '@/components/auth/OnboardingForm'

export const metadata = {
  title: 'Complete Your Profile | Inkblot Crew',
  description: 'Complete your Inkblot Crew profile to start your indie romance journey.',
}

function OnboardingContent({ searchParams }: { searchParams: { returnTo?: string } }) {
  return <OnboardingForm returnTo={searchParams.returnTo} />
}

export default function OnboardingPage({
  searchParams,
}: {
  searchParams: { returnTo?: string }
}) {
  return (
    <Section className="pt-32 pb-16" background="white">
      <Suspense fallback={
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-ink-900/20 border-t-ink-900 rounded-full animate-spin" />
        </div>
      }>
        <OnboardingContent searchParams={searchParams} />
      </Suspense>
    </Section>
  )
}

