import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { Profile } from '@/lib/supabase/types'

export async function POST() {
  const supabase = createClient()
  
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    )
  }
  
  // Check if user has an active subscription
  const result = await supabase
    .from('profiles')
    .select('subscription_status, discord_invite_sent')
    .eq('id', user.id)
    .single()
  
  const profile = result.data as Pick<Profile, 'subscription_status' | 'discord_invite_sent'> | null
  
  if (!profile || profile.subscription_status !== 'active') {
    return NextResponse.json(
      { error: 'Active subscription required for Discord access' },
      { status: 403 }
    )
  }
  
  // TODO: Implement actual Discord invite email sending
  // This would typically call an email service or Discord bot API
  // For now, we just mark the invite as sent
  
  const { error: updateError } = await supabase
    .from('profiles')
    // @ts-ignore - Supabase types don't know about our custom tables
    .update({ 
      discord_invite_sent: true,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id)
  
  if (updateError) {
    return NextResponse.json(
      { error: 'Failed to send invite' },
      { status: 500 }
    )
  }
  
  return NextResponse.json({
    success: true,
    message: 'Discord invite email has been sent',
  })
}
