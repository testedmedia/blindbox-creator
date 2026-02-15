#!/usr/bin/env npx tsx
/**
 * Batch regenerate all pack product images as PAPER CRAFT style
 * Shows: folded cardstock boxes, printed template sheets, scissors, glue
 * NOT: vinyl toys, plastic figures, cylindrical containers
 */
import fs from "fs";
import path from "path";

const ROOT = path.resolve(__dirname, "..");
const API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = "google/gemini-2.5-flash-preview-05-20";
const PACKS_DIR = path.join(ROOT, "public", "products", "packs");

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

// All 75 packs with their names and collections
const ALL_PACKS = [
  { id: "chibi-kitty-club", name: "Chibi Kitty Club", col: "chibi-animals" },
  { id: "chibi-puppy-parade", name: "Chibi Puppy Parade", col: "chibi-animals" },
  { id: "chibi-bunny-garden", name: "Chibi Bunny Garden", col: "chibi-animals" },
  { id: "chibi-hamster-house", name: "Chibi Hamster House", col: "chibi-animals" },
  { id: "chibi-panda-cafe", name: "Chibi Panda Cafe", col: "chibi-animals" },
  { id: "chibi-fox-festival", name: "Chibi Fox Festival", col: "chibi-animals" },
  { id: "chibi-penguin-winter", name: "Chibi Penguin Winter", col: "chibi-animals" },
  { id: "chibi-duck-pond", name: "Chibi Duck Pond", col: "chibi-animals" },
  { id: "chibi-deer-meadow", name: "Chibi Deer Meadow", col: "chibi-animals" },
  { id: "chibi-bear-picnic", name: "Chibi Bear Picnic", col: "chibi-animals" },
  { id: "strawberry-shortcake", name: "Strawberry Shortcake Friends", col: "sweet-bakery" },
  { id: "donut-dreamland", name: "Donut Dreamland", col: "sweet-bakery" },
  { id: "mochi-squad", name: "Mochi Squad", col: "sweet-bakery" },
  { id: "macaron-tower", name: "Macaron Tower", col: "sweet-bakery" },
  { id: "bubble-tea-club", name: "Bubble Tea Club", col: "sweet-bakery" },
  { id: "candy-kingdom", name: "Candy Kingdom", col: "sweet-bakery" },
  { id: "ice-cream-parlor", name: "Ice Cream Parlor", col: "sweet-bakery" },
  { id: "cake-pop-party", name: "Cake Pop Party", col: "sweet-bakery" },
  { id: "sakura-spirits", name: "Sakura Spirits", col: "cherry-blossom" },
  { id: "hanami-picnic", name: "Hanami Picnic", col: "cherry-blossom" },
  { id: "garden-fairies", name: "Garden Fairies", col: "cherry-blossom" },
  { id: "mushroom-village", name: "Mushroom Village", col: "cherry-blossom" },
  { id: "rainy-day-friends", name: "Rainy Day Friends", col: "cherry-blossom" },
  { id: "sunflower-sunshine", name: "Sunflower Sunshine", col: "cherry-blossom" },
  { id: "autumn-leaves", name: "Autumn Leaves Collection", col: "cherry-blossom" },
  { id: "zen-garden", name: "Zen Garden", col: "cherry-blossom" },
  { id: "mahou-shoujo", name: "Mahou Shoujo Stars", col: "magical-girls" },
  { id: "witch-academy", name: "Witch Academy", col: "magical-girls" },
  { id: "fairy-tale-princesses", name: "Fairy Tale Princesses", col: "magical-girls" },
  { id: "ninja-cuties", name: "Ninja Cuties", col: "magical-girls" },
  { id: "samurai-sweethearts", name: "Samurai Sweethearts", col: "magical-girls" },
  { id: "idol-stage", name: "Idol Stage", col: "magical-girls" },
  { id: "wizard-workshop", name: "Wizard Workshop", col: "magical-girls" },
  { id: "moon-rabbit", name: "Moon Rabbit", col: "celestial" },
  { id: "star-guardians", name: "Star Guardians", col: "celestial" },
  { id: "galaxy-dreamers", name: "Galaxy Dreamers", col: "celestial" },
  { id: "sun-and-moon", name: "Sun & Moon Twins", col: "celestial" },
  { id: "cloud-kingdom", name: "Cloud Kingdom", col: "celestial" },
  { id: "aurora-dancers", name: "Aurora Dancers", col: "celestial" },
  { id: "comet-riders", name: "Comet Riders", col: "celestial" },
  { id: "jellyfish-ballet", name: "Jellyfish Ballet", col: "ocean-kawaii" },
  { id: "mermaid-cove", name: "Mermaid Cove", col: "ocean-kawaii" },
  { id: "whale-lullaby", name: "Whale Lullaby", col: "ocean-kawaii" },
  { id: "seahorse-carousel", name: "Seahorse Carousel", col: "ocean-kawaii" },
  { id: "otter-splash", name: "Otter Splash", col: "ocean-kawaii" },
  { id: "coral-reef-city", name: "Coral Reef City", col: "ocean-kawaii" },
  { id: "turtle-island", name: "Turtle Island", col: "ocean-kawaii" },
  { id: "tanuki-town", name: "Tanuki Town", col: "forest-friends" },
  { id: "owl-library", name: "Owl Library", col: "forest-friends" },
  { id: "squirrel-bakery", name: "Squirrel Bakery", col: "forest-friends" },
  { id: "hedgehog-garden", name: "Hedgehog Garden", col: "forest-friends" },
  { id: "firefly-festival", name: "Firefly Festival", col: "forest-friends" },
  { id: "raccoon-camp", name: "Raccoon Camp", col: "forest-friends" },
  { id: "frog-choir", name: "Frog Choir", col: "forest-friends" },
  { id: "unicorn-dreams", name: "Unicorn Dreams", col: "pastel-fantasy" },
  { id: "dragon-nursery", name: "Dragon Nursery", col: "pastel-fantasy" },
  { id: "pegasus-sky", name: "Pegasus Sky Riders", col: "pastel-fantasy" },
  { id: "crystal-fairies", name: "Crystal Fairies", col: "pastel-fantasy" },
  { id: "phoenix-garden", name: "Phoenix Garden", col: "pastel-fantasy" },
  { id: "spirit-lanterns", name: "Spirit Lanterns", col: "pastel-fantasy" },
  { id: "dream-catchers", name: "Dream Catchers", col: "pastel-fantasy" },
  { id: "onigiri-friends", name: "Onigiri Friends", col: "food-cuties" },
  { id: "sushi-squad", name: "Sushi Squad", col: "food-cuties" },
  { id: "ramen-bowl", name: "Ramen Bowl Gang", col: "food-cuties" },
  { id: "bento-box", name: "Bento Box Collection", col: "food-cuties" },
  { id: "taiyaki-town", name: "Taiyaki Town", col: "food-cuties" },
  { id: "dango-trio", name: "Dango Trio", col: "food-cuties" },
  { id: "wagashi-garden", name: "Wagashi Garden", col: "food-cuties" },
  { id: "sakura-spring", name: "Sakura Spring", col: "seasonal" },
  { id: "summer-matsuri", name: "Summer Matsuri", col: "seasonal" },
  { id: "autumn-tsukimi", name: "Autumn Moon Viewing", col: "seasonal" },
  { id: "winter-onsen", name: "Winter Onsen", col: "seasonal" },
  { id: "valentines-kawaii", name: "Valentine's Kawaii", col: "seasonal" },
  { id: "tanabata-wishes", name: "Tanabata Star Festival", col: "seasonal" },
  { id: "new-year-osechi", name: "New Year Osechi", col: "seasonal" },
];

