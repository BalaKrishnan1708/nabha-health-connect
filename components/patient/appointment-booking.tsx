"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Clock, Video, Star, MapPin, Loader2 } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { getDocuments, createDocument } from "@/lib/firebase/firestore"

interface Doctor {
  id: string
  name: string
  specialization: string
  rating: number
  experience: string
  location: string
  availability: string[]
  consultationFee: number
  userId: string
}

export function AppointmentBooking() {
  const { user } = useAuth()
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedSpecialization, setSelectedSpecialization] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [symptoms, setSymptoms] = useState("")
  const [step, setStep] = useState(1)

  const [specializations, setSpecializations] = useState<string[]>([])

  useEffect(() => {
    fetchDoctors()
  }, [])

  const fetchDoctors = async () => {
    try {
      setLoading(true)
      const doctorsData = await getDocuments("users", [{ field: "userType", operator: "==", value: "doctor" }])

      const formattedDoctors = doctorsData.map((doc: any) => ({
        id: doc.id,
        name: doc.name,
        specialization: doc.specialization || "General Medicine",
        rating: doc.rating || 4.5,
        experience: doc.experience || "5 years",
        location: doc.location || "Nabha Health Center",
        availability: doc.availability || ["9:00 AM", "10:00 AM", "2:00 PM", "3:00 PM"],
        consultationFee: doc.consultationFee || 500,
        userId: doc.id,
      }))

      setDoctors(formattedDoctors)

      // Extract unique specializations
      const uniqueSpecs = [...new Set(formattedDoctors.map((d) => d.specialization))]
      setSpecializations(uniqueSpecs)
    } catch (error) {
      console.error("Error fetching doctors:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredDoctors = selectedSpecialization
    ? doctors.filter((doctor) => doctor.specialization === selectedSpecialization)
    : doctors

  const selectedDoctorData = doctors.find((doctor) => doctor.id === selectedDoctor)

  const handleBookAppointment = async () => {
    if (!user || !selectedDoctorData) return

    try {
      setLoading(true)
      const appointmentData = {
        patientId: user.id,
        patientName: user.name,
        doctorId: selectedDoctorData.id,
        doctorName: selectedDoctorData.name,
        specialization: selectedDoctorData.specialization,
        date: selectedDate,
        time: selectedTime,
        symptoms: symptoms,
        consultationFee: selectedDoctorData.consultationFee,
        status: "pending",
        type: "video_consultation",
      }

      await createDocument("appointments", appointmentData)

      alert("Appointment booked successfully! You will receive a confirmation notification.")

      // Reset form
      setStep(1)
      setSelectedSpecialization("")
      setSelectedDoctor("")
      setSelectedDate("")
      setSelectedTime("")
      setSymptoms("")
    } catch (error) {
      console.error("Error booking appointment:", error)
      alert("Failed to book appointment. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (loading && doctors.length === 0) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Loading doctors...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Book an Appointment</CardTitle>
          <CardDescription>Schedule a video consultation with our healthcare professionals</CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="specialization">Select Specialization</Label>
                <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    {specializations.map((spec) => (
                      <SelectItem key={spec} value={spec}>
                        {spec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="symptoms">Describe your symptoms (optional)</Label>
                <Textarea
                  id="symptoms"
                  placeholder="Please describe your symptoms or reason for consultation..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  rows={3}
                />
              </div>

              <Button onClick={() => setStep(2)} disabled={!selectedSpecialization} className="w-full">
                Find Doctors
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Available Doctors</h3>
                <Button variant="outline" size="sm" onClick={() => setStep(1)}>
                  Back
                </Button>
              </div>

              {filteredDoctors.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">No doctors available for this specialization.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {filteredDoctors.map((doctor) => (
                    <Card
                      key={doctor.id}
                      className={`cursor-pointer transition-colors ${
                        selectedDoctor === doctor.id ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setSelectedDoctor(doctor.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{doctor.name}</h4>
                            <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm">
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span>{doctor.rating}</span>
                              </div>
                              <span>{doctor.experience}</span>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{doctor.location}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="secondary">₹{doctor.consultationFee}</Badge>
                            <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                              <Video className="h-3 w-3" />
                              <span>Video Call</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              <Button onClick={() => setStep(3)} disabled={!selectedDoctor} className="w-full">
                Select Time Slot
              </Button>
            </div>
          )}

          {step === 3 && selectedDoctorData && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Select Date & Time</h3>
                <Button variant="outline" size="sm" onClick={() => setStep(2)}>
                  Back
                </Button>
              </div>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold">{selectedDoctorData.name}</h4>
                  <p className="text-sm text-muted-foreground">{selectedDoctorData.specialization}</p>
                </CardContent>
              </Card>

              <div className="space-y-2">
                <Label htmlFor="date">Select Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="space-y-2">
                <Label>Available Time Slots</Label>
                <div className="grid grid-cols-2 gap-2">
                  {selectedDoctorData.availability.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTime(time)}
                      className="justify-start"
                    >
                      <Clock className="h-3 w-3 mr-2" />
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Appointment Summary</h4>
                <div className="space-y-1 text-sm">
                  <p>Doctor: {selectedDoctorData.name}</p>
                  <p>Date: {selectedDate}</p>
                  <p>Time: {selectedTime}</p>
                  <p>Consultation Fee: ₹{selectedDoctorData.consultationFee}</p>
                  <p>Type: Video Consultation</p>
                </div>
              </div>

              <Button
                onClick={handleBookAppointment}
                disabled={!selectedDate || !selectedTime || loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Booking...
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
