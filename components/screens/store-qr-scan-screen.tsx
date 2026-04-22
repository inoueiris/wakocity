"use client"
import { useState } from "react"
import { Camera, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useCoupon } from "@/hooks/use-coupon"
import { Header } from "@/components/header"
import Image from "next/image"

export function StoreQRScanScreen() {
  const { setScreen, balance, makePayment } = useCoupon()
  const [scanning, setScanning] = useState(false)
  const [scanned, setScanned] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState<string>("")
  const [storeName, setStoreName] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  const presetAmounts = [500, 1000, 2000, 3000, 5000]

  const handleStartScan = () => {
    setScanning(true)

    // Simulate QR code scanning
    setTimeout(() => {
      const simulatedStore = "○○スーパー"
      setStoreName(simulatedStore)
      setScanning(false)
      setScanned(true)
    }, 2000)
  }

  const handleConfirmPayment = () => {
    const amount = Number.parseInt(paymentAmount)

    if (!amount || amount <= 0) {
      alert("支払い金額を入力してください")
      return
    }

    if (amount > balance) {
      alert("残高不足です")
      return
    }

    makePayment(storeName, amount)
    setShowSuccess(true)
    setTimeout(() => {
      setScreen("home")
    }, 2000)
  }

  const handlePresetAmount = (amount: number) => {
    setPaymentAmount(amount.toString())
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-sm w-full p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">支払い完了</h2>
          <p className="text-3xl font-bold text-foreground">{Number.parseInt(paymentAmount).toLocaleString()}円</p>
          <p className="text-base text-foreground">残高: {balance.toLocaleString()}円</p>
        </Card>
      </div>
    )
  }

  if (scanned) {
    const amount = Number.parseInt(paymentAmount) || 0

    return (
      <div className="min-h-screen bg-background">
        <Header
          title="支払い金額入力"
          onBack={() => {
            setScanned(false)
            setPaymentAmount("")
            setStoreName("")
          }}
        />

        <main className="max-w-md mx-auto px-4 py-6 space-y-6">
          <Card className="p-6 space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-foreground" />
              </div>
              <h2 className="text-xl font-bold text-foreground">店舗情報を読み取りました</h2>
              <p className="text-lg font-bold text-foreground">{storeName}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">支払い金額を選択または入力</label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {presetAmounts.map((preset) => (
                    <Button
                      key={preset}
                      variant={paymentAmount === preset.toString() ? "default" : "outline"}
                      onClick={() => handlePresetAmount(preset)}
                      className="h-12 font-bold"
                    >
                      {preset.toLocaleString()}円
                    </Button>
                  ))}
                </div>
                <div className="relative">
                  <Input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    placeholder="または金額を入力"
                    className="h-14 text-lg text-right pr-12 font-bold"
                    min="1"
                    max={balance}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-muted-foreground">円</span>
                </div>
              </div>
            </div>

            <div className="bg-primary/30 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground">現在の残高</span>
                <span className="text-xl font-bold text-foreground">{balance.toLocaleString()}円</span>
              </div>
              {amount > 0 && (
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-border">
                  <span className="text-sm text-foreground">支払い後の残高</span>
                  <span className="text-xl font-bold text-foreground">{(balance - amount).toLocaleString()}円</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Button
                size="lg"
                onClick={handleConfirmPayment}
                className="w-full h-14 text-lg font-bold"
                disabled={!amount || amount <= 0 || amount > balance}
              >
                {!amount || amount <= 0 ? "金額を入力してください" : amount > balance ? "残高不足" : "支払いを確定する"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  setScanned(false)
                  setPaymentAmount("")
                  setStoreName("")
                }}
                className="w-full h-14 text-lg font-bold"
              >
                キャンセル
              </Button>
            </div>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="店舗QRコードを読み取る" onBack={() => setScreen("home")} />

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        <Card className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center mx-auto">
              <Camera className="w-8 h-8 text-foreground" />
            </div>
            <h2 className="text-xl font-bold text-foreground">店舗のQRコードをスキャン</h2>
            <p className="text-sm text-muted-foreground">
              店頭に設置されているQRコードを
              <br />
              カメラで読み取ってください
            </p>
          </div>

          <div className="bg-primary/30 rounded-xl p-6 space-y-2">
            <p className="text-sm text-foreground text-center">現在の残高</p>
            <p className="text-4xl font-bold text-foreground text-center">
              {balance.toLocaleString()}
              <span className="text-2xl ml-1">円</span>
            </p>
          </div>

          {scanning ? (
            <div className="space-y-4">
              <div className="aspect-[4/3] bg-black rounded-xl overflow-hidden relative">
                <Image src="/images/store-qr-stand.png" alt="店舗QRコード" fill className="object-cover opacity-90" />
                {/* Scanning frame overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-72 h-72 border-4 border-white rounded-xl animate-pulse shadow-lg" />
                </div>
                {/* Scanning line animation */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent animate-pulse" />
                {/* Corner markers */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white" />
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground animate-pulse">QRコードを読み取り中...</p>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setScanning(false)}
                className="w-full h-12 text-base font-bold"
              >
                キャンセル
              </Button>
            </div>
          ) : (
            <Button size="lg" onClick={handleStartScan} className="w-full h-14 text-lg font-bold">
              <Camera className="w-5 h-5 mr-2" />
              カメラを起動する
            </Button>
          )}
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="font-bold text-foreground">使い方</h3>
          <ol className="space-y-3 text-sm text-foreground">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary/30 rounded-full flex items-center justify-center text-foreground font-bold text-xs">
                1
              </span>
              <span>店頭のQRコードを探す</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary/30 rounded-full flex items-center justify-center text-foreground font-bold text-xs">
                2
              </span>
              <span>「カメラを起動する」ボタンを押す</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary/30 rounded-full flex items-center justify-center text-foreground font-bold text-xs">
                3
              </span>
              <span>QRコードをカメラで読み取る</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary/30 rounded-full flex items-center justify-center text-foreground font-bold text-xs">
                4
              </span>
              <span>支払い内容を確認して決済</span>
            </li>
          </ol>
        </Card>
      </main>
    </div>
  )
}
