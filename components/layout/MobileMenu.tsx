'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { RegionSelector } from '@/components/RegionSelector'
import clsx from 'clsx'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navLinks: Array<{ href: string; label: string }>
}

export function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
  return (
    <div
      className={clsx(
        'lg:hidden fixed inset-0 top-20 bg-paper-50 z-40 transition-transform duration-300',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      <nav className="flex flex-col p-6 space-y-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="text-lg font-serif hover:text-ink-700 transition-colors py-2"
          >
            {link.label}
          </Link>
        ))}
        
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

