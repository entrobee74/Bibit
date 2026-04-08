// src/types/index.ts

export type UserRole = 'user' | 'admin'
export type UserStatus = 'active' | 'inactive' | 'suspended'
export type TransactionType = 'DEPOSIT' | 'WITHDRAWAL'
export type TransactionStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED'
export type PlanCategory = 'MENTORSHIP' | 'FUNDED_ACCOUNTS' | 'AI_TRADING'
export type PlanTier = 'BASIC' | 'PRO' | 'ELITE'
export type PlanStatus = 'active' | 'expired' | 'cancelled'
export type TradeStatus = 'open' | 'closed' | 'cancelled'
export type TradeSide = 'BUY' | 'SELL'
export type CoinStatus = 'active' | 'inactive'

export interface User {
  id: string
  name: string
  email: string
  passwordHash: string
  role: UserRole
  status: UserStatus
  createdAt: Date
  updatedAt: Date
}

export interface Wallet {
  id: string
  userId: string
  coinId: string
  balance: number
  roiPercent: number
  status: 'active' | 'inactive'
  createdAt: Date
  updatedAt: Date
}

export interface Coin {
  id: string
  symbol: string
  name: string
  logoUrl: string
  status: CoinStatus
  network: string
  depositAddress: string
  createdAt: Date
  updatedAt: Date
}

export interface Plan {
  id: string
  name: string
  category: PlanCategory
  tier: PlanTier
  price: number // in USD equivalent
  roiPercent: number
  durationDays: number
  description: string
  features: string[]
  minDeposit?: number
  maxDeposit?: number
  createdAt: Date
  updatedAt: Date
}

export interface UserPlan {
  id: string
  userId: string
  planId: string
  startedAt: Date
  expiresAt: Date
  status: PlanStatus
  createdAt: Date
  updatedAt: Date
}

export interface TransactionRequest {
  id: string
  userId: string
  walletId: string
  type: TransactionType
  amount: number
  status: TransactionStatus
  txHash?: string
  destinationAddress?: string // for withdrawals
  rejectionReason?: string
  createdAt: Date
  processedAt?: Date
  processedByAdminId?: string
}

export interface Trade {
  id: string
  userId: string
  symbol: string
  side: TradeSide
  size: number
  entryPrice: number
  currentPrice: number
  leverage: number
  status: TradeStatus
  pnl: number
  pnlPercent: number
  openedAt: Date
  closedAt?: Date
}

export interface Referral {
  id: string
  referrerId: string
  referredUserId: string
  status: 'active' | 'inactive'
  createdAt: Date
}

export interface ReferralEarning {
  id: string
  referralId: string
  referrerId: string
  amount: number
  type: 'signup_bonus' | 'trading_fee' | 'plan_purchase'
  createdAt: Date
}

export interface PriceData {
  symbol: string
  price: number
  change24h: number
  changePercent24h: number
  high24h: number
  low24h: number
  volume24h: number
  timestamp: Date
}

export interface SessionUser {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
}
