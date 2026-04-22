"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCoupon } from "@/hooks/use-coupon"
import Image from "next/image"

interface LandingScreenProps {
  onNext: () => void
}

export function LandingScreen({ onNext }: LandingScreenProps) {
  const { setScreen, isVerified } = useCoupon()

  const handleStart = () => {
    if (isVerified) {
      setScreen("home")
    } else {
      setScreen("product-selection")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6 px-4 shadow-md">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center mb-3">
            <Image
              src="/logo.png"
              alt="生活応援デジタルクーポン"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-center">和光市　生活応援デジタルクーポン</h1>
          <p className="text-center text-sm mt-1 opacity-90">令和8年度 クーポン券給付事業</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="max-w-md w-full space-y-6">
          {/* Welcome Card */}
          <Card className="p-8 text-center space-y-4 border-2 shadow-lg">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">ようこそ</h2>
              <p className="text-muted-foreground leading-relaxed">
                デジタルクーポン券プラットフォームへ
                <br />
                お越しいただきありがとうございます
              </p>
            </div>
            <div className="pt-4 pb-2">
              <p className="text-sm text-muted-foreground leading-relaxed">本人確認を行いご利用を開始してください</p>
            </div>
          </Card>

          {/* Action Button */}
          <div className="space-y-3">
            <Button
              size="lg"
              onClick={handleStart}
              className="w-full py-6 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
            >
              利用を開始する
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 border-t bg-card">
        <div className="max-w-md mx-auto space-y-3">
          <div className="flex justify-center gap-6 text-sm text-foreground">
            <button className="hover:text-foreground/70 transition-colors">利用規約</button>
            <span className="text-border">|</span>
            <button className="hover:text-foreground/70 transition-colors">サポート</button>
          </div>
          <p className="text-center text-xs text-muted-foreground">Powered by 生活応援デジタルクーポン事務局</p>
        </div>
      </footer>
    </div>
  )
}
