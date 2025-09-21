"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Search, Plus, Edit, Package, Calendar } from "lucide-react"

const mockInventory = [
  {
    id: "MED001",
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    manufacturer: "Cipla",
    batchNumber: "PAR2024001",
    expiryDate: "2025-12-31",
    currentStock: 150,
    minStock: 50,
    maxStock: 500,
    unitPrice: 2.5,
    sellingPrice: 5.0,
    status: "available",
  },
  {
    id: "MED002",
    name: "Amlodipine 5mg",
    category: "Cardiovascular",
    manufacturer: "Sun Pharma",
    batchNumber: "AML2024002",
    expiryDate: "2025-08-15",
    currentStock: 25,
    minStock: 30,
    maxStock: 200,
    unitPrice: 8.0,
    sellingPrice: 15.0,
    status: "low_stock",
  },
  {
    id: "MED003",
    name: "Metformin 500mg",
    category: "Diabetes",
    manufacturer: "Dr. Reddy's",
    batchNumber: "MET2024003",
    expiryDate: "2025-06-30",
    currentStock: 80,
    minStock: 40,
    maxStock: 300,
    unitPrice: 3.5,
    sellingPrice: 7.0,
    status: "available",
  },
  {
    id: "MED004",
    name: "Cough Syrup",
    category: "Cold & Flu",
    manufacturer: "Himalaya",
    batchNumber: "COU2024004",
    expiryDate: "2024-03-15",
    currentStock: 12,
    minStock: 20,
    maxStock: 100,
    unitPrice: 45.0,
    sellingPrice: 85.0,
    status: "expiring_soon",
  },
  {
    id: "MED005",
    name: "Multivitamins",
    category: "Supplements",
    manufacturer: "Centrum",
    batchNumber: "MUL2024005",
    expiryDate: "2026-01-20",
    currentStock: 0,
    minStock: 25,
    maxStock: 150,
    unitPrice: 60.0,
    sellingPrice: 120.0,
    status: "out_of_stock",
  },
]

const categories = ["All", "Pain Relief", "Cardiovascular", "Diabetes", "Cold & Flu", "Supplements", "Antibiotics"]

