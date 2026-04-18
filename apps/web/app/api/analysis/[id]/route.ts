import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: analysis } = await supabase
    .from('analyses')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single()

  if (!analysis) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const { data: agentResults } = await supabase
    .from('agent_results')
    .select('*')
    .eq('analysis_id', params.id)
    .order('created_at', { ascending: true })

  return NextResponse.json({ analysis, agentResults: agentResults || [] })
}
