"use client"

import { VideoCallRoom } from "@/components/video/video-call-room"
import { useParams } from "next/navigation"

export default function VideoCallPage() {
  const params = useParams()
  const appointmentId = params.appointmentId as string

  // In a real app, you'd fetch appointment details based on the ID
  const mockAppointment = {
    patientName: "Rajesh Kumar",
    doctorName: "Dr. Priya Sharma",
    userRole: "patient" as const, // This would come from auth context
  }

  return (
    <VideoCallRoom
      appointmentId={appointmentId}
      patientName={mockAppointment.patientName}
      doctorName={mockAppointment.doctorName}
      userRole={mockAppointment.userRole}
    />
  )
}
