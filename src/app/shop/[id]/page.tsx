"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ShoppingCart, ArrowLeft, CheckCircle, Package, Printer, Scissors, Gift, Star, ArrowRight } from "lucide-react";
import {
  TEMPLATE_PACKS,
  PARTY_KITS,
  CLASSROOM_BUNDLES,
  MEGA_BUNDLE,
  COLLECTION_GRADIENTS,
  TEMPLATE_COLLECTIONS,
  formatPrice,
  Product,
} from "@/lib/constants";

const ALL_PRODUCTS: Product[] = [...TEMPLATE_PACKS, ...PARTY_KITS, ...CLASSROOM_BUNDLES, MEGA_BUNDLE];

const STEPS = [
  { icon: Printer, title: "Print It", description: "Hit print on any home printer. Regular paper works, cardstock is even better. That's it." },
  { icon: Scissors, title: "Cut It Out", description: "Cut along the thick lines. Kids 6+ can do this solo. Younger ones? Perfect parent-kid activity." },
  { icon: Package, title: "Fold & Glue", description: "Fold on the dotted lines, glue the tabs. A glue stick is all you need. Done in 5 minutes." },
  { icon: Gift, title: "Open & Surprise!", description: "Put characters in the box, close it, shuffle, and open! Trade with siblings, friends, the whole family." },
];

