import { Suspense } from 'react'
import { Section } from '@/components/ui/Section'
import { LoginForm } from '@/components/auth'

export const metadata = {
  title: 'Sign In | Inkblot Crew',
  description: 'Sign in to your Inkblot Crew account to manage your subscription, access the community, and more.',
}

function LoginContent({ searchParams }: { searchParams: { returnTo?: string } }) {
  return <LoginForm returnTo={searchParams.returnTo} />
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: { returnTo?: string }
}) {
  return (
    <Section className="pt-32 pb-16" background="white">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl mb-4">Welcome Back</h1>
          <p className="text-lg text-ink-800">
            Sign in to your account to continue
          </p>
        </div>

        <Suspense fallback={
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-ink-900/20 border-t-ink-900 rounded-full animate-spin" />
          </div>
        }>
          <LoginContent searchParams={searchParams} />
        </Suspense>
      </div>
    </Section>
  )
}

