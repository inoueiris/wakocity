"use client"
import { MapPin, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Store {
  id: number
  name: string
  category: string
  address: string
  phone: string
  hours: string
  lat: number
  lng: number
}

interface MapViewProps {
  stores: Store[]
  userLocation: { lat: number; lng: number } | null
}

export default function MapView({ stores, userLocation }: MapViewProps) {
  const centerLat = userLocation?.lat || 35.6812
  const centerLng = userLocation?.lng || 139.7671

  const getRelativePosition = (lat: number, lng: number) => {
    const scale = 10000
    const x = (lng - centerLng) * scale + 50
    const y = (centerLat - lat) * scale + 50
    return {
      left: `${Math.max(0, Math.min(100, x))}%`,
      top: `${Math.max(0, Math.min(100, y))}%`,
    }
  }

  return (
    <div className="w-full space-y-3">
      <div className="w-full h-[400px] rounded-lg overflow-hidden border-2 border-primary/20 shadow-lg bg-gradient-to-br from-green-50 to-blue-50 relative">
        {/* Grid overlay for map-like appearance */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(10)].map((_, i) => (
            <div key={`h-${i}`} className="absolute w-full border-t border-gray-400" style={{ top: `${i * 10}%` }} />
          ))}
          {[...Array(10)].map((_, i) => (
            <div key={`v-${i}`} className="absolute h-full border-l border-gray-400" style={{ left: `${i * 10}%` }} />
          ))}
        </div>

        {/* User location marker */}
        {userLocation && (
          <div className="absolute -translate-x-1/2 -translate-y-1/2 z-20" style={{ left: "50%", top: "50%" }}>
            <div className="relative">
              <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg animate-pulse" />
              <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-medium whitespace-nowrap">
                現在地
              </div>
            </div>
          </div>
        )}

        {/* Store markers */}
        {stores.map((store) => {
          const pos = getRelativePosition(store.lat, store.lng)
          return (
            <div key={store.id} className="absolute -translate-x-1/2 -translate-y-full z-10 group" style={pos}>
              <div className="relative">
                <MapPin className="w-8 h-8 text-red-500 drop-shadow-lg" fill="currentColor" />
                <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white p-3 rounded-lg shadow-xl hidden group-hover:block w-48 z-30">
                  <h3 className="font-bold text-sm mb-1">{store.name}</h3>
                  <p className="text-xs text-muted-foreground">{store.category}</p>
                  <p className="text-xs text-muted-foreground mt-1">{store.address}</p>
                  <Button
                    size="sm"
                    className="w-full mt-2"
                    onClick={() => {
                      const url = `https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`
                      window.open(url, "_blank")
                    }}
                  >
                    <Navigation className="w-3 h-3 mr-1" />
                    経路
                  </Button>
                </div>
              </div>
            </div>
          )
        })}

        {/* Center crosshair */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20">
          <div className="w-px h-4 bg-gray-600 absolute -top-6 left-1/2" />
          <div className="w-px h-4 bg-gray-600 absolute -bottom-6 left-1/2" />
          <div className="w-4 h-px bg-gray-600 absolute -left-6 top-1/2" />
          <div className="w-4 h-px bg-gray-600 absolute -right-6 top-1/2" />
        </div>
      </div>

      <Card className="p-3 bg-secondary/5 border-secondary/20">
        <p className="text-xs text-muted-foreground">
          <MapPin className="w-3 h-3 inline mr-1" />
          マーカーにカーソルを合わせて店舗情報を表示
        </p>
      </Card>
    </div>
  )
}
