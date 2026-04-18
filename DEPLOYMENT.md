# Deployment Guide

Complete step-by-step guide to deploy FounderCopilot to production.

## Prerequisites

- Supabase project
- Google Cloud account
- Vercel account
- Stripe account
- Anthropic API key

---

## Step 1: Supabase Setup

### Create Project

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy `URL` and `anon key`

### Run Migrations

```bash
npm install -g supabase

supabase login
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

### Enable Google OAuth

1. Dashboard → Authentication → Providers
2. Enable Google provider
3. Add Google Cloud OAuth credentials

---

## Step 2: Deploy Python Agents (Google Cloud Run)

### Setup GCP

```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
```

### Build & Deploy

```bash
cd apps/agents

# Build Docker image
gcloud builds submit --tag gcr.io/YOUR_PROJECT/foundercopilot-agents

# Deploy to Cloud Run
gcloud run deploy foundercopilot-agents \
  --image gcr.io/YOUR_PROJECT/foundercopilot-agents \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars \
    ANTHROPIC_API_KEY=YOUR_KEY,\
    SUPABASE_URL=YOUR_URL,\
    SUPABASE_SERVICE_KEY=YOUR_SERVICE_KEY,\
    FRONTEND_URL=https://your-domain.vercel.app,\
    INTERNAL_API_KEY=YOUR_SECURE_KEY
```

Copy the service URL (e.g., `https://foundercopilot-agents-xxxxx-uc.a.run.app`)

---

## Step 3: Deploy Frontend (Vercel)

### Setup

```bash
cd apps/web

npm install -g vercel
vercel login
```

### Deploy

```bash
vercel --prod
```

### Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
AGENTS_API_URL=https://foundercopilot-agents-xxxxx-uc.a.run.app
INTERNAL_API_KEY=...
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
STRIPE_PRO_PRICE_ID=...
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

---

## Step 4: Stripe Setup

### Create Product

1. Stripe Dashboard → Products
2. Create new product: "FounderCopilot Pro"
3. Create price: $19/month (recurring)
4. Copy price ID

### Webhook

1. Developers → Webhooks → Add endpoint
2. URL: `https://your-domain.vercel.app/api/stripe/webhook`
3. Events: 
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy signing secret

---

## Verification

1. Visit frontend URL
2. Sign up with Google
3. Create new analysis
4. Check agent processing
5. Verify results display

---

## Monitoring

### Check Agent Service

```bash
curl https://foundercopilot-agents-xxxxx-uc.a.run.app/health
```

### Supabase Logs

Dashboard → Logs → check agent_results table for new entries

### Vercel Logs

Vercel Dashboard → your project → Deployments → view build/runtime logs

---

Built with ❤️ by Mohammad Arqam Javed
