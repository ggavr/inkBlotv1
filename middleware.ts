import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { PROTECTED_ROUTES, AUTH_ROUTES } from '@/lib/auth/constants'
import type { Profile } from '@/lib/supabase/types'

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl

    // Update session and get user
    const { response, user, supabase } = await updateSession(request)

    if (!supabase) {
      return response
    }

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

    // If user is authenticated, check onboarding status
    if (user && (isAuthRoute || isProtectedRoute) && !pathname.startsWith('/auth/callback')) {
      // We only need to check profile if we are on an auth route or protected route
      // Use maybeSingle() instead of single() to avoid errors if no row exists
      const { data: profile } = await supabase
        .from('profiles')
        .select('onboarding_completed')
        .eq('id', user.id)
        .maybeSingle() as { data: Pick<Profile, 'onboarding_completed'> | null; error: unknown }

      const isOnboarding = pathname === '/onboarding'
      const hasCompletedOnboarding = profile?.onboarding_completed

      // If onboarding not completed and not on onboarding page, redirect there
      if (!hasCompletedOnboarding && !isOnboarding) {
        const onboardingUrl = new URL('/onboarding', request.url)
        onboardingUrl.searchParams.set('returnTo', pathname)
        return NextResponse.redirect(onboardingUrl)
      }

      // If onboarding completed and on auth page (e.g. login/register), redirect to account
      if (hasCompletedOnboarding && isAuthRoute && !isOnboarding) {
        return NextResponse.redirect(new URL('/account', request.url))
      }
    }

    return response
  } catch (e) {
    console.error('Middleware error:', e)
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    })
  }
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

