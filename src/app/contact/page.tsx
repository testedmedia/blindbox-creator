import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { ContactContent } from "./contact-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Blind Box Generator team. Questions about templates, AI generator, bulk orders, or business partnerships. We respond within 24-48 hours.",
  openGraph: {
    title: `Contact | ${SITE_NAME}`,
    description:
      "Questions about templates, AI generator, or partnerships? We'd love to hear from you.",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
