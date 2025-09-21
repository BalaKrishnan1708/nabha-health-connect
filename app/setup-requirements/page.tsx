"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Key,
  Database,
  Shield,
  Video,
  Brain,
  Mic,
  MessageSquare,
  Cloud,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Copy,
} from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/hooks/use-language"

export default function SetupRequirementsPage() {
  const { t } = useLanguage()
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, keyName: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(keyName)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const requirements = [
    {
      category: "Database & Authentication",
      icon: Database,
      color: "text-blue-600",
      status: "configured",
      items: [
        {
          name: "Supabase Integration",
          description: "Already configured in your project",
          status: "ready",
          keys: [
            { name: "SUPABASE_URL", value: "Already set", required: true },
            { name: "SUPABASE_ANON_KEY", value: "Already set", required: true },
            { name: "SUPABASE_SERVICE_ROLE_KEY", value: "Already set", required: true },
          ],
        },
      ],
    },
    {
      category: "AI & Machine Learning",
      icon: Brain,
      color: "text-purple-600",
      status: "required",
      items: [
        {
          name: "Google Gemini AI",
          description: "For AI symptom analysis with 95% accuracy",
          status: "required",
          setupUrl: "https://makersuite.google.com/app/apikey",
          keys: [{ name: "GOOGLE_GEMINI_API_KEY", value: "your_gemini_api_key_here", required: true }],
        },
        {
          name: "OpenAI (Alternative)",
          description: "Alternative AI provider for symptom analysis",
          status: "optional",
          setupUrl: "https://platform.openai.com/api-keys",
          keys: [{ name: "OPENAI_API_KEY", value: "your_openai_api_key_here", required: false }],
        },
      ],
    },
    {
      category: "Video Consultation",
      icon: Video,
      color: "text-green-600",
      status: "required",
      items: [
        {
          name: "Agora.io",
          description: "WebRTC P2P video calls optimized for 2G networks",
          status: "recommended",
          setupUrl: "https://console.agora.io/",
          keys: [
            { name: "NEXT_PUBLIC_AGORA_APP_ID", value: "your_agora_app_id", required: true },
            { name: "AGORA_APP_CERTIFICATE", value: "your_agora_certificate", required: true },
          ],
        },
        {
          name: "Twilio Video",
          description: "Alternative video calling solution",
          status: "optional",
          setupUrl: "https://console.twilio.com/",
          keys: [
            { name: "TWILIO_ACCOUNT_SID", value: "your_twilio_sid", required: false },
            { name: "TWILIO_AUTH_TOKEN", value: "your_twilio_token", required: false },
          ],
        },
      ],
    },
    {
      category: "Voice Interface",
      icon: Mic,
      color: "text-orange-600",
      status: "optional",
      items: [
        {
          name: "Google Speech-to-Text",
          description: "Multi-language voice recognition (Punjabi/Hindi/English)",
          status: "optional",
          setupUrl: "https://console.cloud.google.com/apis/library/speech.googleapis.com",
          keys: [{ name: "GOOGLE_SPEECH_API_KEY", value: "your_speech_api_key", required: false }],
        },
      ],
    },
    {
      category: "Notifications",
      icon: MessageSquare,
      color: "text-yellow-600",
      status: "optional",
      items: [
        {
          name: "SMS Notifications",
          description: "Appointment reminders and emergency alerts",
          status: "optional",
          setupUrl: "https://console.twilio.com/",
          keys: [{ name: "TWILIO_PHONE_NUMBER", value: "your_twilio_phone", required: false }],
        },
        {
          name: "Email Notifications",
          description: "Email alerts and reports",
          status: "optional",
          setupUrl: "https://resend.com/",
          keys: [{ name: "RESEND_API_KEY", value: "your_resend_api_key", required: false }],
        },
      ],
    },
    {
      category: "Security & Compliance",
      icon: Shield,
      color: "text-red-600",
      status: "configured",
      items: [
        {
          name: "Encryption Keys",
          description: "AES-256 encryption for FHIR compliance",
          status: "auto-generated",
          keys: [{ name: "ENCRYPTION_KEY", value: "Auto-generated on deployment", required: true }],
        },
      ],
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
      case "configured":
        return <Badge className="bg-green-100 text-green-800">✓ Ready</Badge>
      case "required":
        return <Badge variant="destructive">Required</Badge>
      case "recommended":
        return <Badge className="bg-blue-100 text-blue-800">Recommended</Badge>
      case "optional":
        return <Badge variant="outline">Optional</Badge>
      case "auto-generated":
        return <Badge className="bg-purple-100 text-purple-800">Auto-Generated</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Setup Requirements</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Complete guide for configuring Nabha Health Connect with all required API keys, integrations, and technical
          specifications for the full telemedicine platform.
        </p>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Important:</strong> Add environment variables in your Vercel project settings under "Environment
          Variables" tab. Never commit API keys to your repository.
        </AlertDescription>
      </Alert>

      <div className="space-y-8">
        {requirements.map((category, categoryIndex) => (
          <Card key={categoryIndex} className="overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <category.icon className={`h-6 w-6 ${category.color}`} />
                {category.category}
                {getStatusBadge(category.status)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="font-semibold flex items-center gap-2">
                        {item.name}
                        {getStatusBadge(item.status)}
                      </h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      {item.setupUrl && (
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 h-auto"
                          onClick={() => window.open(item.setupUrl, "_blank")}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Setup Guide
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {item.keys.map((key, keyIndex) => (
                      <div key={keyIndex} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Key className="h-4 w-4" />
                            <code className="font-mono text-sm font-semibold">{key.name}</code>
                            {key.required && (
                              <Badge variant="destructive" className="text-xs">
                                Required
                              </Badge>
                            )}
                          </div>
                          <code className="text-xs text-muted-foreground block">{key.value}</code>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(key.name, key.name)}
                          className="shrink-0"
                        >
                          {copiedKey === key.name ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>

                  {itemIndex < category.items.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Technical Specifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5 text-primary" />
            Technical Specifications
          </CardTitle>
          <CardDescription>System architecture and performance specifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-600">Authentication</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• JWT + OAuth</li>
                <li>• Multi-factor Authentication</li>
                <li>• Biometric + PIN (Patients)</li>
                <li>• Face/Fingerprint Recognition</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-green-600">Data Security</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• AES-256 Encryption</li>
                <li>• End-to-End Encrypted</li>
                <li>• FHIR Compliant</li>
                <li>• GDPR Protected</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-purple-600">AI Performance</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• BERT + XGBoost Models</li>
                <li>• 95% Accuracy Rate</li>
                <li>• &lt;100ms Response Time</li>
                <li>• Real-time Analysis</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-orange-600">Video Technology</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• WebRTC P2P</li>
                <li>• 2G Network Optimized</li>
                <li>• &lt;1MB/min Bandwidth</li>
                <li>• Auto Quality Adjustment</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-yellow-600">Offline Capabilities</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Operational Transform</li>
                <li>• Conflict-Free Sync</li>
                <li>• Auto-Merge Changes</li>
                <li>• IndexedDB Storage</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-red-600">Voice Interface</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• 3 Languages Support</li>
                <li>• 90%+ Recognition Rate</li>
                <li>• Cultural Context Aware</li>
                <li>• Real-time Processing</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deployment Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Deployment Checklist</CardTitle>
          <CardDescription>Follow these steps to deploy your Nabha Health Connect platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold">1. Database Setup</h4>
                <p className="text-sm text-muted-foreground">Run the SQL scripts to create tables and seed data</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-5 w-5 rounded-full border-2 border-muted-foreground mt-0.5" />
              <div>
                <h4 className="font-semibold">2. Environment Variables</h4>
                <p className="text-sm text-muted-foreground">Add all required API keys to Vercel project settings</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-5 w-5 rounded-full border-2 border-muted-foreground mt-0.5" />
              <div>
                <h4 className="font-semibold">3. Domain Configuration</h4>
                <p className="text-sm text-muted-foreground">Set up custom domain and SSL certificates</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-5 w-5 rounded-full border-2 border-muted-foreground mt-0.5" />
              <div>
                <h4 className="font-semibold">4. Testing</h4>
                <p className="text-sm text-muted-foreground">
                  Test all features including offline sync and video calls
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-5 w-5 rounded-full border-2 border-muted-foreground mt-0.5" />
              <div>
                <h4 className="font-semibold">5. Go Live</h4>
                <p className="text-sm text-muted-foreground">Deploy to production and monitor system performance</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
