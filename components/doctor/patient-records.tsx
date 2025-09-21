"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Plus, FileText, Edit, Calendar, User, Phone, MapPin } from "lucide-react"

const mockPatients = [
  {
    id: "P001",
    name: "Rajesh Singh",
    age: 45,
    gender: "Male",
    phone: "+91 9876543210",
    address: "Village Nabha, Punjab",
    lastVisit: "2024-01-10",
    condition: "Hypertension",
    status: "Stable",
    records: [
      {
        date: "2024-01-10",
        diagnosis: "Hypertension",
        prescription: "Amlodipine 5mg once daily",
        notes: "Blood pressure elevated. Recommended lifestyle changes.",
        vitals: { bp: "140/90", hr: "78", temp: "98.6", weight: "70" },
      },
      {
        date: "2023-12-15",
        diagnosis: "Routine Checkup",
        prescription: "Multivitamins",
        notes: "Regular health checkup. All parameters normal.",
        vitals: { bp: "135/85", hr: "75", temp: "98.4", weight: "69" },
      },
    ],
  },
  {
    id: "P002",
    name: "Priya Sharma",
    age: 52,
    gender: "Female",
    phone: "+91 9876543211",
    address: "Nabha City, Punjab",
    lastVisit: "2024-01-08",
    condition: "Diabetes Type 2",
    status: "Monitoring",
    records: [
      {
        date: "2024-01-08",
        diagnosis: "Diabetes Type 2",
        prescription: "Metformin 500mg twice daily",
        notes: "Blood sugar levels need monitoring. Diet counseling provided.",
        vitals: { bp: "130/80", hr: "72", temp: "98.2", weight: "65" },
      },
    ],
  },
  {
    id: "P003",
    name: "Amit Kumar",
    age: 38,
    gender: "Male",
    phone: "+91 9876543212",
    address: "GT Road, Nabha",
    lastVisit: "2024-01-05",
    condition: "Anxiety",
    status: "Improving",
    records: [
      {
        date: "2024-01-05",
        diagnosis: "Anxiety Disorder",
        prescription: "Counseling sessions, Relaxation techniques",
        notes: "Patient showing improvement with therapy sessions.",
        vitals: { bp: "120/80", hr: "80", temp: "98.6", weight: "72" },
      },
    ],
  },
]

