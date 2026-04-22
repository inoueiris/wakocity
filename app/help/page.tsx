import { Phone, Mail, MapPin, BookOpen, ExternalLink } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-accent/30">
      <Header title="〇〇市" showBack={true} showMenu={true} />

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">ヘルプ・お問い合わせ</h2>
          <p className="text-base text-muted-foreground">困ったときはこちら</p>
        </div>

        {/* FAQ Section */}
        <Card className="p-5 space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-foreground">よくある質問</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-base font-medium text-foreground">Q. クーポン券が届きません</p>
              <p className="text-sm text-muted-foreground pl-4">
                A.
                クーポン券は対象世帯に順次発送しております。2週間以上届かない場合は、下記お問い合わせ窓口までご連絡ください。
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-base font-medium text-foreground">Q. 残高が足りない場合は？</p>
              <p className="text-sm text-muted-foreground pl-4">
                A. 不足分は現金でお支払いいただけます。クーポン券と現金の併用が可能です。
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-base font-medium text-foreground">Q. 有効期限が過ぎたら？</p>
              <p className="text-sm text-muted-foreground pl-4">
                A. 有効期限を過ぎた残高は使用できなくなります。期限内に必ずご利用ください。
              </p>
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="p-5 space-y-4">
          <h3 className="text-lg font-bold text-foreground">お問い合わせ窓口</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">〇〇市 クーポン券事業事務局</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">0120-XXX-XXX</p>
                    <p className="text-xs">受付時間: 平日 9:00-17:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>okome@city.example.jp</p>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>〇〇市中央区役所1階 クーポン券窓口</p>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full h-12 text-base font-medium border-2 border-primary text-primary hover:bg-primary/5 bg-transparent"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              市のホームページを開く
            </Button>
          </div>
        </Card>

        {/* Post Office Information */}
        <Card className="p-5 space-y-3 bg-secondary/5 border-2 border-secondary/30">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-secondary" />
            <h3 className="text-lg font-bold text-foreground">郵便局でもサポート</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            市内の郵便局窓口でも使い方のご案内をしております。お気軽にお立ち寄りください。
          </p>
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">対応郵便局：</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>〇〇中央郵便局</li>
              <li>〇〇駅前郵便局</li>
              <li>〇〇北郵便局</li>
            </ul>
          </div>
        </Card>
      </main>
    </div>
  )
}
