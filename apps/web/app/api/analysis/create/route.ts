import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { title, idea_description, target_market, business_model, stage } = body
  const agentsApiUrl = process.env.AGENTS_API_URL
  const internalApiKey = process.env.INTERNAL_API_KEY

  if (!agentsApiUrl || !internalApiKey) {
    return NextResponse.json(
      { error: 'Agents backend is not configured. Please set AGENTS_API_URL and INTERNAL_API_KEY.' },
      { status: 503 }
    )
  }

  if (process.env.NODE_ENV === 'production' && agentsApiUrl.includes('localhost')) {
    return NextResponse.json(
      { error: 'Agents backend must be a public Cloud Run URL in production.' },
      { status: 503 }
    )
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Check usage limits
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
  }

  if (profile.analyses_used >= profile.analyses_limit) {
    return NextResponse.json(
      { error: 'Analysis limit reached', upgrade: true },
      { status: 403 }
    )
  }

  // Create analysis record
  const { data: analysis, error } = await supabase
    .from('analyses')
    .insert({
      user_id: user.id,
      title,
      idea_description,
      target_market,
      business_model,
      stage: stage || 'idea',
      status: 'pending'
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Trigger Python agents (fire and forget)
  fetch(`${agentsApiUrl}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': internalApiKey
    },
    body: JSON.stringify({
      analysis_id: analysis.id,
      user_id: user.id,
      title,
      idea_description,
      target_market,
      business_model,
      stage
    })
  }).catch(console.error)

  return NextResponse.json({ analysis_id: analysis.id }, { status: 201 })
}
