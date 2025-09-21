"use client"

import { Calendar } from "@/components/ui/calendar"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Camera,
  Monitor,
  MessageSquare,
  FileText,
  Clock,
  User,
} from "lucide-react"

const activeConsultations = [
  {
    id: "1",
    patient: "Rajesh Singh",
    patientId: "P001",
    time: "10:00 AM",
    duration: "15 min",
    symptoms: "Headache and fever",
    status: "waiting",
  },
  {
    id: "2",
    patient: "Priya Sharma",
    patientId: "P002",
    time: "11:30 AM",
    duration: "20 min",
    symptoms: "Follow-up checkup",
    status: "ready",
  },
]

export function VideoConsultation() {
  const [isInCall, setIsInCall] = useState(false)
  const [currentPatient, setCurrentPatient] = useState<any>(null)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [consultationNotes, setConsultationNotes] = useState("")
  const [prescription, setPrescription] = useState("")

  const startConsultation = (patient: any) => {
    setCurrentPatient(patient)
    setIsInCall(true)
  }

  const endConsultation = () => {
    setIsInCall(false)
    setCurrentPatient(null)
    setConsultationNotes("")
    setPrescription("")
    alert("Consultation ended. Notes and prescription saved.")
  }

  const saveConsultationData = () => {
    // Mock save functionality
    console.log("Saving consultation data:", {
      patient: currentPatient,
      notes: consultationNotes,
      prescription: prescription,
    })
    alert("Consultation data saved successfully!")
  }

  if (isInCall && currentPatient) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Video Consultation</CardTitle>
                <CardDescription>
                  {currentPatient.patient} ({currentPatient.patientId})
                </CardDescription>
              </div>
              <Badge variant="default">Live</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Video Call Area */}
              <div className="lg:col-span-2">
                <div className="relative bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
                  {/* Mock video call interface */}
                  <div className="text-white text-center">
                    <User className="h-24 w-24 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-semibold">{currentPatient.patient}</p>
                    <p className="text-sm opacity-75">Connected</p>
                  </div>

                  {/* Doctor's video (small overlay) */}
                  <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 rounded-lg flex items-center justify-center">
                    <User className="h-8 w-8 text-white opacity-50" />
                  </div>

                  {/* Call controls */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    <Button
                      size="sm"
                      variant={isVideoOn ? "default" : "destructive"}
                      onClick={() => setIsVideoOn(!isVideoOn)}
                    >
                      {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant={isAudioOn ? "default" : "destructive"}
                      onClick={() => setIsAudioOn(!isAudioOn)}
                    >
                      {isAudioOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Monitor className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={endConsultation}>
                      <PhoneOff className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Consultation Panel */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Patient Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Symptoms:</span>
                      <p className="text-muted-foreground">{currentPatient.symptoms}</p>
                    </div>
                    <div>
                      <span className="font-medium">Scheduled Time:</span>
                      <p className="text-muted-foreground">{currentPatient.time}</p>
                    </div>
                    <div>
                      <span className="font-medium">Duration:</span>
                      <p className="text-muted-foreground">{currentPatient.duration}</p>
                    </div>
                  </CardContent>
                </Card>

                <Tabs defaultValue="notes" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                    <TabsTrigger value="prescription">Prescription</TabsTrigger>
                  </TabsList>

                  <TabsContent value="notes" className="space-y-2">
                    <Label htmlFor="notes">Consultation Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Enter consultation notes..."
                      value={consultationNotes}
                      onChange={(e) => setConsultationNotes(e.target.value)}
                      rows={8}
                    />
                  </TabsContent>

                  <TabsContent value="prescription" className="space-y-2">
                    <Label htmlFor="prescription">Prescription</Label>
                    <Textarea
                      id="prescription"
                      placeholder="Enter prescription details..."
                      value={prescription}
                      onChange={(e) => setPrescription(e.target.value)}
                      rows={8}
                    />
                  </TabsContent>
                </Tabs>

                <Button onClick={saveConsultationData} className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Save Notes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Video Consultation</CardTitle>
          <CardDescription>Conduct video consultations with your patients</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="waiting" className="w-full">
            <TabsList>
              <TabsTrigger value="waiting">Waiting Room</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="waiting" className="space-y-4">
              <div className="space-y-4">
                {activeConsultations.map((consultation) => (
                  <Card key={consultation.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{consultation.patient}</h4>
                            <Badge variant="outline">{consultation.patientId}</Badge>
                            <Badge variant={consultation.status === "ready" ? "default" : "secondary"}>
                              {consultation.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{consultation.symptoms}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{consultation.time}</span>
                            </div>
                            <span>Duration: {consultation.duration}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Chat
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => startConsultation(consultation)}
                            disabled={consultation.status !== "ready"}
                          >
                            <Video className="h-4 w-4 mr-2" />
                            Start Call
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {activeConsultations.length === 0 && (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Active Consultations</h3>
                      <p className="text-muted-foreground">
                        Patients will appear here when they join the waiting room for their scheduled appointments.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="scheduled" className="space-y-4">
              <Card>
                <CardContent className="p-8 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Scheduled Consultations</h3>
                  <p className="text-muted-foreground">
                    View your upcoming scheduled video consultations for today and upcoming days.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <Card>
                <CardContent className="p-8 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Completed Consultations</h3>
                  <p className="text-muted-foreground">
                    Review notes and prescriptions from your completed video consultations.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Camera className="h-6 w-6 mb-2" />
              Test Camera
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Mic className="h-6 w-6 mb-2" />
              Test Microphone
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Monitor className="h-6 w-6 mb-2" />
              Screen Share Test
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
