"use client"

import { useState } from "react"
import { Camera, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Header } from "@/components/header"
import Link from "next/link"
import Image from "next/image"
import { useCoupon } from "@/hooks/use-coupon"

export default function ScanPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const { balance, addCharge } = useCoupon()

  const handleScan = () => {
    setIsScanning(true)
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false)
      setScanComplete(true)
      addCharge(8000)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-accent/30">
      <Header title="和光市　生活応援デジタルクーポン" showBack={true} showMenu={true} />

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground">クーポン券を読み込む</h2>
          <p className="text-base text-muted-foreground">
            郵便で届いたクーポン券のQRコードを
            <br />
            カメラで読み取ってください
          </p>
        </div>

        {!scanComplete ? (
          <Card className="p-6 space-y-6">
            {isScanning ? (
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
                    <div className="absolute inset-x-0 top-0 h-1 bg-primary shadow-[0_0_10px_rgba(91,184,212,0.8)] animate-pulse" />
                    {/* Corner Markers */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="aspect-[3/4] bg-accent/50 rounded-2xl border-2 border-dashed border-primary/30 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Camera className="w-20 h-20 text-foreground/40 mx-auto" />
                  <p className="text-sm text-foreground">カメラを起動してクーポン券を<br />読み取ってください</p>
                </div>
              </div>
            )}

            <Button
              size="lg"
              onClick={handleScan}
              disabled={isScanning}
              className="w-full h-16 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isScanning ? "読み取り中..." : "カメラを起動"}
            </Button>

            <div className="bg-primary/10 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium text-foreground">ご注意</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>明るい場所で読み取ってください</li>
                <li>QRコード全体が画面に収まるようにしてください</li>
                <li>読み取りは一度のみ有効です</li>
              </ul>
            </div>
          </Card>
        ) : (
          <Card className="p-8 space-y-6 text-center">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-primary/30 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground">読み取り完了！</h3>
              <p className="text-base text-muted-foreground">8,000円が追加されました</p>
            </div>

            <div className="py-4 bg-primary/30 rounded-xl">
              <p className="text-sm text-foreground mb-1">現在の残高</p>
              <p className="text-4xl font-bold text-foreground">
                {balance.toLocaleString()}
                <span className="text-2xl ml-1">円</span>
              </p>
            </div>

            <Link href="/" className="block">
              <Button
                size="lg"
                className="w-full h-16 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                ホームに戻る
              </Button>
            </Link>
          </Card>
        )}
      </main>
    </div>
  )
}
