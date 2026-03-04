# EVERCLEAN LUXURY SERVICES - COMPLETE PROJECT DOCUMENTATION
## Version 2.1.0 - WCAG AA Compliant | Production Ready

**Repository:** https://github.com/dexinox-jash/everclean  
**Framework:** Next.js 14.2.15 + TypeScript 5.x + Tailwind CSS  
**Database:** PostgreSQL + Prisma ORM 5.22  
**Status:** ✅ Production Ready | ✅ WCAG 2.1 AA Compliant | ✅ Responsive

---

## 📋 TABLE OF CONTENTS

1. [Executive Summary](#1-executive-summary)
2. [Architecture & Tech Stack](#2-architecture--tech-stack)
3. [Design System](#3-design-system)
4. [Database Schema](#4-database-schema)
5. [Page Inventory](#5-page-inventory)
6. [API Routes](#6-api-routes)
7. [Component Library](#7-component-library)
8. [Features Implemented](#8-features-implemented)
9. [Security Implementation](#9-security-implementation)
10. [Accessibility Compliance](#10-accessibility-compliance)
11. [Environment Configuration](#11-environment-configuration)
12. [Deployment Guide](#12-deployment-guide)
13. [Known Limitations](#13-known-limitations)
14. [Future Roadmap](#14-future-roadmap)
15. [AI Agent Instructions](#15-ai-agent-instructions)

---

## 1. EXECUTIVE SUMMARY

### Brand Identity
**Everclean Luxury Services** is a premium white-glove cleaning and estate care platform targeting high-net-worth individuals in Waterloo Region, Ontario.

- **Brand Philosophy:** "Quiet Luxury" - Understated elegance, discretion, white-glove service
- **Tagline:** "Bespoke Care for Distinguished Homes"
- **Target Audience:** Estate owners ($2M-$50M+ properties), discerning homeowners
- **Service Area:** Waterloo Region (Kitchener, Waterloo, Cambridge, surrounding areas)

### What's Working (✅)
- Complete 5-step booking wizard with price calculation
- Client portal with authentication (NextAuth v5)
- Admin dashboard with role-based access
- PostgreSQL database with full Prisma schema
- Stripe payment integration (Payment Intents API)
- Contact form with email notifications (Resend)
- WCAG 2.1 AA compliant (color contrast, ARIA labels, keyboard navigation)
- Responsive design (mobile, tablet, desktop)
- Premium animations (Framer Motion)

### What's Partially Implemented (⚠️)
- **Email Service:** Templates exist but not fully integrated with booking flow
- **SMS Notifications:** Infrastructure ready, Twilio not connected
- **Gift Cards:** Schema exists, UI not built
- **Reviews System:** Schema exists, UI not built

### What's Not Yet Built (🚧)
- Real-time availability calendar
- Staff scheduling interface
- Subscription/recurring bookings
- SMS reminders (24h before service)
- Service area mapping (Google Maps)
- Multi-language support
- Advanced analytics dashboard

---

## 2. ARCHITECTURE & TECH STACK

### Frontend Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.2.15 | React framework (App Router) |
| React | 18.3.1 | UI library |
| TypeScript | 5.x | Type safety (strict mode) |
| Tailwind CSS | 3.4.14 | Utility-first styling |
| Framer Motion | 12.34.3 | Premium animations |
| Lucide React | 0.454.0 | Icon library |
| shadcn/ui | latest | UI component primitives |

### Backend Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js API Routes | 14.2.15 | Serverless API endpoints |
| Prisma ORM | 5.22.0 | Database ORM |
| PostgreSQL | 15+ | Primary database |
| NextAuth.js | 5.0.0-beta.25 | Authentication (Google OAuth + Email) |
| Zod | 3.23.8 | Schema validation |

### External Services
| Service | Purpose | Integration Status |
|---------|---------|-------------------|
| Stripe | Payment processing | ✅ Active (Payment Intents) |
| Resend | Email delivery | ⚠️ Configured, templates ready |
| Vercel | Hosting/CDN | ✅ Active |
| PostgreSQL | Database | ✅ Active (Neon/Vercel Postgres) |

### Project Structure
```
EVERCLEAN/
├── app/                          # Next.js App Router
│   ├── (marketing)/              # Public pages
│   │   ├── page.tsx              # Homepage
│   │   ├── about/page.tsx        # About us
│   │   ├── services/page.tsx     # Services listing
│   │   ├── booking/page.tsx      # 5-step booking wizard
│   │   ├── contact/page.tsx      # Contact form
│   │   ├── privacy/page.tsx      # Privacy Policy
│   │   ├── terms/page.tsx        # Terms of Service
│   │   └── cookies/page.tsx      # Cookie Policy
│   │
│   ├── (portal)/                 # Protected client routes
│   │   └── portal/
│   │       ├── page.tsx          # Client dashboard
│   │       └── login/page.tsx    # Magic link login
│   │
│   ├── (admin)/                  # Admin routes (protected)
│   │   └── admin/page.tsx        # Admin dashboard
│   │
│   └── api/                      # API Routes
│       ├── auth/[...nextauth]/   # NextAuth endpoints
│       ├── bookings/route.ts     # Booking CRUD
│       ├── contact/route.ts      # Contact form
│       └── payment/
│           ├── create-intent/    # Stripe payment intent
│           └── webhook/          # Stripe webhooks
│
├── components/
│   ├── luxury/                   # Animation components
│   │   └── animations.tsx        # Framer Motion variants
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx            # Navigation header
│   │   └── Footer.tsx            # Site footer
│   ├── sections/                 # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── ProcessSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── TrustSection.tsx
│   │   └── CTASection.tsx
│   └── ui/                       # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       └── badge.tsx
│
├── lib/                          # Utilities
│   ├── db.ts                     # Prisma client singleton
│   ├── auth.ts                   # NextAuth configuration
│   ├── stripe.ts                 # Stripe server client
│   ├── utils.ts                  # General utilities
│   ├── validations/              # Zod schemas
│   │   └── index.ts
│   └── email/                    # Email service
│       └── service.ts
│
├── prisma/                       # Database
│   ├── schema.prisma             # Complete schema
│   └── seed.ts                   # Seed data (5 services, admin user)
│
├── types/                        # TypeScript types
│   └── next-auth.d.ts            # Auth type extensions
│
├── public/                       # Static assets
├── middleware.ts                 # Route protection (portal/admin)
├── tailwind.config.ts            # Tailwind + color system
├── app/globals.css               # Global styles + CSS variables
└── vercel.json                   # Vercel deployment config
```

---

## 3. DESIGN SYSTEM

### Color Palette (WCAG AA Compliant)

#### Primary Colors - Midnight Navy
| Token | Hex | Usage | Contrast on Ivory |
|-------|-----|-------|-------------------|
| navy-900 | #0D1117 | Deepest backgrounds | - |
| navy-800 | #171923 | Cards, nav | - |
| navy-700 | #1A202C | Primary brand | - |

#### Secondary Colors - Champagne Gold
| Token | Hex | Usage |
|-------|-----|-------|
| gold-500 | #C9A962 | Primary accent, CTAs |
| gold-400 | #E3C28A | Hover states |
| gold-600 | #B8974F | Active states |

#### Text Colors - Light Backgrounds (Ivory #FAF9F6)
| Token | Hex | Ratio | Usage |
|-------|-----|-------|-------|
| text-primary | #292524 | 9.8:1 | Headings, important text |
| text-secondary | #44403C | 7.2:1 | Body text |
| text-tertiary | #57534E | 5.1:1 | Supporting text |
| text-muted | #78716C | 4.6:1 | Labels, captions |

#### Text Colors - Dark Backgrounds (Navy #0D1117)
| Token | Hex | Ratio | Usage |
|-------|-----|-------|-------|
| light-primary | #FAF9F6 | 15.5:1 | Headings |
| light-secondary | #E7E5E4 | 10.8:1 | Body text |
| light-tertiary | #D4D4D8 | 7.8:1 | Supporting text |
| light-muted | #A1A1AA | 5.1:1 | Labels, captions |

### Typography
| Element | Font | Size | Weight |
|---------|------|------|--------|
| H1 (Hero) | Playfair Display | 48-72px | 500 |
| H2 (Section) | Playfair Display | 30-48px | 500 |
| H3 (Card titles) | Playfair Display | 20-24px | 500 |
| Body | Inter | 16-18px | 400 |
| UI/Buttons | Inter | 12-14px | 500-600 |
| Eyebrow | Inter | 12px | 600 |

### Animation Specifications
```css
--ease-luxury: cubic-bezier(0.23, 1, 0.32, 1);
--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
--duration-fast: 200ms;
--duration-normal: 400ms;
--duration-slow: 800ms;
```

---

## 4. DATABASE SCHEMA

### Complete Entity Relationship

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│      USER        │     │     BOOKING      │     │   NOTIFICATION   │
├──────────────────┤     ├──────────────────┤     ├──────────────────┤
│ id (PK)          │1   *│ id (PK)          │1   *│ id (PK)          │
│ email (unique)   │─────│ userId (FK)      │─────│ bookingId (FK)   │
│ name             │     │ bookingNumber    │     │ type             │
│ role             │     │ customerName     │     │ recipient        │
│ createdAt        │     │ customerEmail    │     │ content          │
└──────────────────┘     │ serviceId (FK)   │     │ isSent           │
                         │ calculatedPrice  │     └──────────────────┘
┌──────────────────┐     │ scheduledDate    │
│     SERVICE      │     │ status           │     ┌──────────────────┐
├──────────────────┤     │ paymentStatus    │     │      REVIEW      │
│ id (PK)          │1   *│ paymentIntentId  │     ├──────────────────┤
│ slug (unique)    │─────│ createdAt        │     │ id (PK)          │
│ name             │     └──────────────────┘     │ bookingId (FK)   │
│ basePrice        │              │               │ userId (FK)      │
│ priceMultiplier  │              │               │ rating (1-5)     │
│ features[]       │              │               │ comment          │
│ isActive         │              │               │ isPublic         │
└──────────────────┘              │               └──────────────────┘
                                  │
                         ┌────────┴────────┐
                         │     ADDRESS     │
                         ├─────────────────┤
                         │ id (PK)         │
                         │ userId (FK)     │
                         │ street          │
                         │ city            │
                         │ postalCode      │
                         │ accessNotes     │
                         └─────────────────┘
```

### Key Tables

#### User
```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  phone         String?
  role          UserRole  @default(CUSTOMER)  // CUSTOMER | ADMIN | MANAGER | STAFF
  emailVerified DateTime?
  image         String?
  createdAt     DateTime  @default(now())
  
  accounts      Account[]
  sessions      Session[]
  bookings      Booking[]
  contactForms  ContactForm[]
  reviews       Review[]
  addresses     Address[]
  preferences   UserPreference?
}
```

#### Booking
```prisma
model Booking {
  id                String        @id @default(cuid())
  bookingNumber     String        @unique  // Format: EC-20241204-8F3A
  
  // Customer Info
  customerName      String
  customerEmail     String
  customerPhone     String
  userId            String?
  
  // Service Details
  serviceId         String
  serviceName       String
  homeSize          String        // "studio", "1bed", "2bed", "3bed", "4bed", "estate"
  calculatedPrice   Decimal       @db.Decimal(10, 2)
  hasPets           Boolean       @default(false)
  hasFineArt        Boolean       @default(false)
  specialRequests   String?       @db.Text
  accessType        String        @default("present")  // "present" | "key" | "lockbox" | "doorman"
  
  // Schedule
  scheduledDate     DateTime
  scheduledTime     String        // "09:00" format
  duration          Int           @default(3)  // Hours
  endTime           String?
  
  // Staff Assignment
  staffId           String?
  
  // Status
  status            BookingStatus @default(PENDING)
  paymentStatus     PaymentStatus @default(PENDING)
  paymentIntentId   String?
  amountPaid        Decimal?      @db.Decimal(10, 2)
  
  // Timestamps
  createdAt         DateTime      @default(now())
  confirmedAt       DateTime?
  completedAt       DateTime?
  cancelledAt       DateTime?
  cancellationReason String?
}
```

#### Service (Pre-seeded with 5 services)
```prisma
model Service {
  id               String    @id @default(cuid())
  slug             String    @unique
  name             String
  shortDescription String
  fullDescription  String    @db.Text
  basePrice        Decimal   @db.Decimal(10, 2)
  priceMultiplier  Json?     // {"studio": 1, "2bed": 1.5, "estate": 3.5}
  durationHours    Float
  features         String[]
  bestFor          String?
  requiresConsult  Boolean   @default(false)
  isActive         Boolean   @default(true)
  isPopular        Boolean   @default(false)
  sortOrder        Int       @default(0)
  icon             String    @default("Crown")
}
```

### Enums
```prisma
enum UserRole { CUSTOMER, ADMIN, MANAGER, STAFF }
enum BookingStatus { PENDING, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED, NO_SHOW, RESCHEDULED }
enum PaymentStatus { PENDING, PROCESSING, PAID, FAILED, REFUNDED, PARTIALLY_REFUNDED }
```

---

## 5. PAGE INVENTORY

### Public Pages (Marketing)

| Page | URL | Status | Features |
|------|-----|--------|----------|
| **Homepage** | `/` | ✅ Complete | Hero animation, services grid, process steps, testimonials, trust badges, CTA |
| **Services** | `/services` | ✅ Complete | Service cards with pricing, FAQ accordion, fallback data for static generation |
| **Booking** | `/booking` | ✅ Complete | 5-step wizard (service → home → schedule → contact → payment), real-time price calculation |
| **About** | `/about` | ✅ Complete | Company story, team profiles, stats, values |
| **Contact** | `/contact` | ✅ Complete | Contact form with validation, contact info, office hours |
| **Privacy Policy** | `/privacy` | ✅ Complete | GDPR/CCPA compliant privacy policy |
| **Terms of Service** | `/terms` | ✅ Complete | Terms including cancellation policy |
| **Cookie Policy** | `/cookies` | ✅ Complete | Cookie usage explanation |

### Protected Pages

| Page | URL | Protection | Status | Features |
|------|-----|------------|--------|----------|
| **Client Portal** | `/portal` | NextAuth (user) | ✅ Complete | Dashboard with recent bookings, quick actions |
| **Portal Login** | `/portal/login` | Public | ✅ Complete | Magic link authentication with email |
| **Admin Dashboard** | `/admin` | Role-based (ADMIN/MANAGER) | ✅ Complete | KPI stats, recent bookings, quick actions |

### API Routes

| Endpoint | Method | Auth | Status | Description |
|----------|--------|------|--------|-------------|
| `/api/bookings` | POST | Public | ✅ Complete | Create booking with validation |
| `/api/bookings` | GET | Public | ✅ Complete | List bookings (with email filter) |
| `/api/contact` | POST | Public | ✅ Complete | Submit contact form |
| `/api/payment/create-intent` | POST | Public | ✅ Complete | Create Stripe PaymentIntent |
| `/api/payment/webhook` | POST | Public | ✅ Complete | Stripe webhook handler |
| `/api/auth/[...nextauth]` | ALL | Public | ✅ Complete | NextAuth endpoints |

---

## 6. API ROUTES

### Booking API

**Create Booking**
```http
POST /api/bookings
Content-Type: application/json

{
  "serviceId": "estate-cleaning",
  "homeSize": "4bed",
  "hasPets": false,
  "hasFineArt": true,
  "scheduledDate": "2024-12-25",
  "scheduledTime": "10:00",
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+1 (519) 555-0123",
  "address": {
    "street": "123 Luxury Lane",
    "city": "Waterloo",
    "postalCode": "N2L 3G1"
  },
  "accessType": "present",
  "specialRequests": "Please use the side entrance",
  "gdprConsent": true,
  "calculatedPrice": 650.00
}
```

**Response (201)**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "booking": {
      "id": "cuid...",
      "bookingNumber": "EC-2024-1234",
      "status": "PENDING",
      "paymentStatus": "PENDING"
    }
  }
}
```

### Contact API

**Submit Contact Form**
```http
POST /api/contact
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1 (519) 555-4567",
  "subject": "quote",
  "message": "I need a quote for monthly cleaning..."
}
```

### Payment API

**Create Payment Intent**
```http
POST /api/payment/create-intent
Content-Type: application/json

{
  "bookingId": "cuid..."
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "clientSecret": "pi_xxx_secret_xxx",
    "paymentIntentId": "pi_xxx",
    "amount": 650.00,
    "currency": "cad"
  }
}
```

---

## 7. COMPONENT LIBRARY

### Animation Components (`components/luxury/animations.tsx`)

| Component | Props | Description |
|-----------|-------|-------------|
| `AnimatedSection` | children, delay?, direction?, duration? | Scroll-triggered reveal animation |
| `StaggerContainer` | children, staggerDelay?, delayChildren? | Container for staggered children |
| `StaggerItem` | children | Individual stagger item |
| `WordReveal` | text, delay?, wordDelay? | Word-by-word text reveal |
| `HoverLift` | children, lift?, scale? | Hover elevation effect |
| `GoldLineReveal` | delay?, width? | Animated gold divider |
| `CounterAnimation` | end, duration?, suffix?, prefix? | Animated number counter |
| `MagneticButton` | children, strength? | Cursor-following button |
| `FadeScale` | children, delay? | Fade + scale animation |

### Layout Components

| Component | Features |
|-----------|----------|
| `Header` | Scroll-aware styling, mobile menu, skip-to-content link |
| `Footer` | Multi-column links, trust badges, social links |

### Page Sections

| Section | Features |
|---------|----------|
| `HeroSection` | Text reveal animation, trust bar, dual CTAs |
| `ServicesSection` | 3-column grid, featured badge, pricing |
| `ProcessSection` | 4-step process with connecting line |
| `TestimonialsSection` | Stats bar, testimonial cards |
| `TrustSection` | 4-column trust features, stats |
| `CTASection` | Dual CTAs with gradient background |

---

## 8. FEATURES IMPLEMENTED

### Core Features ✅

#### Booking System
- [x] 5-step wizard with persistent state
- [x] Real-time price calculation based on home size
- [x] Service selection with visual cards
- [x] Home size selector (studio → estate)
- [x] Special requirements (pets, fine art)
- [x] Calendar date picker
- [x] Time slot selection
- [x] Contact information form
- [x] Address input
- [x] Access type selection
- [x] GDPR consent checkbox
- [x] Booking summary review
- [x] Stripe payment integration
- [x] Booking confirmation

#### Authentication
- [x] NextAuth v5 with JWT strategy
- [x] Magic link email authentication
- [x] Google OAuth (configured)
- [x] Role-based access (CUSTOMER, ADMIN, MANAGER, STAFF)
- [x] Protected routes middleware
- [x] Client portal dashboard

#### Admin Features
- [x] Admin dashboard with KPI cards
- [x] Recent bookings list
- [x] Role-based access control
- [x] Booking statistics

#### Contact & Communication
- [x] Contact form with validation
- [x] Email templates (in `lib/email/service.ts`)
- [x] Auto-reply structure

### Design Features ✅
- [x] Responsive design (mobile-first)
- [x] Premium animations (Framer Motion)
- [x] Scroll-triggered reveals
- [x] Hover effects on cards/buttons
- [x] Word-by-word text reveal
- [x] Counter animations
- [x] Gold accent color scheme
- [x] Serif/sans-serif typography pairing

---

## 9. SECURITY IMPLEMENTATION

### Implemented Security Features

| Feature | Implementation | Status |
|---------|----------------|--------|
| **Security Headers** | CSP, HSTS, X-Frame-Options, X-Content-Type-Options | ✅ `next.config.mjs` |
| **Rate Limiting** | In-memory rate limiting (10 req/min public) | ✅ API routes |
| **Input Validation** | Zod schema validation on all inputs | ✅ All forms |
| **SQL Injection Prevention** | Prisma ORM parameterized queries | ✅ Automatic |
| **XSS Protection** | React escaping + CSP | ✅ Built-in |
| **CSRF Protection** | NextAuth built-in + SameSite cookies | ✅ Automatic |
| **Authentication** | NextAuth v5 with secure sessions | ✅ Active |
| **Authorization** | Role-based middleware | ✅ Active |
| **Environment Variables** | Server-side only for secrets | ✅ Properly scoped |

### Security Headers (`next.config.mjs`)
```javascript
headers: [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  { key: "Content-Security-Policy", value: "default-src 'self'..." },
]
```

---

## 10. ACCESSIBILITY COMPLIANCE

### WCAG 2.1 AA Compliance

| Criterion | Status | Implementation |
|-----------|--------|----------------|
| **1.4.3 Contrast (Minimum)** | ✅ Pass | All text 4.5:1+ |
| **1.4.6 Contrast (Enhanced)** | ✅ Pass | Most text 7:1+ |
| **2.1.1 Keyboard** | ✅ Pass | All interactive elements keyboard accessible |
| **2.4.1 Bypass Blocks** | ✅ Pass | Skip to main content link |
| **2.4.3 Focus Order** | ✅ Pass | Logical tab order |
| **2.4.4 Link Purpose** | ✅ Pass | Descriptive link text |
| **2.4.6 Headings** | ✅ Pass | Proper heading hierarchy |
| **2.5.3 Label in Name** | ✅ Pass | Accessible names match visible text |
| **3.3.2 Labels** | ✅ Pass | All form fields labeled |
| **4.1.1 Parsing** | ✅ Pass | Valid HTML |
| **4.1.2 Name, Role, Value** | ✅ Pass | ARIA attributes used correctly |

### Accessibility Features

- **Skip to content link**: Keyboard users can bypass navigation
- **ARIA landmarks**: `<main>`, `<nav>`, `<footer>`, `<section>`, `<article>`
- **ARIA labels**: All icon buttons have aria-label
- **Focus indicators**: Visible focus states on all interactive elements
- **Reduced motion**: Respects `prefers-reduced-motion`
- **High contrast**: Respects `prefers-contrast: high`
- **Semantic HTML**: Proper use of headings, lists, buttons vs links

---

## 11. ENVIRONMENT CONFIGURATION

### Required Environment Variables

```bash
# Database (Neon or Vercel Postgres)
DATABASE_URL="postgresql://user:password@host.neon.tech/everclean?sslmode=require"
DIRECT_URL="postgresql://user:password@host.neon.tech/everclean?sslmode=require"

# NextAuth
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="openssl rand -base64 32"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Stripe
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."  # Get from Stripe after webhook setup

# Email (Resend)
RESEND_API_KEY="re_..."
RESEND_FROM_EMAIL="concierge@everclean.ca"
ADMIN_EMAIL="admin@yourdomain.com"

# App
NEXT_PUBLIC_APP_URL="https://your-domain.vercel.app"
```

### Local Development
```bash
# Copy template
cp .env.example .env.local

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database
npx prisma db seed

# Start dev server
npm run dev
```

---

## 12. DEPLOYMENT GUIDE

### Automatic Deployment
Vercel auto-deploys on every push to `main` branch.

### First-Time Setup

1. **Connect GitHub repo to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select your `everclean` repository
   - Framework preset: Next.js

2. **Set Build Command**
   ```
   prisma generate && next build
   ```

3. **Add Environment Variables** (see section 11)

4. **Deploy**
   - Click Deploy
   - Wait for build to complete

5. **Run Database Migrations**
   ```bash
   # Using Vercel CLI
   vercel env pull .env.production.local
   npx prisma migrate deploy
   ```

6. **Configure Stripe Webhook**
   - Go to Stripe Dashboard → Webhooks
   - Add endpoint: `https://your-domain.vercel.app/api/payment/webhook`
   - Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
   - Copy signing secret to `STRIPE_WEBHOOK_SECRET`

7. **Verify Email Domain (Resend)**
   - Add domain in Resend dashboard
   - Update DNS records
   - Verify domain

---

## 13. KNOWN LIMITATIONS

### Current Limitations

| Feature | Status | Limitation | Workaround |
|---------|--------|------------|------------|
| **Email Sending** | ⚠️ Partial | Templates ready but not auto-triggered | Manual sending via admin |
| **SMS Notifications** | 🚧 Not Built | Twilio not connected | Email only for now |
| **Real-time Calendar** | 🚧 Not Built | No availability checking | Manual booking management |
| **Gift Cards** | 🚧 Not Built | Schema exists, no UI | Manual gift card creation |
| **Reviews System** | 🚧 Not Built | Schema exists, no UI | Collect reviews manually |
| **Subscription Bookings** | 🚧 Not Built | No recurring payment logic | Manual rebooking |
| **Multi-language** | 🚧 Not Built | English only | N/A |
| **Advanced Analytics** | 🚧 Not Built | Basic stats only | Export data manually |

### Technical Debt
- **Prisma version**: Currently 5.22.0, latest is 7.x
- **Next.js version**: 14.2.15, patch available
- **Booking page warnings**: React Hook dependency warnings (non-breaking)

---

## 14. FUTURE ROADMAP

### Phase 1: Core Stability (Immediate - 1 week)
- [ ] Connect email templates to booking flow
- [ ] Add email confirmation on booking
- [ ] Add email reminder 24h before service
- [ ] Fix React Hook warnings in booking page

### Phase 2: Enhanced Features (1-2 months)
- [ ] Real-time availability calendar
- [ ] Staff scheduling interface
- [ ] SMS notifications (Twilio integration)
- [ ] Gift card purchase flow
- [ ] Review collection system

### Phase 3: Scale & Optimize (2-3 months)
- [ ] Subscription/recurring bookings
- [ ] Service area mapping (Google Maps)
- [ ] Multi-language support (i18n)
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)

### Phase 4: Enterprise (3+ months)
- [ ] White-label solution
- [ ] Franchise management
- [ ] API for partners
- [ ] Inventory management

---

## 15. AI AGENT INSTRUCTIONS

### How to Work with This Codebase

#### File Naming Conventions
- **Components**: PascalCase (e.g., `HeroSection.tsx`)
- **Utilities**: camelCase (e.g., `api-utils.ts`)
- **API Routes**: lowercase with hyphens (e.g., `create-intent/`)
- **Database models**: PascalCase in Prisma schema

#### Adding New Features

**1. New API Endpoint**
```typescript
// Create file: app/api/feature-name/route.ts
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/api-utils";
import { z } from "zod";

const schema = z.object({
  // validation schema
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = schema.parse(body);
    
    const result = await db.model.create({ data });
    
    return successResponse(result, undefined, 201);
  } catch (error) {
    return errorResponse("Failed to process", 500);
  }
}
```

**2. New Page Section**
```typescript
// Create file: components/sections/NewSection.tsx
"use client";

import { AnimatedSection } from "@/components/luxury/animations";

export function NewSection() {
  return (
    <section className="section-lg bg-[var(--color-ivory)]">
      <div className="container-luxury">
        <AnimatedSection>
          {/* Content */}
        </AnimatedSection>
      </div>
    </section>
  );
}
```

**3. Database Migration**
```bash
# Modify prisma/schema.prisma first
npx prisma migrate dev --name descriptive_name
npx prisma generate
```

#### Design System Compliance

**Always use accessible color classes:**
```css
/* Light backgrounds (ivory) */
text-text-primary      /* Headings */
text-text-secondary    /* Body text */
text-text-tertiary     /* Supporting text */
text-text-muted        /* Labels */

/* Dark backgrounds (navy) */
text-light-primary     /* Headings */
text-light-secondary   /* Body text */
text-light-tertiary    /* Supporting text */
text-light-muted       /* Labels */
```

**Never use these (failing accessibility):**
```css
text-stone-muted       /* ❌ Too light */
text-stone-light       /* ❌ Too light */
text-[color]/50        /* ❌ Opacity reduces contrast */
text-[color]/60        /* ❌ Opacity reduces contrast */
```

#### API Response Format

Always return:
```typescript
// Success
{
  success: true,
  message?: string,
  data: T,
  timestamp: string
}

// Error
{
  success: false,
  message: string,
  errors?: Record<string, string[]>,
  timestamp: string
}
```

#### Testing Checklist
Before committing:
- [ ] TypeScript compiles without errors (`npm run build`)
- [ ] No new accessibility contrast violations
- [ ] Responsive on mobile/tablet/desktop
- [ ] Keyboard navigation works
- [ ] Form validation works
- [ ] Database migrations apply successfully

### Common Tasks

**Add a new service:**
1. Add to `prisma/seed.ts`
2. Run `npx prisma db seed`
3. Add card to `ServicesSection.tsx`

**Add a new admin user:**
```sql
UPDATE "users" SET role = 'ADMIN' WHERE email = 'user@example.com';
```

**Add a new page:**
1. Create folder in `app/page-name/`
2. Add `page.tsx` with metadata export
3. Add link in `Header.tsx` navigation

### Security Reminders
- Never commit `.env.local` or secrets
- Always validate input with Zod
- Use parameterized queries (Prisma handles this)
- Check user permissions in API routes
- Rate limit public endpoints

---

## 📞 SUPPORT RESOURCES

- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://prisma.io/docs
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Stripe Docs**: https://stripe.com/docs
- **shadcn/ui**: https://ui.shadcn.com
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/

---

**Document Version:** 2.1.0  
**Last Updated:** December 2024  
**Maintainer:** AI Development Team  
**Status:** Production Ready | WCAG AA Compliant
