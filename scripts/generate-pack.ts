#!/usr/bin/env npx tsx
/**
 * generate-pack.ts - Main blind box pack generation pipeline
 *
 * Generates character art via OpenRouter, assembles PDFs via Puppeteer,
 * and bundles everything into a downloadable ZIP.
 *
 * Usage:
 *   npx tsx scripts/generate-pack.ts --pack=chibi-kitty-club
 *   npx tsx scripts/generate-pack.ts --pack=chibi-kitty-club --force --verbose
 *   npx tsx scripts/generate-pack.ts --pack=chibi-kitty-club --skip-images
 *   npx tsx scripts/generate-pack.ts --pack=chibi-kitty-club --skip-pdf --model=google/gemini-2.5-flash-image
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

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
const TEMPLATES = [
  "trading-card",
  "box-net",
  "standee",
  "sticker-sheet",
  "assembly-guide",
  "checklist",
];
const DEFAULT_MODEL = "google/gemini-2.5-flash-image";
const RATE_LIMIT_MS = 500;
const MAX_RETRIES = 2;
const MAX_ZIP_SIZE_MB = 30;

const RARITY_COLORS: Record<string, string> = {
  common: "#9CA3AF",
  rare: "#3B82F6",
  epic: "#8B5CF6",
  legendary: "#F59E0B",
};

// ---------------------------------------------------------------------------
// CLI flag parsing
// ---------------------------------------------------------------------------

function parseArgs(): {
  pack: string;
  model: string;
  force: boolean;
  skipImages: boolean;
  skipPdf: boolean;
  verbose: boolean;
} {
  const args = process.argv.slice(2);
  let pack = "";
  let model = DEFAULT_MODEL;
  let force = false;
  let skipImages = false;
  let skipPdf = false;
  let verbose = false;

  for (const arg of args) {
    if (arg.startsWith("--pack=")) pack = arg.split("=")[1];
    else if (arg.startsWith("--model=")) model = arg.split("=")[1];
    else if (arg === "--force") force = true;
    else if (arg === "--skip-images") skipImages = true;
    else if (arg === "--skip-pdf") skipPdf = true;
    else if (arg === "--verbose") verbose = true;
  }

  if (!pack) {
    console.error("❌ Missing required flag: --pack=<pack-id>");
    console.error("   Example: npx tsx scripts/generate-pack.ts --pack=chibi-kitty-club");
    process.exit(1);
  }

  return { pack, model, force, skipImages, skipPdf, verbose };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function log(msg: string) {
  console.log(msg);
}

function vlog(msg: string, verbose: boolean) {
  if (verbose) console.log(`   ${msg}`);
}

function fileSize(filepath: string): string {
  const bytes = fs.statSync(filepath).size;
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function imageToDataUrl(filepath: string): string {
  const ext = path.extname(filepath).toLowerCase();
  const mime = ext === ".png" ? "image/png" : ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : "image/png";
  const buf = fs.readFileSync(filepath);
  return `data:${mime};base64,${buf.toString("base64")}`;
}

// ---------------------------------------------------------------------------
// STAGE 1: Read pack data
// ---------------------------------------------------------------------------

function readPackData(packId: string): PackData {
  const jsonPath = path.join(ROOT, "packs", packId, "characters.json");
  if (!fs.existsSync(jsonPath)) {
    console.error(`❌ Pack not found: ${jsonPath}`);
    process.exit(1);
  }
  const raw = fs.readFileSync(jsonPath, "utf-8");
  const data: PackData = JSON.parse(raw);
  log(`✅ Stage 1: Loaded pack "${data.packName}" (${data.characters.length} characters)`);
  return data;
}

// ---------------------------------------------------------------------------
// STAGE 2: Generate character art via OpenRouter
// ---------------------------------------------------------------------------

async function generateCharacterArt(
  pack: PackData,
  model: string,
  force: boolean,
  verbose: boolean
): Promise<{ generated: number; skipped: number; failed: number }> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error("❌ OPENROUTER_API_KEY not set. Export it or add to .env");
    process.exit(1);
  }

  const charDir = path.join(ROOT, "packs", pack.packId, "characters");
  fs.mkdirSync(charDir, { recursive: true });

  let generated = 0;
  let skipped = 0;
  let failed = 0;

  log(`⏳ Stage 2: Generating character art (model: ${model})`);

  for (const char of pack.characters) {
    const outPath = path.join(charDir, `${char.id}.png`);

    // Skip if image exists and not forced
    if (fs.existsSync(outPath) && !force) {
      vlog(`⏭️  ${char.name} - exists, skipping`, verbose);
      skipped++;
      continue;
    }

    const fullPrompt =
      `Kawaii chibi ${char.prompt}, Japanese blind box collectible figure style, ` +
      `soft pastel color palette, adorable big sparkly eyes, simple clean bold outlines, ` +
      `pure white background, high quality cute illustration, print-ready for cardstock, ` +
      `high contrast vibrant colors, thick outlines for easy cutting, solid color fills, ` +
      `centered composition, full body character standing on small base`;

    let success = false;
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        vlog(`🎨 ${char.name} (attempt ${attempt + 1}/${MAX_RETRIES + 1})`, verbose);

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://blindbox-creator.vercel.app",
            "X-Title": "Blind Box Creator",
          },
          body: JSON.stringify({
            model,
            messages: [
              {
                role: "user",
                content: `Generate an image: ${fullPrompt}`,
              },
            ],
          }),
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`API ${response.status}: ${errText.slice(0, 200)}`);
        }

        const result = await response.json();
        const msg = result?.choices?.[0]?.message;
        let imageData: string | null = null;

        // Path 1: Gemini returns images in message.images[] array (primary)
        if (msg?.images && Array.isArray(msg.images) && msg.images.length > 0) {
          const imgObj = msg.images[0];
          if (imgObj?.image_url?.url) {
            imageData = imgObj.image_url.url;
          }
        }

        // Path 2: Some models return base64 in content string
        if (!imageData && typeof msg?.content === "string" && msg.content.startsWith("data:image")) {
          imageData = msg.content;
        }

        // Path 3: Content array with image_url objects
        if (!imageData && Array.isArray(msg?.content)) {
          for (const part of msg.content) {
            if (part.type === "image_url" && part.image_url?.url) {
              imageData = part.image_url.url;
              break;
            }
          }
        }

        if (!imageData) {
          throw new Error("No image data in API response. Message keys: " + Object.keys(msg || {}).join(", "));
        }

        // Decode base64 and save
        const base64Part = imageData.includes(",") ? imageData.split(",")[1] : imageData;
        const imgBuffer = Buffer.from(base64Part, "base64");
        fs.writeFileSync(outPath, imgBuffer);

        log(`   ✅ ${char.name} (${char.rarity}) - ${fileSize(outPath)}`);
        generated++;
        success = true;
        break;
      } catch (err: any) {
        vlog(`   ⚠️  Attempt ${attempt + 1} failed: ${err.message}`, verbose);
        if (attempt === MAX_RETRIES) {
          log(`   ❌ ${char.name} - FAILED after ${MAX_RETRIES + 1} attempts`);
          failed++;
        }
      }
    }

    // Rate limit between API calls
    if (success || failed) {
      await sleep(RATE_LIMIT_MS);
    }
  }

  log(
    `✅ Stage 2 complete: ${generated} generated, ${skipped} skipped, ${failed} failed`
  );
  return { generated, skipped, failed };
}

// ---------------------------------------------------------------------------
// STAGE 3: Assemble PDFs via Puppeteer
// ---------------------------------------------------------------------------

async function assemblePdfs(pack: PackData, verbose: boolean): Promise<number> {
  // Dynamic import - puppeteer is a devDependency
  const puppeteer = await import("puppeteer");

  const charDir = path.join(ROOT, "packs", pack.packId, "characters");
  const outDir = path.join(ROOT, "packs", pack.packId);

  // Build pack data with base64 images for template injection
  const packDataForTemplate: PackData & { characters: (Character & { imageDataUrl: string })[] } = {
    ...pack,
    characters: pack.characters.map((char) => {
      const imgPath = path.join(charDir, `${char.id}.png`);
      const imageDataUrl = fs.existsSync(imgPath) ? imageToDataUrl(imgPath) : "";
      return { ...char, imageDataUrl };
    }),
  };

  // Add rarity colors to pack data for templates
  const templateData = {
    ...packDataForTemplate,
    rarityColors: RARITY_COLORS,
  };

  log(`⏳ Stage 3: Assembling PDFs (${TEMPLATES.length} templates)`);

  const browser = await puppeteer.default.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  let pdfCount = 0;

  for (const templateName of TEMPLATES) {
    const templatePath = path.join(ROOT, "templates", `${templateName}.html`);
    if (!fs.existsSync(templatePath)) {
      log(`   ⚠️  Template missing: ${templateName}.html - skipping`);
      continue;
    }

    try {
      const page = await browser.newPage();

      // Set 300 DPI emulation via device scale factor
      await page.setViewport({ width: 816, height: 1056, deviceScaleFactor: 3 });

      // Load template HTML file
      const fileUrl = `file://${templatePath}`;
      await page.goto(fileUrl, { waitUntil: "networkidle0", timeout: 15000 });

      // Inject pack data and call render function
      await page.evaluate((data: any) => {
        (window as any).__PACK_DATA = data;
        if (typeof (window as any).render === "function") {
          (window as any).render(data);
        }
      }, templateData);

      // Wait for rendering to complete
      try {
        await page.waitForSelector(".rendered", { timeout: 5000 });
      } catch {
        // Fallback: wait 2s if .rendered class never appears
        vlog(`   ⏳ ${templateName} - .rendered not found, waiting 2s fallback`, verbose);
        await sleep(2000);
      }

      // Export to PDF
      const pdfPath = path.join(outDir, `${pack.packId}-${templateName}.pdf`);
      await page.pdf({
        path: pdfPath,
        format: "Letter",
        printBackground: true,
        preferCSSPageSize: true,
        scale: 1,
      });

      await page.close();
      log(`   ✅ ${templateName}.pdf - ${fileSize(pdfPath)}`);
      pdfCount++;
    } catch (err: any) {
      log(`   ❌ ${templateName}.pdf - FAILED: ${err.message}`);
    }
  }

  await browser.close();
  log(`✅ Stage 3 complete: ${pdfCount}/${TEMPLATES.length} PDFs generated`);
  return pdfCount;
}

// ---------------------------------------------------------------------------
// STAGE 4: Create ZIP bundle
// ---------------------------------------------------------------------------

function createZip(packId: string, verbose: boolean): string | null {
  const packDir = path.join(ROOT, "packs", packId);
  const zipName = `blindbox-${packId}.zip`;
  const zipPath = path.join(packDir, zipName);

  // Remove old ZIP if it exists
  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
  }

  // Collect all PDFs in the pack directory
  const pdfs = fs.readdirSync(packDir).filter((f) => f.endsWith(".pdf"));

  if (pdfs.length === 0) {
    log("❌ Stage 4: No PDFs found to bundle");
    return null;
  }

  log(`📦 Stage 4: Creating ZIP (${pdfs.length} PDFs)`);

  try {
    // Use system zip command (available on macOS and most Linux)
    const pdfArgs = pdfs.map((f) => `"${f}"`).join(" ");
    execSync(`cd "${packDir}" && zip -j "${zipPath}" ${pdfArgs}`, {
      stdio: verbose ? "inherit" : "pipe",
    });

    // Verify ZIP
    if (!fs.existsSync(zipPath)) {
      throw new Error("ZIP file was not created");
    }

    const sizeMB = fs.statSync(zipPath).size / (1024 * 1024);
    if (sizeMB > MAX_ZIP_SIZE_MB) {
      log(`   ⚠️  ZIP is ${sizeMB.toFixed(1)}MB (exceeds ${MAX_ZIP_SIZE_MB}MB limit)`);
    }

    // Verify contents
    const zipList = execSync(`unzip -l "${zipPath}"`, { encoding: "utf-8" });
    const fileCount = (zipList.match(/\.pdf/g) || []).length;

    log(`✅ Stage 4: ZIP created - ${fileSize(zipPath)} (${fileCount} files)`);
    return zipPath;
  } catch (err: any) {
    log(`❌ Stage 4: ZIP creation failed: ${err.message}`);
    return null;
  }
}

// ---------------------------------------------------------------------------
// STAGE 5: Summary
// ---------------------------------------------------------------------------

function printSummary(
  pack: PackData,
  startTime: number,
  imageStats: { generated: number; skipped: number; failed: number },
  pdfCount: number,
  zipPath: string | null
) {
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const packDir = path.join(ROOT, "packs", pack.packId);

  // Count total files generated
  const allFiles = fs.readdirSync(packDir);
  const pdfs = allFiles.filter((f) => f.endsWith(".pdf"));
  const charDir = path.join(packDir, "characters");
  const pngs = fs.existsSync(charDir) ? fs.readdirSync(charDir).filter((f) => f.endsWith(".png")) : [];

  // Estimate cost (Gemini Flash is very cheap)
  const estimatedCost = imageStats.generated * 0.002; // ~$0.002 per image generation

  console.log("\n" + "=".repeat(50));
  console.log("📊 GENERATION SUMMARY");
  console.log("=".repeat(50));
  console.log(`   Pack:         ${pack.packName} (${pack.packId})`);
  console.log(`   Collection:   ${pack.collection}`);
  console.log(`   Characters:   ${pack.characters.length}`);
  console.log(`   Images:       ${pngs.length} PNGs (${imageStats.generated} new, ${imageStats.skipped} cached, ${imageStats.failed} failed)`);
  console.log(`   PDFs:         ${pdfs.length}/${TEMPLATES.length}`);
  console.log(`   ZIP:          ${zipPath ? fileSize(zipPath) : "not created"}`);
  console.log(`   Time:         ${elapsed}s`);
  console.log(`   Est. cost:    $${estimatedCost.toFixed(3)}`);
  console.log("=".repeat(50));

  if (imageStats.failed > 0) {
    console.log(`\n⚠️  ${imageStats.failed} character(s) failed image generation. Re-run with --force to retry.`);
  }
  if (pdfCount < TEMPLATES.length) {
    console.log(`\n⚠️  ${TEMPLATES.length - pdfCount} template(s) missing. Ensure all HTML templates exist in templates/.`);
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const startTime = Date.now();
  const { pack: packId, model, force, skipImages, skipPdf, verbose } = parseArgs();

  console.log("\n🎁 Blind Box Pack Generator");
  console.log(`   Pack: ${packId} | Model: ${model}`);
  console.log(`   Flags: ${force ? "--force " : ""}${skipImages ? "--skip-images " : ""}${skipPdf ? "--skip-pdf " : ""}${verbose ? "--verbose" : ""}`);
  console.log("");

  // Stage 1: Read pack data
  const packData = readPackData(packId);

  // Stage 2: Generate character art
  let imageStats = { generated: 0, skipped: 0, failed: 0 };
  if (!skipImages) {
    imageStats = await generateCharacterArt(packData, model, force, verbose);
  } else {
    log("⏭️  Stage 2: Skipped (--skip-images)");
    // Count existing images as "skipped"
    const charDir = path.join(ROOT, "packs", packId, "characters");
    if (fs.existsSync(charDir)) {
      imageStats.skipped = fs.readdirSync(charDir).filter((f) => f.endsWith(".png")).length;
    }
  }

  // Stage 3: Assemble PDFs
  let pdfCount = 0;
  if (!skipPdf) {
    pdfCount = await assemblePdfs(packData, verbose);
  } else {
    log("⏭️  Stage 3: Skipped (--skip-pdf)");
  }

  // Stage 4: Create ZIP (only if we have PDFs)
  let zipPath: string | null = null;
  if (!skipPdf && pdfCount > 0) {
    zipPath = createZip(packId, verbose);
  } else if (skipPdf) {
    log("⏭️  Stage 4: Skipped (--skip-pdf)");
  }

  // Stage 5: Summary
  printSummary(packData, startTime, imageStats, pdfCount, zipPath);
}

main().catch((err) => {
  console.error(`\n❌ Fatal error: ${err.message}`);
  process.exit(1);
});
