# 🔑 LexivoAI Environment Variables & Cost Guide

## Environment Variables Required

Create `.env.local` in your project root with these keys:

### **Required Keys**

```env
# ========================================
# 1. CLERK AUTHENTICATION (Free for hobby)
# ========================================
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
CLERK_SECRET_KEY=sk_test_your_secret_key

# ========================================
# 2. SUPABASE DATABASE (Free tier available)
# ========================================
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...

# ========================================
# 3. OPENAI API (Paid - see costs below)
# ========================================
OPENAI_API_KEY=sk-proj-your_openai_api_key_here
```

### **Optional Keys**

```env
# Application URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Node environment
NODE_ENV=development
```

---

## 💰 Cost Breakdown

### **1. Clerk Authentication** ✅ FREE
- **Cost**: Free for up to 10,000 monthly active users
- **What you get**: 
  - Email/password login
  - Social auth (Google, GitHub, etc.)
  - SSO support
  - User management dashboard
- **When you pay**: After 10k MAU
- **Sign up**: https://dashboard.clerk.com

---

### **2. Supabase Database** ✅ FREE TIER (with limits)
- **Free Plan Includes**:
  - 500 MB database storage
  - 1 GB bandwidth/month
  - Up to 2 concurrent connections
  - All core features
- **Paid Plans Start At**: $25/month (Pro)
- **Sign up**: https://supabase.com

**When to upgrade**:
- Storage > 500 MB
- Bandwidth > 1 GB/month
- Need more concurrent connections

---

### **3. OpenAI API** 💸 PAID (Pay-as-you-go)

#### **Pricing by Model** (as of Feb 2026):

| Model | Input | Output | Use Case |
|-------|-------|--------|----------|
| **gpt-3.5-turbo** | $0.50/1M tokens | $1.50/1M tokens | 💡 Budget option (currently used) |
| **gpt-4-turbo** | $10/1M tokens | $30/1M tokens | 🚀 Better quality |
| **gpt-4o** | $5/1M tokens | $15/1M tokens | ⚡ Balanced |

#### **Real-world Costs**:

```
1 suggestion request = ~100-200 tokens = $0.0001-0.0003

Examples:
- 1,000 suggestions/month = ~$0.10-0.30
- 10,000 suggestions/month = ~$1.00-3.00
- 100,000 suggestions/month = ~$10-30
```

#### **Cost Control Tips**:
1. ✅ Use gpt-3.5-turbo (current setup) = cheapest
2. ✅ Set token limits in API requests (max_tokens: 1000)
3. ✅ Cache responses client-side
4. ✅ Rate-limit user requests
5. ✅ Monitor usage in OpenAI dashboard

**Sign up**: https://platform.openai.com
**Need**: Credit/debit card + billing setup

---

## 📋 Setup Instructions

### **Step 1: Clerk (5 min)** ✅ FREE
```bash
# 1. Go to https://dashboard.clerk.com
# 2. Create new application
# 3. Copy publishable key and secret key
# 4. Add to .env.local:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### **Step 2: Supabase (10 min)** ✅ FREE
```bash
# 1. Go to https://supabase.com
# 2. Create new project
# 3. Wait for setup (~2 min)
# 4. Copy Project URL and keys from Settings → API
# 5. Add to .env.local:
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

### **Step 3: OpenAI (5 min)** 💸 PAID
```bash
# 1. Go to https://platform.openai.com/account/billing/overview
# 2. Add payment method (credit/debit card)
# 3. Go to API keys: https://platform.openai.com/api/keys
# 4. Create new secret key
# 5. Add to .env.local:
OPENAI_API_KEY=sk-proj-...

# Set usage limit in OpenAI dashboard to be safe
```

---

## 🛡️ Cost Safety Tips

### **Prevent Unexpected Charges**

1. **Set OpenAI Usage Limit**
   - Dashboard → Billing → Usage limits
   - Set monthly limit (e.g., $20)
   - API calls will fail if exceeded

2. **Monitor Spending**
   ```bash
   # Check your OpenAI usage:
   # https://platform.openai.com/account/billing/overview
   ```

3. **Use Client-Side Caching**
   ```tsx
   // Only call API if content changed
   const [lastContent, setLastContent] = useState("")
   
   useEffect(() => {
     if (content !== lastContent) {
       generateSuggestions(content)
       setLastContent(content)
     }
   }, [content])
   ```

4. **Rate Limit Requests**
   ```tsx
   const debounceMs = 1000 // Wait 1 second after typing
   ```

---

## 📊 Total Monthly Cost Estimate

### **Scenario 1: Hobby/Testing** (1-100 users)
```
Clerk:     $0      (free tier)
Supabase:  $0      (free tier)
OpenAI:    $1-5    (minimal usage)
────────────────────
TOTAL:     $1-5/month
```

### **Scenario 2: Small Production** (100-1000 users)
```
Clerk:     $0      (free up to 10k MAU)
Supabase:  $25     (Pro plan recommended)
OpenAI:    $10-50  (moderate usage)
────────────────────
TOTAL:     $35-75/month
```

### **Scenario 3: Growth** (1000+ users)
```
Clerk:     $0-100  (scales with users)
Supabase:  $25+    (depends on usage)
OpenAI:    $50-200 (high suggestion volume)
────────────────────
TOTAL:     $75-300+/month
```

---

## 🔄 Free Alternatives (if cost is a concern)

### **For OpenAI (AI Suggestions)**
- **Hugging Face** (free inference API)
- **Cohere** (free tier available)
- **Local LLM** (run locally with Ollama)

### **For Supabase (Database)**
- **Firebase** (free tier)
- **MongoDB Atlas** (free tier)
- **PlanetScale** (MySQL, free tier)

### **For Clerk (Auth)**
- **Auth0** (free tier, limited)
- **Supabase Auth** (included, free)
- **NextAuth.js** (open-source, free)

---

## ✅ Quick Checklist

- [ ] Sign up for Clerk (free)
- [ ] Sign up for Supabase (free)
- [ ] Sign up for OpenAI (paid, $5-20 credit for testing)
- [ ] Get all API keys
- [ ] Create `.env.local` file
- [ ] Add all keys to `.env.local`
- [ ] Set OpenAI usage limit in dashboard
- [ ] Run `pnpm install && pnpm dev`
- [ ] Test the application locally

---

## 🚀 Next Steps

1. **Get your keys** (15-30 min)
2. **Create `.env.local`**
   ```bash
   cp .env.example .env.local
   # Edit with your keys
   ```
3. **Run locally**
   ```bash
   pnpm install
   pnpm dev
   ```
4. **Test features** (without heavy OpenAI usage initially)
5. **Set up Vercel deployment** (link GitHub repo)

---

## 📞 Support

**Questions about costs?**
- OpenAI: https://platform.openai.com/account/billing/overview
- Supabase: https://supabase.com/docs/guides/pricing
- Clerk: https://clerk.com/pricing

**Getting started?**
- Check `/QUICK_START.md` in the repo
- Review `AI_SUGGESTION_PANEL_FEATURE.md`

---

**Built with ❤️ for creators who want to save money while building awesome projects!**
