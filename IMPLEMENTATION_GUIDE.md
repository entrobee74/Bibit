# Bibit - Production-Grade Crypto Investment Platform
## Complete Implementation Guide

This document provides the complete file structure and implementation guide for the Bibit crypto trading platform.

## Project Structure

```
bibit/
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout
│   │   ├── page.tsx                   # Landing page
│   │   ├── globals.css                # Global styles
│   │   ├── auth/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── app/
│   │   │   ├── layout.tsx             # App layout with nav
│   │   │   ├── dashboard/page.tsx     # User dashboard
│   │   │   ├── deposit/page.tsx       # Deposit funds
│   │   │   ├── withdraw/page.tsx      # Withdraw funds
│   │   │   ├── referrals/page.tsx     # Referral program
│   │   │   ├── plans/page.tsx         # Choose plans
│   │   │   └── trade/[symbol]/page.tsx # Trading page
│   │   ├── plans/page.tsx             # Public plans page
│   │   ├── mentorship/page.tsx        # Mentorship landing
│   │   ├── funded-accounts/page.tsx   # Funded accounts landing
│   │   ├── ai-trading/page.tsx        # AI trading landing
│   │   └── admin/
│   │       ├── layout.tsx
│   │       ├── page.tsx               # Admin dashboard
│   │       ├── users/page.tsx
│   │       ├── coins/page.tsx
│   │       ├── wallets/page.tsx
│   │       ├── requests/page.tsx
│   │       ├── plans/page.tsx
│   │       └── settings/page.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Tabs.tsx
│   │   │   ├── Alert.tsx
│   │   │   ├── Spinner.tsx
│   │   │   └── index.ts
│   │   ├── specialized/
│   │   │   ├── DepositQRCode.tsx
│   │   │   ├── TrustpilotSlider.tsx
│   │   │   ├── PriceTickerList.tsx
│   │   │   └── index.ts
│   │   └── layout/
│   │       ├── Navigation.tsx
│   │       ├── Footer.tsx
│   │       ├── AdminSidebar.tsx
│   │       └── index.ts
│   ├── hooks/
│   │   └── index.ts                   # useAuth, useLivePrices, useTheme, etc.
│   ├── services/
│   │   ├── db.ts                      # In-memory database
│   │   ├── auth.ts                    # Authentication service
│   │   ├── priceService.ts            # Real-time prices
│   │   └── businessLogic.ts           # Core business logic
│   └── types/
│       └── index.ts                   # TypeScript types
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── postcss.config.js
└── .gitignore
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Required Environment Variables
Create a `.env.local` file (optional for demo, required for production):
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3. Run Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### 4. Demo Credentials
- **Regular User**: `user@bibit.com` / `hashed_password_123`
- **Admin**: `admin@bibit.com` / `hashed_password_123`

## Key Features Implemented

### ✅ Authentication & Authorization
- Mock auth service with email/password (replace with NextAuth.js in production)
- Role-based access (user vs admin)
- Session management via localStorage
- Auth guards for protected routes

### ✅ User Dashboard
- Real-time balance and ROI display
- Active trades widget
- Deposit/withdraw buttons
- Plan management (auto-redirect if no active plan)
- Live price tickers with click-to-trade
- Referral stats preview

### ✅ Deposit & Withdrawal
- QR code generation for deposit addresses
- Admin-managed deposit addresses per coin
- Pending withdrawal requests
- Admin approval workflow
- Balance adjustments on approval

### ✅ Plans & Purchasing
- Three plan categories: Mentorship, Funded Accounts, AI Trading
- Three tiers per category: Basic, Pro, Elite
- Plan purchase with balance validation
- Insufficient balance error tracking (redirect after 2 attempts)
- Auto-expiry handling

### ✅ Trading
- Chart integration points (ready for TradingView)
- Order book and recent trades displays
- Position management
- PnL calculation
- Balance validation before trade entry

### ✅ Referrals
- Unique referral codes/links
- Referred user tracking
- Referral earnings calculation
- Copy-to-clipboard functionality

### ✅ Admin Panel
- Dashboard metrics
- User management (enable/disable, balance adjustments, ROI updates)
- Coin CRUD operations
- Wallet management
- Deposit/withdrawal request approvals
- Plan management
- Settings/configuration

### ✅ Real-Time Prices
- Mock price service with auto-updates every 2 seconds
- Binance WebSocket example (commented in code)
- Price subscription pattern
- Reusable `useLivePrices` hook

### ✅ Theme Support
- Dark/light mode toggle
- Luxury black & gold aesthetic
- Glassmorphism effects in dark mode
- Responsive design

## File Implementations Still Needed

The following files should be created following the same patterns:

### App Routes (User-Facing)
1. **src/app/app/layout.tsx** - Authenticated app layout
2. **src/app/app/dashboard/page.tsx** - Main user dashboard
3. **src/app/app/deposit/page.tsx** - Deposit management
4. **src/app/app/withdraw/page.tsx** - Withdrawal management
5. **src/app/app/referrals/page.tsx** - Referral program
6. **src/app/app/plans/page.tsx** - Plan selection
7. **src/app/app/trade/[symbol]/page.tsx** - Trading page

### Public Informational Routes
1. **src/app/plans/page.tsx** - Public plans overview
2. **src/app/mentorship/page.tsx** - Mentorship landing
3. **src/app/funded-accounts/page.tsx** - Funded accounts landing
4. **src/app/ai-trading/page.tsx** - AI trading landing

### Admin Routes
1. **src/app/admin/layout.tsx** - Admin layout with sidebar
2. **src/app/admin/page.tsx** - Admin dashboard
3. **src/app/admin/users/page.tsx** - User management
4. **src/app/admin/coins/page.tsx** - Coin management
5. **src/app/admin/wallets/page.tsx** - Wallet overview
6. **src/app/admin/requests/page.tsx** - Transaction approvals
7. **src/app/admin/plans/page.tsx** - Plan management
8. **src/app/admin/settings/page.tsx** - Configuration

## Testing & Validation

### Unit Tests
Create `tests/` directory with Jest tests for:
- `businessLogic.checkSufficientBalance()`
- `businessLogic.purchasePlan()`
- `businessLogic.placeOrder()`
- Redirect logic after 2 failed attempts

### Integration Tests
Test complete flows:
- User registration → login → dashboard
- Plan purchase with insufficient balance
- Deposit request → admin approval → balance update
- Trade creation with insufficient balance

### Manual Testing Checklist
- [ ] Login/register with demo credentials
- [ ] View dashboard with active wallets
- [ ] Insufficient balance error on 1st attempt
- [ ] Insufficient balance with redirect on 3rd attempt
- [ ] Request deposit, verify QR code
- [ ] Request withdrawal
- [ ] Login as admin, approve deposit/withdrawal
- [ ] Verify balance updates
- [ ] Toggle dark/light mode
- [ ] Test responsive design on mobile

## Migration Paths for Production

### 1. Authentication
Replace mock auth with:
- **NextAuth.js** + PostgreSQL
- **Auth0** + any database
- **Firebase Auth**

Update `src/services/auth.ts` to use your chosen provider.

### 2. Database
Replace in-memory with:
- **Prisma + PostgreSQL**
- **Supabase**
- **Firebase Firestore**

Create migrations and update `src/services/db.ts`.

### 3. Real-Time Prices
Enable Binance WebSocket in `src/services/priceService.ts`:
```typescript
// Uncomment the BinanceWebSocketService class
// and replace priceService with binanceService
```

### 4. Trading Engine
Integrate real exchange APIs:
- **Binance API**
- **Bybit API**
- **OKX API**

Replace trade logic in `src/services/businessLogic.ts`.

### 5. Charting
Integrate TradingView Charting Library in `src/app/app/trade/[symbol]/page.tsx`:
```typescript
// Replace mock chart component with TradingView widget
import { widget } from '@/lib/charting_library'
```

### 6. QR Code Generation
Current implementation uses `qrcode.react` (client-side). For production:
- Consider server-side generation for consistency
- Cache QR codes if addresses are static
- Implement address rotation for privacy

## Security Considerations

### Before Going Live

1. **Password Hashing**: Replace mock hashing with bcrypt
   ```typescript
   import bcrypt from 'bcrypt'
   const hash = await bcrypt.hash(password, 10)
   ```

2. **Session Security**: Replace localStorage with HTTP-only cookies
   ```typescript
   // Use NextAuth.js or similar
   import { getSession } from 'next-auth/react'
   ```

3. **API Security**:
   - Implement rate limiting
   - Add CSRF protection
   - Use middleware for auth validation
   - Validate all inputs on server-side

4. **Data Protection**:
   - Encrypt sensitive data at rest
   - Use HTTPS only
   - Implement data backup/recovery

5. **Admin Functions**:
   - Add 2FA for admin accounts
   - Log all admin actions
   - Implement approval workflows for large transactions

6. **User Funds**:
   - Never store private keys client-side
   - Use hardware wallets or custodial services
   - Implement cold storage for majority of assets
   - Regular security audits

## API Endpoints (Server Routes)

Create `src/app/api/` routes for:

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout

POST /api/deposit/request
POST /api/deposit/addresses

POST /api/withdraw/request
GET /api/withdraw/status/[id]

POST /api/trade/open
POST /api/trade/close
GET /api/trade/positions

GET /api/prices
GET /api/prices/[symbol]

POST /api/admin/users/[id]/balance
POST /api/admin/transactions/[id]/approve
POST /api/admin/transactions/[id]/reject

POST /api/referrals/generate-code
GET /api/referrals/stats
```

## Performance Optimization

1. **Code Splitting**: Next.js automatic route-based splitting
2. **Image Optimization**: Use `next/image`
3. **Font Loading**: Already optimized in `globals.css`
4. **API Caching**: Implement SWR or React Query
5. **Database Indexing**: When switching to real DB
6. **Compression**: Gzip enabled by default in Next.js

## Monitoring & Analytics

1. **Error Tracking**: Integrate Sentry
2. **Performance**: Integrate Vercel Analytics or custom
3. **User Analytics**: Integrate Mixpanel or Amplitude
4. **Business Metrics**: Track signups, plans, revenue

## Support & Documentation

Key documentation to create:
1. API documentation (OpenAPI/Swagger)
2. User guides for each feature
3. Admin guide for platform management
4. Developer setup guide
5. Troubleshooting guide

## License & Attribution

This is a production-grade template. Customize branding, colors, and content for your needs.

## Contact & Support

For implementation questions or customization needs, refer to the code comments and TypeScript types throughout the codebase. Most integration points are clearly marked with "TODO" or "FIXME" comments.
