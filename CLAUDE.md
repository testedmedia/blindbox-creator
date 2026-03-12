# Blind Box Creator
> AI-powered blind box collectible product creator — generate and customize paper craft blind box characters with AI image generation.

## Current Milestone
Post-launch growth — Conversion optimization (exit-intent, trust badges, email capture), affiliate program live, full 75-pack catalog with paper craft imagery. Next: user accounts, automated digital delivery, server-side rate limiting.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| AI | OpenAI |
| Backend | Supabase |
| Payments | Stripe |
| Rendering | Puppeteer |
| Hosting | Vercel |

## Current Version
**v4.2.0** — Version string in `package.json` line 3.

## Architecture

```
blindbox-creator/
├── CLAUDE.md                         # This file — project brain
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Root layout (Nunito font, Navbar, Footer, I18n Provider)
│   │   ├── page.tsx                  # Landing page (hero, product showcase, how-it-works, pricing CTA)
│   │   ├── create/page.tsx           # AI character generator (prompt input, image upload, rarity roll)
│   │   ├── shop/
│   │   │   ├── page.tsx              # Product catalog (all template packs)
│   │   │   └── [id]/page.tsx         # Individual product detail page
│   │   ├── templates/page.tsx        # Template collection browser (filterable by collection)
│   │   ├── pricing/page.tsx          # Subscription tiers (Free, Founding Creator, Founding Pro)
│   │   ├── party-kits/page.tsx       # Birthday & sleepover party kits
│   │   ├── classroom/page.tsx        # Classroom bundles (10 or 30 students)
│   │   ├── supplies/page.tsx         # Recommended craft supplies (Amazon affiliate links)
│   │   ├── affiliate/page.tsx        # 50% affiliate program dashboard
│   │   ├── blog/
│   │   │   ├── page.tsx              # Blog index
│   │   │   └── [slug]/page.tsx       # Blog post pages
│   │   ├── print/page.tsx            # Print preview / instructions
│   │   ├── about/page.tsx            # About page
│   │   ├── features/page.tsx         # AI generator features showcase
│   │   ├── contact/page.tsx          # Contact form
│   │   ├── changelog/page.tsx        # Version changelog
│   │   ├── privacy/page.tsx          # Privacy policy
│   │   ├── terms/page.tsx            # Terms of service
│   │   └── api/
│   │       ├── generate/route.ts     # AI character generation (Gemini via OpenRouter, rarity system)
│   │       ├── checkout/route.ts     # Stripe checkout session creation (one-time + subscription)
│   │       ├── webhook/route.ts      # Stripe webhook (order recording, subscription management)
│   │       ├── waitlist/route.ts     # Email waitlist signup → Supabase
│   │       ├── contact/route.ts      # Contact form submission
│   │       ├── products/route.ts     # Product catalog API (filter by category/collection/status)
│   │       └── affiliate/route.ts    # Affiliate code generation, click tracking, stats
│   ├── components/
│   │   ├── layout/
│   │   │   ├── navbar.tsx            # Top navigation with language toggle
│   │   │   └── footer.tsx            # Site footer with link sections
│   │   ├── ui/                       # Shadcn components (button, card, dialog, input, badge, separator)
│   │   ├── providers.tsx             # I18n context provider wrapper
│   │   └── ref-tracker.tsx           # Affiliate referral tracking (reads ?ref= param, sets cookie)
│   ├── data/
│   │   └── products.json             # Product catalog data (75 packs, pricing, collections)
│   └── lib/
│       ├── constants.ts              # 75 template packs, party kits, classroom bundles, subscription tiers, supply links
│       ├── i18n.tsx                   # English/Spanish internationalization (context + translations)
│       ├── stripe.ts                  # Stripe client (checkout sessions, subscriptions)
│       ├── supabase.ts                # Supabase client (waitlist, orders, subscriptions tables)
│       └── utils.ts                   # Shared utilities (cn helper)
├── public/
│   └── products/                     # Product images, pack artwork, lifestyle photos
│       └── packs/                    # 75 pack cover images
├── templates/                        # Paper craft HTML templates (box-net, standee, sticker-sheet, trading-card, assembly-guide)
├── packs/                            # Generated pack assets (bake-off, chibi-kitty-club)
├── scripts/
│   ├── deploy.sh                     # Deploy script
│   ├── pre-deploy.js                 # Pre-deploy checks
│   ├── smoke-test.js                 # Post-deploy smoke tests
│   ├── generate-pack.ts              # AI pack generation (characters + box designs + assembly guide)
│   ├── generate-template-preview.ts  # Template preview image generation
│   ├── generate-product-images.ts    # Product lifestyle image generation
│   ├── generate-gallery.ts           # Character gallery page generation
│   ├── generate-logos.ts             # Logo generation
│   ├── generate-flatlay.ts           # Flatlay photo generation
│   ├── generate-steps.ts             # Step-by-step instruction generation
│   ├── composite-characters.ts       # Character compositing
│   ├── regen-paper-craft.ts          # Paper craft template regeneration
│   ├── regen-chars.ts                # Character asset regeneration
│   ├── bake-off.ts                   # A/B test different generation approaches
│   └── preview-boxnet.js             # Box net preview renderer (Puppeteer)
├── next.config.ts                    # Next.js configuration
├── tsconfig.json                     # TypeScript configuration
├── postcss.config.mjs                # PostCSS (Tailwind)
└── eslint.config.mjs                 # ESLint configuration
```

