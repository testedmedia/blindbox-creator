#!/usr/bin/env npx tsx
/**
 * Generate 3 universal Step 1/2/3 "how to use" images
 * These are shared across ALL 75 product pages
 */
import fs from "fs";
import path from "path";

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "products", "steps");
const API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = "google/gemini-3-pro-image-preview";

const STEPS = [
  {
    file: "step-1-print.png",
    prompt:
      "A cute kawaii style product photography showing Step 1 PRINT. A pastel pink home printer printing colorful kawaii character trading cards on thick white cardstock paper. Cute chibi animal characters visible on the printed cards emerging from the printer. Clean white desk surface, soft natural lighting, minimal props, shallow depth of field, professional product photography, warm inviting colors, soft shadows, no text no words no labels no watermarks no UI elements",
  },
  {
    file: "step-2-cut.png",
    prompt:
      "A cute kawaii style product photography showing Step 2 CUT AND FOLD. Child's hands using colorful kid-safe scissors to carefully cut along the outline of a printed kawaii chibi cat character card on a pastel pink cutting mat. Several already-cut character cards nearby. A partially folded pastel colored small gift box visible in the background. Clean white desk surface, soft natural lighting, professional product photography, warm inviting colors, no text no words no labels no watermarks no UI elements",
  },
  {
    file: "step-3-surprise.png",
    prompt:
      "A cute kawaii style product photography showing Step 3 SURPRISE REVEAL. A child's excited hands lifting the lid of a small pastel colored handmade blind box gift box, revealing a cute kawaii chibi cat character card inside. Sparkle effects and tiny star decorations scattered around. Joy and excitement energy. Other sealed boxes in soft pastel pink blue and yellow colors in background. Clean white surface, soft natural lighting, professional product photography, warm colors, no text no words no labels no watermarks no UI elements",
  },
];

async function generateStep(step: (typeof STEPS)[0]): Promise<boolean> {
  const outPath = path.join(OUT_DIR, step.file);
  console.log(`🎨 Generating ${step.file}...`);
  const start = Date.now();

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://blindbox-creator.vercel.app",
      "X-Title": "BlindBox Creator Steps",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "user", content: `Generate an image: ${step.prompt}` }],
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
  console.log(`   ✅ ${step.file} - ${sizeMB}MB in ${elapsed}s`);
  return true;
}

async function main() {
  if (!API_KEY) {
    console.error("❌ OPENROUTER_API_KEY not set");
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  console.log("🖼️  Generating 3 universal Step images (Gemini 3 Pro)\n");

  let success = 0;
  for (const step of STEPS) {
    const ok = await generateStep(step);
    if (ok) success++;
    await new Promise((r) => setTimeout(r, 1500));
  }

  console.log(`\n✅ Done: ${success}/3 step images generated`);
  console.log(`📁 Output: ${OUT_DIR}/`);
}

main().catch(console.error);
