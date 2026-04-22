"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCoupon } from "@/hooks/use-coupon"
import { Header } from "@/components/header"

export function AddFamilyScreen() {
  const { setScreen, transactions } = useCoupon()

  const familyAddCount = transactions.filter((t) => t.type === "charge" && t.store === "家族分追加").length

  const maxFamilyMembers = 4

  const handleStartAuth = () => {
    if (familyAddCount >= maxFamilyMembers) {
      return
    }
    setScreen("family-qr-scan")
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header title="和光市　生活応援デジタルクーポン" showBack={true} showMenu={true} onBack={() => setScreen("home")} />

      <main className="flex-1 px-4 py-8 flex flex-col items-center justify-center">
        <div className="max-w-md w-full space-y-6">
          <Card className="p-8 text-center space-y-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-12 h-12 text-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-foreground">家族分を追加する</h2>
              <p className="text-foreground leading-relaxed">
                クーポン券のQRコード読み取りと生年月日確認により、ご家族分のクーポンを追加できます。
              </p>
              <div className="bg-primary/30 p-4 rounded-lg text-sm text-left space-y-2">
                <p className="font-semibold text-foreground">追加の流れ：</p>
                <ol className="list-decimal list-inside space-y-1 text-foreground">
                  <li>クーポン券のQRコードを読み取り</li>
                  <li>生年月日を入力して本人確認</li>
                  <li>1人につき8,000円分のクーポンが追加されます</li>
                </ol>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg text-sm text-foreground">
                <p className="font-semibold text-foreground">
                  追加状況: {familyAddCount}/{maxFamilyMembers}名（本人含めて5名まで）
                </p>
              </div>
              {familyAddCount >= maxFamilyMembers && (
                <div className="bg-red-100 p-4 rounded-lg text-sm text-foreground font-semibold">
                  家族分の追加は{maxFamilyMembers}名（本人含めて5名）までです
                </div>
              )}
            </div>
          </Card>

          <Button
            size="lg"
            onClick={handleStartAuth}
            disabled={familyAddCount >= maxFamilyMembers}
            className="w-full py-6 text-lg font-bold"
          >
            {familyAddCount < maxFamilyMembers ? "QRコードを読み取る" : "上限に達しました"}
          </Button>
        </div>
      </main>
    </div>
  )
}