## Data Flow

User prompt/photo → `/api/generate` (Gemini 2.5 Flash Image via OpenRouter → base64 PNG + rarity roll) → display in browser → download PNG. Purchase flow: product selection → `/api/checkout` (Stripe session) → Stripe payment → `/api/webhook` (order saved to Supabase `blindbox_orders`, confirmation email via Resend).

## Test Commands

```bash
npm test                    # Pre-deploy checks (scripts/pre-deploy.js)
npm run test:smoke          # Post-deploy smoke tests (scripts/smoke-test.js)
npm run test:types          # TypeScript compilation check (tsc --noEmit)
npm run lint                # ESLint
npm run build               # Full production build
```

## Deploy Command

```bash
openclaw-deploy <version> <tag> "<title>" "<changes>"
```
Deploy protocol defined in `~/CLAUDE.md`. Never run `scripts/deploy.sh` directly.

## Production URLs

- **App:** https://blindbox-creator.vercel.app
- **Changelog:** https://blindbox-creator.vercel.app/changelog
- **Shop:** https://blindbox-creator.vercel.app/shop
- **AI Generator:** https://blindbox-creator.vercel.app/create
- **Affiliate:** https://blindbox-creator.vercel.app/affiliate

## Environment Variables

| Variable | Purpose |
|----------|---------|
| OPENROUTER_API_KEY | AI image generation (Gemini via OpenRouter) |
| NEXT_PUBLIC_SUPABASE_URL | Supabase project URL |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Supabase anonymous key |
| STRIPE_SECRET_KEY | Stripe server-side API key |
| STRIPE_WEBHOOK_SECRET | Stripe webhook signature verification |
| NEXT_PUBLIC_SITE_URL | Canonical site URL |
| NEXT_PUBLIC_GA_ID | Google Analytics 4 measurement ID |
| RESEND_API_KEY | Resend email API key (order confirmations) |

## Database Schema

Supabase (PostgreSQL). 3 tables for waitlist, orders, and subscriptions.

| Table | Key Columns | Purpose |
|-------|-------------|---------|
| `blindbox_waitlist` | email (text), role (text), created_at (timestamptz) | Email signups (waitlist + newsletter) |
| `blindbox_orders` | email (text), stripe_session_id (text), products (jsonb), total_cents (int), status (text), created_at (timestamptz) | Completed purchases |
| `blindbox_subscriptions` | email (text), stripe_customer_id (text), stripe_subscription_id (text), tier (text), status (text), created_at (timestamptz) | Active subscriptions |

## Known Issues / Tech Debt

- **No user accounts** — all purchases are guest-only (email-based), no login/auth system
- **No automated digital delivery** — orders recorded in Supabase but template files not gated or auto-delivered
- **Client-side rate limiting only** — daily generation limit uses localStorage counter, not server-enforced
- **63 packs pending paper craft regen** — some pack images still show vinyl/plastic style instead of paper craft (awaiting OpenRouter credits)
- **No download protection** — purchased template files are not behind auth
- **GA4 not configured** — `NEXT_PUBLIC_GA_ID` is a placeholder, not yet wired to a real property
- **Affiliate payouts manual** — commission tracking exists but payout processing is not automated
- **No unit tests** — only pre-deploy checks and smoke tests exist; no vitest/jest unit test suite

## Documentation

- [Project Spec](docs/PROJECT_SPEC.md) — Full product + technical requirements, API spec, known limitations
- [Architecture](docs/ARCHITECTURE.md) — System components, data flows, database schema, integrations
- [Changelog](CHANGELOG.md) — Version history
- [Project Status](docs/PROJECT_STATUS.md) — Milestones and progress
- [Growth Strategy](docs/GROWTH_STRATEGY.md) — Marketing, SEO, social media, influencer outreach
- [Pinterest Marketing](docs/PINTEREST_MARKETING_STRATEGY.md) — Pinterest-specific strategy
- [TikTok Calendar](docs/TIKTOK_CONTENT_CALENDAR.md) — TikTok content schedule
- [Product Hunt Launch](docs/PRODUCT_HUNT_LAUNCH.md) — Product Hunt launch plan
- [Email Marketing](docs/EMAIL_MARKETING_SEQUENCES.md) — Email sequences and automations
- [Teacher Outreach](docs/TEACHER_OUTREACH_KIT.md) — Classroom adoption materials
- [Influencer Kit](docs/INFLUENCER_GIFT_KIT.md) — Influencer partnership materials

