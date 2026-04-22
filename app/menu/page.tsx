import Link from "next/link"
import { Home, MapPin, History, CircleHelp, Settings, FileText, LogOut } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Header } from "@/components/header"

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-accent/30">
      <Header title="メニュー" showBack={true} showMenu={false} />

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        <Card className="border-2 border-border shadow-sm divide-y divide-border">
          <Link href="/" className="flex items-center gap-4 p-5 hover:bg-accent/50 transition-colors">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Home className="w-6 h-6 text-primary" />
            </div>
            <span className="text-base font-medium text-foreground">ホーム</span>
          </Link>

          <Link href="/stores" className="flex items-center gap-4 p-5 hover:bg-accent/50 transition-colors">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <span className="text-base font-medium text-foreground">使えるお店</span>
          </Link>

          <Link href="/history" className="flex items-center gap-4 p-5 hover:bg-accent/50 transition-colors">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <History className="w-6 h-6 text-primary" />
            </div>
            <span className="text-base font-medium text-foreground">利用履歴</span>
          </Link>

          <Link href="/help" className="flex items-center gap-4 p-5 hover:bg-accent/50 transition-colors">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
              <CircleHelp className="w-6 h-6 text-secondary" />
            </div>
            <span className="text-base font-medium text-foreground">ヘルプ</span>
          </Link>
        </Card>

        <Card className="border-2 border-border shadow-sm divide-y divide-border">
          <button className="w-full flex items-center gap-4 p-5 hover:bg-accent/50 transition-colors text-left">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
              <Settings className="w-6 h-6 text-muted-foreground" />
            </div>
            <span className="text-base font-medium text-foreground">設定</span>
          </button>

          <button className="w-full flex items-center gap-4 p-5 hover:bg-accent/50 transition-colors text-left">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
              <FileText className="w-6 h-6 text-muted-foreground" />
            </div>
            <span className="text-base font-medium text-foreground">利用規約</span>
          </button>

          <button className="w-full flex items-center gap-4 p-5 hover:bg-accent/50 transition-colors text-left">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
              <LogOut className="w-6 h-6 text-muted-foreground" />
            </div>
            <span className="text-base font-medium text-foreground">ログアウト</span>
          </button>
        </Card>

        <div className="text-center space-y-2 pt-4">
          <p className="text-xs text-muted-foreground">令和8年度 クーポン券給付事業</p>
          <p className="text-xs text-muted-foreground">Version 1.0.0</p>
        </div>
      </main>
    </div>
  )
}
