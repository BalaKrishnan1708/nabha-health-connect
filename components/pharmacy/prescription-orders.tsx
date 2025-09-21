"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Eye, CheckCircle, Clock, FileText, Phone, User, Calendar } from "lucide-react"

const mockOrders = [
  {
    id: "ORD001",
    patient: "Rajesh Singh",
    patientPhone: "+91 9876543210",
    doctor: "Dr. Priya Sharma",
    prescriptionDate: "2024-01-15",
    orderDate: "2024-01-15",
    orderTime: "10:30 AM",
    status: "pending",
    priority: "normal",
    medicines: [
      { name: "Amlodipine 5mg", quantity: 30, dosage: "Once daily", available: true },
      { name: "Paracetamol 500mg", quantity: 20, dosage: "As needed", available: true },
    ],
    total: 125,
    notes: "Patient has mild hypertension. Monitor blood pressure regularly.",
  },
  {
    id: "ORD002",
    patient: "Sunita Devi",
    patientPhone: "+91 9876543211",
    doctor: "Dr. Rajesh Kumar",
    prescriptionDate: "2024-01-15",
    orderDate: "2024-01-15",
    orderTime: "9:45 AM",
    status: "ready",
    priority: "normal",
    medicines: [
      { name: "Metformin 500mg", quantity: 60, dosage: "Twice daily", available: true },
      { name: "Multivitamins", quantity: 30, dosage: "Once daily", available: true },
    ],
    total: 180,
    notes: "Diabetes management. Follow up in 3 months.",
  },
  {
    id: "ORD003",
    patient: "Amit Kumar",
    patientPhone: "+91 9876543212",
    doctor: "Dr. Amit Singh",
    prescriptionDate: "2024-01-15",
    orderDate: "2024-01-15",
    orderTime: "11:15 AM",
    status: "completed",
    priority: "normal",
    medicines: [
      { name: "Cough Syrup", quantity: 1, dosage: "10ml thrice daily", available: false },
      { name: "Throat Lozenges", quantity: 2, dosage: "As needed", available: true },
    ],
    total: 95,
    notes: "Common cold symptoms. Complete the course.",
  },
  {
    id: "ORD004",
    patient: "Priya Sharma",
    patientPhone: "+91 9876543213",
    doctor: "Dr. Rajesh Kumar",
    prescriptionDate: "2024-01-15",
    orderDate: "2024-01-15",
    orderTime: "2:20 PM",
    status: "urgent",
    priority: "high",
    medicines: [
      { name: "Insulin Pen", quantity: 2, dosage: "As prescribed", available: true },
      { name: "Blood Glucose Strips", quantity: 50, dosage: "For testing", available: true },
    ],
    total: 450,
    notes: "Urgent diabetes medication refill. Patient needs immediate supply.",
  },
]

