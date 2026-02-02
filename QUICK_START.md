# 🚀 LexivoAI Quick Start Guide

Welcome to **LexivoAI** - Your AI-powered content creation platform with intelligent writing suggestions!

## What's New? ✨

We've just added the **AI Suggestion Panel** - a powerful feature that provides real-time writing improvements as you type!

### Key Features:
- 🧠 AI-powered analysis using OpenAI GPT
- 💬 Multi-dimensional suggestions (grammar, tone, engagement, clarity, style)
- ⚡ Real-time feedback
- 🎨 Beautiful UI with dark mode support
- 📱 Fully responsive design

## ⚡ Quick Setup (5 minutes)

### Step 1: Get OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/account/api-keys)
2. Sign up or log in
3. Create a new API key
4. Copy the key (keep it secret!)

### Step 2: Configure Environment

Create `.env.local` in the project root:

```bash
# .env.local
OPENAI_API_KEY=sk_your_api_key_here
```

### Step 3: Install & Run

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Open http://localhost:3000
```

## 📖 Using AI Suggestions

### In Your Editor

```tsx
import { AISuggestionPanel } from "@/components/editor/ai-suggestion-panel"

export function MyEditor() {
  const [content, setContent] = useState("")

  return (
    <div className="grid grid-cols-4">
      <textarea 
        className="col-span-3"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write something..."
      />
      <AISuggestionPanel content={content} />
    </div>
  )
}
```

### Using the Hook

```tsx
import { useAISuggestions } from "@/hooks/use-ai-suggestions"

const { suggestions, loading } = useAISuggestions()

// Trigger analysis
useEffect(() => {
  generateSuggestions(content)
}, [content])
```

## 📂 Project Structure

```
wordwise-ai/
├── components/
│   └── editor/
│       ├── ai-suggestion-panel.tsx       ← Main component
│       └── editor-with-suggestions-example.tsx
├── app/
│   └── api/
│       └── generate-suggestions/
│           └── route.ts                  ← API endpoint
├── hooks/
│   └── use-ai-suggestions.ts             ← React hook
└── documents-prd/
    └── AI_SUGGESTION_PANEL_FEATURE.md    ← Full documentation
```

## 🎯 Core Components

### AISuggestionPanel Component

Props:
```typescript
interface AISuggestionPanelProps {
  content: string              // Text to analyze
  onApplySuggestion?: (s: Suggestion) => void
  isLoading?: boolean
}
```

Features:
- Real-time suggestions
- Click to apply or copy
- Impact rating badges
- Refresh button
- Empty state handling

### API Route

Endpoint: `POST /api/generate-suggestions`

Request:
```json
{
  "content": "Your text here",
  "context": "Optional context",
  "type": "all"
}
```

Response:
```json
{
  "suggestions": [
    {
      "id": "1",
      "type": "engagement",
      "title": "Add Power Words",
      "suggestion": "Use 'transform' instead of 'change'",
      "impact": "high"
    }
  ]
}
```

## 🎨 Customization

### Change Colors

Edit `app/globals.css`:

```css
:root {
  --primary: 217 100% 45%;      /* Change primary blue */
  --secondary: 217 32% 17%;     /* Change secondary color */
  /* ... more colors ... */
}
```

### Adjust Suggestion Count

In `api-suggestion-panel.tsx`:

```tsx
.slice(0, 5) // Change 5 to desired max
```

### Use Different AI Model

In `app/api/generate-suggestions/route.ts`:

```tsx
model: "gpt-4"  // Change from gpt-3.5-turbo
```

## 🧪 Testing

### With Example Component

View the example integration:
```tsx
import { EditorWithSuggestions } from "@/components/editor/editor-with-suggestions-example"

export default function Page() {
  return <EditorWithSuggestions />
}
```

### Manual Testing

1. Type some content (50+ characters)
2. Suggestions appear on the right
3. Click "Apply" to apply suggestion
4. Click "Copy" to copy to clipboard
5. Click "Refresh" to regenerate

## 🔍 Suggestion Types

| Type | Use Case | Example |
|------|----------|---------|
| **Grammar** | Fix errors | "Use 'its' not 'it's'" |
| **Tone** | Adjust voice | "Make more friendly" |
| **Engagement** | Add appeal | "Use power words" |
| **Clarity** | Improve readability | "Simplify sentence" |
| **Style** | Consistency | "Vary sentence length" |

## 📊 Impact Levels

- 🔴 **High**: Critical improvements
- 🟡 **Medium**: Important enhancements  
- 🟢 **Low**: Nice-to-have refinements

## ⚙️ Configuration

### Environment Variables

```env
# Required
OPENAI_API_KEY=sk_your_key

# Optional
NEXT_PUBLIC_SUGGESTION_DEBOUNCE=500    # ms between API calls
NEXT_PUBLIC_MAX_SUGGESTIONS=5          # Max suggestions shown
```

### Feature Flags

Enable/disable suggestions:
```tsx
const ENABLE_AI_SUGGESTIONS = process.env.NEXT_PUBLIC_ENABLE_AI === "true"
```

## 🛠️ Troubleshooting

### "No suggestions appearing"

**Solution:**
- Check `.env.local` has `OPENAI_API_KEY`
- Content must be 50+ characters
- Check browser console for errors

### "API Error"

**Solution:**
- Verify API key is valid
- Check API quota on OpenAI dashboard
- Ensure CORS is configured

### "Suggestions not relevant"

**Solution:**
- Add context parameter
- Try different content
- Check API model being used

## 📚 Documentation

For detailed information:
- [AI Suggestion Panel Feature Docs](./documents-prd/AI_SUGGESTION_PANEL_FEATURE.md)
- [Implementation Summary](./LEXIVOAI_FEATURE_SUMMARY.md)
- [Full Project Analysis](./docs-prd/)

## 🚢 Deployment

### Vercel

1. Push to GitHub
2. Connect Vercel to repo
3. Add `OPENAI_API_KEY` to environment variables
4. Deploy!

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

## 📈 Next Steps

1. ✅ Set up OpenAI API key
2. ✅ Run the development server
3. ✅ Test AI suggestions
4. ✅ Integrate into your editors
5. ✅ Customize colors/styling
6. ✅ Deploy to production

## 💡 Tips

- **Debounce API calls** to avoid rate limiting
- **Cache suggestions** for better performance
- **Validate API key** before using
- **Monitor API usage** for costs
- **Test with various content** lengths

## 🐛 Issues?

1. Check the [troubleshooting guide](./documents-prd/AI_SUGGESTION_PANEL_FEATURE.md#troubleshooting)
2. Review [OpenAI API docs](https://platform.openai.com/docs)
3. Check browser console for errors
4. Try with fresh OpenAI API key

## 📞 Support

Need help?
- Check documentation files
- Review code comments
- Check git history for changes
- Run tests to validate setup

## 🎉 You're All Set!

Your LexivoAI project is ready to use. Start typing to see AI suggestions in action!

---

**Version:** 1.0.0
**Last Updated:** 2024
**Status:** Production Ready ✅

Happy writing! 🚀
