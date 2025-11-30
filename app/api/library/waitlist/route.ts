import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { LibraryWaitlist } from '@/lib/supabase/types'
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
  
  // Check if user is already on the waitlist
  const result = await supabase
    .from('library_waitlist')
    .select('*')
    .eq('user_id', user.id)
    .single()
  
  const waitlistEntry = result.data as LibraryWaitlist | null
  
  return NextResponse.json({
    isOnWaitlist: !!waitlistEntry,
    waitlistEntry: waitlistEntry || null,
  })
}

export async function POST(request: Request) {
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
    const { country } = body
    
    if (!country) {
      return NextResponse.json(
        { error: 'Country is required' },
        { status: 400 }
      )
    }
    
    // Check if user is already on the waitlist
    const checkResult = await supabase
      .from('library_waitlist')
      .select('id')
      .eq('user_id', user.id)
      .single()
    
    const existingEntry = checkResult.data as { id: string } | null
    
    if (existingEntry) {
      return NextResponse.json(
        { error: 'You are already on the waitlist' },
        { status: 409 }
      )
    }
    
    // Add to waitlist
    const insertResult = await supabase
      .from('library_waitlist')
      // @ts-ignore - Supabase types don't know about our custom tables
      .insert({
        user_id: user.id,
        email: user.email!,
        country,
        status: 'pending',
      })
      .select()
      .single()
    
    const waitlistEntry = insertResult.data as LibraryWaitlist | null
    const insertError = insertResult.error as PostgrestError | null
    
    if (insertError) {
      console.error('Waitlist insert error:', insertError)
      return NextResponse.json(
        { error: 'Failed to join waitlist' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      waitlistEntry,
    })
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}
