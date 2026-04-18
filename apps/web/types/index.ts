export type Plan = 'free' | 'trial' | 'pro'
export type AnalysisStatus = 'pending' | 'running' | 'completed' | 'failed'
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical'
export type Stage = 'idea' | 'mvp' | 'growth' | 'scaling'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  plan: Plan
  analyses_used: number
  analyses_limit: number
  trial_ends_at: string | null
  stripe_customer_id: string | null
}

export interface Analysis {
  id: string
  user_id: string
  title: string
  idea_description: string
  target_market: string | null
  business_model: string | null
  stage: Stage
  status: AnalysisStatus
  survive_score: number | null
  overall_verdict: string | null
  created_at: string
  completed_at: string | null
}

export interface AgentArgument {
  point: string
  severity: RiskLevel
}

export interface AgentResult {
  id: string
  analysis_id: string
  agent_name: string
  agent_role: string
  agent_emoji: string
  score: number
  verdict: string
  arguments: AgentArgument[]
  recommendations: string[]
  risk_level: RiskLevel
}
