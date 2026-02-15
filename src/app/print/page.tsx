"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Printer, Scissors, ArrowLeft, Package } from "lucide-react";
import Link from "next/link";
import { TEMPLATE_PACKS } from "@/lib/constants";

// Map pack IDs to their display info
const PACK_MAP = new Map(TEMPLATE_PACKS.map(p => [p.id, p]));

function PrintTemplate() {
  const params = useSearchParams();
  const imgParam = params.get("img") || "";
  const storageKey = params.get("key") || "";
  const rarity = params.get("rarity") || "Common";
  const characterId = params.get("id") || "000";
  const packId = params.get("pack") || "";

  // Resolve image URL: from query param or sessionStorage (for base64 images)
  const [imageUrl] = useState(() => {
    if (imgParam) return imgParam;
    if (storageKey) {
      try {
        const stored = sessionStorage.getItem(storageKey);
        if (stored) return stored;
      } catch { /* no-op */ }
    }
    return "";
  });

  // If pack is specified, use the pack's product image
  const pack = packId ? PACK_MAP.get(packId) : null;
  const displayImage = pack?.image || imageUrl;
  const packName = pack?.name || "";
  const packEmoji = pack?.emoji || "";

  const rarityColors: Record<string, string> = {
    Common: "#9CA3AF",
    Rare: "#3B82F6",
    Epic: "#8B5CF6",
    Legendary: "#F59E0B",
  };
  const color = pack ? "#FF6B9D" : (rarityColors[rarity] || rarityColors.Common);

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-white">
      {/* Screen-only controls */}
      <div className="print:hidden bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={pack ? "/shop" : "/create"} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" /> {pack ? "Back to Shop" : "Back to Creator"}
          </Link>
          <div className="flex items-center gap-3">
            <p className="text-sm text-gray-500 hidden sm:block">Print on 80lb cardstock for best results</p>
            <button
              onClick={handlePrint}
              className="bg-brand-pink text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-brand-pink/90 transition-colors flex items-center gap-2"
            >
              <Printer className="w-4 h-4" /> Print / Save PDF
            </button>
          </div>
        </div>
      </div>

      {/* ═══ PAGE 1: BOX TEMPLATE ═══ */}
      <div className="print-page mx-auto" style={{ width: "8.5in", padding: "0.5in" }}>
        {/* Title */}
        <div className="text-center mb-4 print:mb-2">
          <h1 className="text-2xl font-extrabold" style={{ color }}>
            {packName ? `${packEmoji} ${packName}` : "Blind Box Template"}
          </h1>
          <p className="text-xs text-gray-400">
            {pack ? `${packName} Collection` : `#${characterId.slice(0, 8).toUpperCase()} \u00B7 ${rarity}`} &middot; blindboxgenerator.com
          </p>
        </div>

        {/* Box Net - Cross pattern */}
        <div className="flex justify-center">
          <div className="relative">
            {/* The cross-shaped box net */}
            <div className="flex flex-col items-center">
              {/* TOP PANEL + tab */}
              <div className="relative" style={{ width: "3in", height: "3.4in" }}>
                {/* Glue tab */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 border-2 border-dashed border-gray-300 bg-gray-50"
                  style={{ width: "2.4in", height: "0.4in", borderBottom: "none" }}
                >
                  <p className="text-[8px] text-gray-400 text-center pt-0.5">GLUE TAB</p>
                </div>
                {/* Top panel */}
                <div
                  className="absolute bottom-0 border-2 border-gray-800 flex items-center justify-center"
                  style={{ width: "3in", height: "3in", background: `linear-gradient(135deg, ${color}15, ${color}30)` }}
                >
                  <div className="text-center">
                    <span className="text-5xl">?</span>
                    <p className="text-xs font-bold mt-1" style={{ color }}>MYSTERY</p>
                  </div>
                  {/* Fold line indicator */}
                  <div className="absolute -bottom-0.5 left-0 right-0 border-b-2 border-dotted border-gray-400" />
                </div>
              </div>

              {/* MIDDLE ROW: Left tab + Left + Front + Right + Back + Right tab */}
              <div className="flex items-stretch">
                {/* Left glue tab */}
                <div
                  className="border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center"
                  style={{ width: "0.4in", height: "3in" }}
                >
                  <p className="text-[7px] text-gray-400 -rotate-90 whitespace-nowrap">GLUE</p>
                </div>

                {/* LEFT panel */}
                <div
                  className="border-2 border-gray-800 flex items-center justify-center relative"
                  style={{ width: "3in", height: "3in", background: `linear-gradient(180deg, ${color}10, ${color}25)` }}
                >
                  <div className="text-center opacity-30">
                    <p className="text-lg font-extrabold" style={{ color }}>BLIND</p>
                    <p className="text-lg font-extrabold" style={{ color }}>BOX</p>
                  </div>
                  {/* Fold line */}
                  <div className="absolute -right-0.5 top-0 bottom-0 border-r-2 border-dotted border-gray-400" />
                </div>

                {/* FRONT panel - Character/pack image goes here */}
                <div
                  className="border-2 border-gray-800 overflow-hidden relative"
                  style={{ width: "3in", height: "3in" }}
                >
                  {displayImage ? (
                    <img
                      src={displayImage}
                      alt={packName || "Your character"}
                      className="w-full h-full object-contain"
                      crossOrigin="anonymous"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-pink-50">
                      <p className="text-sm text-gray-400">Character Image</p>
                    </div>
                  )}
                  {/* Rarity/pack badge */}
                  <div
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-white text-[10px] font-bold"
                    style={{ backgroundColor: color }}
                  >
                    {pack ? packName : rarity}
                  </div>
                  {/* Fold line */}
                  <div className="absolute -right-0.5 top-0 bottom-0 border-r-2 border-dotted border-gray-400" />
                </div>

                {/* RIGHT panel */}
                <div
                  className="border-2 border-gray-800 flex items-center justify-center relative"
                  style={{ width: "3in", height: "3in", background: `linear-gradient(180deg, ${color}10, ${color}25)` }}
                >
                  <div className="text-center opacity-30">
                    <p className="text-lg font-extrabold" style={{ color }}>BLIND</p>
                    <p className="text-lg font-extrabold" style={{ color }}>BOX</p>
                  </div>
                  {/* Fold line */}
                  <div className="absolute -right-0.5 top-0 bottom-0 border-r-2 border-dotted border-gray-400" />
                </div>

                {/* BACK panel */}
                <div
                  className="border-2 border-gray-800 flex flex-col items-center justify-center relative"
                  style={{ width: "3in", height: "3in", background: `linear-gradient(135deg, ${color}05, ${color}20)` }}
                >
                  {pack && (
                    <p className="text-2xl mb-1">{packEmoji}</p>
                  )}
                  <p className="text-xs text-gray-400 mb-1">Collect them all!</p>
                  <p className="text-sm font-bold" style={{ color }}>blindboxgenerator.com</p>
                  {pack ? (
                    <div className="mt-2 px-3 py-1 rounded-full text-[9px] font-bold text-white" style={{ backgroundColor: color }}>
                      {packName}
                    </div>
                  ) : (
                    <div className="mt-3 px-3 py-1 rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: color }}>
                      #{characterId.slice(0, 8).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              {/* BOTTOM PANEL */}
              <div className="relative" style={{ width: "3in", height: "3.4in" }}>
                {/* Bottom panel */}
                <div
                  className="border-2 border-gray-800 flex items-center justify-center"
                  style={{ width: "3in", height: "3in", background: `linear-gradient(135deg, ${color}10, ${color}20)` }}
                >
                  <p className="text-xs text-gray-400">BASE</p>
                </div>
                {/* Bottom glue tab */}
                <div
                  className="border-2 border-dashed border-gray-300 bg-gray-50"
                  style={{ width: "2.4in", height: "0.4in", marginLeft: "0.3in", borderTop: "none" }}
                >
                  <p className="text-[8px] text-gray-400 text-center pt-0.5">GLUE TAB</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-center gap-8 text-xs text-gray-500">
          <span className="flex items-center gap-2">
            <span className="w-8 border-t-2 border-gray-800 inline-block" /> Cut line
          </span>
          <span className="flex items-center gap-2">
            <span className="w-8 border-t-2 border-dotted border-gray-400 inline-block" /> Fold line
          </span>
          <span className="flex items-center gap-2">
            <span className="w-8 border-t-2 border-dashed border-gray-300 inline-block" /> Glue tab
          </span>
        </div>
      </div>

      {/* ═══ PAGE 2: ASSEMBLY INSTRUCTIONS ═══ */}
      <div className="print-page mx-auto mt-8 print:mt-0" style={{ width: "8.5in", padding: "0.5in" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-extrabold text-center mb-1 flex items-center justify-center gap-2">
            <Scissors className="w-6 h-6 text-brand-pink" />
            Assembly Instructions
          </h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Recommended: 80lb cardstock, scissors, glue stick
          </p>

          <div className="space-y-5">
            {[
              {
                num: 1,
                title: "Print the Template",
                desc: "Print page 1 on 80lb cardstock (110gsm or thicker). Use \"Actual Size\" in print settings - do not scale to fit. For holographic characters, use metallic or holographic cardstock!",
              },
              {
                num: 2,
                title: "Cut Along Solid Lines",
                desc: "Using scissors or a craft knife, carefully cut along all solid black lines around the outside of the template. Cut out the entire cross shape including the glue tabs.",
              },
              {
                num: 3,
                title: "Score the Fold Lines",
                desc: "Using a ruler and a scoring tool (or the back of a butter knife), gently score along all dotted fold lines. This makes folding much easier and gives clean edges.",
              },
              {
                num: 4,
                title: "Fold All Panels",
                desc: "Fold all panels inward along the scored lines. The character image (front panel) should face outward. The \"?\" mystery panel becomes the top of the box.",
              },
              {
                num: 5,
                title: "Glue the Tabs",
                desc: "Apply glue stick to each glue tab (dashed borders). Fold the side panels up and press the tabs against the inside of adjacent panels. Hold for 10 seconds each.",
              },
              {
                num: 6,
                title: "Close the Box",
                desc: "Fold the top panel (?) down to close the box. You can leave it unfoldable for a mystery reveal, or glue it shut for a true blind box experience!",
              },
            ].map((step) => (
              <div key={step.num} className="flex gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-extrabold text-lg shrink-0"
                  style={{ backgroundColor: color }}
                >
                  {step.num}
                </div>
                <div>
                  <h3 className="font-bold text-sm">{step.title}</h3>
                  <p className="text-sm text-gray-600 mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="mt-8 bg-gray-50 rounded-2xl p-5 border border-gray-200">
            <h3 className="font-bold text-sm mb-3">Pro Tips</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-brand-pink font-bold">*</span>
                For the best results, use 80-110lb cardstock. Regular paper is too thin and won&apos;t hold shape.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-pink font-bold">*</span>
                Metallic or holographic cardstock makes Rare and Legendary characters extra special!
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-pink font-bold">*</span>
                Make 5-10 boxes and let kids trade them. They go crazy for the mystery reveal.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-pink font-bold">*</span>
                Display on a shelf or in a shadow box frame for a collectible look.
              </li>
            </ul>
          </div>

          {/* Pack-specific CTA */}
          {pack && (
            <div className="mt-6 bg-pink-50 border-2 border-pink-200 rounded-2xl p-5 text-center print:hidden">
              <Package className="w-6 h-6 mx-auto mb-2 text-brand-pink" />
              <h3 className="font-bold text-sm mb-1">Want all 12 characters from {packName}?</h3>
              <p className="text-xs text-gray-500 mb-3">Each pack includes 12 unique kawaii characters, 4 box designs, and assembly guide.</p>
              <Link
                href={`/shop/${packId}`}
                className="inline-block bg-brand-pink text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-brand-pink/90 transition-colors"
              >
                Get Full Pack - $4.99
              </Link>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-gray-400">
            <p>Made with blindboxgenerator.com</p>
            {pack ? (
              <p>{packEmoji} {packName} Collection</p>
            ) : (
              <p>#{characterId.slice(0, 8).toUpperCase()} &middot; {rarity}</p>
            )}
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body { margin: 0; }
          .print\\:hidden { display: none !important; }
          .print\\:mt-0 { margin-top: 0 !important; }
          .print-page { page-break-after: always; padding: 0.25in !important; }
          .print-page:last-child { page-break-after: avoid; }
          @page { size: letter; margin: 0; }
        }
      `}</style>
    </div>
  );
}

export default function PrintPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading template...</div>}>
      <PrintTemplate />
    </Suspense>
  );
}
