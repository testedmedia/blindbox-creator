export const SITE_NAME = "Blind Box Generator";
export const SITE_DESCRIPTION = "Create kawaii paper blind boxes with AI-generated Japanese-style characters. Print, fold, and surprise!";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://blindbox-creator.vercel.app";
export const VERSION = "v4.0";

export const BRAND = {
  blue: "#4A90D9",
  yellow: "#FFD93D",
  pink: "#FF6B9D",
  purple: "#9B59B6",
  green: "#2ECC71",
  orange: "#FF8C42",
} as const;

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  type: "digital" | "physical" | "subscription";
  category: "template" | "party-kit" | "classroom" | "bundle" | "subscription";
  collection: string;
  image: string;
  badge?: string;
  emoji?: string;
  stripePriceId?: string;
  features?: string[];
}

// All 75 packs now have product images in public/products/packs/

// Helper to create template packs consistently
function tp(id: string, name: string, description: string, collection: string, badge?: string, emoji?: string): Product {
  return {
    id, name, description, price: 499, type: "digital", category: "template",
    collection, image: `/products/packs/${id}.png`, badge, emoji: emoji || "🎨",
    features: ["12 kawaii characters", "4 box designs", "Print-ready PDF (300 DPI)", "Assembly guide"],
  };
}

// Gradient backgrounds per collection
export const COLLECTION_GRADIENTS: Record<string, string> = {
  "chibi-animals": "from-pink-200 via-rose-100 to-orange-100",
  "sweet-bakery": "from-pink-200 via-fuchsia-100 to-purple-100",
  "cherry-blossom": "from-pink-300 via-pink-100 to-rose-50",
  "magical-girls": "from-violet-200 via-purple-100 to-fuchsia-100",
  "celestial": "from-indigo-200 via-blue-100 to-violet-100",
  "ocean-kawaii": "from-cyan-200 via-sky-100 to-blue-100",
  "forest-friends": "from-emerald-200 via-green-100 to-lime-50",
  "pastel-fantasy": "from-violet-200 via-pink-100 to-sky-100",
  "food-cuties": "from-amber-200 via-orange-100 to-yellow-50",
  "seasonal": "from-rose-200 via-pink-100 to-red-50",
  "party": "from-yellow-200 via-orange-100 to-pink-100",
  "classroom": "from-blue-200 via-indigo-100 to-violet-100",
  "bundle": "from-purple-300 via-pink-200 to-yellow-100",
};

// ═══════════════════════════════════════════════
// 75 KAWAII TEMPLATE PACKS
// Organized by collection for browsing
// ═══════════════════════════════════════════════

// Only collections with launch-ready packs (have real product images)
export const TEMPLATE_COLLECTIONS = [
  { id: "chibi-animals", name: "Chibi Animals", emoji: "🐱", count: 9 },
  { id: "magical-girls", name: "Magical Girls & Boys", emoji: "✨", count: 7 },
  { id: "forest-friends", name: "Little Forest Friends", emoji: "🍄", count: 4 },
  { id: "pastel-fantasy", name: "Pastel Fantasy", emoji: "🦄", count: 4 },
  { id: "cherry-blossom", name: "Cherry Blossom & Nature", emoji: "🌸", count: 1 },
  { id: "celestial", name: "Celestial & Stars", emoji: "🌙", count: 1 },
];

