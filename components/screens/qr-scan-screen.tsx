"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera } from "lucide-react"
import { useCoupon } from "@/hooks/use-coupon"
import { Header } from "@/components/header"
import Image from "next/image"

interface QRScanScreenProps {
  onNext: (serialId: string) => void
  isForFamily?: boolean
}

export function QRScanScreen({ onNext, isForFamily = false }: QRScanScreenProps) {
  const { setScreen } = useCoupon()
  const [isScanning, setIsScanning] = useState(false)

  useEffect(() => {
    if (isScanning) {
      const timer = setTimeout(() => {
        onNext("MOCK_SERIAL_12345")
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [isScanning, onNext])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header title="和光市　生活応援デジタルクーポン" showBack={true} showMenu={true} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="max-w-md w-full space-y-6">
          {!isScanning ? (
            <Card className="p-8 space-y-6 border-2 shadow-lg">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-24 h-24 bg-primary/30 rounded-full flex items-center justify-center">
                    <Camera className="w-12 h-12 text-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-bold text-foreground">クーポン券のQRコードを</p>
                  <p className="text-lg font-bold text-foreground">読み取ってください</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  カメラを起動してクーポン券に記載された
                  <br />
                  QRコードを読み取ります
                </p>
              </div>

              <Button onClick={() => setIsScanning(true)} className="w-full h-14 text-lg" size="lg">
                <Camera className="w-5 h-5 mr-2" />
                カメラを起動
              </Button>
            </Card>
          ) : (
            <Card className="p-6 space-y-4 border-2 shadow-lg bg-gray-900">
              <div className="aspect-[3/4] bg-gray-800 rounded-2xl flex items-center justify-center relative overflow-hidden border-4 border-white/20">
                {/* Camera view with coupon image */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="relative w-full h-full">
                    <Image 
                      src="/images/coupon-ticket.png" 
                      alt="クーポン券" 
                      fill 
                      className="object-contain" 
                    />
                  </div>
                </div>

                {/* Scanning Frame Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-[85%] h-[85%] border-4 border-primary rounded-2xl relative">
                    {/* Scanning Line */}
                    <div className="absolute inset-x-0 top-0 h-1 bg-primary shadow-[0_0_10px_rgba(91,184,212,0.8)] animate-[scan_2s_ease-in-out_infinite]" />
                    {/* Corner Markers */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="text-center space-y-2">
                <p className="text-lg font-bold text-white">枠内にQRコードを</p>
                <p className="text-lg font-bold text-white">合わせてください</p>
                <p className="text-sm text-white/70 mt-2">自動的に読み取ります</p>
              </div>

              <Button
                onClick={() => setIsScanning(false)}
                variant="outline"
                className="w-full bg-white text-foreground hover:bg-white/90"
              >
                キャンセル
              </Button>
            </Card>
          )}
        </div>
      </main>

      <style jsx>{`
        @keyframes scan {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(100%);
          }
        }
      `}</style>
    </div>
  )
}
