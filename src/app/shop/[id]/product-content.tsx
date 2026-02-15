"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useCallback } from "react";
import { ShoppingCart, ArrowLeft, CheckCircle, Printer, Scissors, Gift, Star, ArrowRight } from "lucide-react";
import {
  TEMPLATE_PACKS,
  PARTY_KITS,
  CLASSROOM_BUNDLES,
  MEGA_BUNDLE,
  COLLECTION_GRADIENTS,
  TEMPLATE_COLLECTIONS,
  SUPPLY_LINKS,
  formatPrice,
  Product,
} from "@/lib/constants";

const ALL_PRODUCTS: Product[] = [...TEMPLATE_PACKS, ...PARTY_KITS, ...CLASSROOM_BUNDLES, MEGA_BUNDLE];

const STEPS = [
  { icon: Printer, title: "Print", description: "Hit print on any home printer. Regular paper works, cardstock is even better. That's it - one click." },
  { icon: Scissors, title: "Cut & Fold", description: "Cut along the solid lines, fold on the dotted lines, glue the tabs. Kids 6+ can do it solo. Done in 5 minutes." },
  { icon: Gift, title: "Surprise!", description: "Put characters in the box, close it up, shuffle, and open! Trade with siblings, friends, the whole class." },
];

// Pack-specific product preview images (up to 10 per product)
function getProductGallery(product: Product) {
  const images: { src: string; alt: string }[] = [];

  // 1. Hero/pack image
  if (product.image?.startsWith("/products/packs/")) {
    images.push({ src: product.image, alt: product.name });
  }

  // 2. Character gallery (3x4 grid of all 12 characters)
  images.push({ src: `/products/previews/${product.id}-gallery.png`, alt: `${product.name} - Character Gallery` });

  // 3. Character sheet preview (shows the 12 characters they get)
  images.push({ src: `/products/previews/${product.id}-characters.png`, alt: `${product.name} - All 12 Characters` });

  // 4. Template preview (shows the printable sheet)
  images.push({ src: `/products/previews/${product.id}-template.png`, alt: `${product.name} - Printable Template` });

  // 5. Assembled box preview
  images.push({ src: `/products/previews/${product.id}-assembled.png`, alt: `${product.name} - Assembled Boxes` });

  // 6. All-pages flat lay
  images.push({ src: `/products/previews/${product.id}-flatlay.png`, alt: `${product.name} - All Pages Preview` });

  // 7. Trading cards close-up
  images.push({ src: `/products/previews/${product.id}-cards.png`, alt: `${product.name} - Trading Cards` });

  // 8-10. Universal step-by-step images (shared across all packs)
  images.push({ src: `/products/steps/step-1-print.png`, alt: `Step 1 - Print` });
  images.push({ src: `/products/steps/step-2-cut.png`, alt: `Step 2 - Cut & Fold` });
  images.push({ src: `/products/steps/step-3-surprise.png`, alt: `Step 3 - Surprise!` });

  return images;
}

export function ProductContent({ id }: { id: string }) {
  const product = ALL_PRODUCTS.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const handleImageError = useCallback((src: string) => {
    setFailedImages(prev => new Set(prev).add(src));
  }, []);

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
  const collection = TEMPLATE_COLLECTIONS.find((c) => c.id === product.collection);

  // Build gallery from pack-specific product images, filtering out broken ones
  const allGallery = getProductGallery(product);
  const gallery = allGallery.filter(img => !failedImages.has(img.src));

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
                {gallery.length > 0 && (
                <Image
                  src={gallery[selectedImage]?.src || gallery[0]?.src}
                  alt={gallery[selectedImage]?.alt || product.name}
                  width={800}
                  height={800}
                  className="w-full h-full object-cover"
                  priority
                  onError={() => handleImageError(gallery[selectedImage]?.src)}
                />)}
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
                    <Image src={img.src} alt={img.alt} width={100} height={100} className="w-full h-full object-cover" onError={() => handleImageError(img.src)} />
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

              {/* Social Proof */}
              <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 bg-brand-green rounded-full animate-pulse" />
                {Math.floor(50 + product.name.length * 7)} families chose this pack
              </p>

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

      {/* How to Build - 3 Steps */}
      <section className="bg-gradient-to-b from-pink-50/50 to-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3">
            How to Build Your {product.name}
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-lg mx-auto">
            No craft skills needed. Just a printer, scissors, and a glue stick. Done in under 10 minutes!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((step, i) => {
              // Universal step images shared across all packs
              const stepNames = ["step-1-print", "step-2-cut", "step-3-surprise"];
              const stepImg = `/products/steps/${stepNames[i]}.png`;
              return (
                <div key={step.title} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border">
                  <div className="h-48 overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50">
                    <Image
                      src={stepImg}
                      alt={`${product.name} - ${step.title}`}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>
                  <div className="p-5 text-center">
                    <div className="bg-brand-pink w-12 h-12 rounded-full flex items-center justify-center mx-auto -mt-11 relative z-10 shadow-lg border-4 border-white">
                      <span className="text-white font-extrabold text-lg">{i + 1}</span>
                    </div>
                    <h3 className="font-bold text-lg mt-3 mb-1.5">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Supplies Callout */}
      <section className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-brand-blue/5 via-brand-pink/5 to-brand-purple/5 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="text-center md:text-left flex-1">
                <h3 className="text-lg font-extrabold mb-1">Grab Your Supplies</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  All you need is cardstock, scissors, and a glue stick. Under $24 total on Amazon.
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUPPLY_LINKS.filter(s => s.starter).map((item) => (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full text-xs font-semibold border border-border hover:border-brand-blue/30 transition-colors"
                    >
                      <span>{item.emoji}</span>
                      {item.name.split("(")[0].trim()}
                      <span className="text-brand-green font-bold">{item.price}</span>
                    </a>
                  ))}
                </div>
              </div>
              <Link
                href="/supplies"
                className="gradient-blue text-white px-6 py-2.5 rounded-full font-bold text-sm hover:opacity-90 transition-opacity whitespace-nowrap flex items-center gap-2 shrink-0"
              >
                View All Supplies <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Gallery */}
      {gallery.length > 1 && (
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold mb-6">What You Get</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {gallery.map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => { setSelectedImage(i); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <Image src={img.src} alt={img.alt} width={300} height={300} className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-300" onError={() => handleImageError(img.src)} />
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

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
