# Quick Start Guide - Making WordWise AI Yours

A 30-minute quick start to get you customizing this project immediately.

---

## ⚡ 30-Minute Quick Start

### Minute 1-3: Initialize Git

```bash
cd /Users/yash/Downloads/Wordwise/wordwise-ai

# Initialize git
git init
git add .
git commit -m "Initial commit: WordWise AI customization"

# (Skip remote setup for now - do this after creating GitHub repo)
```

### Minute 4-8: Change Basic Branding

**Update `package.json`:**
1. Open file in VS Code
2. Find: `"name": "wordwise-ai"`
3. Replace with: `"name": "your-project-name"`
4. Find: `"author": "Pranjal Ekhande"`
5. Replace with: Your name
6. Save: `Ctrl+S` (Windows/Linux) or `Cmd+S` (Mac)

**Update `README.md`:**
1. Open `README.md`
2. Change the title: `# WordWise AI` → `# Your Project Name`
3. Update description to match your vision
4. Save

### Minute 9-15: Change Colors

**Open `app/globals.css`:**

Find the `:root` section and update these main colors:

```css
/* Current - Change these */
--primary: 0 0% 9%;              /* Change to your brand color */
--secondary: 0 0% 96.1%;         /* Secondary color */
--accent: 0 0% 96.1%;            /* Accent highlights */
```

**Popular color combinations ready to use:**

```css
/* Option 1: Blue Theme */
--primary: 217 100% 45%;
--secondary: 217 32% 17%;
--accent: 259 80% 51%;

/* Option 2: Green Theme */
--primary: 142 71% 45%;
--secondary: 142 43% 25%;
--accent: 168 76% 42%;

/* Option 3: Purple Theme */
--primary: 259 80% 51%;
--secondary: 259 40% 30%;
--accent: 281 89% 67%;

/* Option 4: Red/Pink Theme */
--primary: 0 84% 60%;
--secondary: 0 72% 30%;
--accent: 330 81% 60%;
```

Choose one, paste it into `:root`, and save!

### Minute 16-20: Change Font (Optional)

**Open `app/layout.tsx`:**

Find this section:
```tsx
import { Inter } from "next/font/google"
const inter = Inter({ subsets: ["latin"] })
```

Replace with one of these:

```tsx
// Option 1: Poppins (Modern)
import { Poppins } from "next/font/google"
const poppins = Poppins({ weight: ["400", "500", "600", "700"], subsets: ["latin"] })

// Option 2: Playfair Display (Elegant)
import { Playfair_Display } from "next/font/google"
const playfair = Playfair_Display({ subsets: ["latin"] })

// Option 3: Montserrat (Clean)
import { Montserrat } from "next/font/google"
const montserrat = Montserrat({ subsets: ["latin"] })
```

Then change:
```tsx
// FROM
<body className={inter.className}>

// TO (use the name of your new font)
<body className={poppins.className}>
```

Save and you're done!

### Minute 21-25: Setup Environment Variables

```bash
# Create .env.local file
cat > /Users/yash/Downloads/Wordwise/wordwise-ai/.env.local << 'EOF'
# Clerk (get from https://dashboard.clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_get_yours_from_clerk
CLERK_SECRET_KEY=sk_test_get_yours_from_clerk

# Supabase (get from https://app.supabase.com)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=get_yours_from_supabase
SUPABASE_SERVICE_ROLE_KEY=get_yours_from_supabase

# OpenAI (get from https://platform.openai.com)
OPENAI_API_KEY=sk-get_yours_from_openai
EOF
```

**⚠️ IMPORTANT:** Don't commit this file - it's already in `.gitignore`

### Minute 26-30: Test & Commit

```bash
# Install dependencies (one time only)
cd /Users/yash/Downloads/Wordwise/wordwise-ai
pnpm install

# Start development server
pnpm dev

# Visit http://localhost:3000 in your browser
# You should see your customized project!

# Once satisfied, commit your changes
git add .
git commit -m "Initial customization: Update branding and colors"
```

---

## 📋 Most Common Customizations (Copy-Paste Ready)

