'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Invalid credentials')

      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full animate-fade-in">
        <div className="text-center mb-6 sm:mb-8">
          <div className="text-4xl sm:text-5xl mb-3 animate-bounce-gentle">🚀</div>
          <h1 className="text-3xl font-black gradient-text mb-2">FounderCopilot</h1>
          <p className="text-gray-400">Sign in to your account</p>
        </div>

        <div className="glass p-5 sm:p-8 rounded-2xl mb-5 sm:mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {error && <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-sm">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="border-t border-white/10 my-6"></div>

          <div className="text-center">
            <p className="text-gray-400 text-sm mb-4">Don't have an account? <Link href="/signup" className="text-indigo-400 hover:text-indigo-300">Sign up free</Link></p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500">Use your real FounderCopilot account credentials.</p>
      </div>
    </main>
  )
}
