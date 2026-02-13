"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Palette, Scissors, Gift, Sparkles, Star, ArrowRight, CheckCircle, Mail } from "lucide-react";
import {
  TEMPLATE_PACKS,
  TEMPLATE_COLLECTIONS,
  COLLECTION_GRADIENTS,
  SUBSCRIPTION_TIERS,
  formatPrice,
} from "@/lib/constants";
import { useTranslation } from "@/lib/i18n";

const floatingEmojis = [
  { emoji: "\u{1F338}", top: "10%", left: "5%", delay: "0s" },
  { emoji: "\u{1F431}", top: "20%", right: "8%", delay: "0.5s" },
  { emoji: "\u2728", top: "60%", left: "3%", delay: "1s" },
  { emoji: "\u{1F361}", top: "70%", right: "5%", delay: "1.5s" },
  { emoji: "\u{1F984}", top: "40%", left: "7%", delay: "0.8s" },
  { emoji: "\u{1F370}", top: "50%", right: "4%", delay: "1.2s" },
];

export default function Home() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const howItWorks = [
    {
      icon: Palette,
      title: t("home.step1Title"),
      description: t("home.step1Desc"),
      color: "bg-brand-blue",
    },
    {
      icon: Scissors,
      title: t("home.step2Title"),
      description: t("home.step2Desc"),
      color: "bg-brand-pink",
    },
    {
      icon: Gift,
      title: t("home.step3Title"),
      description: t("home.step3Desc"),
      color: "bg-brand-purple",
    },
  ];

  const foundingTier = SUBSCRIPTION_TIERS.find((tier) => tier.id === "founding_creator")!;
  const featuredTemplates = TEMPLATE_PACKS.slice(0, 6);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
    } catch {
      // fail silently for now
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ====== HERO ====== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-pink-50 via-white to-white py-16 md:py-24">
        {/* Floating emojis */}
        {floatingEmojis.map((item, i) => (
          <span
            key={i}
            className="animate-float absolute text-3xl md:text-5xl pointer-events-none select-none hidden md:block"
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              animationDelay: item.delay,
            } as React.CSSProperties}
          >
            {item.emoji}
          </span>
        ))}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-brand-pink/10 text-brand-pink px-4 py-1.5 rounded-full text-sm font-bold mb-6">
                <Sparkles className="w-4 h-4" />
                26 Kawaii Packs &bull; 300+ Characters
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
                {t("home.title1")}
                <br />
                <span className="text-gradient">{t("home.title2")}</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mb-8">
                {t("home.heroSubtitle")}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 lg:justify-start justify-center">
                <Link
                  href="/shop"
                  className="gradient-pink text-white px-8 py-4 rounded-full text-lg font-bold hover:opacity-90 transition-opacity shadow-pink flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  {t("home.shopTemplates")}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/create"
                  className="bg-white border-2 border-brand-purple text-brand-purple px-8 py-4 rounded-full text-lg font-bold hover:bg-brand-purple/5 transition-colors w-full sm:w-auto text-center flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  {t("home.tryAI")}
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-5 mt-8 text-sm text-muted-foreground lg:justify-start justify-center">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-green" /> {t("home.download2min")}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-green" /> {t("home.noCraft")}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-green" /> {t("home.perfectAges")}
                </span>
              </div>
            </div>

            {/* Hero Product Photo */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/products/girl-surprised-unboxing.png"
                  alt="Happy girl opening kawaii paper blind box at birthday party"
                  width={1024}
                  height={1024}
                  className="w-full h-auto"
                  priority
                />
              </div>
              {/* Floating mini photos */}
              <div className="absolute -bottom-4 -left-4 w-28 h-28 rounded-2xl overflow-hidden shadow-xl border-4 border-white hidden md:block">
                <Image src="/products/hero-kawaii-collection.png" alt="Kawaii collection" width={200} height={200} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl overflow-hidden shadow-xl border-4 border-white hidden md:block">
                <Image src="/products/child-crafting-closeup.png" alt="Child crafting" width={200} height={200} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== PRODUCT SHOWCASE ====== */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: "/products/collection-chibi-animals.png", label: "Chibi Animals" },
              { src: "/products/collection-sweet-treats.png", label: "Sweet Treats" },
              { src: "/products/collection-magical.png", label: "Magical Girls" },
              { src: "/products/collection-food.png", label: "Food Cuties" },
            ].map((item) => (
              <Link key={item.label} href="/templates" className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <Image src={item.src} alt={item.label} width={512} height={512} className="w-full h-auto group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <span className="text-white font-bold text-sm">{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ====== LIFESTYLE GALLERY ====== */}
      <section className="bg-gradient-to-b from-pink-50/50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3">
            {t("home.familyCraft")} <span className="text-gradient">{t("home.familyCraftHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-lg mx-auto">
            {t("home.familyCraftSubtitle")}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {[
              { src: "/products/girl-birthday-party.png", label: "Birthday parties they'll never forget", span: "md:col-span-2 md:row-span-2" },
              { src: "/products/product-lifestyle-desk.png", label: "Everything included - just add a printer" },
              { src: "/products/child-crafting-closeup.png", label: "Kids do it themselves (with a little help!)" },
              { src: "/products/finished-collection-display.png", label: "Collect and display their creations" },
              { src: "/products/gift-wrapping-scene.png", label: "The perfect gift for any occasion" },
            ].map((item) => (
              <div key={item.label} className={`relative rounded-2xl overflow-hidden shadow-md group ${item.span || ""}`}>
                <Image src={item.src} alt={item.label} width={800} height={800} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white font-bold text-sm">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== HOW IT WORKS ====== */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">
            {t("home.soEasy")}
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
            {t("home.soEasySubtitle")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, i) => {
              const photos = ["/products/template-closeup.png", "/products/child-crafting-closeup.png", "/products/girl-surprised-unboxing.png"];
              return (
                <div
                  key={step.title}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-brand transition-shadow border border-border"
                >
                  <div className="h-40 overflow-hidden">
                    <Image src={photos[i]} alt={step.title} width={400} height={300} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 text-center">
                    <div
                      className={`${step.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 -mt-10 relative z-10 shadow-lg border-4 border-white`}
                    >
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== FEATURED TEMPLATES ====== */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-2">
                {t("home.featuredTemplates")}
              </h2>
              <p className="text-muted-foreground">
                {t("home.featuredSubtitle")}
              </p>
            </div>
            <Link
              href="/templates"
              className="text-brand-blue font-bold hover:underline flex items-center gap-1 shrink-0"
            >
              {t("home.viewAll")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTemplates.map((pack) => {
              const gradient = COLLECTION_GRADIENTS[pack.collection] || "from-pink-100 to-purple-100";
              return (
                <Link
                  key={pack.id}
                  href={`/shop/${pack.id}`}
                  className="group bg-white border border-border rounded-2xl overflow-hidden hover:shadow-brand transition-all hover:-translate-y-1"
                >
                  <div className={`bg-gradient-to-br ${gradient} h-40 flex items-center justify-center relative overflow-hidden`}>
                    {pack.image?.startsWith("/products/packs/") ? (
                      <Image src={pack.image} alt={pack.name} width={400} height={400} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <span className="text-6xl drop-shadow-sm group-hover:scale-110 transition-transform">{pack.emoji || "\u{1F3A8}"}</span>
                    )}
                    {pack.badge && (
                      <span className="absolute top-2 right-2 bg-brand-pink text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                        {pack.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-lg group-hover:text-brand-blue transition-colors">
                        {pack.name}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {pack.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-extrabold text-brand-blue">
                        {formatPrice(pack.price)}
                      </span>
                      <span className="text-sm font-semibold text-brand-blue group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        {t("home.viewPack")} <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== PARTY & CLASSROOM ====== */}
      <section className="bg-muted py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
            {t("home.beyondTemplates")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Party Kits */}
            <div className="rounded-2xl overflow-hidden text-white relative">
              <div className="absolute inset-0">
                <Image src="/products/girl-birthday-party.png" alt="Birthday party with blind boxes" width={800} height={600} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/90 to-brand-pink/80" />
              </div>
              <div className="relative p-8 md:p-10">
              <span className="text-4xl mb-4 block">{"\u{1F389}"}</span>
              <h3 className="text-2xl font-extrabold mb-3">{t("home.partyKits")}</h3>
              <p className="mb-6 text-white/90">
                {t("home.partyDesc")}
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 shrink-0" /> {t("home.partyFeature1")}
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 shrink-0" /> {t("home.partyFeature2")}
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 shrink-0" /> {t("home.partyFeature3")}
                </li>
              </ul>
              <Link
                href="/party-kits"
                className="inline-flex items-center gap-2 bg-white text-brand-orange font-bold px-6 py-3 rounded-full hover:bg-white/90 transition-colors"
              >
                {t("home.exploreParty")} <ArrowRight className="w-4 h-4" />
              </Link>
              </div>
            </div>

            {/* Classroom Bundles */}
            <div className="rounded-2xl overflow-hidden text-white relative">
              <div className="absolute inset-0">
                <Image src="/products/product-lifestyle-desk.png" alt="Craft supplies on desk" width={800} height={600} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/90 to-brand-blue/80" />
              </div>
              <div className="relative p-8 md:p-10">
              <span className="text-4xl mb-4 block">{"\u{1F3EB}"}</span>
              <h3 className="text-2xl font-extrabold mb-3">{t("home.classroomBundles")}</h3>
              <p className="mb-6 text-white/90">
                {t("home.classroomDesc")}
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 shrink-0" /> {t("home.classroomFeature1")}
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 shrink-0" /> {t("home.classroomFeature2")}
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 shrink-0" /> {t("home.classroomFeature3")}
                </li>
              </ul>
              <Link
                href="/classroom"
                className="inline-flex items-center gap-2 bg-white text-brand-purple font-bold px-6 py-3 rounded-full hover:bg-white/90 transition-colors"
              >
                {t("home.exploreClassroom")} <ArrowRight className="w-4 h-4" />
              </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== FOUNDING MEMBER CTA ====== */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-brand-purple/5 via-brand-pink/5 to-brand-blue/5 rounded-3xl p-8 md:p-14 border border-brand-purple/20">
            <div className="inline-flex items-center gap-2 bg-brand-purple/10 text-brand-purple px-4 py-1.5 rounded-full text-sm font-bold mb-6">
              <Star className="w-4 h-4" />
              {foundingTier.badge}
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              {t("home.foundingMember")}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-lg">
              {t("home.foundingDesc")} <span className="font-bold text-brand-purple">{t("home.foundingDescHighlight")}</span>.{" "}
              {t("home.foundingDescEnd")}
            </p>

            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="text-3xl md:text-4xl font-extrabold text-brand-purple">
                {formatPrice(foundingTier.price)}
              </span>
              <span className="text-lg text-muted-foreground">{t("home.perYear")}</span>
              {foundingTier.originalPrice && (
                <span className="text-lg text-muted-foreground line-through ml-1">
                  {formatPrice(foundingTier.originalPrice)}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto mb-10 text-left">
              {foundingTier.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-brand-purple shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 gradient-pink text-white px-8 py-4 rounded-full text-lg font-bold hover:opacity-90 transition-opacity shadow-pink"
            >
              {foundingTier.cta}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ====== EMAIL CAPTURE ====== */}
      <section className="gradient-blue py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Mail className="w-12 h-12 text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            {t("home.emailTitle")}
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            {t("home.emailSubtitle")}
          </p>

          {submitted ? (
            <div className="bg-white/20 backdrop-blur rounded-2xl p-6 inline-flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-brand-yellow" />
              <span className="text-white font-bold text-lg">{t("home.emailSuccess")}</span>
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("home.emailPlaceholder")}
                required
                className="flex-1 px-5 py-4 rounded-full text-foreground font-semibold placeholder:text-muted-foreground focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-brand-yellow text-foreground px-8 py-4 rounded-full font-bold hover:bg-brand-yellow/90 transition-colors disabled:opacity-60"
              >
                {loading ? t("home.emailSending") : t("home.emailButton")}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
