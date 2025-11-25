'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { RegionSelector } from '@/components/RegionSelector'
import { CartButton } from '@/components/cart/CartButton'
import { MobileMenu } from './MobileMenu'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/box', label: 'Box' },
    { href: '/shop', label: 'Shop' },
    { href: '/community', label: 'Community' },
    { href: '/publishers', label: 'For Publishers' },
    { href: '/about', label: 'About' },
    { href: '/faq', label: 'FAQ' },
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink-900 hover:text-ink-700 transition-colors"
              >
                {link.label}
              </Link>
            ))}
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

