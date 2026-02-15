# Changelog

All notable changes to Blind Box Creator will be documented in this file.

## 2026-02-15 — v4.1.1 "Button Polish"

**Deployed:** February 15, 2026
**Lines:** +1 / -1 | **Files:** 1

### Improved
- **Email capture button** — redesigned from yellow to clean white with blue text, shadow, and scale hover animation for better visual appeal on blue gradient background

---

## 2026-02-15 — v4.1.0 "Conversion Optimization"

**Deployed:** February 15, 2026
**Lines:** +1,266 / -355 | **Files:** 30

### Added
- **Exit-intent popup** — captures abandoning visitors with free template pack offer, shows on mouse leave from top
- **Trust badges component** — 4-badge component (30-day guarantee, instant download, 2.5k families, print unlimited)
- **Guarantee badge** — prominent 30-day money-back guarantee on pricing page
- **CopyButton client component** — extracted from press page for client-side clipboard functionality
- **Affiliate program promotion** — "💰 Earn 50%" highlighted in navbar (pink) and footer

### Fixed
- **Press page server component error** — onClick handler moved to CopyButton client component
- **All ESLint errors** — unescaped quotes (`'` → `&apos;`, `"` → `&quot;`)
- **TypeScript build error** — share-buttons.tsx rarity parameter handling (`...(rarity && { rarity })`)
- **Unused imports** — removed Image, ImageIcon, Globe, CheckCircle, Heart, SITE_NAME, _dbError

### Improved
- **Pricing page conversion** — added guarantee badge + 4 trust badges below pricing tiers
- **Affiliate visibility** — navbar shows "💰 Earn 50%" instead of "Earn 50%", pink highlight
- **Footer links** — "💰 Earn 50% Commission" highlighted in company section
- **Email capture strategy** — exit-intent targeting with instant gratification (free pack)

### Environment
- No new environment variables

---

## 2026-02-15 — v4.0 "Growth Engine"

**Deployed:** February 15, 2026
**Lines:** +1,200 / -100 | **Files:** 20

### Added
- **Dynamic sitemap** (`/sitemap.xml`) — all 81 products, 16 static pages, 4 blog posts auto-indexed
- **Google Analytics 4** — gtag script + `trackEvent()` helper for custom events (generate, share, signup, checkout)
- **Product page SEO** — `generateMetadata()` with dynamic title/description/OG per product + `generateStaticParams()` for all 81 products
- **JSON-LD structured data** — Product schema on every product page for Google rich snippets
- **OG images** — root metadata + per-product pack cover images as OpenGraph/Twitter cards
- **Social share buttons** — Twitter/X, Pinterest, WhatsApp, Facebook on AI generator result page
- **Email capture modal** — shows 2s after first AI generation, posts to waitlist, one-time per browser
- **Post-purchase confirmation email** — Resend HTML email with order summary, print instructions, supplies upsell, affiliate CTA
- **Testimonials section** — 6 testimonials (parents, teachers, bloggers, planners) on home page with i18n
- **"Trusted by 2,500+ families"** social proof counter in hero section
- **Newsletter signup in footer** — email form posts to `/api/waitlist` with `role: "newsletter"`
- **Urgency banner** on pricing page ("Founding member pricing won't last forever")
- **Color-coded badges** on shop page (🔥 Best Seller=red, ⭐ Popular=blue, ✨ New=green)
- **Social proof counters** on product detail pages ("X families chose this pack")
- **SEO metadata** for 6 pages that were missing it (`/shop`, `/templates`, `/create`, `/supplies`, `/affiliate`, `/print`)
- 30+ new i18n keys (EN/ES) for testimonials, newsletter, email modal

### Changed
- Product detail page refactored from single client component to server (metadata/JSON-LD) + client (UI) split
- Webhook now sends order confirmation email after `checkout.session.completed`

### Environment
- `NEXT_PUBLIC_GA_ID` — Google Analytics 4 measurement ID (placeholder until configured)
- `RESEND_API_KEY` — Resend email API key (for post-purchase emails)

---

## 2026-02-12 — v3.4 "Paper Craft"

**Deployed:** February 12, 2026 - 8:00 PM CT
**Lines:** +180 / -120 | **Files:** 6

