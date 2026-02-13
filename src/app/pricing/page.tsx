import type { Metadata } from "next";
import Link from "next/link";
import { SUBSCRIPTION_TIERS, formatPrice, SITE_NAME } from "@/lib/constants";
import { Check, Sparkles, Zap, Crown, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Choose your plan for the AI Blind Box Generator. Start free, or lock in founding member pricing at 50% off forever. Unlimited AI generations, custom characters, and more.",
  openGraph: {
    title: `Pricing | ${SITE_NAME}`,
    description:
      "Start free or become a founding member. AI-powered blind box creation starting at $0.",
  },
};

const tierIcons: Record<string, React.ReactNode> = {
  free: <Sparkles className="w-6 h-6" />,
  founding_creator: <Zap className="w-6 h-6" />,
  founding_pro: <Crown className="w-6 h-6" />,
};

const tierColors: Record<string, { gradient: string; border: string; badge: string; cta: string }> = {
  free: {
    gradient: "from-brand-blue/10 to-brand-blue/5",
    border: "border-brand-blue/20",
    badge: "bg-brand-blue/10 text-brand-blue",
    cta: "gradient-blue text-white hover:opacity-90",
  },
  founding_creator: {
    gradient: "from-brand-pink/10 to-brand-purple/10",
    border: "border-brand-pink",
    badge: "bg-brand-pink text-white",
    cta: "gradient-pink text-white hover:opacity-90",
  },
  founding_pro: {
    gradient: "from-brand-purple/10 to-brand-blue/10",
    border: "border-brand-purple/30",
    badge: "bg-brand-purple/10 text-brand-purple",
    cta: "gradient-fun text-white hover:opacity-90",
  },
};

const faqs = [
  {
    q: "What is the AI Blind Box Generator?",
    a: "It's an AI-powered tool that creates unique, printable blind box characters. Describe your character, and our AI generates custom artwork you can print, fold, and collect. Each generation is one-of-a-kind.",
  },
  {
    q: "What does \"Founding Member\" mean?",
    a: "Founding members are our earliest supporters who lock in 50% off pricing permanently. As long as your subscription is active, you keep the founding rate even after prices increase for new members.",
  },
  {
    q: "When does the AI Generator launch?",
    a: "The AI Generator is currently in development. Founding members get early access before public launch. In the meantime, you can browse our pre-made template packs in the shop.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. All subscriptions are billed annually but you can cancel anytime. You'll keep access until the end of your billing period. No cancellation fees, no tricks.",
  },
  {
    q: "What's the difference between Creator and Pro?",
    a: "Creator is perfect for families and hobbyists who want unlimited personal use. Pro adds commercial usage rights, bulk generation, custom branding, team sharing, and API access for teachers, party planners, and businesses.",
  },
  {
    q: "Do I need a printer?",
    a: "Yes! The blind boxes are designed to be printed on cardstock paper. Any home inkjet or laser printer works great. Check our Supplies page for recommended materials.",
  },
  {
    q: "What about the pre-made template packs?",
    a: "Template packs are one-time purchases separate from the AI subscription. They include pre-designed characters and boxes ready to print. You don't need a subscription to buy template packs.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 sm:py-24 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block gradient-warm text-white text-sm font-bold px-4 py-1.5 rounded-full mb-6">
            Founding Member Pricing - Limited Time
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
            Start Creating for{" "}
            <span className="text-gradient">Free</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Try the AI generator free, or lock in founding member rates before
            prices go up. Every plan includes access to our growing library of
            themes.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {SUBSCRIPTION_TIERS.map((tier) => {
            const colors = tierColors[tier.id] || tierColors.free;
            const isPopular = tier.popular;

            return (
              <div
                key={tier.id}
                className={`
                  relative rounded-2xl border-2 bg-gradient-to-br p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1
                  ${colors.gradient} ${colors.border}
                  ${isPopular ? "md:-mt-4 md:mb-0 md:scale-105 shadow-pink" : "shadow-brand"}
                `}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="gradient-pink text-white text-sm font-bold px-5 py-1.5 rounded-full shadow-pink whitespace-nowrap">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Tier Badge */}
                {tier.badge && (
                  <span
                    className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 ${colors.badge}`}
                  >
                    {tier.badge}
                  </span>
                )}

                {/* Icon + Name */}
                <div className="flex items-center gap-3 mb-2">
                  <span className={isPopular ? "text-brand-pink" : "text-brand-blue"}>
                    {tierIcons[tier.id]}
                  </span>
                  <h2 className="text-xl font-extrabold">{tier.name}</h2>
                </div>

                {/* Price */}
                <div className="mb-2">
                  {"originalPrice" in tier && tier.originalPrice && (
                    <span className="text-muted-foreground line-through text-lg mr-2">
                      {formatPrice(tier.originalPrice)}
                    </span>
                  )}
                  <span className="text-4xl font-extrabold">
                    {tier.price === 0 ? "$0" : formatPrice(tier.price)}
                  </span>
                  <span className="text-muted-foreground text-sm ml-1">
                    /{tier.period}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-6">
                  {tier.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          isPopular ? "text-brand-pink" : "text-brand-green"
                        }`}
                      />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={tier.id === "free" ? "/features" : "/features"}
                  className={`block w-full text-center py-3.5 rounded-xl font-bold text-sm transition-all duration-200 ${colors.cta}`}
                >
                  {tier.cta}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Subtext */}
        <p className="text-center text-sm text-muted-foreground mt-8 max-w-xl mx-auto">
          All plans billed annually. Founding member pricing is locked in for
          life. Pre-made template packs sold separately in the{" "}
          <Link href="/shop" className="text-brand-blue font-semibold hover:underline">
            Shop
          </Link>
          .
        </p>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-muted px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-brand-blue font-bold text-sm mb-3">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="bg-white rounded-xl p-6 shadow-sm border border-border"
              >
                <h3 className="font-bold text-base mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Still have questions?
            </p>
            <Link
              href="/contact"
              className="inline-block gradient-blue text-white px-8 py-3 rounded-full font-bold text-sm hover:opacity-90 transition-opacity"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
