#!/usr/bin/env npx tsx
/**
 * BlindBox Creator - AI Model Bake-Off
 * Compares image quality across 3 models for character art generation
 *
 * Usage: npx tsx scripts/bake-off.ts
 * Env: OPENROUTER_API_KEY (required), FAL_API_KEY (optional, for Flux)
 * Cost: ~$0.39 total (9 images)
 */

import fs from "fs";
import path from "path";

const OUTPUT_DIR = path.resolve(__dirname, "..", "packs", "bake-off");
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
const FAL_KEY = process.env.FAL_API_KEY;

// ── Prompt template suffix (matches existing generate API style) ──
const PROMPT_SUFFIX = ", Japanese blind box collectible figure style, soft pastel color palette, adorable big sparkly eyes, simple clean bold outlines, pure white background, high quality cute illustration, print-ready for cardstock, high contrast vibrant colors, thick outlines for easy cutting, solid color fills, centered composition, full body character standing on small base";

// ── Test prompts (1 per rarity tier) ──
const TEST_PROMPTS: Record<string, string> = {
  common: `Kawaii chibi tabby cat character, sitting pose, orange and brown stripes, big sparkly green eyes, wearing a tiny bell collar${PROMPT_SUFFIX}`,
  rare: `Kawaii chibi Persian cat character, standing pose, fluffy white fur with pink bow, big sparkly blue eyes, holding a tiny fish toy${PROMPT_SUFFIX}`,
  legendary: `Kawaii chibi galaxy cat character, magical floating pose, cosmic purple and starry fur with golden sparkles, big sparkly rainbow eyes, tiny crown and cape, pastel colors with gold accents${PROMPT_SUFFIX}`,
};

// ── Models to test ──
const MODELS = [
  {
    id: "gemini-flash",
    name: "Gemini 2.5 Flash Image",
    model: "google/gemini-2.5-flash-image",
    provider: "openrouter" as const,
    costPerImage: 0.02,
  },
  {
    id: "gemini-pro",
    name: "Gemini 3 Pro Image",
    model: "google/gemini-3-pro-image-preview",
    provider: "openrouter" as const,
    costPerImage: 0.07,
  },
  {
    id: "flux-pro",
    name: "Flux 1.1 Pro",
    model: "fal-ai/flux-pro/v1.1",
    provider: "fal" as const,
    costPerImage: 0.04,
  },
];

// ── OpenRouter image generation ──
async function generateOpenRouter(prompt: string, model: string): Promise<Buffer | null> {
  if (!OPENROUTER_KEY) {
    console.log("  ⚠️  No OPENROUTER_API_KEY set");
    return null;
  }

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://blindbox-creator.vercel.app",
      "X-Title": "BlindBox Creator Bake-Off",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: `Generate an image: ${prompt}` }],
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "unknown");
    console.log(`  ❌ API error ${res.status}: ${errText.slice(0, 200)}`);
    return null;
  }

  const data = await res.json();
  const msg = data?.choices?.[0]?.message;

  // Images in message.images[] array (Gemini format)
  if (msg?.images && Array.isArray(msg.images) && msg.images.length > 0) {
    const imgData = msg.images[0];
    if (imgData?.image_url?.url) {
      const base64 = imgData.image_url.url.replace(/^data:image\/\w+;base64,/, "");
      return Buffer.from(base64, "base64");
    }
  }

  // Some models return base64 in content
  const content = msg?.content;
  if (typeof content === "string" && content.startsWith("data:image")) {
    const base64 = content.replace(/^data:image\/\w+;base64,/, "");
    return Buffer.from(base64, "base64");
  }

  console.log("  ❌ No image in response. Keys:", Object.keys(msg || {}));
  return null;
}

// ── fal.ai Flux generation ──
async function generateFal(prompt: string): Promise<Buffer | null> {
  if (!FAL_KEY) {
    console.log("  ⚠️  No FAL_API_KEY set - skipping Flux");
    return null;
  }

  try {
    // Submit to queue
    const submitRes = await fetch("https://queue.fal.run/fal-ai/flux-pro/v1.1", {
      method: "POST",
      headers: {
        Authorization: `Key ${FAL_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        image_size: "square_hd",
        num_images: 1,
        enable_safety_checker: true,
      }),
    });

    if (!submitRes.ok) {
      console.log(`  ❌ fal.ai error ${submitRes.status}: ${(await submitRes.text()).slice(0, 200)}`);
      return null;
    }

    const submitData = await submitRes.json();

    // Direct result (no queue)
    if (submitData?.images?.[0]?.url) {
      const imgRes = await fetch(submitData.images[0].url);
      return Buffer.from(await imgRes.arrayBuffer());
    }

    // Queue-based: poll for completion
    if (submitData?.request_id) {
      console.log("  ⏳ Queued, polling...");
      for (let i = 0; i < 60; i++) {
        await new Promise((r) => setTimeout(r, 2000));
        const statusRes = await fetch(
          `https://queue.fal.run/fal-ai/flux-pro/v1.1/requests/${submitData.request_id}/status`,
          { headers: { Authorization: `Key ${FAL_KEY}` } }
        );
        const status = await statusRes.json();

        if (status.status === "COMPLETED") {
          const resultRes = await fetch(
            `https://queue.fal.run/fal-ai/flux-pro/v1.1/requests/${submitData.request_id}`,
            { headers: { Authorization: `Key ${FAL_KEY}` } }
          );
          const result = await resultRes.json();
          if (result?.images?.[0]?.url) {
            const imgRes = await fetch(result.images[0].url);
            return Buffer.from(await imgRes.arrayBuffer());
          }
          break;
        }
        if (status.status === "FAILED") {
          console.log("  ❌ Generation failed in queue");
          return null;
        }
      }
    }

    console.log("  ❌ No image in response");
    return null;
  } catch (e: unknown) {
    console.log(`  ❌ fal.ai error: ${(e as Error).message}`);
    return null;
  }
}

