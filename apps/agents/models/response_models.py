from pydantic import BaseModel
from typing import List, Optional

class AgentArgument(BaseModel):
    point: str
    severity: str  # "low" | "medium" | "high" | "critical"

class AgentResult(BaseModel):
    agent_name: str
    agent_role: str
    agent_emoji: str
    score: int  # 0-100
    verdict: str
    arguments: List[AgentArgument]
    recommendations: List[str]
    risk_level: str

class AnalysisResult(BaseModel):
    analysis_id: str
    survive_score: int
    overall_verdict: str
    agent_results: List[AgentResult]
    top_risks: List[str]
    top_strengths: List[str]
    investor_readiness: str
