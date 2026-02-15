import type { Metadata } from "next";
import Link from "next/link";
import { Download, Star, Gift, Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import { TEMPLATE_PACKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "10 Free Printable Blind Box Templates (Kawaii Edition 2026)",
  description:
    "Download free kawaii blind box printable templates. DIY paper crafts for kids, birthday parties, and classroom activities. Print at home, no shipping!",
  keywords: [
    "printable blind box template",
    "kawaii craft printables",
    "DIY blind box",
    "free blind box template",
    "paper craft templates",
    "kids craft activities",
    "birthday party crafts",
    "classroom printables",
  ],
  openGraph: {
    title: "10 Free Printable Blind Box Templates (Kawaii Edition)",
    description: "Free kawaii blind box templates you can print at home. Perfect for kids, parties, and classrooms!",
    type: "article",
    publishedTime: "2026-02-15T00:00:00Z",
    authors: ["Blind Box Creator Team"],
  },
};

const freeTemplates = TEMPLATE_PACKS.slice(0, 10);

const benefits = [
  {
    icon: Download,
    title: "Instant Download",
    description: "Print immediately, no waiting for shipping",
  },
  {
    icon: Gift,
    title: "Perfect for Parties",
    description: "Birthday favors, classroom rewards, or rainy day fun",
  },
  {
    icon: Sparkles,
    title: "Zero Waste",
    description: "No plastic packaging, eco-friendly paper crafts",
  },
  {
    icon: Star,
    title: "AI-Powered",
    description: "Generate unlimited custom characters with AI",
  },
];

const steps = [
  {
    step: 1,
    title: "Choose Your Pack",
    description: "Browse 75+ kawaii template packs below (10 featured here are free to try)",
  },
  {
    step: 2,
    title: "Download & Print",
    description: "PDF templates print on standard 8.5x11\" cardstock or paper",
  },
  {
    step: 3,
    title: "Cut & Fold",
    description: "Follow the fold lines and assemble your blind box in 5 minutes",
  },
  {
    step: 4,
    title: "Surprise!",
    description: "Kids open their mystery box and discover which character they got",
  },
];

const faqs = [
  {
    question: "What paper should I use for blind box templates?",
    answer: "Cardstock (110lb or 65lb) works best for durability. Regular printer paper works too but boxes will be more delicate. For holographic Legendary characters, try metallic cardstock!",
  },
  {
    question: "How many characters come in each pack?",
    answer: "Each template pack includes 12 unique kawaii characters plus box designs, assembly guide, and rarity badges (Common, Rare, Epic, Legendary). Kids never know which rarity they'll get!",
  },
  {
    question: "Can I use these for birthday parties?",
    answer: "Absolutely! Our Party Kits include enough templates for 10-30 kids. Print, pre-cut the pieces, and let kids assemble at the party. Way cheaper than store-bought party favors and zero plastic waste.",
  },
  {
    question: "Do I need special software to open the templates?",
    answer: "Nope! Templates are PDF files that open in any browser, Adobe Reader, or Preview (Mac). Just download, open, and print. No design skills needed.",
  },
  {
    question: "Can I create my own custom characters?",
    answer: "Yes! Use our AI Character Generator (3 free daily, unlimited with Pro). Type a prompt like 'ninja cat with sword' or upload a photo, and AI creates a kawaii blind box character instantly.",
  },
  {
    question: "Are these really free?",
    answer: "The 10 templates featured in this post are completely free to download and print. We also offer 65 more premium packs ($4.99 each) plus subscription plans for unlimited access to everything.",
  },
];

export default function BlogPost() {
  return (
    <article className="min-h-screen bg-white">
      {/* Hero */}
      <header className="bg-gradient-to-b from-pink-50 to-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block bg-brand-pink/10 text-brand-pink px-4 py-1.5 rounded-full text-sm font-bold mb-4">
              Free Printables
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
              10 Free Printable Blind Box Templates{" "}
              <span className="text-gradient">(Kawaii Edition)</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Download free kawaii blind box templates you can print at home. Perfect for kids, birthday parties, classroom rewards, and screen-free fun. No shipping, no plastic, just paper and imagination.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/shop"
                className="bg-brand-blue text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-brand-blue/90 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Browse All 75 Packs
              </Link>
              <Link
                href="/create"
                className="bg-white border-2 border-brand-pink text-brand-pink px-8 py-3.5 rounded-full font-bold text-sm hover:bg-pink-50 transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Try AI Generator Free
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-white rounded-xl p-4 border border-border text-center">
                <benefit.icon className="w-6 h-6 mx-auto mb-2 text-brand-pink" />
                <div className="text-xs font-bold text-muted-foreground">{benefit.title}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Introduction */}
        <section className="prose prose-lg max-w-none mb-16">
          <h2 className="text-3xl font-extrabold mb-6">What Are Blind Box Templates?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            If you&apos;ve ever seen kids go wild over mystery toys at the store, you know the magic of blind boxes. The thrill of not knowing what&apos;s inside, the rarity system (Common, Rare, Epic, Legendary), the collecting and trading with friends—it&apos;s addictive!
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            But here&apos;s the problem: store-bought blind boxes are expensive ($5-$15 each!), wrapped in plastic, and kids often get duplicates. That&apos;s where <strong>printable blind box templates</strong> come in.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Our kawaii blind box templates let you <strong>print unlimited characters at home</strong> for pennies. Each template pack includes 12 adorable characters, box net designs, fold lines, and a rarity system. Kids cut, fold, and assemble their own surprise boxes—then trade with friends!
          </p>
          <div className="bg-brand-blue/10 border-l-4 border-brand-blue p-4 rounded-r-lg my-6">
            <p className="text-sm font-semibold text-brand-blue mb-1">💡 Pro Tip</p>
            <p className="text-sm text-muted-foreground m-0">
              Print on cardstock (110lb) for best results. Laminate Legendary characters for extra durability!
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-extrabold mb-8 text-center">How to Use These Templates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.step} className="bg-muted rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-pink to-brand-purple text-white rounded-full flex items-center justify-center text-xl font-extrabold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-extrabold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Templates */}
        <section className="mb-16">
          <h2 className="text-3xl font-extrabold mb-8 text-center">10 Free Kawaii Blind Box Templates</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Each pack includes 12 characters, box designs, assembly instructions, and rarity badges. Click any pack to download instantly!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {freeTemplates.map((pack, idx) => (
              <Link
                key={pack.id}
                href={`/shop/${pack.id}`}
                className="group bg-white border-2 border-border rounded-2xl p-4 hover:border-brand-pink hover:shadow-lg transition-all"
              >
                <div className="aspect-square rounded-xl mb-4 overflow-hidden bg-muted flex items-center justify-center relative">
                  <span className="text-6xl">{pack.emoji}</span>
                  {idx === 0 && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      🔥 Popular
                    </span>
                  )}
                </div>
                <h3 className="font-extrabold mb-1 group-hover:text-brand-pink transition-colors">
                  {pack.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{pack.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-green">12 Characters</span>
                  <ArrowRight className="w-4 h-4 text-brand-pink opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-brand-pink text-white px-8 py-3.5 rounded-full font-bold hover:bg-brand-pink/90 transition-colors"
            >
              See All 75 Packs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Why Printable Blind Boxes? */}
        <section className="prose prose-lg max-w-none mb-16">
          <h2 className="text-3xl font-extrabold mb-6">Why Parents Love Printable Blind Boxes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 not-prose">
            <div className="bg-muted rounded-xl p-6">
              <CheckCircle className="w-8 h-8 text-brand-green mb-3" />
              <h3 className="font-extrabold mb-2">Save Money</h3>
              <p className="text-sm text-muted-foreground">
                Store-bought blind boxes cost $5-$15 each. Our templates cost pennies per character. One $4.99 pack = 12 characters you can print unlimited times!
              </p>
            </div>
            <div className="bg-muted rounded-xl p-6">
              <CheckCircle className="w-8 h-8 text-brand-green mb-3" />
              <h3 className="font-extrabold mb-2">Screen-Free Fun</h3>
              <p className="text-sm text-muted-foreground">
                Kids spend 30+ minutes cutting, folding, and assembling. Then hours playing, trading, and creating stories with their characters. No screens required!
              </p>
            </div>
            <div className="bg-muted rounded-xl p-6">
              <CheckCircle className="w-8 h-8 text-brand-green mb-3" />
              <h3 className="font-extrabold mb-2">Zero Waste</h3>
              <p className="text-sm text-muted-foreground">
                No plastic packaging, no shipping boxes, no landfill waste. Just recyclable paper. Eco-friendly crafting parents can feel good about!
              </p>
            </div>
            <div className="bg-muted rounded-xl p-6">
              <CheckCircle className="w-8 h-8 text-brand-green mb-3" />
              <h3 className="font-extrabold mb-2">Perfect for Parties</h3>
              <p className="text-sm text-muted-foreground">
                Birthday party favors for 10 kids? Print 10 boxes for under $2 total. Way cheaper than store-bought favors ($30-$50 for 10 kids)!
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="prose prose-lg max-w-none mb-16">
          <h2 className="text-3xl font-extrabold mb-6">Creative Ways to Use Blind Box Templates</h2>
          <ol className="space-y-4 text-muted-foreground">
            <li>
              <strong className="text-foreground">Birthday Party Favors</strong> — Print 10-30 boxes, let kids assemble at the party, then take home as favors. Doubles as activity + gift!
            </li>
            <li>
              <strong className="text-foreground">Classroom Rewards</strong> — Teachers: use as behavior rewards, reading incentives, or Friday treats. Kids earn boxes for good work!
            </li>
            <li>
              <strong className="text-foreground">Rainy Day Activity</strong> — Print a variety pack, hide them around the house, let kids &quot;hunt&quot; for mystery boxes. Keeps them busy for hours!
            </li>
            <li>
              <strong className="text-foreground">Sibling Bonding</strong> — Each kid makes their own collection, then they trade duplicates. Teaches negotiation and sharing!
            </li>
            <li>
              <strong className="text-foreground">Advent Calendar</strong> — Print 25 boxes, number them 1-25, fill with small treats. Eco-friendly alternative to plastic advent calendars!
            </li>
            <li>
              <strong className="text-foreground">Travel Activity</strong> — Print and pre-cut templates, pack in a folder. Perfect for airplanes, road trips, or waiting rooms!
            </li>
          </ol>
        </section>

        {/* AI Generator Promo */}
        <section className="bg-gradient-to-r from-brand-pink to-brand-purple rounded-3xl p-8 text-white mb-16 text-center">
          <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl font-extrabold mb-4">Create Unlimited Custom Characters with AI</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Want to design your own unique blind box characters? Our AI Character Generator creates kawaii characters from text prompts or photos. Type &quot;ninja cat&quot; or &quot;sparkle unicorn&quot; and watch the magic happen!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/create"
              className="bg-white text-brand-pink px-8 py-3.5 rounded-full font-bold hover:bg-white/90 transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Try AI Generator Free
            </Link>
            <Link
              href="/pricing"
              className="bg-white/20 text-white px-8 py-3.5 rounded-full font-bold hover:bg-white/30 transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-3xl font-extrabold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-muted rounded-xl p-6">
                <h3 className="font-extrabold mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-muted rounded-3xl p-8 text-center">
          <h2 className="text-3xl font-extrabold mb-4">Ready to Start Your Collection?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Browse 75+ kawaii template packs, generate unlimited AI characters, or grab a Party Kit for your next event. Zero plastic, zero shipping, zero stress.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="bg-brand-blue text-white px-8 py-3.5 rounded-full font-bold hover:bg-brand-blue/90 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Browse All Packs
            </Link>
            <Link
              href="/party-kits"
              className="bg-white border-2 border-brand-pink text-brand-pink px-8 py-3.5 rounded-full font-bold hover:bg-pink-50 transition-colors"
            >
              View Party Kits
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
