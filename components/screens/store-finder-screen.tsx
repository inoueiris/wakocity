"use client"
import { ArrowLeft, MapPin, Navigation, Phone, List, MapIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCoupon } from "@/hooks/use-coupon"
import { useState } from "react"
import dynamic from "next/dynamic"

const MapView = dynamic(() => import("@/components/map-view"), {
  loading: () => <div className="w-full h-[400px] bg-muted animate-pulse rounded-lg" />,
})

const stores = [
  {
    id: 1,
    name: "スーパーマーケットA",
    category: "スーパー",
    distance: "0.5km",
    address: "〇〇市△△町1-2-3",
    phone: "03-1234-5678",
    hours: "9:00-21:00",
    lat: 35.6812,
    lng: 139.7671,
  },
  {
    id: 2,
    name: "ドラッグストアB",
    category: "ドラッグストア",
    distance: "0.8km",
    address: "〇〇市△△町2-3-4",
    phone: "03-2345-6789",
    hours: "10:00-22:00",
    lat: 35.6822,
    lng: 139.7681,
  },
  {
    id: 3,
    name: "コンビニエンスストアC",
    category: "コンビニ",
    distance: "1.2km",
    address: "〇〇市△△町3-4-5",
    phone: "03-3456-7890",
    hours: "24時間",
    lat: 35.6802,
    lng: 139.7691,
  },
]

export function StoreFinderScreen() {
  const { setScreen } = useCoupon()
  const [viewMode, setViewMode] = useState<"list" | "map">("list")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationError, setLocationError] = useState<string>("")

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setLocationError("")
        },
        (error) => {
          console.error("位置情報の取得に失敗しました:", error)
          setLocationError("位置情報の取得に失敗しました")
        },
      )
    } else {
      setLocationError("お使いのブラウザは位置情報に対応していません")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card border-b-2 border-primary/20 shadow-sm">
        <div className="flex items-center gap-4 px-4 py-4">
          <button
            onClick={() => setScreen("home")}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            aria-label="戻る"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">使えるお店を探す</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        <Card className="p-4 bg-primary/30 border-primary/20">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
            <div className="space-y-1 flex-1">
              <p className="text-sm font-medium text-foreground">現在地: 〇〇市△△町</p>
              <p className="text-xs text-muted-foreground">近くの加盟店を表示しています</p>
              {locationError && <p className="text-xs text-destructive mt-1">{locationError}</p>}
            </div>
          </div>
        </Card>

        <div className="flex gap-2">
          <div className="flex gap-1 border rounded-lg p-1 bg-card flex-1">
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              className="flex-1 gap-2"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
              リスト
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "ghost"}
              size="sm"
              className="flex-1 gap-2"
              onClick={() => setViewMode("map")}
            >
              <MapIcon className="w-4 h-4" />
              地図
            </Button>
          </div>
          <Button variant="outline" size="sm" className="gap-2 bg-card" onClick={getCurrentLocation}>
            <Navigation className="w-4 h-4" />
            現在位置
          </Button>
        </div>

        {viewMode === "map" ? (
          <div className="space-y-4">
            <MapView stores={stores} userLocation={userLocation} />
            <Card className="p-4 bg-secondary/5 border-secondary/20">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">地図の操作:</strong> マーカーをタップして店舗情報を表示できます
              </p>
            </Card>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">近くの加盟店 ({stores.length}件)</h2>
            </div>

            {stores.map((store) => (
              <Card key={store.id} className="p-5 space-y-4 hover:shadow-md transition-shadow">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 flex-1">
                      <h3 className="text-lg font-bold text-foreground">{store.name}</h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary" className="text-xs">
                          {store.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {store.distance}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>{store.address}</p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {store.phone}
                    </p>
                    <p>営業時間: {store.hours}</p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  size="lg"
                  onClick={() => {
                    const url = `https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`
                    window.open(url, "_blank")
                  }}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  経路を表示
                </Button>
              </Card>
            ))}
          </div>
        )}

        <Card className="p-4 bg-secondary/5 border-secondary/20">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">お知らせ:</strong>{" "}
            加盟店は随時追加されます。最新の情報は定期的にご確認ください。
          </p>
        </Card>
      </main>
    </div>
  )
}
