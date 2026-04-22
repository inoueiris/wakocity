"use client"

import { Loader2, CheckCircle2 } from "lucide-react"
import { useEffect, useState } from "react"

export function VerificationLoadingScreen() {
  const [showCheck, setShowCheck] = useState(false)

  useEffect(() => {
    // Show checkmark after 2 seconds
    const timer = setTimeout(() => {
      setShowCheck(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-[#06C755] text-white py-6 px-4 shadow-md">
        <div className="max-w-md mx-auto">
          <h1 className="text-xl font-bold text-center">本人確認</h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="relative">
            {!showCheck ? (
              <div className="w-24 h-24 mx-auto">
                <Loader2 className="w-24 h-24 text-[#06C755] animate-spin" />
              </div>
            ) : (
              <div className="w-24 h-24 mx-auto animate-scale-in">
                <CheckCircle2 className="w-24 h-24 text-[#06C755]" />
              </div>
            )}
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold">{!showCheck ? "本人確認中" : "本人確認が完了しました"}</h2>
            <p className="text-muted-foreground">
              {!showCheck
                ? "QRコードと生年月日による本人確認を行っています。しばらくお待ちください。"
                : "ホーム画面に移動します..."}
            </p>
          </div>

          {!showCheck && (
            <div className="flex flex-col items-center gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-[#06C755] rounded-full animate-pulse" />
                <span>処理中...</span>
              </div>
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        @keyframes scale-in {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
