'use client'

interface Props {
  score: number
  verdict: string
}

function getScoreColor(score: number) {
  if (score >= 75) return { bg: 'bg-green-500', text: 'text-green-600', label: '🟢 Strong Potential' }
  if (score >= 55) return { bg: 'bg-yellow-500', text: 'text-yellow-600', label: '🟡 Needs Work' }
  if (score >= 35) return { bg: 'bg-orange-500', text: 'text-orange-600', label: '🟠 High Risk' }
  return { bg: 'bg-red-500', text: 'text-red-600', label: '🔴 Critical Issues' }
}

export default function SurviveScore({ score, verdict }: Props) {
  const { bg, text, label } = getScoreColor(score)

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Survive Score</h2>
          <p className={`font-semibold ${text}`}>{label}</p>
        </div>
        <div className={`text-6xl font-black ${text}`}>{score}</div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-100 rounded-full h-4 mb-6">
        <div
          className={`h-4 rounded-full transition-all duration-1000 ${bg}`}
          style={{ width: `${score}%` }}
        />
      </div>

      {/* Verdict */}
      <div className="bg-gray-50 rounded-xl p-4">
        <p className="text-gray-700 leading-relaxed">{verdict}</p>
      </div>
    </div>
  )
}
