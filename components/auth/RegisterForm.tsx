'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore, transformToAuthUser } from '@/lib/store/useAuthStore'
import { validateRegistration } from '@/lib/auth/validation'
import { DEFAULT_REDIRECT } from '@/lib/auth/constants'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Checkbox } from './Checkbox'
import { CountrySelect } from './CountrySelect'
import { PasswordStrength } from './PasswordStrength'
import { GoogleButton } from './GoogleButton'
import { AuthDivider } from './AuthDivider'

interface RegisterFormProps {
  returnTo?: string
}

export function RegisterForm({ returnTo }: RegisterFormProps) {
  const router = useRouter()
  const { setUser, clearReturnTo } = useAuthStore()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    country: '',
    termsAccepted: false,
    marketingConsent: false,
  })
  const [errors, setErrors] = useState<{
    email?: string
    password?: string
    fullName?: string
    country?: string
    termsAccepted?: string
  }>({})
  const [generalError, setGeneralError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showVerification, setShowVerification] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    // Clear field error on change
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
    setGeneralError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGeneralError(null)

    // Validate form
    const validation = validateRegistration(formData)

    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      const supabase = createClient()

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            country: formData.country,
            marketing_consent: formData.marketingConsent,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        if (error.message.includes('already registered')) {
          setErrors({ email: 'This email is already registered' })
        } else if (error.message.includes('Password')) {
          setErrors({ password: error.message })
        } else {
          setGeneralError('An error occurred. Please try again.')
        }
        setIsLoading(false)
        return
      }

      // Check if email confirmation is required
      if (data.user && !data.session) {
        // Email confirmation required
        setShowVerification(true)
        setIsLoading(false)
        return
      }

      if (data.user && data.session) {
        // No email confirmation required - user is logged in
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single()

        const authUser = transformToAuthUser(data.user, profile)
        setUser(authUser)

        // Redirect to returnTo or default
        const storedReturnTo = clearReturnTo()
        const redirectPath = returnTo || storedReturnTo || DEFAULT_REDIRECT
        router.push(redirectPath)
        router.refresh()
      }
    } catch {
      setGeneralError('An unexpected error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  // Show verification message
  if (showVerification) {
    return (
      <div className="w-full max-w-md mx-auto text-center">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-2xl mb-2">Check your email</h2>
          <p className="text-ink-800">
            We&apos;ve sent a verification link to{' '}
            <strong className="text-ink-900">{formData.email}</strong>
          </p>
        </div>
        <p className="text-sm text-grey-600 mb-6">
          Click the link in the email to verify your account and complete
          registration.
        </p>
        <Button
          variant="outline"
          onClick={() => setShowVerification(false)}
          className="mr-2"
        >
          Use different email
        </Button>
        <Link href="/login" className="text-sm text-ink-700 hover:underline">
          Already verified? Sign in
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Google OAuth */}
      <GoogleButton mode="register" returnTo={returnTo} />

      <AuthDivider />

      {/* General error banner */}
      {generalError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
          {generalError}
        </div>
      )}

      {/* Email/Password form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Full Name"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          placeholder="Jane Doe"
          autoComplete="name"
          disabled={isLoading}
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="you@example.com"
          autoComplete="email"
          disabled={isLoading}
        />

        <div>
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Create a secure password"
            autoComplete="new-password"
            disabled={isLoading}
          />
          <PasswordStrength password={formData.password} />
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
              Creating account...
            </span>
          ) : (
            'Join the Crew'
          )}
        </Button>
      </form>

      {/* Login link */}
      <p className="mt-8 text-center text-sm text-ink-800">
        Already have an account?{' '}
        <Link
          href={
            returnTo ? `/login?returnTo=${encodeURIComponent(returnTo)}` : '/login'
          }
          className="font-medium text-ink-900 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}

