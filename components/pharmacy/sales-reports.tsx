"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, DollarSign, Package, Users, Calendar, Download } from "lucide-react"

const mockSalesData = {
  today: {
    revenue: 15420,
    orders: 23,
    customers: 18,
    avgOrderValue: 670,
    topSellingMedicines: [
      { name: "Paracetamol 500mg", quantity: 45, revenue: 225 },
      { name: "Amlodipine 5mg", quantity: 28, revenue: 420 },
      { name: "Metformin 500mg", quantity: 22, revenue: 154 },
    ],
  },
  weekly: {
    revenue: 98750,
    orders: 156,
    customers: 89,
    avgOrderValue: 633,
    growth: 12.5,
  },
  monthly: {
    revenue: 425600,
    orders: 678,
    customers: 234,
    avgOrderValue: 628,
    growth: 8.3,
  },
}

const recentTransactions = [
  {
    id: "TXN001",
    time: "2:30 PM",
    customer: "Rajesh Singh",
    medicines: ["Paracetamol 500mg", "Cough Syrup"],
    amount: 110,
    paymentMethod: "Cash",
  },
  {
    id: "TXN002",
    time: "1:45 PM",
    customer: "Priya Sharma",
    medicines: ["Insulin Pen", "Blood Glucose Strips"],
    amount: 450,
    paymentMethod: "UPI",
  },
  {
    id: "TXN003",
    time: "12:20 PM",
    customer: "Amit Kumar",
    medicines: ["Multivitamins", "Calcium Tablets"],
    amount: 185,
    paymentMethod: "Card",
  },
  {
    id: "TXN004",
    time: "11:30 AM",
    customer: "Sunita Devi",
    medicines: ["Metformin 500mg", "Amlodipine 5mg"],
    amount: 175,
    paymentMethod: "Cash",
  },
]

export function SalesReports() {
  const [selectedPeriod, setSelectedPeriod] = useState("today")

  const getCurrentData = () => {
    switch (selectedPeriod) {
      case "weekly":
        return mockSalesData.weekly
      case "monthly":
        return mockSalesData.monthly
      default:
        return mockSalesData.today
    }
  }

  const currentData = getCurrentData()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Sales Reports</CardTitle>
              <CardDescription>Track your pharmacy's sales performance and analytics</CardDescription>
            </div>
            <div className="flex gap-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="weekly">This Week</SelectItem>
                  <SelectItem value="monthly">This Month</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="products">Top Products</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹{currentData.revenue.toLocaleString()}</div>
                    {selectedPeriod !== "today" && currentData.growth && (
                      <p className="text-xs text-muted-foreground flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1 text-green-600" />+{currentData.growth}% from last period
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{currentData.orders}</div>
                    <p className="text-xs text-muted-foreground">
                      {selectedPeriod === "today" ? "orders processed" : "orders completed"}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Customers Served</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{currentData.customers}</div>
                    <p className="text-xs text-muted-foreground">unique customers</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹{currentData.avgOrderValue}</div>
                    <p className="text-xs text-muted-foreground">per order</p>
                  </CardContent>
                </Card>
              </div>

              {/* Sales Chart Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle>Sales Trend</CardTitle>
                  <CardDescription>Revenue and order trends over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Sales Chart</h3>
                      <p className="text-muted-foreground">
                        Interactive sales chart will be implemented with a charting library
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Top Selling Products</CardTitle>
                  <CardDescription>Best performing medicines for {selectedPeriod}</CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedPeriod === "today" && mockSalesData.today.topSellingMedicines ? (
                    <div className="space-y-4">
                      {mockSalesData.today.topSellingMedicines.map((medicine, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium">{medicine.name}</p>
                              <p className="text-sm text-muted-foreground">{medicine.quantity} units sold</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">₹{medicine.revenue}</p>
                            <p className="text-sm text-muted-foreground">revenue</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Product Analytics</h3>
                      <p className="text-muted-foreground">
                        Detailed product performance data for {selectedPeriod} will be displayed here
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Latest sales transactions and payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium">{transaction.id}</p>
                            <Badge variant="outline">{transaction.paymentMethod}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">Customer: {transaction.customer}</p>
                          <p className="text-xs text-muted-foreground">{transaction.medicines.join(", ")}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{transaction.amount}</p>
                          <p className="text-xs text-muted-foreground flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {transaction.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Methods Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Breakdown of payment methods used today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold">₹8,450</p>
                      <p className="text-sm text-muted-foreground">Cash Payments</p>
                      <Badge variant="outline" className="mt-1">
                        55%
                      </Badge>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold">₹4,720</p>
                      <p className="text-sm text-muted-foreground">UPI Payments</p>
                      <Badge variant="outline" className="mt-1">
                        31%
                      </Badge>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold">₹2,250</p>
                      <p className="text-sm text-muted-foreground">Card Payments</p>
                      <Badge variant="outline" className="mt-1">
                        14%
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
