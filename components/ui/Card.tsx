import { ReactNode } from 'react'
import clsx from 'clsx'

interface CardProps {
  children: ReactNode
  className?: string
  hoverable?: boolean
}

export function Card({ children, className, hoverable = false }: CardProps) {
  return (
    <div
      className={clsx(
        'border border-ink-900/10 bg-paper-50',
        {
          'transition-all duration-200 hover:border-ink-900/20 hover:shadow-sm': hoverable,
        },
        className
      )}
    >
      {children}
    </div>
  )
}

