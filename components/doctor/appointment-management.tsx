"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Video, Search, CheckCircle, XCircle, Phone } from "lucide-react"

const mockAppointments = [
  {
    id: "1",
    patient: "Rajesh Singh",
    patientId: "P001",
    date: "2024-01-15",
    time: "10:00 AM",
    type: "Video Consultation",
    status: "confirmed",
    symptoms: "Headache and fever for 3 days",
    duration: "30 min",
    phone: "+91 9876543210",
    age: 45,
    gender: "Male",
  },
  {
    id: "2",
    patient: "Priya Sharma",
    patientId: "P002",
    date: "2024-01-15",
    time: "11:30 AM",
    type: "Video Consultation",
    status: "confirmed",
    symptoms: "Follow-up for diabetes management",
    duration: "20 min",
    phone: "+91 9876543211",
    age: 52,
    gender: "Female",
  },
  {
    id: "3",
    patient: "Amit Kumar",
    patientId: "P003",
    date: "2024-01-15",
    time: "2:00 PM",
    type: "Video Consultation",
    status: "pending",
    symptoms: "Chest pain and shortness of breath",
    duration: "30 min",
    phone: "+91 9876543212",
    age: 38,
    gender: "Male",
  },
  {
    id: "4",
    patient: "Sunita Devi",
    patientId: "P004",
    date: "2024-01-16",
    time: "9:00 AM",
    type: "Video Consultation",
    status: "confirmed",
    symptoms: "Joint pain and stiffness",
    duration: "25 min",
    phone: "+91 9876543213",
    age: 60,
    gender: "Female",
  },
  {
    id: "5",
    patient: "Harpreet Singh",
    patientId: "P005",
    date: "2024-01-16",
    time: "3:30 PM",
    type: "Video Consultation",
    status: "cancelled",
    symptoms: "Skin rash",
    duration: "20 min",
    phone: "+91 9876543214",
    age: 28,
    gender: "Male",
  },
]

export function AppointmentManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null)

  const filteredAppointments = mockAppointments.filter((appointment) => {
    const matchesSearch =
      appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.symptoms.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter
    const matchesDate = !selectedDate || appointment.date === selectedDate

    return matchesSearch && matchesStatus && matchesDate
  })

  const handleStatusChange = (appointmentId: string, newStatus: string) => {
    // Mock status update
    console.log(`Updating appointment ${appointmentId} to ${newStatus}`)
    alert(`Appointment status updated to ${newStatus}`)
  }

  const selectedAppointmentData = mockAppointments.find((apt) => apt.id === selectedAppointment)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Appointment Management</CardTitle>
          <CardDescription>Manage your patient appointments and consultations</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex items-center space-x-2 flex-1">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by patient name, ID, or symptoms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-40"
            />
          </div>

          <Tabs defaultValue="list" className="w-full">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <Card
                  key={appointment.id}
                  className={`cursor-pointer transition-colors ${
                    selectedAppointment === appointment.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedAppointment(selectedAppointment === appointment.id ? null : appointment.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{appointment.patient}</h4>
                          <Badge variant="outline">{appointment.patientId}</Badge>
                          <Badge
                            variant={
                              appointment.status === "confirmed"
                                ? "default"
                                : appointment.status === "pending"
                                  ? "secondary"
                                  : appointment.status === "cancelled"
                                    ? "destructive"
                                    : "outline"
                            }
                          >
                            {appointment.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{appointment.symptoms}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Video className="h-3 w-3" />
                            <span>{appointment.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {appointment.status === "confirmed" && (
                          <Button size="sm" variant="default">
                            Start Call
                          </Button>
                        )}
                        {appointment.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleStatusChange(appointment.id, "confirmed")
                              }}
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Confirm
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleStatusChange(appointment.id, "cancelled")
                              }}
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              Cancel
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    {selectedAppointment === appointment.id && (
                      <div className="mt-4 pt-4 border-t space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Patient Details:</span>
                            <p>Age: {appointment.age} years</p>
                            <p>Gender: {appointment.gender}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Phone className="h-3 w-3" />
                              <span>{appointment.phone}</span>
                            </div>
                          </div>
                          <div>
                            <span className="font-medium">Appointment Details:</span>
                            <p>Type: {appointment.type}</p>
                            <p>Duration: {appointment.duration}</p>
                            <p>Status: {appointment.status}</p>
                          </div>
                        </div>

                        <div>
                          <span className="font-medium text-sm">Symptoms Description:</span>
                          <p className="text-sm text-muted-foreground mt-1">{appointment.symptoms}</p>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View Patient History
                          </Button>
                          <Button size="sm" variant="outline">
                            Send Message
                          </Button>
                          <Button size="sm" variant="outline">
                            Reschedule
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {filteredAppointments.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Appointments Found</h3>
                    <p className="text-muted-foreground">
                      No appointments match your current filters. Try adjusting your search criteria.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="calendar" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Calendar View</CardTitle>
                  <CardDescription>View appointments in calendar format</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Calendar View</h3>
                    <p className="text-muted-foreground">
                      Calendar integration will be implemented with a calendar library for better appointment
                      visualization.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
