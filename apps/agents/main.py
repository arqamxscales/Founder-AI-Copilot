from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from agents.orchestrator import AgentOrchestrator
from models.request_models import AnalysisRequest
from models.response_models import AnalysisResult
import os
from supabase import create_client
from dotenv import load_dotenv
from datetime import datetime, timezone

load_dotenv()

app = FastAPI(title="FounderCopilot Agent API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("FRONTEND_URL", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

orchestrator = AgentOrchestrator()


def get_supabase_client():
    supabase_url = os.environ.get("SUPABASE_URL")
    supabase_service_key = os.environ.get("SUPABASE_SERVICE_KEY")

    if not supabase_url or not supabase_service_key:
        return None

    return create_client(supabase_url, supabase_service_key)

@app.get("/health")
async def health():
    return {
        "status": "ok",
        "service": "foundercopilot-agents",
        "groq_configured": bool(os.environ.get("GROQ_API_KEY")),
        "supabase_configured": bool(os.environ.get("SUPABASE_URL") and os.environ.get("SUPABASE_SERVICE_KEY")),
        "internal_api_key_configured": bool(os.environ.get("INTERNAL_API_KEY"))
    }

@app.post("/analyze", response_model=AnalysisResult)
async def run_analysis(
    request: AnalysisRequest,
    x_api_key: str = Header(None)
):
    supabase = get_supabase_client()

    # Validate internal API key
    if x_api_key != os.environ.get("INTERNAL_API_KEY"):
        raise HTTPException(status_code=401, detail="Unauthorized")

    if supabase is None:
        raise HTTPException(
            status_code=500,
            detail="Supabase environment is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_KEY."
        )

    try:
        # Update status to running
        supabase.table("analyses").update(
            {"status": "running"}
        ).eq("id", request.analysis_id).execute()

        # Run all agents
        result = orchestrator.run_analysis(request)

        # Save agent results to Supabase
        for agent_result in result.agent_results:
            supabase.table("agent_results").insert({
                "analysis_id": request.analysis_id,
                "agent_name": agent_result.agent_name,
                "agent_role": agent_result.agent_role,
                "agent_emoji": agent_result.agent_emoji,
                "score": agent_result.score,
                "verdict": agent_result.verdict,
                "arguments": agent_result.arguments,
                "recommendations": agent_result.recommendations,
                "risk_level": agent_result.risk_level
            }).execute()

        # Update analysis with final results
        supabase.table("analyses").update({
            "status": "completed",
            "survive_score": result.survive_score,
            "overall_verdict": result.overall_verdict,
            "completed_at": datetime.now(timezone.utc).isoformat()
        }).eq("id", request.analysis_id).execute()

        # Increment user usage count
        supabase.rpc("increment_analyses_used", {
            "user_id": request.user_id
        }).execute()

        return result

    except Exception as e:
        if supabase is not None:
            supabase.table("analyses").update(
                {"status": "failed"}
            ).eq("id", request.analysis_id).execute()
        raise HTTPException(status_code=500, detail=str(e))