### 1. Change Project Title Everywhere

**Search for:** "WordWise AI"  
**Replace with:** "Your Project Name"

Files affected:
- `app/layout.tsx` (metadata title)
- `components/layout/layout-wrapper.tsx` (header)
- `README.md` (documentation)
- `package.json` (description)

### 2. Update Brand Colors Instantly

Go to `app/globals.css`, find `:root {`, then replace this block:

```css
--primary: 0 0% 9%;
--primary-foreground: 0 0% 98%;
--secondary: 0 0% 96.1%;
--secondary-foreground: 0 0% 9%;
--muted: 0 0% 96.1%;
--muted-foreground: 0 0% 45.1%;
--accent: 0 0% 96.1%;
--accent-foreground: 0 0% 9%;
```

With your colors (use one of the pre-made themes above).

### 3. Change Header Logo/Text

**File:** `components/layout/layout-wrapper.tsx`

Find:
```tsx
<h1 className="text-lg font-semibold">WordWise AI</h1>
```

Replace with:
```tsx
<h1 className="text-lg font-semibold">Your Project Name</h1>
```

### 4. Update Page Title & Meta Description

**File:** `app/layout.tsx`

Find and update:
```tsx
export const metadata: Metadata = {
  title: "Your Project Name - Your tagline",
  description: "Your project description here",
}
```

### 5. Rename "InstaCarousel" to Your Term

Search & replace "InstaCarousel" with your preferred term throughout:

```bash
grep -r "InstaCarousel" /Users/yash/Downloads/Wordwise/wordwise-ai | head -20
```

---

## 🎨 Pre-Made Color Themes

### Tech/Modern Theme (Blue)
```css
--primary: 217 100% 45%;
--secondary: 217 32% 17%;
--accent: 259 80% 51%;
--muted: 220 14% 96%;
--muted-foreground: 220 12% 40%;
```

### Nature Theme (Green)
```css
--primary: 142 71% 45%;
--secondary: 142 43% 25%;
--accent: 168 76% 42%;
--muted: 142 40% 92%;
--muted-foreground: 142 30% 35%;
```

### Creative Theme (Purple)
```css
--primary: 259 80% 51%;
--secondary: 259 40% 30%;
--accent: 281 89% 67%;
--muted: 260 40% 92%;
--muted-foreground: 260 30% 40%;
```

### Professional Theme (Dark)
```css
--primary: 0 0% 15%;
--secondary: 0 0% 25%;
--accent: 45 100% 50%;
--muted: 0 0% 92%;
--muted-foreground: 0 0% 45%;
```

### Startup Theme (Orange)
```css
--primary: 39 100% 50%;
--secondary: 39 70% 30%;
--accent: 0 84% 60%;
--muted: 40 40% 92%;
--muted-foreground: 40 30% 40%;
```

---

## 🚀 Next: Full Setup (After Quick Start)

Once you've done the quick start, follow these steps:

### Step 1: Create GitHub Repository
1. Go to https://github.com/new
2. Create repository: `wordwise-ai` or `your-project-name`
3. Copy the HTTPS URL

### Step 2: Add Remote & Push
```bash
cd /Users/yash/Downloads/Wordwise/wordwise-ai

# Add GitHub as remote
git remote add origin https://github.com/YOUR_USERNAME/your-project-name.git

# Rename branch and push
git branch -M main
git push -u origin main
```

### Step 3: Setup External Services

#### Clerk Authentication
1. Visit https://dashboard.clerk.com
2. Create new application
3. Copy keys to `.env.local`
4. Configure sign-in/sign-up pages

#### Supabase Database
1. Visit https://app.supabase.com
2. Create new project
3. Run SQL from `scripts/complete-schema.sql` in Supabase SQL Editor
4. Copy API keys to `.env.local`
5. Create storage bucket named "documents"

#### OpenAI API
1. Visit https://platform.openai.com/api-keys
2. Create new secret key
3. Add to `.env.local`
4. Set usage limits (optional but recommended)

