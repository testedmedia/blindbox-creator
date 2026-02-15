import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Earn 50% Commission - Affiliate Program | ${SITE_NAME}`,
  description: "Join the Blind Box Generator affiliate program. Earn 50% commission on every sale. No signup needed, get your link instantly. Share kawaii crafts, earn money.",
  openGraph: {
    title: `Affiliate Program | ${SITE_NAME}`,
    description: "Earn 50% commission sharing kawaii blind box templates.",
  },
};

export default function AffiliateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
