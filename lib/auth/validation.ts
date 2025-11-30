import { PASSWORD_MIN_LENGTH, SUPPORTED_COUNTRIES } from './constants'

export interface ValidationResult {
  isValid: boolean
  error?: string
}

export interface PasswordValidationResult extends ValidationResult {
  checks: {
    minLength: boolean
    hasLetter: boolean
    hasNumber: boolean
    hasSpecialChar: boolean
  }
}

// Email validation
export function validateEmail(email: string): ValidationResult {
  if (!email || email.trim().length === 0) {
    return { isValid: false, error: 'Email is required' }
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' }
  }
  
  return { isValid: true }
}

// Password validation
export function validatePassword(password: string): PasswordValidationResult {
  const checks = {
    minLength: password.length >= PASSWORD_MIN_LENGTH,
    hasLetter: /[a-zA-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  }
  
  if (!password || password.length === 0) {
    return {
      isValid: false,
      error: 'Password is required',
      checks,
    }
  }
  
  if (!checks.minLength) {
    return {
      isValid: false,
      error: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
      checks,
    }
  }
  
  if (!checks.hasLetter) {
    return {
      isValid: false,
      error: 'Password must contain at least one letter',
      checks,
    }
  }
  
  if (!checks.hasNumber) {
    return {
      isValid: false,
      error: 'Password must contain at least one number',
      checks,
    }
  }
  
  return { isValid: true, checks }
}

// Password confirmation validation
export function validatePasswordMatch(password: string, confirmPassword: string): ValidationResult {
  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match' }
  }
  return { isValid: true }
}

// Name validation
export function validateName(name: string): ValidationResult {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: 'Name is required' }
  }
  
  if (name.trim().length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters' }
  }
  
  return { isValid: true }
}

// Country validation
export function validateCountry(country: string): ValidationResult {
  if (!country || country.length === 0) {
    return { isValid: false, error: 'Please select your country' }
  }
  
  const isValidCountry = SUPPORTED_COUNTRIES.some(c => c.code === country)
  if (!isValidCountry) {
    return { isValid: false, error: 'Please select a supported country' }
  }
  
  return { isValid: true }
}

// Terms consent validation
export function validateTermsConsent(accepted: boolean): ValidationResult {
  if (!accepted) {
    return { isValid: false, error: 'You must accept the Terms and Privacy Policy to continue' }
  }
  return { isValid: true }
}

// Full registration form validation
export interface RegistrationData {
  email: string
  password: string
  fullName: string
  country: string
  termsAccepted: boolean
  marketingConsent: boolean
}

export interface RegistrationValidationResult {
  isValid: boolean
  errors: {
    email?: string
    password?: string
    fullName?: string
    country?: string
    termsAccepted?: string
  }
}

export function validateRegistration(data: RegistrationData): RegistrationValidationResult {
  const errors: RegistrationValidationResult['errors'] = {}
  
  const emailResult = validateEmail(data.email)
  if (!emailResult.isValid) errors.email = emailResult.error
  
  const passwordResult = validatePassword(data.password)
  if (!passwordResult.isValid) errors.password = passwordResult.error
  
  const nameResult = validateName(data.fullName)
  if (!nameResult.isValid) errors.fullName = nameResult.error
  
  const countryResult = validateCountry(data.country)
  if (!countryResult.isValid) errors.country = countryResult.error
  
  const termsResult = validateTermsConsent(data.termsAccepted)
  if (!termsResult.isValid) errors.termsAccepted = termsResult.error
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

// Login form validation
export interface LoginData {
  email: string
  password: string
}

export interface LoginValidationResult {
  isValid: boolean
  errors: {
    email?: string
    password?: string
  }
}

export function validateLogin(data: LoginData): LoginValidationResult {
  const errors: LoginValidationResult['errors'] = {}
  
  const emailResult = validateEmail(data.email)
  if (!emailResult.isValid) errors.email = emailResult.error
  
  if (!data.password || data.password.length === 0) {
    errors.password = 'Password is required'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

