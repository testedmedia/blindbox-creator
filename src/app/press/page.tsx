import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import {
  Download,
  Camera,
  Users,
  TrendingUp,
  Mail,
  ExternalLink,
  CheckCircle,
  Sparkles,
  Heart,
  Gift,
  Star,
  Video,
  FileText,
  Palette,
} from "lucide-react";
import { CopyButton } from "@/components/copy-button";

export const metadata: Metadata = {
  title: "Press Kit",
  description:
    "Press kit and media resources for Blind Box Creator. Brand assets, statistics, influencer partnerships, and media contact information.",
  openGraph: {
    title: `Press Kit | ${SITE_NAME}`,
    description:
      "Brand assets, stats, and partnership opportunities for Blind Box Creator.",
  },
};

const stats = [
  { value: "75", label: "Template Packs", icon: Gift },
  { value: "900+", label: "Characters", icon: Sparkles },
  { value: "2,500+", label: "Families", icon: Users },
  { value: "10K+", label: "AI Generations", icon: Star },
];

const mediaAssets = [
  {
    title: "Logos",
    description: "PNG and SVG formats, light and dark versions",
    icon: Sparkles,
    files: ["Logo PNG (1024x1024)", "Logo SVG (vector)", "Logo Dark Mode"],
  },
  {
    title: "Product Photos",
    description: "High-resolution pack covers and lifestyle shots",
    icon: Camera,
    files: ["75 Pack Covers (4K)", "Lifestyle Photos (12)", "Step Photos (225)"],
  },
  {
    title: "Brand Colors",
    description: "Official color palette and gradients",
    icon: Palette,
    files: ["Hex codes", "Tailwind config", "Figma palette"],
  },
  {
    title: "Demo Video",
    description: "30-second product walkthrough",
    icon: Video,
    files: ["MP4 (1080p)", "Vertical (9:16)", "Square (1:1)"],
  },
];

const influencerTiers = [
  {
    tier: "Nano",
    followers: "1K-10K",
    offer: "Free Founding Pro account ($29.99/mo value) + 50% affiliate commission",
    ask: "1 Instagram post or Reel + Story mentions",
    color: "bg-brand-blue/10 text-brand-blue",
  },
  {
    tier: "Micro",
    followers: "10K-100K",
    offer: "Everything in Nano + Custom discount code + Featured on our Instagram",
    ask: "1 YouTube video or TikTok + 3 Instagram posts/Reels",
    color: "bg-brand-pink/10 text-brand-pink",
  },
  {
    tier: "Macro",
    followers: "100K-1M",
    offer: "Everything in Micro + Co-branded template pack + $500 bonus for 50+ referrals",
    ask: "1 dedicated YouTube video (10+ min) + Weekly content for 1 month",
    color: "bg-brand-purple/10 text-brand-purple",
  },
  {
    tier: "Mega",
    followers: "1M+",
    offer: "Everything in Macro + $1K-$5K cash payment + Exclusive product line partnership",
    ask: "Multi-video series + Cross-platform campaign",
    color: "bg-brand-orange/10 text-brand-orange",
  },
];

const sampleScripts = [
  {
    platform: "Instagram Caption",
    script: `We just discovered the coolest way to keep the kids busy (and screen-free!) 🌸✨

Blind Box Creator lets you design custom kawaii characters with AI, print them, and fold them into surprise blind boxes. My kids are OBSESSED.

The best part? No plastic, no shipping, just print at home. They have 75 different packs (we love the Chibi Animals 🐱) and you can even create your own characters.

Use code [YOURCODE] for 20% off! Link in bio.

#blindbox #kidscraft #kawaii #craftymom #screenfreefun #papercraft #momhack`,
  },
  {
    platform: "TikTok Hook",
    script: `POV: You just found the easiest way to keep kids busy for hours ✨

[Show AI generator] Type what you want → [show generated character] Instant kawaii magic → [show printing] Print it out → [show kid assembling] They build their own blind box → [show kid's reaction] Pure joy!

No mess, no plastic, just paper and imagination. Link in bio! 🌸

#momhack #kidsactivities #blindbox #kawaii #craftideas #parentingtips`,
  },
  {
    platform: "YouTube Description",
    script: `In this video, I'm showing you Blind Box Creator - the coolest printable craft activity for kids! We tested 5 different template packs and used the AI generator to create custom characters. Perfect for birthday parties, rainy days, or classroom rewards.

🌸 What is Blind Box Creator?
An AI-powered platform that lets you generate kawaii blind box characters, print them at home, and fold them into surprise boxes. Think of it like Pokemon cards meets paper crafts!

✨ What we love:
• 75 template packs (12 characters each)
• AI character generator (text or photo)
• Rarity system (Common, Rare, Epic, Legendary)
• Zero plastic waste
• Works with any printer

Use code [YOURCODE] for 20% off!
Link: [your affiliate link]

Timestamps:
0:00 - Unboxing the digital packs
2:15 - Testing the AI generator
5:30 - Printing and assembly
8:45 - Kids' reactions
10:20 - Final thoughts

#blindbox #kidscraft #printables`,
  },
];

