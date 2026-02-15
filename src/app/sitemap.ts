import { MetadataRoute } from "next";
import { TEMPLATE_PACKS, PARTY_KITS, CLASSROOM_BUNDLES, MEGA_BUNDLE, SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  // Static pages
  const staticPages = [
    { url: baseUrl, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/create`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/shop`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/templates`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/pricing`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/party-kits`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/classroom`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/supplies`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/affiliate`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/print`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly" as const, priority: 0.4 },
    { url: `${baseUrl}/features`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/contact`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/changelog`, changeFrequency: "weekly" as const, priority: 0.3 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly" as const, priority: 0.2 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly" as const, priority: 0.2 },
  ];

  // All product pages
  const allProducts = [...TEMPLATE_PACKS, ...PARTY_KITS, ...CLASSROOM_BUNDLES, MEGA_BUNDLE];
  const productPages = allProducts.map((product) => ({
    url: `${baseUrl}/shop/${product.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Blog pages
  const blogPages = [
    { url: `${baseUrl}/blog`, changeFrequency: "weekly" as const, priority: 0.5 },
    { url: `${baseUrl}/blog/how-to-make-paper-blind-boxes`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/blog/best-kawaii-crafts-for-kids`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/blog/blind-box-birthday-party-guide`, changeFrequency: "monthly" as const, priority: 0.5 },
  ];

  return [...staticPages, ...productPages, ...blogPages];
}
