'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { RegionSelector } from '@/components/RegionSelector'
import { CartButton } from '@/components/cart/CartButton'
import { MobileMenu } from './MobileMenu'
import { navLinks, hasChildren, getNavKey, getSubmenuId } from './navLinks'
import type { NavLink } from './navLinks'

// Desktop dropdown with improved hover/keyboard behavior
function DesktopDropdown({
  link,
  isOpen,
  onOpen,
  onClose,
}: {
  link: NavLink & { children: NonNullable<NavLink['children']> }
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const submenuId = getSubmenuId(link.label)

  const cancelClose = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }, [])

  const scheduleClose = useCallback(() => {
    cancelClose()
    closeTimeoutRef.current = setTimeout(() => {
      onClose()
    }, 150) // small delay so user can move into submenu
  }, [cancelClose, onClose])

  // Clean up timeout on unmount
  useEffect(() => {
    return () => cancelClose()
  }, [cancelClose])

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        ;(e.currentTarget as HTMLElement).focus()
      } else if (e.key === 'ArrowDown' && !isOpen) {
        e.preventDefault()
        onOpen()
      }
    },
    [isOpen, onOpen, onClose]
  )

  // Close on blur outside
  const handleBlur = useCallback(
    (e: React.FocusEvent) => {
      if (!containerRef.current?.contains(e.relatedTarget as Node)) {
        scheduleClose()
      }
    },
    [scheduleClose]
  )

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose()
        onOpen()
      }}
      onMouseLeave={scheduleClose}
      onFocus={cancelClose}
      onBlur={handleBlur}
    >
      <button
        type="button"
        onClick={() => (isOpen ? onClose() : onOpen())}
        onKeyDown={handleKeyDown}
        className="text-sm font-medium text-ink-900 hover:text-ink-700 transition-colors inline-flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink-900/20 rounded px-1 -mx-1"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={submenuId}
      >
        {link.label}
        <svg
          className={`w-3.5 h-3.5 text-ink-700 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 0 1 1.08 1.04l-4.25 4.39a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z" />
        </svg>
      </button>

      <div
        id={submenuId}
        role="menu"
        className={`absolute left-0 top-full mt-2 min-w-[180px] rounded-md border border-ink-900/10 bg-white py-2 shadow-lg transition-all duration-200 origin-top ${
          isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {link.children.map((child) => (
          <Link
            key={child.href}
            href={child.href}
            role="menuitem"
            tabIndex={isOpen ? 0 : -1}
            className="block px-4 py-2 text-sm text-ink-900 hover:text-ink-700 hover:bg-grey-50 transition-colors focus:bg-grey-50 focus:outline-none"
            onClick={onClose}
          >
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

// Simple desktop nav link
function DesktopNavLink({ link }: { link: NavLink & { href: string } }) {
  return (
    <Link
      href={link.href}
      className="text-sm font-medium text-ink-900 hover:text-ink-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ink-900/20 rounded px-1 -mx-1"
    >
      {link.label}
    </Link>
  )
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 bg-paper-50/95 backdrop-blur-sm border-b border-ink-900/10">
      <Container size="wide">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="font-serif text-2xl font-normal tracking-tight hover:opacity-70 transition-opacity">
            Inkblot Crew
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8" aria-label="Main navigation">
            {navLinks.map((link) => {
              if (hasChildren(link)) {
                return (
                  <DesktopDropdown
                    key={getNavKey(link)}
                    link={link}
                    isOpen={desktopDropdownOpen === link.label}
                    onOpen={() => setDesktopDropdownOpen(link.label)}
                    onClose={() => setDesktopDropdownOpen(null)}
                  />
                )
              }

              if (!link.href) {
                return null
              }

              return <DesktopNavLink key={getNavKey(link)} link={link as NavLink & { href: string }} />
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <RegionSelector />
            </div>
            <Button asChild size="sm" className="hidden lg:inline-flex">
              <Link href="/box">Subscribe</Link>
            </Button>
            <CartButton />

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-ink-900 hover:text-ink-700 active:text-ink-700"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  )
}
