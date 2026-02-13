#!/usr/bin/env npx tsx
/**
 * Composite ACTUAL character PNGs into a product marketing image.
 * Uses Sharp to arrange all 12 real character images on a themed gradient background.
 * NO AI reimagining - these are the REAL character files customers receive.
 *
 * Output: public/products/previews/{packId}-characters.png (1200x1200)
 */
import fs from "fs";
import path from "path";

const ROOT = path.resolve(__dirname, "..");

interface PackData {
  packId: string;
  packName: string;
  collection: string;
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    pattern: string;
    boxAccent: string;
  };
  characters: Array<{
    id: string;
    name: string;
    rarity: string;
  }>;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
}

async function main() {
  const args = process.argv.slice(2);
  let packId = "";
  for (const arg of args) {
    if (arg.startsWith("--pack=")) packId = arg.split("=")[1];
  }

  if (!packId) {
    console.error("Usage: npx tsx scripts/composite-characters.ts --pack=<pack-id>");
    process.exit(1);
  }

  const jsonPath = path.join(ROOT, "packs", packId, "characters.json");
  if (!fs.existsSync(jsonPath)) {
    console.error(`Pack not found: ${jsonPath}`);
    process.exit(1);
  }

  const data: PackData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  console.log(`Compositing ${data.packName} (${data.characters.length} characters)`);

  const sharp = (await import("sharp")).default;

  const WIDTH = 1200;
  const HEIGHT = 1200;
  const COLS = 4;
  const ROWS = 3;
  const PADDING = 40;
  const HEADER_HEIGHT = 140; // Space for logo/title at top
  const FOOTER_HEIGHT = 60;
  const GRID_TOP = HEADER_HEIGHT;
  const GRID_HEIGHT = HEIGHT - HEADER_HEIGHT - FOOTER_HEIGHT;
  const CELL_W = Math.floor((WIDTH - PADDING * 2) / COLS);
  const CELL_H = Math.floor(GRID_HEIGHT / ROWS);
  const CHAR_SIZE = Math.min(CELL_W - 20, CELL_H - 40); // Leave room for name

  // Create gradient background
  const c1 = hexToRgb(data.theme.primary);
  const c2 = hexToRgb(data.theme.secondary);

  // Create SVG gradient background
  const bgSvg = `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${data.theme.primary};stop-opacity:1"/>
        <stop offset="50%" style="stop-color:${data.theme.secondary};stop-opacity:1"/>
        <stop offset="100%" style="stop-color:${data.theme.accent};stop-opacity:1"/>
      </linearGradient>
    </defs>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
    <!-- Decorative sparkle dots -->
    ${Array.from({ length: 30 }, () => {
      const x = Math.random() * WIDTH;
      const y = Math.random() * HEIGHT;
      const r = 2 + Math.random() * 4;
      return `<circle cx="${x}" cy="${y}" r="${r}" fill="rgba(255,255,255,0.15)"/>`;
    }).join("")}
    <!-- Title text area -->
    <rect x="0" y="0" width="${WIDTH}" height="${HEADER_HEIGHT}" fill="rgba(0,0,0,0.05)" rx="0"/>
    <!-- Footer -->
    <rect x="0" y="${HEIGHT - FOOTER_HEIGHT}" width="${WIDTH}" height="${FOOTER_HEIGHT}" fill="rgba(0,0,0,0.05)" rx="0"/>
    <!-- Pack name -->
    <text x="${WIDTH / 2}" y="65" font-family="sans-serif" font-size="52" font-weight="bold" fill="white" text-anchor="middle" filter="url(#shadow)">${escXml(data.packName)}</text>
    <text x="${WIDTH / 2}" y="105" font-family="sans-serif" font-size="22" font-weight="600" fill="rgba(255,255,255,0.8)" text-anchor="middle" letter-spacing="3">12 KAWAII CHARACTERS INCLUDED</text>
    <!-- Footer text -->
    <text x="${WIDTH / 2}" y="${HEIGHT - 22}" font-family="sans-serif" font-size="16" font-weight="600" fill="rgba(255,255,255,0.5)" text-anchor="middle" letter-spacing="2">${escXml(formatCollection(data.collection))} COLLECTION</text>
    <!-- Drop shadow filter -->
    <defs>
      <filter id="shadow" x="-5%" y="-5%" width="110%" height="120%">
        <feDropShadow dx="0" dy="3" stdDeviation="6" flood-color="rgba(0,0,0,0.2)"/>
      </filter>
      <filter id="charShadow" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="rgba(0,0,0,0.2)"/>
      </filter>
    </defs>
  </svg>`;

  const bgBuffer = Buffer.from(bgSvg);
  let composite = sharp(bgBuffer).resize(WIDTH, HEIGHT);

  // Load and position each character
  const composites: Array<{ input: Buffer; left: number; top: number }> = [];
  const charDir = path.join(ROOT, "packs", packId, "characters");

  for (let i = 0; i < Math.min(data.characters.length, 12); i++) {
    const char = data.characters[i];
    const imgPath = path.join(charDir, `${char.id}.png`);

    if (!fs.existsSync(imgPath)) {
      console.log(`  Missing: ${char.id}.png`);
      continue;
    }

    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const x = PADDING + col * CELL_W + (CELL_W - CHAR_SIZE) / 2;
    const y = GRID_TOP + row * CELL_H + 5;

    // Resize character to fit cell
    const resized = await sharp(imgPath)
      .resize(CHAR_SIZE, CHAR_SIZE, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();

    composites.push({ input: resized, left: Math.round(x), top: Math.round(y) });

    // Add name label as SVG overlay
    const nameX = PADDING + col * CELL_W + CELL_W / 2;
    const nameY = y + CHAR_SIZE + 18;
    const nameSvg = Buffer.from(
      `<svg width="${CELL_W}" height="30" xmlns="http://www.w3.org/2000/svg">
        <text x="${CELL_W / 2}" y="18" font-family="sans-serif" font-size="14" font-weight="700" fill="white" text-anchor="middle" filter="url(#ns)">
          ${escXml(char.name)}
        </text>
        <defs><filter id="ns"><feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="rgba(0,0,0,0.3)"/></filter></defs>
      </svg>`
    );
    composites.push({
      input: nameSvg,
      left: Math.round(PADDING + col * CELL_W),
      top: Math.round(nameY),
    });

    // Rarity badge
    const rarityColors: Record<string, string> = {
      common: "#9CA3AF",
      rare: "#3B82F6",
      epic: "#8B5CF6",
      legendary: "#F59E0B",
    };
    const rc = rarityColors[char.rarity] || "#9CA3AF";
    const badgeW = char.rarity === "legendary" ? 80 : 55;
    const badgeSvg = Buffer.from(
      `<svg width="${badgeW}" height="18" xmlns="http://www.w3.org/2000/svg">
        <rect width="${badgeW}" height="16" rx="8" fill="${rc}"/>
        <text x="${badgeW / 2}" y="12" font-family="sans-serif" font-size="9" font-weight="700" fill="white" text-anchor="middle" text-transform="uppercase">${char.rarity.toUpperCase()}</text>
      </svg>`
    );
    composites.push({
      input: badgeSvg,
      left: Math.round(PADDING + col * CELL_W + (CELL_W - badgeW) / 2),
      top: Math.round(nameY + 22),
    });
  }

  // Check for collection logo
  const logoPath = path.join(ROOT, "public", "products", "logos", `${data.collection}-logo.png`);
  if (fs.existsSync(logoPath)) {
    const logoResized = await sharp(logoPath)
      .resize(200, 80, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    composites.push({ input: logoResized, left: WIDTH - 220, top: 10 });
  }

  // Apply all composites
  const result = await composite
    .composite(composites)
    .png({ quality: 90, compressionLevel: 8 })
    .toBuffer();

  const outDir = path.join(ROOT, "public", "products", "previews");
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `${packId}-characters.png`);
  fs.writeFileSync(outPath, result);

  const sizeMB = (result.length / (1024 * 1024)).toFixed(2);
  console.log(`Done: ${outPath} (${sizeMB}MB)`);
  console.log(`  ${composites.length} layers composited`);
}

function escXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function formatCollection(col: string): string {
  return col
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

main().catch((e) => {
  console.error(`Error: ${e.message}`);
  process.exit(1);
});
