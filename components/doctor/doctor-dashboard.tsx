"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AppointmentManagement } from "./appointment-management"
import { PatientRecords } from "./patient-records"
import { AvailabilitySchedule } from "./availability-schedule"
import { VideoConsultation } from "./video-consultation"
import { Calendar, Users, Clock, Video, Heart, User, LogOut, Bell, Activity, FileText } from "lucide-react"

export function DoctorDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  const todayAppointments = [
    {
      id: "1",
      patient: "Rajesh Singh",
      time: "10:00 AM",
      type: "Video Consultation",
      status: "confirmed",
      symptoms: "Headache and fever",
      duration: "30 min",
    },
    {
      id: "2",
      patient: "Priya Sharma",
      time: "11:30 AM",
      type: "Video Consultation",
      status: "confirmed",
      symptoms: "Follow-up checkup",
      duration: "20 min",
    },
    {
      id: "3",
      patient: "Amit Kumar",
      time: "2:00 PM",
      type: "Video Consultation",
      status: "pending",
      symptoms: "Chest pain",
      duration: "30 min",
    },
  ]

  const recentPatients = [
    {
      id: "1",
      name: "Rajesh Singh",
      lastVisit: "2024-01-10",
      condition: "Hypertension",
      status: "Stable",
    },
    {
      id: "2",
      name: "Priya Sharma",
      lastVisit: "2024-01-08",
      condition: "Diabetes",
      status: "Monitoring",
    },
    {
      id: "3",
      name: "Amit Kumar",
      lastVisit: "2024-01-05",
      condition: "Routine Checkup",
      status: "Healthy",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Nabha Health Connect</h1>
                <p className="text-sm text-muted-foreground">Doctor Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <div className="text-right">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.specialization}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Appointments
            </TabsTrigger>
            <TabsTrigger value="patients" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Patients
            </TabsTrigger>
            <TabsTrigger value="consultation" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Consultation
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Schedule
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Quick Stats */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todayAppointments.length}</div>
                  <p className="text-xs text-muted-foreground">Next: 10:00 AM</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">+12 this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Consultations</CardTitle>
                  <Video className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Rating</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.8</div>
                  <p className="text-xs text-muted-foreground">Based on reviews</p>
                </CardContent>
              </Card>
            </div>

            {/* Today's Schedule and Recent Patients */}
            <div className="grid gap-6 md:grid-cols-2 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Today's Appointments</CardTitle>
                  <CardDescription>Your scheduled consultations for today</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">{appointment.patient}</p>
                          <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                            {appointment.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{appointment.symptoms}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{appointment.time}</span>
                          <span>•</span>
                          <span>{appointment.duration}</span>
                          <Video className="h-3 w-3 ml-2" />
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Start Call
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => setActiveTab("appointments")}
                  >
                    View All Appointments
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Patients</CardTitle>
                  <CardDescription>Recently consulted patients</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentPatients.map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">{patient.condition}</p>
                        <p className="text-xs text-muted-foreground">Last visit: {patient.lastVisit}</p>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            patient.status === "Healthy"
                              ? "default"
                              : patient.status === "Stable"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {patient.status}
                        </Badge>
                        <Button size="sm" variant="ghost" className="mt-1">
                          <FileText className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent" onClick={() => setActiveTab("patients")}>
                    View All Patients
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="appointments">
            <AppointmentManagement />
          </TabsContent>

          <TabsContent value="patients">
            <PatientRecords />
          </TabsContent>

          <TabsContent value="consultation">
            <VideoConsultation />
          </TabsContent>

          <TabsContent value="schedule">
            <AvailabilitySchedule />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
