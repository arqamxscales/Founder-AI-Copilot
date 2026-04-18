# FounderCopilot

> AI-Powered Multi-Agent Platform to Stress-Test Startup Ideas

**FounderCopilot** is a SaaS web application that analyzes your startup idea by running it through 5 specialized AI agents that debate, attack, and validate your business concept. Get your **Survive Score** + actionable fixes + investor-ready report.

## 🧠 Overview

- **Free Tier**: 1 full idea analysis (3-day trial unlocks 3 analyses)
- **Paid Tier**: Unlimited analyses + investor pitch PDF export + agent replay mode

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes + Python FastAPI (agents)
- **AI**: Anthropic Claude Sonnet 4
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe
- **Auth**: Supabase Auth (Google OAuth + Email)
- **Deployment**: Vercel (frontend) + Google Cloud Run (agents)

## 📦 Project Structure

```
foundercopilot/
├── apps/
│   ├── web/           # Next.js frontend
│   └── agents/        # Python FastAPI backend
├── supabase/
│   └── migrations/    # Database schemas
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Python 3.11+
- Supabase account
- Anthropic API key
- Stripe account

### Frontend Setup

```bash
cd apps/web
npm install
npm run dev
```

Visit `http://localhost:3000`

### Backend Setup

```bash
cd apps/agents
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Environment Variables

See `.env.local` templates in each directory.

## 📊 The 5 Agents

1. **😈 Devil's Advocate** - Finds fatal flaws
2. **📊 Market Analyst** - Validates the market
3. **⚖️ Legal Eagle** - Spots legal risks
4. **🗣️ Customer Voice** - Represents buyers
5. **🔬 Tech Oracle** - Checks feasibility

## 🔄 Workflow

1. User submits startup idea
2. Analysis created in Supabase (status: pending)
3. Next.js API triggers Python agents via Cloud Run
4. 5 agents analyze idea independently
5. Results aggregated & Survive Score calculated
6. Frontend polls API every 3 seconds until complete
7. User views detailed breakdown

## 💰 Revenue Model

- **Free**: 1 analysis
- **Trial (3 days)**: 3 analyses
- **Pro ($19/month)**: Unlimited analyses

## 📝 API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/analysis/create` | POST | Create new analysis |
| `/api/analysis/[id]` | GET | Get analysis results |
| `/api/stripe/checkout` | POST | Create Stripe checkout |
| `/api/stripe/webhook` | POST | Handle Stripe events |

## 📖 Documentation

- [Deployment Guide](./DEPLOYMENT.md)
- [Database Schema](./supabase/migrations/001_initial_schema.sql)
- [Agent System](./apps/agents/README.md)

## 🎯 Development Roadmap

- [x] Project structure
- [ ] Core agent system
- [ ] Supabase integration
- [ ] Stripe integration
- [ ] Frontend UI
- [ ] PDF export
- [ ] Agent replay mode
- [ ] Public leaderboard

## 📄 License

Built by Mohammad Arqam Javed © 2025

---

**Ready to build?** Start with the [Deployment Guide](./DEPLOYMENT.md) or jump into the code!
