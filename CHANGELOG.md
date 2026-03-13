# Changelog

All notable changes to Blind Box Creator will be documented in this file.

## v4.3.1 — FIX — 2026-03-13 @ 11:43 AM AST

**Sentry replay reduction**

- Reduced replaysOnErrorSampleRate from 1.0 to 0.1 in sentry.client.config.ts to reduce Sentry costs
- Updated sentry.edge.config.ts and sentry.server.config.ts configs
- Updated global-error.tsx error boundary component

## v4.3.0 — UPDATE — 2026-03-12 @ 12:48 AM AST

**Sentry Maximization — full observability stack**

- Enabled server profiling via @sentry/profiling-node
- Added release tracking with NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA
- Added authToken for source map uploads in next.config.ts
- Instrumented 7 API routes with Sentry metrics (request counters, latency histograms)
- Fixed edge config to use NEXT_PUBLIC_SENTRY_DSN for runtime access
- Fixed deploy.sh secrets scan false positives on process.env reads
- Suppressed false positive SAST findings in offline CLI scripts

---

## v4.2.0 — UPDATE — 2026-03-10 @ 03:12 AM AST

**Documentation overhaul — CLAUDE.md and CHANGELOG.md reformatted to standards**

- Reformatted all changelog entries to use `vX.Y.Z — TAG — date @ time AST` format
- Added missing CLAUDE.md sections: current milestone, deploy command, known issues, documentation links
- Enhanced environment variables, database schema, and production URLs sections

---

## v4.1.1 — FIX — 2026-02-15 @ 12:00 AM AST

**Email capture button redesigned for better visual appeal**

- Redesigned email capture button from yellow to clean white with blue text, shadow, and scale hover animation on blue gradient background

---

## v4.1.0 — UPDATE — 2026-02-15 @ 12:00 AM AST

**Conversion optimization with exit-intent popup, trust badges, and affiliate promotion**

- Added exit-intent popup capturing abandoning visitors with free template pack offer
- Added trust badges component (30-day guarantee, instant download, 2.5k families, print unlimited)
- Added prominent 30-day money-back guarantee badge on pricing page
- Extracted CopyButton client component from press page for client-side clipboard
- Added affiliate program promotion in navbar (pink "Earn 50%") and footer
- Fixed press page server component error (onClick handler moved to CopyButton client component)
- Fixed all ESLint errors (unescaped quotes)
- Fixed TypeScript build error in share-buttons.tsx rarity parameter handling
- Removed unused imports (Image, ImageIcon, Globe, CheckCircle, Heart, SITE_NAME, _dbError)

---

## v4.0.0 — MAJOR — 2026-02-15 @ 12:00 AM AST

**Growth engine: sitemap, GA4, SEO, social sharing, email capture, testimonials, confirmation emails**

- Added dynamic sitemap (`/sitemap.xml`) with all 81 products, 16 static pages, 4 blog posts
- Added Google Analytics 4 with `trackEvent()` helper for custom events (generate, share, signup, checkout)
- Added `generateMetadata()` with dynamic title/description/OG per product + `generateStaticParams()` for all 81 products
- Added JSON-LD structured data (Product schema) on every product page for Google rich snippets
- Added OG images (root metadata + per-product pack covers as OpenGraph/Twitter cards)
- Added social share buttons on AI generator result page (Twitter/X, Pinterest, WhatsApp, Facebook)
- Added email capture modal (shows 2s after first AI generation, posts to waitlist, one-time per browser)
- Added post-purchase confirmation email via Resend (order summary, print instructions, supplies upsell, affiliate CTA)
- Added testimonials section (6 testimonials from parents, teachers, bloggers, planners) on home page with i18n
- Added "Trusted by 2,500+ families" social proof counter in hero section
- Added newsletter signup form in footer posting to `/api/waitlist`
- Added urgency banner on pricing page ("Founding member pricing won't last forever")
- Added color-coded badges on shop page (Best Seller=red, Popular=blue, New=green)
- Added social proof counters on product detail pages ("X families chose this pack")
- Added SEO metadata for 6 pages missing it (`/shop`, `/templates`, `/create`, `/supplies`, `/affiliate`, `/print`)
- Added 30+ new i18n keys (EN/ES) for testimonials, newsletter, email modal
- Refactored product detail page from single client component to server (metadata/JSON-LD) + client (UI) split
- Webhook now sends order confirmation email after `checkout.session.completed`
- New env vars: `NEXT_PUBLIC_GA_ID`, `RESEND_API_KEY`

