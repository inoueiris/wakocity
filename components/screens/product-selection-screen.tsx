"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Ticket, Gift, Check } from "lucide-react"
import { useCoupon } from "@/hooks/use-coupon"

interface ProductSelectionScreenProps {
  onNext: () => void
}

type ProductType = "rice" | "coupon" | null

export function ProductSelectionScreen({ onNext }: ProductSelectionScreenProps) {
  const { setScreen, userInfo, setUserInfo } = useCoupon()
  const [selectedProduct, setSelectedProduct] = useState<ProductType>(null)

  const handleNext = () => {
    if (selectedProduct) {
      setUserInfo({
        ...userInfo!,
        productType: selectedProduct,
      })
      onNext()
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-primary text-primary-foreground py-6 px-4 shadow-md">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setScreen("jpki-auth")}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">生活応援デジタルクーポン</h1>
            <p className="text-sm opacity-90">交換商品の選択</p>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-8">
        <div className="max-w-md mx-auto space-y-6">
          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-bold text-center">交換商品を選択してください</h2>
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              ご希望の商品を1つ選択してください
            </p>
          </Card>

          <div className="space-y-4">
            <Card
              className={`p-6 cursor-pointer transition-all border-2 ${
                selectedProduct === "rice"
                  ? "border-primary bg-primary/5 shadow-lg"
                  : "border-border hover:border-primary/50 hover:shadow-md"
              }`}
              onClick={() => setSelectedProduct("rice")}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    selectedProduct === "rice" ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <Gift
                    className={`h-6 w-6 ${selectedProduct === "rice" ? "text-primary-foreground" : "text-muted-foreground"}`}
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">デジタル生活応援クーポン券</h3>
                    {selectedProduct === "rice" && (
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Check className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    食料品や日用品の購入に使用できる汎用クーポン券です。幅広い商品にご利用いただけます。
                  </p>
                  <div className="pt-2 space-y-1">
                    <p className="text-xs text-muted-foreground">• 有効期限：2026年11月末まで</p>
                    <p className="text-xs text-muted-foreground">• 利用可能店舗：提携スーパー・提携店舗など</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card
              className={`p-6 cursor-pointer transition-all border-2 ${
                selectedProduct === "coupon"
                  ? "border-primary bg-primary/5 shadow-lg"
                  : "border-border hover:border-primary/50 hover:shadow-md"
              }`}
              onClick={() => setSelectedProduct("coupon")}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    selectedProduct === "coupon" ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <Ticket
                    className={`h-6 w-6 ${selectedProduct === "coupon" ? "text-primary-foreground" : "text-muted-foreground"}`}
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">デジタル飲食応援クーポン券</h3>
                    {selectedProduct === "coupon" && (
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Check className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    飲食に使用できる汎用クーポン券です。提携の飲食店舗にご利用いただけます。す。
                  </p>
                  <div className="pt-2 space-y-1">
                    <p className="text-xs text-muted-foreground">• 有効期限：2026年11月末まで</p>
                    <p className="text-xs text-muted-foreground">• 利用可能店舗：提携飲食店・提携レストランなど</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Button size="lg" onClick={handleNext} disabled={!selectedProduct} className="w-full py-6 text-lg font-bold">
            この商品で申請する
          </Button>
        </div>
      </main>
    </div>
  )
}
