# Git Setup & Customization Workflow

This guide will help you set up your Git repository and start customizing WordWise AI.

---

## Step 1: Initialize Git Repository

### Option A: If you haven't initialized Git yet

```bash
cd /Users/yash/Downloads/Wordwise/wordwise-ai

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: WordWise AI from Pranjal Ekhande

- Original project: https://github.com/pranjalekhande/wordwise-ai
- Full-featured AI writing assistant and carousel creation platform
- Tech stack: Next.js 15, TypeScript, Tailwind CSS, Supabase, Clerk, OpenAI"

# View git status
git status
```

### Option B: If git is already initialized

```bash
cd /Users/yash/Downloads/Wordwise/wordwise-ai

# Check current status
git status

# If there are unstaged changes
git add .
git commit -m "Update: Clean up for personal customization"
```

---

## Step 2: Add Remote Repository

### Create a New Repository on GitHub

1. Go to https://github.com/new
2. Create a new repository:
   - **Repository name**: `wordwise-ai` (or your preferred name)
   - **Description**: "AI-powered writing assistant and carousel creation platform - customized version"
   - **Visibility**: Private (recommended) or Public
   - **Initialize**: Don't initialize with README (we already have one)
   - **License**: MIT or Apache 2.0 (optional)

3. Add remote and push:

```bash
# Replace 'YOUR_USERNAME' with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/wordwise-ai.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### Verify Remote

```bash
git remote -v
# Should output:
# origin  https://github.com/YOUR_USERNAME/wordwise-ai.git (fetch)
# origin  https://github.com/YOUR_USERNAME/wordwise-ai.git (push)
```

---

## Step 3: Create .env.local for Development

```bash
cd /Users/yash/Downloads/Wordwise/wordwise-ai

# Create environment file
cat > .env.local << 'EOF'
# === Clerk Authentication ===
# Get from: https://dashboard.clerk.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_secret_here

# === Supabase ===
# Get from: https://app.supabase.com
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# === OpenAI ===
# Get from: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-your_api_key_here

# === Optional: Application Settings ===
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF

echo "✅ .env.local created (REMEMBER: Don't commit this file!)"
```

**NOTE**: `.env.local` is already in `.gitignore`, so it won't be committed.

---

## Customization Checklist

### Phase 1: Project Branding (No Code Changes)

- [ ] **Update Project Name**
  - File: `package.json`
  - Change: `"name": "wordwise-ai"` → `"name": "your-project-name"`

- [ ] **Update Project Description**
  - Files: `package.json`, `README.md`, `app/layout.tsx` (metadata)
  - Search for "WordWise AI" and update as needed

- [ ] **Update Author Information**
  - File: `package.json`
  - Change: `"author": "Pranjal Ekhande"` → Your name

- [ ] **Update README**
  - File: `README.md`
  - Update project description and links
  - Update deployment information
  - Add your own setup instructions

### Phase 2: Visual Customization (Colors, Fonts)

- [ ] **Change Color Scheme**
  - File: `app/globals.css`
  - Update CSS variables in `:root` and `.dark` sections
  - Tool: Use https://www.colorhexa.com for HSL conversions

  **Common colors to change:**
  ```css
  --primary: 0 0% 9%;           /* Main brand color */
  --secondary: 0 0% 96.1%;      /* Secondary accent */
  --accent: 0 0% 96.1%;         /* Highlight color */
  --destructive: 0 84.2% 60.2%; /* Error/delete color */
  ```

- [ ] **Change Font Family**
  - File: `app/layout.tsx`
  - Current: `Inter` (Google Font)
  - Replace with your preferred font
  - Options: Poppins, Playfair Display, Roboto, Montserrat, etc.
  
  ```tsx
  import { YourFont } from "next/font/google"
  const yourFont = YourFont({ subsets: ["latin"] })
  // Then use: className={yourFont.className}
  ```

- [ ] **Update Sidebar Colors**
  - File: `app/globals.css`
  - Variables: `--sidebar-*` (8 variables)
  - Location: `:root` and `.dark` sections

- [ ] **Update Chart Colors**
  - File: `app/globals.css`
  - Variables: `--chart-1` through `--chart-5`
  - Used for analytics and data visualization

### Phase 3: Logo & Images

- [ ] **Replace Logo**
  - Directory: `/public/images/`
  - Update favicon, app icon, hero image
  - Update in: `app/layout.tsx` (if using favicon)

- [ ] **Update Branding Text**
  - Search: "WordWise" in all files
  - Files likely needing updates:
    - `app/layout.tsx` - Page title and metadata
    - `components/layout/layout-wrapper.tsx` - Header text
    - `README.md` - Documentation
    - `components/landing/landing-page.tsx` - Hero text

- [ ] **Update Landing Page**
  - File: `components/landing/landing-page.tsx`
  - Update: Hero text, benefits, features description
  - Update: CTA buttons and links

### Phase 4: Feature Customization (Code Changes)

- [ ] **Rename "InstaCarousel" to Custom Name** (if desired)
  - Replace throughout codebase with your preferred term
  - Files affected: Components, API routes, types, database

- [ ] **Customize Dashboard Cards**
  - File: `app/page.tsx`
  - Update: Card titles, descriptions, icons

- [ ] **Update Navigation Menu**
  - File: `components/layout/app-sidebar.tsx`
  - Change: Menu items, labels, icons

- [ ] **Customize Slide Editor**
  - File: `components/editor/slide-editor.tsx`
  - Update: Default options, templates, UI

### Phase 5: Database Setup (Required for Full Functionality)

- [ ] **Create Supabase Project**
  - Go to: https://app.supabase.com
  - Create new project
  - Save credentials to `.env.local`

- [ ] **Initialize Database Schema**
  - Run: `scripts/complete-schema.sql` in Supabase SQL editor
  - Or run individual migration scripts as needed

- [ ] **Create Supabase Storage Bucket**
  - Bucket name: `documents` or `files`
  - Update in: `lib/supabase.ts` if using different name

- [ ] **Set Up Clerk**
  - Go to: https://dashboard.clerk.com
  - Create organization/project
  - Configure sign-in/sign-up pages
  - Add redirect URLs for your domain

- [ ] **Configure OpenAI**
  - Get API key from: https://platform.openai.com/api-keys
  - Set usage limits (optional but recommended)
  - Add to `.env.local`

### Phase 6: Testing & Deployment Prep

- [ ] **Test Locally**
  ```bash
  cd /Users/yash/Downloads/Wordwise/wordwise-ai
  pnpm install
  pnpm dev
  # Visit: http://localhost:3000
  ```

- [ ] **Update GitHub with Custom Branding**
  - Add custom repository description
  - Add topics/tags
  - Update README with your project name

- [ ] **Set Up Deployment**
  - Create Vercel account (optional, or use alternative)
  - Connect GitHub repository
  - Add environment variables in deployment platform
  - Configure deployment triggers

- [ ] **Test Authentication Flow**
  - Sign up with email
  - Verify email confirmation
  - Test sign-in
  - Test protected pages

- [ ] **Test Core Features**
  - Create a document
  - Create an Instagram carousel
  - Test slide editing
  - Test export functionality

---

## Git Workflow for Making Changes

### Standard Commit Workflow

```bash
cd /Users/yash/Downloads/Wordwise/wordwise-ai

