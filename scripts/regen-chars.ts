#!/usr/bin/env npx tsx
/**
 * Regenerate specific characters with enhanced prompts
 */
import fs from "fs";
import path from "path";

const ROOT = path.resolve(__dirname, "..");
const API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = "google/gemini-3-pro-image-preview";

const SUFFIX =
  ", Japanese blind box collectible figure style, soft pastel color palette, adorable big sparkly eyes, " +
  "simple clean bold outlines, pure white background, high quality cute illustration, print-ready for cardstock, " +
  "high contrast vibrant colors, thick outlines for easy cutting, solid color fills, centered composition, " +
  "full body character standing on small base, absolutely no text no labels no words no watermarks no lettering " +
  "no software interface no UI elements no application chrome";

const CHARS_TO_REGEN: Record<string, string> = {};

async function generate(charId: string, prompt: string): Promise<boolean> {
  const outPath = path.join(ROOT, "packs", "chibi-kitty-club", "characters", `${charId}.png`);

  console.log(`🎨 Regenerating ${charId}...`);
  const start = Date.now();

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://blindbox-creator.vercel.app",
      "X-Title": "BlindBox Creator Regen",
    },
    body: JSON.stringify({
      model: MODEL,
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

  if (msg?.images && Array.isArray(msg.images) && msg.images.length > 0) {
    const imgObj = msg.images[0];
    if (imgObj?.image_url?.url) imageData = imgObj.image_url.url;
  }
  if (!imageData && typeof msg?.content === "string" && msg.content.startsWith("data:image")) {
    imageData = msg.content;
  }

  if (!imageData) {
    console.log(`   ❌ No image in response. Keys: ${Object.keys(msg || {}).join(", ")}`);
    return false;
  }

  const base64Part = imageData.includes(",") ? imageData.split(",")[1] : imageData;
  const imgBuffer = Buffer.from(base64Part, "base64");
  fs.writeFileSync(outPath, imgBuffer);

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  const sizeMB = (imgBuffer.length / (1024 * 1024)).toFixed(2);
  console.log(`   ✅ ${charId} - ${sizeMB}MB in ${elapsed}s`);
  return true;
}

async function main() {
  if (!API_KEY) {
    console.error("❌ OPENROUTER_API_KEY not set");
    process.exit(1);
  }

  console.log("🔄 Regenerating characters with enhanced prompts (single pose, no text)\n");

  let success = 0;
  for (const [charId, prompt] of Object.entries(CHARS_TO_REGEN)) {
    const ok = await generate(charId, prompt);
    if (ok) success++;
    await new Promise((r) => setTimeout(r, 1000));
  }

  console.log(`\n✅ Done: ${success}/${Object.keys(CHARS_TO_REGEN).length} regenerated successfully`);
}

main().catch(console.error);