// All 75 packs defined (49 hidden until product images are generated)
const _ALL_TEMPLATE_PACKS: Product[] = [
  // ── Chibi Animals (10) ──────────────────────
  tp("chibi-kitty-club", "Chibi Kitty Club", "Adorable chibi kittens in pastel outfits. Tabby, calico, Persian, Siamese, and more with bows and ribbons.", "chibi-animals", "Best Seller", "🐱"),
  tp("chibi-puppy-parade", "Chibi Puppy Parade", "Kawaii puppies in tiny sweaters and hats. Shiba Inu, Corgi, Pomeranian, and Golden Retriever cuties.", "chibi-animals", undefined, "🐕"),
  tp("chibi-bunny-garden", "Chibi Bunny Garden", "Fluffy bunnies surrounded by flowers and strawberries. Lop-eared, Dutch, and Angora cuties in pastels.", "chibi-animals", "Popular", "🐰"),
  tp("chibi-hamster-house", "Chibi Hamster House", "Tiny hamsters with oversized sunflower seeds, running on wheels, and napping in cups. Maximum cuteness.", "chibi-animals", undefined, "🐹"),
  tp("chibi-panda-cafe", "Chibi Panda Cafe", "Red pandas and giant pandas running a tiny cafe. Aprons, coffee cups, and pastry trays included.", "chibi-animals", undefined, "🐼"),
  tp("chibi-fox-festival", "Chibi Fox Festival", "Kitsune foxes in traditional festival yukata. Lanterns, masks, and shrine decorations.", "chibi-animals", "New", "🦊"),
  tp("chibi-penguin-winter", "Chibi Penguin Winter", "Emperor and fairy penguins in scarves, earmuffs, and ice skating outfits. Snowflake accents.", "chibi-animals", undefined, "🐧"),
  tp("chibi-duck-pond", "Chibi Duck Pond", "Ducklings with flower crowns, rubber ducks, and lily pad boats. Splashing in pastel puddles.", "chibi-animals", undefined, "🦆"),
  tp("chibi-deer-meadow", "Chibi Deer Meadow", "Baby deer with cherry blossom antlers, butterfly friends, and wildflower wreaths.", "chibi-animals", undefined, "🦌"),
  tp("chibi-bear-picnic", "Chibi Bear Picnic", "Teddy bears on a kawaii picnic with sandwiches, honey pots, and checkered blankets.", "chibi-animals", undefined, "🧸"),

  // ── Sweet Bakery & Treats (8) ──────────────
  tp("strawberry-shortcake", "Strawberry Shortcake Friends", "Characters shaped like strawberry shortcakes, cream puffs, and berry tarts with rosy cheeks.", "sweet-bakery", "Popular", "🍓"),
  tp("donut-dreamland", "Donut Dreamland", "Chibi donuts with sprinkles, glaze drips, and tiny legs. Frosted in pastel pinks, blues, and lavenders.", "sweet-bakery", undefined, "🍩"),
  tp("mochi-squad", "Mochi Squad", "Japanese mochi characters in every flavor: sakura, matcha, strawberry, yuzu. Squishy and round.", "sweet-bakery", "Best Seller", "🍡"),
  tp("macaron-tower", "Macaron Tower", "Elegant French macarons as kawaii characters. Stacked towers, pastel colors, ribbon bows.", "sweet-bakery", undefined, "🧁"),
  tp("bubble-tea-club", "Bubble Tea Club", "Boba tea cups with faces, tapioca pearl friends, and colorful straw accessories.", "sweet-bakery", "New", "🧋"),
  tp("candy-kingdom", "Candy Kingdom", "Lollipop princesses, gummy bear guards, and cotton candy clouds in a sugary kawaii world.", "sweet-bakery", undefined, "🍭"),
  tp("ice-cream-parlor", "Ice Cream Parlor", "Soft serve swirls, popsicle pals, and sundae royalty with cherry crowns and waffle cone castles.", "sweet-bakery", undefined, "🍦"),
  tp("cake-pop-party", "Cake Pop Party", "Cake pops on sticks wearing tiny party hats. Sprinkle confetti and frosting swirls everywhere.", "sweet-bakery", undefined, "🎂"),

  // ── Cherry Blossom & Nature (8) ─────────────
  tp("sakura-spirits", "Sakura Spirits", "Cherry blossom tree spirits (kodama) with petal hair and pink-tinted skin. Traditional Japanese aesthetic.", "cherry-blossom", "Best Seller", "🌸"),
  tp("hanami-picnic", "Hanami Picnic", "Characters enjoying cherry blossom viewing. Bento boxes, dango sticks, and tea ceremony items.", "cherry-blossom", undefined, "🍱"),
  tp("garden-fairies", "Garden Fairies", "Tiny flower fairies riding on butterflies and ladybugs. Petal dresses and dewdrop accessories.", "cherry-blossom", "Popular", "🧚"),
  tp("mushroom-village", "Mushroom Village", "Kawaii mushroom people living in toadstool houses. Red caps, spotted patterns, and forest floor details.", "cherry-blossom", undefined, "🍄"),
  tp("rainy-day-friends", "Rainy Day Friends", "Characters with oversized umbrellas, rain boots, and frog raincoats. Puddle jumping and rainbow chasing.", "cherry-blossom", undefined, "☔"),
  tp("sunflower-sunshine", "Sunflower Sunshine", "Sunflower-headed characters and busy bee friends in a golden summer garden.", "cherry-blossom", undefined, "🌻"),
  tp("autumn-leaves", "Autumn Leaves Collection", "Momiji (maple leaf) spirits, acorn characters, and harvest festival cuties in warm fall colors.", "cherry-blossom", "New", "🍁"),
  tp("zen-garden", "Zen Garden", "Miniature zen garden characters: stone lanterns, koi fish, bamboo, and raked sand patterns.", "cherry-blossom", undefined, "🎋"),

  // ── Magical Girls & Boys (7) ────────────────
  tp("mahou-shoujo", "Mahou Shoujo Stars", "Magical girl warriors with transformation wands, sparkle effects, and flowing ribbon costumes.", "magical-girls", "Popular", "💫"),
  tp("witch-academy", "Witch Academy", "Cute witch students with spell books, crystal balls, and black cat familiars in pastel robes.", "magical-girls", undefined, "🧙‍♀️"),
  tp("fairy-tale-princesses", "Fairy Tale Princesses", "Kawaii chibi versions of classic princesses. Big eyes, flowing gowns, and sparkle crowns.", "magical-girls", "Best Seller", "👸"),
  tp("ninja-cuties", "Ninja Cuties", "Chibi ninjas with oversized shuriken, cute masks, and stealth outfits in pastel camouflage.", "magical-girls", undefined, "🥷"),
  tp("samurai-sweethearts", "Samurai Sweethearts", "Tiny samurai with adorable armor, cherry blossom crests, and miniature katana.", "magical-girls", undefined, "⚔️"),
  tp("idol-stage", "Idol Stage", "J-pop and K-pop inspired idol characters with microphones, stage outfits, and glow sticks.", "magical-girls", "New", "🎤"),
  tp("wizard-workshop", "Wizard Workshop", "Chibi wizards brewing potions, reading spell books, and riding tiny broomsticks.", "magical-girls", undefined, "🪄"),

  // ── Celestial & Stars (7) ───────────────────
  tp("moon-rabbit", "Moon Rabbit", "Tsuki no Usagi (moon rabbits) pounding mochi on the moon. Crescent moon cradles and star dust.", "celestial", "Best Seller", "🌙"),
  tp("star-guardians", "Star Guardians", "Chibi zodiac constellation characters with glowing star accessories and cosmic capes.", "celestial", undefined, "⭐"),
  tp("galaxy-dreamers", "Galaxy Dreamers", "Characters floating through pastel nebulas, riding shooting stars, and collecting stardust.", "celestial", "Popular", "🌌"),
  tp("sun-and-moon", "Sun & Moon Twins", "Matching sun and moon character pairs. Day and night outfits, celestial jewelry.", "celestial", undefined, "☀️"),
  tp("cloud-kingdom", "Cloud Kingdom", "Fluffy cloud characters with rainbow slides, rain sprinkles, and thunder drum instruments.", "celestial", undefined, "☁️"),
  tp("aurora-dancers", "Aurora Dancers", "Northern lights spirits dancing across the sky in shimmering pastel gowns.", "celestial", "New", "🌈"),
  tp("comet-riders", "Comet Riders", "Tiny astronaut characters riding comets, planting flags on candy planets.", "celestial", undefined, "☄️"),

  // ── Ocean Kawaii (7) ────────────────────────
  tp("jellyfish-ballet", "Jellyfish Ballet", "Translucent jellyfish characters in tutus performing underwater ballet. Bioluminescent glow effects.", "ocean-kawaii", "Popular", "🪼"),
  tp("mermaid-cove", "Mermaid Cove", "Chibi mermaids with seashell accessories, pearl necklaces, and coral crown hairstyles.", "ocean-kawaii", "Best Seller", "🧜‍♀️"),
  tp("whale-lullaby", "Whale Lullaby", "Baby whales and dolphins wearing nightcaps, surrounded by music notes and bubbles.", "ocean-kawaii", undefined, "🐋"),
  tp("seahorse-carousel", "Seahorse Carousel", "Seahorses on an underwater merry-go-round with shell decorations and seaweed streamers.", "ocean-kawaii", undefined, "🐚"),
  tp("otter-splash", "Otter Splash", "Sea otters holding hands, floating on backs with shell collections and starfish friends.", "ocean-kawaii", "New", "🦦"),
  tp("coral-reef-city", "Coral Reef City", "Tiny fish characters living in a coral reef apartment complex. Anemone gardens and sea fan curtains.", "ocean-kawaii", undefined, "🐠"),
  tp("turtle-island", "Turtle Island", "Baby sea turtles with island ecosystems on their shells. Palm trees, tiny volcanos, and beaches.", "ocean-kawaii", undefined, "🐢"),

  // ── Little Forest Friends (7) ───────────────
  tp("tanuki-town", "Tanuki Town", "Japanese raccoon dogs (tanuki) shapeshifting into tea kettles, leaves, and statues. Traditional folklore.", "forest-friends", "Best Seller", "🦝"),
  tp("owl-library", "Owl Library", "Scholarly owls with tiny glasses, stacked books, and quill pens in a tree trunk library.", "forest-friends", undefined, "🦉"),
  tp("squirrel-bakery", "Squirrel Bakery", "Squirrels running a woodland bakery. Acorn cookies, pinecone bread, and berry jam.", "forest-friends", "Popular", "🐿️"),
  tp("hedgehog-garden", "Hedgehog Garden", "Tiny hedgehogs carrying apples and mushrooms on their spines through an enchanted garden.", "forest-friends", undefined, "🦔"),
  tp("firefly-festival", "Firefly Festival", "Glowing firefly characters lighting up a summer night festival. Paper lanterns and sparklers.", "forest-friends", "New", "✨"),
  tp("raccoon-camp", "Raccoon Camp", "Raccoons on a camping trip with tiny tents, campfires, marshmallow sticks, and sleeping bags.", "forest-friends", undefined, "🏕️"),
  tp("frog-choir", "Frog Choir", "Singing frogs on lily pads with sheet music, conductor batons, and rain percussion instruments.", "forest-friends", undefined, "🐸"),

  // ── Pastel Fantasy (7) ──────────────────────
  tp("unicorn-dreams", "Unicorn Dreams", "Pastel unicorns with rainbow manes, star-tipped horns, and cloud platforms.", "pastel-fantasy", "Best Seller", "🦄"),
  tp("dragon-nursery", "Dragon Nursery", "Baby dragons hatching from decorated eggs. Tiny wings, sparkle breath, and treasure hoards.", "pastel-fantasy", "Popular", "🐉"),
  tp("pegasus-sky", "Pegasus Sky Riders", "Winged horses soaring through cotton candy clouds with ribbon trails and star dust.", "pastel-fantasy", undefined, "🪽"),
  tp("crystal-fairies", "Crystal Fairies", "Gemstone fairy characters: amethyst, rose quartz, opal, and moonstone with prismatic wings.", "pastel-fantasy", "New", "💎"),
  tp("phoenix-garden", "Phoenix Garden", "Chibi phoenix birds in a garden of eternal flowers. Flame feathers in soft pastels.", "pastel-fantasy", undefined, "🔥"),
  tp("spirit-lanterns", "Spirit Lanterns", "Glowing spirit characters (yokai-inspired) carrying paper lanterns through a mystical forest.", "pastel-fantasy", undefined, "🏮"),
  tp("dream-catchers", "Dream Catchers", "Characters woven into dream catcher designs with feathers, beads, and starlight threads.", "pastel-fantasy", undefined, "🪶"),

  // ── Food Cuties (7) ─────────────────────────
  tp("onigiri-friends", "Onigiri Friends", "Rice ball characters with nori wraps, umeboshi cheeks, and various filling personalities.", "food-cuties", "Best Seller", "🍙"),
  tp("sushi-squad", "Sushi Squad", "Chibi sushi pieces: nigiri, maki rolls, and sashimi with tiny soy sauce and wasabi sidekicks.", "food-cuties", "Popular", "🍣"),
  tp("ramen-bowl", "Ramen Bowl Gang", "Noodle characters swimming in broth with narutomaki spirals, soft egg friends, and chashu pals.", "food-cuties", undefined, "🍜"),
  tp("bento-box", "Bento Box Collection", "Characters arranged in a kawaii bento box. Octopus wieners, bunny apples, and star carrots.", "food-cuties", "New", "🍱"),
  tp("taiyaki-town", "Taiyaki Town", "Fish-shaped pastry characters filled with different flavors: red bean, custard, chocolate, matcha.", "food-cuties", undefined, "🐟"),
  tp("dango-trio", "Dango Trio", "Three-colored dango on sticks going on adventures. Pink, white, and green best friends.", "food-cuties", undefined, "🍡"),
  tp("wagashi-garden", "Wagashi Garden", "Traditional Japanese sweets as garden characters. Yokan, daifuku, and sakura mochi in bloom.", "food-cuties", undefined, "🍵"),

  // ── Seasonal Kawaii (7) ─────────────────────
  tp("sakura-spring", "Sakura Spring", "Spring festival characters with cherry blossom confetti, hanami mats, and picnic sweets.", "seasonal", "Popular", "🌸"),
  tp("summer-matsuri", "Summer Matsuri", "Japanese summer festival: yukatas, goldfish scooping, kakigori (shaved ice), and sparklers.", "seasonal", "Best Seller", "🎆"),
  tp("autumn-tsukimi", "Autumn Moon Viewing", "Moon viewing party characters with dango offerings, pampas grass, and harvest moon backdrop.", "seasonal", undefined, "🎑"),
  tp("winter-onsen", "Winter Onsen", "Characters relaxing in hot springs with towel headwraps, snow monkeys, and steaming yuzu baths.", "seasonal", "New", "♨️"),
  tp("valentines-kawaii", "Valentine's Kawaii", "Heart-shaped characters exchanging honmei-choco and giri-choco with love letter envelopes.", "seasonal", undefined, "💝"),
  tp("tanabata-wishes", "Tanabata Star Festival", "Star festival characters writing wishes on tanzaku strips. Orihime and Hikoboshi crossing the Milky Way.", "seasonal", undefined, "🎋"),
  tp("new-year-osechi", "New Year Osechi", "Oshogatsu (New Year) characters: kagami mochi, daruma dolls, maneki-neko, and kadomatsu.", "seasonal", undefined, "🎍"),
];

