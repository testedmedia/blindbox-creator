"use client";

import { useState } from "react";
import Link from "next/link";
import { SUPPLY_LINKS, SUPPLY_CATEGORIES, type SupplyCategory } from "@/lib/constants";
import {
  Printer,
  Scissors,
  ExternalLink,
  AlertTriangle,
  Sparkles,
  Lightbulb,
  ArrowRight,
  ShoppingCart,
  Star,
  Package,
} from "lucide-react";

const essentials = [
  {
    icon: <Printer className="w-6 h-6" />,
    title: "A Printer",
    description: "Any home inkjet or laser printer works. Color printing recommended.",
  },
  {
    icon: "📄",
    title: "Cardstock Paper",
    description: "80lb cardstock is ideal. Regular paper works but cardstock holds its shape as a box.",
  },
  {
    icon: <Scissors className="w-6 h-6" />,
    title: "Scissors",
    description: "Kid-safe scissors work fine. Decorative edge scissors are a fun upgrade!",
  },
  {
    icon: "🧴",
    title: "Glue Stick",
    description: "Acid-free glue sticks give the cleanest finish. Tape runners work too.",
  },
];

const tips = [
  {
    title: "Cardstock > Regular Paper",
    description:
      "80lb (216gsm) cardstock is the sweet spot. Sturdy enough to hold box shape, thin enough to fold cleanly. Regular printer paper is too flimsy for boxes.",
  },
  {
    title: "Print at Highest Quality",
    description:
      "Set your printer to highest quality for crisp, vibrant kawaii colors. Our templates are 300 DPI so your printer can make the most of them.",
  },
  {
    title: "Score Before Folding",
    description:
      "Use a bone folder or spent ballpoint pen along fold lines before folding. This gives you sharp, professional creases every time.",
  },
  {
    title: "Let Ink Dry First",
    description:
      "Give printed sheets 2-3 minutes to dry before handling, especially with inkjet printers. Prevents smudging.",
  },
  {
    title: "Glue Sticks Over Liquid Glue",
    description:
      "Liquid glue warps paper. Glue sticks provide a clean bond without warping. Apply a thin, even layer to tabs.",
  },
  {
    title: "Holographic = Ultra Rare",
    description:
      "Print rare characters on holographic or metallic cardstock for a real collector feel. Kids go crazy for the shimmer effect.",
  },
];

const tagColors: Record<string, string> = {
  Essential: "bg-brand-blue/10 text-brand-blue",
  Popular: "bg-brand-pink/10 text-brand-pink",
  Premium: "bg-brand-purple/10 text-brand-purple",
  "Best Seller": "bg-brand-green/10 text-brand-green",
  "Pro Tip": "bg-brand-orange/10 text-brand-orange",
  Pro: "bg-brand-orange/10 text-brand-orange",
  "Must-Have": "bg-brand-pink/10 text-brand-pink",
  Cute: "bg-brand-pink/10 text-brand-pink",
  New: "bg-brand-purple/10 text-brand-purple",
  "Gift Ready": "bg-brand-green/10 text-brand-green",
  Tools: "bg-brand-green/10 text-brand-green",
};

type ActiveCategory = "all" | SupplyCategory;

