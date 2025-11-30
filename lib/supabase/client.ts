import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase environment variables are missing')
    // Return a dummy client or throw a more descriptive error?
    // If we return a client with empty strings, it will fail on network requests, which is expected.
    // But at least it won't crash the app initialization.
    // However, createBrowserClient might validate inputs.
    // Let's try to return it anyway, but with empty strings if missing, to avoid runtime crash on 'undefined'.
    return createBrowserClient<Database>(
      supabaseUrl || '',
      supabaseKey || ''
    )
  }

  return createBrowserClient<Database>(
    supabaseUrl,
    supabaseKey
  )
}

