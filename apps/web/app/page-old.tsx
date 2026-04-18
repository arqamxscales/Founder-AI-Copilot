import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-6xl mx-auto animate-slide-down">
        <div className="flex items-center gap-2 text-xl font-black hover:scale-110 transition-transform">
          <span className="text-2xl">🚀</span> FounderCopilot <span className="beta-badge ml-2">BETA</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-gray-300 hover:text-white transition-colors duration-300">
            Demo Login
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2 bg-indigo-500 rounded-xl font-semibold hover:bg-indigo-600 transition-all duration-300 shadow-lg hover:shadow-indigo-500/50"
          >
            Try Free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-8 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full px-4 py-2 text-sm mb-6 text-indigo-300">
          ✨ 5 AI Agents. 1 Brutal Truth.
        </div>
        <h1 className="text-6xl font-black leading-tight mb-6">
          Will Your Startup<br />
          <span className="text-indigo-400">Actually Survive?</span>
        </h1>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Submit your startup idea and watch 5 AI agents tear it apart — a Devil&apos;s Advocate,
          Market Analyst, Legal Expert, Customer Voice, and Tech Oracle. Get your Survive Score.
        </p>
        <Link
          href="/signup"
          className="inline-block px-10 py-5 bg-indigo-500 rounded-2xl font-bold text-xl hover:bg-indigo-400 transition shadow-2xl shadow-indigo-500/30"
        >
          Analyze My Idea Free →
        </Link>
        <p className="text-gray-500 text-sm mt-4">
          No credit card required. 3-day trial included.
        </p>
      </section>

      {/* Agents Showcase */}
      <section className="max-w-5xl mx-auto px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Your Agent Panel</h2>
        <div className="grid grid-cols-5 gap-4">
          {[
            { emoji: '😈', name: "Devil's Advocate", role: "Finds fatal flaws" },
            { emoji: '📊', name: "Market Analyst", role: "Validates the market" },
            { emoji: '⚖️', name: "Legal Eagle", role: "Spots legal risks" },
            { emoji: '🗣️', name: "Customer Voice", role: "Represents buyers" },
            { emoji: '🔬', name: "Tech Oracle", role: "Checks feasibility" }
          ].map((agent) => (
            <div key={agent.name} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-4xl mb-2">{agent.emoji}</div>
              <div className="font-semibold text-sm">{agent.name}</div>
              <div className="text-gray-400 text-xs mt-1">{agent.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-4xl mx-auto px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
        <div className="grid grid-cols-3 gap-6">
          {[
            {
              name: "Free",
              price: "$0",
              features: ["1 analysis", "All 5 agents", "Survive Score"],
              cta: "Start Free",
              href: "/signup"
            },
            {
              name: "Trial",
              price: "Free for 3 days",
              features: ["3 analyses", "All 5 agents", "Survive Score", "Priority processing"],
              cta: "Start Trial",
              href: "/signup?trial=true",
              highlighted: true
            },
            {
              name: "Pro (Invite-Only)",
              price: "Invite only",
              features: ["Unlimited analyses", "Investor PDF export (coming soon)", "Agent replay mode (coming soon)", "Priority support"],
              cta: "Request Invite",
              href: "mailto:foundercopilot@yourdomain.com?subject=Pro%20Invite%20Request"
            }
          ].map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-6 ${
                plan.highlighted
                  ? 'bg-indigo-500 border border-indigo-400'
                  : 'bg-white/5 border border-white/10'
              }`}
            >
              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
              <div className="text-2xl font-black mb-4">{plan.price}</div>
              <ul className="space-y-2 mb-6">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <span>✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`block text-center py-3 rounded-xl font-semibold transition ${
                  plan.highlighted
                    ? 'bg-white text-indigo-600 hover:bg-gray-100'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500 text-sm border-t border-white/10">
        Built by Mohammad Arqam Javed · © 2025 FounderCopilot
      </footer>
    </main>
  )
}
