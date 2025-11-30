'use client'

import { validatePassword } from '@/lib/auth/validation'
import clsx from 'clsx'

interface PasswordStrengthProps {
  password: string
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const { checks } = validatePassword(password)
  
  const requirements = [
    { key: 'minLength', label: '8+ characters', met: checks.minLength },
    { key: 'hasLetter', label: 'One letter', met: checks.hasLetter },
    { key: 'hasNumber', label: 'One number', met: checks.hasNumber },
    { key: 'hasSpecialChar', label: 'Special character (recommended)', met: checks.hasSpecialChar },
  ]
  
  const requiredMet = checks.minLength && checks.hasLetter && checks.hasNumber
  const strength = requiredMet ? (checks.hasSpecialChar ? 'strong' : 'good') : 'weak'

  if (!password) return null

  return (
    <div className="mt-2 space-y-2">
      {/* Strength bar */}
      <div className="flex gap-1">
        {[1, 2, 3].map((level) => (
          <div
            key={level}
            className={clsx(
              'h-1 flex-1 rounded-full transition-colors',
              {
                'bg-red-400': strength === 'weak' && level === 1,
                'bg-amber-400': strength === 'good' && level <= 2,
                'bg-emerald-500': strength === 'strong',
                'bg-grey-200': 
                  (strength === 'weak' && level > 1) ||
                  (strength === 'good' && level > 2),
              }
            )}
          />
        ))}
      </div>
      
      {/* Requirements checklist */}
      <ul className="grid grid-cols-2 gap-1 text-xs">
        {requirements.map((req) => (
          <li
            key={req.key}
            className={clsx(
              'flex items-center gap-1.5',
              req.met ? 'text-emerald-600' : 'text-grey-500'
            )}
          >
            {req.met ? (
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
              </svg>
            )}
            {req.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

