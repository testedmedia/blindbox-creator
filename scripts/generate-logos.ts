#!/usr/bin/env npx tsx
/**
 * Generate branded collection logos for all 10 collections
 * Each logo: cute stylized typography + themed decorative elements
 */
import fs from "fs";
import path from "path";

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "products", "logos");
const API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = "google/gemini-3-pro-image-preview";

const COLLECTIONS = [
  {
    id: "chibi-animals",
    name: "Chibi Animals",
    prompt: "cute kawaii logo design for a blind box toy collection called 'Chibi Animals', bubbly rounded pink and coral pastel letters, tiny paw prints and heart decorations around the text, adorable small chibi cat and bunny peeking from behind letters, soft pastel gradient background pink to coral, clean professional toy brand logo style",
  },
  {
    id: "pastel-fantasy",
    name: "Pastel Fantasy",
    prompt: "cute kawaii logo design for a blind box toy collection called 'Pastel Fantasy', dreamy lavender and mint colored bubbly letters with sparkle effects, tiny stars moons and clouds decorating around text, small chibi unicorn and fairy peeking from letters, soft pastel gradient background lavender to mint, magical whimsical toy brand logo style",
  },
  {
    id: "magical-girls",
    name: "Magical Girls",
    prompt: "cute kawaii logo design for a blind box toy collection called 'Magical Girls', hot pink and purple sparkly bubbly letters with glitter effects, tiny wands ribbons bows and stars around text, small chibi magical girl character with wand, soft gradient background hot pink to purple, sparkly anime-inspired toy brand logo style",
  },
  {
    id: "forest-friends",
    name: "Forest Friends",
    prompt: "cute kawaii logo design for a blind box toy collection called 'Forest Friends', warm sage green and amber bubbly letters with natural wood texture accents, tiny leaves mushrooms acorns decorating around text, small chibi fox and deer peeking from behind letters, soft gradient background sage to amber, cozy woodland toy brand logo style",
  },
  {
    id: "celestial",
    name: "Celestial",
    prompt: "cute kawaii logo design for a blind box toy collection called 'Celestial', navy blue and purple bubbly letters with gold star accents and constellation patterns, tiny gold stars and crescent moons around text, small chibi moon bunny character, soft gradient background navy to deep purple with gold sparkles, mystical cosmic toy brand logo style",
  },
  {
    id: "cherry-blossom",
    name: "Cherry Blossom",
    prompt: "cute kawaii logo design for a blind box toy collection called 'Cherry Blossom', soft blush pink and white bubbly letters with sakura petal accents, tiny cherry blossom flowers and falling petals around text, small chibi sakura fairy character, soft gradient background blush to white, elegant Japanese spring toy brand logo style",
  },
  {
    id: "sweet-bakery",
    name: "Sweet Bakery",
    prompt: "cute kawaii logo design for a blind box toy collection called 'Sweet Bakery', cream and pastel pink bubbly letters that look like frosting with sprinkle decorations, tiny cupcakes donuts and cookies around text, small chibi cupcake character with face, soft gradient background cream to pink, delicious bakery toy brand logo style",
  },
  {
    id: "ocean-kawaii",
    name: "Ocean Kawaii",
    prompt: "cute kawaii logo design for a blind box toy collection called 'Ocean Kawaii', aqua blue and deep blue bubbly letters with wave pattern accents, tiny bubbles shells and coral decorating around text, small chibi jellyfish and octopus peeking from letters, soft gradient background aqua to deep blue, underwater ocean toy brand logo style",
  },
  {
    id: "food-cuties",
    name: "Food Cuties",
    prompt: "cute kawaii logo design for a blind box toy collection called 'Food Cuties', warm orange and red bubbly letters with playful food-themed accents, tiny utensils steam and plates around text, small chibi sushi and ramen characters with cute faces, soft gradient background orange to red, fun food-themed toy brand logo style",
  },
  {
    id: "seasonal",
    name: "Seasonal",
    prompt: "cute kawaii logo design for a blind box toy collection called 'Seasonal', multicolor bubbly letters transitioning through spring green summer yellow autumn orange winter blue, tiny snowflakes flowers leaves and suns around text, small chibi characters representing four seasons, soft rainbow pastel gradient background, festive all-seasons toy brand logo style",
  },
];

const SUFFIX = ", pure white background, centered composition, high resolution, no extra text beyond the collection name, professional brand quality, clean vector-like illustration style, absolutely no watermarks no UI elements";

async function generateLogo(collection: (typeof COLLECTIONS)[0]): Promise<boolean> {
  const outPath = path.join(OUT_DIR, `${collection.id}-logo.png`);
  console.log(`🎨 ${collection.name}...`);
  const start = Date.now();

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://blindbox-creator.vercel.app",
      "X-Title": "BlindBox Creator Logos",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "user", content: `Generate an image: ${collection.prompt}${SUFFIX}` }],
    }),
  });

  if (!res.ok) {
    console.log(`   ❌ API error ${res.status}: ${(await res.text()).slice(0, 200)}`);
    return false;
  }

  const data = await res.json();
  const msg = data?.choices?.[0]?.message;
  let imageData: string | null = null;

  if (msg?.images && Array.isArray(msg.images) && msg.images.length > 0) {
    const imgObj = msg.images[0];
    if (imgObj?.image_url?.url) imageData = imgObj.image_url.url;
  }
  if (!imageData && typeof msg?.content === "string" && msg.content.startsWith("data:image")) {
    imageData = msg.content;
  }

  if (!imageData) {
    console.log(`   ❌ No image. Keys: ${Object.keys(msg || {}).join(", ")}`);
    return false;
  }

  const base64Part = imageData.includes(",") ? imageData.split(",")[1] : imageData;
  const imgBuffer = Buffer.from(base64Part, "base64");
  fs.writeFileSync(outPath, imgBuffer);

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`   ✅ ${collection.id}-logo.png (${(imgBuffer.length / 1024).toFixed(0)}KB, ${elapsed}s)`);
  return true;
}

async function main() {
  if (!API_KEY) {
    console.error("❌ OPENROUTER_API_KEY not set");
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  console.log("🏷️  Generating branded collection logos (Gemini 3 Pro)");
  console.log(`   10 collections, ~$0.70 total\n`);

  let success = 0;
  for (const collection of COLLECTIONS) {
    const ok = await generateLogo(collection);
    if (ok) success++;
    await new Promise((r) => setTimeout(r, 1500));
  }

  console.log(`\n✅ Done: ${success}/10 collection logos generated`);
  console.log(`📁 Output: ${OUT_DIR}/`);
}

main().catch(console.error);
