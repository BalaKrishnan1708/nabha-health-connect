import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  Timestamp,
} from "firebase/firestore"
import { db } from "./config"

export const createDocument = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
    return docRef.id
  } catch (error) {
    console.error("Error creating document:", error)
    throw error
  }
}

export const getDocument = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }
    }
    return null
  } catch (error) {
    console.error("Error getting document:", error)
    throw error
  }
}

export const getDocuments = async (collectionName: string, conditions?: any[]) => {
  try {
    let q = collection(db, collectionName)

    if (conditions) {
      conditions.forEach((condition) => {
        q = query(q, where(condition.field, condition.operator, condition.value))
      })
    }

    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error("Error getting documents:", error)
    throw error
  }
}

export const updateDocument = async (collectionName: string, docId: string, data: any) => {
  try {
    const docRef = doc(db, collectionName, docId)
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    console.error("Error updating document:", error)
    throw error
  }
}

export const deleteDocument = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId)
    await deleteDoc(docRef)
  } catch (error) {
    console.error("Error deleting document:", error)
    throw error
  }
}

export const subscribeToCollection = (collectionName: string, callback: (data: any[]) => void, conditions?: any[]) => {
  let q = collection(db, collectionName)

  if (conditions) {
    conditions.forEach((condition) => {
      q = query(q, where(condition.field, condition.operator, condition.value))
    })
  }

  return onSnapshot(q, (querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    callback(data)
  })
}