export default function PressPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 sm:py-24 px-4 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-brand-pink font-bold text-sm mb-4">
            <Camera className="w-4 h-4" />
            Press Kit
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
            Build Memories Together with{" "}
            <span className="text-gradient">Blind Box Creator</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            AI-powered kawaii blind box paper crafts for families, teachers, and
            crafters. No plastic, no shipping, just imagination.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:press@blindbox-creator.com"
              className="bg-brand-blue text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-brand-blue/90 transition-colors flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Contact Press Team
            </a>
            <a
              href="#influencer"
              className="bg-white border-2 border-brand-pink text-brand-pink px-8 py-3.5 rounded-full font-bold text-sm hover:bg-pink-50 transition-colors"
            >
              Influencer Partnerships
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-muted rounded-2xl p-6 text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-brand-pink" />
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

      {/* Brand Story */}
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center">
            Our Story
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground">Blind Box Creator</strong> was
              born from a simple idea: what if kids could create their own blind
              boxes instead of buying expensive plastic ones?
            </p>
            <p>
              We watched our children obsess over blind box collectibles at the
              store—spending allowance money on mystery toys that often
              disappointed. So we built something better: an AI-powered platform
              that lets families design, print, and fold their own kawaii blind
              boxes at home.
            </p>
            <p>
              Today, we offer <strong className="text-foreground">75 template packs</strong> with{" "}
              <strong className="text-foreground">900+ characters</strong>, an AI
              generator that creates custom characters from text or photos, and a{" "}
              <strong className="text-foreground">50% affiliate program</strong> for
              creators who share our mission.
            </p>
            <p>
              Our platform is{" "}
              <strong className="text-foreground">family-focused</strong>,{" "}
              <strong className="text-foreground">eco-friendly</strong> (zero
              plastic), and <strong className="text-foreground">accessible</strong>{" "}
              (starting at $0). We&apos;re helping{" "}
              <strong className="text-foreground">2,500+ families</strong> build
              memories together, one paper craft at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Media Assets */}
      <section className="py-16 sm:py-20 bg-muted px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Media Assets
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              High-resolution brand assets, product photos, and marketing
              materials. All files are free to use for editorial purposes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {mediaAssets.map((asset) => (
              <div
                key={asset.title}
                className="bg-white rounded-2xl p-6 border border-border shadow-sm"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-brand-pink/10 text-brand-pink p-3 rounded-xl">
                    <asset.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg mb-1">
                      {asset.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {asset.description}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {asset.files.map((file) => (
                    <li
                      key={file}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle className="w-4 h-4 text-brand-green" />
                      {file}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="mailto:press@blindbox-creator.com?subject=Media%20Asset%20Request"
              className="inline-flex items-center gap-2 bg-brand-blue text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-brand-blue/90 transition-colors"
            >
              <Download className="w-4 h-4" />
              Request Media Kit
            </a>
            <p className="text-sm text-muted-foreground mt-4">
              All assets available via email. Response within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Product Overview */}
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              What We Offer
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-muted rounded-2xl p-6">
              <Gift className="w-10 h-10 text-brand-pink mb-4" />
              <h3 className="font-extrabold text-lg mb-2">75 Template Packs</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Kawaii-themed packs with 12 characters each. Chibi Animals,
                Sweet Bakery, Magical Girls, and more. $4.99 each.
              </p>
              <Link
                href="/shop"
                className="text-brand-blue font-bold text-sm flex items-center gap-1 hover:underline"
              >
                Browse Shop <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            <div className="bg-muted rounded-2xl p-6">
              <Sparkles className="w-10 h-10 text-brand-purple mb-4" />
              <h3 className="font-extrabold text-lg mb-2">AI Character Generator</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create custom characters with text prompts or photo uploads.
                Rarity system: Common, Rare, Epic, Legendary. 3 free daily.
              </p>
              <Link
                href="/create"
                className="text-brand-blue font-bold text-sm flex items-center gap-1 hover:underline"
              >
                Try Generator <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            <div className="bg-muted rounded-2xl p-6">
              <Heart className="w-10 h-10 text-brand-pink mb-4" />
              <h3 className="font-extrabold text-lg mb-2">Party & Classroom Kits</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Birthday party bundles (10-30 kids) and classroom packs for
                teachers. Bulk pricing available. Perfect for events.
              </p>
              <Link
                href="/party-kits"
                className="text-brand-blue font-bold text-sm flex items-center gap-1 hover:underline"
              >
                View Kits <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Influencer Partnerships */}
      <section id="influencer" className="py-16 sm:py-20 bg-muted px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-brand-pink font-bold text-sm mb-4">
              <Users className="w-4 h-4" />
              Influencer Partnerships
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Grow Your Audience, Earn 50%
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer tiered partnerships for creators of all sizes. Free Pro
              accounts, co-branded packs, and up to{" "}
              <strong className="text-foreground">$5K cash payments</strong> for
              top creators.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {influencerTiers.map((tier) => (
              <div
                key={tier.tier}
                className="bg-white rounded-2xl p-6 border border-border"
              >
                <div
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-bold mb-4 ${tier.color}`}
                >
                  {tier.tier}
                </div>
                <div className="text-2xl font-extrabold mb-1">
                  {tier.followers}
                </div>
                <div className="text-xs text-muted-foreground mb-4">
                  Followers
                </div>

                <div className="space-y-3 mb-6">
                  <div>
                    <div className="text-xs font-bold text-brand-green mb-1">
                      ✓ You Get
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {tier.offer}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-blue mb-1">
                      ✓ We Ask For
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {tier.ask}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-brand-pink to-brand-purple rounded-3xl p-8 text-white text-center">
            <TrendingUp className="w-10 h-10 mx-auto mb-4 opacity-90" />
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-4">
              Interested in Partnering?
            </h3>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              We&apos;d love to work with you! Email us with your media kit, audience
              demographics, and partnership tier you&apos;re interested in.
            </p>
            <a
              href="mailto:press@blindbox-creator.com?subject=Influencer%20Partnership%20Inquiry"
              className="inline-flex items-center gap-2 bg-white text-brand-pink px-8 py-3.5 rounded-full font-bold text-sm hover:bg-white/90 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Apply for Partnership
            </a>
          </div>
        </div>
      </section>

      {/* Sample Scripts */}
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Sample Scripts
            </h2>
            <p className="text-muted-foreground">
              Pre-written captions and hooks you can customize and use. Feel
              free to adapt to match your voice!
            </p>
          </div>

          <div className="space-y-6">
            {sampleScripts.map((sample) => (
              <div
                key={sample.platform}
                className="bg-muted rounded-2xl p-6 border border-border"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-brand-pink" />
                    <h3 className="font-extrabold text-lg">
                      {sample.platform}
                    </h3>
                  </div>
                  <CopyButton text={sample.script} />
                </div>
                <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-sans bg-white p-4 rounded-xl border border-border">
                  {sample.script}
                </pre>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 sm:py-20 bg-muted px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">
            Get in Touch
          </h2>
          <p className="text-muted-foreground mb-8">
            For press inquiries, partnership opportunities, or media kit
            requests, reach out to our team.
          </p>

          <div className="bg-white rounded-2xl p-8 border border-border">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-bold text-muted-foreground mb-1">
                  Press Contact
                </div>
                <a
                  href="mailto:press@blindbox-creator.com"
                  className="text-brand-blue font-bold hover:underline flex items-center gap-1"
                >
                  press@blindbox-creator.com
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div>
                <div className="text-sm font-bold text-muted-foreground mb-1">
                  Response Time
                </div>
                <div className="font-bold">Within 24 hours</div>
              </div>

              <div>
                <div className="text-sm font-bold text-muted-foreground mb-1">
                  Website
                </div>
                <a
                  href="https://blindbox-creator.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-blue font-bold hover:underline flex items-center gap-1"
                >
                  blindbox-creator.vercel.app
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div>
                <div className="text-sm font-bold text-muted-foreground mb-1">
                  Social Media
                </div>
                <div className="font-bold">@blindboxcreator</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
