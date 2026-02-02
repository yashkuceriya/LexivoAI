# AI Suggestion Panel Feature

## Overview

The **AI Suggestion Panel** is a powerful new feature in LexivoAI that provides real-time writing improvements powered by OpenAI's GPT API. This panel intelligently analyzes your content as you write and suggests improvements across multiple dimensions.

## Features

### 1. **Multi-Dimensional Analysis**
The panel analyzes content across five categories:

- **Grammar** ✓ - Syntax and correctness issues
- **Tone** 💬 - How your content sounds and feels
- **Engagement** ⚡ - How compelling and interesting your content is
- **Clarity** 🔍 - How easy your content is to understand
- **Style** ✨ - Writing style and consistency

### 2. **Impact Ratings**
Each suggestion is rated by impact level:

- **High** (Red) - Critical improvements that significantly enhance content
- **Medium** (Yellow) - Important improvements that add value
- **Low** (Green) - Nice-to-have refinements

### 3. **Interactive Controls**
- **Apply** - Implement the suggestion in your content
- **Copy** - Copy the suggestion text to clipboard
- **Refresh** - Manually regenerate suggestions
- **Status Tracking** - See which suggestions you've applied

### 4. **Smart Filtering**
Suggestions are prioritized based on:
- Content length (minimal suggestions for short text)
- Content type (different suggestions for different content)
- Previously applied suggestions (no duplicate suggestions)

## Component Structure

### Main Component: `AISuggestionPanel`

**Location:** `/components/editor/ai-suggestion-panel.tsx`

```typescript
interface AISuggestionPanelProps {
  content: string              // The content to analyze
  onApplySuggestion?: (s: Suggestion) => void  // Callback when suggestion applied
  isLoading?: boolean          // Show loading state
}
```

**Usage Example:**

```tsx
import { AISuggestionPanel } from "@/components/editor/ai-suggestion-panel"

export function EditorPage() {
  const [content, setContent] = useState("")
  
  const handleApplySuggestion = (suggestion) => {
    // Apply the suggestion to your editor
    console.log("Applied:", suggestion)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="md:col-span-3">
        {/* Your editor here */}
      </div>
      <div>
        <AISuggestionPanel
          content={content}
          onApplySuggestion={handleApplySuggestion}
        />
      </div>
    </div>
  )
}
```

### Hook: `useAISuggestions`

**Location:** `/hooks/use-ai-suggestions.ts`

Provides programmatic access to the suggestion generation system.

```typescript
const {
  suggestions,              // Array of current suggestions
  loading,                  // Is API call in progress
  error,                    // Error object if any
  generateSuggestions,      // Function to trigger generation
  clearSuggestions,         // Function to clear suggestions
} = useAISuggestions({
  debounceMs: 500,          // Optional: debounce interval
  onError: (error) => {...} // Optional: error callback
})
```

**Usage Example:**

```tsx
import { useAISuggestions } from "@/hooks/use-ai-suggestions"

export function MyEditor() {
  const { suggestions, generateSuggestions, loading } = useAISuggestions()

  const handleContentChange = (newContent: string) => {
    generateSuggestions(newContent)
  }

  return (
    <>
      <textarea onChange={(e) => handleContentChange(e.target.value)} />
      {loading && <p>Analyzing...</p>}
      <ul>
        {suggestions.map(s => (
          <li key={s.id}>{s.title}: {s.suggestion}</li>
        ))}
      </ul>
    </>
  )
}
```

### API Route: `/api/generate-suggestions`

**Location:** `/app/api/generate-suggestions/route.ts`

**Method:** `POST`

**Request Body:**

```typescript
{
  content: string           // Required: The content to analyze
  context?: string          // Optional: Additional context
  type?: "all" | "grammar" | "tone" | "engagement" | "clarity" | "style"
}
```

**Response:**

```typescript
{
  suggestions: [
    {
      id: string                                           // Unique identifier
      type: "grammar" | "tone" | "engagement" | "clarity" | "style"
      title: string                                        // Short title
      description: string                                  // What's the issue
      suggestion: string                                   // How to fix it
      impact: "high" | "medium" | "low"                   // Impact level
    }
  ]
}
```

