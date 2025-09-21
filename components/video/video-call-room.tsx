"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Video, VideoOff, Mic, MicOff, Phone, MessageSquare, FileText, Camera, Settings, Users } from "lucide-react"

interface VideoCallRoomProps {
  appointmentId: string
  patientName: string
  doctorName: string
  userRole: "patient" | "doctor"
}

export function VideoCallRoom({ appointmentId, patientName, doctorName, userRole }: VideoCallRoomProps) {
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [isCallActive, setIsCallActive] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [chatMessages, setChatMessages] = useState<
    Array<{ id: string; sender: string; message: string; time: string }>
  >([])
  const [newMessage, setNewMessage] = useState("")
  const [callDuration, setCallDuration] = useState(0)
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected">("connecting")

  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Simulate connection process
    const timer = setTimeout(() => {
      setConnectionStatus("connected")
      setIsCallActive(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isCallActive])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const toggleVideo = () => setIsVideoOn(!isVideoOn)
  const toggleAudio = () => setIsAudioOn(!isAudioOn)

  const endCall = () => {
    setIsCallActive(false)
    setConnectionStatus("disconnected")
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        sender: userRole === "patient" ? patientName : doctorName,
        message: newMessage,
        time: new Date().toLocaleTimeString(),
      }
      setChatMessages((prev) => [...prev, message])
      setNewMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-indigo-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Video Consultation</h1>
            <p className="text-gray-600">{userRole === "patient" ? `Dr. ${doctorName}` : patientName}</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={connectionStatus === "connected" ? "default" : "secondary"}>
              {connectionStatus === "connected" ? "Connected" : "Connecting..."}
            </Badge>
            {isCallActive && (
              <div className="text-sm font-medium text-gray-600">Duration: {formatDuration(callDuration)}</div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Video Area */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                  {/* Remote Video */}
                  <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-cyan-600 flex items-center justify-center">
                    {connectionStatus === "connected" ? (
                      <div className="text-center text-white">
                        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                          <Users className="w-12 h-12" />
                        </div>
                        <p className="text-lg font-medium">
                          {userRole === "patient" ? `Dr. ${doctorName}` : patientName}
                        </p>
                        <p className="text-sm opacity-80">Video call in progress</p>
                      </div>
                    ) : (
                      <div className="text-center text-white">
                        <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mb-4 mx-auto"></div>
                        <p>Connecting...</p>
                      </div>
                    )}
                  </div>

                  {/* Local Video (Picture-in-Picture) */}
                  <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-white">
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                      {isVideoOn ? (
                        <div className="text-center text-white">
                          <Camera className="w-8 h-8 mx-auto mb-2" />
                          <p className="text-xs">You</p>
                        </div>
                      ) : (
                        <div className="text-center text-white">
                          <VideoOff className="w-8 h-8 mx-auto mb-2" />
                          <p className="text-xs">Camera Off</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="flex items-center gap-3 bg-black/50 backdrop-blur-sm rounded-full px-6 py-3">
                      <Button
                        size="sm"
                        variant={isAudioOn ? "secondary" : "destructive"}
                        onClick={toggleAudio}
                        className="rounded-full w-12 h-12 p-0"
                      >
                        {isAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                      </Button>

                      <Button
                        size="sm"
                        variant={isVideoOn ? "secondary" : "destructive"}
                        onClick={toggleVideo}
                        className="rounded-full w-12 h-12 p-0"
                      >
                        {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                      </Button>

                      <Button size="sm" variant="destructive" onClick={endCall} className="rounded-full w-12 h-12 p-0">
                        <Phone className="w-5 h-5" />
                      </Button>

                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setShowChat(!showChat)}
                        className="rounded-full w-12 h-12 p-0"
                      >
                        <MessageSquare className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Chat */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-64 overflow-y-auto space-y-3 border rounded-lg p-3 bg-gray-50">
                  {chatMessages.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center">No messages yet</p>
                  ) : (
                    chatMessages.map((msg) => (
                      <div key={msg.id} className="text-sm">
                        <div className="font-medium text-gray-900">{msg.sender}</div>
                        <div className="text-gray-700">{msg.message}</div>
                        <div className="text-xs text-gray-500">{msg.time}</div>
                      </div>
                    ))
                  )}
                </div>
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="min-h-[60px]"
                    onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())}
                  />
                  <Button onClick={sendMessage} size="sm">
                    Send
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            {userRole === "doctor" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <FileText className="w-4 h-4 mr-2" />
                    Add to Medical Record
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <FileText className="w-4 h-4 mr-2" />
                    Write Prescription
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Settings className="w-4 h-4 mr-2" />
                    Schedule Follow-up
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