export function PatientRecords() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)
  const [isAddingRecord, setIsAddingRecord] = useState(false)
  const [newRecord, setNewRecord] = useState({
    diagnosis: "",
    prescription: "",
    notes: "",
    vitals: { bp: "", hr: "", temp: "", weight: "" },
  })

  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const selectedPatientData = mockPatients.find((patient) => patient.id === selectedPatient)

  const handleAddRecord = () => {
    if (!selectedPatientData) return

    const recordWithDate = {
      ...newRecord,
      date: new Date().toISOString().split("T")[0],
    }

    // Mock adding record
    console.log("Adding record:", recordWithDate)
    alert("Patient record added successfully!")

    // Reset form
    setNewRecord({
      diagnosis: "",
      prescription: "",
      notes: "",
      vitals: { bp: "", hr: "", temp: "", weight: "" },
    })
    setIsAddingRecord(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Patient Records</CardTitle>
          <CardDescription>Manage patient medical records and history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by patient name, ID, or condition..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Patient List */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Patients</h3>
              {filteredPatients.map((patient) => (
                <Card
                  key={patient.id}
                  className={`cursor-pointer transition-colors ${
                    selectedPatient === patient.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedPatient(patient.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{patient.name}</h4>
                          <Badge variant="outline">{patient.id}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{patient.condition}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>
                              {patient.age}y, {patient.gender}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{patient.lastVisit}</span>
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant={
                          patient.status === "Stable"
                            ? "default"
                            : patient.status === "Monitoring"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {patient.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Patient Details */}
            <div>
              {selectedPatientData ? (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{selectedPatientData.name}</CardTitle>
                        <CardDescription>Patient ID: {selectedPatientData.id}</CardDescription>
                      </div>
                      <Dialog open={isAddingRecord} onOpenChange={setIsAddingRecord}>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Record
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Add New Medical Record</DialogTitle>
                            <DialogDescription>
                              Add a new medical record for {selectedPatientData.name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="diagnosis">Diagnosis</Label>
                              <Input
                                id="diagnosis"
                                value={newRecord.diagnosis}
                                onChange={(e) => setNewRecord({ ...newRecord, diagnosis: e.target.value })}
                                placeholder="Enter diagnosis"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="prescription">Prescription</Label>
                              <Textarea
                                id="prescription"
                                value={newRecord.prescription}
                                onChange={(e) => setNewRecord({ ...newRecord, prescription: e.target.value })}
                                placeholder="Enter prescription details"
                                rows={3}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="notes">Doctor's Notes</Label>
                              <Textarea
                                id="notes"
                                value={newRecord.notes}
                                onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })}
                                placeholder="Enter clinical notes"
                                rows={3}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="bp">Blood Pressure</Label>
                                <Input
                                  id="bp"
                                  value={newRecord.vitals.bp}
                                  onChange={(e) =>
                                    setNewRecord({
                                      ...newRecord,
                                      vitals: { ...newRecord.vitals, bp: e.target.value },
                                    })
                                  }
                                  placeholder="120/80"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="hr">Heart Rate</Label>
                                <Input
                                  id="hr"
                                  value={newRecord.vitals.hr}
                                  onChange={(e) =>
                                    setNewRecord({
                                      ...newRecord,
                                      vitals: { ...newRecord.vitals, hr: e.target.value },
                                    })
                                  }
                                  placeholder="72 bpm"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="temp">Temperature</Label>
                                <Input
                                  id="temp"
                                  value={newRecord.vitals.temp}
                                  onChange={(e) =>
                                    setNewRecord({
                                      ...newRecord,
                                      vitals: { ...newRecord.vitals, temp: e.target.value },
                                    })
                                  }
                                  placeholder="98.6°F"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="weight">Weight</Label>
                                <Input
                                  id="weight"
                                  value={newRecord.vitals.weight}
                                  onChange={(e) =>
                                    setNewRecord({
                                      ...newRecord,
                                      vitals: { ...newRecord.vitals, weight: e.target.value },
                                    })
                                  }
                                  placeholder="70 kg"
                                />
                              </div>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" onClick={() => setIsAddingRecord(false)}>
                                Cancel
                              </Button>
                              <Button onClick={handleAddRecord}>Add Record</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="info" className="w-full">
                      <TabsList>
                        <TabsTrigger value="info">Patient Info</TabsTrigger>
                        <TabsTrigger value="records">Medical Records</TabsTrigger>
                      </TabsList>

                      <TabsContent value="info" className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Age:</span>
                            <p>{selectedPatientData.age} years</p>
                          </div>
                          <div>
                            <span className="font-medium">Gender:</span>
                            <p>{selectedPatientData.gender}</p>
                          </div>
                          <div>
                            <span className="font-medium">Phone:</span>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              <span>{selectedPatientData.phone}</span>
                            </div>
                          </div>
                          <div>
                            <span className="font-medium">Address:</span>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{selectedPatientData.address}</span>
                            </div>
                          </div>
                          <div>
                            <span className="font-medium">Last Visit:</span>
                            <p>{selectedPatientData.lastVisit}</p>
                          </div>
                          <div>
                            <span className="font-medium">Current Status:</span>
                            <Badge variant="outline">{selectedPatientData.status}</Badge>
                          </div>
                        </div>
                        <div>
                          <span className="font-medium text-sm">Primary Condition:</span>
                          <p className="text-sm text-muted-foreground mt-1">{selectedPatientData.condition}</p>
                        </div>
                      </TabsContent>

                      <TabsContent value="records" className="space-y-4">
                        {selectedPatientData.records.map((record, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h4 className="font-semibold">{record.diagnosis}</h4>
                                  <p className="text-sm text-muted-foreground">{record.date}</p>
                                </div>
                                <Button size="sm" variant="ghost">
                                  <Edit className="h-3 w-3" />
                                </Button>
                              </div>
                              <div className="space-y-2 text-sm">
                                <div>
                                  <span className="font-medium">Prescription:</span>
                                  <p className="text-muted-foreground">{record.prescription}</p>
                                </div>
                                <div>
                                  <span className="font-medium">Notes:</span>
                                  <p className="text-muted-foreground">{record.notes}</p>
                                </div>
                                <div>
                                  <span className="font-medium">Vitals:</span>
                                  <div className="grid grid-cols-2 gap-2 mt-1 text-xs">
                                    <span>BP: {record.vitals.bp}</span>
                                    <span>HR: {record.vitals.hr}</span>
                                    <span>Temp: {record.vitals.temp}</span>
                                    <span>Weight: {record.vitals.weight}</span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Select a Patient</h3>
                    <p className="text-muted-foreground">
                      Choose a patient from the list to view their medical records.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
