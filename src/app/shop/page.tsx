"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Star, ArrowRight, Package, Sparkles } from "lucide-react";
import {
  TEMPLATE_PACKS,
  PARTY_KITS,
  CLASSROOM_BUNDLES,
  MEGA_BUNDLE,
  COLLECTION_GRADIENTS,
  formatPrice,
  Product,
} from "@/lib/constants";

const CATEGORIES = [
  { id: "all", label: "All Products" },
  { id: "template", label: "Templates" },
  { id: "party-kit", label: "Party Kits" },
  { id: "classroom", label: "Classroom" },
  { id: "bundle", label: "Mega Bundle" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

function ProductCard({ product }: { product: Product }) {
  const gradient = COLLECTION_GRADIENTS[product.collection] || "from-pink-100 to-purple-100";
  const hasPackImage = product.image?.startsWith("/products/packs/");
  return (
    <Link href={`/shop/${product.id}`} className="bg-white border border-border rounded-2xl overflow-hidden hover:shadow-brand transition-all hover:-translate-y-1 flex flex-col group">
      {/* Kawaii image area */}
      <div className={`bg-gradient-to-br ${gradient} h-44 flex items-center justify-center relative overflow-hidden`}>
        {hasPackImage ? (
          <Image src={product.image} alt={product.name} width={400} height={400} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <span className="text-7xl drop-shadow-sm">{product.emoji || "🎨"}</span>
        )}
        {product.badge && (
          <span className="absolute top-3 right-3 bg-brand-pink text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">

      <h3 className="font-bold text-lg mb-1">{product.name}</h3>
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
        {product.description}
      </p>

      {/* Price + CTA */}
      <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
        <span className="text-xl font-extrabold text-brand-blue">
          {formatPrice(product.price)}
        </span>
        <span className="gradient-blue text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1.5">
          <ShoppingCart className="w-4 h-4" />
          View Pack
        </span>
      </div>
      </div>
    </Link>
  );
}

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");

  const allProducts: Product[] = [
    ...TEMPLATE_PACKS,
    ...PARTY_KITS,
    ...CLASSROOM_BUNDLES,
    MEGA_BUNDLE,
  ];

  const filteredProducts =
    activeCategory === "all"
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-pink-50 to-white py-12 md:py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
                <span className="text-gradient">Craft Kits</span> Your Kids Will Love
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl">
                Pick a theme, hit print, and make memories together. Every pack is a complete activity - no extra supplies, no prep work, no stress.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl overflow-hidden shadow-md">
                <Image src="/products/girl-surprised-unboxing.png" alt="Girl excited about blind box" width={512} height={512} className="w-full h-auto" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md mt-6">
                <Image src="/products/product-lifestyle-desk.png" alt="Complete craft kit" width={512} height={512} className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category tabs */}
      <section className="bg-white sticky top-16 z-40 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? "gradient-blue text-white shadow-brand"
                    : "bg-muted text-muted-foreground hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Mega Bundle highlight (shown when viewing all or bundle) */}
      {(activeCategory === "all" || activeCategory === "bundle") && (
        <section className="bg-gradient-to-r from-brand-purple/5 via-brand-pink/5 to-brand-blue/5 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border-2 border-brand-purple/30 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8">
              <div className="bg-brand-purple/10 rounded-2xl w-32 h-32 flex items-center justify-center shrink-0">
                <span className="text-6xl">🎁</span>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start mb-2">
                  <h2 className="text-2xl md:text-3xl font-extrabold">{MEGA_BUNDLE.name}</h2>
                  {MEGA_BUNDLE.badge && (
                    <span className="bg-brand-purple/10 text-brand-purple text-sm font-bold px-3 py-1 rounded-full">
                      {MEGA_BUNDLE.badge}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground mb-4">{MEGA_BUNDLE.description}</p>
                {MEGA_BUNDLE.features && (
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    {MEGA_BUNDLE.features.map((f) => (
                      <span
                        key={f}
                        className="bg-muted text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3 h-3 text-brand-purple" />
                        {f}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="text-center shrink-0">
                <div className="text-3xl font-extrabold text-brand-purple mb-1">
                  {formatPrice(MEGA_BUNDLE.price)}
                </div>
                <div className="text-sm text-muted-foreground mb-4 line-through">
                  {formatPrice(TEMPLATE_PACKS.length * 499)}
                </div>
                <Link
                  href={`/shop/${MEGA_BUNDLE.id}`}
                  className="gradient-pink text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity shadow-pink flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Get the Bundle
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Product Grid */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section headers based on category */}
          {activeCategory === "all" && (
            <>
              {/* Templates */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <Package className="w-6 h-6 text-brand-blue" />
                  <h2 className="text-2xl font-extrabold">Digital Template Packs</h2>
                  <span className="text-sm text-muted-foreground">
                    ({TEMPLATE_PACKS.length} packs)
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                  {TEMPLATE_PACKS.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>

              {/* Party Kits */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <Star className="w-6 h-6 text-brand-orange" />
                  <h2 className="text-2xl font-extrabold">Party Kits</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                  {PARTY_KITS.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>

              {/* Classroom */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <Star className="w-6 h-6 text-brand-green" />
                  <h2 className="text-2xl font-extrabold">Classroom Bundles</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {CLASSROOM_BUNDLES.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            </>
          )}

          {activeCategory !== "all" && activeCategory !== "bundle" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <span className="text-5xl mb-4 block">📦</span>
              <p className="text-muted-foreground text-lg">No products in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="gradient-blue py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
            Want unlimited AI-generated characters?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Skip the templates and create your own custom blind box characters with our AI generator.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 bg-white text-brand-blue px-8 py-4 rounded-full font-bold text-lg hover:bg-white/90 transition-colors"
          >
            <Sparkles className="w-5 h-5" />
            View AI Generator Plans
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
