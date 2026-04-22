"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Info, Check } from "lucide-react"
import { useCoupon } from "@/hooks/use-coupon"
import { Header } from "@/components/header"

interface ServiceExplanationScreenProps {
  onNext: () => void
}

export function ServiceExplanationScreen({ onNext }: ServiceExplanationScreenProps) {
  const { setScreen } = useCoupon()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header title="和光市　生活応援デジタルクーポン" showBack={true} showMenu={true} />

      <main className="flex-1 px-4 py-8">
        <div className="max-w-md mx-auto space-y-6">
          <Card className="p-6 space-y-6">
            <div className="flex items-center gap-3 text-foreground">
              <Info className="h-6 w-6" />
              <h2 className="text-lg font-bold">かんたん本人確認</h2>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">クーポン券のQR認証を行うことで本人確認が完了します。</p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">即座にクーポン発行</p>
                    <p className="text-sm text-muted-foreground">認証完了後すぐにご利用可能</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="bg-muted/50 p-4 rounded-lg text-sm space-y-2">
            <p className="font-semibold">注意事項</p>
            <ul className="space-y-1 text-muted-foreground text-xs">
              <li>• 認証にはカメラ付きスマートフォンが必要です</li>
              <li>• 生年月日の確認においては自治体登録住所との一致確認が行われます</li>
              <li>• 生年月日を3回連続で間違えるとロックされます</li>
            </ul>
          </div>

          <Button size="lg" onClick={onNext} className="w-full py-6 text-lg font-bold">
            次へ
          </Button>
        </div>
      </main>
    </div>
  )
}
