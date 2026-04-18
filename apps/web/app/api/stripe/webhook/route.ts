import { NextResponse } from 'next/server'

// Stripe webhooks are not used during the beta; billing is invite-only and manual.
export async function POST() {
  return NextResponse.json(
    { received: true, message: 'Stripe webhooks are disabled during the private beta.' },
    { status: 200 },
  )
}
