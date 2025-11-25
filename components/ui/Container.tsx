import { ReactNode } from 'react'
import clsx from 'clsx'

interface ContainerProps {
  children: ReactNode
  className?: string
  size?: 'default' | 'narrow' | 'wide'
}

export function Container({ children, className, size = 'default' }: ContainerProps) {
  return (
    <div
      className={clsx(
        'mx-auto px-6 md:px-8 lg:px-12',
        {
          'max-w-7xl': size === 'default',
          'max-w-4xl': size === 'narrow',
          'max-w-8xl': size === 'wide',
        },
        className
      )}
    >
      {children}
    </div>
  )
}

