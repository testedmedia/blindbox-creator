import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Shop - Kawaii Template Packs, Party Kits & Bundles | ${SITE_NAME}`,
  description: "Browse 75+ kawaii paper blind box template packs, birthday party kits, and classroom bundles. Each pack includes 12 unique characters. Starting at $4.99.",
  openGraph: {
    title: `Shop | ${SITE_NAME}`,
    description: "75+ kawaii template packs starting at $4.99. Print, fold, surprise!",
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
