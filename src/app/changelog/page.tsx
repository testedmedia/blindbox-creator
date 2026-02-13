import type { Metadata } from "next";
import { SITE_NAME, VERSION } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Changelog",
  description: `${SITE_NAME} changelog. See what's new, what's improved, and what's coming next.`,
};

interface ChangelogEntry {
  version: string;
  title: string;
  date: string;
  changes: string[];
  tag?: "launch" | "feature" | "fix" | "improvement";
}

const changelog: ChangelogEntry[] = [
  {
    version: "3.4",
    title: "Paper Craft Product Images",
    date: "February 12, 2026",
    tag: "fix",
    changes: [
      "Product images now show PAPER blind boxes (the actual product), not vinyl/plastic toys",
      "12 packs regenerated with Gemini 3 Pro showing real paper crafts with scissors, glue, template sheets",
    ],
  },
  {
    version: "3.3",
    title: "Gemini 3 Pro Product Photography",
    date: "February 12, 2026",
    tag: "improvement",
    changes: [
      "All 75 pack product images regenerated with Google Gemini 3 Pro Image",
      "Photorealistic 3D vinyl figure renders with actual packaging boxes",
      "Studio lighting, shallow depth of field, collection name on packaging",
    ],
  },
  {
    version: "3.2",
    title: "Pack-Specific How-To-Build Steps",
    date: "February 12, 2026",
    tag: "feature",
    changes: [
      "Every product page has 3 pack-specific step-by-step build photos",
      "225 step images generated (75 packs x 3 steps)",
      "Consolidated from 4 steps to 3 cleaner steps",
    ],
  },
  {
    version: "3.1",
    title: "Product Preview Images + Real Deliverables",
    date: "February 12, 2026",
    tag: "feature",
    changes: [
      "Product detail pages now show pack-specific preview images",
      "What You Get gallery section showing actual deliverables",
      "225 product preview images (3 per pack) generated via Gemini",
      "Graceful fallback for missing preview images",
    ],
  },
  {
    version: "3.0",
    title: "All 75 Packs With Product Images",
    date: "February 12, 2026",
    tag: "feature",
    changes: [
      "Generated product images for all 49 remaining packs using Gemini 2.5 Flash",
      "All 75 template packs now show real kawaii product photography",
      "Removed PACKS_WITH_IMAGES filter - all packs are launch-ready",
    ],
  },
  {
    version: "2.8",
    title: "Gemini Image Generation",
    date: "February 12, 2026",
    tag: "improvement",
    changes: [
      "AI generator switched to Google Gemini 2.5 Flash Image via OpenRouter",
      "Fallback chain: Gemini 2.5 Flash -> Gemini 3 Pro -> sample characters",
      "Print page handles base64 images via sessionStorage",
      "Removed dead OpenAI DALL-E dependency",
    ],
  },
  {
    version: "2.7",
    title: "Full i18n + AI Generator Fix",
    date: "February 12, 2026",
    tag: "fix",
    changes: [
      "AI generator now uses dedicated image generation API key",
      "Home page fully translated (40+ keys)",
      "Create page fully translated (20+ keys)",
      "Footer fully translated",
    ],
  },
  {
    version: "2.6",
    title: "Spanish Language Support",
    date: "February 12, 2026",
    tag: "feature",
    changes: [
      "EN/ES language toggle in navbar",
      "i18n system with React Context + localStorage persistence",
      "Auto-detects browser language",
      "~100 translation keys covering all pages",
    ],
  },
  {
    version: "2.5",
    title: "Product Catalog, Fallback Generator, Pack Templates",
    date: "February 12, 2026",
    tag: "feature",
    changes: [
      "Full product catalog API with filtering",
      "Comprehensive product database (75 packs, 3 party kits, 2 classroom bundles)",
      "AI generator fallback returns sample characters instead of errors",
      "Pack-specific print templates",
      "Affiliate countdown banner with 24h urgency",
    ],
  },
  {
    version: "2.0",
    title: "Affiliate Infrastructure & Anti-Fraud",
    date: "February 12, 2026",
    tag: "feature",
    changes: [
      "RefTracker component with server-side click tracking",
      "$5 referral credit popup for referred visitors",
      "Privacy-safe IP hashing for fraud prevention",
      "30-day referral cookie + 24h credit cookie",
    ],
  },
  {
    version: "1.8",
    title: "AI Character Generator (Flagship Feature)",
    date: "February 12, 2026",
    tag: "feature",
    changes: [
      "AI-powered blind box character generator at /create",
      "Photo upload + text prompt modes",
      "6 theme options with rarity system",
      "Animated loading overlay with step-by-step progress",
      "Rate limiting: 3 free generations per day",
    ],
  },
  {
    version: "1.5",
    title: "Product Detail Pages + Family-Focused Copy",
    date: "February 12, 2026",
    tag: "feature",
    changes: [
      "Full product detail pages at /shop/[id] with image gallery",
      "Buy Now buttons open product pages instead of raw JSON",
      "All copy rewritten to be family-focused",
      "Parent+kid family crafting images added",
    ],
  },
  {
    version: "1.1",
    title: "Kawaii Pivot",
    date: "February 11, 2026",
    tag: "improvement",
    changes: [
      "Pivoted entire brand to Sanrio-inspired kawaii Japanese art style",
      "Expanded from 10 to 75 template packs (900+ chibi characters)",
      "10 themed collections added",
      "Ultimate Kawaii Collection mega bundle ($149.99, save 60%)",
    ],
  },
  {
    version: "1.0",
    title: "Launch Day",
    date: "February 11, 2026",
    tag: "launch",
    changes: [
      "Launched Blind Box Generator website",
      "10 themed digital template packs available ($4.99 each)",
      "2 party kit bundles for birthdays and craft nights",
      "2 classroom bundles for educators (10 and 30 students)",
      "Mega Bundle with all 10 packs at 40% off",
      "Founding Member subscription pricing live (up to 50% off, locked forever)",
      "Affiliate supplies page with recommended paper and tools",
      "Blog structure ready for craft tutorials and guides",
      "Full legal pages (Terms of Service, Privacy Policy)",
      "Public changelog",
      "AI Generator announced (coming soon)",
    ],
  },
];

const tagColors: Record<string, { bg: string; text: string }> = {
  launch: { bg: "bg-green-100", text: "text-green-800" },
  feature: { bg: "bg-blue-100", text: "text-blue-800" },
  fix: { bg: "bg-amber-100", text: "text-amber-800" },
  improvement: { bg: "bg-purple-100", text: "text-purple-800" },
};

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Changelog
          </h1>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
            Current: {VERSION}
          </span>
        </div>
        <p className="mt-3 text-gray-600">
          Everything new, improved, and fixed in {SITE_NAME}. Follow along as
          we build.
        </p>

        <div className="mt-12 space-y-8">
          {changelog.map((entry) => {
            const colors = entry.tag
              ? tagColors[entry.tag]
              : { bg: "bg-gray-100", text: "text-gray-800" };

            return (
              <article
                key={entry.version}
                className="rounded-xl border border-gray-200 p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-2xl font-bold text-gray-900">
                    v{entry.version}
                  </span>
                  <span className="text-lg font-medium text-gray-700">
                    {entry.title}
                  </span>
                  {entry.tag && (
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors.bg} ${colors.text}`}
                    >
                      {entry.tag.charAt(0).toUpperCase() + entry.tag.slice(1)}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-gray-500">{entry.date}</p>
                <ul className="mt-4 space-y-2">
                  {entry.changes.map((change, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                      {change}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
