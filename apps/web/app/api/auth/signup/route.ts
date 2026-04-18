import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()
    const supabase = await createClient()

    // Validation
    if (!name || !email || !password || password.length < 6) {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name
        }
      }
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      emailVerificationRequired: !data.session,
      user: data.user
        ? {
            id: data.user.id,
            email: data.user.email,
            name: data.user.user_metadata?.full_name || data.user.email
          }
        : null
    })
  } catch {
    return NextResponse.json(
      { error: 'Signup failed' },
      { status: 500 }
    )
  }
}