export default function SuppliesPage() {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("all");
  const starterItems = SUPPLY_LINKS.filter((s) => s.starter);
  const starterTotal = starterItems.reduce((sum, item) => sum + parseFloat(item.price.replace("$", "")), 0);

  const filtered = activeCategory === "all"
    ? SUPPLY_LINKS
    : SUPPLY_LINKS.filter((s) => s.category === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-12 sm:py-20 text-center px-4 bg-gradient-to-b from-pink-50 to-white border-b border-border">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green px-4 py-1.5 rounded-full text-sm font-bold mb-6">
            <Package className="w-4 h-4" />
            Zero Inventory Needed
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Everything You Need to{" "}
            <span className="text-gradient">Craft Magic</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            All you need is a printer and a few basics. We tested dozens of products and picked the best ones for kawaii blind box crafting. Any paper works - premium paper makes it magical.
          </p>
        </div>
      </section>

      {/* Starter Kit Banner */}
      <section className="py-10 px-4 bg-gradient-to-r from-brand-blue/5 via-brand-pink/5 to-brand-purple/5">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border-2 border-brand-blue/20 rounded-3xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="bg-brand-blue/10 rounded-2xl w-20 h-20 flex items-center justify-center shrink-0">
                <span className="text-4xl">🎒</span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start mb-2">
                  <h2 className="text-xl md:text-2xl font-extrabold">Complete Starter Kit</h2>
                  <span className="bg-brand-green/10 text-brand-green text-xs font-bold px-3 py-1 rounded-full">Under ${starterTotal.toFixed(0)}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Everything you need to start crafting right now. Just add a printer!
                </p>
                <div className="flex flex-wrap gap-3">
                  {starterItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-brand-blue/10 transition-colors"
                    >
                      <span>{item.emoji}</span>
                      {item.name.split("(")[0].trim()}
                      <span className="text-brand-blue font-bold">{item.price}</span>
                    </a>
                  ))}
                </div>
              </div>
              <div className="text-center shrink-0">
                <div className="text-3xl font-extrabold text-brand-blue mb-1">
                  ${starterTotal.toFixed(2)}
                </div>
                <div className="text-xs text-muted-foreground mb-3">total for all 3</div>
                <a
                  href={starterItems[0]?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gradient-blue text-white px-6 py-2.5 rounded-full font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Shop on Amazon
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Need */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-extrabold text-center mb-2">What You Need</h2>
          <p className="text-muted-foreground text-center mb-8 text-sm">That&apos;s it. Seriously. No special tools, no craft store trip.</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {essentials.map((item) => (
              <div
                key={item.title}
                className="bg-muted rounded-2xl p-5 text-center"
              >
                <div className="text-3xl mb-3 flex items-center justify-center">
                  {typeof item.icon === "string" ? (
                    <span>{item.icon}</span>
                  ) : (
                    <span className="text-brand-blue">{item.icon}</span>
                  )}
                </div>
                <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Tabs + Supply Grid */}
      <section className="py-12 bg-muted px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold mb-2">
              Curated Supplies
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              Tested and approved by our crafting team. Click any item to grab it on Amazon.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto py-3 mb-8 scrollbar-hide justify-center">
            {SUPPLY_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as ActiveCategory)}
                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? "gradient-blue text-white shadow-brand"
                    : "bg-white text-muted-foreground hover:bg-gray-100 border border-border"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((supply) => (
              <a
                key={supply.name}
                href={supply.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl border border-border p-6 shadow-sm hover:shadow-brand transition-all duration-300 hover:-translate-y-1 block"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{supply.emoji}</span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      tagColors[supply.tag] || "bg-muted text-muted-foreground"
                    }`}
                  >
                    {supply.tag}
                  </span>
                </div>

                <h3 className="font-extrabold text-base mb-2 group-hover:text-brand-blue transition-colors">
                  {supply.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {supply.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-xl font-extrabold text-brand-green">
                    {supply.price}
                  </span>
                  <span className="text-brand-blue text-xs font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    View on Amazon
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Level Up Banner */}
      <section className="py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-brand-purple/10 via-brand-pink/10 to-brand-orange/10 rounded-3xl p-8 text-center">
            <span className="text-5xl block mb-4">✨</span>
            <h2 className="text-2xl font-extrabold mb-2">Pro Move: Holographic Rare Characters</h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-6 text-sm">
              Print your rarest characters on holographic or metallic cardstock. Kids go absolutely wild for the shimmer effect. It&apos;s the difference between &quot;cool&quot; and &quot;I NEED to collect them all.&quot;
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="https://www.amazon.com/dp/B0C2CJJ15W"
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-pink text-white px-6 py-3 rounded-full font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <Star className="w-4 h-4" /> Holographic Cardstock - $17.99
              </a>
              <a
                href="https://www.amazon.com/dp/B0CSBB8LBG"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-foreground px-6 py-3 rounded-full font-bold text-sm hover:bg-white/70 transition-colors border border-border flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Metallic Cardstock - $22.99
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-brand-orange font-bold text-sm mb-3">
              <Lightbulb className="w-4 h-4" />
              Pro Tips
            </div>
            <h2 className="text-2xl font-extrabold mb-2">
              Getting the Best Results
            </h2>
            <p className="text-muted-foreground text-sm">
              Follow these tips for professional-looking blind boxes every time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tips.map((tip, i) => (
              <div
                key={tip.title}
                className="flex gap-4 bg-white rounded-xl border border-border p-5"
              >
                <div className="flex-shrink-0 w-8 h-8 gradient-blue rounded-lg flex items-center justify-center text-white text-sm font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-muted px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Sparkles className="w-8 h-8 text-brand-pink mx-auto mb-4" />
          <h2 className="text-2xl font-extrabold mb-3">
            Got Your Supplies? Start Crafting!
          </h2>
          <p className="text-muted-foreground mb-8 text-sm">
            Browse our template packs and get printing. Each pack is just $4.99 and includes 12 unique characters.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="gradient-pink text-white px-8 py-3.5 rounded-full font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              Browse Template Packs
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/features"
              className="bg-white text-foreground px-8 py-3.5 rounded-full font-bold text-sm hover:bg-white/70 transition-colors border border-border"
            >
              Try AI Generator
            </Link>
          </div>
        </div>
      </section>

      {/* Affiliate Disclosure */}
      <section className="py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start gap-3 bg-brand-yellow/5 border border-brand-yellow/20 rounded-xl p-5">
            <AlertTriangle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-bold text-foreground">Affiliate Disclosure:</span>{" "}
              Some links on this page are affiliate links. We may earn a small commission
              at no extra cost to you if you make a purchase. We only recommend products
              we&apos;ve personally tested. These commissions help us keep building free
              resources and the AI Generator.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
