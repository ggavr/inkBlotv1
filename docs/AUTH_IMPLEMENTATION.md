# Authentication Implementation Guide

## Overview

This document describes the authentication and authorization system implemented for Inkblot Crew, using Supabase Auth with Google OAuth and email/password authentication.

## Architecture

### Tech Stack
- **Auth Provider**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **State Management**: Zustand (client-side)
- **Session Management**: Supabase SSR with HTTP-only cookies

### Key Components

```
lib/
├── supabase/
│   ├── client.ts      # Browser client
│   ├── server.ts      # Server client (RSC/API routes)
│   ├── middleware.ts  # Middleware session handling
│   └── types.ts       # Database types
├── auth/
│   ├── constants.ts   # Routes, countries, password rules
│   └── validation.ts  # Form validation utilities
└── store/
    └── useAuthStore.ts # Zustand auth state

components/auth/
├── AuthProvider.tsx   # Session initialization wrapper
├── UserMenu.tsx       # Header user dropdown
├── GoogleButton.tsx   # Google OAuth button
├── LoginForm.tsx      # Email/password login
├── RegisterForm.tsx   # Registration form
├── ForgotPasswordForm.tsx
├── ResetPasswordForm.tsx
├── OnboardingForm.tsx # Post-OAuth profile completion
├── PasswordStrength.tsx
├── CountrySelect.tsx
├── Checkbox.tsx
└── AuthDivider.tsx
```

## Setup Instructions

### 1. Supabase Project Setup

1. Create a new Supabase project at https://supabase.com
2. Go to **Authentication > Providers** and enable:
   - Email (with "Confirm email" optional based on your needs)
   - Google OAuth

### 2. Google OAuth Configuration

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials
3. Set authorized redirect URI to: `https://YOUR_PROJECT.supabase.co/auth/v1/callback`
4. Copy Client ID and Secret to Supabase Google provider settings

### 3. Environment Variables

Add these to your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Database Migration

Run the SQL migration in your Supabase SQL Editor:

```sql
-- See: supabase/migrations/001_create_auth_tables.sql
```

This creates:
- `profiles` table with user data
- `library_waitlist` table
- Row Level Security policies
- Auto-create profile trigger on signup

## User Flows

### Registration (Email/Password)
1. User fills form: name, email, password, country, consents
2. Account created in Supabase Auth
3. Profile created via database trigger
4. User redirected to `returnTo` or `/account`

### Registration (Google OAuth)
1. User clicks "Continue with Google"
2. Redirected to Google consent screen
3. Returns to `/auth/callback`
4. If first time: redirected to `/onboarding` for country + consent
5. Profile completed, redirected to destination

### Login
1. User enters email/password or clicks Google
2. Session established via HTTP-only cookie
3. Redirected to `returnTo` or `/account`

### Password Reset
1. User requests reset email
2. Email sent with secure link
3. User sets new password
4. Redirected to login

## Protected Routes

Configured in `middleware.ts`:

```typescript
const PROTECTED_ROUTES = [
  '/account',
  '/onboarding',
]
```

Unauthenticated users are redirected to `/login?returnTo=...`

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/auth/logout` | POST | Sign out user |
| `/api/user/profile` | GET | Get user profile |
| `/api/user/profile` | PATCH | Update profile |
| `/api/user/discord/resend-invite` | POST | Resend Discord invite |
| `/api/library/waitlist` | GET | Check waitlist status |
| `/api/library/waitlist` | POST | Join waitlist |

## Component Usage

### AuthProvider
Wrap your app in `AuthProvider` to initialize auth state:

```tsx
// app/layout.tsx
<AuthProvider>
  {children}
</AuthProvider>
```

### UserMenu
Add to header for authenticated users:

```tsx
<UserMenu />
```

### Protecting Client Components
Use the auth store:

```tsx
const { user, isInitialized } = useAuthStore()

if (!isInitialized) return <Loading />
if (!user) return <LoginPrompt />
return <ProtectedContent />
```

## Consent & Compliance (GDPR)

- Terms acceptance is required (checkbox, not pre-checked)
- Marketing consent is separate and optional
- All consents are timestamped in the database
- Users can update marketing preferences in account settings

## Security Features

- HTTP-only cookies for session tokens
- Password requirements: 8+ chars, letter, number
- Rate limiting handled by Supabase
- Generic error messages to prevent user enumeration
- Row Level Security on all tables

## Future Extensions

Not implemented in this version:
- Social login with Apple
- Magic link (passwordless)
- Multi-factor authentication
- Session/device management
- Email change flow

