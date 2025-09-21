"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AppointmentBooking } from "./appointment-booking"
import { HealthRecords } from "./health-records"
import { SymptomChecker } from "./symptom-checker"
import { PharmacyLocator } from "./pharmacy-locator"
import { Calendar, FileText, MessageSquare, MapPin, Heart, Clock, User, LogOut, Bell, Activity } from "lucide-react"

export function PatientDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  const upcomingAppointments = [
    {
      id: "1",
      doctor: "Dr. Rajesh Kumar",
      specialization: "General Medicine",
      date: "2024-01-15",
      time: "10:00 AM",
      type: "Video Consultation",
      status: "confirmed",
    },
    {
      id: "2",
      doctor: "Dr. Priya Sharma",
      specialization: "Cardiology",
      date: "2024-01-20",
      time: "2:30 PM",
      type: "Video Consultation",
      status: "pending",
    },
  ]

  const recentRecords = [
    {
      id: "1",
      date: "2024-01-10",
      doctor: "Dr. Rajesh Kumar",
      diagnosis: "Hypertension",
      prescription: "Amlodipine 5mg",
    },
    {
      id: "2",
      date: "2024-01-05",
      doctor: "Dr. Priya Sharma",
      diagnosis: "Routine Checkup",
      prescription: "Multivitamins",
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
                <p className="text-sm text-muted-foreground">Patient Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">{user?.name}</span>
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
            <TabsTrigger value="records" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Health Records
            </TabsTrigger>
            <TabsTrigger value="symptoms" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Symptom Checker
            </TabsTrigger>
            <TabsTrigger value="pharmacy" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Pharmacy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Quick Stats */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
                  <p className="text-xs text-muted-foreground">Next: Jan 15, 10:00 AM</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Health Records</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{recentRecords.length}</div>
                  <p className="text-xs text-muted-foreground">Last updated: Jan 10</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Health Status</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">Good</div>
                  <p className="text-xs text-muted-foreground">Based on recent checkup</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid gap-6 md:grid-cols-2 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled consultations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{appointment.doctor}</p>
                        <p className="text-sm text-muted-foreground">{appointment.specialization}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3" />
                          <span className="text-xs">
                            {appointment.date} at {appointment.time}
                          </span>
                        </div>
                      </div>
                      <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                        {appointment.status}
                      </Badge>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => setActiveTab("appointments")}
                  >
                    Book New Appointment
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Health Records</CardTitle>
                  <CardDescription>Your latest medical history</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentRecords.map((record) => (
                    <div key={record.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-medium">{record.diagnosis}</p>
                        <span className="text-xs text-muted-foreground">{record.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">Dr. {record.doctor}</p>
                      <p className="text-sm">Prescription: {record.prescription}</p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent" onClick={() => setActiveTab("records")}>
                    View All Records
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="appointments">
            <AppointmentBooking />
          </TabsContent>

          <TabsContent value="records">
            <HealthRecords />
          </TabsContent>

          <TabsContent value="symptoms">
            <SymptomChecker />
          </TabsContent>

          <TabsContent value="pharmacy">
            <PharmacyLocator />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
