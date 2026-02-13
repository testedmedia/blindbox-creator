import { NextRequest, NextResponse } from "next/server";

function getOpenRouter() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return null;
  return { apiKey, baseURL: "https://openrouter.ai/api/v1" };
}

const RARITIES = [
  { name: "Common", chance: 0.60, color: "#9CA3AF", effect: "none" },
  { name: "Rare", chance: 0.25, color: "#3B82F6", effect: "glow" },
  { name: "Epic", chance: 0.10, color: "#8B5CF6", effect: "sparkle" },
  { name: "Legendary", chance: 0.05, color: "#F59E0B", effect: "shimmer" },
];

function rollRarity() {
  const roll = Math.random();
  let cumulative = 0;
  for (const r of RARITIES) {
    cumulative += r.chance;
    if (roll <= cumulative) return r;
  }
  return RARITIES[0];
}

// Fallback sample characters when all APIs are unavailable
const SAMPLE_CHARACTERS = [
  { id: "chibi-kitty-club", name: "Chibi Kitty Club", image: "/products/packs/chibi-kitty-club.png" },
  { id: "chibi-bunny-garden", name: "Chibi Bunny Garden", image: "/products/packs/chibi-bunny-garden.png" },
  { id: "unicorn-dreams", name: "Unicorn Dreams", image: "/products/packs/unicorn-dreams.png" },
  { id: "dragon-nursery", name: "Dragon Nursery", image: "/products/packs/dragon-nursery.png" },
  { id: "crystal-fairies", name: "Crystal Fairies", image: "/products/packs/crystal-fairies.png" },
  { id: "moon-rabbit", name: "Moon Rabbit", image: "/products/packs/moon-rabbit.png" },
  { id: "fairy-tale-princesses", name: "Fairy Tale Princesses", image: "/products/packs/fairy-tale-princesses.png" },
  { id: "witch-academy", name: "Witch Academy", image: "/products/packs/witch-academy.png" },
  { id: "chibi-fox-festival", name: "Chibi Fox Festival", image: "/products/packs/chibi-fox-festival.png" },
  { id: "mahou-shoujo", name: "Mahou Shoujo Stars", image: "/products/packs/mahou-shoujo.png" },
  { id: "ninja-cuties", name: "Ninja Cuties", image: "/products/packs/ninja-cuties.png" },
  { id: "pegasus-sky", name: "Pegasus Sky Riders", image: "/products/packs/pegasus-sky.png" },
];

function getFallbackCharacter() {
  const sample = SAMPLE_CHARACTERS[Math.floor(Math.random() * SAMPLE_CHARACTERS.length)];
  const rarity = rollRarity();
  return {
    imageUrl: sample.image,
    rarity: rarity.name,
    rarityColor: rarity.color,
    rarityEffect: rarity.effect,
    revisedPrompt: `Sample character from ${sample.name} collection`,
    id: crypto.randomUUID(),
    isSample: true,
    samplePack: sample.id,
  };
}

// Generate image using Gemini via OpenRouter
// Response format: message.images[] contains {type: "image_url", image_url: {url: "data:image/png;base64,..."}}
async function generateWithGemini(prompt: string, model: string = "google/gemini-2.5-flash-image"): Promise<string | null> {
  const or = getOpenRouter();
  if (!or) return null;

  const res = await fetch(`${or.baseURL}/chat/completions`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${or.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error(`Gemini ${model} failed (${res.status}):`, errText);
    return null;
  }

  const data = await res.json();
  const msg = data?.choices?.[0]?.message;

  // Images come in message.images[] array
  if (msg?.images && Array.isArray(msg.images) && msg.images.length > 0) {
    const img = msg.images[0];
    if (img?.image_url?.url) {
      return img.image_url.url; // base64 data URL
    }
  }

  return null;
}

// Describe a reference image using vision model via OpenRouter
async function describeImage(base64Url: string): Promise<string> {
  const or = getOpenRouter();
  if (!or) return "";

  try {
    const res = await fetch(`${or.baseURL}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${or.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001",
        messages: [{
          role: "user",
          content: [
            { type: "text", text: "Describe this image in 2-3 sentences for an AI art generator. Focus on the main subject, their pose/action, outfit, and setting. Be specific and vivid." },
            { type: "image_url", image_url: { url: base64Url, detail: "low" } },
          ],
        }],
        max_tokens: 200,
      }),
    });

    if (!res.ok) return "";
    const data = await res.json();
    return data?.choices?.[0]?.message?.content || "";
  } catch {
    return "";
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, theme, referenceImage } = body;

    if (!prompt && !referenceImage) {
      return NextResponse.json({ error: "Please provide a description or upload a photo" }, { status: 400 });
    }

    if (prompt && (typeof prompt !== "string" || prompt.length > 500)) {
      return NextResponse.json({ error: "Prompt must be under 500 characters" }, { status: 400 });
    }

    // If reference image uploaded, describe it with vision
    let imageDescription = "";
    if (referenceImage && typeof referenceImage === "string") {
      imageDescription = await describeImage(referenceImage);
    }

    // Build the generation prompt
    const themeStr = theme ? `${theme} aesthetic, ` : "";
    const subject = imageDescription
      ? `based on this reference: ${imageDescription}. Reimagined as a kawaii chibi ${prompt || "character"}`
      : `${prompt}`;

    const genPrompt = `Generate an image: Kawaii chibi ${subject}, Japanese blind box collectible figure style, ${themeStr}soft pastel color palette, adorable big sparkly eyes, simple clean bold outlines, pure white background, high quality cute illustration, print-ready for cardstock, high contrast vibrant colors, thick outlines for easy cutting, solid color fills, no gradients, no fine details, designed to be printed and cut out, centered composition, full body character standing on small base`;

    // Try Gemini 2.5 Flash Image (cheapest, fastest)
    const imageUrl = await generateWithGemini(genPrompt, "google/gemini-2.5-flash-image");

    if (imageUrl) {
      const rarity = rollRarity();
      return NextResponse.json({
        imageUrl,
        rarity: rarity.name,
        rarityColor: rarity.color,
        rarityEffect: rarity.effect,
        revisedPrompt: genPrompt.slice(0, 200),
        id: crypto.randomUUID(),
      });
    }

    // Fallback: try Gemini 3 Pro Image
    const imageUrl2 = await generateWithGemini(genPrompt, "google/gemini-3-pro-image-preview");
    if (imageUrl2) {
      const rarity = rollRarity();
      return NextResponse.json({
        imageUrl: imageUrl2,
        rarity: rarity.name,
        rarityColor: rarity.color,
        rarityEffect: rarity.effect,
        revisedPrompt: genPrompt.slice(0, 200),
        id: crypto.randomUUID(),
      });
    }

    // All generation methods failed
    console.log("All image generation failed, returning sample character");
    return NextResponse.json(getFallbackCharacter());
  } catch (error: unknown) {
    console.error("Generation error:", error);
    return NextResponse.json(getFallbackCharacter());
  }
}
