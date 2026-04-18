# Vercel Deployment Guide for FounderCopilot

## Quick Start: Deploy Frontend + Backend

### Option A: Deploy Frontend to Vercel + Backend to Railway (Recommended)

#### Step 1: Prepare GitHub Repository
```bash
cd ~/Desktop/"FOUNDER CO PILOT"/foundercopilot

# Initialize git
git init
git add .
git commit -m "Initial commit"

# Add your GitHub repo
git remote add origin https://github.com/YOUR_USERNAME/foundercopilot.git
git push -u origin main
```

#### Step 2: Deploy Frontend to Vercel
1. Visit https://vercel.com/new
2. Click "Import Git Repository"
3. Select your `foundercopilot` repository
4. **Framework**: Next.js
5. **Root Directory**: `apps/web`
6. **Environment Variables**: Add these:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_API_URL` = `https://your-backend-url.com`
7. Click "Deploy"

#### Step 3: Deploy Backend to Railway
1. Visit https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select your `foundercopilot` repository
4. In project settings, set root directory to `apps/agents`
5. Add environment variables from your `.env`
6. Deploy
7. Get your Railway URL and add to frontend `NEXT_PUBLIC_API_URL`

### Option B: Deploy Both to Vercel (Frontend only, Backend as serverless)
This requires converting FastAPI to Next.js API routes. Not recommended for complex APIs.

---

## Environment Variables Setup

### Frontend (.env.local in apps/web/)
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
STRIPE_PUBLIC_KEY=pk_live_xxx
```

### Backend (.env in apps/agents/)
```
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_KEY=eyJxxx...
GROQ_API_KEY=gsk_xxx
INTERNAL_API_KEY=your_secret_key
FRONTEND_URL=https://your-app.vercel.app
```

---

## After Deployment

✅ Frontend will be live at: `https://your-app.vercel.app`
✅ Backend will be live at: `https://your-backend.railway.app`
✅ CI/CD enabled - deploys automatically on git push

Your app is now production-ready!
