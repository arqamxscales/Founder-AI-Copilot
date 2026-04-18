import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message, context, conversationHistory = [] } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Call Groq API for AI response
    const groqApiKey = process.env.GROQ_API_KEY

    if (!groqApiKey) {
      return NextResponse.json(
        {
          response:
            'FounderCopilot AI (Beta): Live model is not configured yet in this environment. Quick tip: clarify your target customer and distribution channel first, then validate with a 10-user interview sprint.'
        },
        { status: 200 }
      )
    }

    // Format conversation history for API
    const messages = [
      {
        role: 'system',
        content: `You are a helpful AI assistant for FounderCopilot, a startup validation platform. You help users understand their startup analysis, answer questions about their idea, and provide constructive feedback. Be concise, encouraging, and specific. ${
          context ? `Current context: ${context}` : ''
        }`
      },
      ...conversationHistory.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: message }
    ]

    // Call Groq API
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages,
        max_tokens: 1024,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Groq API error:', error)
      return NextResponse.json(
        {
          response:
            'FounderCopilot AI (Beta): I could not reach the live model right now. Please retry in a moment. In the meantime, prioritize one measurable KPI for your MVP launch.'
        },
        { status: 200 }
      )
    }

    const data = await response.json()
    const aiResponse = data.choices[0]?.message?.content || 'Sorry, I couldn\'t generate a response.'

    return NextResponse.json(
      { response: aiResponse },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Chat error:', error)
    return NextResponse.json(
      {
        response:
          'FounderCopilot AI (Beta): Temporary issue processing chat. Please retry. Suggested next step: define your pricing hypothesis and test willingness-to-pay.'
      },
      { status: 200 }
    )
  }
}
