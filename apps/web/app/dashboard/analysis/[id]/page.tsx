import AgentDebateView from '@/components/analysis/AgentDebateView'
import ChatBot from '@/components/analysis/ChatBot'

export default function AnalysisPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <AgentDebateView analysisId={params.id} />
      <ChatBot analysisId={params.id} />
    </div>
  )
}
