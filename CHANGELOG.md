# Changelog

## v3.4 - Paper Craft Product Images (2026-02-12)
- FIX: Product images now show PAPER blind boxes (the actual product), not vinyl/plastic toys
- NEW: 12 packs regenerated with Gemini 3 Pro showing real paper crafts with scissors, glue, template sheets
- PENDING: 63 remaining packs awaiting OpenRouter credit refill to complete paper craft regeneration

## v3.3 - Gemini 3 Pro Product Photography (2026-02-12)
- UPGRADE: All 75 pack product images regenerated with Google Gemini 3 Pro Image
- NEW: Photorealistic 3D vinyl figure renders with actual packaging boxes
- QUALITY: Studio lighting, shallow depth of field, collection name on packaging
- UPGRADE: Massive visual quality jump from flat 2D illustrations to realistic product photography

## v3.2 - Pack-Specific How-To-Build Steps (2026-02-12)
- NEW: Every product page has 3 pack-specific step-by-step build photos (Print, Cut & Fold, Surprise!)
- NEW: 225 step images generated (75 packs x 3 steps) showing each pack's actual characters being built
- CHANGED: "How to Use" section now says "How to Build Your [Pack Name]" with pack-specific imagery
- REMOVED: Generic stock photos from build steps (replaced with pack-specific photos)
- CHANGED: Consolidated from 4 steps to 3 cleaner steps

## v3.1 - Product Preview Images + Real Deliverables (2026-02-12)
- NEW: Product detail pages now show pack-specific preview images (character sheets, template previews, assembled boxes)
- REMOVED: Generic lifestyle stock photos from product gallery (replaced with actual product previews)
- NEW: "What You Get" gallery section on product pages showing the actual deliverables
- NEW: 225 product preview images (3 per pack) being generated via Gemini
- FIX: Graceful fallback for missing preview images (hidden instead of broken)

## v3.0 - All 75 Packs With Product Images (2026-02-12)
- NEW: Generated product images for all 49 remaining packs using Gemini 2.5 Flash Image
- NEW: All 75 template packs now show real kawaii product photography (no more emoji fallbacks)
- NEW: Shop grid shows full visual catalog instead of gradient+emoji placeholders
- CHANGED: Removed PACKS_WITH_IMAGES filter - all packs are now launch-ready
- CHANGED: TEMPLATE_PACKS export now includes all 75 packs (was limited to 26)

## v2.9 - Unlimited Testing Credits (2026-02-12)
- CHANGED: Daily generation limit raised to 999 for testing

## v2.8 - Gemini Image Generation (2026-02-12)
- SWITCH: AI generator now uses Google Gemini 2.5 Flash Image via OpenRouter (replaced DALL-E 3 which had billing limit)
- NEW: Fallback chain: Gemini 2.5 Flash Image -> Gemini 3 Pro Image -> sample characters
- FIX: Print page now handles base64 images via sessionStorage (no URL length limits)
- FIX: Removed dead OpenAI DALL-E dependency entirely
- COST: ~$0.04 per generation (vs $0.04 DALL-E 3, same price but actually works)

## v2.7 - Full i18n + AI Generator Fix (2026-02-12)
- FIX: AI generator now uses dedicated image generation API key (was empty/missing)
- NEW: OpenRouter fallback for vision/reference image descriptions
- NEW: Home page fully translated (40+ keys: hero, how-it-works, featured templates, party/classroom, founding member CTA, email capture)
- NEW: Create page fully translated (20+ keys: generator UI, loading steps, results, sample notices)
- NEW: Footer fully translated (section headers, link labels, tagline, copyright)
- CHANGED: Generator route restructured with try/catch cascade: DALL-E 3 -> fallback samples

## v2.6 - Spanish Language Support (2026-02-12)
- NEW: EN/ES language toggle in navbar (desktop + mobile)
- NEW: i18n system with React Context + localStorage persistence
- NEW: Auto-detects browser language (Spanish speakers see Spanish by default)
- NEW: ~100 translation keys covering navbar, home, create, shop, pricing, affiliate, footer
- NEW: Providers wrapper for client-side context in server layout

