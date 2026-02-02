import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

interface SuggestionRequest {
  content: string
  context?: string
  type?: "all" | "grammar" | "tone" | "engagement" | "clarity" | "style"
}

interface AIsuggestion {
  id: string
  type: "grammar" | "tone" | "engagement" | "clarity" | "style"
  title: string
  description: string
  suggestion: string
  impact: "high" | "medium" | "low"
}

export async function POST(request: NextRequest) {
  try {
    const body: SuggestionRequest = await request.json()

    if (!body.content || body.content.trim().length === 0) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      )
    }

    // Get OpenAI API key from environment
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      )
    }

    const prompt = buildPrompt(body.content, body.context, body.type)

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are an expert writing coach and content improvement specialist. 
            Provide specific, actionable suggestions to improve writing quality. 
            Always respond with valid JSON array of suggestions.`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error("OpenAI API error:", error)
      return NextResponse.json(
        { error: "Failed to generate suggestions" },
        { status: 500 }
      )
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content

    if (!content) {
      return NextResponse.json(
        { error: "No suggestions generated" },
        { status: 500 }
      )
    }

    // Parse the AI response
    const suggestions = parseSuggestions(content)

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

function buildPrompt(
  content: string,
  context?: string,
  type?: string
): string {
  const typeFilter = type && type !== "all" ? `Focus on ${type} improvements.` : ""

  return `Analyze the following content and provide improvement suggestions in JSON format.

Content to analyze:
"${content}"

${context ? `Context: ${context}` : ""}

${typeFilter}

Return a JSON array with the following structure (max 5 suggestions):
[
  {
    "id": "1",
    "type": "grammar|tone|engagement|clarity|style",
    "title": "Brief title",
    "description": "What's the issue",
    "suggestion": "How to improve it",
    "impact": "high|medium|low"
  }
]

Requirements:
- Each suggestion must be actionable and specific
- Type must be one of: grammar, tone, engagement, clarity, style
- Title should be concise (max 5 words)
- Suggestion should explain how to improve (max 100 words)
- Impact: high (critical), medium (important), low (nice to have)
- Only return valid JSON array, no other text`
}

function parseSuggestions(content: string): AIsuggestion[] {
  try {
    // Extract JSON from the response (it might have extra text)
    const jsonMatch = content.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      console.warn("No JSON array found in response")
      return getDefaultSuggestions()
    }

    const parsed = JSON.parse(jsonMatch[0])

    if (!Array.isArray(parsed)) {
      console.warn("Response is not an array")
      return getDefaultSuggestions()
    }

    // Validate and sanitize suggestions
    return parsed
      .map((item, index) => ({
        id: item.id || String(index + 1),
        type: validateType(item.type),
        title: String(item.title || "Suggestion").substring(0, 50),
        description: String(item.description || "").substring(0, 100),
        suggestion: String(item.suggestion || "").substring(0, 200),
        impact: validateImpact(item.impact),
      }))
      .filter(
        (s) =>
          s.type && s.title && s.suggestion && s.description && s.impact
      )
      .slice(0, 5) // Max 5 suggestions
  } catch (error) {
    console.error("Error parsing suggestions:", error)
    return getDefaultSuggestions()
  }
}

function validateType(
  type: string
): "grammar" | "tone" | "engagement" | "clarity" | "style" {
  const validTypes = ["grammar", "tone", "engagement", "clarity", "style"]
  return validTypes.includes(type?.toLowerCase()) 
    ? (type.toLowerCase() as any)
    : "clarity"
}

function validateImpact(impact: string): "high" | "medium" | "low" {
  const validImpacts = ["high", "medium", "low"]
  return validImpacts.includes(impact?.toLowerCase()) 
    ? (impact.toLowerCase() as any)
    : "medium"
}

function getDefaultSuggestions(): AIsuggestion[] {
  return [
    {
      id: "1",
      type: "clarity",
      title: "Content Received",
      description: "Ready for analysis",
      suggestion:
        "Your content has been received. Enable OpenAI API key for intelligent suggestions.",
      impact: "low",
    },
  ]
}
