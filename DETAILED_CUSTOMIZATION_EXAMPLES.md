# Detailed Customization Examples

Complete before-and-after examples for common customization tasks.

---

## 1. Changing Project Name Globally

### Task: Rename from "WordWise AI" to "ContentFlow Pro"

#### Files to Update:

**1. `package.json`**
```json
// Before
{
  "name": "wordwise-ai",
  "description": "AI-powered writing assistant and content creation platform",
  "author": "Pranjal Ekhande",
}

// After
{
  "name": "contentflow-pro",
  "description": "AI-powered content creation and carousel builder",
  "author": "Your Name",
}
```

**2. `app/layout.tsx` (Metadata)**
```tsx
// Before
export const metadata: Metadata = {
  title: "WordWise AI - AI-Powered Writing Assistant & Content Creation",
  description: "Transform your writing with AI intelligence...",
}

// After
export const metadata: Metadata = {
  title: "ContentFlow Pro - AI-Powered Content Creator",
  description: "Create engaging content and carousels with AI assistance...",
}
```

**3. `components/layout/layout-wrapper.tsx`**
```tsx
// Before
<h1 className="text-lg font-semibold">WordWise AI</h1>

// After
<h1 className="text-lg font-semibold">ContentFlow Pro</h1>
```

**4. `README.md`**
```markdown
// Before
# WordWise AI
**AI-Powered Writing Assistant & Content Creation Platform**

// After
# ContentFlow Pro
**AI-Powered Content Creation & Carousel Builder**
```

### How to Find All Instances:

```bash
# Search for "WordWise" in all files
grep -r "WordWise" /Users/yash/Downloads/Wordwise/wordwise-ai

# Search for "InstaCarousel" in all files
grep -r "InstaCarousel" /Users/yash/Downloads/Wordwise/wordwise-ai
```

---

## 2. Complete Color Scheme Change

### Task: Change from Neutral (Black/Gray) to Blue Theme

#### File: `app/globals.css`

```css
/* BEFORE - Neutral/Black Theme */
:root {
  --primary: 0 0% 9%;              /* Black */
  --primary-foreground: 0 0% 98%;  /* White */
  --secondary: 0 0% 96.1%;         /* Light gray */
  --secondary-foreground: 0 0% 9%; /* Black */
  --muted: 0 0% 96.1%;             /* Light gray */
  --muted-foreground: 0 0% 45.1%;  /* Medium gray */
  --accent: 0 0% 96.1%;            /* Light gray */
  --accent-foreground: 0 0% 9%;    /* Black */
  --destructive: 0 84.2% 60.2%;    /* Red (unchanged) */
  --chart-1: 12 76% 61%;           /* Orange */
  --chart-2: 173 58% 39%;          /* Teal */
  --chart-3: 197 37% 24%;          /* Dark blue */
  --chart-4: 43 74% 66%;           /* Yellow */
  --chart-5: 27 87% 67%;           /* Orange-red */
  --sidebar-primary: 240 5.9% 10%; /* Dark gray-blue */
  --sidebar-accent: 240 4.8% 95.9%;/* Light gray-blue */
}

/* AFTER - Blue Theme */
:root {
  --primary: 217 100% 45%;           /* Bright blue */
  --primary-foreground: 0 0% 100%;   /* White */
  --secondary: 217 32% 17%;          /* Dark blue */
  --secondary-foreground: 0 0% 100%; /* White */
  --muted: 220 14% 96%;              /* Blue-tinted gray */
  --muted-foreground: 220 12% 40%;   /* Blue-tinted dark gray */
  --accent: 259 80% 51%;             /* Purple-blue */
  --accent-foreground: 0 0% 100%;    /* White */
  --destructive: 0 84.2% 60.2%;      /* Red (unchanged) */
  --chart-1: 217 100% 45%;           /* Primary blue */
  --chart-2: 259 80% 51%;            /* Purple-blue */
  --chart-3: 193 82% 31%;            /* Dark cyan */
  --chart-4: 180 93% 50%;            /* Light blue */
  --chart-5: 262 80% 50%;            /* Violet */
  --sidebar-primary: 217 100% 45%;   /* Bright blue */
  --sidebar-accent: 217 32% 95%;     /* Light blue tint */
}

.dark {
  --primary: 217 91% 60%;            /* Lighter blue for dark mode */
  --primary-foreground: 217 32% 17%; /* Very dark blue */
  --secondary: 217 91% 60%;          /* Light blue */
  --secondary-foreground: 217 32% 17%;/* Dark blue */
  --accent: 259 100% 71%;            /* Light purple */
  --accent-foreground: 217 32% 17%;  /* Dark background */
  --chart-1: 217 91% 60%;
  --chart-2: 259 100% 71%;
  --chart-3: 193 100% 50%;
  --chart-4: 180 100% 50%;
  --chart-5: 262 100% 71%;
}
```

### HSL Values Quick Reference:

