"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AlertTriangle, Calendar, Package, ShoppingCart, CheckCircle, XCircle, Plus } from "lucide-react"

const mockAlerts = [
  {
    id: "ALT001",
    type: "low_stock",
    medicine: "Paracetamol 500mg",
    category: "Pain Relief",
    currentStock: 15,
    minStock: 50,
    maxStock: 500,
    priority: "high",
    createdDate: "2024-01-15",
    status: "active",
  },
  {
    id: "ALT002",
    type: "out_of_stock",
    medicine: "Insulin Pen",
    category: "Diabetes",
    currentStock: 0,
    minStock: 10,
    maxStock: 50,
    priority: "critical",
    createdDate: "2024-01-14",
    status: "active",
  },
  {
    id: "ALT003",
    type: "expiring_soon",
    medicine: "Cough Syrup",
    category: "Cold & Flu",
    currentStock: 12,
    minStock: 20,
    maxStock: 100,
    expiryDate: "2024-03-15",
    priority: "medium",
    createdDate: "2024-01-13",
    status: "active",
  },
  {
    id: "ALT004",
    type: "low_stock",
    medicine: "Blood Pressure Monitor",
    category: "Medical Devices",
    currentStock: 2,
    minStock: 5,
    maxStock: 20,
    priority: "medium",
    createdDate: "2024-01-12",
    status: "resolved",
  },
  {
    id: "ALT005",
    type: "overstock",
    medicine: "Vitamin C Tablets",
    category: "Supplements",
    currentStock: 450,
    minStock: 50,
    maxStock: 200,
    priority: "low",
    createdDate: "2024-01-10",
    status: "active",
  },
]

const reorderSuggestions = [
  {
    medicine: "Paracetamol 500mg",
    suggestedQuantity: 200,
    estimatedCost: 500,
    supplier: "Cipla Distributors",
    leadTime: "2-3 days",
  },
  {
    medicine: "Insulin Pen",
    suggestedQuantity: 25,
    estimatedCost: 1250,
    supplier: "Novo Nordisk",
    leadTime: "1-2 days",
  },
  {
    medicine: "Cough Syrup",
    suggestedQuantity: 50,
    estimatedCost: 2250,
    supplier: "Himalaya Wellness",
    leadTime: "3-4 days",
  },
]

