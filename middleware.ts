import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { PROTECTED_ROUTES, AUTH_ROUTES } from '@/lib/auth/constants'
import type { Profile } from '@/lib/supabase/types'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Update session and get user
  const { response, user, supabase } = await updateSession(request)

  // Check if the current path is a protected route
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  )

  // Check if the current path is an auth route (login, register, etc.)
  const isAuthRoute = Object.values(AUTH_ROUTES).some((route) =>
    pathname.startsWith(route)
  )

  // If user is not authenticated and trying to access protected route
  if (isProtectedRoute && !user) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('returnTo', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If user is authenticated and trying to access auth routes (except callback)
  if (user && isAuthRoute && !pathname.startsWith('/auth/callback')) {
    // Check if user has completed onboarding
    const { data: profile } = await supabase
      .from('profiles')
      .select('onboarding_completed')
      .eq('id', user.id)
      .single() as { data: Pick<Profile, 'onboarding_completed'> | null; error: unknown }

    // If onboarding not completed and not on onboarding page, redirect there
    if ((!profile || !profile.onboarding_completed) && pathname !== '/onboarding') {
      return NextResponse.redirect(new URL('/onboarding', request.url))
    }

    // If onboarding completed and on auth page, redirect to account
    if (profile?.onboarding_completed && pathname !== '/onboarding') {
      return NextResponse.redirect(new URL('/account', request.url))
    }
  }

  // If user is authenticated but hasn't completed onboarding
  if (user && isProtectedRoute && pathname !== '/onboarding') {
    const { data: profile } = await supabase
      .from('profiles')
      .select('onboarding_completed')
      .eq('id', user.id)
      .single() as { data: Pick<Profile, 'onboarding_completed'> | null; error: unknown }

    if (!profile || !profile.onboarding_completed) {
      const onboardingUrl = new URL('/onboarding', request.url)
      onboardingUrl.searchParams.set('returnTo', pathname)
      return NextResponse.redirect(onboardingUrl)
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes (handled separately)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

