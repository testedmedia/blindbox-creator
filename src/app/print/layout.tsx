import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Print Your Blind Box | ${SITE_NAME}`,
  description: "Print your AI-generated kawaii character as a foldable blind box template. Best on 80lb cardstock. Cut, fold, glue, and surprise!",
};

export default function PrintLayout({ children }: { children: React.ReactNode }) {
  return children;
}
