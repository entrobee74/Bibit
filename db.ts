// src/services/db.ts
import { v4 as uuidv4 } from 'uuid'
import type {
  User,
  Coin,
  Wallet,
  Plan,
  UserPlan,
  TransactionRequest,
  Trade,
  Referral,
  ReferralEarning,
} from '@/types'

/**
 * In-memory database service.
 * This can be replaced with SQLite/Prisma or any real database.
 * Structure follows the schema closely for easy migration.
 */

class Database {
  private users: Map<string, User> = new Map()
  private coins: Map<string, Coin> = new Map()
  private wallets: Map<string, Wallet> = new Map()
  private plans: Map<string, Plan> = new Map()
  private userPlans: Map<string, UserPlan> = new Map()
  private transactions: Map<string, TransactionRequest> = new Map()
  private trades: Map<string, Trade> = new Map()
  private referrals: Map<string, Referral> = new Map()
  private referralEarnings: Map<string, ReferralEarning> = new Map()
  private failedAttempts: Map<string, number> = new Map()

  constructor() {
    this.initializeDefaultData()
  }

  private initializeDefaultData() {
    // Default coins
    const defaultCoins = [
      {
        id: uuidv4(),
        symbol: 'BTC',
        name: 'Bitcoin',
        logoUrl: '₿',
        status: 'active' as const,
        network: 'Bitcoin',
        depositAddress: '1A1z7agoat2QJVA5yafqLz1XEWPhqTg7sg',
      },
      {
        id: uuidv4(),
        symbol: 'ETH',
        name: 'Ethereum',
        logoUrl: 'Ξ',
        status: 'active' as const,
        network: 'Ethereum',
        depositAddress: '0x742d35Cc6634C0532925a3b844Bc526e4B8d0b6D',
      },
      {
        id: uuidv4(),
        symbol: 'USDT',
        name: 'Tether',
        logoUrl: '₮',
        status: 'active' as const,
        network: 'Ethereum',
        depositAddress: '0x71BA5Cd6Ea2ce7f93AaB76A2aE0be93eCB05b1F5',
      },
    ]

    defaultCoins.forEach(coin => {
      const fullCoin: Coin = {
        ...coin,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      this.coins.set(coin.id, fullCoin)
    })

    // Default plans
    const defaultPlans = [
      // Mentorship Plans
      {
        id: uuidv4(),
        name: 'Mentorship Basic',
        category: 'MENTORSHIP' as const,
        tier: 'BASIC' as const,
        price: 99,
        roiPercent: 5,
        durationDays: 30,
        description: 'Personal trading guidance from experienced mentors',
        features: ['Weekly 1:1 sessions', 'Trade signal alerts', 'Community access'],
      },
      {
        id: uuidv4(),
        name: 'Mentorship Pro',
        category: 'MENTORSHIP' as const,
        tier: 'PRO' as const,
        price: 299,
        roiPercent: 10,
        durationDays: 30,
        description: 'Advanced mentorship with portfolio management',
        features: ['Daily 1:1 sessions', 'Advanced signals', 'Portfolio review', 'Priority support'],
      },
      {
        id: uuidv4(),
        name: 'Mentorship Elite',
        category: 'MENTORSHIP' as const,
        tier: 'ELITE' as const,
        price: 999,
        roiPercent: 15,
        durationDays: 30,
        description: 'Executive-level mentorship and trading management',
        features: ['24/7 access', 'Full portfolio management', 'Private sessions', 'VIP support'],
      },
      // Funded Accounts
      {
        id: uuidv4(),
        name: 'Funded Accounts Basic',
        category: 'FUNDED_ACCOUNTS' as const,
        tier: 'BASIC' as const,
        price: 500,
        roiPercent: 8,
        durationDays: 90,
        description: '$10k funded trading account',
        features: ['$10,000 trading capital', '80/20 profit split', 'No time limit'],
        minDeposit: 500,
      },
      {
        id: uuidv4(),
        name: 'Funded Accounts Pro',
        category: 'FUNDED_ACCOUNTS' as const,
        tier: 'PRO' as const,
        price: 1500,
        roiPercent: 12,
        durationDays: 90,
        description: '$50k funded trading account',
        features: ['$50,000 trading capital', '85/15 profit split', 'Priority payouts'],
        minDeposit: 1500,
      },
      {
        id: uuidv4(),
        name: 'Funded Accounts Elite',
        category: 'FUNDED_ACCOUNTS' as const,
        tier: 'ELITE' as const,
        price: 5000,
        roiPercent: 15,
        durationDays: 90,
        description: '$250k funded trading account',
        features: ['$250,000 trading capital', '90/10 profit split', 'Dedicated support'],
        minDeposit: 5000,
      },
      // AI Trading Plans
      {
        id: uuidv4(),
        name: 'AI Trading Starter',
        category: 'AI_TRADING' as const,
        tier: 'BASIC' as const,
        price: 49,
        roiPercent: 12,
        durationDays: 30,
        description: 'AI-powered trading signals',
        features: ['Daily signals', 'Risk management', 'Email alerts'],
      },
      {
        id: uuidv4(),
        name: 'AI Trading Advanced',
        category: 'AI_TRADING' as const,
        tier: 'PRO' as const,
        price: 149,
        roiPercent: 18,
        durationDays: 30,
        description: 'Advanced AI with auto-trading',
        features: ['Real-time signals', 'Auto-trading', 'API access', 'Advanced analytics'],
      },
      {
        id: uuidv4(),
        name: 'AI Trading Premium',
        category: 'AI_TRADING' as const,
        tier: 'ELITE' as const,
        price: 499,
        roiPercent: 25,
        durationDays: 30,
        description: 'Premium AI with full automation',
        features: ['24/7 trading', 'Custom strategies', 'White-glove service', 'Dedicated manager'],
      },
    ]

    defaultPlans.forEach(plan => {
      const fullPlan: Plan = {
        ...plan,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      this.plans.set(plan.id, fullPlan)
    })

    // Default admin user
    const adminId = uuidv4()
    this.users.set(adminId, {
      id: adminId,
      name: 'Admin User',
      email: 'admin@bibit.com',
      passwordHash: 'hashed_password_123', // In production, use bcrypt
      role: 'admin',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // Default test user
    const userId = uuidv4()
    this.users.set(userId, {
      id: userId,
      name: 'John Trader',
      email: 'user@bibit.com',
      passwordHash: 'hashed_password_123',
      role: 'user',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // Default wallets for test user
    const coinArray = Array.from(this.coins.values())
    coinArray.forEach(coin => {
      const walletId = uuidv4()
      this.wallets.set(walletId, {
        id: walletId,
        userId,
        coinId: coin.id,
        balance: coin.symbol === 'BTC' ? 0.5 : coin.symbol === 'ETH' ? 10 : 50000,
        roiPercent: 0,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    })
  }

  // Users
  getUser(id: string): User | null {
    return this.users.get(id) || null
  }

  getUserByEmail(email: string): User | null {
    return Array.from(this.users.values()).find(u => u.email === email) || null
  }

  createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User {
    const id = uuidv4()
    const user: User = {
      ...data,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.users.set(id, user)
    return user
  }

  updateUser(id: string, data: Partial<User>): User | null {
    const user = this.users.get(id)
    if (!user) return null
    const updated: User = {
      ...user,
      ...data,
      updatedAt: new Date(),
    }
    this.users.set(id, updated)
    return updated
  }

  getAllUsers(): User[] {
    return Array.from(this.users.values())
  }

  // Coins
  getCoin(id: string): Coin | null {
    return this.coins.get(id) || null
  }

  getCoinBySymbol(symbol: string): Coin | null {
    return Array.from(this.coins.values()).find(c => c.symbol === symbol) || null
  }

  getAllCoins(): Coin[] {
    return Array.from(this.coins.values())
  }

  updateCoin(id: string, data: Partial<Coin>): Coin | null {
    const coin = this.coins.get(id)
    if (!coin) return null
    const updated: Coin = {
      ...coin,
      ...data,
      updatedAt: new Date(),
    }
    this.coins.set(id, updated)
    return updated
  }

  // Wallets
  getWallet(id: string): Wallet | null {
    return this.wallets.get(id) || null
  }

  getWalletsByUserId(userId: string): Wallet[] {
    return Array.from(this.wallets.values()).filter(w => w.userId === userId)
  }

  getWalletByUserAndCoin(userId: string, coinId: string): Wallet | null {
    return (
      Array.from(this.wallets.values()).find(
        w => w.userId === userId && w.coinId === coinId
      ) || null
    )
  }

  updateWallet(id: string, data: Partial<Wallet>): Wallet | null {
    const wallet = this.wallets.get(id)
    if (!wallet) return null
    const updated: Wallet = {
      ...wallet,
      ...data,
      updatedAt: new Date(),
    }
    this.wallets.set(id, updated)
    return updated
  }

  getAllWallets(): Wallet[] {
    return Array.from(this.wallets.values())
  }

  // Plans
  getPlan(id: string): Plan | null {
    return this.plans.get(id) || null
  }

  getPlansByCategory(category: string): Plan[] {
    return Array.from(this.plans.values()).filter(p => p.category === category)
  }

  getAllPlans(): Plan[] {
    return Array.from(this.plans.values())
  }

  // User Plans
  getUserActivePlan(userId: string): UserPlan | null {
    return (
      Array.from(this.userPlans.values()).find(
        up => up.userId === userId && up.status === 'active' && up.expiresAt > new Date()
      ) || null
    )
  }

  getUserPlans(userId: string): UserPlan[] {
    return Array.from(this.userPlans.values()).filter(up => up.userId === userId)
  }

  createUserPlan(data: Omit<UserPlan, 'id' | 'createdAt' | 'updatedAt'>): UserPlan {
    const id = uuidv4()
    const userPlan: UserPlan = {
      ...data,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.userPlans.set(id, userPlan)
    return userPlan
  }

  // Transactions
  getTransaction(id: string): TransactionRequest | null {
    return this.transactions.get(id) || null
  }

  getTransactionsByUserId(userId: string): TransactionRequest[] {
    return Array.from(this.transactions.values()).filter(t => t.userId === userId)
  }

  getTransactionsByType(type: string, status?: string): TransactionRequest[] {
    let filtered = Array.from(this.transactions.values()).filter(t => t.type === type)
    if (status) {
      filtered = filtered.filter(t => t.status === status)
    }
    return filtered
  }

  createTransaction(
    data: Omit<TransactionRequest, 'id' | 'createdAt' | 'processedAt'>
  ): TransactionRequest {
    const id = uuidv4()
    const transaction: TransactionRequest = {
      ...data,
      id,
      createdAt: new Date(),
    }
    this.transactions.set(id, transaction)
    return transaction
  }

  updateTransaction(id: string, data: Partial<TransactionRequest>): TransactionRequest | null {
    const transaction = this.transactions.get(id)
    if (!transaction) return null
    const updated: TransactionRequest = {
      ...transaction,
      ...data,
      processedAt: data.status === 'COMPLETED' || data.status === 'APPROVED' || data.status === 'REJECTED' ? new Date() : undefined,
    }
    this.transactions.set(id, updated)
    return updated
  }

  getAllTransactions(): TransactionRequest[] {
    return Array.from(this.transactions.values())
  }

  // Trades
  getTrade(id: string): Trade | null {
    return this.trades.get(id) || null
  }

  getTradesByUserId(userId: string, status?: string): Trade[] {
    let trades = Array.from(this.trades.values()).filter(t => t.userId === userId)
    if (status) {
      trades = trades.filter(t => t.status === status)
    }
    return trades
  }

  createTrade(data: Omit<Trade, 'id'>): Trade {
    const id = uuidv4()
    const trade: Trade = {
      ...data,
      id,
    }
    this.trades.set(id, trade)
    return trade
  }

  updateTrade(id: string, data: Partial<Trade>): Trade | null {
    const trade = this.trades.get(id)
    if (!trade) return null
    const updated: Trade = {
      ...trade,
      ...data,
    }
    this.trades.set(id, updated)
    return updated
  }

  getAllTrades(): Trade[] {
    return Array.from(this.trades.values())
  }

  // Referrals
  createReferral(data: Omit<Referral, 'id' | 'createdAt'>): Referral {
    const id = uuidv4()
    const referral: Referral = {
      ...data,
      id,
      createdAt: new Date(),
    }
    this.referrals.set(id, referral)
    return referral
  }

  getReferralsForUser(referrerId: string): Referral[] {
    return Array.from(this.referrals.values()).filter(r => r.referrerId === referrerId)
  }

  createReferralEarning(data: Omit<ReferralEarning, 'id' | 'createdAt'>): ReferralEarning {
    const id = uuidv4()
    const earning: ReferralEarning = {
      ...data,
      id,
      createdAt: new Date(),
    }
    this.referralEarnings.set(id, earning)
    return earning
  }

  getReferralEarningsForUser(referrerId: string): ReferralEarning[] {
    return Array.from(this.referralEarnings.values()).filter(e => e.referrerId === referrerId)
  }

  // Failed attempts tracking (for insufficient balance redirects)
  recordFailedAttempt(userId: string): number {
    const current = this.failedAttempts.get(userId) || 0
    const updated = current + 1
    this.failedAttempts.set(userId, updated)
    return updated
  }

  resetFailedAttempts(userId: string): void {
    this.failedAttempts.delete(userId)
  }

  getFailedAttempts(userId: string): number {
    return this.failedAttempts.get(userId) || 0
  }
}

// Singleton instance
export const db = new Database()
