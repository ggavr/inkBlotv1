import clsx, { ClassValue } from 'clsx'

/**
 * Utility function to merge class names
 * Wrapper around clsx for convenience
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

