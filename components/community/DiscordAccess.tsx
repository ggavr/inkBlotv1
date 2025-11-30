'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useAuthStore } from '@/lib/store/useAuthStore'

export function DiscordAccess() {
  const { user, isInitialized } = useAuthStore()
  const [isResending, setIsResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)
  const [resendError, setResendError] = useState<string | null>(null)

  const handleResendInvite = async () => {
    setIsResending(true)
    setResendError(null)
    setResendSuccess(false)

    try {
      const response = await fetch('/api/user/discord/resend-invite', {
        method: 'POST',
      })

      const data = await response.json()

      if (!response.ok) {
        setResendError(data.error || 'Failed to resend invite')
        return
      }

      setResendSuccess(true)
    } catch {
      setResendError('An error occurred. Please try again.')
    } finally {
      setIsResending(false)
    }
  }

  // Loading state
  if (!isInitialized) {
    return (
      <Section withBorder background="white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-8 h-8 mx-auto border-2 border-ink-900/20 border-t-ink-900 rounded-full animate-spin" />
        </div>
      </Section>
    )
  }

  // Not logged in
  if (!user) {
    return (
      <Section withBorder background="white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-6">Access the Community</h2>
          <p className="text-lg text-ink-800 leading-relaxed mb-8">
            Sign in to your account to access our private Discord community and connect with fellow readers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/login?returnTo=/community">Sign In</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/register?returnTo=/community">Create Account</Link>
            </Button>
          </div>
        </div>
      </Section>
    )
  }

  // Has active subscription
  if (user.subscriptionStatus === 'active') {
    return (
      <Section withBorder background="white">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-[#5865F2]/10 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </div>
            
            <h3 className="text-2xl mb-4">Your Community Access</h3>
            
            {user.discordInviteSent ? (
              <>
                <p className="text-ink-800 mb-6">
                  You have full access to our Discord community! Click below to join or open Discord.
                </p>
                <Button asChild size="lg">
                  <a
                    href="https://discord.com/channels/1442556988163751970/1442559941918326939"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Discord Community
                  </a>
                </Button>
                
                <div className="mt-6 pt-6 border-t border-ink-900/10">
                  <p className="text-sm text-grey-600 mb-3">
                    Didn&apos;t receive the invite email?
                  </p>
                  {resendSuccess ? (
                    <p className="text-sm text-emerald-600">
                      ✓ Invite email sent! Check your inbox.
                    </p>
                  ) : (
                    <>
                      {resendError && (
                        <p className="text-sm text-red-600 mb-2">{resendError}</p>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleResendInvite}
                        disabled={isResending}
                      >
                        {isResending ? 'Sending...' : 'Resend Invite Email'}
                      </Button>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <p className="text-ink-800 mb-6">
                  Click below to receive your Discord invite email and join our community.
                </p>
                {resendSuccess ? (
                  <p className="text-emerald-600 font-medium">
                    ✓ Invite email sent! Check your inbox at {user.email}
                  </p>
                ) : (
                  <>
                    {resendError && (
                      <p className="text-sm text-red-600 mb-4">{resendError}</p>
                    )}
                    <Button
                      size="lg"
                      onClick={handleResendInvite}
                      disabled={isResending}
                    >
                      {isResending ? (
                        <span className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-paper-50/30 border-t-paper-50 rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        'Send Discord Invite'
                      )}
                    </Button>
                  </>
                )}
              </>
            )}
          </Card>
        </div>
      </Section>
    )
  }

  // No active subscription
  return (
    <Section withBorder background="white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="mb-6">Get Community Access</h2>
        <p className="text-lg text-ink-800 leading-relaxed mb-8">
          Community access is included with your Inkblot Crew subscription. 
          Subscribe to join our private Discord, book clubs, and exclusive events.
        </p>
        <Button asChild size="lg">
          <Link href="/box">Subscribe to Join</Link>
        </Button>
      </div>
    </Section>
  )
}

