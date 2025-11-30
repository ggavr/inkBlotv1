import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { Profile } from '@/lib/supabase/types'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // Get returnTo from URL query parameter (passed through OAuth flow)
  const returnTo = searchParams.get('returnTo')
  const defaultRedirect = '/account'
  
  if (code) {
    const supabase = createClient()
    
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && data.user) {
      // Check if user has completed onboarding (has profile with required fields)
      const { data: profile } = await supabase
        .from('profiles')
        .select('onboarding_completed, country')
        .eq('id', data.user.id)
        .single() as { data: Pick<Profile, 'onboarding_completed' | 'country'> | null; error: unknown }

      // If no profile exists or onboarding not completed, redirect to onboarding
      // This handles Google OAuth users who need to provide country + consent
      if (!profile || !profile.onboarding_completed) {
        const onboardingUrl = new URL('/onboarding', origin)
        if (returnTo) {
          onboardingUrl.searchParams.set('returnTo', returnTo)
        }
        
        return NextResponse.redirect(onboardingUrl)
      }

      // User has completed onboarding, redirect to intended destination
      const redirectPath = returnTo || defaultRedirect
      return NextResponse.redirect(new URL(redirectPath, origin))
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(new URL('/login?error=auth_callback_error', origin))
}

