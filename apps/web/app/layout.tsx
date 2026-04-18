import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FounderCopilot - AI-Powered Startup Validator',
  description: 'Get your startup idea stress-tested by 5 specialized AI agents.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
