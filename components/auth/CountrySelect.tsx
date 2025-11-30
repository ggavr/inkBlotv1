'use client'

import { forwardRef, SelectHTMLAttributes } from 'react'
import { SUPPORTED_COUNTRIES } from '@/lib/auth/constants'
import clsx from 'clsx'

interface CountrySelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string
  error?: string
}

export const CountrySelect = forwardRef<HTMLSelectElement, CountrySelectProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const selectId = id || `country-select-${Math.random().toString(36).substr(2, 9)}`

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-ink-900 mb-2"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={clsx(
            'w-full px-4 py-3 border border-ink-900/20 bg-white',
            'text-ink-900 placeholder:text-grey-400',
            'focus:outline-none focus:ring-2 focus:ring-ink-900 focus:border-transparent',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-colors duration-200 appearance-none',
            'bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E")] bg-[length:1.5rem_1.5rem] bg-[right_0.5rem_center] bg-no-repeat pr-10',
            {
              'border-red-500 focus:ring-red-500': error,
            },
            className
          )}
          {...props}
        >
          <option value="">Select your country</option>
          {SUPPORTED_COUNTRIES.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }
)

CountrySelect.displayName = 'CountrySelect'