// All 75 packs have product images
export const TEMPLATE_PACKS = _ALL_TEMPLATE_PACKS;

export const PARTY_KITS: Product[] = [
  {
    id: "kawaii-birthday-kit",
    name: "Kawaii Birthday Party Kit",
    description: "Everything for a kawaii-themed birthday party! 3 template packs, pastel party invitations, thank you cards with chibi characters, and assembly guide for 12 kids.",
    price: 1499,
    type: "digital",
    category: "party-kit",
    collection: "party",
    image: "/kits/birthday.svg",
    badge: "Best Value",
    features: ["3 kawaii template packs (36 characters)", "Pastel party invitations", "Chibi thank you cards", "Assembly guide for 12 kids", "Party planning checklist", "Decoration templates"],
  },
  {
    id: "kawaii-craft-night",
    name: "Kawaii Craft Night Kit",
    description: "Perfect for family craft nights or playdates. 2 kawaii template packs with step-by-step folding tutorials.",
    price: 999,
    type: "digital",
    category: "party-kit",
    collection: "party",
    image: "/kits/craft-night.svg",
    features: ["2 kawaii template packs (24 characters)", "Step-by-step video links", "Supply checklist", "Display stand templates"],
  },
  {
    id: "kawaii-sleepover-kit",
    name: "Kawaii Sleepover Kit",
    description: "Sleepover craft activity featuring dreamy celestial and pastel fantasy templates. Includes trading card game rules!",
    price: 1299,
    type: "digital",
    category: "party-kit",
    collection: "party",
    image: "/kits/sleepover.svg",
    badge: "New",
    features: ["2 dreamy template packs", "Trading card game rules", "Character creation sheets", "Rarity chart poster", "Glow sticker templates"],
  },
];

