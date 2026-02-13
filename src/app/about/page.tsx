import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import {
  Heart,
  Lightbulb,
  Leaf,
  Smile,
  Accessibility,
  Sparkles,
  ArrowRight,
  Scissors,
  Package,
  Palette,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "We believe every kid deserves the magic of unboxing. Learn how Blind Box Generator turns imagination into real, collectible paper crafts with zero plastic waste.",
  openGraph: {
    title: `About | ${SITE_NAME}`,
    description:
      "The story behind Blind Box Generator. Paper, imagination, and zero plastic waste.",
  },
};

const values = [
  {
    icon: <Lightbulb className="w-7 h-7" />,
    title: "Creativity",
    description:
      "Every child is an artist. We give them the tools to bring their wildest ideas to life, from ninja cats to rainbow robots.",
    color: "bg-brand-yellow/10 text-brand-orange",
  },
  {
    icon: <Accessibility className="w-7 h-7" />,
    title: "Accessibility",
    description:
      "Blind box collecting shouldn't break the bank. A printer and some cardstock is all it takes. We start at $0.",
    color: "bg-brand-blue/10 text-brand-blue",
  },
  {
    icon: <Leaf className="w-7 h-7" />,
    title: "Sustainability",
    description:
      "No plastic packaging, no shipping waste, no factory production. Just paper and imagination. Eco-friendly by design.",
    color: "bg-brand-green/10 text-brand-green",
  },
  {
    icon: <Smile className="w-7 h-7" />,
    title: "Fun",
    description:
      "The magic is in the surprise. Unboxing, collecting, trading, creating. We never lose sight of why we do this: pure joy.",
    color: "bg-brand-pink/10 text-brand-pink",
  },
];

const stats = [
  { value: "120+", label: "Unique Characters" },
  { value: "10", label: "Theme Packs" },
  { value: "0", label: "Plastic Used" },
  { value: "$0", label: "To Start" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-brand-pink font-bold text-sm mb-4">
            <Heart className="w-4 h-4" />
            Our Story
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
            Every Kid Deserves the{" "}
            <span className="text-gradient">Magic of Unboxing</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            We watched our kids obsess over blind boxes at the store, and we
            thought: what if they could create their own? What if the surprise
            wasn't what you buy, but what you imagine?
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-16 sm:py-20 bg-muted px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Story */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">
                From Kitchen Table to AI Magic
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  It started simply: paper, scissors, markers, and a lot of
                  tape. We were parents making homemade blind boxes for birthday
                  parties because the store-bought ones were expensive, plastic
                  heavy, and honestly, kind of boring.
                </p>
                <p>
                  The kids went wild. Not just for the surprise of opening the
                  box, but for the process of making them. Designing characters,
                  choosing rarity levels, trading with friends. It was creative,
                  social, and screen-free.
                </p>
                <p>
                  We thought: what if we could make this easier for every
                  family? What if AI could help kids design characters they
                  couldn't draw themselves? What if a printer and some cardstock
                  was all you needed?
                </p>
                <p className="font-semibold text-foreground">
                  That's how Blind Box Generator was born. No plastic, no
                  shipping, no waste. Just paper, imagination, and the thrill of
                  the unbox.
                </p>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="grid grid-cols-2 gap-4">
              <div className="gradient-blue rounded-2xl p-6 text-white flex flex-col items-center justify-center text-center aspect-square">
                <Scissors className="w-10 h-10 mb-3 opacity-90" />
                <span className="font-bold text-sm">Cut & Fold</span>
              </div>
              <div className="gradient-pink rounded-2xl p-6 text-white flex flex-col items-center justify-center text-center aspect-square">
                <Package className="w-10 h-10 mb-3 opacity-90" />
                <span className="font-bold text-sm">Unbox & Surprise</span>
              </div>
              <div className="gradient-warm rounded-2xl p-6 text-white flex flex-col items-center justify-center text-center aspect-square">
                <Palette className="w-10 h-10 mb-3 opacity-90" />
                <span className="font-bold text-sm">Design & Create</span>
              </div>
              <div className="gradient-fun rounded-2xl p-6 text-white flex flex-col items-center justify-center text-center aspect-square">
                <Sparkles className="w-10 h-10 mb-3 opacity-90" />
                <span className="font-bold text-sm">Collect & Trade</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">
            Our Mission
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed">
            Make blind boxes{" "}
            <span className="text-brand-blue font-bold">educational</span>,{" "}
            <span className="text-brand-pink font-bold">creative</span>, and{" "}
            <span className="text-brand-green font-bold">accessible</span> to
            every child, in every home, in every classroom. No plastic waste.
            Just paper and imagination.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-muted rounded-2xl p-6 text-center"
              >
                <div className="text-3xl sm:text-4xl font-extrabold text-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 bg-muted px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              What We Stand For
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Four values that guide every character we generate, every template
              we design, and every feature we build.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-6 border border-border shadow-sm"
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 ${value.color}`}
                >
                  {value.icon}
                </div>
                <h3 className="font-extrabold text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="gradient-fun rounded-3xl p-8 sm:p-12 text-white">
            <Package className="w-10 h-10 mx-auto mb-4 opacity-90" />
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Ready to Start Creating?
            </h2>
            <p className="text-white/80 mb-8 max-w-md mx-auto">
              Browse our template packs or join the waitlist for the AI
              Generator. Either way, the magic starts now.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/shop"
                className="bg-white text-brand-blue px-8 py-3.5 rounded-full font-bold text-sm hover:bg-white/90 transition-colors flex items-center gap-2"
              >
                Browse Templates
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                className="bg-white/20 text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-white/30 transition-colors"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
