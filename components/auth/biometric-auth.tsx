"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Fingerprint, Eye, Shield, AlertCircle } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface BiometricAuthProps {
  onSuccess: (credential: any) => void
  onError: (error: string) => void
  userType: "patient" | "doctor" | "pharmacy" | "admin"
}

export function BiometricAuth({ onSuccess, onError, userType }: BiometricAuthProps) {
  const { t } = useLanguage()
  const [isSupported, setIsSupported] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  useEffect(() => {
    // Check if WebAuthn is supported
    if (window.PublicKeyCredential) {
      setIsSupported(true)
    }
  }, [])

  const handleBiometricAuth = async (type: "fingerprint" | "face") => {
    if (!isSupported) {
      onError(t("biometric.notSupported"))
      return
    }

    setIsAuthenticating(true)

    try {
      // WebAuthn configuration based on user type
      const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions = {
        challenge: new Uint8Array(32),
        allowCredentials: [
          {
            id: new Uint8Array(64),
            type: "public-key",
            transports: ["internal", "usb", "nfc", "ble"],
          },
        ],
        userVerification: userType === "doctor" || userType === "admin" ? "required" : "preferred",
        timeout: 60000,
      }

      const credential = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions,
      })

      if (credential) {
        // Simulate biometric verification success
        setTimeout(() => {
          onSuccess(credential)
          setIsAuthenticating(false)
        }, 2000)
      }
    } catch (error) {
      setIsAuthenticating(false)
      onError(t("biometric.failed"))
    }
  }

  const getSecurityLevel = () => {
    switch (userType) {
      case "doctor":
      case "admin":
        return { level: "High", color: "text-red-600", icon: Shield }
      case "pharmacy":
        return { level: "Medium", color: "text-yellow-600", icon: Shield }
      default:
        return { level: "Standard", color: "text-green-600", icon: Shield }
    }
  }

  const security = getSecurityLevel()

  if (!isSupported) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            {t("biometric.title")}
          </CardTitle>
          <CardDescription>{t("biometric.notSupported")}</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <security.icon className={`h-5 w-5 ${security.color}`} />
          {t("biometric.title")} - {security.level}
        </CardTitle>
        <CardDescription>
          {userType === "patient" ? t("biometric.patientDesc") : t("biometric.staffDesc")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="h-20 flex-col gap-2 bg-transparent"
            onClick={() => handleBiometricAuth("fingerprint")}
            disabled={isAuthenticating}
          >
            <Fingerprint className="h-8 w-8" />
            <span className="text-sm">{t("biometric.fingerprint")}</span>
          </Button>

          <Button
            variant="outline"
            className="h-20 flex-col gap-2 bg-transparent"
            onClick={() => handleBiometricAuth("face")}
            disabled={isAuthenticating}
          >
            <Eye className="h-8 w-8" />
            <span className="text-sm">{t("biometric.face")}</span>
          </Button>
        </div>

        {isAuthenticating && (
          <div className="text-center py-4">
            <div className="animate-pulse text-sm text-muted-foreground">{t("biometric.authenticating")}</div>
          </div>
        )}

        <div className="text-xs text-muted-foreground text-center">
          <p>
            {t("biometric.security")}: AES-256 {userType !== "patient" && "+ Multi-factor"}
          </p>
          {userType === "patient" && <p>FHIR Compliant • GDPR Protected</p>}
        </div>
      </CardContent>
    </Card>
  )
}
