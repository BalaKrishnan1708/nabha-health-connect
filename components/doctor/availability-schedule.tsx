"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Plus, Trash2, Save } from "lucide-react"

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const mockSchedule = {
  Monday: { isAvailable: true, startTime: "09:00", endTime: "17:00", breakStart: "13:00", breakEnd: "14:00" },
  Tuesday: { isAvailable: true, startTime: "09:00", endTime: "17:00", breakStart: "13:00", breakEnd: "14:00" },
  Wednesday: { isAvailable: true, startTime: "09:00", endTime: "17:00", breakStart: "13:00", breakEnd: "14:00" },
  Thursday: { isAvailable: true, startTime: "09:00", endTime: "17:00", breakStart: "13:00", breakEnd: "14:00" },
  Friday: { isAvailable: true, startTime: "09:00", endTime: "17:00", breakStart: "13:00", breakEnd: "14:00" },
  Saturday: { isAvailable: true, startTime: "10:00", endTime: "14:00", breakStart: "", breakEnd: "" },
  Sunday: { isAvailable: false, startTime: "", endTime: "", breakStart: "", breakEnd: "" },
}

const mockTimeOff = [
  {
    id: "1",
    date: "2024-01-20",
    reason: "Medical Conference",
    type: "full-day",
  },
  {
    id: "2",
    date: "2024-01-25",
    reason: "Personal Leave",
    type: "full-day",
  },
]

export function AvailabilitySchedule() {
  const [schedule, setSchedule] = useState(mockSchedule)
  const [timeOff, setTimeOff] = useState(mockTimeOff)
  const [newTimeOff, setNewTimeOff] = useState({
    date: "",
    reason: "",
    type: "full-day",
  })

  const updateDaySchedule = (day: string, field: string, value: any) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  const saveSchedule = () => {
    // Mock save functionality
    console.log("Saving schedule:", schedule)
    alert("Schedule updated successfully!")
  }

  const addTimeOff = () => {
    if (!newTimeOff.date || !newTimeOff.reason) {
      alert("Please fill in all fields")
      return
    }

    const newEntry = {
      id: Date.now().toString(),
      ...newTimeOff,
    }

    setTimeOff((prev) => [...prev, newEntry])
    setNewTimeOff({ date: "", reason: "", type: "full-day" })
    alert("Time off added successfully!")
  }

  const removeTimeOff = (id: string) => {
    setTimeOff((prev) => prev.filter((item) => item.id !== id))
    alert("Time off removed successfully!")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Availability Schedule</CardTitle>
          <CardDescription>Manage your working hours and availability for appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="weekly" className="w-full">
            <TabsList>
              <TabsTrigger value="weekly">Weekly Schedule</TabsTrigger>
              <TabsTrigger value="timeoff">Time Off</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="weekly" className="space-y-6">
              <div className="space-y-4">
                {daysOfWeek.map((day) => (
                  <Card key={day}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold">{day}</h4>
                          <Switch
                            checked={schedule[day as keyof typeof schedule].isAvailable}
                            onCheckedChange={(checked) => updateDaySchedule(day, "isAvailable", checked)}
                          />
                          <span className="text-sm text-muted-foreground">
                            {schedule[day as keyof typeof schedule].isAvailable ? "Available" : "Not Available"}
                          </span>
                        </div>
                      </div>

                      {schedule[day as keyof typeof schedule].isAvailable && (
                        <div className="grid gap-4 md:grid-cols-4">
                          <div className="space-y-2">
                            <Label htmlFor={`${day}-start`}>Start Time</Label>
                            <Input
                              id={`${day}-start`}
                              type="time"
                              value={schedule[day as keyof typeof schedule].startTime}
                              onChange={(e) => updateDaySchedule(day, "startTime", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`${day}-end`}>End Time</Label>
                            <Input
                              id={`${day}-end`}
                              type="time"
                              value={schedule[day as keyof typeof schedule].endTime}
                              onChange={(e) => updateDaySchedule(day, "endTime", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`${day}-break-start`}>Break Start</Label>
                            <Input
                              id={`${day}-break-start`}
                              type="time"
                              value={schedule[day as keyof typeof schedule].breakStart}
                              onChange={(e) => updateDaySchedule(day, "breakStart", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`${day}-break-end`}>Break End</Label>
                            <Input
                              id={`${day}-break-end`}
                              type="time"
                              value={schedule[day as keyof typeof schedule].breakEnd}
                              onChange={(e) => updateDaySchedule(day, "breakEnd", e.target.value)}
                            />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button onClick={saveSchedule} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Schedule
              </Button>
            </TabsContent>

            <TabsContent value="timeoff" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add Time Off</CardTitle>
                  <CardDescription>Block specific dates when you're not available</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="timeoff-date">Date</Label>
                      <Input
                        id="timeoff-date"
                        type="date"
                        value={newTimeOff.date}
                        onChange={(e) => setNewTimeOff({ ...newTimeOff, date: e.target.value })}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeoff-reason">Reason</Label>
                      <Input
                        id="timeoff-reason"
                        placeholder="e.g., Medical Conference"
                        value={newTimeOff.reason}
                        onChange={(e) => setNewTimeOff({ ...newTimeOff, reason: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Button onClick={addTimeOff} className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Time Off
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Scheduled Time Off</CardTitle>
                  <CardDescription>Your upcoming blocked dates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {timeOff.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="h-4 w-4" />
                            <span className="font-medium">{item.date}</span>
                            <Badge variant="outline">{item.type}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.reason}</p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => removeTimeOff(item.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}

                    {timeOff.length === 0 && (
                      <div className="text-center py-8">
                        <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No Time Off Scheduled</h3>
                        <p className="text-muted-foreground">Add dates when you won't be available for appointments.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appointment Settings</CardTitle>
                  <CardDescription>Configure your appointment preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="slot-duration">Default Appointment Duration</Label>
                      <Input id="slot-duration" value="30 minutes" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="buffer-time">Buffer Time Between Appointments</Label>
                      <Input id="buffer-time" value="10 minutes" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="advance-booking">Advance Booking Limit</Label>
                      <Input id="advance-booking" value="30 days" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="consultation-fee">Consultation Fee</Label>
                      <Input id="consultation-fee" value="₹500" readOnly />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Auto-confirm appointments</h4>
                        <p className="text-sm text-muted-foreground">Automatically confirm new appointment requests</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Email notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive email alerts for new appointments</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">SMS reminders</h4>
                        <p className="text-sm text-muted-foreground">Send SMS reminders to patients</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <Button className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Save Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