## v2.5 - Product Catalog, Fallback Generator, Pack Templates (2026-02-12)
- NEW: `/api/products` endpoint - full product catalog API with filtering by category, status, collection, or ID
- NEW: `src/data/products.json` - comprehensive product database (75 template packs, 3 party kits, 2 classroom bundles, 1 mega bundle, 3 subscription tiers)
- NEW: AI generator fallback - when OpenAI billing is exhausted, returns sample characters from existing packs instead of errors
- NEW: Pack-specific print templates - visit `/print?pack=chibi-kitty-club` to get a printable box with the pack's actual product image
- NEW: Affiliate landing page countdown banner - persistent red banner shows "$10 bonus waiting - claim in XX:XX:XX" on first visit
- NEW: Visitor timer starts counting down 24h from first page visit (creates urgency before signup)
- NEW: Print page pack CTA - when printing from a pack, shows upsell to buy full pack
- CHANGED: Generator never returns errors to user - always shows a character (real or sample)
- CHANGED: Print page supports both `?img=` (AI generated) and `?pack=` (catalog pack) modes

## v2.4 - Printable Box Template + Create Page Redesign (2026-02-12)
- NEW: `/print` page - full printable blind box template (letter size, 2 pages)
- NEW: Page 1: Cross-shaped box net with character on front, mystery "?" top, rarity badge, fold/cut/glue lines
- NEW: Page 2: 6-step assembly instructions with pro tips
- NEW: "Get Printable Box Template" button on result screen opens print page
- NEW: Auto-cycling placeholder prompts in create page input (8 prompts, 3s cycle)
- NEW: Big centered "Create My Blind Box" button with wand icon + hover effects
- CHANGED: Removed example prompt chips (replaced by auto-cycling placeholder)
- CHANGED: Generate button separated from input card for prominence

## v2.3 - Affiliate $10 Balance + Psychology (2026-02-12)
- NEW: $10 instant signup bonus shown as real account balance
- NEW: Account Balance card with big $XX.XX display (bonus + earned)
- NEW: Progress bar to $20 withdrawal threshold
- NEW: Locked withdrawal button with "Earn $X more" messaging
- NEW: "Claim Your Account" email capture (optional, soft CTA below dashboard)
- NEW: Balance breakdown showing "$10 bonus + $X.XX earned"
- CHANGED: Landing CTA now "Get My Affiliate Link + $10 Free"
- CHANGED: How-it-works updated: Get $10 Free → Share & Earn → Cash Out at $20
- Psychology: sunk cost via free $10, progress bar creates momentum, urgency via 24h credit expiry

## v2.2 - Zero-Barrier Affiliate (2026-02-12)
- CHANGED: Removed email signup requirement from affiliate program
- CHANGED: Back to one-click affiliate link generation (zero friction)
- KEPT: $10 minimum withdrawal, $5 credit with 24h expiry, dashboard stats
- Account creation only needed when ready to withdraw

## v2.1 - Affiliate Login, $5 Banner, $10 Minimum (2026-02-12)
- NEW: Email-based affiliate signup (enter email to get affiliate link)
- NEW: $5 credit notification banner (green top bar) with live countdown timer
- NEW: 24-hour credit expiry with hours-remaining display
- NEW: $10 minimum withdrawal requirement shown on dashboard
- NEW: Sign out functionality on affiliate dashboard
- NEW: Payout details section (PayPal to registered email)
- CHANGED: Amazon links fixed to use www.amazon.com (all 18 links)
- CHANGED: TOS updated with $10 minimum payout, PayPal payout terms
- CHANGED: Stats banner now shows "$10 Min. Payout" instead of "$0"

## v2.0 - Affiliate Infrastructure & Anti-Fraud (2026-02-12)
- NEW: RefTracker component detects `?ref=` on any page, tracks clicks server-side
- NEW: $5 referral credit popup for referred visitors (24h expiry)
- NEW: Server-side IP hashing for privacy-safe fraud prevention
- NEW: 30-day referral cookie + 24h credit cookie on click tracking
- NEW: TOS updated with Affiliate Program, Referral Credits, Cookies & Tracking sections (Sections 11-13)
- URL cleaned silently after ref capture (no reload)
- Anti-fraud: IP hash logged per click, self-referral prohibited in TOS

