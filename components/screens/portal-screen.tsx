"use client"
import { ArrowLeft, MapPin, Store, FileText, Phone, Globe, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCoupon } from "@/hooks/use-coupon"
import Image from "next/image"

export function PortalScreen() {
  const { setScreen } = useCoupon()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b-2 border-primary/20 shadow-sm">
        <div className="flex items-center gap-4 px-4 py-4">
          <button
            onClick={() => setScreen("home")}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            aria-label="戻る"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="生活応援デジタルクーポン"
              width={40}
              height={40}
              className="object-contain"
            />
            <h1 className="text-lg font-bold text-foreground">和光市　生活応援デジタルクーポン ポータル</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Hero Section */}
        <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/30 shadow-lg p-6">
          <div className="space-y-3 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/30 mx-auto">
              <Globe className="w-8 h-8 text-foreground" />
            </div>
            <h2 className="text-xl font-bold text-foreground">和光市　生活応援デジタルクーポン</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              デジタルクーポン券は、全国の自治体で利用できる便利な電子給付システムです
            </p>
          </div>
        </Card>

        {/* Main Menu */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-foreground px-1">メニュー</h3>

          <Card className="border-2 border-border shadow-sm overflow-hidden">
            <div className="divide-y divide-border">
              <button className="w-full flex items-center gap-4 p-5 hover:bg-accent/50 transition-colors text-left">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-base font-medium text-foreground">参加自治体一覧</p>
                  <p className="text-sm text-foreground">クーポン券が使える地域を確認</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-4 p-5 hover:bg-accent/50 transition-colors text-left">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center">
                  <Store className="w-6 h-6 text-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-base font-medium text-foreground">全国加盟店検索</p>
                  <p className="text-sm text-foreground">クーポン券が使えるお店を探す</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-4 p-5 hover:bg-accent/50 transition-colors text-left">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-base font-medium text-foreground">制度について</p>
                  <p className="text-sm text-foreground">クーポン券の仕組みと使い方</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-4 p-5 hover:bg-accent/50 transition-colors text-left">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-base font-medium text-foreground">お問い合わせ</p>
                  <p className="text-sm text-foreground">困ったときはこちら</p>
                </div>
              </button>
            </div>
          </Card>
        </div>

        {/* Information Section */}
        <Card className="border-2 border-border shadow-sm p-5">
          <h3 className="text-base font-bold text-foreground mb-4">お知らせ</h3>
          <div className="space-y-3">
            <div className="flex gap-3 text-sm">
              <span className="flex-shrink-0 text-muted-foreground">2025/01/15</span>
              <p className="text-foreground">新たに3つの自治体が参加しました</p>
            </div>
            <div className="flex gap-3 text-sm">
              <span className="flex-shrink-0 text-muted-foreground">2025/01/10</span>
              <p className="text-foreground">加盟店が全国で1,000店舗を突破</p>
            </div>
            <div className="flex gap-3 text-sm">
              <span className="flex-shrink-0 text-muted-foreground">2025/01/05</span>
              <p className="text-foreground">スマホ操作サポート窓口を開設</p>
            </div>
          </div>
        </Card>

        {/* Contact Info */}
        <Card className="border-2 border-primary/30 bg-primary/5 shadow-sm p-5">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Mail className="w-5 h-5 text-foreground" />
              運営事務局
            </h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p className="font-medium">生活応援デジタルクーポン事務局</p>
            </div>
          </div>
        </Card>

        {/* Back Button */}
        <Button onClick={() => setScreen("home")} variant="outline" size="lg" className="w-full text-base font-bold">
          ホーム画面に戻る
        </Button>
      </main>
    </div>
  )
}
