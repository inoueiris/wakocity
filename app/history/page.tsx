"use client"

import { Calendar, Store } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Header } from "@/components/header"
import { useCoupon } from "@/hooks/use-coupon"

export default function HistoryPage() {
  const { balance, transactions } = useCoupon()

  return (
    <div className="min-h-screen bg-accent/30">
      <Header title="〇〇市" showBack={true} showMenu={true} />

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">利用履歴</h2>
          <p className="text-base text-muted-foreground">クーポン券の利用履歴を確認できます</p>
        </div>

        <Card className="p-5 bg-primary/5 border-2 border-primary/30">
          <div className="text-center space-y-1">
            <p className="text-sm text-muted-foreground">現在の残高</p>
            <p className="text-4xl font-bold text-primary">
              {balance.toLocaleString()}
              <span className="text-2xl ml-1">円</span>
            </p>
          </div>
        </Card>

        <div className="space-y-3">
          {transactions.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-base text-muted-foreground">まだ利用履歴がありません</p>
            </Card>
          ) : (
            transactions.map((transaction) => (
              <Card key={transaction.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {transaction.date} {transaction.time}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Store className="w-4 h-4 text-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-base font-medium text-foreground">{transaction.store}</span>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <p className={`text-lg font-bold ${transaction.amount > 0 ? "text-primary" : "text-foreground"}`}>
                      {transaction.amount > 0 ? "+" : ""}
                      {transaction.amount.toLocaleString()}円
                    </p>
                    <p className="text-xs text-muted-foreground">残高: {transaction.balance.toLocaleString()}円</p>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        <div className="bg-secondary/10 rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground">利用履歴は最大90日間保存されます</p>
        </div>
      </main>
    </div>
  )
}
