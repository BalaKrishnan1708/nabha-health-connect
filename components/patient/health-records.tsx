"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Search, Calendar, User, Pill } from "lucide-react"

const mockRecords = [
  {
    id: "1",
    date: "2024-01-10",
    doctor: "Dr. Rajesh Kumar",
    specialization: "General Medicine",
    diagnosis: "Hypertension",
    prescription: "Amlodipine 5mg once daily",
    notes: "Blood pressure elevated. Recommended lifestyle changes and medication.",
    vitals: {
      bloodPressure: "140/90",
      heartRate: "78 bpm",
      temperature: "98.6°F",
      weight: "70 kg",
    },
    labResults: ["Blood Test - Normal", "ECG - Normal"],
  },
  {
    id: "2",
    date: "2024-01-05",
    doctor: "Dr. Priya Sharma",
    specialization: "Cardiology",
    diagnosis: "Routine Checkup",
    prescription: "Multivitamins",
    notes: "Regular health checkup. All parameters normal.",
    vitals: {
      bloodPressure: "120/80",
      heartRate: "72 bpm",
      temperature: "98.4°F",
      weight: "69 kg",
    },
    labResults: ["Lipid Profile - Normal", "Blood Sugar - Normal"],
  },
  {
    id: "3",
    date: "2023-12-20",
    doctor: "Dr. Amit Singh",
    specialization: "General Medicine",
    diagnosis: "Common Cold",
    prescription: "Paracetamol 500mg, Cough syrup",
    notes: "Viral infection. Rest and medication recommended.",
    vitals: {
      bloodPressure: "118/78",
      heartRate: "75 bpm",
      temperature: "99.2°F",
      weight: "69 kg",
    },
    labResults: [],
  },
]

export function HealthRecords() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null)

  const filteredRecords = mockRecords.filter(
    (record) =>
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.specialization.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const selectedRecordData = mockRecords.find((record) => record.id === selectedRecord)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Health Records</CardTitle>
          <CardDescription>Your complete medical history and consultation records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search records by diagnosis, doctor, or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>

          <Tabs defaultValue="list" className="w-full">
            <TabsList>
              <TabsTrigger value="list">All Records</TabsTrigger>
              <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
              <TabsTrigger value="vitals">Vitals History</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              {filteredRecords.map((record) => (
                <Card
                  key={record.id}
                  className={`cursor-pointer transition-colors ${
                    selectedRecord === record.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedRecord(selectedRecord === record.id ? null : record.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{record.diagnosis}</h4>
                          <Badge variant="outline">{record.specialization}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{record.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{record.doctor}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>

                    {selectedRecord === record.id && (
                      <div className="mt-4 pt-4 border-t space-y-4">
                        <div>
                          <h5 className="font-medium mb-2">Doctor's Notes</h5>
                          <p className="text-sm text-muted-foreground">{record.notes}</p>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">Prescription</h5>
                          <div className="flex items-center gap-2">
                            <Pill className="h-4 w-4 text-primary" />
                            <span className="text-sm">{record.prescription}</span>
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">Vitals</h5>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>Blood Pressure: {record.vitals.bloodPressure}</div>
                            <div>Heart Rate: {record.vitals.heartRate}</div>
                            <div>Temperature: {record.vitals.temperature}</div>
                            <div>Weight: {record.vitals.weight}</div>
                          </div>
                        </div>

                        {record.labResults.length > 0 && (
                          <div>
                            <h5 className="font-medium mb-2">Lab Results</h5>
                            <div className="space-y-1">
                              {record.labResults.map((result, index) => (
                                <div key={index} className="text-sm text-muted-foreground">
                                  • {result}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="prescriptions" className="space-y-4">
              {filteredRecords.map((record) => (
                <Card key={record.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{record.diagnosis}</h4>
                        <p className="text-sm text-muted-foreground">
                          {record.date} - {record.doctor}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Pill className="h-4 w-4 text-primary" />
                          <span className="text-sm">{record.prescription}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="vitals" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Vitals Trend</CardTitle>
                  <CardDescription>Track your health metrics over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredRecords.map((record) => (
                      <div key={record.id} className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{record.date}</p>
                          <p className="text-sm text-muted-foreground">{record.doctor}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>BP: {record.vitals.bloodPressure}</div>
                          <div>HR: {record.vitals.heartRate}</div>
                          <div>Temp: {record.vitals.temperature}</div>
                          <div>Weight: {record.vitals.weight}</div>
                        </div>
                      </div>
                    ))}
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
