"use client"

import { useState } from "react"
import { AISuggestionPanel } from "@/components/editor/ai-suggestion-panel"
import { Card } from "@/components/ui/card"

/**
 * Example integration of the AI Suggestion Panel with an editor
 * This demonstrates how to use the panel in a real editor workflow
 */
export function EditorWithSuggestions() {
  const [content, setContent] = useState("")
  const [appliedCount, setAppliedCount] = useState(0)

  const handleApplySuggestion = (suggestion: any) => {
    // In a real editor, you would apply the suggestion to the editor state
    setAppliedCount((prev) => prev + 1)
    console.log("Applied suggestion:", suggestion)
    
    // Example: You could update the content here
    // Or trigger a more complex update in your editor
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="border-b bg-white dark:bg-slate-900 p-4">
        <h1 className="text-2xl font-bold text-foreground">
          LexivoAI Editor
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Write with AI-powered suggestions
        </p>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 h-[calc(100vh-100px)] overflow-hidden">
        {/* Editor Section */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <Card className="flex-1 flex flex-col p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Document</h2>
              <div className="text-xs text-muted-foreground">
                {content.length} characters • {content.split(/\s+/).filter(Boolean).length} words
              </div>
            </div>

            {/* Editor Textarea */}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start typing your content here... AI suggestions will appear on the right panel as you write."
              className="flex-1 p-4 bg-muted rounded border resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-slate-800"
            />

            {/* Stats Footer */}
            <div className="mt-3 pt-3 border-t flex items-center justify-between text-xs text-muted-foreground">
              <span>💡 Suggestions applied: {appliedCount}</span>
              <span>
                {content.length > 50
                  ? "✅ Good content length"
                  : "📝 Write more for better suggestions"}
              </span>
            </div>
          </Card>
        </div>

        {/* Suggestions Panel */}
        <div className="md:col-span-1 flex flex-col h-[calc(100vh-140px)] overflow-hidden">
          <AISuggestionPanel
            content={content}
            onApplySuggestion={handleApplySuggestion}
          />
        </div>
      </div>

      {/* Quick Tips */}
      <div className="fixed bottom-4 right-4 bg-primary/10 border border-primary/20 rounded-lg p-3 text-xs text-foreground max-w-xs">
        <p className="font-semibold mb-1">💡 Pro Tips:</p>
        <ul className="space-y-1 text-muted-foreground">
          <li>• Write at least 50 characters to get suggestions</li>
          <li>• Click "Apply" to implement suggestions</li>
          <li>• Use "Refresh" to regenerate suggestions</li>
          <li>• Copy suggestions to your clipboard</li>
        </ul>
      </div>
    </div>
  )
}
