"use client"
import { QrCode, MapPin, History, CircleHelp, UserPlus, Globe, Menu, X, ShieldCheck, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCoupon } from "@/hooks/use-coupon"
import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { QRCodeSVG } from "qrcode.react"

export function HomeScreen() {
  const { balance, setScreen, isVerified, userInfo } = useCoupon()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showQRModal, setShowQRModal] = useState(false)

  // Generate a unique user ID for QR code (based on user info or create a unique session ID)
  const userQRId = useMemo(() => {
    if (userInfo?.phone) {
      return `WAKO-COUPON-${userInfo.phone}-${Date.now().toString(36)}`
    }
    // Fallback: generate a random ID and store it
    const storedId = typeof window !== 'undefined' ? localStorage.getItem('user_qr_id') : null
    if (storedId) return storedId
    const newId = `WAKO-COUPON-${Math.random().toString(36).substring(2, 15)}-${Date.now().toString(36)}`
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_qr_id', newId)
    }
    return newId
  }, [userInfo?.phone])

  // QR code data for store to scan (includes user ID and current balance)
  const qrData = JSON.stringify({
    type: "wako_coupon_user",
    userId: userQRId,
    balance: balance,
    timestamp: Date.now(),
    city: "wako"
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-card border-b-2 border-primary/20 shadow-sm">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="生活応援デジタルクーポン"
              width={40}
              height={40}
              className="object-contain"
            />
            <h1 className="text-xl font-bold text-foreground">和光市　生活応援デジタルクーポン</h1>
          </div>
          <div className="flex items-center gap-2">
            {isVerified && (
              <div className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                <ShieldCheck className="h-3 w-3" />
                本人確認済み
              </div>
            )}
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="hover:bg-accent">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed top-[65px] right-0 left-0 z-40 bg-card border-b-2 border-primary/20 shadow-lg">
          <div className="max-w-md mx-auto">
            <nav className="divide-y divide-border">
              <button
                onClick={() => {
                  setScreen("add-family")
                  setIsMenuOpen(false)
                }}
                className="w-full flex items-center gap-4 p-4 hover:bg-accent/50 transition-colors text-left"
              >
                <UserPlus className="w-5 h-5 text-foreground" />
                <span className="text-base font-medium">家族分を追加する</span>
              </button>
              <button
                onClick={() => {
                  setScreen("settings")
                  setIsMenuOpen(false)
                }}
                className="w-full flex items-center gap-4 p-4 hover:bg-accent/50 transition-colors text-left"
              >
                <Settings className="w-5 h-5 text-foreground" />
                <span className="text-base font-medium">設定</span>
              </button>
              <button
                onClick={() => {
                  setScreen("store-qr-scan")
                  setIsMenuOpen(false)
                }}
                className="w-full flex items-center gap-4 p-4 hover:bg-accent/50 transition-colors text-left"
              >
                <QrCode className="w-5 h-5 text-foreground" />
                <span className="text-base font-medium">支払う</span>
              </button>
              <button
                onClick={() => {
                  setScreen("store-finder")
                  setIsMenuOpen(false)
                }}
                className="w-full flex items-center gap-4 p-4 hover:bg-accent/50 transition-colors text-left"
              >
                <MapPin className="w-5 h-5 text-foreground" />
                <span className="text-base font-medium">使えるお店を探す</span>
              </button>
              <button
                onClick={() => {
                  setScreen("usage-history")
                  setIsMenuOpen(false)
                }}
                className="w-full flex items-center gap-4 p-4 hover:bg-accent/50 transition-colors text-left"
              >
                <History className="w-5 h-5 text-foreground" />
                <span className="text-base font-medium">利用履歴</span>
              </button>
              <button
                onClick={() => {
                  setScreen("help")
                  setIsMenuOpen(false)
                }}
                className="w-full flex items-start gap-4 p-5 hover:bg-accent/50 transition-colors text-left"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center mt-1">
                  <CircleHelp className="w-6 h-6 text-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-base font-medium text-foreground mb-1">使い方がわからない方</p>
                  <p className="text-sm text-foreground">最寄り自治体窓口でも聞けます</p>
                </div>
              </button>
              <button
                onClick={() => window.open("https://miniapp.line.me/2008554206-epgjrWQp", "_blank")}
                className="w-full flex items-center gap-4 p-4 hover:bg-accent/50 transition-colors text-left"
              >
                <Globe className="w-5 h-5 text-foreground" />
                <span className="text-base font-medium">全国デジタル窓口ポータル</span>
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Status Card */}
        <Card className="bg-gradient-to-br from-primary/5 to-secondary/10 border-2 border-primary/30 shadow-lg overflow-hidden">
          <div className="p-6 space-y-4">
            {/* Title and Status */}
            <div className="space-y-2">
              <h2 className="text-base font-medium text-muted-foreground">令和8年度 クーポン券給付事業</h2>
              <Badge className="bg-primary text-primary-foreground text-sm px-3 py-1 font-medium">利用可能</Badge>
            </div>

            {/* Balance Display */}
            <div className="py-6 text-center bg-card/60 rounded-xl border border-primary/20">
              <p className="text-sm text-foreground mb-1">残高</p>
              <p className="text-5xl font-bold text-foreground tracking-tight">
                {balance.toLocaleString()}
                <span className="text-3xl ml-1">円</span>
              </p>
            </div>

            {/* Expiry Date */}
            <div className="flex items-center justify-center text-sm text-muted-foreground bg-card/40 rounded-lg py-2">
              <span className="font-medium">有効期限: 2026年11月末まで</span>
            </div>

          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            size="lg"
            onClick={() => setScreen("add-family")}
            className="w-full min-h-32 h-auto py-6 flex flex-col items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md text-base font-bold"
          >
            <UserPlus className="w-8 h-8" />
            <span className="text-center leading-tight">
              家族分を
              <br />
              追加する
            </span>
          </Button>

          <Button
            size="lg"
            onClick={() => setScreen("store-qr-scan")}
            style={{
              backgroundColor: "#B0291F",
              color: "#FFFFFF",
            }}
            className="w-full min-h-32 h-auto py-6 flex flex-col items-center justify-center gap-3 shadow-md text-base font-bold hover:opacity-90 transition-opacity"
          >
            <QrCode className="w-8 h-8" />
            <span className="text-center leading-tight">支払う</span>
          </Button>
        </div>

        {/* Store QR Code Section */}
        <Card className="border-2 border-primary/20 shadow-sm">
          <div className="p-4">
            <button 
              onClick={() => setShowQRModal(true)}
              className="w-full flex flex-col items-center gap-3 p-4 bg-card/80 rounded-xl border border-primary/20 hover:bg-card transition-colors"
            >
              <div className="flex items-center gap-2 text-foreground">
                <QrCode className="w-5 h-5" />
                <span className="text-sm font-bold">店舗で読み取ってもらうQRコード</span>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <QRCodeSVG 
                  value={qrData} 
                  size={120} 
                  level="H"
                  includeMargin={true}
                />
              </div>
              <p className="text-xs text-muted-foreground text-center">
                タップして拡大表示
              </p>
            </button>
          </div>
        </Card>

        {/* QR Code Modal */}
        {showQRModal && (
          <div 
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
            onClick={() => setShowQRModal(false)}
          >
            <Card 
              className="max-w-sm w-full p-6 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center space-y-2">
                <h3 className="text-lg font-bold text-foreground">店舗読み取り用QRコード</h3>
                <p className="text-sm text-muted-foreground">
                  店舗のスマホでこのQRコードを読み取ってもらってください
                </p>
              </div>
              
              <div className="flex justify-center">
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <QRCodeSVG 
                    value={qrData} 
                    size={220} 
                    level="H"
                    includeMargin={true}
                  />
                </div>
              </div>

              <div className="bg-primary/30 rounded-lg p-4 text-center space-y-1">
                <p className="text-sm text-foreground">現在の残高</p>
                <p className="text-2xl font-bold text-foreground">
                  {balance.toLocaleString()}円
                </p>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                店舗側のLINEミニアプリでスキャンすると、<br />
                店舗が金額を入力して決済できます
              </p>

              <Button 
                variant="outline" 
                onClick={() => setShowQRModal(false)}
                className="w-full"
              >
                閉じる
              </Button>
            </Card>
          </div>
        )}

        {/* National Portal Button */}
        <Button
          size="lg"
          onClick={() => window.open("https://miniapp.line.me/2008554206-epgjrWQp", "_blank")}
          className="w-full min-h-20 h-auto py-5 flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-md text-base font-bold"
        >
          <Globe className="w-7 h-7" />
          <span className="text-center leading-tight">全国デジタル窓口ポータル</span>
        </Button>

        {/* Information Section */}
        <Card className="border-2 border-border shadow-sm">
          <div className="divide-y divide-border">
            <button
              onClick={() => setScreen("store-finder")}
              className="w-full flex items-center gap-4 p-5 hover:bg-accent/50 transition-colors text-left"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-foreground" />
              </div>
              <span className="text-base font-medium text-foreground">使えるお店を探す</span>
            </button>

            <button
              onClick={() => setScreen("usage-history")}
              className="w-full flex items-center gap-4 p-5 hover:bg-accent/50 transition-colors text-left"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center">
                <History className="w-6 h-6 text-foreground" />
              </div>
              <span className="text-base font-medium text-foreground">利用履歴</span>
            </button>

            <button
              onClick={() => setScreen("help")}
              className="w-full flex items-start gap-4 p-5 hover:bg-accent/50 transition-colors text-left"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center mt-1">
                <CircleHelp className="w-6 h-6 text-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-base font-medium text-foreground mb-1">使い方がわからない方</p>
                <p className="text-sm text-foreground">最寄り自治体窓口でも聞けます</p>
              </div>
            </button>
          </div>
        </Card>

        {/* Footer / Trust Badges */}
        <div className="pt-4 pb-8">
          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground font-medium">Powered by 生活応援デジタルクーポン事務局</p>
          </div>
        </div>
      </main>
    </div>
  )
}
