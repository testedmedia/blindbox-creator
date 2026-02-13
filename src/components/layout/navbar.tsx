"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/constants";
import { Menu, X, Sparkles } from "lucide-react";
import { useTranslation, LanguageToggle } from "@/lib/i18n";

const NAV_LABEL_KEYS: Record<string, string> = {
  "/create": "nav.create",
  "/shop": "nav.shop",
  "/templates": "nav.templates",
  "/pricing": "nav.pricing",
  "/affiliate": "nav.earn",
  "/supplies": "nav.supplies",
};

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-extrabold text-xl">
            <Image src="/logo-blindbox.png" alt="Blind Box Generator" width={36} height={36} className="rounded-lg" />
            <span className="text-gradient hidden sm:inline">Blind Box Generator</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors ${
                  (link as { highlight?: boolean }).highlight
                    ? "text-brand-pink hover:text-brand-pink/80 flex items-center gap-1"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {(link as { highlight?: boolean }).highlight && <Sparkles className="w-3.5 h-3.5" />}
                {NAV_LABEL_KEYS[link.href] ? t(NAV_LABEL_KEYS[link.href]) : link.label}
              </Link>
            ))}
            <LanguageToggle />
            <Link
              href="/create"
              className="gradient-pink text-white px-4 py-2 rounded-full text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              {t("nav.tryFree")}
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageToggle />
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden py-4 border-t border-border animate-in fade-in slide-in-from-top-2 duration-200">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 px-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                {NAV_LABEL_KEYS[link.href] ? t(NAV_LABEL_KEYS[link.href]) : link.label}
              </Link>
            ))}
            <Link
              href="/create"
              onClick={() => setOpen(false)}
              className="block mt-2 gradient-pink text-white px-4 py-3 rounded-xl text-sm font-bold text-center"
            >
              {t("nav.tryGenerator")}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