**Example Request:**

```bash
curl -X POST http://localhost:3000/api/generate-suggestions \
  -H "Content-Type: application/json" \
  -d '{
    "content": "The quick brown fox jumps over the lazy dog",
    "context": "Social media post",
    "type": "engagement"
  }'
```

## Configuration

### Environment Variables

Add to `.env.local`:

```env
# OpenAI API Configuration
OPENAI_API_KEY=sk_your_api_key_here

# Optional: Customize suggestion behavior
NEXT_PUBLIC_SUGGESTION_DEBOUNCE=500
NEXT_PUBLIC_MAX_SUGGESTIONS=5
```

### Get OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com)
2. Sign up or log in
3. Navigate to API keys section
4. Create a new API key
5. Copy and paste into `.env.local`

## Integration Examples

### 1. Integrate with Slide Editor

```tsx
// In your slide editor component
import { AISuggestionPanel } from "@/components/editor/ai-suggestion-panel"

export function SlideEditor() {
  const [slideContent, setSlideContent] = useState("")

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <textarea 
          value={slideContent}
          onChange={(e) => setSlideContent(e.target.value)}
          placeholder="Write your slide content..."
        />
      </div>
      <div className="w-80">
        <AISuggestionPanel content={slideContent} />
      </div>
    </div>
  )
}
```

### 2. Integrate with Document Editor

```tsx
// In document editor component
import { AISuggestionPanel } from "@/components/editor/ai-suggestion-panel"

export function DocumentEditor() {
  const [docContent, setDocContent] = useState("")

  const handleApply = (suggestion) => {
    // Apply suggestion to current paragraph or selection
    applyToDocument(suggestion)
  }

  return (
    <div className="grid grid-cols-4 gap-4 h-full">
      <div className="col-span-3">
        <RichTextEditor 
          value={docContent}
          onChange={setDocContent}
        />
      </div>
      <div>
        <AISuggestionPanel 
          content={docContent}
          onApplySuggestion={handleApply}
        />
      </div>
    </div>
  )
}
```

### 3. Custom Suggestion Handler

```tsx
function MyComponent() {
  const handleApplySuggestion = (suggestion) => {
    switch (suggestion.type) {
      case "grammar":
        correctGrammar(suggestion)
        break
      case "tone":
        adjustTone(suggestion)
        break
      case "engagement":
        enhanceEngagement(suggestion)
        break
      default:
        applyGeneric(suggestion)
    }
    
    toast.success(`Applied: ${suggestion.title}`)
    logAnalytics("suggestion_applied", { type: suggestion.type })
  }

  return (
    <AISuggestionPanel 
      content={editorContent}
      onApplySuggestion={handleApplySuggestion}
    />
  )
}
```

## Styling & Customization

### Dark Mode Support

The component automatically supports light and dark modes using Tailwind CSS:

```tsx
// Light mode (default)
- Primary color: Blue (#0085FF)
- Secondary colors: Dark blue tones
- Backgrounds: White/Light gray

// Dark mode (automatic with .dark class)
- Primary color: Light blue
- Secondary colors: Blue-tinted grays
- Backgrounds: Dark gray/Black
```

### Custom Styling

Override styles using Tailwind classes:

```tsx
<AISuggestionPanel 
  content={content}
  className="custom-class" // Add custom wrapper class
/>
```

### Component Variants

Create variations for different contexts:

```tsx
// Compact variant for sidebars
<AISuggestionPanel content={content} maxSuggestions={3} />

// Full variant for main view
<AISuggestionPanel 
  content={content} 
  showDescriptions={true}
  expandableCards={true}
/>
```

## Performance Optimization

### Debouncing

The hook includes optional debouncing to prevent excessive API calls:

```tsx
const { generateSuggestions } = useAISuggestions({ 
  debounceMs: 800 // Wait 800ms after user stops typing
})
```

### Caching

Suggestions are cached client-side to avoid regenerating for the same content:

