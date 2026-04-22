"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, XCircle, User, Trash2 } from "lucide-react"
import { useCoupon, type UserInfo } from "@/hooks/use-coupon"

export function AdminPanelScreen() {
  const { setScreen, userInfo, setIsVerified, transactions, removeFamilyCharge } = useCoupon()
  const [applications, setApplications] = useState<UserInfo[]>([])
  const [selectedApp, setSelectedApp] = useState<UserInfo | null>(null)
  const [activeTab, setActiveTab] = useState<"pending" | "approved">("pending")

  useEffect(() => {
    // Load pending applications from localStorage
    const pending = localStorage.getItem("pending_applications")
    if (pending) {
      setApplications(JSON.parse(pending))
    } else if (userInfo && !localStorage.getItem("coupon_verified")) {
      setApplications([userInfo])
    }
  }, [userInfo])

  const handleApprove = () => {
    if (selectedApp) {
      setIsVerified(true)
      setApplications(applications.filter((app) => app.phone !== selectedApp.phone))
      localStorage.removeItem("pending_applications")
      setScreen("home")
    }
  }

  const handleReject = () => {
    if (selectedApp) {
      setApplications(applications.filter((app) => app.phone !== selectedApp.phone))
      setSelectedApp(null)
    }
  }

  const handleDeleteFamily = (transactionId: string) => {
    if (confirm("この家族分を削除してもよろしいですか？残高から差し引かれます。")) {
      removeFamilyCharge(transactionId)
    }
  }

  const familyCharges = transactions.filter((t) => t.type === "charge" && t.store === "家族分追加")

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-destructive text-destructive-foreground py-6 px-4 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setScreen("landing")}
            className="text-destructive-foreground hover:bg-destructive-foreground/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">管理者パネル</h1>
            <p className="text-sm opacity-90">本人確認審査・家族管理</p>
          </div>
        </div>
      </header>

      <div className="border-b bg-card">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("pending")}
              className={`py-4 px-6 font-medium border-b-2 transition-colors ${
                activeTab === "pending"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              審査待ち ({applications.length})
            </button>
            <button
              onClick={() => setActiveTab("approved")}
              className={`py-4 px-6 font-medium border-b-2 transition-colors ${
                activeTab === "approved"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              承認済み家族 ({familyCharges.length})
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {activeTab === "pending" ? (
            applications.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">審査待ちの申請はありません</p>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left: ID Document Image */}
                <Card className="p-6 space-y-4">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <User className="h-5 w-5" />
                    提出書類
                  </h2>

                  {selectedApp || applications[0] ? (
                    <>
                      <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                        {(selectedApp || applications[0]).idImageUrl ? (
                          <img
                            src={(selectedApp || applications[0]).idImageUrl}
                            alt="ID Document"
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            画像なし
                          </div>
                        )}
                      </div>
                      <Badge variant="secondary" className="text-sm">
                        {(selectedApp || applications[0]).idType === "license"
                          ? "運転免許証"
                          : (selectedApp || applications[0]).idType === "mynumber"
                            ? "身分証明書"
                            : "健康保険証"}
                      </Badge>
                    </>
                  ) : null}
                </Card>

                {/* Right: User Information */}
                <Card className="p-6 space-y-6">
                  <h2 className="text-lg font-bold">申請者情報</h2>

                  {(selectedApp || applications[0]) && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="font-medium text-muted-foreground">お名前</div>
                        <div className="font-bold">{(selectedApp || applications[0]).name}</div>

                        <div className="font-medium text-muted-foreground">電話番号</div>
                        <div>{(selectedApp || applications[0]).phone}</div>

                        <div className="font-medium text-muted-foreground">郵便番号</div>
                        <div>{(selectedApp || applications[0]).zipCode}</div>

                        <div className="font-medium text-muted-foreground">住所</div>
                        <div className="col-span-1">{(selectedApp || applications[0]).address}</div>

                        <div className="font-medium text-muted-foreground">生年月日</div>
                        <div>{(selectedApp || applications[0]).dateOfBirth}</div>
                      </div>

                      <div className="pt-6 space-y-3">
                        <Button
                          size="lg"
                          onClick={handleApprove}
                          className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-bold"
                        >
                          <CheckCircle className="mr-2 h-5 w-5" />
                          承認する
                        </Button>
                        <Button
                          size="lg"
                          variant="destructive"
                          onClick={handleReject}
                          className="w-full py-6 text-lg font-bold"
                        >
                          <XCircle className="mr-2 h-5 w-5" />
                          却下する
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            )
          ) : familyCharges.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">承認済みの家族はいません</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {familyCharges.map((charge) => (
                <Card key={charge.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary">家族分追加</Badge>
                        <span className="font-bold text-lg">+{charge.amount.toLocaleString()}円</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {charge.date} {charge.time}
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="lg"
                      onClick={() => handleDeleteFamily(charge.id)}
                      className="gap-2"
                    >
                      <Trash2 className="h-5 w-5" />
                      削除
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