---

## v3.4.0 — FIX — 2026-02-12 @ 12:00 AM AST

**Product images corrected to show paper blind boxes instead of vinyl/plastic toys**

- Regenerated 12 packs with Gemini 3 Pro showing real paper crafts with scissors, glue, template sheets
- Fixed product images to show paper blind boxes (the actual product), not vinyl/plastic toys
- 63 remaining packs awaiting OpenRouter credit refill to complete paper craft regeneration

---

## v3.3.0 — UPDATE — 2026-02-12 @ 12:00 AM AST

**All 75 pack images regenerated with Gemini 3 Pro for photorealistic quality**

- Regenerated all 75 pack product images with Google Gemini 3 Pro Image
- Photorealistic 3D vinyl figure renders with actual packaging boxes
- Studio lighting, shallow depth of field, collection name on packaging
- Massive visual quality jump from flat 2D illustrations to realistic product photography

---

## v3.2.0 — UPDATE — 2026-02-12 @ 12:00 AM AST

**Pack-specific step-by-step build photos added to every product page**

- Added 3 pack-specific step-by-step build photos per product page (Print, Cut & Fold, Surprise!)
- Generated 225 step images (75 packs x 3 steps) showing each pack's actual characters being built
- "How to Use" section renamed to "How to Build Your [Pack Name]" with pack-specific imagery
- Consolidated from 4 steps to 3 cleaner steps
- Removed generic stock photos from build steps

---

## v3.1.0 — UPDATE — 2026-02-12 @ 12:00 AM AST

**Product detail pages now show pack-specific preview images**

- Added pack-specific preview images on product detail pages (character sheets, template previews, assembled boxes)
- Added "What You Get" gallery section showing actual deliverables
- Generated 225 product preview images (3 per pack) via Gemini
- Added graceful fallback for missing preview images (hidden instead of broken)
- Removed generic lifestyle stock photos from product gallery

---

## v3.0.0 — MAJOR — 2026-02-12 @ 12:00 AM AST

**Full 75-pack catalog with real product images — no more emoji fallbacks**

- Generated product images for all 49 remaining packs using Gemini 2.5 Flash Image
- All 75 template packs now show real kawaii product photography
- Removed PACKS_WITH_IMAGES filter — all packs are launch-ready
- TEMPLATE_PACKS export now includes all 75 packs (was limited to 26)

---

## v2.9.0 — UPDATE — 2026-02-12 @ 12:00 AM AST

**Daily generation limit raised to 999 for testing**

- Raised daily generation limit from 3 to 999 for testing

---

## v2.8.0 — UPDATE — 2026-02-12 @ 12:00 AM AST

**AI generator switched to Gemini via OpenRouter, replacing DALL-E 3**

- Switched AI generator to Google Gemini 2.5 Flash Image via OpenRouter (replaced DALL-E 3 billing limit)
- Added fallback chain: Gemini 2.5 Flash Image -> Gemini 3 Pro Image -> sample characters
- Cost: ~$0.04 per generation (same as DALL-E 3 but actually works)
- Fixed print page to handle base64 images via sessionStorage (no URL length limits)
- Removed dead OpenAI DALL-E dependency entirely

---

## v2.7.0 — UPDATE — 2026-02-12 @ 12:00 AM AST

**Full i18n coverage for home, create, and footer pages**

