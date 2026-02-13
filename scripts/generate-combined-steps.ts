#!/usr/bin/env npx tsx
/**
 * Generate a SINGLE combined step 1/2/3 graphic
 * Emphasizes: box covers are the main product, cut-out characters are secondary
 * Output: 1200x800 horizontal image showing all 3 steps
 */
import fs from "fs";
import path from "path";

const ROOT = path.resolve(__dirname, "..");
const API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = "google/gemini-3-pro-image-preview";

const PROMPT = `Generate a single wide horizontal infographic image showing 3 easy steps to make kawaii blind boxes. The image should be divided into 3 equal panels side by side with a soft pastel pink gradient background.

LEFT PANEL - "Step 1: PRINT"
Show a cute pink home printer printing out colorful blind box cover sheets and character trading cards. The printed sheets show adorable kawaii designs with pastel colors. A small pink heart icon with "1" inside it.

CENTER PANEL - "Step 2: CUT & GLUE"
Show kid-safe scissors cutting along printed box cover sheets on a clean white crafting mat. A small bottle of glue stick nearby. A partially assembled box with a cute kawaii box cover being wrapped around it. The box cover design is the star - it should be colorful and adorable with chibi characters printed on it. A small pink heart icon with "2" inside it.

RIGHT PANEL - "Step 3: SURPRISE!"
Show a completed assembled blind box (small pastel cube with cute kawaii art on all sides) being opened by small hands. Inside is a character card peeking out. Sparkles and stars around it showing excitement. Multiple completed blind boxes in background. A small pink heart icon with "3" inside it.

Overall style: Warm inviting photography style, soft natural lighting, clean white surface, shallow depth of field, pastel pink and white color scheme, cute kawaii aesthetic, professional product photography. No watermarks, no UI elements, no text overlays. The steps should flow left to right showing the crafting journey. The BOX COVERS with cute designs are the hero of the image - they should be the most prominent visual element.`;

async function main() {
  if (!API_KEY) {
    console.error("OPENROUTER_API_KEY not set");
    process.exit(1);
  }

  const outDir = path.join(ROOT, "public", "products", "steps");
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "how-it-works.png");

  console.log("Generating combined steps graphic (Gemini 3 Pro)...");
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
      messages: [{ role: "user", content: `Generate an image: ${PROMPT}` }],
    }),
  });

  if (!res.ok) {
    console.log(`API error ${res.status}: ${(await res.text()).slice(0, 200)}`);
    process.exit(1);
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
    console.log(`No image in response. Keys: ${Object.keys(msg || {}).join(", ")}`);
    process.exit(1);
  }

  const base64Part = imageData.includes(",") ? imageData.split(",")[1] : imageData;
  const imgBuffer = Buffer.from(base64Part, "base64");
  fs.writeFileSync(outPath, imgBuffer);

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  const sizeKB = (imgBuffer.length / 1024).toFixed(0);
  console.log(`Done: how-it-works.png (${sizeKB}KB, ${elapsed}s)`);
  console.log(`Output: ${outPath}`);
}

main().catch(console.error);