export const CLASSROOM_BUNDLES: Product[] = [
  {
    id: "classroom-30",
    name: "Sensei Bundle (30 Students)",
    description: "30 sets of kawaii templates, Japanese culture lesson plan, STEAM activity sheets, and origami-inspired assessment rubric.",
    price: 2999,
    type: "digital",
    category: "classroom",
    collection: "classroom",
    image: "/kits/classroom.svg",
    badge: "Teachers Love It",
    features: ["30 student sets", "5 kawaii theme packs", "Japanese culture lesson plan", "STEAM activity sheets", "Assessment rubric", "Certificate templates"],
  },
  {
    id: "classroom-starter",
    name: "Classroom Starter (10 Students)",
    description: "Try kawaii blind boxes with a small group! 10 sets with teacher guide and 2 curated theme packs.",
    price: 1499,
    type: "digital",
    category: "classroom",
    collection: "classroom",
    image: "/kits/classroom-small.svg",
    features: ["10 student sets", "2 kawaii theme packs", "Teacher guide", "Activity worksheet"],
  },
];

export const MEGA_BUNDLE: Product = {
  id: "mega-bundle",
  name: "Ultimate Kawaii Collection",
  description: "Get ALL kawaii template packs! Hundreds of unique chibi characters across every collection. The complete Blind Box Generator library.",
  price: 14999,
  type: "digital",
  category: "bundle",
  collection: "bundle",
  image: "/bundles/mega.svg",
  badge: "Save 60%",
  features: ["All template packs included", "300+ unique kawaii characters", "100+ box designs", "All assembly guides", "Free future updates", "Commercial usage rights"],
};