- Added OpenRouter fallback for vision/reference image descriptions
- Home page fully translated (40+ keys: hero, how-it-works, featured templates, party/classroom, founding member CTA, email capture)
- Create page fully translated (20+ keys: generator UI, loading steps, results, sample notices)
- Footer fully translated (section headers, link labels, tagline, copyright)
- Fixed AI generator to use dedicated image generation API key (was empty/missing)
- Restructured generator route with try/catch cascade: DALL-E 3 -> fallback samples

---

## v2.6.0 — MAJOR — 2026-02-12 @ 12:00 AM AST

**English/Spanish internationalization system added**

- Added EN/ES language toggle in navbar (desktop + mobile)
- Built i18n system with React Context + localStorage persistence
- Auto-detects browser language (Spanish speakers see Spanish by default)
- Added ~100 translation keys covering navbar, home, create, shop, pricing, affiliate, footer
- Added Providers wrapper for client-side context in server layout

---

## v2.5.0 — UPDATE — 2026-02-12 @ 12:00 AM AST

**Product catalog API, generator fallback, pack-specific print templates**

- Added `/api/products` endpoint with filtering by category, status, collection, or ID
- Added `src/data/products.json` product database (75 template packs, 3 party kits, 2 classroom bundles, 1 mega bundle, 3 subscription tiers)
- Added AI generator fallback — returns sample characters instead of errors when OpenAI billing exhausted
- Added pack-specific print templates (`/print?pack=chibi-kitty-club`)
- Added affiliate landing page countdown banner ("$10 bonus waiting" with 24h countdown)
- Added print page pack CTA (upsell to buy full pack when printing from a pack)
- Generator never returns errors to user — always shows a character (real or sample)
- Print page supports both `?img=` (AI generated) and `?pack=` (catalog pack) modes

---

## v2.4.0 — MAJOR — 2026-02-12 @ 12:00 AM AST

**Printable blind box template with assembly instructions**

- Added `/print` page — full printable blind box template (letter size, 2 pages)
- Page 1: Cross-shaped box net with character on front, mystery "?" top, rarity badge, fold/cut/glue lines
- Page 2: 6-step assembly instructions with pro tips
- Added "Get Printable Box Template" button on result screen
- Added auto-cycling placeholder prompts in create page input (8 prompts, 3s cycle)
- Added big centered "Create My Blind Box" button with wand icon + hover effects
- Removed example prompt chips (replaced by auto-cycling placeholder)

---

## v2.3.0 — UPDATE — 2026-02-12 @ 12:00 AM AST

**Affiliate signup bonus and gamified withdrawal system**

- Added $10 instant signup bonus shown as real account balance
- Added Account Balance card with big $XX.XX display (bonus + earned)
- Added progress bar to $20 withdrawal threshold
- Added locked withdrawal button with "Earn $X more" messaging
- Added "Claim Your Account" email capture (optional, soft CTA below dashboard)
- Added balance breakdown showing "$10 bonus + $X.XX earned"
- Updated landing CTA to "Get My Affiliate Link + $10 Free"
- Updated how-it-works: Get $10 Free -> Share & Earn -> Cash Out at $20

---

## v2.2.0 — FIX — 2026-02-12 @ 12:00 AM AST

**Removed email signup requirement from affiliate program (back to zero-friction)**

- Removed email signup requirement from affiliate program
- Restored one-click affiliate link generation (zero friction)
- Kept: $10 minimum withdrawal, $5 credit with 24h expiry, dashboard stats

---

## v2.1.0 — UPDATE — 2026-02-12 @ 12:00 AM AST

**Email-based affiliate signup with credit system and payout details**

- Added email-based affiliate signup (enter email to get affiliate link)
- Added $5 credit notification banner (green top bar) with live countdown timer
- Added 24-hour credit expiry with hours-remaining display
- Added $10 minimum withdrawal requirement shown on dashboard
- Added sign out functionality on affiliate dashboard
- Added payout details section (PayPal to registered email)
- Fixed Amazon links to use www.amazon.com (all 18 links)
- Updated TOS with $10 minimum payout, PayPal payout terms
- Stats banner now shows "$10 Min. Payout" instead of "$0"

