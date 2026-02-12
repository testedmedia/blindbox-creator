# Changelog

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
