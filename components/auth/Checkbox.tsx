'use client'

import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode
  error?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`

    return (
      <div className="w-full">
        <label
          htmlFor={checkboxId}
          className={clsx(
            'flex items-start gap-3 cursor-pointer group',
            props.disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={clsx(
              'mt-0.5 h-5 w-5 shrink-0',
              'border border-ink-900/30 bg-white',
              'text-ink-900 rounded-sm',
              'focus:ring-2 focus:ring-ink-900 focus:ring-offset-2',
              'checked:bg-ink-900 checked:border-ink-900',
              'transition-colors duration-200',
              {
                'border-red-500': error,
              },
              className
            )}
            {...props}
          />
          <span className="text-sm text-ink-800 leading-tight select-none">
            {label}
          </span>
        </label>
        {error && (
          <p className="mt-2 text-sm text-red-600 ml-8">{error}</p>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

