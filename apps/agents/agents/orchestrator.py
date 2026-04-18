import os
from typing import List, Optional
from agents.devils_advocate import DevilsAdvocateAgent
from agents.market_analyst import MarketAnalystAgent
from agents.legal_risk import LegalRiskAgent
from agents.customer_voice import CustomerVoiceAgent
from agents.tech_feasibility import TechFeasibilityAgent
from models.request_models import AnalysisRequest
from models.response_models import AnalysisResult, AgentResult
from groq import Groq

class AgentOrchestrator:
    _client: Optional[Groq] = None

    def __init__(self):
        self.agents = [
            DevilsAdvocateAgent(),
            MarketAnalystAgent(),
            LegalRiskAgent(),
            CustomerVoiceAgent(),
            TechFeasibilityAgent()
        ]

    def _get_client(self) -> Optional[Groq]:
        if AgentOrchestrator._client is not None:
            return AgentOrchestrator._client

        api_key = os.environ.get("GROQ_API_KEY")
        if not api_key:
            return None

        try:
            AgentOrchestrator._client = Groq(api_key=api_key)
            return AgentOrchestrator._client
        except Exception:
            return None

    def run_analysis(self, request: AnalysisRequest) -> AnalysisResult:
        context = {
            "title": request.title,
            "target_market": request.target_market,
            "business_model": request.business_model,
            "stage": request.stage
        }

        # Run all agents
        agent_results: List[AgentResult] = []
        for agent in self.agents:
            result = agent.analyze(request.idea_description, context)
            agent_results.append(result)

        # Calculate survive score (weighted average)
        survive_score = self._calculate_survive_score(agent_results)

        # Generate overall verdict using Claude
        overall_verdict = self._generate_verdict(
            request.idea_description, agent_results, survive_score
        )

        # Extract top risks and strengths
        top_risks = self._extract_top_risks(agent_results)
        top_strengths = self._extract_strengths(
            request.idea_description, agent_results
        )

        investor_readiness = self._get_investor_readiness(survive_score)

        return AnalysisResult(
            analysis_id=request.analysis_id,
            survive_score=survive_score,
            overall_verdict=overall_verdict,
            agent_results=agent_results,
            top_risks=top_risks,
            top_strengths=top_strengths,
            investor_readiness=investor_readiness
        )

    def _calculate_survive_score(self, results: List[AgentResult]) -> int:
        weights = {
            "Devil's Advocate": 0.25,
            "Market Analyst": 0.30,
            "Legal Eagle": 0.15,
            "Customer Voice": 0.20,
            "Tech Oracle": 0.10
        }
        total = sum(
            r.score * weights.get(r.agent_name, 0.2)
            for r in results
        )
        return min(100, max(0, int(total)))

    def _generate_verdict(
        self, idea: str, results: List[AgentResult], score: int
    ) -> str:
        summaries = "\n".join(
            f"- {r.agent_name}: {r.verdict}" for r in results
        )
        client = self._get_client()
        if client is None:
            return (
                f"Current survive score is {score}/100. "
                "Model summarization is unavailable, so this verdict is generated from fallback logic. "
                "Prioritize reducing critical risks from each agent before seeking investor conversations."
            )

        try:
            completion = client.chat.completions.create(
                model="llama3-70b-8192",
                max_tokens=200,
                temperature=0.3,
                messages=[
                    {
                        "role": "system",
                        "content": (
                            "You are an experienced startup investor. "
                            "Write a single clear verdict paragraph based on agent summaries."
                        ),
                    },
                    {
                        "role": "user",
                        "content": f"""Based on these agent verdicts for a startup idea (Survive Score: {score}/100):
{summaries}

Write ONE compelling paragraph (3-4 sentences) as the overall verdict.
Be direct, honest, and actionable. Do not use bullet points.""",
                    },
                ],
            )
            text = completion.choices[0].message.content or ""
            return text.strip()
        except Exception:
            return (
                f"Current survive score is {score}/100. "
                "Agent-level feedback is available, but the final model summary failed. "
                "Use the top risks to prioritize your next iteration before execution."
            )

    def _extract_top_risks(self, results: List[AgentResult]) -> List[str]:
        critical = []
        high = []
        for r in results:
            for arg in r.arguments:
                severity = getattr(arg, "severity", None)
                point = getattr(arg, "point", None)
                if isinstance(arg, dict):
                    severity = arg.get("severity")
                    point = arg.get("point")

                if not point:
                    continue

                if severity == "critical":
                    critical.append(point)
                elif severity == "high":
                    high.append(point)
        return (critical + high)[:5]

    def _extract_strengths(
        self, idea: str, results: List[AgentResult]
    ) -> List[str]:
        high_scorers = [r for r in results if r.score >= 65]
        strengths = []
        for r in high_scorers:
            if r.recommendations:
                strengths.append(
                    f"{r.agent_name} sees potential: {r.recommendations[0]}"
                )
        return strengths[:3]

    def _get_investor_readiness(self, score: int) -> str:
        if score >= 75:
            return "Ready for seed funding conversations"
        elif score >= 55:
            return "Needs 2-3 pivots before investor meetings"
        elif score >= 35:
            return "Requires significant validation work first"
        else:
            return "Not ready — fundamental rethink needed"
