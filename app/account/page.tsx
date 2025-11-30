import { Suspense } from 'react'
import { Section } from '@/components/ui/Section'
import { AccountDashboard } from '@/components/account/AccountDashboard'

export const metadata = {
  title: 'My Account | Inkblot Crew',
  description: 'Manage your Inkblot Crew account, subscription, and preferences.',
}

export default function AccountPage() {
  return (
    <Section className="pt-32 pb-16" background="white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl mb-8 text-center">My Account</h1>
        
        <Suspense fallback={
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-ink-900/20 border-t-ink-900 rounded-full animate-spin" />
          </div>
        }>
          <AccountDashboard />
        </Suspense>
      </div>
    </Section>
  )
}

