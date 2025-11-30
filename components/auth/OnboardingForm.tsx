'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore, transformToAuthUser } from '@/lib/store/useAuthStore'
import { validateCountry, validateTermsConsent } from '@/lib/auth/validation'
import { DEFAULT_REDIRECT } from '@/lib/auth/constants'
import { Button } from '@/components/ui/Button'
import { CountrySelect } from './CountrySelect'
import { Checkbox } from './Checkbox'

interface OnboardingFormProps {
  returnTo?: string
}

export function OnboardingForm({ returnTo }: OnboardingFormProps) {
  const router = useRouter()
  const { setUser, clearReturnTo } = useAuthStore()

  const [userData, setUserData] = useState<{
    id: string
    email: string
    fullName: string
  } | null>(null)

  const [formData, setFormData] = useState({
    country: '',
    termsAccepted: false,
    marketingConsent: false,
  })
  const [errors, setErrors] = useState<{
    country?: string
    termsAccepted?: string
  }>({})
  const [generalError, setGeneralError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)

  // Fetch current user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        // Not authenticated, redirect to login
        router.push('/login')
        return
      }

      setUserData({
        id: user.id,
        email: user.email || '',
        fullName: user.user_metadata?.full_name || user.user_metadata?.name || '',
      })
      setIsInitializing(false)
    }

    fetchUser()
  }, [router])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
    setGeneralError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGeneralError(null)

    // Validate form
    const newErrors: typeof errors = {}

    const countryResult = validateCountry(formData.country)
    if (!countryResult.isValid) newErrors.country = countryResult.error

    const termsResult = validateTermsConsent(formData.termsAccepted)
    if (!termsResult.isValid) newErrors.termsAccepted = termsResult.error

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    if (!userData) {
      setGeneralError('User data not found. Please try again.')
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      const supabase = createClient()

      // Update or create profile
      const { error: profileError } = await supabase
        .from('profiles')
        // @ts-ignore - Supabase types don't know about our custom tables
        .upsert({
          id: userData.id,
          full_name: userData.fullName,
          country: formData.country,
          marketing_consent: formData.marketingConsent,
          terms_accepted_at: new Date().toISOString(),
          onboarding_completed: true,
          updated_at: new Date().toISOString(),
        })

      if (profileError) {
        console.error('Profile update error:', profileError)
        setGeneralError('Failed to save your preferences. Please try again.')
        setIsLoading(false)
        return
      }

      // Fetch updated profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userData.id)
        .single()

      const { data: { user } } = await supabase.auth.getUser()

      if (user && profile) {
        const authUser = transformToAuthUser(user, profile)
        setUser(authUser)
      }

      // Redirect to returnTo or default
      const storedReturnTo = clearReturnTo()
      const redirectPath = returnTo || storedReturnTo || DEFAULT_REDIRECT
      router.push(redirectPath)
      router.refresh()
    } catch {
      setGeneralError('An unexpected error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  if (isInitializing) {
    return (
      <div className="w-full max-w-md mx-auto text-center py-12">
        <div className="w-8 h-8 mx-auto border-2 border-ink-900/20 border-t-ink-900 rounded-full animate-spin" />
        <p className="mt-4 text-ink-800">Loading your account...</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl mb-3">Complete Your Profile</h1>
        <p className="text-ink-800">
          Welcome{userData?.fullName ? `, ${userData.fullName.split(' ')[0]}` : ''}! 
          Just a few more details to get you started.
        </p>
      </div>

      {generalError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
          {generalError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Show email (read-only) */}
        <div>
          <label className="block text-sm font-medium text-ink-900 mb-2">
            Email
          </label>
          <div className="px-4 py-3 bg-grey-100 border border-ink-900/10 text-ink-700">
            {userData?.email}
          </div>
        </div>

        <CountrySelect
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          error={errors.country}
          disabled={isLoading}
        />

        <div className="space-y-4 pt-2">
          <Checkbox
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            error={errors.termsAccepted}
            disabled={isLoading}
            label={
              <>
                I agree to the{' '}
                <Link
                  href="/terms"
                  className="underline hover:text-ink-900"
                  target="_blank"
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  href="/privacy"
                  className="underline hover:text-ink-900"
                  target="_blank"
                >
                  Privacy Policy
                </Link>
              </>
            }
          />

          <Checkbox
            name="marketingConsent"
            checked={formData.marketingConsent}
            onChange={handleChange}
            disabled={isLoading}
            label="Send me updates about new books, events, and special offers (optional)"
          />
        </div>

        <Button type="submit" fullWidth size="lg" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-paper-50/30 border-t-paper-50 rounded-full animate-spin" />
              Saving...
            </span>
          ) : (
            'Continue'
          )}
        </Button>
      </form>
    </div>
  )
}