## v1.9 - Viral Affiliate Program (2026-02-12)
- NEW: `/affiliate` page - earn 50% commission by sharing
- NEW: One-click affiliate link generation (no signup required)
- NEW: Share buttons for Twitter/X, Facebook, WhatsApp, TikTok, Email
- NEW: Commission breakdown (template packs $2.50, party kits $5-$7.50, subs $25)
- NEW: 30-day cookie tracking, no minimum payout, no earnings cap
- NEW: `/api/affiliate` endpoint for code generation
- NEW: FAQ section with 6 common questions
- Added "Earn 50%" to main navigation
- Affiliate codes saved in localStorage for persistence

## v1.8 - AI Character Generator (Flagship Feature) (2026-02-12)
- NEW: `/create` page - AI-powered blind box character generator
- NEW: Photo upload - turn any photo into a kawaii blind box character
- NEW: Text prompt - describe your character in one sentence
- NEW: 8 example prompts for instant inspiration
- NEW: 6 theme options (Kawaii Animals, Fantasy, Food Cuties, Space, Ocean, Magical Girl)
- NEW: Rarity system - Common (60%), Rare (25%), Epic (10%), Legendary (5%) with color-coded badges
- NEW: Animated loading overlay with step-by-step progress
- NEW: Download generated characters as PNG
- NEW: Rate limiting - 3 free generations per day, upgrade CTA when exhausted
- NEW: `/api/generate` endpoint - DALL-E 3 generation + GPT-4o-mini vision for photo references
- Updated navbar: "Create" link with sparkle highlight in primary position
- Updated features page: "Coming Soon" replaced with "Now Live - Try It Free"
- Updated homepage: "Try AI Generator Free" button links to /create
- Print-optimized prompt engineering: bold outlines, solid fills, white background, cardstock-ready

## v1.7 - Premium Supplies Page + Affiliate Upsells (2026-02-12)
- NEW: Completely rebuilt /supplies page with 16 curated premium kawaii products
- NEW: Category tabs (Essentials, Premium Paper, Tools, Kawaii Extras, Gift Packaging)
- NEW: "Complete Starter Kit" bundle banner showing 3 essentials under $24
- NEW: "Holographic Rare Characters" upsell banner with premium cardstock links
- NEW: Supply callout section on every product detail page with Amazon links
- Upgraded from 7 generic supplies to 16 researched, tested products with emojis and categories
- All products link to Amazon (affiliate ready, zero inventory)
- Added kawaii-specific items: cat paw glue sticks, holographic washi tape, desk organizer
- Added gift packaging category: kraft boxes, shimmer tissue paper, pastel bows

## v1.6 - Launch-Ready: Only Real Product Images (2026-02-12)
- Removed 49 emoji-only placeholder packs from shop - only 26 packs with real DALL-E 3 product images are live
- All visible packs now have professional product photography - zero placeholders
- Updated TEMPLATE_COLLECTIONS to only show collections with real packs (6 active collections)
- Updated mega bundle, homepage, templates page, shop page to reflect actual pack counts
- Dynamic pack counts (TEMPLATE_PACKS.length) instead of hardcoded "75" everywhere
- 49 pack definitions kept in code (hidden) - ready to enable when images are generated

## v1.5.1 - Fix 49 Broken Pack Images (2026-02-12)
- FIXED: 49/75 template packs showed broken `<img>` tags instead of gradient+emoji fallback
- Added `PACKS_WITH_IMAGES` set in constants.ts - only 26 packs with real .png files get image paths
- Packs without images now correctly show collection gradient background + emoji icon
- Broken image scan: zero broken references across all pages