---

## v2.0.0 — MAJOR — 2026-02-12 @ 12:00 AM AST

**Referral tracking engine with server-side click tracking and credit popups**

- Added RefTracker component detecting `?ref=` on any page, tracking clicks server-side
- Added $5 referral credit popup for referred visitors (24h expiry)
- Added server-side IP hashing for privacy-safe fraud prevention
- Added 30-day referral cookie + 24h credit cookie on click tracking
- Updated TOS with Affiliate Program, Referral Credits, Cookies & Tracking sections (Sections 11-13)

---

## v1.9.0 — MAJOR — 2026-02-12 @ 12:00 AM AST

**Affiliate program with 50% commission and share buttons**

- Added `/affiliate` page — earn 50% commission by sharing
- Added one-click affiliate link generation (no signup required)
- Added share buttons for Twitter/X, Facebook, WhatsApp, TikTok, Email
- Added commission breakdown (template packs $2.50, party kits $5-$7.50, subs $25)
- Added 30-day cookie tracking, no minimum payout, no earnings cap
- Added `/api/affiliate` endpoint for code generation
- Added FAQ section with 6 common questions
- Added "Earn 50%" to main navigation

---

## v1.8.0 — MAJOR — 2026-02-12 @ 12:00 AM AST

**AI-powered blind box character generator launched**

- Added `/create` page — AI-powered blind box character generator
- Added photo upload — turn any photo into a kawaii blind box character
- Added text prompt — describe your character in one sentence
- Added 8 example prompts for instant inspiration
- Added 6 theme options (Kawaii Animals, Fantasy, Food Cuties, Space, Ocean, Magical Girl)
- Added rarity system: Common (60%), Rare (25%), Epic (10%), Legendary (5%) with color-coded badges
- Added animated loading overlay with step-by-step progress
- Added download generated characters as PNG
- Added rate limiting (3 free generations per day, upgrade CTA when exhausted)
- Added `/api/generate` endpoint (DALL-E 3 generation + GPT-4o-mini vision for photo references)
- Replaced "Coming Soon" with "Now Live - Try It Free" on features page
- Homepage hero: "Try AI Generator Free" button links to /create

---

## v1.7.0 — UPDATE — 2026-02-11 @ 12:00 AM AST

**Supplies page rebuilt with 16 curated kawaii products and upsell banners**

- Rebuilt /supplies page with 16 curated premium kawaii products
- Added category tabs (Essentials, Premium Paper, Tools, Kawaii Extras, Gift Packaging)
- Upgraded from 7 generic supplies to 16 researched products with categories
- Added kawaii-specific items: cat paw glue sticks, holographic washi tape, desk organizer
- Added gift packaging category: kraft boxes, shimmer tissue paper, pastel bows
- Added "Complete Starter Kit" bundle banner (3 essentials under $24)
- Added "Holographic Rare Characters" upsell banner with premium cardstock links
- Added supply callout section on every product detail page with Amazon links

---

## v1.6.0 — UPDATE — 2026-02-11 @ 12:00 AM AST

**Shop limited to 26 packs with real images — placeholder packs hidden**

- Limited shop to 26 packs with real DALL-E 3 product images (49 emoji-only placeholders removed)
- Updated mega bundle, homepage, templates page, shop page to reflect actual pack counts
- Dynamic pack counts (TEMPLATE_PACKS.length) instead of hardcoded "75" everywhere
- Removed 49 emoji-only placeholder packs from shop (definitions kept in code, hidden)

---

## v1.5.1 — FIX — 2026-02-11 @ 12:00 AM AST

**Fixed broken image tags on 49/75 template packs**

- Fixed 49/75 template packs showing broken `<img>` tags instead of gradient+emoji fallback
- Added `PACKS_WITH_IMAGES` set in constants.ts — only 26 packs with real .png files get image paths
- Packs without images now correctly show collection gradient background + emoji icon

