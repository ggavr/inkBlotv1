'use client'

import { useState, ReactNode } from 'react'
import clsx from 'clsx'

interface AccordionItemProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-ink-900/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left transition-colors hover:text-ink-700"
      >
        <span className="font-serif text-xl md:text-2xl pr-4">{title}</span>
        <span className="text-2xl flex-shrink-0 transition-transform duration-200" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
          +
        </span>
      </button>
      <div
        className={clsx(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-96 pb-6' : 'max-h-0'
        )}
      >
        <div className="text-ink-800 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}

interface AccordionProps {
  children: ReactNode
  className?: string
}

export function Accordion({ children, className }: AccordionProps) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

