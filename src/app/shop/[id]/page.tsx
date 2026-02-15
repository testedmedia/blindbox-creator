import type { Metadata } from "next";
import {
  TEMPLATE_PACKS,
  PARTY_KITS,
  CLASSROOM_BUNDLES,
  MEGA_BUNDLE,
  SITE_URL,
  SITE_NAME,
  formatPrice,
  Product,
} from "@/lib/constants";
import { ProductContent } from "./product-content";

const ALL_PRODUCTS: Product[] = [...TEMPLATE_PACKS, ...PARTY_KITS, ...CLASSROOM_BUNDLES, MEGA_BUNDLE];

export function generateStaticParams() {
  return ALL_PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = ALL_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const title = `${product.name} - ${formatPrice(product.price)} | ${SITE_NAME}`;
  const description = `${product.description} Includes ${(product.features || []).slice(0, 3).join(", ")}. Print, fold, and surprise!`;
  const ogImage = product.image?.startsWith("/products/packs/")
    ? `${SITE_URL}${product.image}`
    : `${SITE_URL}/og-default.png`;

  return {
    title,
    description,
    openGraph: {
      title: product.name,
      description,
      url: `${SITE_URL}/shop/${product.id}`,
      images: [{ url: ogImage, width: 1200, height: 1200, alt: product.name }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = ALL_PRODUCTS.find((p) => p.id === id);

  // JSON-LD structured data for Google rich snippets
  const jsonLd = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: product.image?.startsWith("/products/packs/")
          ? `${SITE_URL}${product.image}`
          : `${SITE_URL}/og-default.png`,
        offers: {
          "@type": "Offer",
          price: (product.price / 100).toFixed(2),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/shop/${product.id}`,
        },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProductContent id={id} />
    </>
  );
}
