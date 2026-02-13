#!/usr/bin/env npx tsx
/**
 * generate-flatlay.ts - All-pages flat lay product image generator
 *
 * Renders a 1200x1600 PNG showing all PDF pages as thumbnails
 * in a bird's-eye flat lay arrangement for the product gallery.
 *
 * Usage:
 *   npx tsx scripts/generate-flatlay.ts --pack=chibi-kitty-club
 */

import fs from "fs";
import path from "path";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

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
  characters: any[];
}

interface PageThumbnail {
  name: string;
  dataUrl: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ROOT = path.resolve(__dirname, "..");
const VIEWPORT_WIDTH = 1200;
const VIEWPORT_HEIGHT = 1600;
const THUMB_WIDTH = 300;
const THUMB_HEIGHT = 400;
const SHARP_QUALITY = 85;

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
    console.error("   Example: npx tsx scripts/generate-flatlay.ts --pack=chibi-kitty-club");
    process.exit(1);
  }

  return { pack, verbose };
}

// ---------------------------------------------------------------------------
// PDF page rendering
// ---------------------------------------------------------------------------

/**
 * Renders each page of a PDF as a thumbnail PNG using Puppeteer.
 * Returns an array of { name, dataUrl } objects.
 */
async function renderPdfPages(
  pdfPath: string,
  pdfName: string,
  browser: any,
  verbose: boolean
): Promise<PageThumbnail[]> {
  const thumbnails: PageThumbnail[] = [];

  try {
    // We render the PDF by loading it in a Puppeteer page
    // Puppeteer can load PDFs natively and we screenshot each page
    const page = await browser.newPage();
    await page.setViewport({
      width: THUMB_WIDTH,
      height: THUMB_HEIGHT,
      deviceScaleFactor: 2,
    });

    // Load the PDF in the browser
    const fileUrl = `file://${pdfPath}`;
    await page.goto(fileUrl, { waitUntil: "networkidle0", timeout: 30000 });

    // For PDF rendering in headless Chrome, we screenshot the visible page
    // Chrome renders PDFs with a built-in viewer; we capture the rendered content
    const screenshotBuffer = await page.screenshot({
      type: "png",
      clip: { x: 0, y: 0, width: THUMB_WIDTH, height: THUMB_HEIGHT },
    });

    const dataUrl = `data:image/png;base64,${screenshotBuffer.toString("base64")}`;
    const cleanName = pdfName
      .replace(/\.pdf$/i, "")
      .split("-")
      .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    thumbnails.push({ name: cleanName, dataUrl });
    if (verbose) console.log(`   📄 ${cleanName}`);

    await page.close();
  } catch (err: any) {
    if (verbose) console.log(`   ⚠️  Failed to render ${pdfName}: ${err.message}`);
  }

  return thumbnails;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const { pack: packId, verbose } = parseArgs();

  console.log(`\n📸 Flat Lay Generator`);
  console.log(`   Pack: ${packId}\n`);

  // Step 1: Read pack data
  const jsonPath = path.join(ROOT, "packs", packId, "characters.json");
  if (!fs.existsSync(jsonPath)) {
    console.error(`❌ Pack not found: ${jsonPath}`);
    process.exit(1);
  }
  const packData: PackData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  console.log(`✅ Loaded "${packData.packName}"`);

  // Step 2: Find all PDFs for this pack
  const packDir = path.join(ROOT, "packs", packId);
  const pdfFiles = fs.readdirSync(packDir).filter((f) => f.endsWith(".pdf")).sort();

  if (pdfFiles.length === 0) {
    console.error(`❌ No PDFs found in ${packDir}. Run generate-pack.ts first.`);
    process.exit(1);
  }
  console.log(`✅ Found ${pdfFiles.length} PDFs`);

  // Step 3: Render each PDF page as a thumbnail
  const puppeteer = await import("puppeteer");
  const browser = await puppeteer.default.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  console.log(`⏳ Rendering PDF thumbnails...`);

  const allThumbnails: PageThumbnail[] = [];
  for (const pdfFile of pdfFiles) {
    const pdfPath = path.join(packDir, pdfFile);
    const thumbs = await renderPdfPages(pdfPath, pdfFile, browser, verbose);
    allThumbnails.push(...thumbs);
  }

  console.log(`✅ Generated ${allThumbnails.length} page thumbnail(s)`);

  // Step 4: Load flat lay template
  const templatePath = path.join(ROOT, "templates", "pages-flatlay.html");
  if (!fs.existsSync(templatePath)) {
    console.error(`❌ Template not found: ${templatePath}`);
    await browser.close();
    process.exit(1);
  }

  const page = await browser.newPage();
  await page.setViewport({
    width: VIEWPORT_WIDTH,
    height: VIEWPORT_HEIGHT,
    deviceScaleFactor: 2,
  });

  await page.goto(`file://${templatePath}`, { waitUntil: "networkidle0", timeout: 15000 });

  // Step 5: Inject data
  const templateData = {
    packName: packData.packName,
    packId: packData.packId,
    theme: packData.theme,
    pageThumbnails: allThumbnails,
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

  const rawPath = path.join(outDir, `${packId}-flatlay-raw.png`);
  const finalPath = path.join(outDir, `${packId}-flatlay.png`);

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
    console.log(`⚠️  Sharp optimization failed (${err.message}), using raw screenshot`);
    fs.renameSync(rawPath, finalPath);
  }

  console.log(`\n✅ Done: ${finalPath}`);
}

main().catch((err) => {
  console.error(`\n❌ Fatal error: ${err.message}`);
  process.exit(1);
});
