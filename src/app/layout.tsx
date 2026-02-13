import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { RefTracker } from "@/components/ref-tracker";
import { Providers } from "@/components/providers";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Blind Box Generator",
    description: "Create magical paper blind boxes with AI. Print, fold, surprise!",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <RefTracker />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