export const SUBSCRIPTION_TIERS = [
  {
    id: "free",
    name: "Free Explorer",
    price: 0,
    period: "forever",
    description: "Try the AI generator with limited access",
    features: [
      "3 AI generations per month",
      "Watermarked downloads",
      "2 basic kawaii themes",
      "Community gallery access",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    id: "founding_creator",
    name: "Founding Creator",
    price: 4999,
    originalPrice: 9999,
    period: "year",
    description: "Lock in 50% off forever as a founding member",
    features: [
      "Unlimited AI generations",
      "No watermarks",
      "All kawaii themes unlocked",
      "Custom chibi character creation",
      "High-res downloads (300 DPI)",
      "Priority support",
      "Early access to new collections",
    ],
    cta: "Become a Founder",
    popular: true,
    badge: "50% Off - Limited",
  },
  {
    id: "founding_pro",
    name: "Founding Pro",
    price: 7999,
    originalPrice: 14999,
    period: "year",
    description: "For teachers, party planners, and power creators",
    features: [
      "Everything in Creator",
      "Commercial usage rights",
      "Bulk generation (up to 100/batch)",
      "Custom branding on templates",
      "Team sharing (up to 5 users)",
      "API access",
      "White-label options",
      "Dedicated support",
    ],
    cta: "Go Pro",
    popular: false,
    badge: "47% Off - Limited",
  },
];

export type SupplyCategory = "essential" | "premium" | "tools" | "kawaii" | "packaging";

export const SUPPLY_CATEGORIES = [
  { id: "all" as const, label: "All Supplies" },
  { id: "essential" as SupplyCategory, label: "Essentials" },
  { id: "premium" as SupplyCategory, label: "Premium Paper" },
  { id: "tools" as SupplyCategory, label: "Tools" },
  { id: "kawaii" as SupplyCategory, label: "Kawaii Extras" },
  { id: "packaging" as SupplyCategory, label: "Gift Packaging" },
];

export const SUPPLY_LINKS = [
  // ── Essentials ─────────────────────────────
  {
    name: "80lb White Cardstock (250 Sheets)",
    description: "The perfect weight for blind boxes: sturdy enough to hold shape, easy enough to fold. Crisp whites for vibrant printing.",
    url: "https://www.amazon.com/dp/B08XQ7T7RR",
    price: "$12.99",
    tag: "Essential",
    category: "essential" as SupplyCategory,
    emoji: "📄",
    starter: true,
  },
  {
    name: "Glue Stick Set (12 Pack)",
    description: "Acid-free, quick-drying, and won't wrinkle your prints. The only adhesive you need for perfect blind boxes.",
    url: "https://www.amazon.com/dp/B00006IBKJ",
    price: "$5.99",
    tag: "Essential",
    category: "essential" as SupplyCategory,
    emoji: "🧴",
    starter: true,
  },
  {
    name: "Fiskars Kid-Safe Scissors",
    description: "Trusted brand with blunt tips and easy-grip handles. Safe for ages 4+ and cuts cardstock like butter.",
    url: "https://www.amazon.com/dp/B0027J1HY0",
    price: "$4.99",
    tag: "Essential",
    category: "essential" as SupplyCategory,
    emoji: "✂️",
    starter: true,
  },

  // ── Premium Paper ──────────────────────────
  {
    name: "Pastel Cardstock Variety (60 Sheets)",
    description: "Professional-grade 80lb cardstock in 15 soft pastel colors. Baby pink, lavender, mint, sky blue, and more.",
    url: "https://www.amazon.com/dp/B07SYD7K4M",
    price: "$25.99",
    tag: "Popular",
    category: "premium" as SupplyCategory,
    emoji: "🎨",
  },
  {
    name: "Holographic Cardstock (100 Sheets)",
    description: "Stars, gems, and laser patterns that shimmer in the light. Makes ultra-rare characters absolutely magical.",
    url: "https://www.amazon.com/dp/B0C2CJJ15W",
    price: "$17.99",
    tag: "Best Seller",
    category: "premium" as SupplyCategory,
    emoji: "✨",
  },
  {
    name: "Metallic Cardstock (200 Sheets, 20 Colors)",
    description: "Mirror-finish metallic paper in gold, silver, rose gold, and 17 more colors. Premium thickness for special editions.",
    url: "https://www.amazon.com/dp/B0CSBB8LBG",
    price: "$22.99",
    tag: "Premium",
    category: "premium" as SupplyCategory,
    emoji: "🪙",
  },

  // ── Tools ──────────────────────────────────
  {
    name: "Decorative Edge Scissors (18 Patterns)",
    description: "Zig-zag, scallop, wave, and 15 more edge patterns. Turn ordinary box edges into works of art.",
    url: "https://www.amazon.com/dp/B089N2YTFN",
    price: "$18.99",
    tag: "Popular",
    category: "tools" as SupplyCategory,
    emoji: "🌊",
  },
  {
    name: "Double-Sided Tape Runners (6 Pack)",
    description: "Cleaner than glue, zero mess, instant bond. Perfect for younger kids who struggle with glue sticks.",
    url: "https://www.amazon.com/dp/B09GVJ47N8",
    price: "$13.99",
    tag: "Pro Tip",
    category: "tools" as SupplyCategory,
    emoji: "📏",
  },
  {
    name: "Bone Folder Scoring Tool Set",
    description: "Teflon non-stick tools for razor-sharp fold lines. The secret to professional-looking blind boxes.",
    url: "https://www.amazon.com/dp/B07TKCK8X8",
    price: "$14.99",
    tag: "Pro",
    category: "tools" as SupplyCategory,
    emoji: "🦴",
  },

  // ── Kawaii Extras ──────────────────────────
  {
    name: "Kawaii Sticker Sheets (100 Sheets, 600+)",
    description: "Transparent PET stickers with animals, flowers, food, and stars. Decorate your boxes, seal them, trade them.",
    url: "https://www.amazon.com/dp/B0CPXV5P9F",
    price: "$11.99",
    tag: "Best Seller",
    category: "kawaii" as SupplyCategory,
    emoji: "🌟",
  },
  {
    name: "Holographic Washi Tape (20 Rolls)",
    description: "Rainbow holographic patterns that catch the light. Use as decorative borders, seals, and box accents.",
    url: "https://www.amazon.com/dp/B087CFJNLM",
    price: "$15.99",
    tag: "Popular",
    category: "kawaii" as SupplyCategory,
    emoji: "🌈",
  },
  {
    name: "Cat Paw Kawaii Glue Sticks (5 Pack)",
    description: "Adorable cat-paw shaped glue sticks in random pastel colors. Kids fight over who gets to use these.",
    url: "https://www.amazon.com/dp/B0C1JN4M8R",
    price: "$8.99",
    tag: "Cute",
    category: "kawaii" as SupplyCategory,
    emoji: "🐱",
  },
  {
    name: "Kawaii Desk Organizer (2 Drawers)",
    description: "Keep all your blind box supplies organized in this adorable storage box. 5 compartments + 2 drawers + DIY stickers.",
    url: "https://www.amazon.com/dp/B0CRLB6F94",
    price: "$18.99",
    tag: "New",
    category: "kawaii" as SupplyCategory,
    emoji: "🗃️",
  },

  // ── Gift Packaging ─────────────────────────
  {
    name: "Mini Kraft Gift Boxes (30 Pack)",
    description: "Real mini boxes (3x3x1\") for the ultimate blind box experience. Fill with characters, close, shake, and open!",
    url: "https://www.amazon.com/dp/B0733HN27V",
    price: "$11.99",
    tag: "Must-Have",
    category: "packaging" as SupplyCategory,
    emoji: "📦",
  },
  {
    name: "Shimmer Pastel Tissue Paper (70 Sheets)",
    description: "Pearlescent metallic shimmer in 7 pastel colors. Wrap characters in tissue before boxing for real blind box magic.",
    url: "https://www.amazon.com/dp/B0D12PHW5P",
    price: "$13.99",
    tag: "Premium",
    category: "packaging" as SupplyCategory,
    emoji: "🎀",
  },
  {
    name: "Pastel Pull Bows (30 Pack)",
    description: "One-pull instant bows in pink, blue, yellow, mint, and lavender. Tie on boxes for a gift-ready finish in 2 seconds.",
    url: "https://www.amazon.com/dp/B07GHS6H7M",
    price: "$14.99",
    tag: "Gift Ready",
    category: "packaging" as SupplyCategory,
    emoji: "🎁",
  },
];

export const NAV_LINKS = [
  { href: "/create", label: "Create" },
  { href: "/shop", label: "Shop" },
  { href: "/templates", label: "Templates" },
  { href: "/pricing", label: "Pricing" },
  { href: "/affiliate", label: "💰 Earn 50%", highlight: true },
  { href: "/supplies", label: "Supplies" },
];

export const FOOTER_LINKS = {
  shop: [
    { href: "/shop", label: "All Products" },
    { href: "/templates", label: "Template Packs" },
    { href: "/party-kits", label: "Party Kits" },
    { href: "/classroom", label: "Classroom Bundles" },
    { href: "/supplies", label: "Paper & Supplies" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/features", label: "AI Generator" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
    { href: "/press", label: "Press Kit" },
    { href: "/changelog", label: "Changelog" },
  ],
  legal: [
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
  ],
};

export const formatPrice = (cents: number) => {
  return `$${(cents / 100).toFixed(2)}`;
};