export function StockAlerts() {
  const [selectedTab, setSelectedTab] = useState("active")
  const [isCreatingOrder, setIsCreatingOrder] = useState(false)
  const [selectedReorder, setSelectedReorder] = useState<any>(null)

  const activeAlerts = mockAlerts.filter((alert) => alert.status === "active")
  const resolvedAlerts = mockAlerts.filter((alert) => alert.status === "resolved")

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "low_stock":
        return <Package className="h-4 w-4" />
      case "out_of_stock":
        return <XCircle className="h-4 w-4" />
      case "expiring_soon":
        return <Calendar className="h-4 w-4" />
      case "overstock":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const getAlertBadge = (type: string, priority: string) => {
    const getVariant = () => {
      switch (priority) {
        case "critical":
          return "destructive"
        case "high":
          return "destructive"
        case "medium":
          return "secondary"
        case "low":
          return "outline"
        default:
          return "outline"
      }
    }

    const getLabel = () => {
      switch (type) {
        case "low_stock":
          return "Low Stock"
        case "out_of_stock":
          return "Out of Stock"
        case "expiring_soon":
          return "Expiring Soon"
        case "overstock":
          return "Overstock"
        default:
          return type
      }
    }

    return <Badge variant={getVariant()}>{getLabel()}</Badge>
  }

  const handleResolveAlert = (alertId: string) => {
    // Mock resolve functionality
    console.log(`Resolving alert ${alertId}`)
    alert("Alert marked as resolved!")
  }

  const handleCreateReorder = (medicine: any) => {
    // Mock reorder functionality
    console.log("Creating reorder for:", medicine)
    alert(`Reorder created for ${medicine.medicine}!`)
    setIsCreatingOrder(false)
    setSelectedReorder(null)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Stock Alerts & Notifications</CardTitle>
          <CardDescription>Monitor inventory levels and manage stock alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList>
              <TabsTrigger value="active" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Active Alerts ({activeAlerts.length})
              </TabsTrigger>
              <TabsTrigger value="reorder">Reorder Suggestions</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
              <TabsTrigger value="settings">Alert Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {activeAlerts.length > 0 ? (
                <div className="space-y-4">
                  {activeAlerts.map((alert) => (
                    <Card key={alert.id} className={`${alert.priority === "critical" ? "border-red-500" : ""}`}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="mt-1">{getAlertIcon(alert.type)}</div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold">{alert.medicine}</h4>
                                {getAlertBadge(alert.type, alert.priority)}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{alert.category}</p>

                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="font-medium">Current Stock: </span>
                                  <span
                                    className={alert.currentStock <= alert.minStock ? "text-red-600 font-medium" : ""}
                                  >
                                    {alert.currentStock}
                                  </span>
                                </div>
                                <div>
                                  <span className="font-medium">Min Stock: </span>
                                  <span>{alert.minStock}</span>
                                </div>
                                {alert.expiryDate && (
                                  <div className="col-span-2">
                                    <span className="font-medium">Expiry Date: </span>
                                    <span className="text-orange-600">{alert.expiryDate}</span>
                                  </div>
                                )}
                              </div>

                              <p className="text-xs text-muted-foreground mt-2">Alert created: {alert.createdDate}</p>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            {(alert.type === "low_stock" || alert.type === "out_of_stock") && (
                              <Button size="sm" variant="outline">
                                <ShoppingCart className="h-3 w-3 mr-1" />
                                Reorder
                              </Button>
                            )}
                            <Button size="sm" variant="outline" onClick={() => handleResolveAlert(alert.id)}>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Resolve
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Active Alerts</h3>
                    <p className="text-muted-foreground">All your inventory levels are within normal ranges.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="reorder" className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Reorder Suggestions</h3>
                  <p className="text-sm text-muted-foreground">
                    AI-powered recommendations based on your sales patterns
                  </p>
                </div>
                <Dialog open={isCreatingOrder} onOpenChange={setIsCreatingOrder}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Custom Order
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Reorder</DialogTitle>
                      <DialogDescription>
                        {selectedReorder ? `Reorder ${selectedReorder.medicine}` : "Create a custom reorder"}
                      </DialogDescription>
                    </DialogHeader>
                    {selectedReorder && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Medicine</Label>
                            <Input value={selectedReorder.medicine} readOnly />
                          </div>
                          <div className="space-y-2">
                            <Label>Suggested Quantity</Label>
                            <Input value={selectedReorder.suggestedQuantity} />
                          </div>
                          <div className="space-y-2">
                            <Label>Supplier</Label>
                            <Input value={selectedReorder.supplier} />
                          </div>
                          <div className="space-y-2">
                            <Label>Estimated Cost</Label>
                            <Input value={`₹${selectedReorder.estimatedCost}`} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Lead Time</Label>
                          <Input value={selectedReorder.leadTime} readOnly />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setIsCreatingOrder(false)}>
                            Cancel
                          </Button>
                          <Button onClick={() => handleCreateReorder(selectedReorder)}>Create Order</Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {reorderSuggestions.map((suggestion, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{suggestion.medicine}</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Suggested Quantity: </span>
                              <span>{suggestion.suggestedQuantity} units</span>
                            </div>
                            <div>
                              <span className="font-medium">Estimated Cost: </span>
                              <span>₹{suggestion.estimatedCost}</span>
                            </div>
                            <div>
                              <span className="font-medium">Supplier: </span>
                              <span>{suggestion.supplier}</span>
                            </div>
                            <div>
                              <span className="font-medium">Lead Time: </span>
                              <span>{suggestion.leadTime}</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedReorder(suggestion)
                            setIsCreatingOrder(true)
                          }}
                        >
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Order Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="resolved" className="space-y-4">
              {resolvedAlerts.length > 0 ? (
                <div className="space-y-4">
                  {resolvedAlerts.map((alert) => (
                    <Card key={alert.id} className="opacity-75">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{alert.medicine}</h4>
                              <Badge variant="outline" className="border-green-500 text-green-600">
                                Resolved
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {alert.category} • Alert created: {alert.createdDate}
                            </p>
                          </div>
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Resolved Alerts</h3>
                    <p className="text-muted-foreground">Resolved alerts will appear here for your reference.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Alert Configuration</CardTitle>
                  <CardDescription>Configure when and how you receive stock alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Low Stock Threshold (%)</Label>
                      <Input defaultValue="20" type="number" />
                      <p className="text-xs text-muted-foreground">
                        Alert when stock falls below this percentage of max stock
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label>Expiry Warning (days)</Label>
                      <Input defaultValue="90" type="number" />
                      <p className="text-xs text-muted-foreground">Alert when medicines expire within this many days</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Overstock Threshold (%)</Label>
                      <Input defaultValue="150" type="number" />
                      <p className="text-xs text-muted-foreground">
                        Alert when stock exceeds this percentage of max stock
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label>Alert Check Frequency</Label>
                      <Input defaultValue="Daily" readOnly />
                      <p className="text-xs text-muted-foreground">How often to check for new alerts</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-3">Notification Preferences</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">SMS Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive critical alerts via SMS</p>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Dashboard Notifications</p>
                          <p className="text-sm text-muted-foreground">Show alerts in dashboard</p>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">Save Alert Settings</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
