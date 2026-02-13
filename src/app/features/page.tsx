import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { FeaturesContent } from "./features-content";

export const metadata: Metadata = {
  title: "AI Generator Features",
  description:
    "Discover the AI-powered Blind Box Generator. Custom character creation, infinite themes, print-ready quality, rarity system, and more. Coming soon.",
  openGraph: {
    title: `AI Generator Features | ${SITE_NAME}`,
    description:
      "Create unique blind box characters with AI. Custom designs, print-ready PDFs, rarity system. Coming soon.",
  },
};

export default function FeaturesPage() {
  return <FeaturesContent />;
}
