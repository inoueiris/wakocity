import Link from "next/link"
import { ArrowLeft, Menu } from "lucide-react"
import Image from "next/image"

interface HeaderProps {
  title?: string
  showBack?: boolean
  showMenu?: boolean
  onBack?: () => void
}

export function Header({ title = "和光市　生活応援デジタルクーポン", showBack = false, showMenu = false, onBack }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground border-b border-primary/10 shadow-md">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2 flex-1">
          {showBack && (
            onBack ? (
              <button onClick={onBack} className="p-2 hover:bg-primary/80 rounded-lg transition-colors" aria-label="戻る">
                <ArrowLeft className="w-5 h-5" />
              </button>
            ) : (
              <Link href="/" className="p-2 hover:bg-primary/80 rounded-lg transition-colors" aria-label="戻る">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            )
          )}
          <Link href="/" className="flex items-center gap-2 flex-1">
            <Image
              src="/logo.png"
              alt="和光市ロゴ"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
            <h1 className="text-sm font-bold hidden sm:block">{title}</h1>
          </Link>
        </div>
        {showMenu && (
          <Link href="/menu" className="p-2 hover:bg-primary/80 rounded-lg transition-colors" aria-label="メニュー">
            <Menu className="w-5 h-5" />
          </Link>
        )}
      </div>
    </header>
  )
}

