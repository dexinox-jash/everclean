# EVERCLEAN LUXURY SERVICES - COMPLETE PROJECT DOCUMENTATION

## 📋 TABLE OF CONTENTS
1. [Project Overview](#1-project-overview)
2. [Vision & Goals](#2-vision--goals)
3. [Technology Stack](#3-technology-stack)
4. [Architecture Overview](#4-architecture-overview)
5. [Design System](#5-design-system)
6. [Database Schema](#6-database-schema)
7. [API Documentation](#7-api-documentation)
8. [Frontend Structure](#8-frontend-structure)
9. [Current Features](#9-current-features)
10. [Environment Configuration](#10-environment-configuration)
11. [Deployment Guide](#11-deployment-guide)
12. [Known Issues](#12-known-issues)
13. [Future Roadmap](#13-future-roadmap)
14. [AI Agent Instructions](#14-ai-agent-instructions)

---

## 1. PROJECT OVERVIEW

**Project Name:** Everclean Luxury Services  
**Type:** Full-stack Next.js web application  
**Industry:** Luxury Home Cleaning & Estate Services  
**Target Audience:** High-net-worth individuals, estate owners, discerning homeowners  
**Current Status:** Production-ready (v2.0.0)  
**Live URL:** [Deployed on Vercel]

### Core Purpose
A premium booking platform for luxury cleaning and concierge services. The website embodies "Quiet Luxury" design principles with sophisticated animations, a refined color palette, and seamless user experience.

### Brand Identity
- **Brand Philosophy:** Understated elegance, discretion, white-glove service
- **Tagline:** "Bespoke cleaning for discerning homeowners"
- **Key Values:** Sophistication, Discretion, Excellence, Trust

---

## 2. VISION & GOALS

### Original Vision
Create a luxury service booking platform that:
- Reflects premium brand positioning through design
- Provides seamless booking experience with payment integration
- Maintains client privacy and discretion
- Automates confirmations and notifications
- Scales to support multiple cities and services

### Current Achievements ✅
- [x] Premium design with "Quiet Luxury" aesthetics
- [x] Responsive, animated UI with Framer Motion
- [x] PostgreSQL database with Prisma ORM
- [x] Booking creation and management API
- [x] Stripe payment integration
- [x] Email notifications via Resend
- [x] Contact form with auto-replies
- [x] Docker containerization
- [x] Production deployment on Vercel

### Missing Features (Opportunities) 🚧
- [ ] Admin dashboard for managing bookings
- [ ] Client portal for viewing booking history
- [ ] Real-time booking calendar
- [ ] Staff scheduling system
- [ ] Review and rating system
- [ ] Multi-language support
- [ ] Service area mapping
- [ ] SMS notifications
- [ ] Subscription/recurring bookings
- [ ] Gift cards functionality

---

## 3. TECHNOLOGY STACK

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.2.15 | React framework with App Router |
| React | 18.3.1 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.4.14 | Utility-first styling |
| Framer Motion | 12.34.3 | Premium animations |
| Lucide React | 0.454.0 | Icon library |
| shadcn/ui | latest | UI component primitives |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js API Routes | 14.2.15 | Serverless API endpoints |
| Prisma | 5.22.0 | Database ORM |
| PostgreSQL | 15+ | Primary database |
| NextAuth.js | 5.0.0-beta.25 | Authentication |
| Zod | 3.23.8 | Schema validation |

### External Services
| Service | Purpose | Integration Status |
|---------|---------|-------------------|
| Stripe | Payment processing | ✅ Active |
| Resend | Email delivery | ✅ Active |
| Vercel | Hosting/CDN | ✅ Active |
| PostgreSQL | Database | ✅ Active (Neon/Vercel Postgres) |

### Development Tools
- **Package Manager:** npm
- **Linting:** ESLint
- **Version Control:** Git + GitHub
- **Containerization:** Docker + Docker Compose

---

## 4. ARCHITECTURE OVERVIEW

### System Architecture Diagram
```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │   Browser    │  │   Mobile     │  │   Admin Panel   │   │
│  └──────────────┘  └──────────────┘  └─────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    VERCEL EDGE NETWORK                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Next.js 14 Application                   │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │   │
│  │  │  Static UI  │  │ API Routes  │  │  SSR/ISR    │  │   │
│  │  │  (App Dir)  │  │  (Node.js)  │  │   (Edge)    │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ PostgreSQL│  │  Stripe  │  │  Resend  │  │ NextAuth │   │
│  │  (Neon)  │  │(Payments)│  │ (Email)  │  │  (Auth)  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Project Structure
```
EVERCLEAN/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── bookings/             # Booking CRUD
│   │   │   └── route.ts
│   │   ├── contact/              # Contact form
│   │   │   └── route.ts
│   │   └── payment/              # Stripe integration
│   │       ├── create-intent/
│   │       │   └── route.ts
│   │       └── webhook/
│   │           └── route.ts
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   ├── globals.css               # Global styles + CSS variables
│   ├── services/
│   │   └── page.tsx              # Services listing
│   ├── booking/
│   │   └── page.tsx              # Booking form (needs rebuild)
│   ├── contact/
│   │   └── page.tsx              # Contact page
│   └── about/
│       └── page.tsx              # About page
├── components/                   # React Components
│   ├── animations/               # Animation components
│   │   ├── PremiumAnimations.tsx # Main animation library
│   │   ├── AnimatedSection.tsx   # Scroll animations
│   │   ├── PageTransition.tsx    # Page load animations
│   │   └── ScrollProgress.tsx    # Scroll indicator
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx            # Navigation header
│   │   └── Footer.tsx            # Site footer
│   ├── sections/                 # Page sections
│   │   ├── HeroSection.tsx       # Hero with text reveal
│   │   ├── ServicesSection.tsx   # Services grid
│   │   ├── ProcessSection.tsx    # How it works
│   │   ├── TestimonialsSection.tsx
│   │   └── CTASection.tsx        # Call to action
│   └── ui/                       # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       └── ...
├── lib/                          # Utility functions
│   ├── db.ts                     # Prisma client
│   ├── api-utils.ts              # API helpers
│   ├── validations.ts            # Zod schemas
│   ├── utils.ts                  # General utilities
│   ├── design-system/            # Design tokens
│   │   ├── index.ts
│   │   ├── tokens.ts
│   │   ├── utils.ts
│   │   └── DesignProvider.tsx
│   └── email/                    # Email service
│       └── service.ts
├── prisma/                       # Database
│   ├── schema.prisma             # Schema definition
│   └── seed.ts                   # Seed data
├── public/                       # Static assets
├── scripts/                      # Setup scripts
│   └── setup-production.js
├── .env.example                  # Environment template
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── next.config.mjs
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json                   # Vercel config
```

---

## 5. DESIGN SYSTEM

### Color Palette (2025 "Quiet Luxury")

#### Primary Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--brand-primary-500` | `#1A202C` | Midnight Navy - Primary brand |
| `--brand-primary-600` | `#171923` | Hover states |
| `--brand-primary-700` | `#0D1117` | Deep backgrounds |

#### Secondary Colors (Champagne Gold)
| Token | Hex | Usage |
|-------|-----|-------|
| `--brand-secondary-500` | `#C9A962` | Champagne Gold - Accents |
| `--brand-secondary-400` | `#E3C28A` | Hover states |
| `--brand-secondary-600` | `#B8974F` | Active states |

#### Accent Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--brand-accent-500` | `#A67C52` | Muted Terracotta |

#### Semantic Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#FAF9F6` | Warm Ivory - Page background |
| `--bg-secondary` | `#FFFFFF` | Card backgrounds |
| `--bg-tertiary` | `#F5F4F0` | Alternate sections |
| `--fg-primary` | `#1C1917` | Primary text |
| `--fg-secondary` | `#44403C` | Secondary text |
| `--fg-tertiary` | `#78716C` | Muted text |

### Typography

#### Font Families
- **Headings:** Playfair Display (Serif)
- **Body:** Inter (Sans-serif)

#### Type Scale
| Token | Size | Usage |
|-------|------|-------|
| `--text-xs` | 12px | Captions, badges |
| `--text-sm` | 14px | Small text, buttons |
| `--text-base` | 16px | Body text |
| `--text-lg` | 18px | Large body |
| `--text-xl` | 20px | Small headings |
| `--text-2xl` | 24px | H4 |
| `--text-3xl` | 30px | H3 |
| `--text-4xl` | 36px | H2 |
| `--text-5xl` | 48px | Hero mobile |
| `--text-6xl` | 60px | Hero tablet |
| `--text-7xl` | 72px | Hero desktop |
| `--text-8xl` | 96px | Display |

### Spacing System
| Token | Value | Usage |
|-------|-------|-------|
| `--section-sm` | 5rem (80px) | Compact sections |
| `--section-md` | 8rem (128px) | Standard sections |
| `--section-lg` | 12rem (192px) | Large sections |
| `--section-xl` | 16rem (256px) | Hero sections |

### Animation Specifications

#### Easing Functions
```css
--ease-luxury: cubic-bezier(0.23, 1, 0.32, 1);     /* Primary - smooth deceleration */
--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275); /* Bouncy */
--ease-dramatic: cubic-bezier(0.87, 0, 0.13, 1);   /* High impact */
```

#### Duration Scale
```css
--duration-fast: 200ms;      /* Micro-interactions */
--duration-normal: 400ms;    /* Standard transitions */
--duration-slow: 600ms;      /* Complex animations */
--duration-slower: 800ms;    /* Page transitions */
```

#### Animation Patterns
1. **Text Reveal:** Word-by-word stagger, 100ms delay, y: 80px → 0
2. **Card Hover:** y: -8px, scale: 1.02, shadow expansion
3. **Magnetic Button:** Spring physics, follows cursor
4. **Section Reveal:** Fade + translate-y: 40px, luxury ease

---

## 6. DATABASE SCHEMA

### Entity Relationship Diagram
```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│      USER        │     │     BOOKING      │     │   NOTIFICATION   │
├──────────────────┤     ├──────────────────┤     ├──────────────────┤
│ id (PK)          │1   *│ id (PK)          │1   *│ id (PK)          │
│ email (unique)   │─────│ userId (FK)      │─────│ bookingId (FK)   │
│ name             │     │ bookingNumber    │     │ type             │
│ role             │     │ customerName     │     │ recipient        │
│ createdAt        │     │ customerEmail    │     │ subject          │
└──────────────────┘     │ customerPhone    │     │ content          │
                         │ serviceId        │     │ isSent           │
┌──────────────────┐     │ serviceName      │     │ sentAt           │
│  CONTACT_FORM    │     │ homeSize         │     └──────────────────┘
├──────────────────┤     │ price            │
│ id (PK)          │     │ scheduledDate    │     ┌──────────────────┐
│ name             │     │ scheduledTime    │     │     SERVICE      │
│ email            │     │ address          │     ├──────────────────┤
│ phone            │     │ city             │     │ id (PK)          │
│ subject          │     │ notes            │     │ slug (unique)    │
│ message          │     │ status           │     │ name             │
│ status           │     │ paymentStatus    │     │ description      │
│ createdAt        │     │ paymentIntentId  │     │ basePrice        │
└──────────────────┘     │ createdAt        │     │ duration         │
                         └──────────────────┘     │ features[]       │
                                                   │ isActive         │
                                                   └──────────────────┘
```

### Tables

#### 1. User
```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  role          UserRole  @default(CUSTOMER)  // CUSTOMER | ADMIN | STAFF
  emailVerified DateTime?
  image         String?
  createdAt     DateTime  @default(now())
  
  // Relations
  accounts      Account[]
  sessions      Session[]
  bookings      Booking[]
  contactForms  ContactForm[]
}
```

#### 2. Booking
```prisma
model Booking {
  id              String        @id @default(cuid())
  bookingNumber   String        @unique  // Format: EC-2024-XXXX
  
  // Customer Info
  customerName    String
  customerEmail   String
  customerPhone   String
  userId          String?       // Optional: for registered users
  
  // Service Details
  serviceId       String
  serviceName     String
  homeSize        String
  price           Decimal       @db.Decimal(10, 2)
  
  // Schedule
  scheduledDate   DateTime
  scheduledTime   String        // Format: "HH:MM"
  duration        Int           @default(3)  // Hours
  
  // Address
  address         String
  city            String
  postalCode      String?
  
  // Additional
  notes           String?       @db.Text
  specialRequests String?       @db.Text
  
  // Status
  status          BookingStatus @default(PENDING)
  paymentStatus   PaymentStatus @default(PENDING)
  paymentIntentId String?
  amountPaid      Decimal?      @db.Decimal(10, 2)
  
  // Timestamps
  createdAt       DateTime      @default(now())
  confirmedAt     DateTime?
  completedAt     DateTime?
  cancelledAt     DateTime?
}
```

#### 3. Service
```prisma
model Service {
  id               String    @id @default(cuid())
  slug             String    @unique
  name             String
  description      String    @db.Text
  shortDescription String
  basePrice        Decimal   @db.Decimal(10, 2)
  priceMultiplier  Json?     // { "studio": 1, "2bed": 1.3 }
  duration         String    // "2-3 hours"
  features         String[]  // Array of feature strings
  bestFor          String?
  icon             String    // Lucide icon name
  isActive         Boolean   @default(true)
  isPopular        Boolean   @default(false)
  sortOrder        Int       @default(0)
}
```

#### 4. ContactForm
```prisma
model ContactForm {
  id        String        @id @default(cuid())
  name      String
  email     String
  phone     String?
  subject   String        // general | booking | quote | feedback | careers
  message   String        @db.Text
  userId    String?
  status    ContactStatus @default(NEW)  // NEW | IN_PROGRESS | RESOLVED | ARCHIVED
  createdAt DateTime      @default(now())
}
```

### Enums
```prisma
enum UserRole {
  CUSTOMER
  ADMIN
  STAFF
}

enum BookingStatus {
  PENDING
  CONFIRMED
  IN_PROGRESS
  COMPLETED
  CANCELLED
  NO_SHOW
}

enum PaymentStatus {
  PENDING
  PROCESSING
  PAID
  FAILED
  REFUNDED
  PARTIALLY_REFUNDED
}
```

---

## 7. API DOCUMENTATION

### Base URL
```
Production: https://your-domain.vercel.app/api
Development: http://localhost:3000/api
```

### Authentication
Currently uses simple API key pattern for admin endpoints (expandable to JWT).

### Endpoints

#### Bookings

**Create Booking**
```http
POST /api/bookings
Content-Type: application/json

{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+1 (519) 555-0123",
  "serviceId": "estate-cleaning",
  "serviceName": "Estate Cleaning",
  "homeSize": "4bed",
  "price": 650.00,
  "scheduledDate": "2024-12-25",
  "scheduledTime": "10:00",
  "address": "123 Luxury Lane",
  "city": "waterloo",
  "notes": "Please use the side entrance"
}
```

**Response (201 Created)**
```json
{
  "success": true,
  "data": {
    "booking": {
      "id": "cuid...",
      "bookingNumber": "EC-2024-1234",
      "customerName": "John Doe",
      ...
    },
    "message": "Booking created successfully",
    "nextStep": "payment"
  }
}
```

**Get Bookings (Admin)**
```http
GET /api/bookings?page=1&limit=20&status=PENDING&email=john@example.com
```

#### Contact

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

#### Payment

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

**Stripe Webhook**
```http
POST /api/payment/webhook
Stripe-Signature: whsec_xxx

// Stripe event payload
```

### Error Responses
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "customerEmail": ["Please enter a valid email address"]
  },
  "timestamp": "2024-12-20T09:30:00.000Z"
}
```

---

## 8. FRONTEND STRUCTURE

### Page Routes
| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.tsx` | Homepage with all sections |
| `/services` | `app/services/page.tsx` | Service listings |
| `/booking` | `app/booking/page.tsx` | Booking form (⚠️ needs rebuild) |
| `/contact` | `app/contact/page.tsx` | Contact form |
| `/about` | `app/about/page.tsx` | About page |

### Component Architecture

#### Premium Animation Components
Located in `components/animations/PremiumAnimations.tsx`

| Component | Props | Description |
|-----------|-------|-------------|
| `AnimatedSection` | children, delay, direction, duration | Scroll-triggered reveal |
| `StaggerContainer` | children, staggerDelay | Container for staggered children |
| `StaggerItem` | children, direction | Individual stagger item |
| `FadeScale` | children, delay | Fade + scale animation |
| `TextReveal` | children (string), delay, charDelay | Character-by-character reveal |
| `WordReveal` | children (string), delay, wordDelay | Word-by-word reveal |
| `HoverLift` | children, lift, scale | Hover elevation effect |
| `Magnetic` | children, strength | Magnetic cursor following |
| `GoldLineReveal` | delay, width | Animated gold divider |
| `CounterAnimation` | end, duration, suffix | Animated number counter |

#### Section Components
Located in `components/sections/`

| Component | Purpose | Key Features |
|-----------|---------|--------------|
| `HeroSection` | Homepage hero | Text reveal animation, floating gradients, CTAs |
| `ServicesSection` | Services grid | Hover cards, stagger animation |
| `ProcessSection` | How it works | Step cards with connecting lines |
| `TestimonialsSection` | Client reviews | Cards with star ratings, counter stats |
| `CTASection` | Final call-to-action | Animated gradient background |

### State Management
Currently using React useState. Consider upgrading to:
- **Zustand** for global state
- **React Query/TanStack Query** for server state
- **Context API** for theme/auth

---

## 9. CURRENT FEATURES

### ✅ Implemented

#### Frontend
- [x] Responsive design (mobile, tablet, desktop)
- [x] Premium animations (Framer Motion)
- [x] Scroll-triggered reveals
- [x] Hover effects on cards/buttons
- [x] Gold accent color scheme
- [x] Typography system (Playfair + Inter)
- [x] Navigation with smooth scroll
- [x] Services showcase grid
- [x] Testimonial cards
- [x] Process/steps visualization

#### Backend
- [x] Booking creation API
- [x] Contact form submission
- [x] Email notifications (Resend)
- [x] Stripe payment intents
- [x] Webhook handling
- [x] Rate limiting on APIs
- [x] Input validation (Zod)
- [x] Error handling middleware

#### Database
- [x] PostgreSQL schema
- [x] Prisma ORM integration
- [x] Seed data for services
- [x] Migration system

#### DevOps
- [x] Docker containerization
- [x] Docker Compose setup
- [x] Vercel deployment config
- [x] Environment variable management

### ⚠️ Partial/Broken

#### Booking Page (`/booking`)
**Status:** ❌ Needs complete rebuild
**Issues:**
- Old code uses different color scheme
- Not integrated with new API
- No Stripe Elements integration
- Missing form validation

**Requirements for rebuild:**
1. Multi-step form (4 steps)
   - Step 1: Select service
   - Step 2: Home size
   - Step 3: Date/time selection
   - Step 4: Contact info + payment
2. Real-time price calculation
3. Stripe Payment Element integration
4. Form validation with Zod
5. Success/error states
6. Loading states

### 🚧 Not Implemented

#### Admin Dashboard
**Priority:** HIGH
**Requirements:**
- Login with NextAuth
- View all bookings
- Update booking status
- View contact form submissions
- Manage services (CRUD)
- View analytics/stats

#### Client Portal
**Priority:** MEDIUM
**Requirements:**
- Login with email magic link
- View booking history
- Reschedule/cancel bookings
- Update profile info
- View receipts

#### Calendar Integration
**Priority:** MEDIUM
- Available slots display
- Real-time availability
- Block off booked times

#### SMS Notifications
**Priority:** LOW
- Twilio integration
- Booking reminders
- Status updates

---

## 10. ENVIRONMENT CONFIGURATION

### Required Variables

```bash
# Database
DATABASE_URL="postgresql://user:password@host:5432/everclean"

# NextAuth
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="openssl rand -base64 32"

# Stripe
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email
RESEND_API_KEY="re_..."
RESEND_FROM_EMAIL="Everclean <hello@everclean.ca>"
ADMIN_EMAIL="admin@yourdomain.com"

# App
NEXT_PUBLIC_APP_URL="https://your-domain.vercel.app"
```

### Optional Variables
```bash
# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"

# Feature Flags
ENABLE_PAYMENTS="true"
ENABLE_EMAIL_NOTIFICATIONS="true"
ENABLE_BOOKING_CONFIRMATION="true"

# Business
COMPANY_PHONE="+1 (519) 555-0123"
COMPANY_EMAIL="hello@everclean.ca"
```

### Local Development (.env.local)
```bash
# Use test keys for development
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
DATABASE_URL="postgresql://localhost:5432/everclean_dev"
```

---

## 11. DEPLOYMENT GUIDE

### Platform: Vercel (Recommended)

#### Initial Setup
1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Add environment variables
4. Deploy

#### Database Setup
**Option A: Vercel Postgres**
1. Go to vercel.com/storage/postgres
2. Create database
3. Copy connection string
4. Add to env vars

**Option B: Neon**
1. Sign up at neon.tech
2. Create project
3. Get connection string
4. Add to env vars

#### Post-Deploy Steps
```bash
# Run migrations
npx prisma migrate deploy

# Seed data
npx prisma db seed
```

#### Stripe Configuration
1. Add webhook endpoint: `https://your-domain/api/payment/webhook`
2. Select events: payment_intent.succeeded, payment_intent.payment_failed
3. Copy webhook secret to env vars

### Alternative: Self-Hosted (Docker)

```bash
# Build and run
docker-compose up --build -d

# Run migrations
docker-compose exec app npx prisma migrate deploy

# Seed
docker-compose exec app npx prisma db seed
```

---

## 12. KNOWN ISSUES

### Critical ⚠️
1. **Booking page needs rebuild**
   - File: `app/booking/page.tsx`
   - Status: Uses old code, not functional
   - Fix: Complete rebuild required

### Minor 🐛
1. **Deprecated dependencies**
   - Several npm warnings on install
   - Fix: Update package.json versions

2. **Prisma version update available**
   - Current: 5.22.0
   - Latest: 7.4.2
   - Fix: Follow migration guide

### Security 🔒
1. **Next.js version has security patch available**
   - Current: 14.2.15
   - Upgrade to: 14.2.20+

---

## 13. FUTURE ROADMAP

### Phase 1: Core Stability (Immediate)
- [ ] Rebuild booking page with full functionality
- [ ] Add admin dashboard
- [ ] Implement client portal
- [ ] Add comprehensive error handling
- [ ] Add loading states throughout

### Phase 2: Enhanced Features (1-2 months)
- [ ] Real-time availability calendar
- [ ] Staff scheduling system
- [ ] SMS notifications (Twilio)
- [ ] Subscription/recurring bookings
- [ ] Gift cards
- [ ] Review/rating system

### Phase 3: Scale & Optimize (2-3 months)
- [ ] Multi-city support
- [ ] Multi-language support (i18n)
- [ ] Advanced analytics dashboard
- [ ] Service area mapping (Google Maps)
- [ ] Mobile app (React Native)
- [ ] AI chatbot for support

### Phase 4: Enterprise (3+ months)
- [ ] White-label solution
- [ ] API for partners
- [ ] Franchise management
- [ ] Advanced reporting
- [ ] Inventory management

---

## 14. AI AGENT INSTRUCTIONS

### How to Work with This Codebase

#### File Conventions
- **Components:** PascalCase (e.g., `HeroSection.tsx`)
- **Utilities:** camelCase (e.g., `api-utils.ts`)
- **API Routes:** lowercase with hyphens (e.g., `create-intent/`)
- **Database models:** PascalCase in Prisma schema

#### Adding New Features

**1. New API Endpoint**
```typescript
// Create file: app/api/feature-name/route.ts
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse, handleApiError } from "@/lib/api-utils";
import { z } from "zod";

const schema = z.object({
  // validation schema
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = schema.parse(body);
    
    // Database operation
    const result = await db.model.create({ data });
    
    return successResponse(result, undefined, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
```

**2. New Page Section**
```typescript
// Create file: components/sections/NewSection.tsx
"use client";

import { AnimatedSection } from "@/components/animations/PremiumAnimations";

export function NewSection() {
  return (
    <section className="section-padding-lg bg-bg-primary">
      <div className="max-w-layout mx-auto px-4 sm:px-6 lg:px-8">
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
Always use:
- **Colors:** CSS variables (e.g., `bg-brand-primary-500`)
- **Spacing:** Section utilities (e.g., `section-padding-lg`)
- **Typography:** Font classes (e.g., `font-serif`, `heading-section`)
- **Animations:** Components from `PremiumAnimations.tsx`
- **Shadows:** Semantic shadows (e.g., `shadow-card`)

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
- [ ] TypeScript compiles without errors
- [ ] Build succeeds (`npm run build`)
- [ ] Responsive on mobile/tablet/desktop
- [ ] Animations respect `prefers-reduced-motion`
- [ ] API endpoints tested
- [ ] Database migrations run successfully

### Common Tasks

**Add a new service:**
1. Add to `prisma/seed.ts`
2. Run `npx prisma db seed`
3. Add card to `ServicesSection.tsx`

**Add a new API endpoint:**
1. Create route in `app/api/feature/route.ts`
2. Add Zod validation in `lib/validations.ts`
3. Update this documentation

**Add a new page:**
1. Create folder in `app/page-name/`
2. Add `page.tsx` with metadata export
3. Add link in `Header.tsx` navigation
4. Add to sitemap (if applicable)

**Modify design colors:**
1. Edit CSS variables in `app/globals.css`
2. Update Tailwind config if needed
3. Test contrast ratios

---

## 📞 SUPPORT RESOURCES

### Documentation Links
- Next.js: https://nextjs.org/docs
- Prisma: https://prisma.io/docs
- Tailwind: https://tailwindcss.com/docs
- Stripe: https://stripe.com/docs
- shadcn/ui: https://ui.shadcn.com

### Community
- Next.js Discord: https://discord.gg/nextjs
- Prisma Slack: https://prisma.slack.com

---

## 📝 CHANGELOG

### v2.0.0 (Current)
- Complete redesign with "Quiet Luxury" aesthetic
- Added full backend with PostgreSQL
- Stripe payment integration
- Email notifications
- Premium animations
- Production deployment

### v1.0.0 (Original)
- Basic Next.js setup
- Static pages
- Three.js integration (removed)

---

**Document Version:** 2.0.0  
**Last Updated:** December 2024  
**Maintainer:** AI Development Team  
**Status:** Production Ready