// Lifestyle gallery photos (shared across all products)
const GALLERY_PHOTOS = [
  { src: "/products/hero-kawaii-collection.png", alt: "Kawaii paper blind box collection" },
  { src: "/products/child-crafting-closeup.png", alt: "Child crafting a kawaii character" },
  { src: "/products/hero-process.png", alt: "Step by step assembly process" },
  { src: "/products/product-lifestyle-desk.png", alt: "Complete craft kit on desk" },
  { src: "/products/girl-surprised-unboxing.png", alt: "Girl surprised opening blind box" },
  { src: "/products/template-closeup.png", alt: "Template sheet closeup" },
  { src: "/products/hero-unboxing.png", alt: "Unboxing flat lay" },
  { src: "/products/finished-collection-display.png", alt: "Collection on display shelf" },
  { src: "/products/gift-wrapping-scene.png", alt: "Gift wrapping a blind box kit" },
  { src: "/products/girl-birthday-party.png", alt: "Birthday party with blind boxes" },
];

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const product = ALL_PRODUCTS.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl block mb-4">😿</span>
          <h1 className="text-2xl font-extrabold mb-2">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">This product doesn&apos;t exist or has been removed.</p>
          <Link href="/shop" className="gradient-pink text-white px-6 py-3 rounded-full font-bold">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const gradient = COLLECTION_GRADIENTS[product.collection] || "from-pink-100 to-purple-100";
  const hasPackImage = product.image?.startsWith("/products/packs/");
  const collection = TEMPLATE_COLLECTIONS.find((c) => c.id === product.collection);

  // Build gallery: pack image first (if exists), then lifestyle photos
  const gallery = hasPackImage
    ? [{ src: product.image, alt: product.name }, ...GALLERY_PHOTOS]
    : GALLERY_PHOTOS;

  // Related products from same collection
  const related = TEMPLATE_PACKS.filter((p) => p.collection === product.collection && p.id !== product.id).slice(0, 4);

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/shop" className="hover:text-foreground transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Shop
            </Link>
            <span>/</span>
            <Link href="/templates" className="hover:text-foreground transition-colors">Templates</Link>
            {collection && (
              <>
                <span>/</span>
                <span>{collection.emoji} {collection.name}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Product Hero */}
      <section className="bg-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div>
              {/* Main image */}
              <div className={`bg-gradient-to-br ${gradient} rounded-2xl overflow-hidden mb-3 aspect-square`}>
                <Image
                  src={gallery[selectedImage].src}
                  alt={gallery[selectedImage].alt}
                  width={800}
                  height={800}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                {gallery.slice(0, 10).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === i ? "border-brand-pink shadow-pink" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img.src} alt={img.alt} width={100} height={100} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              {/* Badge */}
              {product.badge && (
                <span className="inline-flex items-center gap-1.5 bg-brand-pink/10 text-brand-pink px-3 py-1 rounded-full text-xs font-bold w-fit mb-3">
                  <Star className="w-3 h-3" /> {product.badge}
                </span>
              )}

              <h1 className="text-3xl md:text-4xl font-extrabold mb-2">{product.name}</h1>

              {collection && (
                <p className="text-sm text-muted-foreground mb-4">
                  {collection.emoji} {collection.name} Collection
                </p>
              )}

              <p className="text-lg text-muted-foreground mb-6">{product.description}</p>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-extrabold text-brand-blue">{formatPrice(product.price)}</span>
                <span className="text-sm text-muted-foreground bg-brand-green/10 text-brand-green px-2 py-0.5 rounded-full font-bold">
                  Instant Download
                </span>
              </div>

              {/* Buy Button */}
              <button
                onClick={() => { window.location.href = `/api/checkout?product=${product.id}`; }}
                className="gradient-pink text-white px-8 py-4 rounded-full text-lg font-bold hover:opacity-90 transition-opacity shadow-pink flex items-center justify-center gap-2 w-full sm:w-auto mb-8"
              >
                <ShoppingCart className="w-5 h-5" />
                Buy Now - {formatPrice(product.price)}
              </button>

              {/* What's Included */}
              <div className="bg-muted rounded-2xl p-6">
                <h3 className="font-bold mb-4">What&apos;s Included</h3>
                <ul className="space-y-3">
                  {(product.features || []).map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm">
                      <CheckCircle className="w-4 h-4 text-brand-green shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use - Step by Step */}
      <section className="bg-gradient-to-b from-pink-50/50 to-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3">
            Seriously, It&apos;s This Easy
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-lg mx-auto">
            No craft skills needed. No special tools. Just a printer, scissors, and a glue stick. Your kids will do most of the work!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {STEPS.map((step, i) => {
              const photos = [
                "/products/template-closeup.png",
                "/products/child-crafting-closeup.png",
                "/products/hero-process.png",
                "/products/girl-surprised-unboxing.png",
              ];
              return (
                <div key={step.title} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border">
                  <div className="h-32 overflow-hidden">
                    <Image src={photos[i]} alt={step.title} width={300} height={200} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 text-center">
                    <div className="bg-brand-pink w-10 h-10 rounded-full flex items-center justify-center mx-auto -mt-9 relative z-10 shadow-lg border-4 border-white">
                      <span className="text-white font-bold text-sm">{i + 1}</span>
                    </div>
                    <h3 className="font-bold mt-2 mb-1">{step.title}</h3>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Gallery */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold mb-6">Product Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {gallery.slice(0, 10).map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => { setSelectedImage(i); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <Image src={img.src} alt={img.alt} width={300} height={300} className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mega Bundle Upsell */}
      <section className="bg-gradient-to-r from-brand-purple/5 via-brand-pink/5 to-brand-blue/5 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border-2 border-brand-purple/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="bg-brand-purple/10 rounded-xl w-20 h-20 flex items-center justify-center shrink-0">
              <span className="text-4xl">🎁</span>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-extrabold mb-1">Want all {TEMPLATE_PACKS.length} packs? Save 60%</h3>
              <p className="text-sm text-muted-foreground">300+ characters for just {formatPrice(14999)} instead of {formatPrice(TEMPLATE_PACKS.length * 499)}</p>
            </div>
            <Link
              href="/shop/mega-bundle"
              className="gradient-pink text-white px-6 py-3 rounded-full font-bold text-sm hover:opacity-90 transition-opacity shadow-pink whitespace-nowrap"
            >
              Get the Bundle
            </Link>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-extrabold">More from {collection?.name}</h2>
              <Link href="/templates" className="text-brand-blue font-bold text-sm hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => {
                const g = COLLECTION_GRADIENTS[p.collection] || "from-pink-100 to-purple-100";
                const hasPack = p.image?.startsWith("/products/packs/");
                return (
                  <Link key={p.id} href={`/shop/${p.id}`} className="group bg-white border border-border rounded-xl overflow-hidden hover:shadow-brand transition-all hover:-translate-y-1">
                    <div className={`bg-gradient-to-br ${g} h-32 flex items-center justify-center overflow-hidden`}>
                      {hasPack ? (
                        <Image src={p.image} alt={p.name} width={300} height={300} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <span className="text-4xl">{p.emoji}</span>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="font-bold text-sm group-hover:text-brand-pink transition-colors line-clamp-1">{p.name}</h3>
                      <span className="text-sm font-extrabold text-brand-blue">{formatPrice(p.price)}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
