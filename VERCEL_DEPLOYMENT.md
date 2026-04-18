# FounderCopilot Deployment

## Prerequisites
- GitHub account
- Vercel account (free or paid)
- Git initialized in the project

## Deployment Steps

### 1. Initialize Git (if not done)
```bash
cd /Users/prom1/Desktop/FOUNDER\ CO\ PILOT/foundercopilot
git init
git add .
git commit -m "Initial commit"
git branch -M main
```

### 2. Push to GitHub
```bash
# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/foundercopilot.git
git push -u origin main
```

### 3. Deploy to Vercel
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Select "Next.js" as the framework
4. Configure root directory as `apps/web`
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `STRIPE_PUBLIC_KEY`
   - `STRIPE_SECRET_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_KEY`
   - `GROQ_API_KEY`
6. Click Deploy

### 4. Deploy Backend to Railway (Recommended for Python/FastAPI)
1. Go to https://railway.app
2. Connect your GitHub repository
3. Select the `foundercopilot` project
4. Configure to deploy from `/apps/agents`
5. Add environment variables (same as above)
6. Deploy

Alternatively, deploy backend separately to Render, Fly.io, or Heroku.

## Environment Variables Needed
Create a `.env.local` file in `apps/web/`:
```
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

Create a `.env` file in `apps/agents/`:
```
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_service_key
GROQ_API_KEY=your_groq_key
INTERNAL_API_KEY=your_api_key
FRONTEND_URL=https://your-frontend-domain.vercel.app
```