### Fixed
- Product images now show paper blind boxes (the actual product), not vinyl/plastic toys

### Changed
- 12 packs regenerated with Gemini 3 Pro showing real paper crafts with scissors, glue, template sheets

### Known
- 63 remaining packs awaiting OpenRouter credit refill to complete paper craft regeneration

---

## 2026-02-12 — v3.3 "Studio"

**Deployed:** February 12, 2026 - 6:30 PM CT
**Lines:** +200 / -150 | **Files:** 8

### Changed
- All 75 pack product images regenerated with Google Gemini 3 Pro Image
- Photorealistic 3D vinyl figure renders with actual packaging boxes
- Studio lighting, shallow depth of field, collection name on packaging
- Massive visual quality jump from flat 2D illustrations to realistic product photography

---

## 2026-02-12 — v3.2 "Build Steps"

**Deployed:** February 12, 2026 - 5:00 PM CT
**Lines:** +350 / -80 | **Files:** 5

### Added
- Every product page has 3 pack-specific step-by-step build photos (Print, Cut & Fold, Surprise!)
- 225 step images generated (75 packs x 3 steps) showing each pack's actual characters being built

### Changed
- "How to Use" section now says "How to Build Your [Pack Name]" with pack-specific imagery
- Consolidated from 4 steps to 3 cleaner steps

### Removed
- Generic stock photos from build steps (replaced with pack-specific photos)

---

## 2026-02-12 — v3.1 "Preview"

**Deployed:** February 12, 2026 - 3:30 PM CT
**Lines:** +280 / -60 | **Files:** 6

### Added
- Product detail pages now show pack-specific preview images (character sheets, template previews, assembled boxes)
- "What You Get" gallery section on product pages showing the actual deliverables
- 225 product preview images (3 per pack) being generated via Gemini

### Fixed
- Graceful fallback for missing preview images (hidden instead of broken)

### Removed
- Generic lifestyle stock photos from product gallery (replaced with actual product previews)

---

## 2026-02-12 — v3.0 "Full Catalog"

**Deployed:** February 12, 2026 - 2:00 PM CT
**Lines:** +400 / -100 | **Files:** 7

### Added
- Generated product images for all 49 remaining packs using Gemini 2.5 Flash Image
- All 75 template packs now show real kawaii product photography (no more emoji fallbacks)
- Shop grid shows full visual catalog instead of gradient+emoji placeholders

### Changed
- Removed PACKS_WITH_IMAGES filter — all packs are now launch-ready
- TEMPLATE_PACKS export now includes all 75 packs (was limited to 26)

---

## 2026-02-12 — v2.9 "Unlimited"

**Deployed:** February 12, 2026 - 1:30 PM CT
**Lines:** +5 / -5 | **Files:** 1

### Changed
- Daily generation limit raised to 999 for testing

---

## 2026-02-12 — v2.8 "Gemini"

**Deployed:** February 12, 2026 - 1:00 PM CT
**Lines:** +150 / -80 | **Files:** 4

### Changed
- AI generator switched to Google Gemini 2.5 Flash Image via OpenRouter (replaced DALL-E 3 billing limit)
- Fallback chain: Gemini 2.5 Flash Image -> Gemini 3 Pro Image -> sample characters
- Cost: ~$0.04 per generation (same as DALL-E 3 but actually works)

### Fixed
- Print page now handles base64 images via sessionStorage (no URL length limits)

### Removed
- Dead OpenAI DALL-E dependency entirely

---

## 2026-02-12 — v2.7 "i18n"

**Deployed:** February 12, 2026 - 12:00 PM CT
**Lines:** +320 / -40 | **Files:** 8

### Added
- OpenRouter fallback for vision/reference image descriptions
- Home page fully translated (40+ keys: hero, how-it-works, featured templates, party/classroom, founding member CTA, email capture)
- Create page fully translated (20+ keys: generator UI, loading steps, results, sample notices)
- Footer fully translated (section headers, link labels, tagline, copyright)

### Fixed
- AI generator now uses dedicated image generation API key (was empty/missing)

### Changed
- Generator route restructured with try/catch cascade: DALL-E 3 -> fallback samples

---

## 2026-02-12 — v2.6 "Espanol"

