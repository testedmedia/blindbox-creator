import type { Metadata } from "next";
import Link from "next/link";
import { Gift, Star, Sparkles, ArrowRight, CheckCircle, PartyPopper, Users, DollarSign, Clock, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Blind Box Party Favors: The Ultimate Birthday Party Guide | 2026",
  description:
    "Plan the perfect blind box birthday party! DIY party favors for kids, party planning checklist, bundle deals, and creative activity ideas. Cheaper than store-bought!",
  keywords: [
    "blind box party favors",
    "blind box birthday party",
    "diy party favors for kids",
    "mystery box party",
    "blind box party ideas",
    "kids birthday party favors",
    "paper craft party activity",
    "party kits for kids",
  ],
  openGraph: {
    title: "Blind Box Party Favors: The Ultimate Birthday Party Guide",
    description: "Plan the perfect blind box birthday party! DIY favors, planning checklists, and creative activity ideas for kids.",
    type: "article",
    publishedTime: "2026-02-21T00:00:00Z",
    authors: ["Blind Box Creator Team"],
  },
};

const partyTimeline = [
  {
    time: "2 Weeks Before",
    title: "Order & Print",
    tasks: [
      "Choose 2-3 template packs (mix themes for variety!)",
      "Buy cardstock and supplies (see supply list below)",
      "Print all templates on cardstock",
      "Optional: Pre-cut templates for younger kids (ages 4-6)",
    ],
  },
  {
    time: "1 Week Before",
    title: "Prep & Organize",
    tasks: [
      "Sort characters by rarity (Common, Rare, Epic, Legendary)",
      "Pre-fold boxes if kids are younger",
      "Create a 'rarity chart' poster for display",
      "Set up trading station supplies (card sleeves, display stands)",
    ],
  },
  {
    time: "Day Of",
    title: "Party Time!",
    tasks: [
      "Set up craft stations with supplies at each seat",
      "Display the rarity chart where everyone can see it",
      "Run the activities (see schedule below)",
      "Send kids home with completed blind boxes as favors",
    ],
  },
];

const partyActivities = [
  {
    title: "Mystery Box Assembly Station",
    duration: "20-30 min",
    description: "Set up tables with pre-printed templates, scissors, glue, and decorating supplies. Each kid picks a sealed envelope containing one random character template. They assemble their box without peeking at the character inside!",
    icon: Gift,
    ageRange: "All ages",
  },
  {
    title: "Blind Box Opening Ceremony",
    duration: "10-15 min",
    description: "The main event! Everyone opens their blind boxes at the same time. Cheers erupt for Epic and Legendary pulls. Play dramatic music during the countdown for extra effect!",
    icon: PartyPopper,
    ageRange: "All ages",
  },
  {
    title: "Character Trading Floor",
    duration: "15-20 min",
    description: "Kids trade characters with each other. Common-for-Common, Rare-for-Rare, or try to negotiate an Epic trade! This is where social skills shine. Set up a 'trading post' table with a bell to ring when a trade is made.",
    icon: Users,
    ageRange: "Ages 6+",
  },
  {
    title: "AI Character Design Challenge",
    duration: "15-20 min",
    description: "If you have a tablet or laptop, let kids take turns using the AI Character Generator. Each kid types a prompt for their dream character. Vote on the funniest/cutest/weirdest creation! Print the winners as bonus prizes.",
    icon: Sparkles,
    ageRange: "Ages 6+",
  },
  {
    title: "Blind Box Bingo",
    duration: "10-15 min",
    description: "Create bingo cards with different character traits (has wings, wears a hat, is an animal, is food-themed, etc.). As kids open boxes, they mark off matching traits. First to complete a row wins a bonus Legendary character!",
    icon: Star,
    ageRange: "Ages 5+",
  },
];

