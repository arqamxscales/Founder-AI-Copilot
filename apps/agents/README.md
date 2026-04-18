# FounderCopilot Agents API

Python FastAPI backend for AI agent orchestration.

## Quick Start

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

## Endpoints

### Health Check

```
GET /health
```

### Run Analysis

```
POST /analyze
Headers: X-API-Key: internal-api-key
Body: AnalysisRequest
```

## Architecture

- `base_agent.py` - Abstract agent class
- `devils_advocate.py` - Startup destroyer agent
- `market_analyst.py` - Market validation
- `legal_risk.py` - Risk assessment
- `customer_voice.py` - Customer perspective
- `tech_feasibility.py` - Technical evaluation
- `orchestrator.py` - Agent coordinator

## Deployment

See [DEPLOYMENT.md](../../DEPLOYMENT.md)

Built by Mohammad Arqam Javed © 2025
