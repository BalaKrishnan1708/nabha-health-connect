"use client"

import { useState } from "react"

interface SymptomAnalysisRequest {
  symptoms: string
  age?: number
  gender?: string
  medicalHistory?: string[]
}

interface SymptomAnalysisResponse {
  condition: string
  probability: number
  description: string
  recommendations: string[]
  urgency: "low" | "moderate" | "high"
  followUp: boolean
  disclaimer: string
}

export function useSymptomAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const analyzeSymptoms = async (request: SymptomAnalysisRequest): Promise<SymptomAnalysisResponse | null> => {
    setIsAnalyzing(true)
    setError(null)

    try {
      // In a real implementation, this would call an AI service like OpenAI, Groq, or a medical AI API
      const response = await fetch("/api/analyze-symptoms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze symptoms")
      }

      const result = await response.json()
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      return null
    } finally {
      setIsAnalyzing(false)
    }
  }

  return {
    analyzeSymptoms,
    isAnalyzing,
    error,
  }
}

// Mock API endpoint structure for reference
export const mockAnalysisEndpoint = {
  endpoint: "/api/analyze-symptoms",
  method: "POST",
  requestBody: {
    symptoms: "string - detailed symptom description",
    age: "number - optional patient age",
    gender: "string - optional patient gender",
    medicalHistory: "string[] - optional relevant medical history",
  },
  responseBody: {
    condition: "string - most likely condition",
    probability: "number - confidence percentage",
    description: "string - detailed explanation",
    recommendations: "string[] - actionable advice",
    urgency: "low | moderate | high",
    followUp: "boolean - whether follow-up is recommended",
    disclaimer: "string - medical disclaimer",
  },
}
