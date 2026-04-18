'use client'
import { useEffect, useState, useCallback } from 'react'
import { Analysis, AgentResult } from '@/types'
import SurviveScore from './SurviveScore'
import AgentCard from './AgentCard'

interface Props {
  analysisId: string
}

export default function AgentDebateView({ analysisId }: Props) {
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [agentResults, setAgentResults] = useState<AgentResult[]>([])
  const [polling, setPolling] = useState(true)

  const fetchData = useCallback(async () => {
    const res = await fetch(`/api/analysis/${analysisId}`)
    if (!res.ok) return
    const data = await res.json()
    setAnalysis(data.analysis)
    setAgentResults(data.agentResults)

    if (data.analysis.status === 'completed' || data.analysis.status === 'failed') {
      setPolling(false)
    }
  }, [analysisId])

  useEffect(() => {
    fetchData()
    if (!polling) return undefined
    const interval = setInterval(fetchData, 3000)
    return () => clearInterval(interval)
  }, [fetchData, polling])

  if (!analysis) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse">🤖</div>
          <p className="text-gray-500">Loading analysis...</p>
        </div>
      </div>
    )
  }

  const isRunning = analysis.status === 'running' || analysis.status === 'pending'

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{analysis.title}</h1>
        <p className="text-gray-500 mt-1">
          {isRunning ? '⚡ Agents are analyzing your idea...' : `Analysis completed`}
        </p>
      </div>

      {/* Running State */}
      {isRunning && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-8 text-center">
          <div className="flex justify-center gap-4 text-4xl mb-4">
            {['😈', '📊', '⚖️', '🗣️', '🔬'].map((emoji, i) => (
              <span
                key={i}
                className="animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {emoji}
              </span>
            ))}
          </div>
          <p className="text-indigo-700 font-semibold text-lg">
            5 AI agents are debating your startup idea...
          </p>
          <p className="text-indigo-500 text-sm mt-1">
            This takes about 30-60 seconds
          </p>
        </div>
      )}

      {/* Survive Score */}
      {analysis.status === 'completed' && analysis.survive_score !== null && (
        <SurviveScore
          score={analysis.survive_score}
          verdict={analysis.overall_verdict || ''}
        />
      )}

      {/* Agent Results */}
      {agentResults.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Agent Verdicts</h2>
          <div className="grid gap-4">
            {agentResults.map((result) => (
              <AgentCard key={result.id} result={result} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
