from pydantic import BaseModel
from typing import Optional
from enum import Enum

class StartupStage(str, Enum):
    IDEA = "idea"
    MVP = "mvp"
    GROWTH = "growth"
    SCALING = "scaling"

class AnalysisRequest(BaseModel):
    analysis_id: str
    user_id: str
    title: str
    idea_description: str
    target_market: Optional[str] = None
    business_model: Optional[str] = None
    stage: Optional[StartupStage] = StartupStage.IDEA
