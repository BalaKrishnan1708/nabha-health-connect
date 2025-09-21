import { WifiOff } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <WifiOff className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <CardTitle>You're Offline</CardTitle>
          <CardDescription>
            You're currently offline. Some features may be limited, but you can still access your cached health records.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center">
            Your data will sync automatically when you're back online.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
