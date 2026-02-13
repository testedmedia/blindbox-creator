import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { BlogContent } from "./blog-content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Crafting tips, party ideas, parenting wins, and the latest from the world of paper blind boxes and AI creativity. The Blind Box Blog.",
  openGraph: {
    title: `Blog | ${SITE_NAME}`,
    description:
      "Crafting tips, party ideas, and creative inspiration from the Blind Box Generator team.",
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
