"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  MessageSquare,
  FileText,
  Settings,
  Users,
  Loader2,
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { getDocument, updateDocument } from "@/lib/firebase/firestore"
import { WebRTCSignaling, type SignalingData } from "@/lib/webrtc/signaling"

interface EnhancedVideoCallProps {
  appointmentId: string
}

export function EnhancedVideoCall({ appointmentId }: EnhancedVideoCallProps) {
  const { user } = useAuth()
  const [appointment, setAppointment] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [isCallActive, setIsCallActive] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [chatMessages, setChatMessages] = useState<
    Array<{ id: string; sender: string; message: string; time: string }>
  >([])
  const [newMessage, setNewMessage] = useState("")
  const [callDuration, setCallDuration] = useState(0)
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected">("disconnected")

  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null)
  const localStreamRef = useRef<MediaStream | null>(null)
  const signalingRef = useRef<WebRTCSignaling | null>(null)

  useEffect(() => {
    if (user) {
      fetchAppointment()
      initializeSignaling()
    }
  }, [user, appointmentId])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isCallActive])

  const fetchAppointment = async () => {
    try {
      const appointmentData = await getDocument("appointments", appointmentId)
      setAppointment(appointmentData)
    } catch (error) {
      console.error("Error fetching appointment:", error)
    } finally {
      setLoading(false)
    }
  }

  const initializeSignaling = useCallback(() => {
    if (!user) return

    signalingRef.current = new WebRTCSignaling(appointmentId, user.id)

    // Listen for signaling messages
    signalingRef.current.startListening(handleSignalingMessage)
  }, [user, appointmentId])

  const handleSignalingMessage = async (signal: SignalingData) => {
    if (!peerConnectionRef.current) return

    try {
      switch (signal.type) {
        case "offer":
          await peerConnectionRef.current.setRemoteDescription(signal.data)
          const answer = await peerConnectionRef.current.createAnswer()
          await peerConnectionRef.current.setLocalDescription(answer)

          if (signalingRef.current) {
            await signalingRef.current.sendSignal({
              type: "answer",
              data: answer,
              to: signal.from,
            })
          }
          break

        case "answer":
          await peerConnectionRef.current.setRemoteDescription(signal.data)
          break

        case "ice-candidate":
          await peerConnectionRef.current.addIceCandidate(signal.data)
          break
      }
    } catch (error) {
      console.error("Error handling signaling message:", error)
    }
  }

  const initializeWebRTC = async () => {
    try {
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: { echoCancellation: true, noiseSuppression: true },
      })

      localStreamRef.current = stream
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream
      }

      // Create peer connection with STUN/TURN servers
      const configuration: RTCConfiguration = {
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }, { urls: "stun:stun1.l.google.com:19302" }],
      }

      peerConnectionRef.current = new RTCPeerConnection(configuration)

      // Add local stream tracks
      stream.getTracks().forEach((track) => {
        peerConnectionRef.current?.addTrack(track, stream)
      })

      // Handle remote stream
      peerConnectionRef.current.ontrack = (event) => {
        if (remoteVideoRef.current && event.streams[0]) {
          remoteVideoRef.current.srcObject = event.streams[0]
          setConnectionStatus("connected")
        }
      }

      // Handle ICE candidates
      peerConnectionRef.current.onicecandidate = async (event) => {
        if (event.candidate && signalingRef.current && appointment) {
          const otherUserId = user?.userType === "doctor" ? appointment.patientId : appointment.doctorId
          await signalingRef.current.sendSignal({
            type: "ice-candidate",
            data: event.candidate,
            to: otherUserId,
          })
        }
      }

      // Handle connection state changes
      peerConnectionRef.current.onconnectionstatechange = () => {
        const state = peerConnectionRef.current?.connectionState
        if (state === "connected") {
          setConnectionStatus("connected")
        } else if (state === "disconnected" || state === "failed") {
          setConnectionStatus("disconnected")
        } else if (state === "connecting") {
          setConnectionStatus("connecting")
        }
      }
    } catch (error) {
      console.error("Error initializing WebRTC:", error)
      alert("Failed to access camera/microphone. Please check permissions.")
    }
  }

  const startCall = async () => {
    if (!appointment || !user) return

    setIsCallActive(true)
    setConnectionStatus("connecting")

    await initializeWebRTC()

    try {
      if (peerConnectionRef.current && signalingRef.current) {
        // Create and send offer
        const offer = await peerConnectionRef.current.createOffer()
        await peerConnectionRef.current.setLocalDescription(offer)

        const otherUserId = user.userType === "doctor" ? appointment.patientId : appointment.doctorId
        await signalingRef.current.sendSignal({
          type: "offer",
          data: offer,
          to: otherUserId,
        })

        // Update appointment status
        await updateDocument("appointments", appointmentId, {
          status: "in_progress",
          callStartTime: new Date(),
        })
      }
    } catch (error) {
      console.error("Error starting call:", error)
      setConnectionStatus("disconnected")
    }
  }

  const endCall = async () => {
    setIsCallActive(false)
    setConnectionStatus("disconnected")

    // Stop all tracks
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop())
    }

    // Close peer connection
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close()
      peerConnectionRef.current = null
    }

    // Update appointment status
    if (appointment) {
      await updateDocument("appointments", appointmentId, {
        status: "completed",
        callEndTime: new Date(),
        callDuration: callDuration,
      })
    }
  }

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled
        setIsVideoOn(videoTrack.enabled)
      }
    }
  }

  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled
        setIsAudioOn(audioTrack.enabled)
      }
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const sendMessage = () => {
    if (newMessage.trim() && user) {
      const message = {
        id: Date.now().toString(),
        sender: user.name,
        message: newMessage,
        time: new Date().toLocaleTimeString(),
      }
      setChatMessages((prev) => [...prev, message])
      setNewMessage("")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-indigo-50 p-4 flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Loading appointment...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!appointment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-indigo-50 p-4 flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-red-600">Appointment not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-indigo-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Video Consultation</h1>
            <p className="text-gray-600">
              {user?.userType === "patient" ? `Dr. ${appointment.doctorName}` : appointment.patientName}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={connectionStatus === "connected" ? "default" : "secondary"}>
              {connectionStatus === "connected"
                ? "Connected"
                : connectionStatus === "connecting"
                  ? "Connecting..."
                  : "Disconnected"}
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
                  <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />

                  {connectionStatus !== "connected" && (
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-cyan-600 flex items-center justify-center">
                      <div className="text-center text-white">
                        {connectionStatus === "connecting" ? (
                          <>
                            <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mb-4 mx-auto"></div>
                            <p>Connecting...</p>
                          </>
                        ) : (
                          <>
                            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                              <Users className="w-12 h-12" />
                            </div>
                            <p className="text-lg font-medium">
                              {user?.userType === "patient" ? `Dr. ${appointment.doctorName}` : appointment.patientName}
                            </p>
                            <p className="text-sm opacity-80">Waiting to connect...</p>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Local Video (Picture-in-Picture) */}
                  <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-white">
                    <video ref={localVideoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
                    {!isVideoOn && (
                      <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                        <VideoOff className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Controls */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="flex items-center gap-3 bg-black/50 backdrop-blur-sm rounded-full px-6 py-3">
                      <Button
                        size="sm"
                        variant={isAudioOn ? "secondary" : "destructive"}
                        onClick={toggleAudio}
                        className="rounded-full w-12 h-12 p-0"
                        disabled={!isCallActive}
                      >
                        {isAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                      </Button>

                      <Button
                        size="sm"
                        variant={isVideoOn ? "secondary" : "destructive"}
                        onClick={toggleVideo}
                        className="rounded-full w-12 h-12 p-0"
                        disabled={!isCallActive}
                      >
                        {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                      </Button>

                      {!isCallActive ? (
                        <Button
                          size="sm"
                          variant="default"
                          onClick={startCall}
                          className="rounded-full w-12 h-12 p-0 bg-green-600 hover:bg-green-700"
                        >
                          <Phone className="w-5 h-5" />
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={endCall}
                          className="rounded-full w-12 h-12 p-0"
                        >
                          <PhoneOff className="w-5 h-5" />
                        </Button>
                      )}

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
            {user?.userType === "doctor" && (
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
