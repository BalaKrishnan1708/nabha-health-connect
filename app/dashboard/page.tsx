"use client"

import { BiometricAuth } from "@/components/auth/biometric-auth"
import { VoiceInterface } from "@/components/voice/voice-interface"
import { AdvancedSync } from "@/components/offline/advanced-sync"
import { OfflineIndicator } from "@/components/offline/offline-indicator"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/hooks/use-language"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Calendar, FileText, Stethoscope, MapPin, Activity } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const user = { role: "patient" } // Example user object, replace with actual user data

  const handleVoiceCommand = (command: string, language: string) => {
    console.log(`[v0] Voice command received: ${command} in ${language}`)
    // Process voice commands here
    if (command.toLowerCase().includes("appointment")) {
      router.push("/appointments")
    } else if (command.toLowerCase().includes("symptom")) {
      router.push("/symptom-checker")
    }
  }

  const handleBiometricSuccess = (credential: any) => {
    console.log("[v0] Biometric authentication successful")
    // Handle successful biometric authentication
  }

  const handleBiometricError = (error: string) => {
    console.error("[v0] Biometric authentication error:", error)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <OfflineIndicator />

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("dashboard.welcome")}</h1>
        <div className="flex items-center gap-4">
          <AdvancedSync />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button
          variant="outline"
          className="h-20 flex-col gap-2 bg-transparent"
          onClick={() => router.push("/appointments")}
        >
          <Calendar className="h-6 w-6" />
          <span>{t("dashboard.appointments")}</span>
        </Button>

        <Button
          variant="outline"
          className="h-20 flex-col gap-2 bg-transparent"
          onClick={() => router.push("/records")}
        >
          <FileText className="h-6 w-6" />
          <span>{t("dashboard.healthRecords")}</span>
        </Button>

        <Button
          variant="outline"
          className="h-20 flex-col gap-2 bg-transparent"
          onClick={() => router.push("/symptom-checker")}
        >
          <Stethoscope className="h-6 w-6" />
          <span>{t("dashboard.symptomChecker")}</span>
        </Button>

        <Button
          variant="outline"
          className="h-20 flex-col gap-2 bg-transparent"
          onClick={() => router.push("/pharmacy")}
        >
          <MapPin className="h-6 w-6" />
          <span>{t("dashboard.pharmacyLocator")}</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Enhanced Security</CardTitle>
          </CardHeader>
          <CardContent>
            <BiometricAuth
              onSuccess={handleBiometricSuccess}
              onError={handleBiometricError}
              userType={(user?.role as "patient" | "doctor" | "pharmacy" | "admin") || "patient"}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Voice Assistant</CardTitle>
          </CardHeader>
          <CardContent>
            <VoiceInterface onCommand={handleVoiceCommand} supportedLanguages={["en-US", "pa-IN", "hi-IN"]} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-500" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Villages Connected</span>
              <span className="font-semibold text-blue-600">173</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>AI Accuracy</span>
              <span className="font-semibold text-green-600">95.2%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Response Time</span>
              <span className="font-semibold text-purple-600">&lt;100ms</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>System Uptime</span>
              <span className="font-semibold text-orange-600">99.8%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Technical Architecture Display */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            System Architecture Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-600">173 Villages Served</h4>
              <p className="text-muted-foreground">Offline-First Architecture</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-green-600">Video Consultation</h4>
              <p className="text-muted-foreground">WebRTC P2P • 2G Optimized • &lt;1MB/min</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-purple-600">AI Symptom Checker</h4>
              <p className="text-muted-foreground">BERT + XGBoost • 95% Accuracy • &lt;100ms</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-orange-600">Voice Interface</h4>
              <p className="text-muted-foreground">Punjabi/Hindi/English • 90%+ Recognition</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
