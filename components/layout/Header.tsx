'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { RegionSelector } from '@/components/RegionSelector'
import { CartButton } from '@/components/cart/CartButton'
import { MobileMenu } from './MobileMenu'

type NavLink = {
  label: string
  href?: string
  children?: Array<{ href: string; label: string }>
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState<string | null>(null)

  const navLinks: NavLink[] = [
    { href: '/box', label: 'Box' },
    { href: '/community', label: 'Community' },
    // { href: '/shop', label: 'Shop' },
    { href: '/faq', label: "FAQ's" },
    {
      label: 'Collaborate',
      children: [
        { href: '/publishers', label: 'For Publishers' },
        { href: '/authors', label: 'For Authors' },
      ],
    },
    { href: '/about', label: 'About' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-paper-50/95 backdrop-blur-sm border-b border-ink-900/10">
      <Container size="wide">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="font-serif text-2xl font-normal tracking-tight hover:opacity-70 transition-opacity">
            Inkblot Crew
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              if (link.children) {
                const isDropdownOpen = desktopDropdownOpen === link.label

                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setDesktopDropdownOpen(link.label)}
                    onMouseLeave={() => setDesktopDropdownOpen(null)}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setDesktopDropdownOpen(isDropdownOpen ? null : link.label)
                      }
                      className="text-sm font-medium text-ink-900 hover:text-ink-700 transition-colors inline-flex items-center gap-1 focus:outline-none"
                      aria-haspopup="true"
                      aria-expanded={isDropdownOpen}
                    >
                      {link.label}
                      <svg
                        className={`w-3.5 h-3.5 text-ink-700 transition-transform ${
                          isDropdownOpen ? 'rotate-180' : ''
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 0 1 1.08 1.04l-4.25 4.39a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z" />
                      </svg>
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute left-0 top-full mt-2 min-w-[180px] rounded-md border border-ink-900/10 bg-white py-2 shadow-lg">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-ink-900 hover:text-ink-700 hover:bg-grey-50 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              if (!link.href) {
                return null
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-ink-900 hover:text-ink-700 transition-colors"
                >
                  {link.label}
                </Link>
              )
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
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-ink-900"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </header>
  )
}

