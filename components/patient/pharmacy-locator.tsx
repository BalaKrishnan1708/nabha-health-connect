"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Phone, Clock, Search, CheckCircle, XCircle, AlertCircle } from "lucide-react"

const mockPharmacies = [
  {
    id: "1",
    name: "Nabha Medical Store",
    address: "Main Market, Nabha, Punjab",
    phone: "+91 9876543210",
    distance: "0.5 km",
    isOpen: true,
    openHours: "8:00 AM - 10:00 PM",
    rating: 4.5,
    medicines: [
      { name: "Paracetamol 500mg", available: true, price: 25 },
      { name: "Amlodipine 5mg", available: true, price: 45 },
      { name: "Cough Syrup", available: false, price: 85 },
      { name: "Multivitamins", available: true, price: 120 },
    ],
  },
  {
    id: "2",
    name: "City Pharmacy",
    address: "Civil Hospital Road, Nabha",
    phone: "+91 9876543211",
    distance: "1.2 km",
    isOpen: true,
    openHours: "9:00 AM - 9:00 PM",
    rating: 4.2,
    medicines: [
      { name: "Paracetamol 500mg", available: true, price: 28 },
      { name: "Amlodipine 5mg", available: false, price: 48 },
      { name: "Cough Syrup", available: true, price: 90 },
      { name: "Multivitamins", available: true, price: 115 },
    ],
  },
  {
    id: "3",
    name: "Health Plus Pharmacy",
    address: "Bus Stand, Nabha, Punjab",
    phone: "+91 9876543212",
    distance: "2.1 km",
    isOpen: false,
    openHours: "8:00 AM - 8:00 PM",
    rating: 4.0,
    medicines: [
      { name: "Paracetamol 500mg", available: true, price: 22 },
      { name: "Amlodipine 5mg", available: true, price: 42 },
      { name: "Cough Syrup", available: true, price: 80 },
      { name: "Multivitamins", available: false, price: 125 },
    ],
  },
]

export function PharmacyLocator() {
  const [searchMedicine, setSearchMedicine] = useState("")
  const [selectedPharmacy, setSelectedPharmacy] = useState<string | null>(null)

  const filteredPharmacies = searchMedicine
    ? mockPharmacies.filter((pharmacy) =>
        pharmacy.medicines.some((medicine) => medicine.name.toLowerCase().includes(searchMedicine.toLowerCase())),
      )
    : mockPharmacies

  const selectedPharmacyData = mockPharmacies.find((pharmacy) => pharmacy.id === selectedPharmacy)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Nearby Pharmacies
          </CardTitle>
          <CardDescription>Find medicines and check availability at local pharmacies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for medicines..."
              value={searchMedicine}
              onChange={(e) => setSearchMedicine(e.target.value)}
              className="flex-1"
            />
          </div>

          <Tabs defaultValue="list" className="w-full">
            <TabsList>
              <TabsTrigger value="list">All Pharmacies</TabsTrigger>
              <TabsTrigger value="availability">Medicine Availability</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              {filteredPharmacies.map((pharmacy) => (
                <Card
                  key={pharmacy.id}
                  className={`cursor-pointer transition-colors ${
                    selectedPharmacy === pharmacy.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedPharmacy(selectedPharmacy === pharmacy.id ? null : pharmacy.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{pharmacy.name}</h4>
                          <Badge variant={pharmacy.isOpen ? "default" : "secondary"}>
                            {pharmacy.isOpen ? "Open" : "Closed"}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{pharmacy.address}</span>
                            <span className="ml-2">({pharmacy.distance})</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            <span>{pharmacy.phone}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{pharmacy.openHours}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">★ {pharmacy.rating}</div>
                        <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </Button>
                      </div>
                    </div>

                    {selectedPharmacy === pharmacy.id && (
                      <div className="mt-4 pt-4 border-t">
                        <h5 className="font-medium mb-3">Medicine Availability</h5>
                        <div className="space-y-2">
                          {pharmacy.medicines.map((medicine, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                              <div className="flex items-center gap-2">
                                {medicine.available ? (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                ) : (
                                  <XCircle className="h-4 w-4 text-red-600" />
                                )}
                                <span className="text-sm">{medicine.name}</span>
                              </div>
                              <div className="text-sm font-medium">
                                {medicine.available ? `₹${medicine.price}` : "Out of Stock"}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="availability" className="space-y-4">
              {searchMedicine ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Availability for "{searchMedicine}"</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredPharmacies.map((pharmacy) => {
                        const matchingMedicines = pharmacy.medicines.filter((medicine) =>
                          medicine.name.toLowerCase().includes(searchMedicine.toLowerCase()),
                        )
                        return (
                          <div key={pharmacy.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="font-semibold">{pharmacy.name}</h4>
                                <p className="text-sm text-muted-foreground">{pharmacy.address}</p>
                              </div>
                              <Badge variant={pharmacy.isOpen ? "default" : "secondary"}>
                                {pharmacy.isOpen ? "Open" : "Closed"}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              {matchingMedicines.map((medicine, index) => (
                                <div key={index} className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    {medicine.available ? (
                                      <CheckCircle className="h-4 w-4 text-green-600" />
                                    ) : (
                                      <XCircle className="h-4 w-4 text-red-600" />
                                    )}
                                    <span className="text-sm">{medicine.name}</span>
                                  </div>
                                  <div className="text-sm font-medium">
                                    {medicine.available ? `₹${medicine.price}` : "Out of Stock"}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Search for Medicines</h3>
                    <p className="text-muted-foreground">
                      Enter a medicine name above to check availability across all pharmacies
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Emergency Pharmacies</CardTitle>
          <CardDescription>24/7 pharmacy services in Nabha</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">Apollo Pharmacy</h4>
                <p className="text-sm text-muted-foreground">GT Road, Nabha - 24/7 Service</p>
              </div>
              <Button variant="outline" size="sm">
                <Phone className="h-3 w-3 mr-1" />
                Call
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">MedPlus Pharmacy</h4>
                <p className="text-sm text-muted-foreground">Civil Hospital - Emergency Hours</p>
              </div>
              <Button variant="outline" size="sm">
                <Phone className="h-3 w-3 mr-1" />
                Call
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
