"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCoupon } from "@/hooks/use-coupon"
import { Trash2, AlertTriangle } from "lucide-react"
import { useState } from "react"
import { Header } from "@/components/header"

export function SettingsScreen() {
  const { setScreen } = useCoupon()
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const handleResetData = () => {
    // Clear all localStorage data
    localStorage.clear()

    // Reload the page to reset all state
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="和光市　生活応援デジタルクーポン" showBack={true} showMenu={true} />

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6">
        <Card className="border-2 border-border shadow-sm overflow-hidden">
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-foreground">データ管理</h2>
              <p className="text-sm text-muted-foreground">アプリケーションのデータをリセットできます</p>
            </div>

            <div className="bg-destructive/5 border-2 border-destructive/20 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-destructive">注意事項</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    データを初期化すると、以下の情報がすべて削除されます：
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1 ml-4 list-disc">
                    <li>本人確認の状態</li>
                    <li>クーポン残高</li>
                    <li>利用履歴</li>
                    <li>登録した個人情報</li>
                    <li>家族情報</li>
                  </ul>
                  <p className="text-xs text-destructive font-medium mt-2">この操作は取り消すことができません。</p>
                </div>
              </div>
            </div>

            <Button variant="destructive" size="lg" className="w-full" onClick={() => setShowConfirmDialog(true)}>
              <Trash2 className="w-5 h-5 mr-2" />
              データを初期化
            </Button>
          </div>
        </Card>
      </main>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-sm bg-card border-2 border-border shadow-xl">
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-foreground">データ初期化の確認</h3>
                <p className="text-sm text-muted-foreground">
                  本当にすべてのデータを削除してもよろしいですか？この操作は取り消すことができません。
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Button variant="destructive" size="lg" className="w-full" onClick={handleResetData}>
                  削除する
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full bg-transparent"
                  onClick={() => setShowConfirmDialog(false)}
                >
                  キャンセル
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