const costComparison = [
  {
    option: "Store-Bought Blind Boxes",
    cost: "$8-15 per kid",
    total10: "$80-150",
    total20: "$160-300",
    pros: ["No prep work", "Brand-name characters"],
    cons: ["Expensive", "Lots of plastic waste", "Kids may get duplicates", "No creative activity"],
  },
  {
    option: "DIY with Template Packs",
    cost: "$0.15-0.50 per kid",
    total10: "$1.50-5.00",
    total20: "$3.00-10.00",
    pros: ["Incredibly cheap", "Zero plastic", "IS the party activity", "Kids take home handmade creation"],
    cons: ["Requires printing", "Need supplies (cardstock, glue)"],
  },
  {
    option: "Party Kit Bundle",
    cost: "$1.50 per kid",
    total10: "$14.99",
    total20: "$14.99",
    pros: ["Everything included", "Invitations + thank-yous", "Planning checklist", "Best value for parties"],
    cons: ["Still needs printing", "Fixed theme selection"],
  },
];

const faqs = [
  {
    question: "How many blind boxes should I prepare per kid?",
    answer: "We recommend 2-3 boxes per kid: one to assemble at the party, one pre-made to open during the ceremony, and optionally one sealed box to take home. For a party of 10 kids, that's 20-30 boxes total. Our Party Kit ($14.99) includes enough templates for 12 kids with 3 boxes each.",
  },
  {
    question: "What if some kids are too young to cut and fold?",
    answer: "For kids under 6, pre-cut and pre-fold the box templates before the party. Let younger kids focus on decorating (stickers, markers, stamps) and the opening ceremony. The mystery element works for ANY age - even toddlers love the surprise of opening a box!",
  },
  {
    question: "How long does a blind box party activity take?",
    answer: "The full activity sequence (assembly + opening + trading) takes about 45-60 minutes. You can shorten it by pre-assembling boxes (just the opening + trading takes 20-30 min) or extend it with AI character design and bingo. Most parents say it's the hit of the party.",
  },
  {
    question: "Can I mix themes for the party?",
    answer: "Absolutely! Mixing 2-3 different template packs actually makes the trading more exciting because kids want characters from other sets. Popular combos: Chibi Kitty Club + Unicorn Dreams, Mochi Squad + Bubble Tea Club, or Ninja Cuties + Mahou Shoujo Stars.",
  },
  {
    question: "Do you have invitations and thank-you cards?",
    answer: "Yes! Our Kawaii Birthday Party Kit ($14.99) includes printable party invitations, thank-you cards with chibi characters, a planning checklist, and decoration templates — plus 3 template packs (36 characters) for the party itself.",
  },
  {
    question: "What about kids with allergies to glue/adhesives?",
    answer: "Our box designs use fold-tab construction that can hold together with just careful folding (no glue needed for basic boxes). For extra security without glue, use paper clips, washi tape, or sticker seals instead of glue sticks.",
  },
];