// ── Main ──
async function main() {
  console.log("🎨 BlindBox Creator - AI Model Bake-Off");
  console.log("═══════════════════════════════════════\n");
  console.log(`📁 Output: ${OUTPUT_DIR}`);
  console.log(`🔑 OpenRouter: ${OPENROUTER_KEY ? "✅" : "❌ missing"}`);
  console.log(`🔑 fal.ai: ${FAL_KEY ? "✅" : "⚠️  missing (Flux will be skipped)"}`);

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  type Result = { success: boolean; size: number; timeMs: number };
  const results: Record<string, Record<string, Result>> = {};
  let totalCost = 0;
  let successCount = 0;

  for (const [tier, prompt] of Object.entries(TEST_PROMPTS)) {
    console.log(`\n📦 ${tier.toUpperCase()} tier character`);
    console.log(`   Prompt: ${prompt.slice(0, 80)}...`);
    results[tier] = {};

    for (const model of MODELS) {
      const filename = `${tier}-${model.id}.png`;
      const filepath = path.join(OUTPUT_DIR, filename);

      process.stdout.write(`  🔄 ${model.name.padEnd(20)}`);
      const start = Date.now();

      let imageBuffer: Buffer | null = null;
      if (model.provider === "openrouter") {
        imageBuffer = await generateOpenRouter(prompt, model.model);
      } else if (model.provider === "fal") {
        imageBuffer = await generateFal(prompt);
      }

      const elapsed = Date.now() - start;

      if (imageBuffer) {
        fs.writeFileSync(filepath, imageBuffer);
        const sizeMB = (imageBuffer.length / 1024 / 1024).toFixed(2);
        console.log(`✅ ${sizeMB}MB in ${(elapsed / 1000).toFixed(1)}s → ${filename}`);
        results[tier][model.id] = { success: true, size: imageBuffer.length, timeMs: elapsed };
        totalCost += model.costPerImage;
        successCount++;
      } else {
        results[tier][model.id] = { success: false, size: 0, timeMs: elapsed };
      }
    }
  }

  // ── Results summary ──
  console.log("\n\n═══════════════════════════════════════");
  console.log("📊 BAKE-OFF RESULTS SUMMARY");
  console.log("═══════════════════════════════════════\n");

  const header = "Model                | Common | Rare   | Legend | Avg Time  | $/img";
  const divider = "─────────────────────|────────|────────|────────|───────────|──────";
  console.log(header);
  console.log(divider);

  for (const model of MODELS) {
    const cells = Object.keys(TEST_PROMPTS).map((tier) => {
      const r = results[tier]?.[model.id];
      return r?.success ? "  ✅  " : "  ❌  ";
    });

    const times = Object.values(results)
      .map((mr) => mr[model.id]?.timeMs || 0)
      .filter((t) => t > 0);
    const avgMs = times.length > 0 ? times.reduce((a, b) => a + b, 0) / times.length : 0;
    const avgStr = avgMs > 0 ? `${(avgMs / 1000).toFixed(1)}s`.padStart(7) : "  N/A  ";

    console.log(`${model.name.padEnd(21)}|${cells.join("|")} | ${avgStr}   | $${model.costPerImage.toFixed(2)}`);
  }

  console.log(`\n💰 Total spent: $${totalCost.toFixed(2)} (${successCount}/9 images generated)`);
  console.log(`📁 Images saved: ${OUTPUT_DIR}/`);

  console.log("\n🔍 EVALUATION CRITERIA (compare images side-by-side):");
  console.log("   1. Kawaii style accuracy - cute chibi proportions, oversized head, big eyes");
  console.log("   2. Background cleanliness - pure white, no gray tones or scene elements");
  console.log("   3. Outline boldness - thick black outlines suitable for kid scissors");
  console.log("   4. Color vibrancy - bright, saturated, will print well on cardstock");
  console.log("   5. Cross-character consistency - do they look like same series?");
  console.log("   6. AI artifact rate - extra limbs, garbled features, asymmetry");
  console.log("   7. Resolution quality - sharp details at zoom, no blur/noise");

  // Save machine-readable results
  const resultsPath = path.join(OUTPUT_DIR, "results.json");
  fs.writeFileSync(
    resultsPath,
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        models: MODELS,
        prompts: TEST_PROMPTS,
        results,
        totalCost,
        successCount,
      },
      null,
      2
    )
  );
  console.log(`\n📋 Machine-readable results: ${resultsPath}`);

  // Open folder for visual comparison
  if (process.platform === "darwin") {
    const { execSync } = await import("child_process");
    try {
      execSync(`open "${OUTPUT_DIR}"`);
      console.log("\n🖼️  Opened output folder for visual comparison");
    } catch {}
  }
}

main().catch((e) => {
  console.error("❌ Fatal error:", e);
  process.exit(1);
});
