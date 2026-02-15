import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  CheckCircle,
  ArrowRight,
  PartyPopper,
  ClipboardList,
  Scissors,
  Gift,
  Users,
  ShoppingCart,
} from "lucide-react";
import { PARTY_KITS, formatPrice } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Party Kits",
  description:
    "Host an unforgettable blind box birthday party or craft night! Digital party kits with templates, invitations, and planning guides.",
};

const PARTY_STEPS = [
  {
    icon: ClipboardList,
    step: "1",
    title: "Plan Your Party",
    description:
      "Use the included planning checklist. Pick a date, send the printable invitations, and gather supplies.",
    color: "bg-brand-blue",
  },
  {
    icon: Scissors,
    step: "2",
    title: "Prep the Blind Boxes",
    description:
      "Print the templates on cardstock, pre-cut for younger kids or let older kids cut their own.",
    color: "bg-brand-pink",
  },
  {
    icon: Users,
    step: "3",
    title: "Craft & Assemble",
    description:
      "Guide kids through folding and gluing their blind box characters. Each kid gets a unique set!",
    color: "bg-brand-purple",
  },
  {
    icon: Gift,
    step: "4",
    title: "Surprise & Trade!",
    description:
      "Kids open, reveal, and trade characters. Give out the included thank you cards as party favors.",
    color: "bg-brand-orange",
  },
];

export default function PartyKitsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0">
          <Image src="/products/girl-birthday-party.png" alt="Kids at blind box party" width={1200} height={800} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/90 via-brand-pink/85 to-brand-purple/80" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-5xl block mb-4">🎉</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Blind Box Party Kits
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
            Everything you need to host the most creative birthday party or craft night ever. Templates, invitations,
            planning guides, and hours of hands-on fun.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/80">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" /> Instant download
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" /> Ages 4-12
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" /> Print unlimited copies
            </span>
          </div>
        </div>
      </section>

      {/* Party Kits Grid */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-10">
            Choose Your Kit
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {PARTY_KITS.map((kit) => (
              <div
                key={kit.id}
                className="bg-white border-2 border-border rounded-2xl overflow-hidden hover:border-brand-pink/40 hover:shadow-pink transition-all flex flex-col"
              >
                {/* Image area */}
                <div className="bg-brand-pink/5 h-48 flex items-center justify-center relative overflow-hidden">
                  <Image src={kit.id === "kawaii-birthday-kit" ? "/products/party-setup.png" : kit.id === "kawaii-sleepover-kit" ? "/products/finished-collection-display.png" : "/products/gift-wrapping-scene.png"} alt={kit.name} width={500} height={300} className="w-full h-full object-cover" />
                  {kit.badge && (
                    <span className="absolute top-3 right-3 bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-full">
                      {kit.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold mb-3">{kit.name}</h3>
                  <p className="text-muted-foreground mb-6">{kit.description}</p>

                  {/* Features */}
                  {kit.features && (
                    <ul className="space-y-3 mb-8 flex-1">
                      {kit.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <CheckCircle className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                    <span className="text-3xl font-extrabold text-brand-pink">
                      {formatPrice(kit.price)}
                    </span>
                    <Link
                      href={`/api/checkout?product=${kit.id}`}
                      className="gradient-pink text-white px-6 py-3 rounded-full font-bold hover:opacity-90 transition-opacity shadow-pink flex items-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Buy Kit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Host */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <PartyPopper className="w-10 h-10 text-brand-pink mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
              How to Host a Blind Box Party
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Four easy steps to an unforgettable party experience
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PARTY_STEPS.map((step) => (
              <div
                key={step.step}
                className="bg-white rounded-2xl p-6 text-center shadow-sm"
              >
                <div
                  className={`${step.color} w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supplies Section */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-4xl block mb-4">✂️</span>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
            Supplies You&apos;ll Need
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Cardstock, scissors, and glue are all it takes. We put together a curated list of our favorite supplies
            with links to grab them on Amazon.
          </p>

          <div className="bg-muted rounded-2xl p-8 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📄</span>
                <div>
                  <p className="font-bold text-sm">65lb Cardstock</p>
                  <p className="text-xs text-muted-foreground">Essential for sturdy characters</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">✂️</span>
                <div>
                  <p className="font-bold text-sm">Craft Scissors</p>
                  <p className="text-xs text-muted-foreground">Decorative edges for fancy boxes</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🧴</span>
                <div>
                  <p className="font-bold text-sm">Glue Sticks</p>
                  <p className="text-xs text-muted-foreground">Quick-drying, acid-free</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📦</span>
                <div>
                  <p className="font-bold text-sm">Mini Kraft Boxes</p>
                  <p className="text-xs text-muted-foreground">Optional upgrade for real blind boxes</p>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/supplies"
            className="inline-flex items-center gap-2 gradient-blue text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity shadow-brand"
          >
            View Full Supplies List
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="gradient-warm py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
            Need Templates Without the Party Extras?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Grab individual template packs starting at just {formatPrice(499)}, or save 40% with the Mega Bundle.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 bg-white text-brand-orange px-8 py-4 rounded-full font-bold text-lg hover:bg-white/90 transition-colors w-full sm:w-auto justify-center"
            >
              Browse Templates <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-white/20 text-white border-2 border-white/40 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-colors w-full sm:w-auto justify-center"
            >
              Visit Shop
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
