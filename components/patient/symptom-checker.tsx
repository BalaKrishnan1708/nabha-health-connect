"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, Bot, User, Info, Brain, Stethoscope, Calendar, FileText } from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  urgency?: "low" | "moderate" | "high"
  recommendations?: string[]
  followUp?: boolean
}

interface SymptomAnalysis {
  condition: string
  probability: number
  description: string
  recommendations: string[]
  urgency: "low" | "moderate" | "high"
  followUp: boolean
}

const enhancedMockResponses = [
  {
    symptoms: ["headache", "fever", "body ache", "fatigue"],
    analysis: {
      condition: "Viral Infection (Flu-like symptoms)",
      probability: 85,
      description: "Your symptoms suggest a common viral infection, possibly influenza or a similar respiratory virus.",
      recommendations: [
        "Rest and get plenty of sleep (8-10 hours)",
        "Stay well hydrated - drink water, herbal teas, clear broths",
        "Take paracetamol (500-1000mg every 6 hours) for fever and aches",
        "Use a humidifier or breathe steam from hot shower",
        "Avoid contact with others to prevent spread",
      ],
      urgency: "moderate" as const,
      followUp: true,
    },
  },
  {
    symptoms: ["chest pain", "shortness of breath", "dizziness"],
    analysis: {
      condition: "Potential Cardiac or Respiratory Emergency",
      probability: 95,
      description:
        "These symptoms require immediate medical evaluation as they may indicate serious heart or lung conditions.",
      recommendations: [
        "Seek emergency medical care IMMEDIATELY",
        "Call emergency services (108) if symptoms are severe",
        "Do not drive yourself to hospital",
        "Sit upright and try to stay calm",
        "Have someone stay with you until help arrives",
      ],
      urgency: "high" as const,
      followUp: false,
    },
  },
  {
    symptoms: ["cough", "sore throat", "runny nose", "sneezing"],
    analysis: {
      condition: "Upper Respiratory Tract Infection",
      probability: 80,
      description: "Your symptoms indicate a common cold or upper respiratory infection, likely viral in nature.",
      recommendations: [
        "Gargle with warm salt water (1/2 tsp salt in warm water)",
        "Drink warm liquids like tea with honey and lemon",
        "Use throat lozenges or hard candies",
        "Get adequate rest and sleep",
        "Consider over-the-counter decongestants if needed",
      ],
      urgency: "low" as const,
      followUp: false,
    },
  },
  {
    symptoms: ["stomach pain", "nausea", "vomiting", "diarrhea"],
    analysis: {
      condition: "Gastroenteritis (Stomach Bug)",
      probability: 75,
      description: "Your symptoms suggest gastroenteritis, commonly caused by viral or bacterial infection.",
      recommendations: [
        "Stay hydrated with small, frequent sips of water or ORS",
        "Follow BRAT diet (Bananas, Rice, Applesauce, Toast)",
        "Avoid dairy, fatty, or spicy foods temporarily",
        "Rest and avoid solid foods until vomiting stops",
        "Monitor for signs of dehydration",
      ],
      urgency: "moderate" as const,
      followUp: true,
    },
  },
]

