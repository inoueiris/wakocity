"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "lucide-react"
import { useCoupon } from "@/hooks/use-coupon"
import { Header } from "@/components/header"

interface DateOfBirthVerificationScreenProps {
  onNext: () => void
  isForFamily?: boolean
}

export function DateOfBirthVerificationScreen({ onNext, isForFamily = false }: DateOfBirthVerificationScreenProps) {
  const { setScreen } = useCoupon()
  const [year, setYear] = useState("")
  const [month, setMonth] = useState("")
  const [day, setDay] = useState("")
  const [error, setError] = useState("")

  const years = Array.from({ length: 125 }, (_, i) => (2024 - i).toString())
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString())
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString())

  const handleVerify = () => {
    if (!year || !month || !day) {
      setError("生年月日をすべて入力してください")
      return
    }

    // Validate year (1900-2024)
    const yearNum = Number.parseInt(year)
    if (yearNum < 1900 || yearNum > 2024) {
      setError("正しい年を入力してください")
      return
    }

    // Validate month (1-12)
    const monthNum = Number.parseInt(month)
    if (monthNum < 1 || monthNum > 12) {
      setError("正しい月を入力してください（1-12）")
      return
    }

    // Validate day (1-31)
    const dayNum = Number.parseInt(day)
    if (dayNum < 1 || dayNum > 31) {
      setError("正しい日を入力してください（1-31）")
      return
    }

    // Mock verification - in real app, verify against QR code data
    console.log("[v0] Verifying date of birth:", `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`)

    // Success
    onNext()
  }

  const handleBack = () => {
    if (isForFamily) {
      setScreen("add-family")
    } else {
      setScreen("qr-scan")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <Header
        title="生年月日確認"
        onBack={handleBack}
        backIcon={<Calendar className="w-8 h-8 text-foreground" />}
        backText="戻る"
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="max-w-md w-full space-y-6">
          <Card className="p-8 space-y-6 border-2 shadow-lg">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center">
                <Calendar className="w-8 h-8 text-foreground" />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold text-foreground">生年月日を入力してください</h2>
                <p className="text-sm text-muted-foreground">
                  あなたの生年月日を
                  <br />
                  入力して本人確認を行います
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>生年月日</Label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="year" className="text-xs text-muted-foreground">
                      年
                    </Label>
                    <Select
                      value={year}
                      onValueChange={(value) => {
                        setYear(value)
                        setError("")
                      }}
                    >
                      <SelectTrigger id="year">
                        <SelectValue placeholder="選択" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((y) => (
                          <SelectItem key={y} value={y}>
                            {y}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      value={year}
                      onChange={(e) => {
                        setYear(e.target.value)
                        setError("")
                      }}
                      placeholder="または入力"
                      min="1900"
                      max="2024"
                      className="text-center text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="month" className="text-xs text-muted-foreground">
                      月
                    </Label>
                    <Select
                      value={month}
                      onValueChange={(value) => {
                        setMonth(value)
                        setError("")
                      }}
                    >
                      <SelectTrigger id="month">
                        <SelectValue placeholder="選択" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((m) => (
                          <SelectItem key={m} value={m}>
                            {m}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      value={month}
                      onChange={(e) => {
                        setMonth(e.target.value)
                        setError("")
                      }}
                      placeholder="または入力"
                      min="1"
                      max="12"
                      className="text-center text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="day" className="text-xs text-muted-foreground">
                      日
                    </Label>
                    <Select
                      value={day}
                      onValueChange={(value) => {
                        setDay(value)
                        setError("")
                      }}
                    >
                      <SelectTrigger id="day">
                        <SelectValue placeholder="選択" />
                      </SelectTrigger>
                      <SelectContent>
                        {days.map((d) => (
                          <SelectItem key={d} value={d}>
                            {d}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      value={day}
                      onChange={(e) => {
                        setDay(e.target.value)
                        setError("")
                      }}
                      placeholder="または入力"
                      min="1"
                      max="31"
                      className="text-center text-xs"
                    />
                  </div>
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
              </div>

              <Button onClick={handleVerify} className="w-full py-6 text-lg font-bold" size="lg">
                確認する
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
