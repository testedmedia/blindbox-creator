# Blind Box Creator - CLAUDE.md

## Project
Blind box product creator app. Generate and customize blind box collectible products with AI.

## Version
4.0.0

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

## Architecture Overview
```
blindbox-creator/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (Nunito font, Navbar, Footer, I18n Provider)
│   │   ├── page.tsx                # Landing page (hero, product showcase, how-it-works, pricing CTA)
│   │   ├── create/page.tsx         # AI character generator (prompt input, image upload, rarity roll)
│   │   ├── shop/
│   │   │   ├── page.tsx            # Product catalog (all template packs)
│   │   │   └── [id]/page.tsx       # Individual product detail page
│   │   ├── templates/page.tsx      # Template collection browser (filterable by collection)
│   │   ├── pricing/page.tsx        # Subscription tiers (Free, Founding Creator, Founding Pro)
│   │   ├── party-kits/page.tsx     # Birthday & sleepover party kits
│   │   ├── classroom/page.tsx      # Classroom bundles (10 or 30 students)
│   │   ├── supplies/page.tsx       # Recommended craft supplies (Amazon affiliate links)
│   │   ├── affiliate/page.tsx      # 50% affiliate program dashboard
│   │   ├── blog/
│   │   │   ├── page.tsx            # Blog index
│   │   │   └── [slug]/page.tsx     # Blog post pages
│   │   ├── print/page.tsx          # Print preview / instructions
│   │   ├── about/page.tsx          # About page
│   │   ├── features/page.tsx       # AI generator features showcase
│   │   ├── contact/page.tsx        # Contact form
│   │   ├── changelog/page.tsx      # Version changelog
│   │   ├── privacy/page.tsx        # Privacy policy
│   │   ├── terms/page.tsx          # Terms of service
│   │   └── api/
│   │       ├── generate/route.ts   # AI character generation (Gemini via OpenRouter, rarity system)
│   │       ├── checkout/route.ts   # Stripe checkout session creation (one-time + subscription)
│   │       ├── webhook/route.ts    # Stripe webhook (order recording, subscription management)
│   │       ├── waitlist/route.ts   # Email waitlist signup → Supabase
│   │       ├── contact/route.ts    # Contact form submission
│   │       ├── products/route.ts   # Product catalog API (filter by category/collection/status)
│   │       └── affiliate/route.ts  # Affiliate code generation, click tracking, stats
│   ├── components/
│   │   ├── layout/
│   │   │   ├── navbar.tsx          # Top navigation with language toggle
│   │   │   └── footer.tsx          # Site footer with link sections
│   │   ├── ui/                     # Shadcn components (button, card, dialog, input, badge, separator)
│   │   ├── providers.tsx           # I18n context provider wrapper
│   │   └── ref-tracker.tsx         # Affiliate referral tracking (reads ?ref= param, sets cookie)
│   ├── data/
│   │   └── products.json           # Product catalog data (75 packs, pricing, collections)
│   └── lib/
│       ├── constants.ts            # 75 template packs, party kits, classroom bundles, subscription tiers, supply links
│       ├── i18n.tsx                # English/Spanish internationalization (context + translations)
│       ├── stripe.ts               # Stripe client (checkout sessions, subscriptions)
│       ├── supabase.ts             # Supabase client (waitlist, orders, subscriptions tables)
│       └── utils.ts                # Shared utilities (cn helper)
├── public/
│   └── products/                   # Product images, pack artwork, lifestyle photos
│       └── packs/                  # 75 pack cover images
├── templates/                      # Paper craft HTML templates (box-net, standee, sticker-sheet, trading-card, assembly-guide)
├── crafts/                         # Generated craft output files
├── packs/                          # Generated pack assets (bake-off, chibi-kitty-club)
├── scripts/
│   ├── deploy.sh                   # Deploy script
│   ├── pre-deploy.js               # Pre-deploy checks
│   ├── smoke-test.js               # Post-deploy smoke tests
│   ├── generate-pack.ts            # AI pack generation (characters + box designs + assembly guide)
│   ├── generate-template-preview.ts # Template preview image generation
│   ├── generate-product-images.ts  # Product lifestyle image generation
│   ├── generate-gallery.ts         # Character gallery page generation
│   ├── generate-logos.ts           # Logo generation
│   ├── generate-flatlay.ts         # Flatlay photo generation
│   ├── generate-steps.ts           # Step-by-step instruction generation
│   ├── composite-characters.ts     # Character compositing
│   ├── regen-paper-craft.ts        # Paper craft template regeneration
│   ├── regen-chars.ts              # Character asset regeneration
│   ├── bake-off.ts                 # A/B test different generation approaches
│   └── preview-boxnet.js           # Box net preview renderer (Puppeteer)
├── next.config.ts                  # Next.js configuration
├── tsconfig.json                   # TypeScript configuration
├── postcss.config.mjs              # PostCSS (Tailwind)
└── eslint.config.mjs               # ESLint configuration
```

## Data Flow
User prompt/photo → `/api/generate` (Gemini 2.5 Flash Image via OpenRouter → base64 PNG + rarity roll) → display in browser → download PNG. Purchase flow: product selection → `/api/checkout` (Stripe session) → Stripe payment → `/api/webhook` (order saved to Supabase).

## Production URLs
- **App**: https://blindbox-creator.vercel.app
- **Changelog**: https://blindbox-creator.vercel.app/changelog

## Environment Variables
OPENROUTER_API_KEY, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, NEXT_PUBLIC_SITE_URL

## Database (Supabase)
- `blindbox_waitlist` — email waitlist signups (email, role)
- `blindbox_orders` — completed purchases (email, stripe_session_id, products, total_cents, status)
- `blindbox_subscriptions` — active subscriptions (email, stripe_customer_id, stripe_subscription_id, tier)

## Deployment
Deploy protocol defined in `~/CLAUDE.md`. Use: `bash scripts/deploy.sh <version> <tag>`

## Test Commands
```bash
npm test                    # Run test suite (pre-deploy checks)
npm run test:smoke          # Post-deploy smoke tests
npm run test:types          # TypeScript compilation check
```
