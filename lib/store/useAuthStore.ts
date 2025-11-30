import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@supabase/supabase-js'
import type { Profile } from '@/lib/supabase/types'

export interface AuthUser {
  id: string
  email: string
  fullName: string | null
  country: string | null
  marketingConsent: boolean
  subscriptionStatus: 'none' | 'active' | 'paused' | 'cancelled'
  discordInviteSent: boolean
  onboardingCompleted: boolean
}

interface AuthState {
  user: AuthUser | null
  isLoading: boolean
  isInitialized: boolean
  returnTo: string | null
  
  // Actions
  setUser: (user: AuthUser | null) => void
  setLoading: (loading: boolean) => void
  setInitialized: (initialized: boolean) => void
  setReturnTo: (path: string | null) => void
  clearReturnTo: () => string | null
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: true,
      isInitialized: false,
      returnTo: null,

      setUser: (user) => set({ user, isLoading: false }),
      setLoading: (isLoading) => set({ isLoading }),
      setInitialized: (isInitialized) => set({ isInitialized, isLoading: false }),
      setReturnTo: (returnTo) => set({ returnTo }),
      
      clearReturnTo: () => {
        const { returnTo } = get()
        set({ returnTo: null })
        return returnTo
      },
      
      logout: () => set({ user: null, isLoading: false }),
    }),
    {
      name: 'inkblot-auth-storage',
      partialize: (state) => ({ returnTo: state.returnTo }),
    }
  )
)

// Helper to transform Supabase user + profile to AuthUser
export function transformToAuthUser(user: User, profile: Profile | null): AuthUser {
  return {
    id: user.id,
    email: user.email || '',
    fullName: profile?.full_name || user.user_metadata?.full_name || null,
    country: profile?.country || null,
    marketingConsent: profile?.marketing_consent || false,
    subscriptionStatus: profile?.subscription_status || 'none',
    discordInviteSent: profile?.discord_invite_sent || false,
    onboardingCompleted: profile?.onboarding_completed || false,
  }
}

