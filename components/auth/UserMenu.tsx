'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/lib/store/useAuthStore'
import clsx from 'clsx'

export function UserMenu() {
  const router = useRouter()
  const { user, logout, isLoading, isInitialized } = useAuthStore()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = useCallback(async () => {
    setIsLoggingOut(true)
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      logout()
      setIsOpen(false)
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }, [logout, router])

  // Show loading state while initializing
  if (!isInitialized || isLoading) {
    return (
      <div className="w-8 h-8 rounded-full bg-grey-200 animate-pulse" />
    )
  }

  // Show login button if not authenticated
  if (!user) {
    return (
      <Link
        href="/login"
        className="text-sm font-medium text-ink-900 hover:text-ink-700 transition-colors"
      >
        Sign In
      </Link>
    )
  }

  // Get user initials for avatar
  const initials = user.fullName
    ? user.fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : user.email[0].toUpperCase()

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'flex items-center gap-2 p-1 rounded-full',
          'hover:bg-grey-100 transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-ink-900/20'
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-8 h-8 rounded-full bg-ink-900 text-paper-50 flex items-center justify-center text-sm font-medium">
          {initials}
        </div>
      </button>

      {/* Dropdown menu */}
      <div
        className={clsx(
          'absolute right-0 top-full mt-2 w-56 rounded-md border border-ink-900/10 bg-white py-1 shadow-lg',
          'transition-all duration-200 origin-top-right',
          isOpen
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'
        )}
        role="menu"
      >
        {/* User info */}
        <div className="px-4 py-3 border-b border-ink-900/10">
          <p className="text-sm font-medium text-ink-900 truncate">
            {user.fullName || 'Inkblot Member'}
          </p>
          <p className="text-xs text-grey-500 truncate">{user.email}</p>
        </div>

        {/* Menu items */}
        <div className="py-1">
          <Link
            href="/account"
            className="block px-4 py-2 text-sm text-ink-900 hover:bg-grey-50 transition-colors"
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            My Account
          </Link>
          {user.subscriptionStatus === 'active' && (
            <Link
              href="/community"
              className="block px-4 py-2 text-sm text-ink-900 hover:bg-grey-50 transition-colors"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              Community
            </Link>
          )}
        </div>

        {/* Logout */}
        <div className="border-t border-ink-900/10 py-1">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full text-left px-4 py-2 text-sm text-ink-900 hover:bg-grey-50 transition-colors disabled:opacity-50"
            role="menuitem"
          >
            {isLoggingOut ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      </div>
    </div>
  )
}

