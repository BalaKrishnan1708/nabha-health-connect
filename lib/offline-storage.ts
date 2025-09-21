// IndexedDB wrapper for offline storage
class OfflineStorage {
  private dbName = "nabha-health-connect"
  private version = 1
  private db: IDBDatabase | null = null

  async init() {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // Create object stores
        if (!db.objectStoreNames.contains("healthRecords")) {
          db.createObjectStore("healthRecords", { keyPath: "id" })
        }

        if (!db.objectStoreNames.contains("appointments")) {
          db.createObjectStore("appointments", { keyPath: "id" })
        }

        if (!db.objectStoreNames.contains("medicines")) {
          db.createObjectStore("medicines", { keyPath: "id" })
        }
      }
    })
  }

  async storeHealthRecords(records: any[]) {
    if (!this.db) await this.init()

    const transaction = this.db!.transaction(["healthRecords"], "readwrite")
    const store = transaction.objectStore("healthRecords")

    for (const record of records) {
      await store.put(record)
    }
  }

  async getHealthRecords(): Promise<any[]> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["healthRecords"], "readonly")
      const store = transaction.objectStore("healthRecords")
      const request = store.getAll()

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async storeAppointments(appointments: any[]) {
    if (!this.db) await this.init()

    const transaction = this.db!.transaction(["appointments"], "readwrite")
    const store = transaction.objectStore("appointments")

    for (const appointment of appointments) {
      await store.put(appointment)
    }
  }

  async getAppointments(): Promise<any[]> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["appointments"], "readonly")
      const store = transaction.objectStore("appointments")
      const request = store.getAll()

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }
}

export const offlineStorage = new OfflineStorage()