**Deployed:** February 12, 2026 - 11:00 AM CT
**Lines:** +250 / -20 | **Files:** 6

### Added
- EN/ES language toggle in navbar (desktop + mobile)
- i18n system with React Context + localStorage persistence
- Auto-detects browser language (Spanish speakers see Spanish by default)
- ~100 translation keys covering navbar, home, create, shop, pricing, affiliate, footer
- Providers wrapper for client-side context in server layout

---

## 2026-02-12 — v2.5 "Catalog API"

**Deployed:** February 12, 2026 - 10:00 AM CT
**Lines:** +500 / -30 | **Files:** 7

### Added
- `/api/products` endpoint — full product catalog API with filtering by category, status, collection, or ID
- `src/data/products.json` — comprehensive product database (75 template packs, 3 party kits, 2 classroom bundles, 1 mega bundle, 3 subscription tiers)
- AI generator fallback — when OpenAI billing exhausted, returns sample characters instead of errors
- Pack-specific print templates — visit `/print?pack=chibi-kitty-club` for printable box
- Affiliate landing page countdown banner — persistent red banner shows "$10 bonus waiting" with 24h countdown
- Print page pack CTA — when printing from a pack, shows upsell to buy full pack

### Changed
- Generator never returns errors to user — always shows a character (real or sample)
- Print page supports both `?img=` (AI generated) and `?pack=` (catalog pack) modes

---

## 2026-02-12 — v2.4 "Print"

**Deployed:** February 12, 2026 - 9:00 AM CT
**Lines:** +350 / -40 | **Files:** 5

### Added
- `/print` page — full printable blind box template (letter size, 2 pages)
- Page 1: Cross-shaped box net with character on front, mystery "?" top, rarity badge, fold/cut/glue lines
- Page 2: 6-step assembly instructions with pro tips
- "Get Printable Box Template" button on result screen opens print page
- Auto-cycling placeholder prompts in create page input (8 prompts, 3s cycle)
- Big centered "Create My Blind Box" button with wand icon + hover effects

### Removed
- Example prompt chips (replaced by auto-cycling placeholder)

---

## 2026-02-12 — v2.3 "Psychology"

**Deployed:** February 12, 2026 - 8:00 AM CT
**Lines:** +200 / -30 | **Files:** 4

### Added
- $10 instant signup bonus shown as real account balance
- Account Balance card with big $XX.XX display (bonus + earned)
- Progress bar to $20 withdrawal threshold
- Locked withdrawal button with "Earn $X more" messaging
- "Claim Your Account" email capture (optional, soft CTA below dashboard)
- Balance breakdown showing "$10 bonus + $X.XX earned"

### Changed
- Landing CTA now "Get My Affiliate Link + $10 Free"
- How-it-works updated: Get $10 Free -> Share & Earn -> Cash Out at $20

---

## 2026-02-12 — v2.2 "Frictionless"

**Deployed:** February 12, 2026 - 7:00 AM CT
**Lines:** +30 / -50 | **Files:** 3

### Changed
- Removed email signup requirement from affiliate program
- Back to one-click affiliate link generation (zero friction)
- Kept: $10 minimum withdrawal, $5 credit with 24h expiry, dashboard stats

---

## 2026-02-12 — v2.1 "Affiliate Login"

**Deployed:** February 12, 2026 - 6:00 AM CT
**Lines:** +280 / -40 | **Files:** 6

### Added
- Email-based affiliate signup (enter email to get affiliate link)
- $5 credit notification banner (green top bar) with live countdown timer
- 24-hour credit expiry with hours-remaining display
- $10 minimum withdrawal requirement shown on dashboard
- Sign out functionality on affiliate dashboard
- Payout details section (PayPal to registered email)

### Fixed
- Amazon links fixed to use www.amazon.com (all 18 links)

### Changed
- TOS updated with $10 minimum payout, PayPal payout terms
- Stats banner now shows "$10 Min. Payout" instead of "$0"

---

## 2026-02-12 — v2.0 "Referral Engine"

**Deployed:** February 12, 2026 - 4:00 AM CT
**Lines:** +250 / -20 | **Files:** 5

