"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth"
import { auth } from "@/lib/firebase/config"
import { registerUser, loginUser, logoutUser, getUserProfile, type UserProfile } from "@/lib/firebase/auth"

interface AuthContextType {
  user: UserProfile | null
  firebaseUser: FirebaseUser | null
  login: (email: string, password: string) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setFirebaseUser(firebaseUser)
        const profile = await getUserProfile(firebaseUser.uid)
        setUser(profile)
      } else {
        setFirebaseUser(null)
        setUser(null)
      }
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const firebaseUser = await loginUser(email, password)
      const profile = await getUserProfile(firebaseUser.uid)

      if (profile) {
        switch (profile.userType) {
          case "patient":
            router.push("/patient")
            break
          case "doctor":
            router.push("/doctor")
            break
          case "pharmacy":
            router.push("/pharmacy")
            break
        }
      }
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const register = async (userData: any) => {
    try {
      await registerUser(userData)
      router.push("/auth/verify")
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await logoutUser()
      setUser(null)
      setFirebaseUser(null)
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, firebaseUser, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
