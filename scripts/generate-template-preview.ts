#!/usr/bin/env npx tsx
/**
 * generate-template-preview.ts
 *
 * Generates AI box-net template preview images for product pages.
 * Uses Gemini 3 Pro Image to create cohesive, beautiful box net graphics
 * with pack-specific characters, logos, glue tabs with arrows, fold lines.
 *
 * This is the MARKETING PREVIEW image (shown on product page).
 * The actual printable PDF is rendered separately via generate-pack.ts.
 *
 * Usage:
 *   npx tsx scripts/generate-template-preview.ts --pack=chibi-kitty-club
 *   npx tsx scripts/generate-template-preview.ts --all
 *   npx tsx scripts/generate-template-preview.ts --only=chibi-kitty-club,donut-dreamland
 *
 * Output: public/products/previews/{packId}-template.png
 *
 * SOP: memory/template-preview-sop.md
 */
import fs from "fs";
import path from "path";

const ROOT = path.resolve(__dirname, "..");
const API_KEY = process.env.OPENROUTER_API_KEY;
// Gemini 3 Pro is ideal but expensive. Fall back to Flash if credits low.
const MODEL = process.env.TEMPLATE_MODEL || "google/gemini-2.5-flash-image";
const OUT_DIR = path.join(ROOT, "public", "products", "previews");

interface PackInfo {
  packId: string;
  packName: string;
  collection: string;
  characterDescriptions: string[];
}

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

function buildTemplatePrompt(pack: PackInfo): string {
  const theme = collectionThemes[pack.collection] || "cute pastel tones";

  // Pick 4 character descriptions for the 4 side faces
  const chars = pack.characterDescriptions.slice(0, 4);
  const charDesc = chars.length > 0
    ? `The 4 side faces each show a different adorable kawaii chibi character: ${chars.join(", ")}.`
    : `The 4 side faces each show a different adorable kawaii chibi character in ${theme} style.`;

  return `A printable paper craft box net template for "${pack.packName}" kawaii blind box. White background.

The image shows a CROSS-SHAPED (plus sign +) box net, like a medical cross or Red Cross symbol shape. NOT a T-shape. NOT a horizontal row. The shape is a PLUS SIGN with 5 equal squares:

One square in the center.
One square directly ABOVE the center (touching its top edge).
One square directly BELOW the center (touching its bottom edge).
One square directly LEFT of center (touching its left edge).
One square directly RIGHT of center (touching its right edge).

The center square is empty white space where the squares meet. Think of it like the 5 on a dice but with the squares touching the center.

TOP SQUARE: Contains "${pack.packName}" in cute bubbly stylized letters (${theme}) with "BLIND BOX" subtitle. This is the box lid.
LEFT SQUARE: Contains a kawaii chibi illustration of ${chars[0] || "a cute character"}, facing upward with head at top.
CENTER SQUARE: Contains a kawaii chibi illustration of ${chars[1] || "a cute character"}, facing upward with head at top.
RIGHT SQUARE: Contains a kawaii chibi illustration of ${chars[2] || "a cute character"}, facing upward with head at top.
BOTTOM SQUARE: Contains a kawaii chibi illustration of ${chars[3] || "a cute character"}, facing upward with head at top.

Characters are LARGE, filling 80% of each square. Bold outlines, big sparkly eyes, adorable kawaii chibi style.

Trapezoid GLUE TAB flaps on every outer edge with "GLUE TAB" text and small arrows. Dashed lines between touching squares (fold lines). Solid lines on outer edges (cut lines).

"Print on cardstock, cut, fold, glue!" text below the net.

Clean white background, professional craft template style, high quality illustration.`;
}

function readPackInfo(packId: string): PackInfo | null {
  const jsonPath = path.join(ROOT, "packs", packId, "characters.json");
  if (!fs.existsSync(jsonPath)) return null;

  const data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  return {
    packId: data.packId,
    packName: data.packName,
    collection: data.collection,
    characterDescriptions: (data.characters || []).slice(0, 4).map((c: any) => c.description || c.name),
  };
}