function paperCraftPrompt(packName: string, collection: string): string {
  const theme = collectionThemes[collection] || "cute pastel tones";
  return `Professional product photography of a paper craft blind box kit called "${packName}". On a clean white surface: two small handmade paper boxes (3 inch cubes, folded from printed cardstock) with kawaii ${packName.toLowerCase()} character art printed on all sides in ${theme}. Next to the boxes sits a printed template sheet showing the fold lines and cut marks. A pair of child-safe scissors and a glue stick are placed nearby. One box is assembled and closed, one is partially folded showing the construction. Soft natural lighting, shallow depth of field, overhead angle, craft desk aesthetic. This is a PAPER CRAFT product, NOT a vinyl toy. The boxes are made of PRINTED CARDSTOCK that has been cut and folded by hand. Clean white background, warm inviting colors, professional product shot, high quality illustration.`;
}

async function generateImage(packId: string, prompt: string): Promise<boolean> {
  const outPath = path.join(PACKS_DIR, `${packId}.png`);
  const start = Date.now();

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://blindbox-creator.vercel.app",
      "X-Title": "BlindBox Creator Paper Craft Regen",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "user", content: `Generate an image: ${prompt}` }],
    }),
  });

  if (!res.ok) {
    const errText = (await res.text()).slice(0, 200);
    console.log(`   ❌ API error ${res.status}: ${errText}`);
    return false;
  }

  const data = await res.json();
  const msg = data?.choices?.[0]?.message;
  let imageData: string | null = null;

  // Try multiple extraction paths
  if (msg?.images && Array.isArray(msg.images) && msg.images.length > 0) {
    const imgObj = msg.images[0];
    if (imgObj?.image_url?.url) imageData = imgObj.image_url.url;
  }
  if (!imageData && typeof msg?.content === "string") {
    if (msg.content.startsWith("data:image")) {
      imageData = msg.content;
    } else {
      // Try to find base64 in content parts
      const match = msg.content.match(/data:image\/[^;]+;base64,[A-Za-z0-9+/=]+/);
      if (match) imageData = match[0];
    }
  }
  // Check parts array (Gemini format)
  if (!imageData && msg?.content && Array.isArray(msg.content)) {
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
  console.log(`   ✅ ${packId}.png (${sizeKB}KB, ${elapsed}s)`);
  return true;
}

