import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { Profile } from '@/lib/supabase/types'
import type { PostgrestError } from '@supabase/supabase-js'

export async function GET() {
  const supabase = createClient()
  
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    )
  }
  
  const result = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
  
  const profile = result.data as Profile | null
  const profileError = result.error as PostgrestError | null
  
  if (profileError && profileError?.code !== 'PGRST116') {
    // PGRST116 = no rows returned, which is fine for new users
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
  
  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      fullName: profile?.full_name || user.user_metadata?.full_name || null,
      country: profile?.country || null,
      marketingConsent: profile?.marketing_consent || false,
      subscriptionStatus: profile?.subscription_status || 'none',
      discordInviteSent: profile?.discord_invite_sent || false,
      onboardingCompleted: profile?.onboarding_completed || false,
      createdAt: profile?.created_at || user.created_at,
    }
  })
}

export async function PATCH(request: Request) {
  const supabase = createClient()
  
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    )
  }
  
  try {
    const body = await request.json()
    
    // Only allow updating certain fields
    const allowedFields = ['full_name', 'country', 'marketing_consent']
    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    }
    
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field]
      }
    }
    
    const result = await supabase
      .from('profiles')
      // @ts-ignore - Supabase types don't know about our custom tables
      .update(updateData)
      .eq('id', user.id)
      .select()
      .single()
    
    const profile = result.data as Profile | null
    const updateError = result.error as PostgrestError | null
    
    if (updateError) {
      return NextResponse.json(
        { error: 'Failed to update profile' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: profile?.full_name || null,
        country: profile?.country || null,
        marketingConsent: profile?.marketing_consent || false,
        subscriptionStatus: profile?.subscription_status || 'none',
        discordInviteSent: profile?.discord_invite_sent || false,
        onboardingCompleted: profile?.onboarding_completed || false,
      }
    })
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}
