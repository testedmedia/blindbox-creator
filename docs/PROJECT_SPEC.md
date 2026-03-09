# Blind Box Creator Project Spec

## Product Requirements

### Vision
A platform where families (parents + kids) can create, customize, and collect kawaii-style paper blind box characters. Users generate unique characters with AI, browse 75+ themed template packs, purchase digital downloads, and print/fold physical paper blind boxes at home.

### Target Users
1. **Parents with kids (5-12)** — looking for creative craft activities
2. **Teachers** — classroom craft projects (10-30 student bundles)
3. **Party planners** — birthday and sleepover activity kits
4. **Kawaii/collector community** — digital collectible enthusiasts

### Revenue Model

| Product Type | Price | Examples |
|-------------|-------|---------|
| Template Pack (12 characters) | $4.99 | Chibi Kitty Club, Dragon Nursery, Moon Rabbit |
| Party Kit | $9.99-$14.99 | Birthday Blast, Kawaii Sleepover Kit |
| Classroom Bundle | $14.99-$29.99 | 10-student, 30-student (Sensei Bundle) |
| Mega Bundle (all 75 packs) | $149.99 | Ultimate Kawaii Collection (save 60%) |
| Founding Creator subscription | $4.99/mo | 5 packs/month + exclusive characters |
| Founding Pro subscription | $9.99/mo | Unlimited packs + commercial license |

Affiliate program: 50% commission on all sales.

### Core Features

**AI Character Generator (`/create`)**
- Text prompt input: describe a character in one sentence
- Photo upload: turn any photo into a kawaii blind box character
- 6 theme options (Kawaii Animals, Fantasy, Food Cuties, Space, Ocean, Magical Girl)
- Rarity system: Common (60%), Rare (25%), Epic (10%), Legendary (5%) with color-coded badges
- Download generated character as PNG
- Rate limiting: 3 free generations per day (999 during testing)

**Product Catalog (`/shop`)**
- 75 themed template packs across 10 collections
- Collection filters: Chibi Animals, Sweet Bakery, Cherry Blossom, Magical Girls, Celestial, Ocean Kawaii, Forest Friends, Pastel Fantasy, Food Cuties, Seasonal Kawaii
- Product detail pages with: pack-specific preview images, step-by-step build photos, related products, mega bundle upsell
- Color-coded badges: Best Seller (red), Popular (blue), New (green)
- Social proof counters ("X families chose this pack")

**Print & Craft (`/print`)**
- Printable box net template (letter size, 2 pages)
- Cross-shaped box net with character on front, mystery "?" top, rarity badge, fold/cut/glue lines
- 6-step assembly instructions with pro tips
- Supports both AI-generated (`?img=`) and catalog pack (`?pack=`) modes

**Affiliate Program (`/affiliate`)**
- One-click affiliate link generation (zero signup friction)
- 50% commission on all product types
- $10 instant signup bonus (displayed as account balance)
- $20 minimum withdrawal threshold
- 30-day referral cookie tracking
- Gamified tier system: Seedling (1 referral, $5 credit) -> Blossom (3, free pack) -> higher tiers
- Share buttons: Twitter/X, Facebook, WhatsApp, TikTok, Email

**Internationalization**
- English/Spanish toggle in navbar
- Auto-detects browser language
- 100+ translation keys covering all pages
- React Context + localStorage persistence

### Growth & Conversion Features
- Exit-intent popup (free template pack offer)
- Email capture modal (2s after first AI generation)
- Social share buttons on generator results (Twitter, Pinterest, WhatsApp, Facebook)
- Trust badges (30-day guarantee, instant download, 2.5k families, print unlimited)
- Dynamic sitemap with all 81 products
- JSON-LD Product schema for Google rich snippets
- Google Analytics 4 with custom event tracking

## Technical Requirements

### AI Generation
- **Primary model:** Gemini 2.5 Flash Image via OpenRouter
- **Fallback chain:** Gemini 2.5 Flash -> Gemini 3 Pro Image -> sample characters (never errors to user)
- **Cost:** ~$0.04 per generation
- **Output:** Base64 PNG embedded in JSON response
- **Prompt engineering:** Kawaii paper craft style with specific art direction

### Payment Processing
- Stripe Checkout Sessions (redirect flow)
- Supports one-time purchases and subscriptions
- Webhook handler for: `checkout.session.completed`, `customer.subscription.created`
- Order confirmation email via Resend on successful purchase
- Graceful 503 when Stripe not configured ("Payments being set up")

### Static Optimization
- `generateStaticParams()` pre-renders all 81 product pages at build time
- `generateMetadata()` produces dynamic SEO title/description/OG per product
- Product data served from `src/data/products.json` (no DB call for catalog)

### Offline Content Pipeline
- Puppeteer-based preview rendering for box net templates
- AI image generation scripts for pack covers, step photos, gallery images
- 225+ product images generated offline (75 packs x 3 steps + covers + previews)

## API Spec

| Method | Endpoint | Request | Response |
|--------|----------|---------|----------|
| POST | `/api/generate` | `{ prompt, theme?, imageUrl? }` | `{ imageUrl, rarity, rarityColor, rarityEffect, revisedPrompt, id, isSample? }` |
| GET | `/api/checkout?product=<id>` | - | 302 redirect to Stripe Checkout |
| POST | `/api/checkout` | `{ items: [{id, name, price, quantity}], email? }` | `{ url }` |
| POST | `/api/webhook` | Stripe event payload | 200 OK |
| POST | `/api/waitlist` | `{ email, role? }` | `{ success }` |
| POST | `/api/contact` | `{ name, email, message }` | `{ success }` |
| GET | `/api/products?category=&collection=&status=&id=` | - | `{ products }` |
| POST | `/api/affiliate` | `{ action: "generate" \| "track" \| "stats", code? }` | Varies by action |

## Known Limitations

- **No user accounts** — purchases are guest-only (email-based), no login system
- **No digital delivery** — orders are recorded in Supabase but template file delivery is not automated (manual or implicit via site access)
- **Affiliate payouts manual** — commission tracking exists but payout processing is not automated
- **Rate limiting basic** — daily generation limit is client-side (localStorage counter), not server-enforced
- **63 packs pending paper craft regen** — some pack images still show vinyl/plastic style instead of paper craft (awaiting OpenRouter credits)
- **No download protection** — purchased template files are not gated behind auth
- **GA4 placeholder** — `NEXT_PUBLIC_GA_ID` measurement ID not yet configured
