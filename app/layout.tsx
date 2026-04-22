import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans_JP } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { CouponProvider } from "@/hooks/use-coupon"

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
})

export const metadata: Metadata = {
  title: "生活応援デジタルクーポン",
  description: "デジタルクーポン券プラットフォーム - 自治体からのデジタル給付",
  generator: "v0.app",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className="bg-background">
      <body className={`${notoSansJP.className} antialiased`}>
        <CouponProvider>{children}</CouponProvider>
        <Analytics />
      </body>
    </html>
  )
}

