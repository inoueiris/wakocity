"use client"
import { ArrowLeft, Phone, Mail, MapPin, CircleHelp, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCoupon } from "@/hooks/use-coupon"

export function HelpScreen() {
  const { setScreen } = useCoupon()

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
          <h1 className="text-xl font-bold text-foreground">使い方・お問い合わせ</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        <Card className="p-6 bg-primary/10 border-primary/20 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/30 rounded-full flex items-center justify-center flex-shrink-0">
              <CircleHelp className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">お困りの方へ</h2>
              <p className="text-sm text-muted-foreground">自治体で直接サポートを受けられます</p>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-foreground">よくある質問</h3>

          <Card className="divide-y divide-border">
            <details className="group p-5">
              <summary className="cursor-pointer font-medium text-foreground list-none flex items-center justify-between">
                <span>クーポン券の使い方を教えてください</span>
                <span className="text-foreground group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                加盟店のレジで「クーポン券で支払います」と伝え、アプリの「支払う」ボタンからQRコードを表示して店員に読み取ってもらってください。
              </p>
            </details>

            <details className="group p-5">
              <summary className="cursor-pointer font-medium text-foreground list-none flex items-center justify-between">
                <span>残高が足りない場合はどうすればいいですか？</span>
                <span className="text-foreground group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                不足分は現金やクレジットカードなど、他の支払い方法と併用できます。店員にその旨をお伝えください。
              </p>
            </details>

            <details className="group p-5">
              <summary className="cursor-pointer font-medium text-foreground list-none flex items-center justify-between">
                <span>スマートフォンの操作が難しいです</span>
                <span className="text-foreground group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                お近くの自治体窓口でスタッフが丁寧にサポートいたします。お気軽にお越しください。
              </p>
            </details>
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-foreground">お問い合わせ</h3>

          <Card className="p-5 space-y-4">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
              <div className="space-y-1 flex-1">
                <p className="font-medium text-foreground">電話でのお問い合わせ</p>
                <p className="text-lg font-bold text-foreground">0120-XXX-XXX</p>
                <p className="text-sm text-foreground">受付時間: 平日 9:00-18:00</p>
              </div>
            </div>
          </Card>

          <Card className="p-5 space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
              <div className="space-y-1 flex-1">
                <p className="font-medium text-foreground">メールでのお問い合わせ</p>
                <p className="text-sm text-foreground break-all">support@okome-coupon.jp</p>
                <p className="text-sm text-foreground">24時間受付（返信は営業時間内）</p>
              </div>
            </div>
          </Card>

          <Card className="p-5 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
              <div className="space-y-2 flex-1">
                <p className="font-medium text-foreground">対面サポート</p>
                <p className="text-sm text-foreground">お近くの窓口でスタッフが直接サポートいたします</p>
                <Button variant="outline" className="w-full gap-2 bg-transparent">
                  <ExternalLink className="w-4 h-4" />
                  最寄りの自治体窓口 を探す
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-4 bg-primary/5 border-primary/20">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">営業時間外のお問い合わせ:</strong>{" "}
            メールまたは翌営業日の電話対応となります。お急ぎの場合は最寄りの自治体窓口をご利用ください。
          </p>
        </Card>
      </main>
    </div>
  )
}
