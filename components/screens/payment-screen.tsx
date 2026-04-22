"use client"
import { useState } from "react"
import { ArrowLeft, QrCode, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCoupon } from "@/hooks/use-coupon"
import Image from "next/image"

export function PaymentScreen() {
  const { setScreen, balance, makePayment } = useCoupon()
  const [showQR, setShowQR] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState(500)

  const handleShowQR = () => {
    if (paymentAmount > balance) {
      return
    }

    setShowQR(true)
    setTimeout(() => {
      makePayment("店舗での支払い", paymentAmount)
      setShowQR(false)
      setShowSuccess(true)
      setTimeout(() => {
        setScreen("home")
      }, 2000)
    }, 3000)
  }

  const presetAmounts = [500, 1000, 2000, 3000, 5000]

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-sm w-full p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">支払い完了</h2>
          <p className="text-3xl font-bold text-foreground">{paymentAmount.toLocaleString()}円</p>
          <p className="text-base text-foreground">残高: {balance.toLocaleString()}円</p>
        </Card>
      </div>
    )
  }

  if (showQR) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        {/* Camera viewfinder */}
        <div className="relative w-full max-w-md aspect-[9/16] overflow-hidden">
          {/* Store POP image as background (simulating camera feed) */}
          <Image
            src="/images/store-pop.jpg"
            alt="店舗POPをカメラで読み取り中"
            fill
            className="object-cover"
          />

          {/* Dark vignette overlay around edges */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Scanning frame centered on the QR area of the POP */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            {/* Frame box */}
            <div className="relative w-56 h-56">
              {/* Corner markers */}
              <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-primary rounded-tl-sm" />
              <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-primary rounded-tr-sm" />
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-primary rounded-bl-sm" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-primary rounded-br-sm" />
              {/* Scanning line */}
              <div className="absolute inset-x-2 top-0 h-0.5 bg-primary shadow-[0_0_8px_2px_rgba(91,184,212,0.8)] animate-[scan_1.8s_ease-in-out_infinite]" />
            </div>

            {/* Status label */}
            <div className="bg-black/60 px-5 py-2 rounded-full">
              <p className="text-white text-sm font-medium animate-pulse">店舗QRコードを読み取り中...</p>
            </div>
          </div>

          {/* Payment amount pill at top */}
          <div className="absolute top-6 left-0 right-0 flex justify-center">
            <div className="bg-primary text-white px-6 py-2 rounded-full shadow-lg">
              <p className="text-base font-bold">{paymentAmount.toLocaleString()}円を支払い</p>
            </div>
          </div>

          {/* Cancel button at bottom */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center px-8">
            <Button
              variant="outline"
              className="w-full max-w-xs bg-white/90 text-foreground font-bold border-0 h-12"
              onClick={() => setShowQR(false)}
            >
              キャンセル
            </Button>
          </div>
        </div>
      </div>
    )
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
          <h1 className="text-xl font-bold text-foreground">支払う</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-center w-16 h-16 bg-primary/30 rounded-full mx-auto">
            <QrCode className="w-8 h-8 text-foreground" />
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold text-foreground">QRコード支払い</h2>
            <p className="text-sm text-muted-foreground">店頭でQRコードを提示して支払いを行います</p>
          </div>

          <div className="bg-primary/30 rounded-xl p-6 space-y-2">
            <p className="text-sm text-foreground text-center">現在の残高</p>
            <p className="text-4xl font-bold text-foreground text-center">
              {balance.toLocaleString()}
              <span className="text-2xl ml-1">円</span>
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">支払い金額</Label>
              <Input
                id="amount"
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(Number(e.target.value))}
                min="0"
                max={balance}
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">よく使う金額</p>
              <div className="grid grid-cols-3 gap-2">
                {presetAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    onClick={() => setPaymentAmount(amount)}
                    disabled={amount > balance}
                    className="h-12"
                  >
                    {amount.toLocaleString()}円
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <Button
            size="lg"
            onClick={handleShowQR}
            className="w-full h-14 text-lg font-bold"
            disabled={paymentAmount <= 0 || paymentAmount > balance}
          >
            QRコードを表示する
          </Button>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="font-bold text-foreground">使い方</h3>
          <ol className="space-y-3 text-sm text-foreground">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary/30 rounded-full flex items-center justify-center text-foreground font-bold text-xs">
                1
              </span>
              <span>レジで「クーポン券で支払います」と伝える</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary/30 rounded-full flex items-center justify-center text-foreground font-bold text-xs">
                2
              </span>
              <span>「QRコードを表示する」ボタンを押す</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary/30 rounded-full flex items-center justify-center text-foreground font-bold text-xs">
                3
              </span>
              <span>店員にQRコードを読み取ってもらう</span>
            </li>
          </ol>
        </Card>
      </main>
    </div>
  )
}