### Added
- RefTracker component detects `?ref=` on any page, tracks clicks server-side
- $5 referral credit popup for referred visitors (24h expiry)
- Server-side IP hashing for privacy-safe fraud prevention
- 30-day referral cookie + 24h credit cookie on click tracking
- TOS updated with Affiliate Program, Referral Credits, Cookies & Tracking sections (Sections 11-13)

---

## 2026-02-12 — v1.9 "Viral"

**Deployed:** February 12, 2026 - 2:00 AM CT
**Lines:** +400 / -10 | **Files:** 5

### Added
- `/affiliate` page — earn 50% commission by sharing
- One-click affiliate link generation (no signup required)
- Share buttons for Twitter/X, Facebook, WhatsApp, TikTok, Email
- Commission breakdown (template packs $2.50, party kits $5-$7.50, subs $25)
- 30-day cookie tracking, no minimum payout, no earnings cap
- `/api/affiliate` endpoint for code generation
- FAQ section with 6 common questions
- "Earn 50%" added to main navigation

---

## 2026-02-12 — v1.8 "Generator"

**Deployed:** February 12, 2026 - 12:00 AM CT
**Lines:** +600 / -30 | **Files:** 8

### Added
- `/create` page — AI-powered blind box character generator
- Photo upload — turn any photo into a kawaii blind box character
- Text prompt — describe your character in one sentence
- 8 example prompts for instant inspiration
- 6 theme options (Kawaii Animals, Fantasy, Food Cuties, Space, Ocean, Magical Girl)
- Rarity system — Common (60%), Rare (25%), Epic (10%), Legendary (5%) with color-coded badges
- Animated loading overlay with step-by-step progress
- Download generated characters as PNG
- Rate limiting — 3 free generations per day, upgrade CTA when exhausted
- `/api/generate` endpoint — DALL-E 3 generation + GPT-4o-mini vision for photo references

### Changed
- "Coming Soon" replaced with "Now Live - Try It Free" on features page
- Homepage hero: "Try AI Generator Free" button links to /create

---

## 2026-02-12 — v1.7 "Supplies"

**Deployed:** February 11, 2026 - 10:00 PM CT
**Lines:** +350 / -80 | **Files:** 4

### Changed
- Completely rebuilt /supplies page with 16 curated premium kawaii products
- Category tabs (Essentials, Premium Paper, Tools, Kawaii Extras, Gift Packaging)
- Upgraded from 7 generic supplies to 16 researched products with emojis and categories
- Added kawaii-specific items: cat paw glue sticks, holographic washi tape, desk organizer
- Added gift packaging category: kraft boxes, shimmer tissue paper, pastel bows

### Added
- "Complete Starter Kit" bundle banner showing 3 essentials under $24
- "Holographic Rare Characters" upsell banner with premium cardstock links
- Supply callout section on every product detail page with Amazon links

---

## 2026-02-12 — v1.6 "Launch Ready"

**Deployed:** February 11, 2026 - 8:00 PM CT
**Lines:** +60 / -120 | **Files:** 5

### Changed
- Only 26 packs with real DALL-E 3 product images are live (49 emoji-only placeholders removed from shop)
- Updated mega bundle, homepage, templates page, shop page to reflect actual pack counts
- Dynamic pack counts (TEMPLATE_PACKS.length) instead of hardcoded "75" everywhere

### Removed
- 49 emoji-only placeholder packs from shop (definitions kept in code, hidden)

---

## 2026-02-12 — v1.5.1 "Image Fix"

**Deployed:** February 11, 2026 - 7:00 PM CT
**Lines:** +30 / -10 | **Files:** 2

### Fixed
- 49/75 template packs showed broken `<img>` tags instead of gradient+emoji fallback
- Added `PACKS_WITH_IMAGES` set in constants.ts — only 26 packs with real .png files get image paths
- Packs without images now correctly show collection gradient background + emoji icon

---

## 2026-02-12 — v1.5 "Detail Pages"

**Deployed:** February 11, 2026 - 5:00 PM CT
**Lines:** +800 / -100 | **Files:** 10

### Added
- Full product detail page at /shop/[id] with image gallery (10+ photos), step-by-step guide, related products, mega bundle upsell

### Fixed
- Buy Now buttons now open product pages instead of raw JSON error

