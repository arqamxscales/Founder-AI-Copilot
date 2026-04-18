'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const STAGES = [
  { value: 'idea', label: '💡 Just an Idea' },
  { value: 'mvp', label: '🔧 Building MVP' },
  { value: 'growth', label: '📈 Growing' },
  { value: 'scaling', label: '🚀 Scaling' }
]

export default function IdeaForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    idea_description: '',
    target_market: '',
    business_model: '',
    stage: 'idea'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/analysis/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const data = await res.json()

      if (res.status === 403 && data.upgrade) {
        router.push('/dashboard?upgrade=true')
        return
      }

      if (!res.ok) throw new Error(data.error)

      router.push(`/dashboard/analysis/${data.analysis_id}`)
    } catch (err) {
      console.error(err)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Startup Name / Title *
        </label>
        <input
          type="text"
          required
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          placeholder="e.g. AirBnB for parking spaces"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Describe Your Idea *
        </label>
        <textarea
          required
          rows={5}
          value={form.idea_description}
          onChange={e => setForm({ ...form, idea_description: e.target.value })}
          placeholder="Describe your startup idea in detail. What problem does it solve? How does it work? What makes it unique?"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Target Market
        </label>
        <input
          type="text"
          value={form.target_market}
          onChange={e => setForm({ ...form, target_market: e.target.value })}
          placeholder="e.g. Small business owners in the US aged 25-45"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Business Model
        </label>
        <input
          type="text"
          value={form.business_model}
          onChange={e => setForm({ ...form, business_model: e.target.value })}
          placeholder="e.g. SaaS $29/month, freemium with paid tier"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Current Stage
        </label>
        <div className="grid grid-cols-2 gap-3">
          {STAGES.map(s => (
            <button
              key={s.value}
              type="button"
              onClick={() => setForm({ ...form, stage: s.value })}
              className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition ${
                form.stage === s.value
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-indigo-600 text-white rounded-xl font-semibold text-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="animate-spin">⚙️</span>
            Launching Agents...
          </>
        ) : (
          '🚀 Run Founder Analysis'
        )}
      </button>
    </form>
  )
}
