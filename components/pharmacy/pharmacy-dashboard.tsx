"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { InventoryManagement } from "./inventory-management"
import { PrescriptionOrders } from "./prescription-orders"
import { SalesReports } from "./sales-reports"
import { StockAlerts } from "./stock-alerts"
import {
  Package,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
  Heart,
  User,
  LogOut,
  Bell,
  Activity,
  Pill,
} from "lucide-react"

export function PharmacyDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  const todayStats = {
    totalSales: 15420,
    ordersProcessed: 23,
    lowStockItems: 8,
    prescriptionsFilled: 18,
  }

  const recentOrders = [
    {
      id: "ORD001",
      patient: "Rajesh Singh",
      doctor: "Dr. Priya Sharma",
      medicines: ["Amlodipine 5mg", "Paracetamol 500mg"],
      total: 125,
      status: "pending",
      time: "10:30 AM",
    },
    {
      id: "ORD002",
      patient: "Sunita Devi",
      doctor: "Dr. Rajesh Kumar",
      medicines: ["Metformin 500mg", "Multivitamins"],
      total: 180,
      status: "completed",
      time: "9:45 AM",
    },
    {
      id: "ORD003",
      patient: "Amit Kumar",
      doctor: "Dr. Amit Singh",
      medicines: ["Cough Syrup", "Throat Lozenges"],
      total: 95,
      status: "ready",
      time: "11:15 AM",
    },
  ]

  const lowStockItems = [
    { name: "Paracetamol 500mg", currentStock: 15, minStock: 50, category: "Pain Relief" },
    { name: "Cough Syrup", currentStock: 8, minStock: 20, category: "Cold & Flu" },
    { name: "Insulin Pen", currentStock: 3, minStock: 10, category: "Diabetes" },
    { name: "Blood Pressure Monitor", currentStock: 2, minStock: 5, category: "Medical Devices" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Nabha Health Connect</h1>
                <p className="text-sm text-muted-foreground">Pharmacy Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
                {lowStockItems.length > 0 && (
                  <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 text-xs">
                    {lowStockItems.length}
                  </Badge>
                )}
              </Button>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <div className="text-right">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">License: {user?.licenseNumber}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Inventory
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Alerts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Quick Stats */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{todayStats.totalSales.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+12% from yesterday</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Orders Processed</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todayStats.ordersProcessed}</div>
                  <p className="text-xs text-muted-foreground">3 pending</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Prescriptions Filled</CardTitle>
                  <Pill className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todayStats.prescriptionsFilled}</div>
                  <p className="text-xs text-muted-foreground">2 in progress</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{todayStats.lowStockItems}</div>
                  <p className="text-xs text-muted-foreground">Needs attention</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid gap-6 md:grid-cols-2 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest prescription orders and requests</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">{order.id}</p>
                          <Badge
                            variant={
                              order.status === "completed"
                                ? "default"
                                : order.status === "ready"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {order.patient} • {order.doctor}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {order.medicines.join(", ")} • ₹{order.total}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{order.time}</p>
                        {order.status === "pending" && (
                          <Button size="sm" className="mt-1">
                            Process
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent" onClick={() => setActiveTab("orders")}>
                    View All Orders
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Low Stock Alerts</CardTitle>
                  <CardDescription>Items that need restocking</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {lowStockItems.slice(0, 4).map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                        <p className="text-xs text-red-600">
                          Stock: {item.currentStock} (Min: {item.minStock})
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        Reorder
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent" onClick={() => setActiveTab("alerts")}>
                    View All Alerts
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inventory">
            <InventoryManagement />
          </TabsContent>

          <TabsContent value="orders">
            <PrescriptionOrders />
          </TabsContent>

          <TabsContent value="reports">
            <SalesReports />
          </TabsContent>

          <TabsContent value="alerts">
            <StockAlerts />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
