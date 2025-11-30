// Supported countries for shipping/registration
export const SUPPORTED_COUNTRIES = [
  { code: 'GB', name: 'United Kingdom' },
  { code: 'IE', name: 'Ireland' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'BE', name: 'Belgium' },
  { code: 'AT', name: 'Austria' },
  { code: 'ES', name: 'Spain' },
  { code: 'IT', name: 'Italy' },
  { code: 'PT', name: 'Portugal' },
  { code: 'SE', name: 'Sweden' },
  { code: 'DK', name: 'Denmark' },
  { code: 'FI', name: 'Finland' },
  { code: 'PL', name: 'Poland' },
] as const

export type CountryCode = typeof SUPPORTED_COUNTRIES[number]['code']

// Password validation rules
export const PASSWORD_MIN_LENGTH = 8
export const PASSWORD_RULES = {
  minLength: PASSWORD_MIN_LENGTH,
  requireLetter: true,
  requireNumber: true,
  recommendSpecialChar: true,
}

// Routes
export const AUTH_ROUTES = {
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  onboarding: '/onboarding',
  callback: '/auth/callback',
} as const

export const PROTECTED_ROUTES = [
  '/account',
  '/onboarding',
] as const

export const AUTH_REQUIRED_FOR_ACTION_ROUTES = [
  '/library', // Waitlist requires auth
  '/community', // Discord access requires auth
] as const

// Default redirect after login
export const DEFAULT_REDIRECT = '/account'

// Session settings
export const SESSION_COOKIE_NAME = 'sb-auth-token'
export const REMEMBER_ME_DURATION_DAYS = 30
export const DEFAULT_SESSION_DURATION_HOURS = 24

