'use client'
import { useState } from 'react'
import { AgentResult } from '@/types'

const RISK_COLORS = {
  low: 'bg-green-100 text-green-700 border-green-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  high: 'bg-orange-100 text-orange-700 border-orange-200',
  critical: 'bg-red-100 text-red-700 border-red-200'
}

const SEVERITY_ICONS = {
  low: '🟢',
  medium: '🟡',
  high: '🟠',
  critical: '🔴'
}

interface Props {
  result: AgentResult
}

export default function AgentCard({ result }: Props) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      <div
        className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <span className="text-3xl">{result.agent_emoji}</span>
          <div>
            <h3 className="font-bold text-gray-900">{result.agent_name}</h3>
            <p className="text-sm text-gray-500">{result.agent_role}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${RISK_COLORS[result.risk_level as keyof typeof RISK_COLORS]}`}>
            {result.risk_level.toUpperCase()}
          </span>
          <div className="text-right">
            <div className="text-2xl font-black text-gray-900">{result.score}</div>
            <div className="text-xs text-gray-400">/100</div>
          </div>
          <span className="text-gray-400">{expanded ? '▲' : '▼'}</span>
        </div>
      </div>

      {expanded && (
        <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-4">
          <p className="text-gray-700 italic">&ldquo;{result.verdict}&rdquo;</p>

          {result.arguments.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Key Concerns</h4>
              <ul className="space-y-2">
                {result.arguments.map((arg, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span>{SEVERITY_ICONS[arg.severity as keyof typeof SEVERITY_ICONS]}</span>
                    <span>{arg.point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.recommendations.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Recommendations</h4>
              <ul className="space-y-2">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span>→</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
