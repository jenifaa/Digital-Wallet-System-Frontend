# 💳 WalletIQ — Digital Wallet Frontend

> A modern, full-featured digital wallet web application built with React, TypeScript, and a rich ecosystem of production-grade libraries. Designed for speed, scalability, and a polished user experience.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Routing Architecture](#routing-architecture)
- [State Management](#state-management)
- [API Integration with RTK Query](#api-integration-with-rtk-query)
- [Authentication Flow](#authentication-flow)
- [Animations & UI](#animations--ui)
- [Styling System](#styling-system)
- [Deployment](#deployment)
- [Scripts Reference](#scripts-reference)
- [Contributing](#contributing)

---

## Overview

**WalletIQ** is a production-ready digital wallet frontend that lets users send money, manage wallets, view transaction history, take out loans, track analytics, and more — all wrapped in a sleek, animated interface. The frontend communicates with a Node.js/Express REST API backend secured by JWT dual-token authentication.

Key design goals:

- **Type-safe** end-to-end with TypeScript
- **Optimistic updates** and intelligent caching via RTK Query
- **Token refresh** handled transparently with `baseQueryWithReauth`
- **Protected routes** with role-aware access control
- **Smooth animations** via Framer Motion and GSAP
- **Serverless-compatible** deployment on Vercel

---

## Live Demo

| Environment | URL |
|---|---|
| Production | `https://walletiq-digital-wallet-system.vercel.app` |
| API Backend | `https://digital-wallet-system-backend-nu.vercel.app` |

---

## Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React 18 |
| **Language** | TypeScript 5 |
| **Build Tool** | Vite |
| **Routing** | React Router v6 |
| **State / Cache** | Redux Toolkit + RTK Query |
| **Styling** | Tailwind CSS v3 |
| **Animations** | Framer Motion + GSAP |
| **Form Handling** | React Hook Form + Zod |
| **HTTP Client** | RTK Query (`fetchBaseQuery`) |
| **Auth** | JWT (access + refresh tokens) |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

---

## Project Structure

```
src/
├── api/                        # RTK Query API slices
│   ├── authApi.ts
│   ├── walletApi.ts
│   ├── transactionApi.ts
│   ├── loanApi.ts
│   ├── notificationApi.ts
│   └── analyticsApi.ts
│
├── app/                        # Redux store configuration
│   ├── store.ts
│   └── baseQueryWithReauth.ts  # Token refresh interceptor
│
├── components/                 # Shared/reusable components
│   ├── ui/                     # Primitive UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Badge.tsx
│   │   └── Spinner.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   └── DashboardLayout.tsx
│   └── shared/
│       ├── ProtectedRoute.tsx
│       ├── PublicRoute.tsx
│       └── ErrorBoundary.tsx
│
├── features/                   # Feature-scoped modules
│   ├── auth/
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── authSlice.ts
│   │   └── GoogleCallback.tsx
│   ├── dashboard/
│   │   ├── Dashboard.tsx
│   │   └── WalletCard.tsx
│   ├── transactions/
│   │   ├── TransactionHistory.tsx
│   │   ├── SendMoney.tsx
│   │   └── TransactionDetail.tsx
│   ├── loans/
│   │   ├── LoanRequest.tsx
│   │   ├── MyLoans.tsx
│   │   └── Repayments.tsx
│   ├── analytics/
│   │   └── Analytics.tsx
│   ├── notifications/
│   │   └── NotificationPanel.tsx
│   └── profile/
│       ├── ProfilePage.tsx
│       └── ProfileImageUploader.tsx
│
├── hooks/                      # Custom React hooks
│   ├── useAuth.ts
│   ├── useDebounce.ts
│   └── useBreakpoint.ts
│
├── pages/                      # Public-facing / landing pages
│   ├── LandingPage.tsx
│   ├── FeaturesPage.tsx
│   └── NotFoundPage.tsx
│
├── router/                     # Routing configuration
│   └── AppRouter.tsx
│
├── types/                      # Global TypeScript interfaces
│   ├── user.ts
│   ├── wallet.ts
│   ├── transaction.ts
│   └── api.ts
│
├── utils/                      # Utility functions
│   ├── formatCurrency.ts
│   ├── formatDate.ts
│   └── tokenStorage.ts
│
├── constants/                  # App-wide constants
│   └── routes.ts
│
├── assets/                     # Static assets
│   └── images/
│
├── App.tsx
├── main.tsx
└── index.css
```

---

## Features

### 🔐 Authentication
- Email/password login and registration
- **Google OAuth** — first-time users are redirected to a phone setup page; returning users are logged in directly
- JWT dual-token strategy (access token in memory, refresh token in `httpOnly` cookie)
- Auto token refresh with `baseQueryWithReauth` — completely transparent to the UI

### 💰 Wallet Management
- View wallet balance and details
- Multi-wallet support
- Real-time balance updates after transactions

### 💸 Transactions
- Send money between wallets
- Full transaction history with filters and search
- Per-transaction detail view
- Payment statistics and charts

### 🏦 Loans
- Request a loan
- Track active loans
- View full repayment schedule

### 📊 Analytics
- Revenue and expense breakdown
- KPI cards (income, expenses, balance trend)
- Custom Recharts `BarChart` with gradient fills
- Dark glassmorphism dashboard UI

### 🔔 Notifications
- Real-time unread notification count badge
- Mark as read / mark all as read
- Admin broadcast notification support

### 👤 Profile
- Edit personal details
- Upload and preview profile avatar
- Conditional save — only submits changed fields

---

## Getting Started

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/jenifaa/Digital-Wallet-System-Frontend
cd Digital-Wallet-System-Frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

Fill in your `.env.local` (see [Environment Variables](#environment-variables) below), then:

```bash
# Start the development server
npm run dev
```

The app will be running at `http://localhost:5173`.

---

## Environment Variables

Create a `.env.local` file at the project root:

```env
# Backend API base URL
VITE_API_BASE_URL=https://your-backend.vercel.app/api/v1

# Google OAuth client ID (for the OAuth button)
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

> All environment variables exposed to the frontend must be prefixed with `VITE_` (Vite requirement). Never put secrets here.

---

## Routing Architecture

Routing is handled by **React Router v6** using the `<BrowserRouter>` + nested `<Routes>` pattern.

### Route Map

```
/                         → LandingPage (public)
/features                 → FeaturesPage (public)

/auth/login               → LoginPage (public only — redirects if logged in)
/auth/register            → RegisterPage (public only)
/auth/google/callback     → GoogleCallback (handles OAuth redirect)
/auth/phone-setup         → PhoneSetupPage (new OAuth users only)

/dashboard                → Dashboard (protected)
/dashboard/send           → SendMoney (protected)
/dashboard/transactions   → TransactionHistory (protected)
/dashboard/transactions/:id → TransactionDetail (protected)
/dashboard/loans          → MyLoans (protected)
/dashboard/loans/request  → LoanRequest (protected)
/dashboard/loans/repayments → Repayments (protected)
/dashboard/analytics      → Analytics (protected)
/dashboard/notifications  → NotificationPanel (protected)
/dashboard/profile        → ProfilePage (protected)

*                         → NotFoundPage (404 catch-all)
```

### Protected Routes

`ProtectedRoute` reads the auth state from Redux. If the user is not authenticated, it redirects to `/auth/login` preserving the original `location` in state so the user is taken back after login.

```tsx
// src/components/shared/ProtectedRoute.tsx
const ProtectedRoute = () => {
  const { user } = useAppSelector(state => state.auth);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
```

`PublicRoute` mirrors this — if the user is already logged in, they're redirected to `/dashboard` instead of seeing the login page again.

---

## State Management

The app uses **Redux Toolkit** for global state. The store has two slices plus the RTK Query cache:

```
store
├── auth             (authSlice)  — user object, token, loading state
└── [RTK Query]      — server state for all API resources
    ├── authApi
    ├── walletApi
    ├── transactionApi
    ├── loanApi
    ├── notificationApi
    └── analyticsApi
```

### authSlice

Holds the currently authenticated user and the in-memory access token. Exposes `setCredentials` and `logout` actions.

```ts
// src/features/auth/authSlice.ts
interface AuthState {
  user: IUser | null;
  accessToken: string | null;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, accessToken: null } as AuthState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: IUser; accessToken: string }>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});
```

---

## API Integration with RTK Query

All server data fetching and mutations go through **RTK Query** API slices defined in `src/api/`.

### Base Query with Token Refresh

`baseQueryWithReauth` wraps `fetchBaseQuery` to silently refresh the access token when a `401` is received, then retries the original request — completely invisible to the component.

```ts
// src/app/baseQueryWithReauth.ts
const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    // Attempt to refresh
    const refreshResult = await baseQuery('/auth/refresh-token', api, extraOptions);

    if (refreshResult.data) {
      const { accessToken, user } = refreshResult.data as RefreshResponse;
      api.dispatch(setCredentials({ accessToken, user }));
      // Retry original request with new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};
```

### Example API Slice

```ts
// src/api/walletApi.ts
export const walletApi = createApi({
  reducerPath: 'walletApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Wallet'],
  endpoints: (builder) => ({
    getMyWallet: builder.query<WalletResponse, void>({
      query: () => '/wallet/my',
      providesTags: ['Wallet'],
    }),
    sendMoney: builder.mutation<SendMoneyResponse, SendMoneyPayload>({
      query: (body) => ({ url: '/wallet/send', method: 'POST', body }),
      invalidatesTags: ['Wallet'],
    }),
  }),
});

export const { useGetMyWalletQuery, useSendMoneyMutation } = walletApi;
```

Generated hooks are consumed directly in components — no manual `useEffect` or `fetch` calls anywhere in the UI layer.

---

## Authentication Flow

### Email / Password

```
User fills login form
  → POST /auth/login
  → Backend returns { accessToken, user }; sets httpOnly refresh cookie
  → Frontend dispatches setCredentials({ accessToken, user })
  → Redirected to /dashboard
```

### Google OAuth

```
User clicks "Sign in with Google"
  → Redirected to backend /auth/google
  → Google redirects back to backend callback
  → Backend checks if user exists:
      New user  → redirect to /auth/phone-setup?token=<temp_token>
      Returning → redirect to /auth/google/callback?accessToken=<token>
  → Frontend GoogleCallback component reads query params
  → Dispatches setCredentials and navigates to /dashboard
```

The Google flow passes tokens via URL query parameters rather than cookies to avoid cross-origin cookie loss during `res.redirect()`.

---

## Animations & UI

### Framer Motion

Used for page transitions, modal overlays, notification panels, and card entrance animations.

```tsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -16 }}
  transition={{ duration: 0.35, ease: 'easeOut' }}
>
  {children}
</motion.div>
```

### GSAP

Used in the hero section for orchestrated entrance animations: sequential image frame crossfades, `rotateY` spin reveals, and per-icon idle float loops.

```ts
gsap.from(iconRef.current, {
  opacity: 0,
  scale: 0,
  rotateY: 180,
  duration: 0.6,
  ease: 'back.out(1.7)',
  delay: index * 0.12,
});

// Idle float loop
gsap.to(iconRef.current, {
  y: -10,
  duration: 1.8 + index * 0.2,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut',
});
```

### Portal-based Popups

Feature card popups use `ReactDOM.createPortal` to render into `document.body`, completely bypassing any `overflow: hidden` clipping on ancestor elements.

---

## Styling System

**Tailwind CSS v3** is the sole styling mechanism — no separate CSS modules or styled-components.

### Key Conventions

- Dark glassmorphism: `bg-white/5 backdrop-blur-md border border-white/10`
- Gradient fills: `bg-gradient-to-br from-violet-600 to-indigo-500`
- Responsive design: mobile-first breakpoints (`sm:`, `md:`, `lg:`, `xl:`)
- Custom color palette extended in `tailwind.config.ts`

```ts
// tailwind.config.ts
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f4ff',
          500: '#6366f1',
          900: '#1e1b4b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
};
```

---

## Deployment

The frontend is deployed on **Vercel** with zero configuration for the Vite build.

### SPA Rewrite Rule

Because React Router manages all routing client-side, Vercel must serve `index.html` for any path — otherwise a direct URL visit returns a 404. Add this to `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Build & Deploy

```bash
# Local production build
npm run build

# Preview production build locally
npm run preview
```

Vercel automatically picks up the `build` command and `dist/` output directory for Vite projects.

### Environment Variables on Vercel

Set these in **Vercel Dashboard → Project → Settings → Environment Variables**:

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Production backend API URL |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client ID |

> Variables must be added to the Vercel dashboard — `.env.local` is not deployed.

---

## Scripts Reference

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server at `localhost:5173` |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint across all TypeScript files |
| `npm run type-check` | Run `tsc --noEmit` for type errors only |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please follow the existing code style. Run `npm run lint` and `npm run type-check` before submitting.

---


<p align="center">Built with ❤️ using React, TypeScript, and Tailwind CSS</p>
