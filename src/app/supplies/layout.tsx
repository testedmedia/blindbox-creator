import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Recommended Supplies - Paper, Tools & Kawaii Extras | ${SITE_NAME}`,
  description: "Everything you need to make perfect blind boxes: cardstock, scissors, glue sticks, holographic paper, kawaii stickers, and gift packaging. Under $24 to start.",
  openGraph: {
    title: `Craft Supplies | ${SITE_NAME}`,
    description: "All the supplies you need for perfect blind boxes. Under $24 to start.",
  },
};

export default function SuppliesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
