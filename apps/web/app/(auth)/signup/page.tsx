'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!agreeTerms) {
      setError('Please agree to terms and conditions')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Signup failed')

      router.push(data.emailVerificationRequired ? '/login' : '/dashboard')
    } catch (err: any) {
      setError(err.message || 'Signup failed')
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
          <p className="text-gray-400">Create your free account</p>
          <span className="beta-badge inline-block mt-3">BETA</span>
        </div>

        <div className="glass p-5 sm:p-8 rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Founder"
                required
              />
            </div>

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

            <div>
              <label className="block text-sm font-semibold mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <label htmlFor="terms" className="text-sm text-gray-300">
                I agree to <Link href="#" className="text-indigo-400 hover:text-indigo-300">Terms</Link> and <Link href="#" className="text-indigo-400 hover:text-indigo-300">Privacy</Link>
              </label>
            </div>

            {error && <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-sm">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="border-t border-white/10 my-6"></div>

          <div className="text-center">
            <p className="text-gray-400 text-sm">Already have an account? <Link href="/login" className="text-indigo-400 hover:text-indigo-300">Sign in</Link></p>
          </div>

          <div className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-xs text-indigo-300">
            ✓ No credit card required
            <br/>✓ 1 free analysis included
            <br/>✓ 3-day trial access
          </div>
        </div>
      </div>
    </main>
  )
}
