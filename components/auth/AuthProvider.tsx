'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore, transformToAuthUser } from '@/lib/store/useAuthStore'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setInitialized, isInitialized } = useAuthStore()

  useEffect(() => {
    const supabase = createClient()

    // Initial session check
    const initializeAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()

        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .maybeSingle()

          const authUser = transformToAuthUser(user, profile)
          setUser(authUser)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        setUser(null)
      } finally {
        setInitialized(true)
      }
    }

    if (!isInitialized) {
      initializeAuth()
    }

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        try {
          if (event === 'SIGNED_IN' && session?.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .maybeSingle()

            const authUser = transformToAuthUser(session.user, profile)
            setUser(authUser)
          } else if (event === 'SIGNED_OUT') {
            setUser(null)
          } else if (event === 'TOKEN_REFRESHED' && session?.user) {
            // Refresh user data on token refresh
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .maybeSingle()

            const authUser = transformToAuthUser(session.user, profile)
            setUser(authUser)
          }
        } catch (error) {
          console.error('Auth state change error:', error)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [setUser, setInitialized, isInitialized])

  return <>{children}</>
}

