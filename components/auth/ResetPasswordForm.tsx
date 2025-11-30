'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { validatePassword, validatePasswordMatch } from '@/lib/auth/validation'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { PasswordStrength } from './PasswordStrength'

export function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<{
    password?: string
    confirmPassword?: string
  }>({})
  const [generalError, setGeneralError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null)

  // Check for valid session/token on mount
  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      
      // If there's a session from the reset link, we're good
      if (session) {
        setIsValidToken(true)
      } else {
        // Check if we have error params from Supabase
        const error = searchParams.get('error')
        const errorDescription = searchParams.get('error_description')
        
        if (error) {
          setGeneralError(errorDescription || 'Invalid or expired reset link')
          setIsValidToken(false)
        } else {
          // No session and no error - might be loading
          setIsValidToken(false)
          setGeneralError('Invalid or expired reset link. Please request a new one.')
        }
      }
    }

    checkSession()
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
    setGeneralError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGeneralError(null)

    // Validate password
    const passwordValidation = validatePassword(formData.password)
    if (!passwordValidation.isValid) {
      setErrors({ password: passwordValidation.error })
      return
    }

    // Validate password match
    const matchValidation = validatePasswordMatch(
      formData.password,
      formData.confirmPassword
    )
    if (!matchValidation.isValid) {
      setErrors({ confirmPassword: matchValidation.error })
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      const supabase = createClient()

      const { error } = await supabase.auth.updateUser({
        password: formData.password,
      })

      if (error) {
        if (error.message.includes('same as')) {
          setErrors({ password: 'New password must be different from your current password' })
        } else {
          setGeneralError(error.message)
        }
        setIsLoading(false)
        return
      }

      setIsSuccess(true)
    } catch {
      setGeneralError('An unexpected error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  // Success state
  if (isSuccess) {
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
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl mb-2">Password Updated</h2>
          <p className="text-ink-800">
            Your password has been successfully reset.
          </p>
        </div>

        <Button asChild fullWidth size="lg">
          <Link href="/login">Sign in with new password</Link>
        </Button>
      </div>
    )
  }

  // Invalid token state
  if (isValidToken === false) {
    return (
      <div className="w-full max-w-md mx-auto text-center">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-2xl mb-2">Link Expired</h2>
          <p className="text-ink-800">
            {generalError || 'This password reset link is invalid or has expired.'}
          </p>
        </div>

        <Button asChild fullWidth size="lg">
          <Link href="/forgot-password">Request new reset link</Link>
        </Button>
      </div>
    )
  }

  // Loading state
  if (isValidToken === null) {
    return (
      <div className="w-full max-w-md mx-auto text-center">
        <div className="w-8 h-8 mx-auto border-2 border-ink-900/20 border-t-ink-900 rounded-full animate-spin" />
        <p className="mt-4 text-ink-800">Verifying reset link...</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl mb-3">Set New Password</h1>
        <p className="text-ink-800">
          Create a new password for your account.
        </p>
      </div>

      {generalError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
          {generalError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Input
            label="New Password"
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

        <Input
          label="Confirm New Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          placeholder="Confirm your password"
          autoComplete="new-password"
          disabled={isLoading}
        />

        <Button type="submit" fullWidth size="lg" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-paper-50/30 border-t-paper-50 rounded-full animate-spin" />
              Updating password...
            </span>
          ) : (
            'Update Password'
          )}
        </Button>
      </form>
    </div>
  )
}

