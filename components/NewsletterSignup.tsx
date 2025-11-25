'use client'

import { useState, FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // TODO: Integrate with email provider (Klaviyo)
    // Placeholder implementation
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setStatus('success')
    setEmail('')
    
    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        required
        className="bg-ink-800 border-paper-50/20 text-paper-50 placeholder:text-paper-100"
      />
      <Button
        type="submit"
        fullWidth
        variant="secondary"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
      </Button>
    </form>
  )
}

