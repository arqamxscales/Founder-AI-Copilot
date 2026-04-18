import IdeaForm from '@/components/analysis/IdeaForm'
import ChatBot from '@/components/analysis/ChatBot'

export default function NewAnalysisPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-white">
      <div className="mb-8">
        <div className="beta-badge mb-4">BETA</div>
        <h1 className="text-3xl font-black gradient-text">New Analysis</h1>
        <p className="text-gray-300 mt-1">
          Submit your startup idea and our 5 AI agents will tear it apart
        </p>
      </div>
      <IdeaForm />
      <ChatBot />
    </div>
  )
}
