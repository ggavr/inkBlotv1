import { Suspense } from 'react'
import { Section } from '@/components/ui/Section'
import { ForgotPasswordForm } from '@/components/auth'

export const metadata = {
  title: 'Reset Password | Inkblot Crew',
  description: 'Reset your Inkblot Crew account password.',
}

export default function ForgotPasswordPage() {
  return (
    <Section className="pt-32 pb-16" background="white">
      <Suspense fallback={
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-ink-900/20 border-t-ink-900 rounded-full animate-spin" />
        </div>
      }>
        <ForgotPasswordForm />
      </Suspense>
    </Section>
  )
}

