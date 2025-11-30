'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { CountrySelect } from '@/components/auth/CountrySelect'
import { useAuthStore } from '@/lib/store/useAuthStore'

export function LibraryWaitlist() {
  const router = useRouter()
  const { user, isInitialized } = useAuthStore()
  
  const [country, setCountry] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isOnWaitlist, setIsOnWaitlist] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Pre-fill country from user profile
  useEffect(() => {
    if (user?.country) {
      setCountry(user.country)
    }
  }, [user])

  // Check if user is already on waitlist
  useEffect(() => {
    const checkWaitlist = async () => {
      if (!user) return
      
      try {
        const response = await fetch('/api/library/waitlist')
        if (response.ok) {
          const data = await response.json()
          setIsOnWaitlist(data.isOnWaitlist)
        }
      } catch {
        // Ignore errors on initial check
      }
    }

    if (isInitialized && user) {
      checkWaitlist()
    }
  }, [user, isInitialized])

  const handleJoinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // If not logged in, redirect to register
    if (!user) {
      router.push('/register?returnTo=/library')
      return
    }

    if (!country) {
      setError('Please select your country')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/library/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to join waitlist')
        setIsLoading(false)
        return
      }

      setSuccess(true)
      setIsOnWaitlist(true)
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Show success state
  if (success || isOnWaitlist) {
    return (
      <Section id="library-waitlist" background="grey" className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-emerald-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="mb-4">You&apos;re on the list!</h2>
          <p className="text-xl text-ink-800 leading-relaxed">
            Thanks for joining the Inkblot Library waitlist. We&apos;ll notify you at{' '}
            <strong className="text-ink-900">{user?.email}</strong> when we launch in your region.
          </p>
        </div>
      </Section>
    )
  }

  return (
    <Section id="library-waitlist" background="grey" className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="mb-6">
          Ready to borrow 6 indie romance books for the price of 1?
        </h2>
        <p className="text-xl text-ink-800 leading-relaxed mb-10">
          Join the Inkblot Library waitlist to be the first to know when we open spots in your country.
        </p>
        
        <div className="max-w-md mx-auto">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
              {error}
            </div>
          )}

          <form className="flex flex-col gap-4" onSubmit={handleJoinWaitlist}>
            {/* Show email if logged in */}
            {user && (
              <div className="text-left">
                <label className="block text-sm font-medium text-ink-900 mb-2">
                  Email
                </label>
                <div className="px-4 py-3 bg-white border border-ink-900/10 text-ink-700 rounded-md">
                  {user.email}
                </div>
              </div>
            )}

            {/* Show email input if not logged in */}
            {!user && isInitialized && (
              <div className="text-left">
                <p className="text-sm text-ink-700 mb-4">
                  Create an account to join the waitlist and be notified when we launch.
                </p>
              </div>
            )}

            <CountrySelect
              value={country}
              onChange={(e) => {
                setCountry(e.target.value)
                setError(null)
              }}
              disabled={isLoading}
              className="rounded-md"
            />

            <Button 
              type="submit" 
              size="lg" 
              className="w-full"
              disabled={isLoading || !isInitialized}
            >
              {!isInitialized ? (
                'Loading...'
              ) : isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-paper-50/30 border-t-paper-50 rounded-full animate-spin" />
                  Joining...
                </span>
              ) : user ? (
                'Join Library Waitlist'
              ) : (
                'Create Account to Join'
              )}
            </Button>
          </form>

          <p className="text-xs text-ink-500 mt-4">
            We&apos;ll notify you when we launch in your region.
          </p>
        </div>
      </div>
    </Section>
  )
}
