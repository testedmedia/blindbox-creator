"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { VERSION } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n";

export function Footer() {
  const { t } = useTranslation();
  const [nlEmail, setNlEmail] = useState("");
  const [nlStatus, setNlStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nlEmail) return;
    setNlStatus("loading");
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: nlEmail, role: "newsletter" }),
      });
      setNlStatus("success");
    } catch {
      setNlStatus("idle");
    }
  };

  const shopLinks = [
    { href: "/shop", label: t("footer.allProducts") },
    { href: "/templates", label: t("footer.templatePacks") },
    { href: "/party-kits", label: t("footer.partyKits") },
    { href: "/classroom", label: t("footer.classroomBundles") },
    { href: "/supplies", label: t("footer.paperSupplies") },
  ];

  const companyLinks = [
    { href: "/about", label: t("footer.about") },
    { href: "/features", label: t("footer.aiGenerator") },
    { href: "/blog", label: t("footer.blog") },
    { href: "/affiliate", label: "💰 Earn 50% Commission", highlight: true },
    { href: "/contact", label: t("footer.contact") },
    { href: "/changelog", label: t("footer.changelog") },
  ];

  const legalLinks = [
    { href: "/terms", label: t("footer.terms") },
    { href: "/privacy", label: t("footer.privacy") },
  ];

  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-extrabold text-xl mb-4">
              <Image src="/logo-blindbox.png" alt="Blind Box Generator" width={36} height={36} className="rounded-lg" />
              <span>Blind Box Generator</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              {t("footer.tagline")}
            </p>
            {/* Newsletter signup */}
            {nlStatus === "success" ? (
              <p className="text-sm text-brand-green font-semibold">{t("footer.nlSuccess")}</p>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2 mb-4">
                <input
                  type="email"
                  value={nlEmail}
                  onChange={(e) => setNlEmail(e.target.value)}
                  placeholder={t("footer.nlPlaceholder")}
                  required
                  className="flex-1 px-3 py-2 rounded-lg text-sm text-foreground bg-gray-800 border border-gray-700 placeholder:text-gray-500 focus:outline-none focus:border-brand-pink"
                />
                <button
                  type="submit"
                  disabled={nlStatus === "loading"}
                  className="bg-brand-pink text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-brand-pink/90 transition-colors disabled:opacity-60 whitespace-nowrap"
                >
                  {nlStatus === "loading" ? "..." : t("footer.nlButton")}
                </button>
              </form>
            )}
            <p className="text-xs text-gray-500">{VERSION}</p>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-4">{t("footer.shop")}</h3>
            <ul className="space-y-2">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-4">{t("footer.company")}</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${
                      link.highlight
                        ? "text-brand-pink font-bold hover:text-brand-pink/80"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-4">{t("footer.legal")}</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Blind Box Generator. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-4">
            <a href="https://tiktok.com/@blindboxgenerator" target="_blank" rel="noopener" className="text-gray-400 hover:text-white transition-colors text-sm">
              TikTok
            </a>
            <a href="https://instagram.com/blindboxgenerator" target="_blank" rel="noopener" className="text-gray-400 hover:text-white transition-colors text-sm">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
