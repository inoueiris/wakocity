"use client"

import { useState } from "react"
import { QrCode, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Header } from "@/components/header"
import Link from "next/link"
import { useCoupon } from "@/hooks/use-coupon"
import { Input } from "@/components/ui/input"

export default function PaymentPage() {
  const [showQR, setShowQR] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState(500)
  const [storeName, setStoreName] = useState("スーパーマーケットA")
  const { balance, makePayment } = useCoupon()
  const [error, setError] = useState("")

  const handleShowQR = () => {
    if (paymentAmount > balance) {
      setError("残高不足です")
      return
    }
    setShowQR(true)
    setError("")
    setTimeout(() => {
      makePayment(storeName, paymentAmount)
      setPaymentComplete(true)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-accent/30">
      <Header title="〇〇市" showBack={true} showMenu={true} />

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground">支払い</h2>
          <p className="text-base text-muted-foreground">
            お店の方にQRコードを
            <br />
            読み取ってもらってください
          </p>
        </div>

        {!paymentComplete ? (
          <Card className="p-8 space-y-6">
            <div className="py-4 bg-primary/5 rounded-xl">
              <p className="text-sm text-muted-foreground mb-1 text-center">利用可能残高</p>
              <p className="text-4xl font-bold text-primary text-center">
                {balance.toLocaleString()}
                <span className="text-2xl ml-1">円</span>
              </p>
            </div>

            {!showQR ? (
              <>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">店舗名（テスト用）</label>
                    <Input
                      type="text"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      className="h-12 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">お支払い金額</label>
                    <Input
                      type="number"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(Number(e.target.value))}
                      className="h-12 text-base"
                      min="1"
                      max={balance}
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <p className="text-sm font-medium text-destructive">{error}</p>
                  </div>
                )}

                <Button
                  size="lg"
                  onClick={handleShowQR}
                  disabled={balance === 0 || paymentAmount <= 0}
                  className="w-full h-16 text-lg font-bold bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                >
                  支払い用QRコードを表示
                </Button>

                <div className="bg-secondary/10 rounded-lg p-4 space-y-2">
                  <p className="text-sm font-medium text-foreground">ご利用方法</p>
                  <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>加盟店でお買い物をする</li>
                    <li>レジでクーポン券を使うことを伝える</li>
                    <li>このQRコードを店員に見せる</li>
                    <li>店員がコードを読み取る</li>
                  </ol>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="aspect-square bg-white rounded-2xl border-2 border-primary/30 flex items-center justify-center p-8">
                  <div className="w-full aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
                    <QrCode className="w-32 h-32 text-foreground" />
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <div className="inline-block px-4 py-2 bg-secondary/20 rounded-full">
                    <p className="text-sm font-medium text-foreground">店員がスキャン中...</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    QRコードが読み取られるまで
                    <br />
                    この画面を表示したままにしてください
                  </p>
                </div>
              </div>
            )}
          </Card>
        ) : (
          <Card className="p-8 space-y-6 text-center">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-secondary" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground">お支払い完了</h3>
              <p className="text-base text-muted-foreground">ご利用ありがとうございました</p>
            </div>

            <div className="bg-accent/50 rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-base">
                <span className="text-muted-foreground">お支払い金額</span>
                <span className="font-bold text-foreground">{paymentAmount.toLocaleString()}円</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-muted-foreground">残高</span>
                <span className="font-bold text-primary">{balance.toLocaleString()}円</span>
              </div>
            </div>

            <Link href="/" className="block">
              <Button
                size="lg"
                className="w-full h-16 text-lg font-bold bg-secondary hover:bg-secondary/90 text-secondary-foreground"
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
