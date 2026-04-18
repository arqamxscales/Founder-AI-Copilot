import { NextResponse } from 'next/server'

// Payments are disabled for the beta. This endpoint exists only to avoid 404s.
export async function POST() {
  return NextResponse.json(
    {
      error: 'Payments are disabled during the private beta. Request an invite to get Pro access.',
    },
    { status: 501 },
  )
}
