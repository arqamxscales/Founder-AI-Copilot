'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const features = [
    {
      icon: '🤖',
      title: 'AI Agent Panel',
      description: '5 specialized AI agents that debate your idea from multiple angles',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: '💬',
      title: 'Smart Chatbot',
      description: 'Real-time AI chat to ask questions and get instant insights',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '📊',
      title: 'Survive Score',
      description: 'Get a score showing how likely your startup is to survive',
      color: 'from-pink-500 to-red-500'
    },
    {
      icon: '🎯',
      title: 'Actionable Feedback',
      description: 'Specific recommendations to improve your idea',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: '⚡',
      title: 'Instant Analysis',
      description: 'Get results in seconds, not hours',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: '🔐',
      title: 'Private & Secure',
      description: 'Your ideas are completely confidential',
      color: 'from-cyan-500 to-blue-500'
    }
  ]

  const testimonials = [
    { name: 'Sarah Chen', role: 'Founder', feedback: 'FounderCopilot caught 3 legal issues I would have missed!' },
    { name: 'Alex Rodriguez', role: 'Startup Advisor', feedback: 'Incredible tool for validating ideas quickly.' },
    { name: 'Maria Gonzalez', role: 'Tech Founder', feedback: 'The market analysis was spot on!' }
  ]

  const faqs = [
    { q: 'How long does an analysis take?', a: 'Usually 30-60 seconds. Depends on your idea complexity.' },
    { q: 'Can I do multiple analyses?', a: 'Yes! Free plan includes 1, Trial includes 3, Pro is unlimited.' },
    { q: 'Is my idea information private?', a: 'Absolutely. We don\'t share or sell your data.' },
    { q: 'Can I export results?', a: 'Free and Trial plans show results online. Pro gets PDF exports soon.' }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white overflow-hidden">
      {/* Animated background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'py-5'}`}>
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-lg sm:text-2xl font-black hover:scale-105 transition-transform duration-300">
            <span>🚀</span> FounderCopilot <span className="beta-badge ml-3">BETA v1.0</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden btn-secondary px-3 py-2 text-sm"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? 'Close' : 'Menu'}
          </button>
          <div className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
            <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
            <Link href="/login" className="text-gray-300 hover:text-white transition-colors">Demo Login</Link>
            <Link href="/signup" className="btn-primary">Start Free</Link>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden px-4 sm:px-6 pb-4 pt-2 animate-slide-down">
            <div className="glass rounded-xl p-3 flex flex-col gap-2">
              <Link href="#features" onClick={() => setMobileMenuOpen(false)} className="btn-secondary text-center">Features</Link>
              <Link href="#pricing" onClick={() => setMobileMenuOpen(false)} className="btn-secondary text-center">Pricing</Link>
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="btn-secondary text-center">Demo Login</Link>
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="btn-primary text-center">Start Free</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16 sm:pb-20 text-center relative z-10">
        <div className="animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full px-4 py-2 text-sm mb-8 text-indigo-300">
            ✨ 5 AI Agents. 1 Brutal Truth.
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6 gradient-text">
            Will Your Startup<br />Actually Survive?
          </h1>
          
          <p className="text-base sm:text-xl text-gray-300 mb-10 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
            Submit your startup idea and watch 5 AI agents debate it like a panel of seasoned investors. 
            Get a Survive Score, actionable feedback, and talk to our smart chatbot anytime.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8">
            <Link href="/signup" className="btn-primary text-lg px-8 py-4 shadow-2xl shadow-indigo-500/30 animate-pulse-glow">
              Analyze My Idea Free →
            </Link>
            <Link href="#features" className="btn-outline text-lg px-8 py-4">
              Learn More
            </Link>
          </div>
          
          <p className="text-gray-400 text-sm">No credit card required. Try for free today.</p>
        </div>

        {/* Live demo stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-14 sm:mt-20 pt-10 sm:pt-12 border-t border-white/10">
          {[
            { label: 'Ideas Analyzed', value: '12.5K+' },
            { label: 'Users Helped', value: '8,200+' },
            { label: 'Avg Survival Rate', value: '62%' }
          ].map((stat) => (
            <div key={stat.label} className="card animate-slide-up">
              <div className="text-3xl font-black gradient-text">{stat.value}</div>
              <div className="text-gray-400 text-sm mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 relative z-10">
        <h2 className="text-4xl font-black text-center mb-4 gradient-text">Powerful Features</h2>
        <p className="text-center text-gray-300 mb-16">Everything you need to validate your startup idea</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={feature.title} className="card-interactive group" style={{animationDelay: `${idx * 100}ms`}}>
              <div className={`text-5xl mb-4 group-hover:scale-125 transition-transform`}>{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{feature.description}</p>
              <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${feature.color} transition-all duration-500 mt-4`}></div>
            </div>
          ))}
        </div>
      </section>

      {/* Agent Showcase */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 relative z-10">
        <h2 className="text-4xl font-black text-center mb-16 gradient-text">Meet Your AI Panel</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { emoji: '😈', name: "Devil's Advocate", role: "Finds fatal flaws", color: 'border-red-500' },
            { emoji: '📊', name: "Market Analyst", role: "Validates demand", color: 'border-blue-500' },
            { emoji: '⚖️', name: "Legal Eagle", role: "Spots legal risks", color: 'border-purple-500' },
            { emoji: '🗣️', name: "Customer Voice", role: "Represents users", color: 'border-green-500' },
            { emoji: '🔬', name: "Tech Oracle", role: "Checks feasibility", color: 'border-yellow-500' }
          ].map((agent) => (
            <div key={agent.name} className={`card group border-l-4 ${agent.color}`}>
              <div className="text-5xl mb-3 group-hover:animate-bounce-gentle">{agent.emoji}</div>
              <div className="font-bold text-sm">{agent.name}</div>
              <div className="text-gray-400 text-xs mt-2">{agent.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Chatbot Feature Highlight */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 relative z-10">
        <div className="glass p-6 sm:p-12 rounded-3xl">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start sm:items-center">
            <div className="text-6xl">💬</div>
            <div>
              <h3 className="text-3xl font-black mb-4 gradient-text">Smart Chatbot Included</h3>
              <p className="text-gray-300 mb-6">
                Have a question about your analysis? Chat with our AI assistant in real-time. 
                It understands your idea and can answer any follow-up questions.
              </p>
              <ul className="space-y-2 text-sm">
                <li>✓ Ask follow-up questions anytime</li>
                <li>✓ Get instant explanations</li>
                <li>✓ Explore "what-if" scenarios</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 relative z-10">
        <h2 className="text-4xl font-black text-center mb-16 gradient-text">What Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="card-interactive">
              <p className="text-gray-300 mb-4 italic">"{testimonial.feedback}"</p>
              <div className="border-t border-white/10 pt-4">
                <div className="font-bold">{testimonial.name}</div>
                <div className="text-sm text-gray-400">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 relative z-10">
        <h2 className="text-4xl font-black text-center mb-4 gradient-text">Simple Pricing</h2>
        <p className="text-center text-gray-300 mb-16">Choose the perfect plan for you</p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Free",
              price: "$0",
              emoji: "🎁",
              features: ["1 analysis", "All 5 agents", "Survive Score", "Chat with AI"],
              cta: "Start Free",
              href: "/signup",
              highlight: false
            },
            {
              name: "Trial",
              price: "Free for 3 days",
              emoji: "⭐",
              features: ["3 analyses", "All 5 agents", "Survive Score", "Chat with AI", "Priority processing"],
              cta: "Start Trial",
              href: "/signup?trial=true",
              highlight: true
            },
            {
              name: "Pro",
              price: "Invite Only",
              emoji: "👑",
              features: ["Unlimited analyses", "PDF export (soon)", "Replay mode (soon)", "Priority support"],
              cta: "Request Invite",
              href: "mailto:foundercopilot@yourdomain.com?subject=Pro%20Invite",
              highlight: false
            }
          ].map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-8 transition-all duration-300 ${
                plan.highlight
                  ? 'glass-dark md:scale-105 ring-2 ring-indigo-500 shadow-2xl shadow-indigo-500/30'
                  : 'card'
              }`}
            >
              <div className="text-4xl mb-3">{plan.emoji}</div>
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className={`text-3xl font-black mb-6 ${plan.highlight ? 'gradient-text' : ''}`}>{plan.price}</div>
              <ul className="space-y-3 mb-8">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <span className="text-lg">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`block text-center py-3 rounded-xl font-bold transition-all ${
                  plan.highlight
                    ? 'btn-primary'
                    : 'btn-secondary'
                }`}
              >
                {plan.cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 relative z-10">
        <h2 className="text-4xl font-black text-center mb-16 gradient-text">Frequently Asked</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details key={idx} className="card group cursor-pointer">
              <summary className="font-bold flex items-center justify-between">
                {faq.q}
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-300 mt-4 pt-4 border-t border-white/10">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center relative z-10">
        <div className="glass p-6 sm:p-12 rounded-3xl">
          <h2 className="text-3xl sm:text-4xl font-black mb-6 gradient-text">Ready to Validate Your Idea?</h2>
          <p className="text-gray-300 mb-8 text-base sm:text-lg">Get insights from 5 AI agents and chat with our smart assistant.</p>
          <Link href="/signup" className="btn-primary inline-block text-lg px-10 py-4 shadow-2xl shadow-indigo-500/30">
            Start Free Analysis →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-12 text-gray-500 text-sm border-t border-white/10 relative z-10">
        <p className="mb-2">Built by Mohammad Arqam Javed · © 2025 FounderCopilot</p>
        <div className="flex justify-center gap-4 mt-4">
          <Link href="#" className="hover:text-white transition">Privacy</Link>
          <span>•</span>
          <Link href="#" className="hover:text-white transition">Terms</Link>
          <span>•</span>
          <Link href="#" className="hover:text-white transition">Contact</Link>
        </div>
      </footer>
    </main>
  )
}
