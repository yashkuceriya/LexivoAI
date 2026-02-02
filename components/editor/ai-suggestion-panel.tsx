"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sparkles, Copy, ThumbsUp, ThumbsDown, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface Suggestion {
  id: string
  type: "grammar" | "tone" | "engagement" | "clarity" | "style"
  title: string
  description: string
  suggestion: string
  currentText?: string
  impact: "high" | "medium" | "low"
  isApplied?: boolean
}

interface AISuggestionPanelProps {
  content: string
  onApplySuggestion?: (suggestion: Suggestion) => void
  isLoading?: boolean
}

export function AISuggestionPanel({
  content,
  onApplySuggestion,
  isLoading = false,
}: AISuggestionPanelProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [loading, setLoading] = useState(isLoading)
  const [appliedSuggestions, setAppliedSuggestions] = useState<Set<string>>(
    new Set()
  )

  useEffect(() => {
    if (content && content.length > 0) {
      generateSuggestions(content)
    }
  }, [content])

  const generateSuggestions = async (text: string) => {
    setLoading(true)
    try {
      // Simulate AI suggestions - in production, call your API
      const mockSuggestions: Suggestion[] = [
        {
          id: "1",
          type: "engagement",
          title: "Add Power Words",
          description: "Your content could be more engaging",
          suggestion: "Try adding action verbs like 'transform', 'revolutionize', or 'elevate'",
          impact: "high",
        },
        {
          id: "2",
          type: "tone",
          title: "Adjust Tone",
          description: "Make it more conversational",
          suggestion:
            "Consider using contractions and shorter sentences to sound more friendly",
          impact: "medium",
        },
        {
          id: "3",
          type: "clarity",
          title: "Improve Clarity",
          description: "Simplify complex phrases",
          suggestion: "Replace 'utilize' with 'use' for better readability",
          impact: "medium",
        },
        {
          id: "4",
          type: "grammar",
          title: "Grammar Check",
          description: "No critical errors found",
          suggestion: "Your grammar looks good!",
          impact: "low",
        },
        {
          id: "5",
          type: "style",
          title: "Style Improvement",
          description: "Enhance your writing style",
          suggestion: "Consider varying sentence length for better rhythm",
          impact: "medium",
        },
      ]

      // Filter suggestions based on content length
      const filtered =
        text.length > 50
          ? mockSuggestions
          : mockSuggestions.slice(0, 2)

      setSuggestions(filtered)
    } catch (error) {
      console.error("Failed to generate suggestions:", error)
      toast.error("Failed to generate suggestions")
    } finally {
      setLoading(false)
    }
  }

  const applySuggestion = (suggestion: Suggestion) => {
    setAppliedSuggestions((prev) => new Set(prev).add(suggestion.id))
    onApplySuggestion?.(suggestion)
    toast.success(`Applied: ${suggestion.title}`)
  }

  const copySuggestion = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  }

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case "grammar":
        return "✓"
      case "tone":
        return "💬"
      case "engagement":
        return "⚡"
      case "clarity":
        return "🔍"
      case "style":
        return "✨"
      default:
        return "💡"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!content || content.length === 0) {
    return (
      <Card className="h-full border-l">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <CardTitle className="text-base">AI Suggestions</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-32 text-muted-foreground text-sm">
          <p>Start writing to get AI suggestions</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full border-l flex flex-col">
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <CardTitle className="text-base">AI Suggestions</CardTitle>
          </div>
          {loading && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {suggestions.length} suggestion{suggestions.length !== 1 ? "s" : ""}{" "}
          found
        </p>
      </CardHeader>

      <ScrollArea className="flex-1 p-3">
        <div className="space-y-3">
          {loading && suggestions.length === 0 ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
            </div>
          ) : suggestions.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground text-sm">
              <p>No suggestions available</p>
            </div>
          ) : (
            suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="group p-3 rounded-lg border hover:border-primary hover:bg-primary/5 transition-all"
              >
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-lg flex-shrink-0">
                    {getSuggestionIcon(suggestion.type)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{suggestion.title}</h4>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${getImpactColor(
                          suggestion.impact
                        )}`}
                      >
                        {suggestion.impact}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {suggestion.description}
                    </p>
                  </div>
                </div>

                <div className="mb-3 pl-6 py-2 bg-muted rounded text-sm">
                  <p className="text-foreground">{suggestion.suggestion}</p>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="default"
                    className="h-7 text-xs flex-1"
                    onClick={() => applySuggestion(suggestion)}
                    disabled={appliedSuggestions.has(suggestion.id)}
                  >
                    {appliedSuggestions.has(suggestion.id) ? (
                      <>✓ Applied</>
                    ) : (
                      <>Apply</>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 w-7 p-0"
                    onClick={() =>
                      copySuggestion(suggestion.suggestion)
                    }
                    title="Copy suggestion"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      <div className="border-t p-3 bg-muted/50">
        <Button
          size="sm"
          variant="outline"
          className="w-full text-xs h-8"
          onClick={() => generateSuggestions(content)}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-3 h-3 mr-1" />
              Refresh Suggestions
            </>
          )}
        </Button>
      </div>
    </Card>
  )
}
