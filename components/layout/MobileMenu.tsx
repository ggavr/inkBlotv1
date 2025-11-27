'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { RegionSelector } from '@/components/RegionSelector'
import clsx from 'clsx'
import { navLinks, hasChildren, getNavKey, getSubmenuId } from './navLinks'
import type { NavLink, NavChild } from './navLinks'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

// Collapsible submenu with smooth height transition
function MobileSubmenu({
  link,
  isOpen,
  onToggle,
  onClose,
}: {
  link: NavLink & { children: NavChild[] }
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)
  const submenuId = getSubmenuId(link.label)

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight)
    }
  }, [link.children])

  return (
    <div className="flex flex-col">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={submenuId}
        onClick={onToggle}
        className="flex items-center justify-between text-lg font-serif hover:text-ink-700 transition-colors py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink-900/20 rounded"
      >
        <span>{link.label}</span>
        <svg
          className={clsx('w-5 h-5 text-ink-700 transition-transform duration-300', isOpen && 'rotate-180')}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 0 1 1.08 1.04l-4.25 4.39a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z" />
        </svg>
        <span className="sr-only">Toggle {link.label} menu</span>
      </button>

      <div
        id={submenuId}
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? contentHeight : 0 }}
      >
        <div ref={contentRef} className="flex flex-col gap-2 pl-4 border-l border-ink-900/10 py-2">
          {link.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onClose}
              tabIndex={isOpen ? 0 : -1}
              className="text-base font-serif text-ink-800 hover:text-ink-700 transition-colors py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink-900/20 rounded"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

// Simple mobile nav link
function MobileNavLink({ link, onClose }: { link: NavLink & { href: string }; onClose: () => void }) {
  return (
    <Link
      href={link.href}
      onClick={onClose}
      className="text-lg font-serif hover:text-ink-700 transition-colors py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink-900/20 rounded"
    >
      {link.label}
    </Link>
  )
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const firstFocusableRef = useRef<HTMLAnchorElement>(null)

  const toggleDropdown = useCallback((label: string) => {
    setOpenDropdown((current) => (current === label ? null : label))
  }, [])

  // Reset dropdown state when menu closes
  useEffect(() => {
    if (!isOpen) {
      setOpenDropdown(null)
    }
  }, [isOpen])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.overflow = 'hidden'

      return () => {
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.left = ''
        document.body.style.right = ''
        document.body.style.overflow = ''
        window.scrollTo(0, scrollY)
      }
    }
  }, [isOpen])

  // Focus trap and keyboard handling
  useEffect(() => {
    if (!isOpen || !menuRef.current) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      // Focus trap
      if (e.key === 'Tab') {
        const focusableElements = menuRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        if (!focusableElements?.length) return

        const firstEl = focusableElements[0]
        const lastEl = focusableElements[focusableElements.length - 1]

        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault()
          lastEl.focus()
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault()
          firstEl.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Focus first item when menu opens
  useEffect(() => {
    if (isOpen && firstFocusableRef.current) {
      // Small delay to let transition start
      const timer = setTimeout(() => {
        firstFocusableRef.current?.focus()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Build nav items, capturing ref for first focusable
  let isFirstLink = true
  const navItems = navLinks.map((link) => {
    if (hasChildren(link)) {
      return (
        <MobileSubmenu
          key={getNavKey(link)}
          link={link}
          isOpen={openDropdown === link.label}
          onToggle={() => toggleDropdown(link.label)}
          onClose={onClose}
        />
      )
    }

    if (!link.href) {
      return null
    }

    const linkWithHref = link as NavLink & { href: string }

    // Capture first link ref
    if (isFirstLink) {
      isFirstLink = false
      return (
        <Link
          key={getNavKey(link)}
          ref={firstFocusableRef}
          href={linkWithHref.href}
          onClick={onClose}
          className="text-lg font-serif hover:text-ink-700 transition-colors py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink-900/20 rounded"
        >
          {linkWithHref.label}
        </Link>
      )
    }

    return <MobileNavLink key={getNavKey(link)} link={linkWithHref} onClose={onClose} />
  })

  return (
    <div
      ref={menuRef}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
      className={clsx(
        'lg:hidden fixed inset-0 bg-paper-50 z-[60] transition-transform duration-300 ease-out',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 p-2 text-ink-900 hover:text-ink-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ink-900/20 rounded"
        aria-label="Close menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <nav className="flex h-full flex-col space-y-4 overflow-y-auto px-6 pb-10 pt-24" aria-label="Mobile navigation">
        {navItems}

        <div className="pt-6 mt-auto border-t border-ink-900/10">
          <Button asChild fullWidth className="mb-4">
            <Link href="/box" onClick={onClose}>
              Subscribe
            </Link>
          </Button>
          <RegionSelector />
        </div>
      </nav>
    </div>
  )
}