export function PrescriptionOrders() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isViewingOrder, setIsViewingOrder] = useState(false)

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.doctor.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesPriority = priorityFilter === "all" || order.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    // Mock status update
    console.log(`Updating order ${orderId} to ${newStatus}`)
    alert(`Order ${orderId} status updated to ${newStatus}`)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "processing":
        return <Badge variant="secondary">Processing</Badge>
      case "ready":
        return <Badge variant="default">Ready</Badge>
      case "completed":
        return (
          <Badge variant="outline" className="border-green-500 text-green-600">
            Completed
          </Badge>
        )
      case "urgent":
        return <Badge variant="destructive">Urgent</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "normal":
        return <Badge variant="outline">Normal</Badge>
      case "low":
        return <Badge variant="secondary">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Prescription Orders</CardTitle>
          <CardDescription>Manage and process prescription orders from doctors</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex items-center space-x-2 flex-1">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by order ID, patient, or doctor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="active" className="w-full">
            <TabsList>
              <TabsTrigger value="active">Active Orders</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="urgent">Urgent</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {filteredOrders
                .filter((order) => !["completed"].includes(order.status))
                .map((order) => (
                  <Card key={order.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{order.id}</h4>
                            {getStatusBadge(order.status)}
                            {getPriorityBadge(order.priority)}
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                            <div>
                              <div className="flex items-center gap-1 mb-1">
                                <User className="h-3 w-3" />
                                <span className="font-medium">{order.patient}</span>
                              </div>
                              <div className="flex items-center gap-1 mb-1">
                                <Phone className="h-3 w-3" />
                                <span className="text-muted-foreground">{order.patientPhone}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <FileText className="h-3 w-3" />
                                <span className="text-muted-foreground">{order.doctor}</span>
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center gap-1 mb-1">
                                <Calendar className="h-3 w-3" />
                                <span className="text-muted-foreground">
                                  {order.orderDate} at {order.orderTime}
                                </span>
                              </div>
                              <p className="font-medium">Total: ₹{order.total}</p>
                              <p className="text-sm text-muted-foreground">{order.medicines.length} medicine(s)</p>
                            </div>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Medicines: </span>
                            <span className="text-muted-foreground">
                              {order.medicines.map((med) => med.name).join(", ")}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Dialog
                            open={isViewingOrder && selectedOrder?.id === order.id}
                            onOpenChange={(open) => {
                              setIsViewingOrder(open)
                              if (!open) setSelectedOrder(null)
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" onClick={() => setSelectedOrder(order)}>
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Order Details - {order.id}</DialogTitle>
                                <DialogDescription>Prescription order for {order.patient}</DialogDescription>
                              </DialogHeader>
                              {selectedOrder && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <h4 className="font-medium mb-2">Patient Information</h4>
                                      <p>Name: {selectedOrder.patient}</p>
                                      <p>Phone: {selectedOrder.patientPhone}</p>
                                      <p>Doctor: {selectedOrder.doctor}</p>
                                    </div>
                                    <div>
                                      <h4 className="font-medium mb-2">Order Information</h4>
                                      <p>Order Date: {selectedOrder.orderDate}</p>
                                      <p>Order Time: {selectedOrder.orderTime}</p>
                                      <p>Status: {selectedOrder.status}</p>
                                      <p>Priority: {selectedOrder.priority}</p>
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-medium mb-2">Prescribed Medicines</h4>
                                    <div className="space-y-2">
                                      {selectedOrder.medicines.map((medicine: any, index: number) => (
                                        <div
                                          key={index}
                                          className="flex justify-between items-center p-2 border rounded"
                                        >
                                          <div>
                                            <p className="font-medium">{medicine.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                              Qty: {medicine.quantity} • {medicine.dosage}
                                            </p>
                                          </div>
                                          <Badge variant={medicine.available ? "default" : "destructive"}>
                                            {medicine.available ? "Available" : "Out of Stock"}
                                          </Badge>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-medium mb-2">Doctor's Notes</h4>
                                    <p className="text-sm text-muted-foreground p-2 bg-muted rounded">
                                      {selectedOrder.notes}
                                    </p>
                                  </div>

                                  <div className="flex justify-between items-center pt-4 border-t">
                                    <p className="text-lg font-semibold">Total: ₹{selectedOrder.total}</p>
                                    <div className="flex gap-2">
                                      {selectedOrder.status === "pending" && (
                                        <Button
                                          size="sm"
                                          onClick={() => handleStatusUpdate(selectedOrder.id, "processing")}
                                        >
                                          Start Processing
                                        </Button>
                                      )}
                                      {selectedOrder.status === "processing" && (
                                        <Button size="sm" onClick={() => handleStatusUpdate(selectedOrder.id, "ready")}>
                                          Mark Ready
                                        </Button>
                                      )}
                                      {selectedOrder.status === "ready" && (
                                        <Button
                                          size="sm"
                                          onClick={() => handleStatusUpdate(selectedOrder.id, "completed")}
                                        >
                                          Complete Order
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          {order.status === "pending" && (
                            <Button size="sm" onClick={() => handleStatusUpdate(order.id, "processing")}>
                              <Clock className="h-3 w-3 mr-1" />
                              Process
                            </Button>
                          )}
                          {order.status === "processing" && (
                            <Button size="sm" onClick={() => handleStatusUpdate(order.id, "ready")}>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Ready
                            </Button>
                          )}
                          {order.status === "ready" && (
                            <Button size="sm" onClick={() => handleStatusUpdate(order.id, "completed")}>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Complete
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {filteredOrders
                .filter((order) => order.status === "completed")
                .map((order) => (
                  <Card key={order.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{order.id}</h4>
                            {getStatusBadge(order.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {order.patient} • {order.doctor} • ₹{order.total}
                          </p>
                          <p className="text-xs text-muted-foreground">Completed on {order.orderDate}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>

            <TabsContent value="urgent" className="space-y-4">
              {filteredOrders
                .filter((order) => order.status === "urgent" || order.priority === "high")
                .map((order) => (
                  <Card key={order.id} className="border-red-200">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-red-600">{order.id}</h4>
                            {getStatusBadge(order.status)}
                            {getPriorityBadge(order.priority)}
                          </div>
                          <p className="text-sm mb-1">
                            <span className="font-medium">{order.patient}</span> • {order.doctor}
                          </p>
                          <p className="text-sm text-muted-foreground mb-2">{order.notes}</p>
                          <p className="text-sm">
                            <span className="font-medium">Medicines: </span>
                            {order.medicines.map((med) => med.name).join(", ")}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-red-600">₹{order.total}</p>
                          <Button size="sm" className="mt-2">
                            Process Urgently
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
          </Tabs>

          {filteredOrders.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Orders Found</h3>
                <p className="text-muted-foreground">No prescription orders match your current filters.</p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
