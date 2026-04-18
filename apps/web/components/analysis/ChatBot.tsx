'use client'
import { useState, useRef, useEffect } from 'react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatbotProps {
  analysisId?: string
  context?: string
}

export default function AIChattBot({ analysisId, context }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '👋 Hi! I\'m your AI assistant. Ask me anything about your analysis, the agents\' feedback, or how to improve your idea!',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      // Call chat API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          analysisId,
          context,
          conversationHistory: messages
        })
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error || 'Chat failed')

      // Add AI response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error(error)
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: '❌ Sorry, something went wrong. Please try again.',
        timestamp: new Date()
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
      {isOpen && (
        <div className="glass w-[calc(100vw-2rem)] sm:w-96 h-[65vh] sm:h-[500px] rounded-2xl flex flex-col animate-slide-up shadow-2xl shadow-indigo-500/20">
          {/* Header */}
          <div className="border-b border-white/10 p-3 sm:p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💬</span>
              <div>
                <h3 className="font-bold">AI Assistant</h3>
                <p className="text-xs text-gray-400">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition text-xl"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] sm:max-w-xs px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-colors duration-200 ${
                    msg.role === 'user'
                      ? 'bg-indigo-500/30 border border-indigo-500'
                      : 'bg-white/5 border border-white/10'
                  }`}
                >
                  <p className="text-xs sm:text-sm">{msg.content}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-lg">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-white/10 p-3 sm:p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                disabled={loading}
                className="flex-1"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="btn-primary disabled:opacity-50 px-3 sm:px-4 py-2"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-2xl sm:text-3xl shadow-2xl hover:scale-110 transition-all duration-300 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
      >
        💬
      </button>
    </div>
  )
}
