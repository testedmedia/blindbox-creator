#!/usr/bin/env npx tsx
/**
 * Generate product page images for a pack using AI composition
 * Creates: character group shot, assembled boxes, hero/product shot
 * Style matches existing images (donut-dreamland, chibi-kitty-club, etc.)
 */
import fs from "fs";
import path from "path";

const ROOT = path.resolve(__dirname, "..");
const API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = "google/gemini-3-pro-image-preview";

const SUFFIX = ", high quality professional product illustration, clean white background, centered composition, no watermarks no UI elements";

interface ProductImage {
  file: string;
  dir: string;
  prompt: string;
}

function getPackImages(packId: string, packName: string, collection: string): ProductImage[] {
  // Derive theme descriptors from collection
  const collectionThemes: Record<string, string> = {
    "chibi-animals": "cute pastel pink and coral tones, paw prints and hearts",
    "pastel-fantasy": "dreamy lavender and mint tones, stars and clouds",
    "magical-girls": "sparkly pink and purple tones, wands and ribbons",
    "forest-friends": "warm sage green and amber tones, leaves and mushrooms",
    "celestial": "deep navy and gold tones, stars and moons",
    "cherry-blossom": "soft blush pink tones, sakura petals",
    "sweet-bakery": "cream and pastel pink tones, sprinkles and frosting",
    "ocean-kawaii": "aqua and deep blue tones, bubbles and waves",
    "food-cuties": "warm orange and red tones, steam and utensils",
    "seasonal": "multicolor seasonal tones, snowflakes flowers leaves suns",
  };
  const themeDesc = collectionThemes[collection] || "cute pastel tones";

  return [
    {
      file: `${packId}-characters.png`,
      dir: "previews",
      prompt: `Cute kawaii illustration showing a group of 12 adorable chibi characters from a blind box collection called "${packName}". All 12 characters grouped together in a fun arrangement, some sitting some standing some peeking from behind others. Each character is a unique kawaii chibi design with big sparkly eyes, tiny bodies, and bold clean outlines. The collection logo "${packName}" in cute bubbly stylized letters at the top. Text below says "12 Characters Included". White background, ${themeDesc}, Japanese blind box toy art style, sticker sheet aesthetic, all characters visible and distinct${SUFFIX}`,
    },
    {
      file: `${packId}-assembled.png`,
      dir: "previews",
      prompt: `Professional product photography of 4 cute small pastel colored handmade blind boxes from the "${packName}" kawaii collection. Each box is a different pastel color (pink, blue, yellow, green). Boxes are 3 inch cubes with cute kawaii character art printed on the sides. One box is open showing a character card peeking out. Boxes arranged in a pleasing group on clean white surface. ${themeDesc}. Soft natural lighting, shallow depth of field, warm inviting colors${SUFFIX}`,
    },
    {
      file: `${packId}.png`,
      dir: "packs",
      prompt: `Professional product photography of a cute kawaii blind box toy from the "${packName}" collection. A cylindrical blind box container with the "${packName}" logo and cute chibi characters printed all around it in ${themeDesc}. Next to it stands one kawaii chibi vinyl toy figure character from the collection, approximately 3 inches tall, standing on a small colored base. Clean white background, soft studio lighting, shallow depth of field, professional product shot, warm and inviting, Japanese gacha toy aesthetic${SUFFIX}`,
    },
  ];
}

async function generateImage(img: ProductImage): Promise<boolean> {
  const outDir = path.join(ROOT, "public", "products", img.dir);
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, img.file);

  console.log(`🎨 ${img.file}...`);
  const start = Date.now();

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://blindbox-creator.vercel.app",
      "X-Title": "BlindBox Creator Product Images",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "user", content: `Generate an image: ${img.prompt}` }],
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
  console.log(`   ✅ ${img.file} (${(imgBuffer.length / 1024).toFixed(0)}KB, ${elapsed}s)`);
  return true;
}

async function main() {
  if (!API_KEY) {
    console.error("❌ OPENROUTER_API_KEY not set");
    process.exit(1);
  }

  // Parse args
  const args = process.argv.slice(2);
  let packId = "";
  let packName = "";
  let collection = "";

  for (const arg of args) {
    if (arg.startsWith("--pack=")) packId = arg.split("=")[1];
    if (arg.startsWith("--name=")) packName = arg.split("=")[1];
    if (arg.startsWith("--collection=")) collection = arg.split("=")[1];
  }

  // Try to read from characters.json if pack specified
  if (packId && (!packName || !collection)) {
    const jsonPath = path.join(ROOT, "packs", packId, "characters.json");
    if (fs.existsSync(jsonPath)) {
      const data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
      packName = packName || data.packName;
      collection = collection || data.collection;
    }
  }

  if (!packId || !packName) {
    console.error("❌ Usage: npx tsx scripts/generate-product-images.ts --pack=<id> [--name=<name>] [--collection=<col>]");
    process.exit(1);
  }

  const images = getPackImages(packId, packName, collection);
  console.log(`📸 Generating ${images.length} product images for "${packName}"`);
  console.log(`   Pack: ${packId} | Collection: ${collection}\n`);

  let success = 0;
  for (const img of images) {
    const ok = await generateImage(img);
    if (ok) success++;
    await new Promise((r) => setTimeout(r, 1500));
  }

  console.log(`\n✅ Done: ${success}/${images.length} product images generated`);
}

main().catch(console.error);
