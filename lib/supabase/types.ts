export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          country: string | null
          marketing_consent: boolean
          terms_accepted_at: string | null
          subscription_status: 'none' | 'active' | 'paused' | 'cancelled'
          discord_invite_sent: boolean
          onboarding_completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          country?: string | null
          marketing_consent?: boolean
          terms_accepted_at?: string | null
          subscription_status?: 'none' | 'active' | 'paused' | 'cancelled'
          discord_invite_sent?: boolean
          onboarding_completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          country?: string | null
          marketing_consent?: boolean
          terms_accepted_at?: string | null
          subscription_status?: 'none' | 'active' | 'paused' | 'cancelled'
          discord_invite_sent?: boolean
          onboarding_completed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      library_waitlist: {
        Row: {
          id: string
          user_id: string
          email: string
          country: string
          joined_at: string
          status: 'pending' | 'invited' | 'active'
        }
        Insert: {
          id?: string
          user_id: string
          email: string
          country: string
          joined_at?: string
          status?: 'pending' | 'invited' | 'active'
        }
        Update: {
          id?: string
          user_id?: string
          email?: string
          country?: string
          joined_at?: string
          status?: 'pending' | 'invited' | 'active'
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      subscription_status: 'none' | 'active' | 'paused' | 'cancelled'
      waitlist_status: 'pending' | 'invited' | 'active'
    }
  }
}

// Helper types for easier use
export type Profile = Database['public']['Tables']['profiles']['Row']
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

export type LibraryWaitlist = Database['public']['Tables']['library_waitlist']['Row']
export type LibraryWaitlistInsert = Database['public']['Tables']['library_waitlist']['Insert']

