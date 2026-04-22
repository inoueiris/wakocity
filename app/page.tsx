"use client"

import { useCoupon } from "@/hooks/use-coupon"
import { LandingScreen } from "@/components/screens/landing-screen"
import { ProductSelectionScreen } from "@/components/screens/product-selection-screen"
import { ServiceExplanationScreen } from "@/components/screens/service-explanation-screen"
import { HomeScreen } from "@/components/screens/home-screen"
import { AddFamilyScreen } from "@/components/screens/add-family-screen"
import { PaymentScreen } from "@/components/screens/payment-screen"
import { StoreFinderScreen } from "@/components/screens/store-finder-screen"
import { UsageHistoryScreen } from "@/components/screens/usage-history-screen"
import { HelpScreen } from "@/components/screens/help-screen"
import { PortalScreen } from "@/components/screens/portal-screen"
import { AdminPanelScreen } from "@/components/screens/admin-panel-screen"
import { VerificationLoadingScreen } from "@/components/screens/verification-loading-screen"
import { SettingsScreen } from "@/components/screens/settings-screen"
import { QRScanScreen } from "@/components/screens/qr-scan-screen"
import { DateOfBirthVerificationScreen } from "@/components/screens/date-of-birth-verification-screen"
import { StoreQRScanScreen } from "@/components/screens/store-qr-scan-screen"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function RiceCouponPlatform() {
  const { screen, setScreen, setIsVerified, addCharge } = useCoupon()
  const [error, setError] = useState<string | null>(null)
  const [qrSerialId, setQrSerialId] = useState<string>("")

  useEffect(() => {
    try {
      localStorage.setItem("test_quota", "test")
      localStorage.removeItem("test_quota")
    } catch (err) {
      if (err instanceof Error && err.message.includes("quota")) {
        setError("ストレージ容量が不足しています。データをクリアしてください。")
        console.error("[v0] LocalStorage quota exceeded:", err)
      }
    }
  }, [])

  if (error) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-red-600 mb-4">エラーが発生しました</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <Button
            onClick={() => {
              localStorage.clear()
              window.location.reload()
            }}
            className="w-full"
          >
            データをクリアして再起動
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {screen === "landing" && <LandingScreen onNext={() => setScreen("product-selection")} />}
      {screen === "product-selection" && <ProductSelectionScreen onNext={() => setScreen("service-explanation")} />}
      {screen === "service-explanation" && <ServiceExplanationScreen onNext={() => setScreen("qr-scan")} />}

      {screen === "qr-scan" && (
        <QRScanScreen
          onNext={(serialId) => {
            setQrSerialId(serialId)
            setScreen("date-of-birth-verification")
          }}
        />
      )}
      {screen === "date-of-birth-verification" && (
        <DateOfBirthVerificationScreen
          onNext={() => {
            setScreen("verification-loading")
            setTimeout(() => {
              console.log("[v0] Charging 8000 yen for main user verification")
              addCharge(8000)
              setIsVerified(true)
              setScreen("home")
            }, 2000)
          }}
        />
      )}

      {screen === "family-qr-scan" && (
        <QRScanScreen
          isForFamily
          onNext={(serialId) => {
            setQrSerialId(serialId)
            setScreen("family-date-verification")
          }}
        />
      )}
      {screen === "family-date-verification" && (
        <DateOfBirthVerificationScreen
          isForFamily
          onNext={() => {
            setScreen("verification-loading")
            setTimeout(() => {
              console.log("[v0] Charging 8000 yen for family member verification")
              addCharge(8000)
              setScreen("home")
            }, 2000)
          }}
        />
      )}

      {screen === "verification-loading" && <VerificationLoadingScreen />}
      {screen === "home" && <HomeScreen />}
      {screen === "add-family" && <AddFamilyScreen />}
      {screen === "payment" && <PaymentScreen />}
      {screen === "store-qr-scan" && <StoreQRScanScreen />}
      {screen === "store-finder" && <StoreFinderScreen />}
      {screen === "usage-history" && <UsageHistoryScreen />}
      {screen === "help" && <HelpScreen />}
      {screen === "portal" && <PortalScreen />}
      {screen === "admin" && <AdminPanelScreen />}
      {screen === "settings" && <SettingsScreen />}
    </div>
  )
}