---

## v1.5.0 — MAJOR — 2026-02-11 @ 12:00 AM AST

**Full product detail pages with image gallery, build guide, and family-focused copy**

- Added full product detail page at /shop/[id] with image gallery (10+ photos), step-by-step guide, related products, mega bundle upsell
- Fixed Buy Now buttons (were opening raw JSON error)
- All product cards across shop, templates, and landing are now clickable links to detail pages
- Rewrote ALL copy to be family-focused: "Build Memories With Your Kids", "So Easy Anyone Can Do It"
- Simplified how-it-works language (no jargon, no craft knowledge assumed)
- Updated landing hero: "Build Memories With Your Kids" + "No craft skills needed" + "Download & print in 2 min"
- Added parent+kid family crafting images (mom-daughter, dad-son, family together)

---

## v1.4.0 — UPDATE — 2026-02-11 @ 12:00 AM AST

**26/75 AI product images generated, mobile responsive verified**

- Generated 26/75 AI product images for template packs (hit OpenAI billing limit)
- All template cards now show real DALL-E 3 product photography when available
- Pack images show kawaii paper craft figures in professional product photography style
- Added Party Kits page hero with birthday party photo background
- Added Classroom page hero with craft desk photo background
- Added scrollbar-hide CSS utility for mobile filter tabs
- Mobile responsive verified across all pages (375px, 768px, 1024px)

---

## v1.3.0 — UPDATE — 2026-02-11 @ 12:00 AM AST

**Lifestyle photos, custom logo, and critical buy button fixes**

- Added 6 HD lifestyle photos (girl surprised unboxing, birthday party, craft desk flat lay, child crafting closeup, collection display, gift wrapping)
- Added "Real Kids, Real Magic" lifestyle photo gallery section with masonry grid
- Added How It Works photos above each step card
- Added custom kawaii blind box logo (replaces brown shipping box emoji)
- Fixed Buy Now buttons returning 405 (added GET handler to /api/checkout)
- Fixed waitlist form crashing when Supabase not configured (graceful fallback)
- Fixed Templates page Buy buttons (had no click handler)
- Upgraded hero image to girl-surprised-unboxing (emotional/compelling)
- Party Kits card now has birthday party photo background with color overlay

---

## v1.2.0 — UPDATE — 2026-02-11 @ 12:00 AM AST

**Visual upgrade with 10 AI product photos and gradient backgrounds**

- Added 10 AI product photos via DALL-E 3 (hero collection, unboxing flat lay, assembly process, 5 collection previews, party setup, template closeup)
- Landing page: split hero layout with hero product photo + floating mini images
- Landing page: 4-column product showcase section with collection preview photos
- Shop page: hero section upgraded to split layout with unboxing + party photos
- Templates page: hero section upgraded to split layout with process photo + template closeup
- All product cards now use collection-specific gradient backgrounds with themed emojis

---

## v1.1.0 — MAJOR — 2026-02-11 @ 12:00 AM AST

**Full kawaii pivot: 75 template packs, 10 collections, Sanrio-inspired branding**

- Pivoted entire brand to Sanrio-inspired kawaii Japanese art style
- Expanded from 10 to 75 template packs (900+ chibi characters)
- Added 10 themed collections: Chibi Animals, Sweet Bakery, Cherry Blossom, Magical Girls, Celestial, Ocean Kawaii, Forest Friends, Pastel Fantasy, Food Cuties, Seasonal Kawaii
- Added Ultimate Kawaii Collection mega bundle ($149.99, save 60%)
- Updated all site copy to reflect kawaii aesthetic
- Added pastel cardstock and holographic paper in supplies
- Added Kawaii Sleepover Kit party bundle
- Renamed classroom bundles (Sensei Bundle)

---

## v1.0.0 — MAJOR — 2026-02-11 @ 12:00 AM AST

**Initial launch: 10 template packs, party kits, classroom bundles, affiliate program**

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
