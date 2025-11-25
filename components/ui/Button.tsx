import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  asChild?: boolean
  children: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    fullWidth = false,
    className,
    disabled,
    asChild,
    ...props 
  }, ref) => {
    const classes = clsx(
      'inline-flex items-center justify-center font-sans font-medium transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ink-900',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      {
        // Variants
        'bg-ink-900 text-paper-50 hover:bg-ink-800': variant === 'primary' && !disabled,
        'bg-grey-200 text-ink-900 hover:bg-grey-300': variant === 'secondary' && !disabled,
        'border border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-paper-50': variant === 'outline' && !disabled,
        'text-ink-900 hover:bg-grey-100': variant === 'ghost' && !disabled,
        
        // Sizes
        'px-4 py-2 text-sm': size === 'sm',
        'px-6 py-3 text-base': size === 'md',
        'px-8 py-4 text-lg': size === 'lg',
        
        // Full width
        'w-full': fullWidth,
      },
      className
    )

    // If asChild is true, pass className to the child element
    if (asChild && children) {
      // Clone the child element and merge className
      const child = children as any
      if (child?.type) {
        return <child.type {...child.props} className={clsx(classes, child.props?.className)} />
      }
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={classes}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