```
Common Colors in HSL format:
- Blue: 217 100% 45% or 217 86% 52%
- Red: 0 84% 60%
- Green: 142 71% 45%
- Purple: 259 80% 51%
- Orange: 39 100% 50%
- Teal: 174 100% 29%
- Pink: 330 81% 60%

Tools to convert:
- https://www.colorhexa.com
- https://chir.mm/projects/TailwindCSS-Color-Converter/
```

---

## 3. Change Font Family

### Task: Switch from Inter to Poppins

#### File: `app/layout.tsx`

```tsx
// BEFORE
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* ... rest of layout ... */}
      </body>
    </html>
  )
}

// AFTER
import { Poppins } from "next/font/google"

const poppins = Poppins({ 
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"] 
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        {/* ... rest of layout ... */}
      </body>
    </html>
  )
}
```

### Other Font Options Available from Google Fonts:

```tsx
// Modern, Clean
import { Poppins } from "next/font/google"
import { Montserrat } from "next/font/google"
import { Raleway } from "next/font/google"

// Serif (Professional)
import { Playfair Display } from "next/font/google"
import { Merriweather } from "next/font/google"
import { Lora } from "next/font/google"

// Monospace (Technical)
import { JetBrains Mono } from "next/font/google"
import { Fira Code } from "next/font/google"
```

---

## 4. Update Dashboard Cards

### Task: Customize the home page dashboard

#### File: `app/page.tsx`

Locate the stats card section and customize:

```tsx
// Example customization
const StatCard = ({ icon: Icon, label, value, color }: any) => (
  <Card className="border-none shadow-md hover:shadow-lg transition">
    <CardHeader className="pb-3">
      <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
        <Icon className={`w-4 h-4 text-${color}`} />
        {label}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
)

// Use it:
<StatCard 
  icon={FileText} 
  label="Active Projects" 
  value={stats?.projectCount || 0}
  color="blue-500"
/>
```

---

## 5. Update Navigation Sidebar Items

### Task: Customize sidebar menu

#### File: `components/layout/app-sidebar.tsx`

```tsx
// Find the navigation items section and customize:

// BEFORE
const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/documents", label: "Documents", icon: FileText },
  { href: "/editor", label: "Carousels", icon: Sparkles },
  { href: "/settings", label: "Settings", icon: Settings },
]

// AFTER - Add new items, change labels/icons
const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/documents", label: "Content Library", icon: Library },
  { href: "/editor", label: "Create Carousel", icon: Wand2 },
  { href: "/templates", label: "Templates", icon: LayoutTemplate },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
]
```

---

## 6. Update Landing Page (Before Sign-In)

### Task: Customize hero section and value propositions

#### File: `components/landing/landing-page.tsx`

```tsx
// Find the hero section and update:

// BEFORE
<h1 className="text-4xl font-bold mb-4">WordWise AI</h1>
<p className="text-xl text-muted-foreground mb-8">
  Transform your documents into polished content with AI intelligence
</p>

// AFTER
<h1 className="text-5xl font-bold mb-4">ContentFlow Pro</h1>
<p className="text-xl text-muted-foreground mb-8">
  Create stunning Instagram carousels in minutes with AI-powered content generation
</p>

// Update features section:
// BEFORE
const features = [
  "AI Writing Assistant",
  "Instagram Carousel Creation",
  "Grammar Checking",
]

// AFTER
const features = [
  "Lightning-fast carousel creation",
  "AI-powered content optimization",
  "Multi-format export (PDF, images, ZIP)",
  "Brand voice consistency",
  "Analytics dashboard",
  "Team collaboration (coming soon)",
]
```

---

## 7. Customize Slide Editor Behavior

### Task: Change default slide settings

#### File: `components/editor/slide-editor.tsx`

```tsx
// Find the defaults and customize:

// BEFORE
const DEFAULT_SLIDE_SETTINGS = {
  maxCharacters: 280,
  minCharacters: 50,
  maxHashtags: 5,
}

// AFTER
const DEFAULT_SLIDE_SETTINGS = {
  maxCharacters: 300,
  minCharacters: 30,
  maxHashtags: 8,
  defaultTone: "professional",
  includeImageDescription: true,
}

// Update the tone options:
const TONE_OPTIONS = [
  "professional",
  "casual",
  "inspiring",
  "educational",
  "entertaining",
  "formal",
  "friendly",
  // Add your custom tones
]
```

---

## 8. Update Environment Configuration

### Task: Create proper .env.local structure

#### File: `.env.local`

```bash
# === CLERK AUTHENTICATION ===
# Get these from: https://dashboard.clerk.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
CLERK_SECRET_KEY=sk_test_your_secret_key

# === SUPABASE (Database & Storage) ===
# Get these from: https://app.supabase.com
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# === OPENAI (AI Features) ===
# Get from: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_MODEL=gpt-4-turbo  # or gpt-3.5-turbo for cost savings

# === APPLICATION SETTINGS ===
# Update these for your deployment
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=ContentFlow Pro
NODE_ENV=development

# === OPTIONAL: Analytics & Monitoring ===
# NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
# SENTRY_DSN=your_sentry_dsn
```

