'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { validateEmail } from '@/lib/auth/validation'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate email
    const validation = validateEmail(email)
    if (!validation.isValid) {
      setError(validation.error || 'Invalid email')
      return
    }

    // Check cooldown
    if (cooldown > 0) {
      setError(`Please wait ${cooldown} seconds before trying again`)
      return
    }

    setIsLoading(true)

    try {
      const supabase = createClient()

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      )

      if (resetError) {
        // Don't reveal if email exists or not
        console.error('Reset error:', resetError)
      }

      // Always show success message (security: don't reveal if email exists)
      setIsSubmitted(true)

      // Start cooldown
      setCooldown(60)
      const interval = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
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
            If an account exists for <strong className="text-ink-900">{email}</strong>,
            you&apos;ll receive a password reset link shortly.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            variant="outline"
            onClick={() => setIsSubmitted(false)}
            disabled={cooldown > 0}
            fullWidth
          >
            {cooldown > 0 ? `Resend in ${cooldown}s` : 'Try different email'}
          </Button>

          <Link
            href="/login"
            className="block text-sm text-ink-700 hover:underline"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl mb-3">Reset Password</h1>
        <p className="text-ink-800">
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setError(null)
          }}
          placeholder="you@example.com"
          autoComplete="email"
          disabled={isLoading}
        />

        <Button type="submit" fullWidth size="lg" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-paper-50/30 border-t-paper-50 rounded-full animate-spin" />
              Sending...
            </span>
          ) : (
            'Send Reset Link'
          )}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-ink-800">
        Remember your password?{' '}
        <Link href="/login" className="font-medium text-ink-900 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}

