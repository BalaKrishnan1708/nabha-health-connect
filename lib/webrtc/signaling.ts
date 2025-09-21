import { doc, setDoc, onSnapshot, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/config"

export interface SignalingData {
  type: "offer" | "answer" | "ice-candidate"
  data: any
  from: string
  to: string
  timestamp: number
}

export class WebRTCSignaling {
  private appointmentId: string
  private userId: string
  private onSignalCallback?: (signal: SignalingData) => void

  constructor(appointmentId: string, userId: string) {
    this.appointmentId = appointmentId
    this.userId = userId
  }

  async sendSignal(signal: Omit<SignalingData, "from" | "timestamp">) {
    try {
      const signalDoc = doc(db, "signaling", `${this.appointmentId}_${Date.now()}`)
      await setDoc(signalDoc, {
        ...signal,
        from: this.userId,
        timestamp: Date.now(),
      })
    } catch (error) {
      console.error("Error sending signal:", error)
      throw error
    }
  }

  startListening(callback: (signal: SignalingData) => void) {
    this.onSignalCallback = callback

    // Listen for signaling messages for this appointment
    const signalingRef = doc(db, "appointments", this.appointmentId)

    return onSnapshot(signalingRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data()
        if (data.signaling && data.signaling.to === this.userId) {
          callback(data.signaling)
          // Clear the signal after processing
          this.clearSignal()
        }
      }
    })
  }

  private async clearSignal() {
    try {
      const appointmentRef = doc(db, "appointments", this.appointmentId)
      await updateDoc(appointmentRef, {
        signaling: null,
      })
    } catch (error) {
      console.error("Error clearing signal:", error)
    }
  }

  async updateSignal(signal: SignalingData) {
    try {
      const appointmentRef = doc(db, "appointments", this.appointmentId)
      await updateDoc(appointmentRef, {
        signaling: signal,
      })
    } catch (error) {
      console.error("Error updating signal:", error)
      throw error
    }
  }
}
