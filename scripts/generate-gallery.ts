#!/usr/bin/env npx tsx
/**
 * generate-gallery.ts - Character gallery product image generator
 *
 * Renders a 1200x1200 PNG showing all 12 characters in a 4x3 grid
 * for use as the product page gallery image.
 *
 * Usage:
 *   npx tsx scripts/generate-gallery.ts --pack=chibi-kitty-club
 */

import fs from "fs";
import path from "path";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Character {
  id: string;
  name: string;
  description: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  prompt: string;
  imageDataUrl?: string;
}

interface PackTheme {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  pattern: string;
  boxAccent: string;
}

interface PackData {
  packId: string;
  packName: string;
  collection: string;
  theme: PackTheme;
  characters: Character[];
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ROOT = path.resolve(__dirname, "..");
const VIEWPORT_WIDTH = 1200;
const VIEWPORT_HEIGHT = 1200;
const SHARP_QUALITY = 85;

const RARITY_COLORS: Record<string, string> = {
  common: "#9CA3AF",
  rare: "#3B82F6",
  epic: "#8B5CF6",
  legendary: "#F59E0B",
};

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

function parseArgs(): { pack: string; verbose: boolean } {
  const args = process.argv.slice(2);
  let pack = "";
  let verbose = false;

  for (const arg of args) {
    if (arg.startsWith("--pack=")) pack = arg.split("=")[1];
    else if (arg === "--verbose") verbose = true;
  }

  if (!pack) {
    console.error("❌ Missing required flag: --pack=<pack-id>");
    console.error("   Example: npx tsx scripts/generate-gallery.ts --pack=chibi-kitty-club");
    process.exit(1);
  }

  return { pack, verbose };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function imageToDataUrl(filepath: string): string {
  const ext = path.extname(filepath).toLowerCase();
  const mime = ext === ".png" ? "image/png" : "image/jpeg";
  const buf = fs.readFileSync(filepath);
  return `data:${mime};base64,${buf.toString("base64")}`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const { pack: packId, verbose } = parseArgs();

  console.log(`\n🖼️  Character Gallery Generator`);
  console.log(`   Pack: ${packId}\n`);

  // Step 1: Read characters.json
  const jsonPath = path.join(ROOT, "packs", packId, "characters.json");
  if (!fs.existsSync(jsonPath)) {
    console.error(`❌ Pack not found: ${jsonPath}`);
    process.exit(1);
  }
  const packData: PackData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  console.log(`✅ Loaded "${packData.packName}" (${packData.characters.length} characters)`);

  // Step 2: Read character PNGs and convert to base64
  const charDir = path.join(ROOT, "packs", packId, "characters");
  const charactersWithImages = packData.characters.map((char) => {
    const imgPath = path.join(charDir, `${char.id}.png`);
    const imageDataUrl = fs.existsSync(imgPath) ? imageToDataUrl(imgPath) : "";
    if (!imageDataUrl && verbose) {
      console.log(`   ⚠️  Missing image: ${char.id}.png`);
    }
    return { ...char, imageDataUrl };
  });

  const missingCount = charactersWithImages.filter((c) => !c.imageDataUrl).length;
  if (missingCount > 0) {
    console.log(`⚠️  ${missingCount} character(s) missing images - they will appear as placeholders`);
  }

  // Step 3: Launch Puppeteer
  const puppeteer = await import("puppeteer");
  const browser = await puppeteer.default.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: VIEWPORT_WIDTH,
    height: VIEWPORT_HEIGHT,
    deviceScaleFactor: 2,
  });

  // Step 4: Load template
  const templatePath = path.join(ROOT, "templates", "character-gallery.html");
  if (!fs.existsSync(templatePath)) {
    console.error(`❌ Template not found: ${templatePath}`);
    await browser.close();
    process.exit(1);
  }

  await page.goto(`file://${templatePath}`, { waitUntil: "networkidle0", timeout: 15000 });

  // Step 5: Inject pack data
  const templateData = {
    ...packData,
    characters: charactersWithImages,
    rarityColors: RARITY_COLORS,
  };

  await page.evaluate((data: any) => {
    (window as any).__PACK_DATA = data;
    if (typeof (window as any).render === "function") {
      (window as any).render(data);
    }
  }, templateData);

  // Wait for render
  try {
    await page.waitForSelector(".rendered", { timeout: 5000 });
  } catch {
    console.log("   ⏳ Waiting 2s fallback for render...");
    await new Promise((r) => setTimeout(r, 2000));
  }

  // Step 6: Screenshot
  const outDir = path.join(ROOT, "public", "products", "previews");
  fs.mkdirSync(outDir, { recursive: true });

  const rawPath = path.join(outDir, `${packId}-gallery-raw.png`);
  const finalPath = path.join(outDir, `${packId}-gallery.png`);

  await page.screenshot({
    path: rawPath,
    type: "png",
    clip: { x: 0, y: 0, width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT },
  });

  await page.close();
  await browser.close();

  console.log(`✅ Screenshot captured`);

  // Step 7: Optimize with sharp
  try {
    const sharp = (await import("sharp")).default;
    await sharp(rawPath)
      .resize(VIEWPORT_WIDTH, VIEWPORT_HEIGHT, { fit: "cover" })
      .png({ quality: SHARP_QUALITY, compressionLevel: 9 })
      .toFile(finalPath);

    // Remove raw file
    fs.unlinkSync(rawPath);

    const size = fs.statSync(finalPath).size;
    const sizeMB = (size / (1024 * 1024)).toFixed(2);
    console.log(`✅ Optimized: ${finalPath}`);
    console.log(`   Size: ${sizeMB}MB`);
  } catch (err: any) {
    // If sharp fails, just rename the raw file
    console.log(`⚠️  Sharp optimization failed (${err.message}), using raw screenshot`);
    fs.renameSync(rawPath, finalPath);
  }

  console.log(`\n✅ Done: ${finalPath}`);
}

main().catch((err) => {
  console.error(`\n❌ Fatal error: ${err.message}`);
  process.exit(1);
});
