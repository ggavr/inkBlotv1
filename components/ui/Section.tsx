import { ReactNode } from 'react'
import clsx from 'clsx'
import { Container } from './Container'

interface SectionProps {
  children: ReactNode
  className?: string
  containerSize?: 'default' | 'narrow' | 'wide'
  withBorder?: boolean
  background?: 'paper' | 'white' | 'grey'
  id?: string
}

export function Section({ 
  children, 
  className, 
  containerSize = 'default',
  withBorder = false,
  background = 'paper',
  id
}: SectionProps) {
  return (
    <section
      id={id}
      className={clsx(
        'py-16 md:py-24 lg:py-32',
        {
          'bg-paper-50': background === 'paper',
          'bg-white': background === 'white',
          'bg-grey-100': background === 'grey',
          'border-t border-ink-900/10': withBorder,
        },
        className
      )}
    >
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  )
}

