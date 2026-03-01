import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { RefTracker } from "@/components/ref-tracker";
import { Providers } from "@/components/providers";
import { GoogleAnalytics } from "@/components/analytics";
import { ExitIntentPopup } from "@/components/exit-intent-popup";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://blindbox-creator.vercel.app"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Blind Box Generator - Create Magical Paper Blind Boxes with AI",
    template: "%s | Blind Box Generator",
  },
  description: "Create magical paper blind boxes with AI-generated characters. Print, fold, and surprise! Digital templates, party kits, and classroom bundles. $0 to start.",
  keywords: ["blind box", "paper craft", "AI generator", "kids crafts", "birthday party", "classroom activity", "printable templates"],
  openGraph: {
    title: "Blind Box Generator - Create Magical Paper Blind Boxes with AI",
    description: "Print, fold, surprise! AI-generated paper blind box characters for kids, parties, and classrooms.",
    url: "https://blindbox-creator.vercel.app",
    siteName: "Blind Box Generator",
    type: "website",
    images: [
      {
        url: "https://blindbox-creator.vercel.app/og-default.png",
        width: 1200,
        height: 630,
        alt: "Blind Box Generator - AI-Powered Paper Blind Boxes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blind Box Generator",
    description: "Create magical paper blind boxes with AI. Print, fold, surprise!",
    images: ["https://blindbox-creator.vercel.app/og-default.png"],
  },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Blind Box Generator",
  url: "https://blindbox-creator.vercel.app",
  logo: "https://blindbox-creator.vercel.app/og-default.png",
  description:
    "Create magical paper blind boxes with AI-generated characters. Print, fold, and surprise!",
  sameAs: [],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Blind Box Generator",
  url: "https://blindbox-creator.vercel.app",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://blindbox-creator.vercel.app/shop?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <GoogleAnalytics />
        <Providers>
          <Navbar />
          <RefTracker />
          <ExitIntentPopup />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
