import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/hooks/use-auth"
import { LanguageProvider } from "@/hooks/use-language"
import { ServiceWorkerSetup } from "@/components/offline/service-worker-setup"
import { OfflineIndicator } from "@/components/offline/offline-indicator"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Nabha Health Connect",
  description: "Telemedicine platform for rural healthcare",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <LanguageProvider>
            <AuthProvider>
              <ServiceWorkerSetup />
              <OfflineIndicator />
              {children}
            </AuthProvider>
          </LanguageProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
