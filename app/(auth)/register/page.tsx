import { Suspense } from 'react'
import { Section } from '@/components/ui/Section'
import { RegisterForm } from '@/components/auth'

export const metadata = {
  title: 'Join the Crew | Inkblot Crew',
  description: 'Create your Inkblot Crew account to subscribe to our indie romance book box, join the community, and access exclusive content.',
}

function RegisterContent({ searchParams }: { searchParams: { returnTo?: string } }) {
  return <RegisterForm returnTo={searchParams.returnTo} />
}

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { returnTo?: string }
}) {
  return (
    <Section className="pt-32 pb-16" background="white">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl mb-4">Join the Crew</h1>
          <p className="text-lg text-ink-800">
            Create your account to start your indie romance journey
          </p>
        </div>

        <Suspense fallback={
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-ink-900/20 border-t-ink-900 rounded-full animate-spin" />
          </div>
        }>
          <RegisterContent searchParams={searchParams} />
        </Suspense>
      </div>
    </Section>
  )
}

