"use client";

import Link from "next/link";
import { formatPrice, SUBSCRIPTION_TIERS } from "@/lib/constants";
import {
  Wand2,
  Palette,
  Printer,
  MousePointerClick,
  Star,
  Users,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ImagePlus,
  FileDown,
} from "lucide-react";

const features = [
  {
    icon: <Wand2 className="w-7 h-7" />,
    title: "Custom Character Creation",
    description:
      "Describe any character you can imagine and our AI brings it to life. A ninja cat riding a skateboard? A princess astronaut? Done.",
    color: "bg-brand-blue/10 text-brand-blue",
  },
  {
    icon: <Palette className="w-7 h-7" />,
    title: "Infinite Themes",
    description:
      "From ocean creatures to outer space, fantasy kingdoms to candy land. Unlock every theme or create your own custom worlds.",
    color: "bg-brand-pink/10 text-brand-pink",
  },
  {
    icon: <Printer className="w-7 h-7" />,
    title: "Print-Ready Quality",
    description:
      "Every generation is 300 DPI, perfectly sized for cardstock printing. No design skills needed. Just print and fold.",
    color: "bg-brand-purple/10 text-brand-purple",
  },
  {
    icon: <MousePointerClick className="w-7 h-7" />,
    title: "One-Click Printing",
    description:
      "Download your character as a print-ready PDF with fold lines, glue tabs, and assembly instructions built right in.",
    color: "bg-brand-green/10 text-brand-green",
  },
  {
    icon: <Star className="w-7 h-7" />,
    title: "Rarity System",
    description:
      "Common, rare, epic, legendary. Each generation has a rarity tier with unique visual effects. Collect them all!",
    color: "bg-brand-yellow/10 text-brand-orange",
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: "Trading & Collecting",
    description:
      "Build your collection, trade duplicates with friends, and showcase your rarest finds in the community gallery.",
    color: "bg-brand-orange/10 text-brand-orange",
  },
];

const steps = [
  {
    step: 1,
    icon: <MessageSquare className="w-8 h-8" />,
    title: "Describe Your Character",
    description:
      "Tell the AI what you want. A pirate panda, a rainbow robot, a friendly dragon with glasses. The wilder the better.",
    color: "gradient-blue",
  },
  {
    step: 2,
    icon: <ImagePlus className="w-8 h-8" />,
    title: "AI Generates Art",
    description:
      "Our AI creates a unique character illustration with matching box art, perfectly designed for paper crafting.",
    color: "gradient-pink",
  },
  {
    step: 3,
    icon: <Star className="w-8 h-8" />,
    title: "Choose Rarity & Style",
    description:
      "Pick your rarity tier for special effects. Choose your box style, background pattern, and collector card design.",
    color: "gradient-fun",
  },
  {
    step: 4,
    icon: <FileDown className="w-8 h-8" />,
    title: "Download Print-Ready PDF",
    description:
      "Get a perfectly formatted PDF with fold lines, glue tabs, and step-by-step assembly instructions. Print and enjoy!",
    color: "gradient-warm",
  },
];

export function FeaturesContent() {
  const foundingTier = SUBSCRIPTION_TIERS.find((t) => t.id === "founding_creator");

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 sm:py-24 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 gradient-fun text-white text-sm font-bold px-4 py-1.5 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            Now Live - Try It Free
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
            AI-Powered{" "}
            <span className="text-gradient">Blind Box Generator</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Upload a photo or describe any character you can dream up. Our AI
            turns it into a kawaii blind box collectible in seconds. No design
            skills required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/create"
              className="gradient-pink text-white px-8 py-3.5 rounded-full font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              Create Now - It&apos;s Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/shop"
              className="bg-muted text-foreground px-8 py-3.5 rounded-full font-bold text-sm hover:bg-muted/70 transition-colors"
            >
              Browse Templates
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-16 sm:py-20 bg-muted px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Everything You Need to Create
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A complete creative toolkit that turns imagination into real,
              collectible paper blind boxes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-brand transition-shadow duration-300"
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 ${feature.color}`}
                >
                  {feature.icon}
                </div>
                <h3 className="font-extrabold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              How the AI Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Four simple steps from idea to a real paper blind box in your hands.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.step} className="text-center">
                <div
                  className={`${step.color} w-20 h-20 rounded-2xl flex items-center justify-center text-white mx-auto mb-5 shadow-brand`}
                >
                  {step.icon}
                </div>
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                  Step {step.step}
                </div>
                <h3 className="font-extrabold text-base mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Try It Now CTA */}
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="gradient-fun rounded-3xl p-8 sm:p-12 text-white">
            <Sparkles className="w-10 h-10 mx-auto mb-4 opacity-90" />
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Try It Right Now
            </h2>
            <p className="text-white/80 mb-8 max-w-md mx-auto">
              Upload a photo or type a description. Get 3 free generations every
              day. No account needed.
            </p>

            <Link
              href="/create"
              className="inline-flex items-center gap-2 bg-white text-brand-pink px-8 py-4 rounded-full font-bold text-lg hover:bg-white/90 transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              Create Your Character
            </Link>
          </div>
        </div>
      </section>

      {/* Founding Pricing Teaser */}
      {foundingTier && (
        <section className="py-16 sm:py-20 bg-muted px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Lock in Founding Member Pricing
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Early supporters get {foundingTier.badge?.replace(" - Limited", "")} for life.
              The price goes up after launch, but founders keep their rate forever.
            </p>
            <div className="inline-block bg-white rounded-2xl p-8 border-2 border-brand-pink shadow-pink">
              <div className="mb-2">
                <span className="line-through text-muted-foreground text-lg mr-2">
                  {foundingTier.originalPrice ? formatPrice(foundingTier.originalPrice) : ""}
                </span>
                <span className="text-4xl font-extrabold">
                  {formatPrice(foundingTier.price)}
                </span>
                <span className="text-muted-foreground">/{foundingTier.period}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                {foundingTier.description}
              </p>
              <Link
                href="/pricing"
                className="inline-block gradient-pink text-white px-8 py-3.5 rounded-full font-bold text-sm hover:opacity-90 transition-opacity"
              >
                View All Plans
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
