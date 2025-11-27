'use client'

import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { RegionSelector } from '@/components/RegionSelector'
import { navLinks, hasChildren, getNavKey } from './navLinks'
import type { NavLink, NavChild } from './navLinks'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

// Collapsible submenu
function MobileSubmenu({
  link,
  isExpanded,
  onToggle,
  onNavigate,
}: {
  link: NavLink & { children: NavChild[] }
  isExpanded: boolean
  onToggle: () => void
  onNavigate: () => void
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between text-xl font-serif py-3 text-ink-900 active:text-ink-700"
        aria-expanded={isExpanded}
      >
        <span>{link.label}</span>
        <svg
          className={`w-5 h-5 text-ink-600 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`overflow-hidden transition-all duration-200 ${isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="pl-4 pb-2 space-y-1 border-l-2 border-ink-200 ml-2">
          {link.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onNavigate}
              className="block text-lg font-serif py-2 text-ink-700 active:text-ink-900"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function MobileMenuContent({ isOpen, onClose }: MobileMenuProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  // Reset expanded state when menu closes
  useEffect(() => {
    if (!isOpen) {
      setExpandedItem(null)
    }
  }, [isOpen])

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'

      return () => {
        document.body.style.overflow = ''
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        window.scrollTo(0, scrollY)
      }
    }
  }, [isOpen])

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const toggleSubmenu = useCallback((label: string) => {
    setExpandedItem((prev) => (prev === label ? null : label))
  }, [])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-[100] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 right-0 bottom-0 w-full max-w-sm bg-paper-50 z-[101] shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-ink-100">
          <span className="font-serif text-xl">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="p-2 -mr-2 text-ink-900 hover:text-ink-600 active:text-ink-600"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col h-[calc(100%-73px)] overflow-y-auto">
          <div className="flex-1 px-6 py-4 space-y-1">
            {navLinks.map((link) => {
              if (hasChildren(link)) {
                return (
                  <MobileSubmenu
                    key={getNavKey(link)}
                    link={link}
                    isExpanded={expandedItem === link.label}
                    onToggle={() => toggleSubmenu(link.label)}
                    onNavigate={onClose}
                  />
                )
              }

              if (!link.href) return null

              return (
                <Link
                  key={getNavKey(link)}
                  href={link.href}
                  onClick={onClose}
                  className="block text-xl font-serif py-3 text-ink-900 active:text-ink-700"
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Footer */}
          <div className="px-6 py-6 border-t border-ink-100 mt-auto">
            <Button asChild fullWidth className="mb-4">
              <Link href="/box" onClick={onClose}>
                Subscribe Now
              </Link>
            </Button>
            <RegionSelector />
          </div>
        </nav>
      </div>
    </>
  )
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render on server or before mount
  if (!mounted) return null

  // Render via portal to document.body to escape header stacking context
  return createPortal(<MobileMenuContent isOpen={isOpen} onClose={onClose} />, document.body)
}
