'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { RegionSelector } from '@/components/RegionSelector'
import clsx from 'clsx'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navLinks: Array<{
    href?: string
    label: string
    children?: Array<{ href: string; label: string }>
  }>
}

export function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const toggleDropdown = (label: string) => {
    setOpenDropdown((current) => (current === label ? null : label))
  }

  return (
    <div
      className={clsx(
        'lg:hidden fixed inset-0 bg-paper-50 z-40 transition-transform duration-300',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      <nav className="flex h-full flex-col space-y-6 overflow-y-auto px-6 pb-10 pt-24">
        {navLinks.map((link) => {
          if (!link.children) {
            if (!link.href) {
              return null
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="text-lg font-serif hover:text-ink-700 transition-colors py-2"
              >
                {link.label}
              </Link>
            )
          }

          const isOpenDropdown = openDropdown === link.label
          const submenuId = `submenu-${link.label.toLowerCase().replace(/\s+/g, '-')}`
          const dropdownKey = link.href ?? link.label

          return (
            <div key={dropdownKey} className="flex flex-col gap-2">
              <button
                type="button"
                aria-expanded={isOpenDropdown}
                aria-controls={submenuId}
                onClick={() => toggleDropdown(link.label)}
                className="flex items-center justify-between text-lg font-serif hover:text-ink-700 transition-colors py-2"
              >
                <span>{link.label}</span>
                <svg
                  className={clsx('w-5 h-5 text-ink-700 transition-transform', isOpenDropdown && 'rotate-180')}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 0 1 1.08 1.04l-4.25 4.39a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z" />
                </svg>
                <span className="sr-only">Toggle {link.label} menu</span>
              </button>

              {isOpenDropdown && (
                <div id={submenuId} className="flex flex-col gap-2 pl-4 border-l border-ink-900/10">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={onClose}
                      className="text-base font-serif text-ink-800 hover:text-ink-700 transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
        
        <div className="pt-6 border-t border-ink-900/10">
          <Button asChild fullWidth className="mb-4">
            <Link href="/box" onClick={onClose}>Subscribe</Link>
          </Button>
          <RegionSelector />
        </div>
      </nav>
    </div>
  )
}

