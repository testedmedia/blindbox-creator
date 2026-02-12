"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, ArrowRight, Package, Printer, FileText, BookOpen, ShoppingCart, Heart } from "lucide-react";
import { TEMPLATE_PACKS, TEMPLATE_COLLECTIONS, COLLECTION_GRADIENTS, formatPrice } from "@/lib/constants";

const INCLUDED = [
  { icon: Package, title: "12 Characters Per Pack", description: "12 unique adorable characters in every pack. Each one is different. Kids love collecting them all." },
  { icon: FileText, title: "4 Surprise Box Designs", description: "Matching box templates to put your characters in. Fold it up, close it, and open it like a real blind box!" },
  { icon: Printer, title: "Works on Any Printer", description: "Standard letter paper (8.5 x 11). Color or black & white. Home printer, office printer, library printer. All work." },
  { icon: BookOpen, title: "Picture Instructions", description: "Step-by-step photos show exactly where to cut, fold, and glue. So simple a 6-year-old can follow along." },
];

export default function TemplatesPage() {
  const [activeCollection, setActiveCollection] = useState<string>("all");

  const filtered = activeCollection === "all"
    ? TEMPLATE_PACKS
    : TEMPLATE_PACKS.filter(p => p.collection === activeCollection);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-pink-50 to-white py-12 md:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-brand-pink/10 text-brand-pink px-4 py-1.5 rounded-full text-sm font-bold mb-6">
                <Package className="w-4 h-4" />
                {TEMPLATE_PACKS.length} Kawaii Packs Available
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
                {TEMPLATE_PACKS.length} <span className="text-gradient">Template Packs</span> to Choose From
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Each pack = 12 adorable characters + box designs + step-by-step guide. Pick a theme your kid loves,
                print it out, and craft together. Just {formatPrice(499)} per pack. That&apos;s less than a coffee.
              </p>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <Image src="/products/hero-process.png" alt="How to assemble kawaii blind boxes" width={1024} height={1024} className="w-full h-auto" />
              </div>
              <div className="absolute -bottom-3 -left-3 w-24 h-24 rounded-xl overflow-hidden shadow-lg border-4 border-white hidden md:block">
                <Image src="/products/template-closeup.png" alt="Template closeup" width={200} height={200} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collection filter */}
      <section className="bg-white sticky top-16 z-40 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
            <button
              onClick={() => setActiveCollection("all")}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                activeCollection === "all"
                  ? "gradient-pink text-white shadow-pink"
                  : "bg-muted text-muted-foreground hover:bg-gray-200"
              }`}
            >
              All ({TEMPLATE_PACKS.length})
            </button>
            {TEMPLATE_COLLECTIONS.map((col) => (
              <button
                key={col.id}
                onClick={() => setActiveCollection(col.id)}
                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeCollection === col.id
                    ? "gradient-pink text-white shadow-pink"
                    : "bg-muted text-muted-foreground hover:bg-gray-200"
                }`}
              >
                <span>{col.emoji}</span> {col.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="bg-gradient-to-b from-pink-50/50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-8">
            What&apos;s in Every Pack
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {INCLUDED.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-border">
                <div className="bg-brand-pink/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6 text-brand-pink" />
                </div>
                <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Template Grid */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-extrabold">
              {activeCollection === "all" ? "All Template Packs" : TEMPLATE_COLLECTIONS.find(c => c.id === activeCollection)?.name}
              <span className="text-muted-foreground text-lg font-normal ml-2">({filtered.length} packs)</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((pack) => {
              const gradient = COLLECTION_GRADIENTS[pack.collection] || "from-pink-100 to-purple-100";
              return (
                <Link
                  href={`/shop/${pack.id}`}
                  key={pack.id}
                  className="bg-white border border-border rounded-2xl overflow-hidden hover:shadow-brand transition-all hover:-translate-y-1 flex flex-col group"
                >
                  {/* Kawaii image */}
                  <div className={`bg-gradient-to-br ${gradient} h-40 flex items-center justify-center relative overflow-hidden`}>
                    {pack.image?.startsWith("/products/packs/") ? (
                      <Image src={pack.image} alt={pack.name} width={400} height={400} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <span className="text-6xl drop-shadow-sm group-hover:scale-110 transition-transform">{pack.emoji || "🎨"}</span>
                    )}
                    {pack.badge && (
                      <span className="absolute top-2 right-2 bg-brand-pink text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                        {pack.badge}
                      </span>
                    )}
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold mb-1 group-hover:text-brand-pink transition-colors">{pack.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2 flex-1">{pack.description}</p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {pack.features?.slice(0, 2).map((f) => (
                        <span key={f} className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground flex items-center gap-1">
                          <CheckCircle className="w-2.5 h-2.5 text-brand-green" /> {f}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
                      <span className="text-lg font-extrabold text-brand-blue">{formatPrice(pack.price)}</span>
                      <span className="gradient-blue text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
                        <ShoppingCart className="w-3 h-3" /> View
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mega Bundle CTA */}
      <section className="gradient-fun py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-5xl block mb-4">🎁</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
            Want All {TEMPLATE_PACKS.length} Packs? Save 60%
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Get every kawaii template pack (900 characters!) for just {formatPrice(14999)} instead
            of {formatPrice(TEMPLATE_PACKS.length * 499)}.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-white text-brand-purple px-8 py-4 rounded-full font-bold text-lg hover:bg-white/90 transition-colors"
          >
            Get the Ultimate Collection
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