```tsx
const [contentHash, setContentHash] = useState("")

const handleContentChange = (newContent: string) => {
  const hash = hashContent(newContent)
  if (hash !== contentHash) {
    setContentHash(hash)
    generateSuggestions(newContent)
  }
}
```

### Lazy Loading

Load the component only when needed:

```tsx
const AISuggestionPanel = dynamic(
  () => import("@/components/editor/ai-suggestion-panel"),
  { loading: () => <p>Loading...</p> }
)
```

## Error Handling

### API Errors

```tsx
const { error } = useAISuggestions({
  onError: (error) => {
    if (error.message.includes("API key")) {
      showError("OpenAI API key not configured")
    } else if (error.message.includes("quota")) {
      showError("API quota exceeded. Try again later.")
    } else {
      showError("Failed to generate suggestions")
    }
  }
})
```

### Fallback Behavior

The component gracefully degrades:

- No OpenAI key? → Shows empty state
- Network error? → Allows manual retry
- Invalid response? → Shows default suggestions
- Content empty? → Shows placeholder message

## Testing

### Unit Tests

```typescript
import { render, screen } from "@testing-library/react"
import { AISuggestionPanel } from "@/components/editor/ai-suggestion-panel"

describe("AISuggestionPanel", () => {
  it("renders placeholder when content is empty", () => {
    render(<AISuggestionPanel content="" />)
    expect(screen.getByText(/start writing/i)).toBeInTheDocument()
  })

  it("applies suggestion and shows confirmation", async () => {
    const handleApply = jest.fn()
    render(
      <AISuggestionPanel 
        content="Some content"
        onApplySuggestion={handleApply}
      />
    )
    
    const applyButton = screen.getByText("Apply")
    fireEvent.click(applyButton)
    
    expect(handleApply).toHaveBeenCalled()
  })
})
```

### E2E Tests

```typescript
describe("AI Suggestions", () => {
  it("generates suggestions when user types", () => {
    cy.visit("/editor")
    cy.get("textarea").type("This is my content")
    cy.get("[data-testid='suggestion-panel']").should("be.visible")
    cy.get("[data-testid='suggestion-item']").should("have.length.greaterThan", 0)
  })

  it("applies suggestion to document", () => {
    cy.get(".suggestion-apply-btn").first().click()
    cy.get(".toast-success").should("contain", "Applied")
  })
})
```

## Troubleshooting

### No suggestions appearing

**Causes:**
- OpenAI API key not set
- Content too short (< 10 characters)
- API rate limit exceeded

**Solutions:**
- Verify `OPENAI_API_KEY` in `.env.local`
- Write more content
- Wait and retry

### Suggestions not relevant

**Causes:**
- Missing context parameter
- Generic analysis without context
- AI model limitations

**Solutions:**
- Provide context: `generateSuggestions(content, "social media")`
- Filter by type: `type="engagement"`
- Manual review and refinement

### Performance issues

**Causes:**
- Too frequent API calls
- Large content blocks
- Slow network

**Solutions:**
- Increase debounce: `debounceMs: 1000`
- Split content into sections
- Consider caching results

## Future Enhancements

Planned improvements for the AI Suggestion Panel:

1. **Batch Processing** - Analyze multiple sections in parallel
2. **Custom Models** - Support for different AI models
3. **Learning** - Improve suggestions based on user feedback
4. **Offline Mode** - Local suggestion engine for better privacy
5. **Themes** - Different suggestion styles (creative, technical, formal)
6. **Integration** - Direct integration with spell checkers, style guides
7. **Analytics** - Track which suggestions are most helpful
8. **Collaboration** - Share suggestions with team members

## Contributing

Found a bug or have a feature request? 

- Create an issue on GitHub
- Submit a pull request with improvements
- Suggest new suggestion types or improvements

## Support

For issues or questions:

1. Check the troubleshooting section above
2. Review [OpenAI API Documentation](https://platform.openai.com/docs)
3. Check existing GitHub issues
4. Create a new issue with reproduction steps

---

**Last Updated:** 2024
**Version:** 1.0.0
**Status:** Production Ready ✅
