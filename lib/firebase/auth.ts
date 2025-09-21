import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"
import { sendEmailVerification } from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, db } from "./config"

export interface UserProfile {
  id: string
  name: string
  email: string
  userType: "patient" | "doctor" | "pharmacy"
  phone?: string
  specialization?: string
  licenseNumber?: string
  pharmacyName?: string
  createdAt: Date
}

export const registerUser = async (userData: {
  email: string
  password: string
  name: string
  userType: "patient" | "doctor" | "pharmacy"
  phone?: string
  specialization?: string
  licenseNumber?: string
  pharmacyName?: string
}) => {
  try {
    // Create user account
    const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
    const user = userCredential.user

    // Update display name
    await updateProfile(user, { displayName: userData.name })

    // Send email verification
    await sendEmailVerification(user)

    // Create user profile in Firestore (do not await, run in background)
    const userProfile: UserProfile = {
      id: user.uid,
      name: userData.name,
      email: userData.email,
      userType: userData.userType,
      phone: userData.phone,
      specialization: userData.specialization,
      licenseNumber: userData.licenseNumber,
      pharmacyName: userData.pharmacyName,
      createdAt: new Date(),
    }
    setDoc(doc(db, "users", user.uid), userProfile).catch((error) => {
      console.error("Firestore profile creation error:", error)
    })

    return { user, profile: userProfile }
// --- Firebase Auth Full Flow Requirements ---
// 1. Email/Password sign-in method enabled in Firebase Console.
// 2. Email verification enabled and handled (see above).
// 3. Firestore rules allow user profile creation (users collection, write access for authenticated users).
// 4. Custom email templates configured in Firebase Console (optional, for branding).
// 5. App checks for emailVerified before allowing access to protected routes (recommended).
// 6. Password reset and email change flows implemented (optional, for full UX).
  } catch (error) {
    console.error("Registration error:", error)
    throw error
  }
}

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    console.error("Login error:", error)
    throw error
  }
}

export const logoutUser = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error("Logout error:", error)
    throw error
  }
}

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const docRef = doc(db, "users", userId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data() as UserProfile
    }
    return null
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return null
  }
}