---

## 9. Create Custom Theme Colors Object

### Task: Create a centralized color configuration file

#### Create: `lib/theme-config.ts`

```typescript
export const themeConfig = {
  colors: {
    primary: {
      light: "#1e40af",    // Bright blue
      dark: "#60a5fa",     // Light blue for dark mode
      foreground: "#ffffff" // White text
    },
    secondary: {
      light: "#1e3a8a",    // Dark blue
      dark: "#93c5fd",     // Very light blue
      foreground: "#ffffff"
    },
    accent: {
      light: "#6366f1",    // Indigo
      dark: "#c7d2fe",     // Light indigo
      foreground: "#ffffff"
    },
    muted: {
      light: "#f1f5f9",    // Light gray
      dark: "#334155",     // Dark gray
      foreground: "#475569" // Medium gray
    },
  },
  fonts: {
    primary: "Poppins, sans-serif",
    secondary: "Merriweather, serif",
    mono: "Fira Code, monospace",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
  },
  borderRadius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    full: "9999px",
  },
} as const

export type Theme = typeof themeConfig
```

**Usage in Components:**
```tsx
import { themeConfig } from "@/lib/theme-config"

export function MyComponent() {
  return (
    <button style={{ 
      backgroundColor: themeConfig.colors.primary.light,
      fontFamily: themeConfig.fonts.primary,
    }}>
      Click me
    </button>
  )
}
```

---

## 10. Create Customization Checklist Component

### Task: Add a visual customization progress tracker

#### Create: `components/setup/customization-checklist.tsx`

```tsx
"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle2, Circle } from "lucide-react"

interface ChecklistItem {
  id: string
  title: string
  description: string
  completed: boolean
}

export function CustomizationChecklist() {
  const [items, setItems] = useState<ChecklistItem[]>([
    {
      id: "project-name",
      title: "Update Project Name",
      description: "Change 'WordWise AI' to your project name",
      completed: false,
    },
    {
      id: "colors",
      title: "Customize Colors",
      description: "Update CSS variables in app/globals.css",
      completed: false,
    },
    {
      id: "fonts",
      title: "Change Fonts",
      description: "Update font family in app/layout.tsx",
      completed: false,
    },
    {
      id: "logo",
      title: "Upload Logo & Images",
      description: "Replace images in /public/images",
      completed: false,
    },
    {
      id: "env",
      title: "Configure .env.local",
      description: "Add your API keys and configuration",
      completed: false,
    },
    {
      id: "database",
      title: "Setup Database",
      description: "Initialize Supabase schema",
      completed: false,
    },
    {
      id: "auth",
      title: "Configure Authentication",
      description: "Setup Clerk and OpenAI",
      completed: false,
    },
    {
      id: "test",
      title: "Test Application",
      description: "Run locally and test core features",
      completed: false,
    },
  ])

  const toggleItem = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ))
  }

  const completed = items.filter(item => item.completed).length
  const total = items.length
  const progress = (completed / total) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customization Progress</CardTitle>
        <div className="mt-4 w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          {completed} of {total} completed
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.map(item => (
            <label
              key={item.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer"
            >
              <Checkbox
                checked={item.completed}
                onChange={() => toggleItem(item.id)}
              />
              <div className="flex-1">
                <p className={`font-medium ${item.completed ? "line-through text-muted-foreground" : ""}`}>
                  {item.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
              {item.completed && (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              )}
            </label>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
```

---

## Quick Command Reference

### Find and Replace All Occurrences

```bash
# Find all instances of a word
grep -r "WordWise" /Users/yash/Downloads/Wordwise/wordwise-ai --include="*.tsx" --include="*.ts" --include="*.json"

# List files that need updating
grep -r "WordWise" /Users/yash/Downloads/Wordwise/wordwise-ai -l

# Use sed for bulk replacement (macOS)
sed -i '' 's/WordWise/ContentFlow/g' /path/to/file
```

### Test Build and Run

```bash
cd /Users/yash/Downloads/Wordwise/wordwise-ai

# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

---

## Testing Your Customizations

After making changes, test:

1. **Page Loads**: Visit `http://localhost:3000`
2. **Colors**: Verify new colors appear throughout
3. **Typography**: Check that fonts render correctly
4. **Responsiveness**: Test on mobile (F12 → Responsive mode)
5. **Dark Mode**: Test in both light and dark themes
6. **Components**: Test buttons, forms, dialogs
7. **Performance**: Check console for errors/warnings

---

## Next Steps

1. Copy specific examples from this guide
2. Make one change at a time
3. Test in development (`pnpm dev`)
4. Commit to git when change is verified
5. Move to next customization

Happy customizing! 🚀