# 1. Make your changes in VS Code
# 2. Check status
git status

# 3. Stage changes
git add .
# Or stage specific files:
# git add components/ui/button.tsx
# git add app/globals.css

# 4. Commit with descriptive message
git commit -m "feat: Change primary brand color to custom blue

- Updated all CSS variables in globals.css
- Changed primary from black to custom blue (#1E40AF)
- Updated dark mode colors for consistency"

# 5. Push to GitHub
git push origin main
```

### Commit Message Convention

Use descriptive commit messages following this pattern:

```
<type>: <subject>

<body (optional)>

<footer (optional)>
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code refactoring
- `style:` - Style changes (CSS, formatting)
- `docs:` - Documentation updates
- `chore:` - Build, deps, package updates
- `revert:` - Revert previous commit

**Examples:**
```bash
git commit -m "style: Update color scheme to brand colors"
git commit -m "feat: Add custom font family (Poppins)"
git commit -m "docs: Update README with custom branding"
git commit -m "refactor: Rename InstaCarousel to CustomName"
```

---

## Creating Feature Branches (Optional but Recommended)

For larger changes, create separate branches:

```bash
# Create feature branch
git checkout -b feature/custom-branding

# Make changes and commit
git add .
git commit -m "style: Update branding colors and fonts"

# Push branch
git push origin feature/custom-branding

# Create Pull Request on GitHub
# Then merge back to main
git checkout main
git merge feature/custom-branding
git push origin main
```

---

## Useful Git Commands

```bash
# View commit history
git log --oneline -10

# View changes not yet staged
git diff

# View staged changes
git diff --staged

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# View remote URLs
git remote -v

# Update from remote
git pull origin main
```

---

## Important: Files to Never Commit

These are already in `.gitignore`:
- ❌ `.env.local` - Your secret keys
- ❌ `node_modules/` - Dependencies
- ❌ `.next/` - Build output
- ❌ `dist/` - Distribution files

Always check `.gitignore` before committing sensitive information!

---

## Next Steps

1. ✅ Initialize Git and create remote repository
2. ✅ Copy this guide to your project
3. 📝 Follow the Customization Checklist phase by phase
4. 💾 Commit changes after each completed phase
5. 🚀 Deploy to your hosting platform

Happy customizing! 🎉