async function main() {
  if (!API_KEY) {
    console.error("❌ Set OPENROUTER_API_KEY in .env.local");
    process.exit(1);
  }

  // Parse --start=N to resume from pack N (0-indexed)
  const startArg = process.argv.find(a => a.startsWith("--start="));
  const startIdx = startArg ? parseInt(startArg.split("=")[1]) : 0;

  // Parse --only=id1,id2 to only do specific packs
  const onlyArg = process.argv.find(a => a.startsWith("--only="));
  const onlyIds = onlyArg ? onlyArg.split("=")[1].split(",") : null;

  const packs = onlyIds
    ? ALL_PACKS.filter(p => onlyIds.includes(p.id))
    : ALL_PACKS.slice(startIdx);

  console.log(`\n🎨 Paper Craft Image Regeneration`);
  console.log(`   Model: ${MODEL}`);
  console.log(`   Packs: ${packs.length} (starting from index ${startIdx})`);
  console.log(`   Est cost: ~$${(packs.length * 0.04).toFixed(2)}\n`);

  let success = 0;
  let failed = 0;
  const failures: string[] = [];

  for (let i = 0; i < packs.length; i++) {
    const pack = packs[i];
    const prompt = paperCraftPrompt(pack.name, pack.col);
    console.log(`[${i + 1}/${packs.length}] 🎨 ${pack.name} (${pack.id})`);

    const ok = await generateImage(pack.id, prompt);
    if (ok) {
      success++;
    } else {
      failed++;
      failures.push(pack.id);
    }

    // Rate limit: 1.5s between requests
    if (i < packs.length - 1) {
      await new Promise(r => setTimeout(r, 1500));
    }
  }

  console.log(`\n════════════════════════════════════`);
  console.log(`✅ Success: ${success}/${packs.length}`);
  if (failed > 0) {
    console.log(`❌ Failed: ${failed} - ${failures.join(", ")}`);
    console.log(`   Retry: npx tsx scripts/regen-paper-craft.ts --only=${failures.join(",")}`);
  }
  console.log(`════════════════════════════════════\n`);
}

main().catch(console.error);