async function generateTemplateImage(pack: PackInfo): Promise<boolean> {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const outPath = path.join(OUT_DIR, `${pack.packId}-template.png`);
  const prompt = buildTemplatePrompt(pack);

  console.log(`🎨 ${pack.packName} (${pack.packId})...`);
  const start = Date.now();

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://blindbox-creator.vercel.app",
      "X-Title": "BlindBox Creator Template Preview",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 8192,
      messages: [{ role: "user", content: `Generate an image: ${prompt}` }],
    }),
  });

  if (!res.ok) {
    console.log(`   ❌ API error ${res.status}: ${(await res.text()).slice(0, 200)}`);
    return false;
  }

  const data = await res.json();
  const msg = data?.choices?.[0]?.message;
  let imageData: string | null = null;

  // Gemini image extraction (same as other scripts)
  if (msg?.images && Array.isArray(msg.images) && msg.images.length > 0) {
    const imgObj = msg.images[0];
    if (imgObj?.image_url?.url) imageData = imgObj.image_url.url;
  }
  if (!imageData && typeof msg?.content === "string" && msg.content.startsWith("data:image")) {
    imageData = msg.content;
  }
  if (!imageData && Array.isArray(msg?.content)) {
    for (const part of msg.content) {
      if (part?.type === "image_url" && part?.image_url?.url) {
        imageData = part.image_url.url;
        break;
      }
    }
  }

  if (!imageData) {
    console.log(`   ❌ No image data. Response keys: ${JSON.stringify(Object.keys(msg || {}))}`);
    return false;
  }

  const base64Part = imageData.includes(",") ? imageData.split(",")[1] : imageData;
  const imgBuffer = Buffer.from(base64Part, "base64");
  fs.writeFileSync(outPath, imgBuffer);

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  const sizeKB = (imgBuffer.length / 1024).toFixed(0);
  console.log(`   ✅ ${pack.packId}-template.png (${sizeKB}KB, ${elapsed}s)`);
  return true;
}

// Get all packs that have characters.json
function getAllPacks(): string[] {
  const packsDir = path.join(ROOT, "packs");
  if (!fs.existsSync(packsDir)) return [];
  return fs.readdirSync(packsDir).filter(d => {
    return fs.existsSync(path.join(packsDir, d, "characters.json"));
  });
}

async function main() {
  if (!API_KEY) {
    console.error("❌ Set OPENROUTER_API_KEY");
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const packArg = args.find(a => a.startsWith("--pack="));
  const onlyArg = args.find(a => a.startsWith("--only="));
  const allFlag = args.includes("--all");

  let packIds: string[] = [];

  if (packArg) {
    packIds = [packArg.split("=")[1]];
  } else if (onlyArg) {
    packIds = onlyArg.split("=")[1].split(",");
  } else if (allFlag) {
    packIds = getAllPacks();
  } else {
    console.error("❌ Usage: npx tsx scripts/generate-template-preview.ts --pack=<id> | --all | --only=id1,id2");
    process.exit(1);
  }

  const estCost = packIds.length * 0.04;
  console.log(`\n📦 Template Preview Generator (Gemini 3 Pro Image)`);
  console.log(`   Packs: ${packIds.length}`);
  console.log(`   Est cost: ~$${estCost.toFixed(2)}\n`);

  let success = 0;
  let failed = 0;
  const failures: string[] = [];

  for (let i = 0; i < packIds.length; i++) {
    const packId = packIds[i];
    const pack = readPackInfo(packId);

    if (!pack) {
      console.log(`   ⚠️  ${packId} - no characters.json, skipping`);
      continue;
    }

    console.log(`[${i + 1}/${packIds.length}]`);
    const ok = await generateTemplateImage(pack);
    if (ok) success++;
    else { failed++; failures.push(packId); }

    if (i < packIds.length - 1) {
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(`✅ Success: ${success}/${packIds.length}`);
  if (failed > 0) {
    console.log(`❌ Failed: ${failed} - ${failures.join(", ")}`);
    console.log(`   Retry: npx tsx scripts/generate-template-preview.ts --only=${failures.join(",")}`);
  }
  console.log(`${"=".repeat(50)}\n`);
}

main().catch(console.error);
