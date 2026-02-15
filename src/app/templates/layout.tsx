import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Template Collections - Browse by Theme | ${SITE_NAME}`,
  description: "Browse kawaii blind box templates by collection: Chibi Animals, Magical Girls, Forest Friends, Pastel Fantasy, Cherry Blossom, and Celestial. 75 packs, 900+ characters.",
  openGraph: {
    title: `Template Collections | ${SITE_NAME}`,
    description: "Browse kawaii blind box templates by collection. 75 packs, 900+ characters.",
  },
};

export default function TemplatesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
