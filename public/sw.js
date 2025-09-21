const CACHE_NAME = "nabha-health-connect-v1"
const urlsToCache = ["/", "/patient", "/doctor", "/pharmacy", "/offline", "/manifest.json"]

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)))
})

// Fetch event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request)
      })
      .catch(() => {
        // Return offline page for navigation requests
        if (event.request.mode === "navigate") {
          return caches.match("/offline")
        }
      }),
  )
})

// Background sync for offline data
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(syncOfflineData())
  }
})

async function syncOfflineData() {
  // Sync offline data when connection is restored
  console.log("Syncing offline data...")
}
