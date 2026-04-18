# 🚀 QUICK DEPLOYMENT GUIDE

## **FRONTEND: Deploy to Vercel (2 minutes)**

### Step 1: Go to Vercel
https://vercel.com/new

### Step 2: Import GitHub Repository
1. Click **"Import Git Repository"**
2. Paste: `https://github.com/arqamxscales/Founder-AI-Copilot`
3. Click **"Import"**

### Step 3: Configure
- **Project Name**: `founder-ai-copilot` (or your choice)
- **Framework**: Next.js (auto-detected)
- **Root Directory**: `apps/web`
- **Build Command**: `npm run build` (auto-filled)
- **Output Directory**: `.next` (auto-filled)

### Step 4: Environment Variables
Click **"Environment Variables"** and add:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
NEXT_PUBLIC_API_URL=https://founder-ai-copilot.railway.app
STRIPE_PUBLIC_KEY=pk_live_xxxxx
```

### Step 5: Deploy
Click **"Deploy"** button ✅

**Your Frontend URL will be something like:**
```
https://founder-ai-copilot.vercel.app
```

---

## **BACKEND: Deploy to Railway (2 minutes)**

### Step 1: Go to Railway
https://railway.app/new

### Step 2: Deploy from GitHub
1. Click **"Deploy from GitHub"**
2. Select `Founder-AI-Copilot`
3. Click **"Deploy"**

### Step 3: Configure Settings
1. Click on your project
2. Go to **Settings**
3. Set **Root Directory**: `apps/agents`
4. Set **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Step 4: Add Environment Variables
In **Variables** tab, add:
```
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_service_key
GROQ_API_KEY=gsk_xxxxx
INTERNAL_API_KEY=your_secret_key
FRONTEND_URL=https://founder-ai-copilot.vercel.app
STRIPE_SECRET_KEY=sk_live_xxxxx
```

### Step 5: Deploy
Railway auto-deploys! Wait for green checkmark ✅

**Your Backend URL will be something like:**
```
https://founder-ai-copilot.railway.app
```

---

## **FINAL STEP: Update Frontend Environment**

After Railway deploys, update your Vercel environment:
1. Go to Vercel Dashboard
2. Select your project
3. Go to **Settings → Environment Variables**
4. Update `NEXT_PUBLIC_API_URL` to your Railway URL

---

## **DONE! 🎉**

Your app is now live at:
- **Frontend**: https://founder-ai-copilot.vercel.app
- **Backend API**: https://founder-ai-copilot.railway.app
- **API Docs**: https://founder-ai-copilot.railway.app/docs

Every git push will auto-deploy! 🚀
