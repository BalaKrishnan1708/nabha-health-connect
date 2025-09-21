"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Users, MapPin, Activity, TrendingUp, Clock, Shield, Brain, Wifi } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface AnalyticsData {
  villagesServed: number
  totalUsers: number
  activeConsultations: number
  offlineUsers: number
  aiAccuracy: number
  responseTime: number
  systemUptime: number
  securityAlerts: number
}

export function AnalyticsDashboard() {
  const { t } = useLanguage()
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    villagesServed: 173,
    totalUsers: 12847,
    activeConsultations: 23,
    offlineUsers: 156,
    aiAccuracy: 95.2,
    responseTime: 87,
    systemUptime: 99.8,
    securityAlerts: 2,
  })

  const [realTimeData, setRealTimeData] = useState({
    consultationsToday: 89,
    newRegistrations: 34,
    medicineRequests: 67,
    emergencyAlerts: 3,
  })

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setAnalytics((prev) => ({
        ...prev,
        activeConsultations: Math.max(0, prev.activeConsultations + Math.floor(Math.random() * 6) - 3),
        offlineUsers: Math.max(0, prev.offlineUsers + Math.floor(Math.random() * 20) - 10),
        responseTime: Math.max(50, prev.responseTime + Math.floor(Math.random() * 20) - 10),
      }))

      setRealTimeData((prev) => ({
        ...prev,
        consultationsToday: prev.consultationsToday + Math.floor(Math.random() * 2),
        medicineRequests: prev.medicineRequests + Math.floor(Math.random() * 3),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const StatCard = ({
    title,
    value,
    icon: Icon,
    trend,
    color = "text-primary",
  }: {
    title: string
    value: string | number
    icon: any
    trend?: string
    color?: string
  }) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            {trend && (
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {trend}
              </p>
            )}
          </div>
          <Icon className={`h-8 w-8 ${color}`} />
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t("admin.analytics")}</h2>
        <Badge variant="outline" className="text-green-600">
          <Activity className="h-3 w-3 mr-1" />
          {t("admin.realTime")}
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={t("admin.villagesServed")}
          value={analytics.villagesServed}
          icon={MapPin}
          trend="+12 this month"
          color="text-blue-600"
        />
        <StatCard
          title={t("admin.totalUsers")}
          value={analytics.totalUsers.toLocaleString()}
          icon={Users}
          trend="+8.2%"
          color="text-green-600"
        />
        <StatCard
          title={t("admin.activeConsultations")}
          value={analytics.activeConsultations}
          icon={Activity}
          color="text-orange-600"
        />
        <StatCard title={t("admin.offlineUsers")} value={analytics.offlineUsers} icon={Wifi} color="text-purple-600" />
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              {t("admin.aiPerformance")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>{t("admin.accuracy")}</span>
                <span className="font-semibold">{analytics.aiAccuracy}%</span>
              </div>
              <Progress value={analytics.aiAccuracy} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>{t("admin.responseTime")}</span>
                <span className="font-semibold">&lt;{analytics.responseTime}ms</span>
              </div>
              <Progress value={100 - analytics.responseTime} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              {t("admin.systemHealth")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>{t("admin.uptime")}</span>
                <span className="font-semibold">{analytics.systemUptime}%</span>
              </div>
              <Progress value={analytics.systemUptime} className="h-2" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">{t("admin.securityAlerts")}</span>
              <Badge variant={analytics.securityAlerts > 0 ? "destructive" : "secondary"}>
                {analytics.securityAlerts}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              {t("admin.todayStats")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">{t("admin.consultations")}</span>
              <span className="font-semibold">{realTimeData.consultationsToday}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">{t("admin.newUsers")}</span>
              <span className="font-semibold">{realTimeData.newRegistrations}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">{t("admin.medicineRequests")}</span>
              <span className="font-semibold">{realTimeData.medicineRequests}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">{t("admin.emergencies")}</span>
              <Badge variant={realTimeData.emergencyAlerts > 0 ? "destructive" : "secondary"}>
                {realTimeData.emergencyAlerts}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Technical Specifications */}
      <Card>
        <CardHeader>
          <CardTitle>{t("admin.technicalSpecs")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="space-y-1">
              <p className="font-semibold">{t("admin.authentication")}</p>
              <p className="text-muted-foreground">JWT + OAuth</p>
              <p className="text-muted-foreground">Multi-factor Auth</p>
              <p className="text-muted-foreground">Biometric + PIN</p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold">{t("admin.encryption")}</p>
              <p className="text-muted-foreground">AES-256</p>
              <p className="text-muted-foreground">End-to-End</p>
              <p className="text-muted-foreground">FHIR Compliant</p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold">{t("admin.videoTech")}</p>
              <p className="text-muted-foreground">WebRTC P2P</p>
              <p className="text-muted-foreground">2G Optimized</p>
              <p className="text-muted-foreground">&lt;1MB/min</p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold">{t("admin.aiTech")}</p>
              <p className="text-muted-foreground">BERT + XGBoost</p>
              <p className="text-muted-foreground">95% Accuracy</p>
              <p className="text-muted-foreground">&lt;100ms Response</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