### Step 4: Test Everything
```bash
pnpm dev
# Test at http://localhost:3000
# Try signing up
# Try creating a document
# Try creating a carousel
```

---

## 📁 File Structure - Quick Reference

| What to Change | File Location |
|---|---|
| **Project name** | `package.json`, `app/layout.tsx`, `README.md` |
| **Colors** | `app/globals.css` (CSS variables) |
| **Font** | `app/layout.tsx` (import + className) |
| **Header text** | `components/layout/layout-wrapper.tsx` |
| **Logo/Images** | `/public/images/` |
| **Navigation menu** | `components/layout/app-sidebar.tsx` |
| **Homepage content** | `app/page.tsx` |
| **Landing page** | `components/landing/landing-page.tsx` |
| **Database schema** | `scripts/schema.sql` |
| **API endpoints** | `app/api/` directory |
| **Environment vars** | `.env.local` (don't commit!) |

---

## ⚠️ Important Notes

### Don't Forget
✅ Create `.env.local` with your API keys  
✅ Create Clerk account (free tier available)  
✅ Create Supabase account (free tier available)  
✅ Create OpenAI account (paid, but starts with free credits)  

### Don't Commit
❌ `.env.local` (already in .gitignore)  
❌ `node_modules/` (already in .gitignore)  
❌ `.next/` build folder (already in .gitignore)  

### Check .gitignore
Before committing anything sensitive, verify it's in `.gitignore`:
```bash
cat /Users/yash/Downloads/Wordwise/wordwise-ai/.gitignore
```

---

## 🆘 Common Issues & Fixes

### "Module not found" Error
```bash
# Solution: Reinstall dependencies
rm -rf node_modules
pnpm install
```

### "Cannot find next.config"
```bash
# Make sure you're in the right directory
cd /Users/yash/Downloads/Wordwise/wordwise-ai
pnpm dev
```

### "Clerk keys not configured"
```bash
# Make sure .env.local exists and has CLERK keys
cat .env.local | grep CLERK
```

### Port 3000 Already in Use
```bash
# Use different port
pnpm dev -- -p 3001
# Then visit http://localhost:3001
```

---

## 📚 Detailed Guides

For more detailed information, see:

- **Full Analysis**: `PROJECT_ANALYSIS.md` - Complete project breakdown
- **Git & Customization**: `GIT_SETUP_AND_CUSTOMIZATION.md` - Step-by-step guide
- **Code Examples**: `DETAILED_CUSTOMIZATION_EXAMPLES.md` - Before/after code samples

---

## 🎯 Your Customization Roadmap

```
Week 1:
├── ✅ Quick Start (30 min)
├── ✅ Update branding (1 hour)
├── ✅ Change colors (1 hour)
└── ✅ Setup git & commit (30 min)

Week 2:
├── ✅ Setup external services (2 hours)
├── ✅ Test core functionality (1 hour)
├── ✅ Deploy to Vercel/hosting (1 hour)
└── ✅ Fine-tune UI/colors (1-2 hours)

Week 3+:
├── ✅ Add custom features
├── ✅ Optimize performance
├── ✅ Setup analytics
└── ✅ Scale and improve
```

---

## 🎉 You're Ready!

You now have everything you need to customize and make WordWise AI your own project. Start with the quick start section, then use the detailed guides for more complex customizations.

**Happy building! 🚀**

Need help? Check:
1. PROJECT_ANALYSIS.md - Architecture & features
2. GIT_SETUP_AND_CUSTOMIZATION.md - Git & workflow
3. DETAILED_CUSTOMIZATION_EXAMPLES.md - Code examples

---

## Chat Tips 💬

When working with me on customizations:

1. **Be specific**: "Change primary color to blue" 
2. **Show context**: Share the file path or code snippet
3. **Describe goal**: "I want a purple theme with Poppins font"
4. **Ask for examples**: "Show me how to customize..."

I can help with:
- Changing colors, fonts, styling
- Renaming features and UI text
- Adding new components
- Modifying API endpoints
- Database schema changes
- Deployment setup
- Git workflow guidance

Just ask! 🎯