### Changed
- All product cards across shop, templates, and landing are now clickable links to detail pages
- Rewrote ALL copy to be family-focused: "Build Memories With Your Kids", "So Easy Anyone Can Do It"
- Simplified how-it-works language to be idiot-proof (no jargon, no craft knowledge assumed)
- Landing hero: "Build Memories With Your Kids" + "No craft skills needed" + "Download & print in 2 min"
- Templates page: "Each pack = 12 characters + box designs + guide. Less than a coffee."
- Added parent+kid family crafting images (mom-daughter, dad-son, family together)

---

## 2026-02-12 — v1.4 "Product Photos"

**Deployed:** February 11, 2026 - 3:00 PM CT
**Lines:** +400 / -60 | **Files:** 8

### Added
- 26/75 AI product images generated for template packs (hit OpenAI billing limit)
- All template cards now show real DALL-E 3 product photography when available
- Pack images show kawaii paper craft figures in professional product photography style
- Party Kits page: hero with birthday party photo background
- Classroom page: hero with craft desk photo background
- Scrollbar-hide CSS utility for mobile filter tabs

### Changed
- Mobile responsive verified across all pages (375px, 768px, 1024px)

---

## 2026-02-12 — v1.3 "Lifestyle"

**Deployed:** February 11, 2026 - 1:00 PM CT
**Lines:** +250 / -40 | **Files:** 7

### Added
- 6 HD lifestyle photos: girl surprised unboxing, birthday party, craft desk flat lay, child crafting closeup, collection display, gift wrapping
- "Real Kids, Real Magic" lifestyle photo gallery section with masonry grid
- How It Works section now has product photos above each step card
- Custom kawaii blind box logo (replaces brown shipping box emoji)

### Fixed
- Buy Now buttons returning 405 (added GET handler to /api/checkout)
- Waitlist form crashing when Supabase not configured (graceful fallback)
- Templates page Buy buttons had no click handler

### Changed
- Hero image upgraded to girl-surprised-unboxing (emotional/compelling)
- Party Kits card has birthday party photo background with color overlay
- Logo updated in navbar and footer

---

## 2026-02-12 — v1.2 "Visual Upgrade"

**Deployed:** February 11, 2026 - 11:00 AM CT
**Lines:** +300 / -50 | **Files:** 6

### Added
- 10 AI product photos via DALL-E 3 (hero collection, unboxing flat lay, assembly process, 5 collection previews, party setup, template closeup)

### Changed
- Landing page: split hero layout with hero product photo + floating mini images
- Landing page: 4-column product showcase section with collection preview photos
- Shop page: hero section upgraded to split layout with unboxing + party photos
- Templates page: hero section upgraded to split layout with process photo + template closeup
- All product cards now use collection-specific gradient backgrounds with themed emojis

---

## 2026-02-11 — v1.1 "Kawaii"

**Deployed:** February 11, 2026 - 8:00 PM CT
**Lines:** +1,500 / -400 | **Files:** 12

### Changed
- Pivoted entire brand to Sanrio-inspired kawaii Japanese art style
- Expanded from 10 to 75 template packs (900+ chibi characters)
- 10 themed collections: Chibi Animals, Sweet Bakery, Cherry Blossom, Magical Girls, Celestial, Ocean Kawaii, Forest Friends, Pastel Fantasy, Food Cuties, Seasonal Kawaii
- Ultimate Kawaii Collection mega bundle ($149.99, save 60%)
- Updated all site copy to reflect kawaii aesthetic
- Pastel cardstock and holographic paper in supplies

### Added
- Kawaii Sleepover Kit party bundle
- Renamed classroom bundles (Sensei Bundle)

---

## 2026-02-11 — v1.0 "Launch"

**Deployed:** February 11, 2026 - 4:00 PM CT
**Lines:** +3,000 / -0 | **Files:** 25

### Added
- Launched Blind Box Generator website
- 10 themed digital template packs ($4.99 each)
- 2 party kit bundles ($9.99 - $14.99)
- 2 classroom bundles ($14.99 - $29.99)
- Mega bundle with all templates ($29.99)
- Founding Member subscription pricing (50% off)
- Affiliate supplies page
- AI Generator announced (coming soon)
- Blog structure ready
- Full legal pages (Terms, Privacy)
- Public changelog
