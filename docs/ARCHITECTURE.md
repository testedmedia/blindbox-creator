# Blind Box Creator Architecture

## Overview

Blind Box Creator is an e-commerce platform for AI-generated kawaii paper blind box collectibles. Users can generate custom characters via AI (Gemini image models), browse a catalog of 75+ template packs, purchase packs through Stripe, and print/assemble physical paper blind boxes. The app supports English/Spanish, has an affiliate program, and is deployed on Vercel.

## Components

### Frontend (React 19 + Next.js 16 App Router)

| Page | Purpose |
|------|---------|
| `/` | Landing page (hero, product showcase, how-it-works, testimonials, pricing CTA) |
| `/create` | AI character generator (text prompt or photo upload, rarity roll, download PNG) |
| `/shop` | Product catalog grid (75 packs, filterable by collection) |
| `/shop/[id]` | Product detail (gallery, build steps, related products, JSON-LD structured data) |
| `/templates` | Template collection browser |
| `/pricing` | Subscription tiers (Free, Founding Creator $4.99/mo, Founding Pro $9.99/mo) |
| `/party-kits` | Birthday and sleepover party kit bundles |
| `/classroom` | Classroom bundles (10 or 30 students) |
| `/supplies` | Recommended craft supplies (Amazon affiliate links) |
| `/affiliate` | 50% commission affiliate program dashboard |
| `/print` | Print preview with box net template and assembly instructions |
| `/blog`, `/blog/[slug]` | Blog content |
| `/about`, `/features`, `/contact`, `/changelog`, `/privacy`, `/terms` | Informational pages |

### API Layer

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/generate` | POST | AI character generation via Gemini (OpenRouter), includes rarity roll |
| `/api/checkout` | GET/POST | Stripe Checkout session creation (one-time purchase + subscriptions) |
| `/api/webhook` | POST | Stripe webhook handler (order recording, subscription management, confirmation email) |
| `/api/waitlist` | POST | Email waitlist signup (stored in Supabase) |
| `/api/contact` | POST | Contact form submission |
| `/api/products` | GET | Product catalog API (filter by category, collection, status, or ID) |
| `/api/affiliate` | POST | Affiliate code generation, click tracking, stats |

### Core Libraries (`src/lib/`)

| Module | Responsibility |
|--------|---------------|
| `constants.ts` | 75 template packs, party kits, classroom bundles, subscription tiers, supply links, referral tier system, brand colors |
| `i18n.tsx` | English/Spanish internationalization (React Context + localStorage persistence) |
| `stripe.ts` | Stripe client (checkout sessions for one-time + subscription) |
| `supabase.ts` | Supabase client (waitlist, orders, subscriptions tables) |
| `utils.ts` | Shared utilities (cn class helper) |

### Generation Scripts (`scripts/`)

Offline content generation tooling (not part of the web app runtime):

| Script | Purpose |
|--------|---------|
| `generate-pack.ts` | AI pack generation (characters + box designs + assembly guide) |
| `generate-template-preview.ts` | Template preview image generation |
| `generate-product-images.ts` | Product lifestyle image generation |
| `generate-gallery.ts` | Character gallery page generation |
| `generate-flatlay.ts` | Flatlay photo generation |
| `generate-steps.ts` | Step-by-step instruction image generation |
| `preview-boxnet.js` | Box net preview renderer (Puppeteer) |
| `regen-paper-craft.ts` | Paper craft template regeneration |
| `regen-chars.ts` | Character asset regeneration |

### Static Assets

- `public/products/packs/` — 75 pack cover images (AI-generated kawaii paper craft photography)
- `templates/` — HTML paper craft templates (box-net, standee, sticker-sheet, trading-card, assembly-guide)
- `src/data/products.json` — Full product database (75 packs, 3 party kits, 2 classroom bundles, 1 mega bundle, 3 subscription tiers)

## Data Flow

### AI Character Generation
```
User enters prompt or uploads photo on /create
  -> POST /api/generate
  -> Gemini 2.5 Flash Image via OpenRouter generates character PNG
  -> Fallback chain: Gemini 2.5 Flash -> Gemini 3 Pro -> sample characters
  -> Rarity roll: Common (60%), Rare (25%), Epic (10%), Legendary (5%)
  -> Return base64 PNG + rarity badge to client
  -> User downloads PNG or opens /print for box template
```

### Purchase Flow
```
User selects product on /shop/[id]
  -> GET /api/checkout?product=<id> (redirects to Stripe Checkout)
  -> or POST /api/checkout with items array
  -> Stripe Checkout session created (one-time or subscription)
  -> User completes payment on Stripe
  -> Stripe webhook fires to /api/webhook
  -> checkout.session.completed: order saved to Supabase blindbox_orders
  -> customer.subscription.created: subscription saved to blindbox_subscriptions
  -> Order confirmation email sent via Resend
```

### Affiliate Tracking
```
Partner generates affiliate link on /affiliate
  -> Visitor arrives with ?ref=CODE
  -> RefTracker component: POST /api/affiliate (track click, set 30-day cookie)
  -> $5 referral credit popup shown to visitor (24h expiry)
  -> If visitor purchases, 50% commission tracked
  -> Partner views earnings on /affiliate dashboard
```

## Database

Supabase (PostgreSQL) with 3 tables:

| Table | Columns | Purpose |
|-------|---------|---------|
| `blindbox_waitlist` | email, role, created_at | Email signups (waitlist + newsletter) |
| `blindbox_orders` | email, stripe_session_id, products, total_cents, status, created_at | Completed purchases |
| `blindbox_subscriptions` | email, stripe_customer_id, stripe_subscription_id, tier, status, created_at | Active subscriptions |

## Integrations

| Service | Purpose | Connection |
|---------|---------|------------|
| OpenRouter | AI image generation (routes to Gemini models) | REST API |
| Stripe | Payments (one-time checkout + subscriptions) | REST API + webhooks |
| Supabase | Database (waitlist, orders, subscriptions) | JavaScript SDK |
| Resend | Order confirmation emails | REST API |
| Google Analytics 4 | Event tracking (generate, share, signup, checkout) | gtag.js |
| Amazon | Affiliate supply links | Affiliate URLs |

## Deployment

- **Platform:** Vercel
- **Domain:** blindbox-creator.vercel.app
- **Build:** `next build` (Next.js 16)
- **Deploy:** `openclaw-deploy` wrapper
- **Static generation:** Product pages use `generateStaticParams()` for all 81 products
- **SEO:** Dynamic sitemap, per-page metadata, JSON-LD Product schema, OG images