export function InventoryManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddingMedicine, setIsAddingMedicine] = useState(false)
  const [selectedMedicine, setSelectedMedicine] = useState<any>(null)
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    category: "",
    manufacturer: "",
    batchNumber: "",
    expiryDate: "",
    currentStock: "",
    minStock: "",
    maxStock: "",
    unitPrice: "",
    sellingPrice: "",
  })

  const filteredInventory = mockInventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.batchNumber.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "All" || item.category === categoryFilter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleAddMedicine = () => {
    // Mock add functionality
    console.log("Adding medicine:", newMedicine)
    alert("Medicine added successfully!")
    setNewMedicine({
      name: "",
      category: "",
      manufacturer: "",
      batchNumber: "",
      expiryDate: "",
      currentStock: "",
      minStock: "",
      maxStock: "",
      unitPrice: "",
      sellingPrice: "",
    })
    setIsAddingMedicine(false)
  }

  const handleUpdateStock = (medicineId: string, newStock: number) => {
    // Mock update functionality
    console.log(`Updating stock for ${medicineId} to ${newStock}`)
    alert("Stock updated successfully!")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge variant="default">Available</Badge>
      case "low_stock":
        return <Badge variant="secondary">Low Stock</Badge>
      case "out_of_stock":
        return <Badge variant="destructive">Out of Stock</Badge>
      case "expiring_soon":
        return (
          <Badge variant="outline" className="border-orange-500 text-orange-600">
            Expiring Soon
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Inventory Management</CardTitle>
              <CardDescription>Manage your medicine stock and inventory</CardDescription>
            </div>
            <Dialog open={isAddingMedicine} onOpenChange={setIsAddingMedicine}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Medicine
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Medicine</DialogTitle>
                  <DialogDescription>Add a new medicine to your inventory</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Medicine Name</Label>
                    <Input
                      id="name"
                      value={newMedicine.name}
                      onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
                      placeholder="e.g., Paracetamol 500mg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newMedicine.category}
                      onValueChange={(value) => setNewMedicine({ ...newMedicine, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.slice(1).map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manufacturer">Manufacturer</Label>
                    <Input
                      id="manufacturer"
                      value={newMedicine.manufacturer}
                      onChange={(e) => setNewMedicine({ ...newMedicine, manufacturer: e.target.value })}
                      placeholder="e.g., Cipla"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="batchNumber">Batch Number</Label>
                    <Input
                      id="batchNumber"
                      value={newMedicine.batchNumber}
                      onChange={(e) => setNewMedicine({ ...newMedicine, batchNumber: e.target.value })}
                      placeholder="e.g., PAR2024001"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      type="date"
                      value={newMedicine.expiryDate}
                      onChange={(e) => setNewMedicine({ ...newMedicine, expiryDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentStock">Current Stock</Label>
                    <Input
                      id="currentStock"
                      type="number"
                      value={newMedicine.currentStock}
                      onChange={(e) => setNewMedicine({ ...newMedicine, currentStock: e.target.value })}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minStock">Minimum Stock</Label>
                    <Input
                      id="minStock"
                      type="number"
                      value={newMedicine.minStock}
                      onChange={(e) => setNewMedicine({ ...newMedicine, minStock: e.target.value })}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxStock">Maximum Stock</Label>
                    <Input
                      id="maxStock"
                      type="number"
                      value={newMedicine.maxStock}
                      onChange={(e) => setNewMedicine({ ...newMedicine, maxStock: e.target.value })}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unitPrice">Unit Price (₹)</Label>
                    <Input
                      id="unitPrice"
                      type="number"
                      step="0.01"
                      value={newMedicine.unitPrice}
                      onChange={(e) => setNewMedicine({ ...newMedicine, unitPrice: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sellingPrice">Selling Price (₹)</Label>
                    <Input
                      id="sellingPrice"
                      type="number"
                      step="0.01"
                      value={newMedicine.sellingPrice}
                      onChange={(e) => setNewMedicine({ ...newMedicine, sellingPrice: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setIsAddingMedicine(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddMedicine}>Add Medicine</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex items-center space-x-2 flex-1">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search medicines, manufacturers, or batch numbers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="low_stock">Low Stock</SelectItem>
                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                <SelectItem value="expiring_soon">Expiring Soon</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="grid" className="w-full">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="table">Table View</TabsTrigger>
            </TabsList>

            <TabsContent value="grid" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredInventory.map((medicine) => (
                  <Card key={medicine.id} className="relative">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">{medicine.name}</h4>
                          <p className="text-sm text-muted-foreground">{medicine.manufacturer}</p>
                        </div>
                        {getStatusBadge(medicine.status)}
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Category:</span>
                          <span className="font-medium">{medicine.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Current Stock:</span>
                          <span
                            className={`font-medium ${medicine.currentStock <= medicine.minStock ? "text-red-600" : ""}`}
                          >
                            {medicine.currentStock}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Min Stock:</span>
                          <span>{medicine.minStock}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Price:</span>
                          <span className="font-medium">₹{medicine.sellingPrice}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Expiry:</span>
                          <span
                            className={`text-xs ${new Date(medicine.expiryDate) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) ? "text-orange-600" : ""}`}
                          >
                            {medicine.expiryDate}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 bg-transparent"
                          onClick={() => {
                            const newStock = prompt(
                              `Update stock for ${medicine.name}:`,
                              medicine.currentStock.toString(),
                            )
                            if (newStock) handleUpdateStock(medicine.id, Number.parseInt(newStock))
                          }}
                        >
                          <Package className="h-3 w-3 mr-1" />
                          Update
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="table" className="space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-3 font-medium">Medicine</th>
                        <th className="text-left p-3 font-medium">Category</th>
                        <th className="text-left p-3 font-medium">Stock</th>
                        <th className="text-left p-3 font-medium">Price</th>
                        <th className="text-left p-3 font-medium">Expiry</th>
                        <th className="text-left p-3 font-medium">Status</th>
                        <th className="text-left p-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInventory.map((medicine) => (
                        <tr key={medicine.id} className="border-t">
                          <td className="p-3">
                            <div>
                              <p className="font-medium">{medicine.name}</p>
                              <p className="text-sm text-muted-foreground">{medicine.manufacturer}</p>
                            </div>
                          </td>
                          <td className="p-3">{medicine.category}</td>
                          <td className="p-3">
                            <span
                              className={medicine.currentStock <= medicine.minStock ? "text-red-600 font-medium" : ""}
                            >
                              {medicine.currentStock}
                            </span>
                            <span className="text-muted-foreground">/{medicine.maxStock}</span>
                          </td>
                          <td className="p-3">₹{medicine.sellingPrice}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-1">
                              {new Date(medicine.expiryDate) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) && (
                                <Calendar className="h-3 w-3 text-orange-600" />
                              )}
                              <span
                                className={
                                  new Date(medicine.expiryDate) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
                                    ? "text-orange-600"
                                    : ""
                                }
                              >
                                {medicine.expiryDate}
                              </span>
                            </div>
                          </td>
                          <td className="p-3">{getStatusBadge(medicine.status)}</td>
                          <td className="p-3">
                            <div className="flex gap-1">
                              <Button size="sm" variant="ghost">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  const newStock = prompt(
                                    `Update stock for ${medicine.name}:`,
                                    medicine.currentStock.toString(),
                                  )
                                  if (newStock) handleUpdateStock(medicine.id, Number.parseInt(newStock))
                                }}
                              >
                                <Package className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {filteredInventory.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Medicines Found</h3>
                <p className="text-muted-foreground">
                  No medicines match your current filters. Try adjusting your search criteria.
                </p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
