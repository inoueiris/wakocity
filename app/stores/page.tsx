"use client"

import { useState } from "react"
import { MapPin, Phone, Clock, List, Map, Navigation } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"

const stores = [
  {
    id: 1,
    name: "スーパーマーケットA",
    category: "スーパーマーケット",
    address: "〇〇市中央区1-2-3",
    phone: "012-345-6789",
    hours: "9:00 - 21:00",
    distance: "0.5km",
    lat: 35.6812,
    lng: 139.7671,
  },
  {
    id: 2,
    name: "ファミリーレストランB",
    category: "飲食店",
    address: "〇〇市中央区2-3-4",
    phone: "012-345-6790",
    hours: "11:00 - 22:00",
    distance: "0.8km",
    lat: 35.6822,
    lng: 139.7681,
  },
  {
    id: 3,
    name: "ドラッグストアC",
    category: "ドラッグストア",
    address: "〇〇市中央区3-4-5",
    phone: "012-345-6791",
    hours: "10:00 - 20:00",
    distance: "1.2km",
    lat: 35.6802,
    lng: 139.7691,
  },
  {
    id: 4,
    name: "コンビニエンスストアD",
    category: "コンビニ",
    address: "〇〇市中央区4-5-6",
    phone: "012-345-6792",
    hours: "24時間営業",
    distance: "0.3km",
    lat: 35.6832,
    lng: 139.7661,
  },
]

export default function StoresPage() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list")
  const [selectedStore, setSelectedStore] = useState<number | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.log("[v0] Location error:", error)
          alert("位置情報の取得に失敗しました")
        },
      )
    } else {
      alert("お使いのブラウザは位置情報に対応していません")
    }
  }

  return (
    <div className="min-h-screen bg-accent/30">
      <Header title="〇〇市" showBack={true} showMenu={true} />

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">使えるお店</h2>
              <p className="text-base text-muted-foreground">クーポン券が使える加盟店一覧</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="h-12 w-12"
              >
                <List className="h-5 w-5" />
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("map")}
                className="h-12 w-12"
              >
                <Map className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {viewMode === "list" ? (
          <div className="space-y-4">
            {stores.map((store) => (
              <Card key={store.id} className="p-5 space-y-3 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-1">
                    <h3 className="text-lg font-bold text-foreground">{store.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {store.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground whitespace-nowrap">
                    <MapPin className="w-4 h-4" />
                    <span>{store.distance}</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{store.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span>{store.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span>{store.hours}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative bg-card rounded-lg overflow-hidden shadow-md" style={{ height: "400px" }}>
              {/* Map placeholder with markers */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100">
                {/* Grid pattern for map effect */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                {/* Store markers */}
                {stores.map((store, index) => (
                  <button
                    key={store.id}
                    onClick={() => setSelectedStore(store.id)}
                    className="absolute transform -translate-x-1/2 -translate-y-full transition-transform hover:scale-110"
                    style={{
                      left: `${30 + index * 15}%`,
                      top: `${40 + index * 10}%`,
                    }}
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                          selectedStore === store.id ? "bg-primary text-primary-foreground" : "bg-card text-foreground"
                        }`}
                      >
                        <MapPin className="w-6 h-6" fill={selectedStore === store.id ? "currentColor" : "none"} />
                      </div>
                      <div
                        className={`mt-1 px-2 py-1 rounded text-xs font-medium whitespace-nowrap shadow-sm ${
                          selectedStore === store.id ? "bg-primary text-primary-foreground" : "bg-card text-foreground"
                        }`}
                      >
                        {store.name}
                      </div>
                    </div>
                  </button>
                ))}

                {/* User location marker */}
                {userLocation && (
                  <div
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: "50%", top: "50%" }}
                  >
                    <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-lg animate-pulse" />
                  </div>
                )}
              </div>

              <Button
                onClick={getCurrentLocation}
                size="icon"
                className="absolute bottom-4 right-4 h-12 w-12 rounded-full shadow-lg"
              >
                <Navigation className="h-5 w-5" />
              </Button>
            </div>

            {selectedStore && (
              <Card className="p-5 space-y-3 border-2 border-primary">
                {(() => {
                  const store = stores.find((s) => s.id === selectedStore)
                  if (!store) return null
                  return (
                    <>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 space-y-1">
                          <h3 className="text-lg font-bold text-foreground">{store.name}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {store.category}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground whitespace-nowrap">
                          <MapPin className="w-4 h-4" />
                          <span>{store.distance}</span>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>{store.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 flex-shrink-0" />
                          <span>{store.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 flex-shrink-0" />
                          <span>{store.hours}</span>
                        </div>
                      </div>
                    </>
                  )
                })()}
              </Card>
            )}
          </div>
        )}

        <div className="bg-secondary/10 rounded-lg p-4 space-y-2">
          <p className="text-sm font-medium text-foreground">お知らせ</p>
          <p className="text-sm text-muted-foreground">
            加盟店は順次拡大中です。最新情報は市のホームページでご確認ください。
          </p>
        </div>
      </main>
    </div>
  )
}
