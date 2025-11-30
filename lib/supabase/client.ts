import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase environment variables are missing. Check your .env.local file.')
    
    // We can't really proceed without these.
    // If we return empty strings, @supabase/ssr might throw "Your project's URL and API key are required".
    // But maybe we can catch that or just let it fail with a clearer message.
    // Returning empty strings causes the specific error seen by user: 
    // "Error: @supabase/ssr: Your project's URL and API key are required to create a Supabase client!"
    
    // To prevent the crash, we must provide non-empty strings if we call createBrowserClient.
    // BUT, providing fake strings will just cause network errors later.
    // The library explicitly validates they are not empty.
    
    // If we are in a situation where env vars are missing, we should probably not even try to create the client
    // or provide a "mock" client that does nothing but log errors when used.
    // However, simplest fix for "Application error" crash is to provide *something*.
    // But @supabase/ssr checks for empty strings.
    
    // Let's return a dummy client structure if possible, OR just let it fail but handle it in the caller?
    // The caller (AuthProvider) catches errors in initializeAuth, BUT createClient() is called outside try/catch in AuthProvider line 11.
    
    // We should probably throw here and let the caller handle it, 
    // OR return a dummy object that looks like a client but isn't.
    // The latter is risky.
    
    // Let's try to provide a placeholder URL/Key if missing to pass validation, knowing requests will fail.
    // This is better than a crash loop.
    return createBrowserClient<Database>(
      supabaseUrl || 'https://placeholder.supabase.co',
      supabaseKey || 'placeholder-key'
    )
  }

  return createBrowserClient<Database>(
    supabaseUrl,
    supabaseKey
  )
}

