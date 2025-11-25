'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import clsx from 'clsx'

declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

export function CookieConsent() {
  const [show, setShow] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShow(true)
    } else {
      // Apply saved consent
      const consentValue = JSON.parse(consent)
      updateConsent(consentValue)
    }
  }, [])

  const updateConsent = (consent: { analytics: boolean; marketing: boolean }) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': consent.analytics ? 'granted' : 'denied',
        'ad_storage': consent.marketing ? 'granted' : 'denied',
        'ad_user_data': consent.marketing ? 'granted' : 'denied',
        'ad_personalization': consent.marketing ? 'granted' : 'denied',
      })
    }
  }

  const handleAcceptAll = () => {
    const consent = { analytics: true, marketing: true }
    localStorage.setItem('cookie-consent', JSON.stringify(consent))
    updateConsent(consent)
    setShow(false)
  }

  const handleRejectAll = () => {
    const consent = { analytics: false, marketing: false }
    localStorage.setItem('cookie-consent', JSON.stringify(consent))
    updateConsent(consent)
    setShow(false)
  }

  const handleSavePreferences = (analytics: boolean, marketing: boolean) => {
    const consent = { analytics, marketing }
    localStorage.setItem('cookie-consent', JSON.stringify(consent))
    updateConsent(consent)
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-ink-900 text-paper-50 border-t border-paper-50/10">
      <div className="max-w-7xl mx-auto p-6">
        {!showDetails ? (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-serif text-xl mb-2">Cookie Preferences</h3>
              <p className="text-sm text-paper-100 leading-relaxed">
                We use cookies to enhance your browsing experience and analyze our traffic. 
                You can choose which types of cookies to accept.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDetails(true)}
                className="border-paper-50 text-paper-50 hover:bg-paper-50 hover:text-ink-900"
              >
                Customize
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleRejectAll}
              >
                Reject All
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptAll}
                className="bg-paper-50 text-ink-900 hover:bg-paper-100"
              >
                Accept All
              </Button>
            </div>
          </div>
        ) : (
          <CookiePreferences
            onSave={handleSavePreferences}
            onBack={() => setShowDetails(false)}
          />
        )}
      </div>
    </div>
  )
}

function CookiePreferences({ 
  onSave, 
  onBack 
}: { 
  onSave: (analytics: boolean, marketing: boolean) => void
  onBack: () => void
}) {
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-xl mb-4">Cookie Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-start justify-between pb-4 border-b border-paper-50/10">
            <div className="flex-1 pr-4">
              <h4 className="font-medium mb-1">Essential Cookies</h4>
              <p className="text-sm text-paper-100">
                Required for the website to function. These cannot be disabled.
              </p>
            </div>
            <div className="text-sm text-paper-100">Always Active</div>
          </div>

          <div className="flex items-start justify-between pb-4 border-b border-paper-50/10">
            <div className="flex-1 pr-4">
              <h4 className="font-medium mb-1">Analytics Cookies</h4>
              <p className="text-sm text-paper-100">
                Help us understand how visitors use our site to improve the experience.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-grey-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-paper-50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-paper-50"></div>
            </label>
          </div>

          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <h4 className="font-medium mb-1">Marketing Cookies</h4>
              <p className="text-sm text-paper-100">
                Used to track visitors across websites for advertising purposes.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-grey-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-paper-50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-paper-50"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={onBack}
          className="border-paper-50 text-paper-50 hover:bg-paper-50 hover:text-ink-900"
        >
          Back
        </Button>
        <Button
          onClick={() => onSave(analytics, marketing)}
          className="bg-paper-50 text-ink-900 hover:bg-paper-100"
        >
          Save Preferences
        </Button>
      </div>
    </div>
  )
}

