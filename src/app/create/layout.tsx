import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `AI Character Generator - Create Custom Blind Box Characters | ${SITE_NAME}`,
  description: "Create unique kawaii blind box characters with AI. Describe your dream character or upload a photo. Free to try, instant download. Print, fold, and collect!",
  openGraph: {
    title: `AI Character Generator | ${SITE_NAME}`,
    description: "Create unique kawaii characters with AI. Free to try!",
  },
};

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