## v1.5 - Product Detail Pages + Family-Focused Copy + Buy Flow Fix (2026-02-12)
- NEW: Full product detail page at /shop/[id] with image gallery (10+ photos), step-by-step guide, related products, mega bundle upsell
- FIXED: Buy Now buttons now open product pages instead of raw JSON error
- All product cards across shop, templates, and landing are now clickable links to detail pages
- Rewrote ALL copy to be family-focused: "Build Memories With Your Kids", "So Easy Anyone Can Do It"
- Simplified how-it-works language to be idiot-proof (no jargon, no craft knowledge assumed)
- Landing hero: "Build Memories With Your Kids" + "No craft skills needed" + "Download & print in 2 min"
- Lifestyle gallery labels updated: "Parents and kids love making these together"
- Party kits: "The easiest birthday party activity ever. Zero prep stress."
- Templates page: "Each pack = 12 characters + box designs + guide. Less than a coffee."
- Added parent+kid family crafting images (mom-daughter, dad-son, family together)
- Template cards and product cards are now full clickable links (better UX)

## v1.4 - Real Product Images for All Packs + Full Page Upgrades (2026-02-12)
- Generated 26/75 AI product images for template packs (hit OpenAI billing limit, remaining show gradient+emoji fallback)
- All template cards (shop, templates, landing) now show real DALL-E 3 product photography when available
- Pack images show kawaii paper craft figures in professional product photography style
- Party Kits page: hero has birthday party photo background, kit cards show real lifestyle photos
- Classroom page: hero has craft desk photo background, bundle cards show real product photos
- Added scrollbar-hide CSS utility for mobile filter tabs
- Mobile responsive verified across all pages (375px, 768px, 1024px)
- Collections with real images: Chibi Animals (full 10), Magical Girls (full 7), Celestial (partial), Pastel Fantasy (partial), Forest Friends (partial)

## v1.3 - Lifestyle Photos, Logo, Buy Fix & QA (2026-02-12)
- Generated 6 HD lifestyle photos: girl surprised unboxing, birthday party, craft desk flat lay, child crafting closeup, collection display, gift wrapping
- Hero image upgraded to girl-surprised-unboxing (emotional/compelling)
- Added "Real Kids, Real Magic" lifestyle photo gallery section with masonry grid
- How It Works section now has product photos above each step card
- Party Kits card has birthday party photo background with color overlay
- Classroom Bundles card has desk photo background with color overlay
- Generated custom kawaii blind box logo (replaces brown shipping box emoji)
- Logo updated in navbar and footer
- FIXED: Buy Now buttons returning 405 (added GET handler to /api/checkout)
- FIXED: Waitlist form crashing when Supabase not configured (graceful fallback)
- FIXED: Templates page Buy buttons had no click handler
- Shop page hero updated with girl + craft desk photos
- Full QA pass on all 14 pages + 3 blog posts + 4 API endpoints

## v1.2 - Product Photos & Visual Upgrade (2026-02-12)
- Generated 10 AI product photos via DALL-E 3 (hero collection, unboxing flat lay, assembly process, 5 collection previews, party setup, template closeup)
- Landing page: split hero layout with hero product photo + floating mini images
- Landing page: 4-column product showcase section with collection preview photos
- Landing page: party/classroom cards now have subtle product photo overlays
- Landing page: featured templates use collection gradients instead of hardcoded emojis
- Shop page: hero section upgraded to split layout with unboxing + party photos
- Templates page: hero section upgraded to split layout with process photo + template closeup
- All product cards now use collection-specific gradient backgrounds with themed emojis

## v1.1 - Kawaii Pivot (2026-02-11)
- Pivoted entire brand to Sanrio-inspired kawaii Japanese art style
- Expanded from 10 to 75 template packs (900+ chibi characters)
- 10 themed collections: Chibi Animals, Sweet Bakery, Cherry Blossom, Magical Girls, Celestial, Ocean Kawaii, Forest Friends, Pastel Fantasy, Food Cuties, Seasonal Kawaii
- Added Kawaii Sleepover Kit party bundle
- Renamed classroom bundles (Sensei Bundle)
- Ultimate Kawaii Collection mega bundle ($149.99, save 60%)
- Updated all site copy to reflect kawaii aesthetic
- Pastel cardstock and holographic paper in supplies

## v1.0 - Launch Day (2026-02-11)
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
