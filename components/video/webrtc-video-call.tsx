"use client"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Video, VideoOff, Mic, MicOff, Phone, PhoneOff } from "lucide-react"

interface WebRTCVideoCallProps {
  appointmentId: string
  isDoctor?: boolean
}

export function WebRTCVideoCall({ appointmentId, isDoctor = false }: WebRTCVideoCallProps) {
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [isCallActive, setIsCallActive] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected">("disconnected")

  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null)
  const localStreamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    // Initialize WebRTC when component mounts
    initializeWebRTC()

    return () => {
      // Cleanup on unmount
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop())
      }
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close()
      }
    }
  }, [])

  const initializeWebRTC = async () => {
    try {
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })

      localStreamRef.current = stream
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream
      }

      // Create peer connection
      const configuration = {
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      }

      peerConnectionRef.current = new RTCPeerConnection(configuration)

      // Add local stream to peer connection
      stream.getTracks().forEach((track) => {
        peerConnectionRef.current?.addTrack(track, stream)
      })

      // Handle remote stream
      peerConnectionRef.current.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0]
        }
      }

      // Handle connection state changes
      peerConnectionRef.current.onconnectionstatechange = () => {
        const state = peerConnectionRef.current?.connectionState
        if (state === "connected") {
          setConnectionStatus("connected")
        } else if (state === "disconnected" || state === "failed") {
          setConnectionStatus("disconnected")
        }
      }
    } catch (error) {
      console.error("Error initializing WebRTC:", error)
    }
  }

  const startCall = async () => {
    if (!peerConnectionRef.current) return

    setIsCallActive(true)
    setConnectionStatus("connecting")

    try {
      // Create offer (simplified - in real app, this would go through signaling server)
      const offer = await peerConnectionRef.current.createOffer()
      await peerConnectionRef.current.setLocalDescription(offer)

      // In a real implementation, you would send this offer to the other peer
      // through a signaling server (WebSocket, Socket.io, etc.)

      // For demo purposes, simulate connection
      setTimeout(() => {
        setConnectionStatus("connected")
      }, 2000)
    } catch (error) {
      console.error("Error starting call:", error)
      setConnectionStatus("disconnected")
    }
  }

  const endCall = () => {
    setIsCallActive(false)
    setConnectionStatus("disconnected")

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close()
    }

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop())
    }
  }

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled
        setIsVideoEnabled(videoTrack.enabled)
      }
    }
  }

  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled
        setIsAudioEnabled(audioTrack.enabled)
      }
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Video Consultation - Appointment #{appointmentId}
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  connectionStatus === "connected"
                    ? "bg-green-500"
                    : connectionStatus === "connecting"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
              />
              <span className="text-sm capitalize">{connectionStatus}</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {/* Local Video */}
            <div className="relative">
              <video
                ref={localVideoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-64 bg-gray-900 rounded-lg object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                {isDoctor ? "You (Doctor)" : "You (Patient)"}
              </div>
              {!isVideoEnabled && (
                <div className="absolute inset-0 bg-gray-900 rounded-lg flex items-center justify-center">
                  <VideoOff className="h-8 w-8 text-white" />
                </div>
              )}
            </div>

            {/* Remote Video */}
            <div className="relative">
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-64 bg-gray-900 rounded-lg object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                {isDoctor ? "Patient" : "Doctor"}
              </div>
              {connectionStatus !== "connected" && (
                <div className="absolute inset-0 bg-gray-900 rounded-lg flex items-center justify-center">
                  <div className="text-white text-center">
                    <Video className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">
                      {connectionStatus === "connecting" ? "Connecting..." : "Waiting for connection"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Call Controls */}
          <div className="flex justify-center gap-4">
            <Button
              variant={isVideoEnabled ? "default" : "destructive"}
              size="lg"
              onClick={toggleVideo}
              disabled={!isCallActive}
            >
              {isVideoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </Button>

            <Button
              variant={isAudioEnabled ? "default" : "destructive"}
              size="lg"
              onClick={toggleAudio}
              disabled={!isCallActive}
            >
              {isAudioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </Button>

            {!isCallActive ? (
              <Button variant="default" size="lg" onClick={startCall} className="bg-green-600 hover:bg-green-700">
                <Phone className="h-5 w-5" />
              </Button>
            ) : (
              <Button variant="destructive" size="lg" onClick={endCall}>
                <PhoneOff className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Call Info */}
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Call Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Status:</span>
                <span className="ml-2 capitalize">{connectionStatus}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Duration:</span>
                <span className="ml-2">{isCallActive ? "00:00" : "Not started"}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
