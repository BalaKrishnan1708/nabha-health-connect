"use client"

import { useAuth } from "@/hooks/use-auth"
import { PharmacyDashboard } from "@/components/pharmacy/pharmacy-dashboard"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function PharmacyPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.userType !== "pharmacy")) {
      router.push("/")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user || user.userType !== "pharmacy") {
    return null
  }

  return <PharmacyDashboard />
}
