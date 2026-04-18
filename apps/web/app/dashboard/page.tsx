'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import IdeaForm from '@/components/analysis/IdeaForm'
import ChatBot from '@/components/analysis/ChatBot'

interface Analysis {
  id: string
  title: string
  survive_score: number
  status: 'running' | 'completed' | 'failed'
  created_at: string
}

export default function DashboardPage() {
  const [analyses, setAnalyses] = useState<Analysis[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    // Fetch analyses from database
    const fetchAnalyses = async () => {
      try {
        const response = await fetch('/api/analyses')
        if (response.ok) {
          const data = await response.json()
          setAnalyses(data)
        }
      } catch (error) {
        console.error('Failed to fetch analyses:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalyses()
  }, [])

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'from-green-500 to-emerald-500'
    if (score >= 50) return 'from-yellow-500 to-orange-500'
    return 'from-red-500 to-pink-500'
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return '✓ Completed'
      case 'running':
        return '⏳ Running'
      case 'failed':
        return '✗ Failed'
      default:
        return status
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="glass py-3 sm:py-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-2xl font-black hover:scale-110 transition-transform">
            <span>🚀</span> FounderCopilot
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="text-gray-300 hover:text-white transition">Profile</button>
            <Link href="/" className="btn-secondary px-4 py-2">Logout</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-12 animate-slide-down">
          <h1 className="text-3xl sm:text-4xl font-black gradient-text mb-2">Your Dashboard</h1>
          <p className="text-gray-300">Manage and review your startup analyses</p>
        </div>

        {/* New Analysis CTA */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary mb-10 sm:mb-12 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-2xl shadow-indigo-500/30 animate-pulse-glow"
          >
            + Analyze New Idea
          </button>
        )}

        {/* Form */}
        {showForm && (
          <div className="glass p-4 sm:p-8 rounded-2xl mb-10 sm:mb-12 animate-slide-down">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Analyze a New Idea</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-white transition text-2xl"
              >
                ✕
              </button>
            </div>
            <IdeaForm />
          </div>
        )}

        {/* Recent Analyses */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Recent Analyses</h2>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="skeleton h-24 rounded-2xl"></div>
              ))}
            </div>
          ) : analyses.length > 0 ? (
            <div className="grid gap-6">
              {analyses.map(analysis => (
                <Link
                  key={analysis.id}
                  href={`/dashboard/analysis/${analysis.id}`}
                  className="card-interactive group"
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold group-hover:text-indigo-300 transition">{analysis.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">
                        {new Date(analysis.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className={`text-3xl font-black bg-gradient-to-r ${getScoreColor(analysis.survive_score)} bg-clip-text text-transparent`}>
                        {analysis.survive_score}%
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{getStatusBadge(analysis.status)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="glass p-6 sm:p-12 text-center rounded-2xl">
              <p className="text-gray-400 mb-4">No analyses yet. Start by analyzing your first idea!</p>
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary"
              >
                Analyze Your First Idea
              </button>
            </div>
          )}
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16">
          {[
            { icon: '💬', title: 'AI Chat Support', desc: 'Ask our AI assistant any questions' },
            { icon: '📊', title: 'Detailed Reports', desc: 'Get in-depth analysis from all 5 agents' },
            { icon: '⚡', title: 'Quick Insights', desc: 'Instant validation in seconds' }
          ].map(feature => (
            <div key={feature.title} className="card">
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chatbot */}
      <ChatBot />
    </main>
  )
}
