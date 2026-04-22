"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Screen =
  | "landing"
  | "product-selection"
  | "service-explanation"
  | "qr-scan"
  | "date-of-birth-verification"
  | "verification-loading"
  | "home"
  | "add-family"
  | "family-qr-scan"
  | "family-date-verification"
  | "payment"
  | "store-finder"
  | "usage-history"
  | "help"
  | "portal"
  | "admin"
  | "settings"
  | "store-qr-scan"

export interface Transaction {
  id: string
  date: string
  time: string
  store: string
  amount: number
  balance: number
  type: "charge" | "payment"
}

interface CouponContextType {
  balance: number
  transactions: Transaction[]
  screen: Screen
  setScreen: (screen: Screen) => void
  addCharge: (amount: number) => void
  makePayment: (store: string, amount: number) => void
  isVerified: boolean
  setIsVerified: (verified: boolean) => void
  userInfo: UserInfo | null
  setUserInfo: (info: UserInfo) => void
  removeFamilyCharge: (transactionId: string) => void
  qrVerified: boolean
  setQRVerified: (verified: boolean) => void
}

export interface UserInfo {
  phone: string
  name: string
  address: string
  zipCode: string
  dateOfBirth: string
  idType?: "license" | "mynumber" | "insurance"
  productType?: "rice" | "coupon"
  familyMembers?: Array<{
    name: string
    address: string
    zipCode: string
    dateOfBirth: string
    qrSerialId?: string
    qrVerifiedAt?: string
  }>
  qrSerialId?: string
  qrVerifiedAt?: string
}

const CouponContext = createContext<CouponContextType | undefined>(undefined)

export function CouponProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState<number>(0)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [screen, setScreen] = useState<Screen>("landing")
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [qrVerified, setQRVerified] = useState<boolean>(false)

  useEffect(() => {
    try {
      const savedBalance = localStorage.getItem("coupon_balance")
      const savedTransactions = localStorage.getItem("coupon_transactions")
      const savedVerified = localStorage.getItem("coupon_verified")
      const savedUserInfo = localStorage.getItem("coupon_user_info")
      const savedQRVerified = localStorage.getItem("coupon_qr_verified")

      if (savedBalance) {
        setBalance(Number(savedBalance))
      }

      if (savedTransactions) {
        setTransactions(JSON.parse(savedTransactions))
      }

      if (savedVerified) {
        setIsVerified(savedVerified === "true")
      }

      if (savedUserInfo) {
        setUserInfo(JSON.parse(savedUserInfo))
      }

      if (savedQRVerified) {
        setQRVerified(savedQRVerified === "true")
      }
    } catch (error) {
      console.error("Failed to load from localStorage:", error)
      localStorage.clear()
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("coupon_balance", balance.toString())
    } catch (error) {
      console.error("Failed to save balance:", error)
    }
  }, [balance])

  useEffect(() => {
    try {
      localStorage.setItem("coupon_transactions", JSON.stringify(transactions))
    } catch (error) {
      console.error("Failed to save transactions:", error)
    }
  }, [transactions])

  useEffect(() => {
    try {
      localStorage.setItem("coupon_verified", isVerified.toString())
    } catch (error) {
      console.error("Failed to save verified status:", error)
    }
  }, [isVerified])

  useEffect(() => {
    if (userInfo) {
      try {
        localStorage.setItem("coupon_user_info", JSON.stringify(userInfo))
      } catch (error) {
        console.error("Failed to save user info:", error)
      }
    }
  }, [userInfo])

  useEffect(() => {
    try {
      localStorage.setItem("coupon_qr_verified", qrVerified.toString())
    } catch (error) {
      console.error("Failed to save QR verified status:", error)
    }
  }, [qrVerified])

  const addCharge = (amount: number) => {
    const newBalance = balance + amount

    const now = new Date()

    const newTransaction: Transaction = {
      id: `charge_${Date.now()}`,
      date: now.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: now.toLocaleTimeString("ja-JP", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      store: amount === 8000 ? "クーポン発行" : "家族分追加",
      amount: amount,
      balance: newBalance,
      type: "charge",
    }

    setBalance(newBalance)
    setTransactions([newTransaction, ...transactions])
  }

  const makePayment = (store: string, amount: number) => {
    if (amount > balance) {
      throw new Error("残高不足")
    }

    const newBalance = balance - amount
    const now = new Date()

    const newTransaction: Transaction = {
      id: `payment_${Date.now()}`,
      date: now.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: now.toLocaleTimeString("ja-JP", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      store: store,
      amount: -amount,
      balance: newBalance,
      type: "payment",
    }

    setBalance(newBalance)
    setTransactions([newTransaction, ...transactions])
  }

  const removeFamilyCharge = (transactionId: string) => {
    const transaction = transactions.find((t) => t.id === transactionId)
    if (transaction && transaction.type === "charge") {
      setBalance(balance - transaction.amount)
      setTransactions(transactions.filter((t) => t.id !== transactionId))
    }
  }

  return (
    <CouponContext.Provider
      value={{
        balance,
        transactions,
        screen,
        setScreen,
        addCharge,
        makePayment,
        isVerified,
        setIsVerified,
        userInfo,
        setUserInfo,
        removeFamilyCharge,
        qrVerified,
        setQRVerified,
      }}
    >
      {children}
    </CouponContext.Provider>
  )
}

export function useCoupon() {
  const context = useContext(CouponContext)
  if (context === undefined) {
    throw new Error("useCoupon must be used within a CouponProvider")
  }
  return context
}
