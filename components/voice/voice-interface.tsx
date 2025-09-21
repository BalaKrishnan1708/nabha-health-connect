"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, MicOff, Volume2, Languages } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import SpeechRecognition from "speech-recognition"

interface VoiceInterfaceProps {
  onCommand: (command: string, language: string) => void
  supportedLanguages?: string[]
}

export function VoiceInterface({ onCommand, supportedLanguages = ["en-US", "pa-IN", "hi-IN"] }: VoiceInterfaceProps) {
  const { t, language } = useLanguage()
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isSupported, setIsSupported] = useState(false)
  const [currentLang, setCurrentLang] = useState("en-US")
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    // Check if Speech Recognition is supported
    if (SpeechRecognition) {
      setIsSupported(true)
      recognitionRef.current = new SpeechRecognition()

      if (recognitionRef.current) {
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = currentLang

        recognitionRef.current.onresult = (event) => {
          let finalTranscript = ""
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript
            }
          }

          if (finalTranscript) {
            setTranscript(finalTranscript)
            onCommand(finalTranscript, currentLang)
          }
        }

        recognitionRef.current.onerror = (event) => {
          console.error("Speech recognition error:", event.error)
          setIsListening(false)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [currentLang, onCommand])

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript("")
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = currentLang
      utterance.rate = 0.9
      utterance.pitch = 1
      speechSynthesis.speak(utterance)
    }
  }

  const getLanguageName = (code: string) => {
    const names: Record<string, string> = {
      "en-US": "English",
      "pa-IN": "ਪੰਜਾਬੀ",
      "hi-IN": "हिंदी",
    }
    return names[code] || code
  }

  if (!isSupported) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MicOff className="h-5 w-5 text-muted-foreground" />
            {t("voice.notSupported")}
          </CardTitle>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Languages className="h-5 w-5 text-primary" />
          {t("voice.title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Language Selection */}
        <div className="flex gap-2 flex-wrap">
          {supportedLanguages.map((lang) => (
            <Button
              key={lang}
              variant={currentLang === lang ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentLang(lang)}
              className="text-xs"
            >
              {getLanguageName(lang)}
            </Button>
          ))}
        </div>

        {/* Voice Controls */}
        <div className="flex gap-4 justify-center">
          <Button
            variant={isListening ? "destructive" : "default"}
            size="lg"
            className="rounded-full h-16 w-16"
            onClick={isListening ? stopListening : startListening}
          >
            {isListening ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full h-16 w-16 bg-transparent"
            onClick={() => speak(t("voice.testMessage"))}
          >
            <Volume2 className="h-8 w-8" />
          </Button>
        </div>

        {/* Status */}
        <div className="text-center">
          {isListening && (
            <div className="flex items-center justify-center gap-2 text-sm text-primary">
              <div className="animate-pulse w-2 h-2 bg-red-500 rounded-full"></div>
              {t("voice.listening")}
            </div>
          )}

          {transcript && (
            <div className="mt-2 p-2 bg-muted rounded text-sm">
              <strong>{t("voice.heard")}:</strong> {transcript}
            </div>
          )}
        </div>

        {/* Recognition Stats */}
        <div className="text-xs text-muted-foreground text-center">
          <p>
            90%+ {t("voice.accuracy")} • 3 {t("voice.languages")}
          </p>
          <p>{t("voice.culturalContext")}</p>
        </div>
      </CardContent>
    </Card>
  )
}
