'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { CountrySelect } from '@/components/auth/CountrySelect'
import { Checkbox } from '@/components/auth/Checkbox'
import { useAuthStore } from '@/lib/store/useAuthStore'
import { SUPPORTED_COUNTRIES } from '@/lib/auth/constants'

export function AccountDashboard() {
  const { user, isInitialized, setUser } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    country: user?.country || '',
    marketingConsent: user?.marketingConsent || false,
  })

  if (!isInitialized) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-2 border-ink-900/20 border-t-ink-900 rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-ink-800 mb-4">Please sign in to view your account.</p>
        <Button asChild>
          <Link href="/login">Sign In</Link>
        </Button>
      </div>
    )
  }

  const countryName = SUPPORTED_COUNTRIES.find(c => c.code === user.country)?.name || user.country

  const handleSave = async () => {
    setIsSaving(true)
    setSaveError(null)
    setSaveSuccess(false)

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.fullName,
          country: formData.country,
          marketing_consent: formData.marketingConsent,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setSaveError(data.error || 'Failed to save changes')
        return
      }

      // Update local state
      setUser({
        ...user,
        fullName: data.user.fullName,
        country: data.user.country,
        marketingConsent: data.user.marketingConsent,
      })

      setSaveSuccess(true)
      setIsEditing(false)
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch {
      setSaveError('An error occurred. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      fullName: user.fullName || '',
      country: user.country || '',
      marketingConsent: user.marketingConsent || false,
    })
    setIsEditing(false)
    setSaveError(null)
  }

  return (
    <div className="space-y-8">
      {/* Success message */}
      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded">
          Your changes have been saved successfully.
        </div>
      )}

      {/* Profile Section */}
      <Card className="p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl">Profile</h2>
          {!isEditing && (
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
        </div>

        {saveError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
            {saveError}
          </div>
        )}

        {isEditing ? (
          <div className="space-y-4">
            <Input
              label="Full Name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              disabled={isSaving}
            />
            
            <div>
              <label className="block text-sm font-medium text-ink-900 mb-2">
                Email
              </label>
              <div className="px-4 py-3 bg-grey-100 border border-ink-900/10 text-ink-700">
                {user.email}
              </div>
              <p className="mt-1 text-xs text-grey-500">
                Contact support to change your email address.
              </p>
            </div>

            <CountrySelect
              label="Country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              disabled={isSaving}
            />

            <Checkbox
              label="Receive marketing emails about new books, events, and special offers"
              checked={formData.marketingConsent}
              onChange={(e) => setFormData({ ...formData, marketingConsent: e.target.checked })}
              disabled={isSaving}
            />

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <dl className="space-y-4">
            <div>
              <dt className="text-sm text-grey-600">Name</dt>
              <dd className="text-ink-900">{user.fullName || '—'}</dd>
            </div>
            <div>
              <dt className="text-sm text-grey-600">Email</dt>
              <dd className="text-ink-900">{user.email}</dd>
            </div>
            <div>
              <dt className="text-sm text-grey-600">Country</dt>
              <dd className="text-ink-900">{countryName || '—'}</dd>
            </div>
            <div>
              <dt className="text-sm text-grey-600">Marketing Emails</dt>
              <dd className="text-ink-900">{user.marketingConsent ? 'Subscribed' : 'Not subscribed'}</dd>
            </div>
          </dl>
        )}
      </Card>

      {/* Subscription Section */}
      <Card className="p-6 md:p-8">
        <h2 className="text-2xl mb-6">Subscription</h2>
        
        {user.subscriptionStatus === 'active' ? (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                Active
              </span>
            </div>
            <p className="text-ink-800 mb-4">
              You have an active subscription. Manage your subscription through Shopify.
            </p>
            {/* TODO: Add link to Shopify customer portal */}
            <Button variant="outline" size="sm" disabled>
              Manage Subscription (Coming Soon)
            </Button>
          </div>
        ) : user.subscriptionStatus === 'paused' ? (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                Paused
              </span>
            </div>
            <p className="text-ink-800 mb-4">
              Your subscription is currently paused.
            </p>
            <Button asChild>
              <Link href="/box">Resume Subscription</Link>
            </Button>
          </div>
        ) : user.subscriptionStatus === 'cancelled' ? (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-grey-100 text-grey-800">
                Cancelled
              </span>
            </div>
            <p className="text-ink-800 mb-4">
              Your subscription has been cancelled. Resubscribe to get your next box!
            </p>
            <Button asChild>
              <Link href="/box">Resubscribe</Link>
            </Button>
          </div>
        ) : (
          <div>
            <p className="text-ink-800 mb-4">
              You don&apos;t have an active subscription yet. Subscribe to get quarterly indie romance boxes delivered to your door!
            </p>
            <Button asChild>
              <Link href="/box">Subscribe Now</Link>
            </Button>
          </div>
        )}
      </Card>

      {/* Community Access Section */}
      <Card className="p-6 md:p-8">
        <h2 className="text-2xl mb-6">Community Access</h2>
        
        {user.subscriptionStatus === 'active' ? (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#5865F2]/10 text-[#5865F2]">
                Discord Access Granted
              </span>
            </div>
            <p className="text-ink-800 mb-4">
              You have full access to our Discord community.
            </p>
            <Button asChild variant="outline">
              <Link href="/community">Go to Community</Link>
            </Button>
          </div>
        ) : (
          <div>
            <p className="text-ink-800 mb-4">
              Community access is included with your subscription. Subscribe to join our Discord, book clubs, and exclusive events.
            </p>
            <Button asChild variant="outline">
              <Link href="/community">Learn More</Link>
            </Button>
          </div>
        )}
      </Card>

      {/* Security Section */}
      <Card className="p-6 md:p-8">
        <h2 className="text-2xl mb-6">Security</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-ink-900 mb-2">Password</h3>
            <p className="text-sm text-ink-800 mb-3">
              Change your password to keep your account secure.
            </p>
            <Button asChild variant="outline" size="sm">
              <Link href="/forgot-password">Change Password</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

