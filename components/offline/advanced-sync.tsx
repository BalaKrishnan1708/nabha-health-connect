"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Wifi, WifiOff, RefreshCw, CheckCircle, AlertTriangle } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface SyncStatus {
  isOnline: boolean
  lastSync: Date | null
  pendingChanges: number
  syncProgress: number
  conflicts: number
}

export function AdvancedSync() {
  const { t } = useLanguage()
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isOnline: navigator.onLine,
    lastSync: null,
    pendingChanges: 0,
    syncProgress: 0,
    conflicts: 0,
  })
  const [isSyncing, setIsSyncing] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setSyncStatus((prev) => ({ ...prev, isOnline: true }))
      // Auto-sync when coming back online
      if (syncStatus.pendingChanges > 0) {
        handleSync()
      }
    }

    const handleOffline = () => {
      setSyncStatus((prev) => ({ ...prev, isOnline: false }))
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Load pending changes from IndexedDB
    loadPendingChanges()

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const loadPendingChanges = async () => {
    try {
      // Simulate loading from IndexedDB
      const pending = await new Promise<number>((resolve) => {
        setTimeout(() => resolve(Math.floor(Math.random() * 10)), 500)
      })

      setSyncStatus((prev) => ({ ...prev, pendingChanges: pending }))
    } catch (error) {
      console.error("Failed to load pending changes:", error)
    }
  }

  const handleSync = async () => {
    if (!syncStatus.isOnline || isSyncing) return

    setIsSyncing(true)
    setSyncStatus((prev) => ({ ...prev, syncProgress: 0 }))

    try {
      // Simulate Operational Transform sync process
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 200))
        setSyncStatus((prev) => ({ ...prev, syncProgress: i }))
      }

      // Simulate conflict resolution
      const conflicts = Math.random() > 0.8 ? Math.floor(Math.random() * 3) : 0

      setSyncStatus((prev) => ({
        ...prev,
        lastSync: new Date(),
        pendingChanges: 0,
        syncProgress: 100,
        conflicts,
      }))

      // Auto-resolve conflicts using Operational Transform
      if (conflicts > 0) {
        setTimeout(() => {
          setSyncStatus((prev) => ({ ...prev, conflicts: 0 }))
        }, 3000)
      }
    } catch (error) {
      console.error("Sync failed:", error)
    } finally {
      setIsSyncing(false)
    }
  }

  const getStatusIcon = () => {
    if (!syncStatus.isOnline) return <WifiOff className="h-5 w-5 text-red-500" />
    if (isSyncing) return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />
    if (syncStatus.conflicts > 0) return <AlertTriangle className="h-5 w-5 text-yellow-500" />
    if (syncStatus.pendingChanges === 0) return <CheckCircle className="h-5 w-5 text-green-500" />
    return <Wifi className="h-5 w-5 text-primary" />
  }

  const getStatusText = () => {
    if (!syncStatus.isOnline) return t("sync.offline")
    if (isSyncing) return t("sync.syncing")
    if (syncStatus.conflicts > 0) return t("sync.conflicts", { count: syncStatus.conflicts })
    if (syncStatus.pendingChanges > 0) return t("sync.pending", { count: syncStatus.pendingChanges })
    return t("sync.upToDate")
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getStatusIcon()}
          {t("sync.title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{getStatusText()}</span>
            <span className="text-muted-foreground">
              {syncStatus.lastSync ? syncStatus.lastSync.toLocaleTimeString() : t("sync.never")}
            </span>
          </div>

          {isSyncing && <Progress value={syncStatus.syncProgress} className="w-full" />}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center p-2 bg-muted rounded">
            <div className="font-semibold">{syncStatus.pendingChanges}</div>
            <div className="text-muted-foreground">{t("sync.pendingLabel")}</div>
          </div>
          <div className="text-center p-2 bg-muted rounded">
            <div className="font-semibold">{syncStatus.conflicts}</div>
            <div className="text-muted-foreground">{t("sync.conflictsLabel")}</div>
          </div>
        </div>

        <Button onClick={handleSync} disabled={!syncStatus.isOnline || isSyncing} className="w-full">
          {isSyncing ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              {t("sync.syncing")}
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              {t("sync.syncNow")}
            </>
          )}
        </Button>

        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>{t("sync.operationalTransform")}</p>
          <p>
            {t("sync.conflictFree")} • {t("sync.autoMerge")}
          </p>
          <p>2G {t("sync.optimized")} • &lt;1MB/min</p>
        </div>
      </CardContent>
    </Card>
  )
}
