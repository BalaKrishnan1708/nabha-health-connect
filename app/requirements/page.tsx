import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function RequirementsPage() {
  const requirements = [
    {
      category: "Database & Authentication",
      items: [
        {
          name: "Supabase Project",
          status: "configured",
          description: "Database and authentication service",
          setup: "Already configured in your v0 project settings",
        },
      ],
    },
    {
      category: "Video Consultation (Optional)",
      items: [
        {
          name: "Agora.io API Key",
          status: "needed",
          description: "For high-quality video consultations",
          envVar: "NEXT_PUBLIC_AGORA_APP_ID",
          setup: "1. Sign up at agora.io\n2. Create a new project\n3. Copy App ID to environment variables",
        },
        {
          name: "Twilio Video API (Alternative)",
          status: "needed",
          description: "Alternative video service",
          envVar: "TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN",
          setup: "1. Sign up at twilio.com\n2. Get Account SID and Auth Token\n3. Add to environment variables",
        },
      ],
    },
    {
      category: "AI Symptom Checker",
      items: [
        {
          name: "Google Gemini API Key",
          status: "needed",
          description: "For AI-powered symptom analysis",
          envVar: "GOOGLE_GEMINI_API_KEY",
          setup: "1. Go to Google AI Studio (ai.google.dev)\n2. Create API key\n3. Add to environment variables",
        },
        {
          name: "OpenAI API Key (Alternative)",
          status: "needed",
          description: "Alternative AI service",
          envVar: "OPENAI_API_KEY",
          setup: "1. Sign up at openai.com\n2. Generate API key\n3. Add to environment variables",
        },
      ],
    },
    {
      category: "SMS Notifications (Optional)",
      items: [
        {
          name: "Twilio SMS",
          status: "needed",
          description: "For appointment reminders",
          envVar: "TWILIO_PHONE_NUMBER",
          setup: "1. Get Twilio phone number\n2. Add to environment variables",
        },
      ],
    },
    {
      category: "Email Service (Optional)",
      items: [
        {
          name: "Resend API Key",
          status: "needed",
          description: "For email notifications",
          envVar: "RESEND_API_KEY",
          setup: "1. Sign up at resend.com\n2. Generate API key\n3. Add to environment variables",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Nabha Health Connect - Setup Requirements</h1>
          <p className="text-muted-foreground">
            Complete setup guide for all integrations and API keys needed for full functionality.
          </p>
        </div>

        <div className="grid gap-6">
          {requirements.map((category, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {category.category}
                  <Badge variant="outline">
                    {category.items.filter((item) => item.status === "configured").length} / {category.items.length}{" "}
                    configured
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {item.status === "configured" ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-yellow-500" />
                          )}
                          <h3 className="font-semibold">{item.name}</h3>
                          <Badge variant={item.status === "configured" ? "default" : "secondary"}>
                            {item.status === "configured" ? "Ready" : "Setup Needed"}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">{item.description}</p>

                      {item.envVar && (
                        <div className="bg-muted p-2 rounded text-sm font-mono mb-2">
                          Environment Variable: {item.envVar}
                        </div>
                      )}

                      {item.setup && (
                        <div className="text-sm">
                          <p className="font-medium mb-1">Setup Instructions:</p>
                          <pre className="whitespace-pre-wrap text-muted-foreground">{item.setup}</pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How to Add Environment Variables</CardTitle>
            <CardDescription>Follow these steps to add the required API keys to your project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold mb-2">For v0 Development:</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Click the gear icon (⚙️) in the top right of v0</li>
                  <li>Select "Environment Variables"</li>
                  <li>Add each required key-value pair</li>
                  <li>Save and restart your preview</li>
                </ol>
              </div>

              <div className="border-l-4 border-secondary pl-4">
                <h3 className="font-semibold mb-2">For Production Deployment:</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Go to your Vercel dashboard</li>
                  <li>Select your project</li>
                  <li>Go to Settings → Environment Variables</li>
                  <li>Add each key-value pair</li>
                  <li>Redeploy your application</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Button asChild>
            <a href="/" className="inline-flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Back to Application
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
