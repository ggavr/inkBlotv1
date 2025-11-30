import { Suspense } from 'react'
import { Section } from '@/components/ui/Section'
import { ResetPasswordForm } from '@/components/auth'

export const metadata = {
  title: 'Set New Password | Inkblot Crew',
  description: 'Set a new password for your Inkblot Crew account.',
}

export default function ResetPasswordPage() {
  return (
    <Section className="pt-32 pb-16" background="white">
      <Suspense fallback={
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-ink-900/20 border-t-ink-900 rounded-full animate-spin" />
        </div>
      }>
        <ResetPasswordForm />
      </Suspense>
    </Section>
  )
}

