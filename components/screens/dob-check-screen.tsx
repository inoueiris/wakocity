"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield } from "lucide-react"

interface DOBCheckScreenProps {
  onNext: () => void
}

export function DOBCheckScreen({ onNext }: DOBCheckScreenProps) {
  const [year, setYear] = useState<string>("")
  const [month, setMonth] = useState<string>("")
  const [day, setDay] = useState<string>("")
  const [error, setError] = useState<string>("")

  const years = Array.from({ length: 86 }, (_, i) => 2005 - i)
  const months = Array.from({ length: 12 }, (_, i) => i + 1)
  const days = Array.from({ length: 31 }, (_, i) => i + 1)

  const handleSubmit = () => {
    if (!year || !month || !day) {
      setError("すべての項目を入力してください")
      return
    }

    if (year === "1997") {
      onNext()
    } else {
      setError("生年月日が一致しません。もう一度お確かめください。")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-4 shadow-md">
        <div className="max-w-md mx-auto">
          <h1 className="text-xl font-bold text-center">ご本人確認</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="max-w-md w-full space-y-6">
          {/* Security Notice */}
          <Card className="p-6 bg-primary/30 border-primary/20 border-2">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-foreground flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-foreground">セキュリティのため</p>
                <p className="text-sm text-muted-foreground leading-relaxed">世帯主様の生年月日を入力してください</p>
              </div>
            </div>
          </Card>

          {/* DOB Input Card */}
          <Card className="p-6 space-y-6 border-2 shadow-lg">
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-center text-foreground">生年月日を入力</h2>
              <p className="text-sm text-muted-foreground text-center">クーポン券に記載されている世帯主の生年月日</p>
            </div>

            {/* Date Selectors */}
            <div className="space-y-4">
              {/* Year */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">年</label>
                <Select value={year} onValueChange={setYear}>
                  <SelectTrigger className="w-full text-lg">
                    <SelectValue placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((y) => (
                      <SelectItem key={y} value={String(y)}>
                        {y}年
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Month */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">月</label>
                <Select value={month} onValueChange={setMonth}>
                  <SelectTrigger className="w-full text-lg">
                    <SelectValue placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((m) => (
                      <SelectItem key={m} value={String(m)}>
                        {m}月
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Day */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">日</label>
                <Select value={day} onValueChange={setDay}>
                  <SelectTrigger className="w-full text-lg">
                    <SelectValue placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((d) => (
                      <SelectItem key={d} value={String(d)}>
                        {d}日
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <Button
              size="lg"
              onClick={handleSubmit}
              className="w-full py-6 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              次へ
            </Button>
          </Card>
        </div>
      </main>
    </div>
  )
}
