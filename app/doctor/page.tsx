"use client"

import { useAuth } from "@/hooks/use-auth"
import { DoctorDashboard } from "@/components/doctor/doctor-dashboard"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DoctorPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.userType !== "doctor")) {
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

  if (!user || user.userType !== "doctor") {
    return null
  }

  return <DoctorDashboard />
}
