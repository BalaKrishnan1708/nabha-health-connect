"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Video, Phone } from "lucide-react"

interface Appointment {
  id: string
  patientName: string
  doctorName: string
  date: string
  time: string
  status: "scheduled" | "in-progress" | "completed"
  type: "video" | "phone"
}

export function VideoCallScheduler() {
  const [appointments] = useState<Appointment[]>([
    {
      id: "1",
      patientName: "Rajesh Kumar",
      doctorName: "Dr. Priya Sharma",
      date: "2024-01-15",
      time: "10:00 AM",
      status: "scheduled",
      type: "video",
    },
    {
      id: "2",
      patientName: "Sunita Devi",
      doctorName: "Dr. Amit Singh",
      date: "2024-01-15",
      time: "11:30 AM",
      status: "in-progress",
      type: "video",
    },
    {
      id: "3",
      patientName: "Harpreet Singh",
      doctorName: "Dr. Neha Gupta",
      date: "2024-01-15",
      time: "2:00 PM",
      status: "scheduled",
      type: "phone",
    },
  ])

  const startVideoCall = (appointmentId: string) => {
    window.open(`/video-call/${appointmentId}`, "_blank")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "in-progress":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="w-5 h-5" />
          Video Consultations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  {appointment.type === "video" ? (
                    <Video className="w-6 h-6 text-cyan-600" />
                  ) : (
                    <Phone className="w-6 h-6 text-indigo-600" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    {appointment.patientName} - {appointment.doctorName}
                  </h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {appointment.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {appointment.time}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={getStatusColor(appointment.status)}>{appointment.status.replace("-", " ")}</Badge>
                {appointment.status === "scheduled" && (
                  <Button
                    size="sm"
                    onClick={() => startVideoCall(appointment.id)}
                    className="bg-cyan-600 hover:bg-cyan-700"
                  >
                    Start Call
                  </Button>
                )}
                {appointment.status === "in-progress" && (
                  <Button
                    size="sm"
                    onClick={() => startVideoCall(appointment.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Join Call
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
