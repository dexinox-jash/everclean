# Everclean Luxury Services

A premium white-glove cleaning and estate care platform for discerning homeowners in Waterloo Region, Ontario.

## Features

### Frontend
- **Luxury Design System**: "Quiet Luxury" aesthetic with Champagne Gold (#C9A962) and Midnight Navy (#1A202C)
- **Premium Animations**: Framer Motion with staggered reveals, magnetic buttons, and scroll-triggered effects
- **Responsive Design**: Mobile-first approach with elegant typography (Playfair Display + Inter)
- **Multi-step Booking Wizard**: 5-step booking flow with real-time price calculation

### Backend
- **Next.js 14+**: App Router with Server Components
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5 with role-based access (Customer, Admin, Manager, Staff)
- **Payments**: Stripe integration with Payment Intents
- **Email**: Resend for transactional emails
- **Security**: Rate limiting, CSRF protection, security headers

### Pages
- **Homepage**: Hero, services, process, testimonials, trust badges, CTA
- **Services**: Detailed service listings with pricing calculator
- **Booking**: 5-step multi-step form (Service → Home Profile → Schedule → Contact → Payment)
- **Client Portal**: Protected dashboard for managing bookings
- **Admin Dashboard**: Role-based admin panel with statistics
- **Legal**: Privacy Policy, Terms of Service, Cookie Policy

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14.2.15 |
| Language | TypeScript 5.x |
| Styling | Tailwind CSS 3.4 |
| UI Components | shadcn/ui |
| Animations | Framer Motion |
| Database | PostgreSQL + Prisma 5.22 |
| Auth | NextAuth.js v5 |
| Payments | Stripe |
| Email | Resend |
| Icons | Lucide React |

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (local or cloud)
- Stripe account (for payments)
- Resend account (for emails)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/everclean.git
cd everclean
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/everclean"
DIRECT_URL="postgresql://user:password@localhost:5432/everclean"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Stripe
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email
RESEND_API_KEY="re_..."
RESEND_FROM_EMAIL="concierge@everclean.ca"
ADMIN_EMAIL="admin@everclean.ca"
```

4. Set up the database:
```bash
npx prisma migrate dev --name init
npx prisma db seed
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Database Schema

### Core Models
- **User**: Customers, admins, managers, staff
- **Service**: Cleaning services with pricing
- **Booking**: Service bookings with status tracking
- **Address**: Property addresses (multi-property support)
- **Staff**: Team members with schedules
- **Review**: Customer reviews
- **ContactForm**: Inquiry submissions

### Enums
- `UserRole`: CUSTOMER, ADMIN, MANAGER, STAFF
- `BookingStatus`: PENDING, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED
- `PaymentStatus`: PENDING, PROCESSING, PAID, FAILED, REFUNDED

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/bookings` | POST | Create new booking |
| `/api/bookings` | GET | List bookings (admin/user) |
| `/api/contact` | POST | Submit contact form |
| `/api/payment/create-intent` | POST | Create Stripe payment intent |
| `/api/payment/webhook` | POST | Stripe webhook handler |
| `/api/auth/[...nextauth]` | ALL | NextAuth endpoints |

## Security Features

- **Security Headers**: CSP, HSTS, X-Frame-Options, X-Content-Type-Options
- **Rate Limiting**: 10 requests/minute for public APIs
- **CSRF Protection**: Built into NextAuth
- **Input Validation**: Zod schema validation on all inputs
- **SQL Injection Prevention**: Prisma ORM parameterized queries
- **XSS Protection**: React's built-in escaping + CSP

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy

### Environment Variables for Production
```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
RESEND_API_KEY="re_..."
```

### Post-Deploy Steps
1. Run migrations: `npx prisma migrate deploy`
2. Seed data: `npx prisma db seed`
3. Configure Stripe webhook endpoint
4. Verify email domain in Resend

## Project Structure

```
app/
├── (marketing)/         # Public pages
│   ├── page.tsx         # Homepage
│   ├── about/
│   ├── contact/
│   ├── services/
│   └── booking/
├── (portal)/            # Protected client routes
│   └── portal/
├── (admin)/             # Admin routes
│   └── admin/
├── api/                 # API routes
│   ├── auth/
│   ├── bookings/
│   ├── contact/
│   └── payment/
components/
├── luxury/              # Animation components
├── layout/              # Header, Footer
├── sections/            # Page sections
└── ui/                  # shadcn/ui components
lib/
├── db.ts                # Prisma client
├── auth.ts              # NextAuth config
├── stripe.ts            # Stripe client
├── utils.ts             # Utilities
└── validations/         # Zod schemas
prisma/
├── schema.prisma        # Database schema
└── seed.ts              # Seed data
types/
└── next-auth.d.ts       # Auth type extensions
```

## Design System

### Colors
- **Navy**: `#1A202C` (Primary brand)
- **Gold**: `#C9A962` (Accent/CTA)
- **Ivory**: `#FAF9F6` (Background)
- **Stone**: `#44403C` (Body text)

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Spacing
- Section padding: `py-24 md:py-32`
- Max width: `max-w-[1400px]`
- Card padding: `p-8 md:p-10`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is proprietary and confidential.

## Support

For support, email concierge@everclean.ca or call (519) 555-0123.

---

Built with ❤️ by Everclean Luxury Services
