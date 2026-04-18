import os
import json
from typing import Optional
from models.response_models import AgentResult
from groq import Groq

class BaseAgent:
    _client: Optional[Groq] = None

    def __init__(
        self,
        name: str,
        role: str,
        emoji: str,
        personality: str,
        focus_areas: list[str]
    ):
        self.name = name
        self.role = role
        self.emoji = emoji
        self.personality = personality
        self.focus_areas = focus_areas

    def _get_client(self) -> Optional[Groq]:
        if BaseAgent._client is not None:
            return BaseAgent._client

        api_key = os.environ.get("GROQ_API_KEY")
        if not api_key:
            return None

        try:
            BaseAgent._client = Groq(api_key=api_key)
            return BaseAgent._client
        except Exception:
            return None

    def analyze(self, idea: str, context: dict) -> AgentResult:
        prompt = self._build_prompt(idea, context)

        client = self._get_client()
        if client is None:
            return self._fallback_response()

        try:
            completion = client.chat.completions.create(
                model="llama3-70b-8192",
                response_format={"type": "json_object"},
                max_tokens=1500,
                temperature=0.3,
                messages=[
                    {
                        "role": "system",
                        "content": (
                            f"You are {self.name}, a {self.role} analyzing startup ideas. "
                            "Always respond with strict JSON only, no extra text."
                        ),
                    },
                    {"role": "user", "content": prompt},
                ],
            )

            response_text = completion.choices[0].message.content or "{}"
            return self._parse_response(response_text)
        except Exception:
            return self._fallback_response()

    def _fallback_response(self) -> AgentResult:
        return AgentResult(
            agent_name=self.name,
            agent_role=self.role,
            agent_emoji=self.emoji,
            score=50,
            verdict="Model API is unavailable; returning fallback analysis.",
            arguments=[
                {
                    "point": "AI provider key is missing or provider request failed.",
                    "severity": "high"
                }
            ],
            recommendations=[
                "Set GROQ_API_KEY in environment variables before production runs.",
                "Re-run analysis after provider connectivity is restored."
            ],
            risk_level="high"
        )

    def _build_prompt(self, idea: str, context: dict) -> str:
        return f"""You are {self.name}, a {self.role} analyzing a startup idea.

Your personality: {self.personality}
Your focus areas: {', '.join(self.focus_areas)}

STARTUP IDEA:
Title: {context.get('title', 'Untitled')}
Description: {idea}
Target Market: {context.get('target_market', 'Not specified')}
Business Model: {context.get('business_model', 'Not specified')}
Stage: {context.get('stage', 'idea')}

Analyze this startup idea from YOUR unique perspective. Be brutally honest and specific.

Respond ONLY in this JSON format (no markdown, no extra text):
{{
  "score": <integer 0-100, where 100 means perfect from your perspective>,
  "verdict": "<one sentence summary of your overall assessment>",
  "arguments": [
    {{
      "point": "<specific criticism or concern>",
      "severity": "<low|medium|high|critical>"
    }}
  ],
  "recommendations": [
    "<specific actionable recommendation>"
  ],
  "risk_level": "<low|medium|high|critical>"
}}

Provide exactly 3-5 arguments and 2-4 recommendations."""

    def _parse_response(self, response_text: str) -> AgentResult:
        try:
            data = json.loads(response_text.strip())
            return AgentResult(
                agent_name=self.name,
                agent_role=self.role,
                agent_emoji=self.emoji,
                score=data.get("score", 50),
                verdict=data.get("verdict", "Analysis inconclusive."),
                arguments=data.get("arguments", []),
                recommendations=data.get("recommendations", []),
                risk_level=data.get("risk_level", "medium")
            )
        except json.JSONDecodeError:
            return AgentResult(
                agent_name=self.name,
                agent_role=self.role,
                agent_emoji=self.emoji,
                score=50,
                verdict="Unable to parse agent response.",
                arguments=[],
                recommendations=[],
                risk_level="medium"
            )
