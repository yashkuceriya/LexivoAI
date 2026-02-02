import { useState, useCallback } from "react"
import { toast } from "sonner"

interface Suggestion {
  id: string
  type: "grammar" | "tone" | "engagement" | "clarity" | "style"
  title: string
  description: string
  suggestion: string
  impact: "high" | "medium" | "low"
}

interface UseAISuggestionsOptions {
  debounceMs?: number
  onError?: (error: Error) => void
}

export function useAISuggestions(options?: UseAISuggestionsOptions) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const generateSuggestions = useCallback(
    async (content: string, context?: string) => {
      if (!content || content.trim().length === 0) {
        setSuggestions([])
        return
      }

      setLoading(true)
      setError(null)

      try {
        const response = await fetch("/api/generate-suggestions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: content.trim(),
            context,
          }),
        })

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || "Failed to generate suggestions")
        }

        const data = await response.json()
        setSuggestions(data.suggestions || [])
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err))
        setError(error)
        options?.onError?.(error)
        console.error("Error generating suggestions:", error)
      } finally {
        setLoading(false)
      }
    },
    [options]
  )

  const clearSuggestions = useCallback(() => {
    setSuggestions([])
    setError(null)
  }, [])

  return {
    suggestions,
    loading,
    error,
    generateSuggestions,
    clearSuggestions,
  }
}