export function SymptomChecker() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm your AI health assistant powered by advanced medical knowledge. I can help analyze your symptoms and provide preliminary guidance.\n\nPlease describe your symptoms in detail, including:\n• What you're experiencing\n• How long you've had these symptoms\n• Any factors that make them better or worse\n\nRemember: This is not a substitute for professional medical diagnosis.",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentAnalysis, setCurrentAnalysis] = useState<SymptomAnalysis | null>(null)

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    setTimeout(() => {
      const analysis = generateEnhancedResponse(inputMessage)
      setCurrentAnalysis(analysis)

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: formatAnalysisResponse(analysis),
        timestamp: new Date(),
        urgency: analysis.urgency,
        recommendations: analysis.recommendations,
        followUp: analysis.followUp,
      }

      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 3000) // Longer delay to simulate AI processing
  }

  const generateEnhancedResponse = (input: string): SymptomAnalysis => {
    const lowerInput = input.toLowerCase()

    // Find matching response based on keywords
    const matchedResponse = enhancedMockResponses.find((response) =>
      response.symptoms.some((symptom) => lowerInput.includes(symptom)),
    )

    if (matchedResponse) {
      return matchedResponse.analysis
    }

    // Default comprehensive response
    return {
      condition: "General Health Concern",
      probability: 60,
      description:
        "Based on your description, I recommend consulting with a healthcare professional for proper evaluation.",
      recommendations: [
        "Monitor your symptoms and note any changes",
        "Stay hydrated and get adequate rest",
        "Maintain a healthy diet",
        "Avoid self-medication without professional guidance",
        "Seek medical attention if symptoms worsen or persist",
      ],
      urgency: "low" as const,
      followUp: true,
    }
  }

  const formatAnalysisResponse = (analysis: SymptomAnalysis): string => {
    const urgencyEmoji = analysis.urgency === "high" ? "🚨" : analysis.urgency === "moderate" ? "⚠️" : "ℹ️"

    return `${urgencyEmoji} **Analysis Results**

**Possible Condition:** ${analysis.condition}
**Confidence Level:** ${analysis.probability}%

**Description:** ${analysis.description}

**Recommendations:**
${analysis.recommendations.map((rec) => `• ${rec}`).join("\n")}

${
  analysis.urgency === "high"
    ? "\n🚨 **URGENT**: Please seek immediate medical attention!"
    : analysis.followUp
      ? "\n📅 **Follow-up recommended**: Consider booking an appointment with a doctor if symptoms persist or worsen."
      : "\n✅ **Self-care**: These symptoms can typically be managed with home care, but consult a doctor if concerned."
}

---
*This analysis is for informational purposes only and should not replace professional medical advice.*`
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickSymptoms = [
    "I have a headache and feel feverish",
    "I'm experiencing chest pain and shortness of breath",
    "I have a persistent cough and sore throat",
    "I'm having stomach pain with nausea",
    "I feel dizzy and have been vomiting",
    "I have a skin rash that's spreading",
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-cyan-600" />
            AI-Powered Symptom Checker
          </CardTitle>
          <CardDescription>
            Advanced medical AI analysis for preliminary health guidance. Get instant insights based on your symptoms.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
            <Info className="h-4 w-4 text-blue-600" />
            <p className="text-sm text-blue-800">
              This AI tool uses medical knowledge databases to provide preliminary guidance. Always consult healthcare
              professionals for diagnosis and treatment.
            </p>
          </div>

          <div className="space-y-4">
            <ScrollArea className="h-96 w-full border rounded-lg p-4 bg-gray-50">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex gap-2 max-w-[85%] ${message.type === "user" ? "flex-row-reverse" : ""}`}>
                      <div className="flex-shrink-0">
                        {message.type === "bot" ? (
                          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-indigo-500 rounded-full flex items-center justify-center">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div
                        className={`p-3 rounded-lg shadow-sm ${
                          message.type === "user" ? "bg-cyan-600 text-white" : "bg-white text-gray-800 border"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                        <p className={`text-xs mt-2 ${message.type === "user" ? "text-cyan-100" : "text-gray-500"}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                        {message.urgency && (
                          <Badge
                            className={`mt-2 ${
                              message.urgency === "high"
                                ? "bg-red-100 text-red-800"
                                : message.urgency === "moderate"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {message.urgency.toUpperCase()} PRIORITY
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="flex gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-indigo-500 rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="p-3 rounded-lg bg-white border shadow-sm">
                        <div className="flex items-center gap-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">AI analyzing symptoms...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="space-y-3">
              <Textarea
                placeholder="Describe your symptoms in detail... (e.g., 'I've had a headache for 2 days, along with fever and body aches. The pain gets worse in bright light.')"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="min-h-[80px] resize-none"
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="w-full bg-cyan-600 hover:bg-cyan-700"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Analyze Symptoms
                  </>
                )}
              </Button>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">Quick examples - click to use:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {quickSymptoms.map((example) => (
                  <Badge
                    key={example}
                    variant="outline"
                    className="cursor-pointer hover:bg-cyan-50 hover:border-cyan-300 p-2 h-auto text-left justify-start"
                    onClick={() => setInputMessage(example)}
                  >
                    {example}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {currentAnalysis && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Stethoscope className="w-4 h-4" />
                Next Steps
              </h4>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" className="flex items-center gap-2 bg-transparent">
                  <Calendar className="w-4 h-4" />
                  Book Appointment
                </Button>
                <Button size="sm" variant="outline" className="flex items-center gap-2 bg-transparent">
                  <FileText className="w-4 h-4" />
                  Save Analysis
                </Button>
                <Button size="sm" variant="outline" className="flex items-center gap-2 bg-transparent">
                  <MessageSquare className="w-4 h-4" />
                  Ask Follow-up
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            When to Seek Immediate Medical Attention
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold text-red-600 mb-2">Emergency Symptoms</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Severe chest pain</li>
                <li>• Difficulty breathing</li>
                <li>• Severe allergic reactions</li>
                <li>• Loss of consciousness</li>
                <li>• Severe bleeding</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-orange-600 mb-2">Urgent Symptoms</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• High fever &gt;103°F</li>
                <li>• Persistent vomiting</li>
                <li>• Severe abdominal pain</li>
                <li>• Signs of dehydration</li>
                <li>• Worsening chronic conditions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
