'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore, transformToAuthUser } from '@/lib/store/useAuthStore'
import { validateLogin } from '@/lib/auth/validation'
import { DEFAULT_REDIRECT } from '@/lib/auth/constants'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Checkbox } from './Checkbox'
import { GoogleButton } from './GoogleButton'
import { AuthDivider } from './AuthDivider'

interface LoginFormProps {
  returnTo?: string
}

export function LoginForm({ returnTo }: LoginFormProps) {
  const router = useRouter()
  const { setUser, clearReturnTo } = useAuthStore()
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [generalError, setGeneralError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
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
    const validation = validateLogin({
      email: formData.email,
      password: formData.password,
    })

    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      const supabase = createClient()
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) {
        // Handle specific error cases
        if (error.message.includes('Invalid login credentials')) {
          setGeneralError('Invalid email or password')
        } else if (error.message.includes('Email not confirmed')) {
          setGeneralError('Please verify your email address before logging in')
        } else if (error.message.includes('Too many requests')) {
          setGeneralError('Too many login attempts. Please try again later.')
        } else {
          setGeneralError('An error occurred. Please try again.')
        }
        setIsLoading(false)
        return
      }

      if (data.user) {
        // Fetch profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single()

        const authUser = transformToAuthUser(data.user, profile)
        setUser(authUser)

        // Check if onboarding is needed
        if (!authUser.onboardingCompleted) {
          router.push('/onboarding')
          return
        }

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

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Google OAuth */}
      <GoogleButton mode="login" returnTo={returnTo} />
      
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
            placeholder="••••••••"
            autoComplete="current-password"
            disabled={isLoading}
          />
          <div className="mt-2 text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-ink-700 hover:text-ink-900 underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <Checkbox
          name="rememberMe"
          checked={formData.rememberMe}
          onChange={handleChange}
          label="Remember me for 30 days"
          disabled={isLoading}
        />

        <Button
          type="submit"
          fullWidth
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-paper-50/30 border-t-paper-50 rounded-full animate-spin" />
              Signing in...
            </span>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>

      {/* Register link */}
      <p className="mt-8 text-center text-sm text-ink-800">
        Don&apos;t have an account?{' '}
        <Link
          href={returnTo ? `/register?returnTo=${encodeURIComponent(returnTo)}` : '/register'}
          className="font-medium text-ink-900 hover:underline"
        >
          Join the Crew
        </Link>
      </p>
    </div>
  )
}