export default function BlogPost() {
  return (
    <article className="min-h-screen bg-white">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Blind Box Party Favors: The Ultimate Birthday Party Guide",
            description: "Plan the perfect blind box birthday party! DIY party favors for kids, planning checklists, and creative activity ideas.",
            image: "https://blindbox-creator.vercel.app/products/packs/chibi-kitty-club.png",
            author: { "@type": "Organization", name: "Blind Box Creator" },
            publisher: { "@type": "Organization", name: "Blind Box Creator" },
            datePublished: "2026-02-21",
            dateModified: "2026-02-21",
          }),
        }}
      />

      {/* Hero */}
      <header className="bg-gradient-to-b from-yellow-50 to-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block bg-brand-yellow/20 text-brand-orange px-4 py-1.5 rounded-full text-sm font-bold mb-4">
              Party Planning
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
              Blind Box{" "}
              <span className="text-gradient">Party Favors</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              The complete guide to throwing a blind box birthday party. DIY favors that double as the party activity, cost under $15 for 12 kids, and create zero plastic waste. Your kid&apos;s friends will talk about this party for months.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/party-kits"
                className="bg-brand-pink text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-brand-pink/90 transition-colors flex items-center gap-2"
              >
                <PartyPopper className="w-4 h-4" />
                View Party Kits
              </Link>
              <Link
                href="/shop"
                className="bg-white border-2 border-brand-blue text-brand-blue px-8 py-3.5 rounded-full font-bold text-sm hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                <Gift className="w-4 h-4" />
                Browse Template Packs
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
            {[
              { icon: DollarSign, title: "Under $15" },
              { icon: Users, title: "10-30 Kids" },
              { icon: Clock, title: "45 Min Activity" },
              { icon: Heart, title: "Zero Plastic" },
            ].map((stat) => (
              <div key={stat.title} className="bg-white rounded-xl p-4 border border-border text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-brand-orange" />
                <div className="text-xs font-bold text-muted-foreground">{stat.title}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Introduction */}
        <section className="prose prose-lg max-w-none mb-16">
          <h2 className="text-3xl font-extrabold mb-6">Why Blind Box Party Favors Are the Move</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Let&apos;s be honest: most party favors are trash. Literally. Those little bags of plastic toys, stale candy, and random trinkets? They end up in the garbage within 24 hours. And they cost $3-$5 per kid!
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Blind box party favors are different.</strong> They&apos;re the activity AND the take-home gift. Kids spend 30-45 minutes crafting, assembling, and decorating their own mystery boxes. Then they experience the thrill of the big reveal together. Then they trade characters with each other. It&apos;s a full party segment that replaces the need for a separate activity, separate favors, and separate entertainment.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Total cost? Under $15 for a party of 12 kids. Compare that to $30-$50 for traditional favors that go straight to landfill.
          </p>
          <div className="bg-brand-yellow/10 border-l-4 border-brand-yellow p-4 rounded-r-lg my-6">
            <p className="text-sm font-semibold text-brand-orange mb-1">Real Parent Review</p>
            <p className="text-sm text-muted-foreground m-0">
              &quot;We did blind box favors for my daughter&apos;s 8th birthday. The kids were SO into it. They spent 40 minutes crafting and trading, which is longer than any hired entertainer has held their attention. Total cost: $12. Win.&quot;
            </p>
          </div>
        </section>

        {/* Cost Comparison */}
        <section className="mb-16">
          <h2 className="text-3xl font-extrabold mb-8 text-center">Cost Comparison: Blind Box Favors vs. Traditional</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {costComparison.map((option) => (
              <div
                key={option.option}
                className={`rounded-2xl p-6 border-2 ${
                  option.option === "Party Kit Bundle"
                    ? "border-brand-pink bg-brand-pink/5"
                    : "border-border bg-muted"
                }`}
              >
                {option.option === "Party Kit Bundle" && (
                  <span className="inline-block bg-brand-pink text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                    Best Value
                  </span>
                )}
                <h3 className="font-extrabold mb-2">{option.option}</h3>
                <div className="text-2xl font-extrabold text-brand-blue mb-1">{option.cost}</div>
                <div className="text-xs text-muted-foreground mb-4">
                  10 kids: {option.total10} | 20 kids: {option.total20}
                </div>
                <div className="mb-3">
                  <div className="text-xs font-bold text-brand-green mb-1">Pros</div>
                  {option.pros.map((pro) => (
                    <div key={pro} className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                      <CheckCircle className="w-3 h-3 text-brand-green shrink-0" />
                      {pro}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-xs font-bold text-red-400 mb-1">Cons</div>
                  {option.cons.map((con) => (
                    <div key={con} className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                      <span className="w-3 h-3 shrink-0 text-center text-red-400">-</span>
                      {con}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Party Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-extrabold mb-8 text-center">Party Planning Timeline</h2>
          <div className="space-y-6">
            {partyTimeline.map((phase) => (
              <div key={phase.time} className="bg-muted rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-brand-blue text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {phase.time}
                  </span>
                  <h3 className="font-extrabold">{phase.title}</h3>
                </div>
                <ul className="space-y-2">
                  {phase.tasks.map((task) => (
                    <li key={task} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Party Activities */}
        <section className="mb-16">
          <h2 className="text-3xl font-extrabold mb-8 text-center">5 Blind Box Party Activities</h2>
          <div className="space-y-6">
            {partyActivities.map((activity, idx) => (
              <div key={activity.title} className="bg-muted rounded-2xl p-6 sm:p-8">
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-pink to-brand-purple text-white rounded-full flex items-center justify-center text-xl font-extrabold shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold mb-1">{activity.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="bg-brand-blue/10 text-brand-blue px-2 py-0.5 rounded-full font-bold">{activity.duration}</span>
                      <span className="bg-brand-green/10 text-brand-green px-2 py-0.5 rounded-full font-bold">{activity.ageRange}</span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm">{activity.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Supply List */}
        <section className="prose prose-lg max-w-none mb-16">
          <h2 className="text-3xl font-extrabold mb-6">Party Supply Checklist</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Here&apos;s everything you need for a blind box party of 10-12 kids:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <div className="bg-muted rounded-xl p-5">
              <h3 className="font-extrabold mb-3 flex items-center gap-2">
                <span className="text-lg">📋</span> Must-Haves
              </h3>
              <ul className="space-y-2">
                {[
                  "Template pack(s) — 2-3 packs recommended",
                  "80lb cardstock — 30-40 sheets",
                  "Kid-safe scissors — 1 per kid",
                  "Glue sticks — 1 per 2-3 kids",
                  "Table covers / craft mats",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-muted rounded-xl p-5">
              <h3 className="font-extrabold mb-3 flex items-center gap-2">
                <span className="text-lg">✨</span> Level-Up Extras
              </h3>
              <ul className="space-y-2">
                {[
                  "Kawaii stickers for decorating boxes",
                  "Washi tape for sealing (cuter than glue!)",
                  "Holographic cardstock for Legendary characters",
                  "Mini kraft gift bags for take-home",
                  "Small treats/candy to hide inside boxes",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 text-brand-yellow shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mt-6">
            Need supplies? Check our{" "}
            <Link href="/supplies" className="text-brand-blue font-bold hover:underline">
              curated supply list
            </Link>{" "}
            with direct links to everything you need on Amazon.
          </p>
        </section>

        {/* Party Kit Promo */}
        <section className="bg-gradient-to-r from-brand-pink to-brand-purple rounded-3xl p-8 text-white mb-16 text-center">
          <PartyPopper className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl font-extrabold mb-4">Skip the Planning — Grab a Party Kit</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Our Kawaii Birthday Party Kit ($14.99) includes EVERYTHING: 3 template packs (36 characters), printable invitations, thank-you cards, party planning checklist, decoration templates, and assembly guides for 12 kids. Just add cardstock and scissors!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/party-kits"
              className="bg-white text-brand-pink px-8 py-3.5 rounded-full font-bold hover:bg-white/90 transition-colors flex items-center gap-2"
            >
              <Gift className="w-4 h-4" />
              View Party Kits
            </Link>
            <Link
              href="/classroom"
              className="bg-white/20 text-white px-8 py-3.5 rounded-full font-bold hover:bg-white/30 transition-colors"
            >
              Classroom Bundles
            </Link>
          </div>
        </section>

        {/* Bigger parties / Classroom */}
        <section className="prose prose-lg max-w-none mb-16">
          <h2 className="text-3xl font-extrabold mb-6">Scaling Up: School Events & Big Parties</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Planning a bigger event? Our{" "}
            <Link href="/classroom" className="text-brand-blue font-bold hover:underline">
              Classroom Bundles
            </Link>{" "}
            are designed for groups of 10-30 kids and include lesson plans, STEAM activity worksheets, and assessment rubrics.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <div className="bg-muted rounded-xl p-5 border-2 border-border">
              <h3 className="font-extrabold mb-1">Classroom Starter (10 Students)</h3>
              <div className="text-xl font-extrabold text-brand-blue mb-2">$14.99</div>
              <ul className="space-y-1.5">
                {["10 student sets", "2 kawaii theme packs", "Teacher guide", "Activity worksheet"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle className="w-3.5 h-3.5 text-brand-green" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-muted rounded-xl p-5 border-2 border-brand-pink">
              <span className="inline-block bg-brand-pink text-white text-xs font-bold px-2 py-0.5 rounded-full mb-2">Teachers Love It</span>
              <h3 className="font-extrabold mb-1">Sensei Bundle (30 Students)</h3>
              <div className="text-xl font-extrabold text-brand-blue mb-2">$29.99</div>
              <ul className="space-y-1.5">
                {["30 student sets", "5 kawaii theme packs", "Japanese culture lesson plan", "STEAM activity sheets", "Assessment rubric", "Certificate templates"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle className="w-3.5 h-3.5 text-brand-green" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Affiliate CTA */}
        <section className="bg-brand-green/10 border-2 border-brand-green/20 rounded-2xl p-6 mb-16 text-center">
          <h2 className="text-2xl font-extrabold mb-3">Party Planners & Event Coordinators</h2>
          <p className="text-muted-foreground mb-4 max-w-xl mx-auto">
            Run parties professionally? Join our affiliate program and earn <strong className="text-brand-green">50% commission</strong> on every sale. Share your unique link with clients and earn passive income.
          </p>
          <Link
            href="/affiliate"
            className="inline-flex items-center gap-2 bg-brand-green text-white px-6 py-3 rounded-full font-bold hover:bg-brand-green/90 transition-colors text-sm"
          >
            Join Affiliate Program
            <ArrowRight className="w-4 h-4" />
          </Link>
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

        {/* Related Posts */}
        <section className="mb-16">
          <h2 className="text-3xl font-extrabold mb-6 text-center">More Party Inspiration</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/blog/10-free-printable-blind-box-templates" className="group bg-muted rounded-xl p-5 hover:bg-muted/80 transition-colors">
              <h3 className="font-extrabold text-sm mb-1 group-hover:text-brand-pink transition-colors">10 Free Printable Templates</h3>
              <p className="text-xs text-muted-foreground">Start with free templates before buying packs.</p>
            </Link>
            <Link href="/blog/diy-blind-box-ideas-for-kids" className="group bg-muted rounded-xl p-5 hover:bg-muted/80 transition-colors">
              <h3 className="font-extrabold text-sm mb-1 group-hover:text-brand-pink transition-colors">7 DIY Blind Box Ideas for Kids</h3>
              <p className="text-xs text-muted-foreground">More craft projects beyond parties.</p>
            </Link>
            <Link href="/blog/kawaii-paper-crafts-printable" className="group bg-muted rounded-xl p-5 hover:bg-muted/80 transition-colors">
              <h3 className="font-extrabold text-sm mb-1 group-hover:text-brand-pink transition-colors">Kawaii Paper Crafts Printable</h3>
              <p className="text-xs text-muted-foreground">Explore the full kawaii craft world.</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-muted rounded-3xl p-8 text-center">
          <h2 className="text-3xl font-extrabold mb-4">Ready to Plan the Best Party Ever?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Party Kits from $14.99, individual packs from $4.99, or create custom characters with AI. Everything prints at home — no shipping, no waiting, no stress.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/party-kits"
              className="bg-brand-pink text-white px-8 py-3.5 rounded-full font-bold hover:bg-brand-pink/90 transition-colors flex items-center gap-2"
            >
              <PartyPopper className="w-4 h-4" />
              Shop Party Kits
            </Link>
            <Link
              href="/shop"
              className="bg-white border-2 border-brand-pink text-brand-pink px-8 py-3.5 rounded-full font-bold hover:bg-pink-50 transition-colors"
            >
              Browse All Packs
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
