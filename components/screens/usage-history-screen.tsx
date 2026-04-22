"use client"
import { ArrowLeft, ShoppingBag, Plus, Minus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCoupon } from "@/hooks/use-coupon"

export function UsageHistoryScreen() {
  const { setScreen, transactions, balance } = useCoupon()

  const totalUsage = transactions.filter((t) => t.type === "payment").reduce((sum, t) => sum + Math.abs(t.amount), 0)

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
          <h1 className="text-xl font-bold text-foreground">利用履歴</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        <Card className="p-5 bg-primary/30 border-primary/20">
          <div className="text-center space-y-2">
            <p className="text-sm text-foreground">現在の残高</p>
            <p className="text-3xl font-bold text-foreground">
              {balance.toLocaleString()}
              <span className="text-xl ml-1">円</span>
            </p>
          </div>
        </Card>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">取引履歴 ({transactions.length}件)</h2>
          </div>

          {transactions.length > 0 ? (
            <div className="space-y-3">
              {transactions.map((item) => (
                <Card key={item.id} className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-primary/30`}
                      >
                        {item.type === "charge" ? (
                          <Plus className="w-5 h-5 text-foreground" />
                        ) : (
                          <Minus className="w-5 h-5 text-foreground" />
                        )}
                      </div>
                      <div className="space-y-1 flex-1">
                        <h3 className="font-bold text-foreground">{item.store}</h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>
                            {item.date} {item.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-lg font-bold text-foreground">
                        {item.type === "charge" ? "+" : "-"}
                        {Math.abs(item.amount).toLocaleString()}円
                      </p>
                      <Badge variant="outline" className="text-xs">
                        残高 {item.balance.toLocaleString()}円
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-muted-foreground">まだ利用履歴がありません</p>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
