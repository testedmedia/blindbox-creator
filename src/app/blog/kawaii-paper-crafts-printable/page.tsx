import type { Metadata } from "next";
import Link from "next/link";
import { Download, Star, Sparkles, ArrowRight, CheckCircle, Heart, Palette, Brush } from "lucide-react";
import { TEMPLATE_COLLECTIONS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Kawaii Paper Crafts Printable: Cute Characters You Can Make Today | 2026",
  description:
    "Free and premium kawaii paper craft printables! Adorable chibi characters, blind box templates, and cute paper toys. Print at home and start crafting.",
  keywords: [
    "kawaii paper crafts",
    "printable kawaii crafts",
    "kawaii printables",
    "cute paper crafts",
    "chibi character printable",
    "kawaii blind box",
    "japanese paper crafts",
    "kawaii diy",
  ],
  openGraph: {
    title: "Kawaii Paper Crafts Printable: Cute Characters You Can Make Today",
    description: "Adorable kawaii paper craft printables. Chibi characters, blind box templates, and cute paper toys you can print at home!",
    type: "article",
    publishedTime: "2026-02-21T00:00:00Z",
    authors: ["Blind Box Creator Team"],
  },
};

const kawaiiPrinciples = [
  {
    title: "Big Eyes, Tiny Mouth",
    description: "Kawaii characters have oversized, sparkly eyes and a tiny dot or line for a mouth. The bigger the eyes, the cuter the character.",
    emoji: "👀",
  },
  {
    title: "Soft, Round Shapes",
    description: "No sharp corners! Kawaii design uses rounded edges, puffy cheeks, and chubby proportions. Everything looks huggable.",
    emoji: "🫧",
  },
  {
    title: "Pastel Color Palette",
    description: "Baby pink, lavender, mint, sky blue, and cream. Kawaii colors are soft, warm, and never harsh. Think cotton candy, not neon.",
    emoji: "🎨",
  },
  {
    title: "Chibi Proportions",
    description: "Giant heads on tiny bodies (2:1 or 3:1 ratio). Arms and legs are short and stubby. This exaggerated cuteness is peak kawaii.",
    emoji: "✨",
  },
];

const craftCategories = [
  {
    title: "Blind Box Characters",
    description: "3D paper characters that fit inside folded mystery boxes. Our most popular format! 75 packs, 900+ characters across every kawaii theme imaginable.",
    count: "900+ characters",
    link: "/shop",
    linkText: "Browse All Packs",
  },
  {
    title: "Paper Standees",
    description: "Flat character cutouts with fold-out bases so they stand up on desks, shelves, and diorama scenes. Print, cut, fold the base tab, done.",
    count: "Included in packs",
    link: "/templates",
    linkText: "View Templates",
  },
  {
    title: "Sticker Sheets",
    description: "Print on sticker paper for instant kawaii stickers. Decorate notebooks, laptops, water bottles, and blind boxes themselves.",
    count: "Every pack",
    link: "/shop",
    linkText: "Get Sticker Templates",
  },
  {
    title: "Trading Cards",
    description: "Collectible character cards with stats, rarity badges, and artwork. Trade with friends, play the battle game, or just collect them all.",
    count: "Every pack",
    link: "/templates",
    linkText: "See Card Designs",
  },
];

const faqs = [
  {
    question: "What does 'kawaii' actually mean?",
    answer: "Kawaii (かわいい) is a Japanese word meaning 'cute' or 'adorable.' It's a massive cultural aesthetic in Japan that has spread worldwide — you see it in characters like Hello Kitty, Rilakkuma, and Pusheen. Kawaii design emphasizes big eyes, soft pastels, round shapes, and an overall feeling of warmth and approachability.",
  },
  {
    question: "Are your kawaii printables really free?",
    answer: "We offer both free and premium options! The AI Character Generator gives 3 free generations per day. You can also browse 10 free template packs featured on our blog. Premium packs are $4.99 each (12 characters per pack) or grab a subscription for unlimited access to everything.",
  },
  {
    question: "Can I use these kawaii printables commercially?",
    answer: "Personal and educational use is included with all purchases. For commercial use (selling finished crafts, using in products for sale, etc.), you'll need our Founding Pro subscription which includes commercial usage rights. Teachers can use them freely in classrooms.",
  },
  {
    question: "What paper works best for kawaii paper crafts?",
    answer: "For blind boxes and 3D crafts: 80lb or 110lb cardstock. For stickers: printable sticker paper (glossy or matte). For trading cards: standard cardstock or photo paper for a premium feel. For decorations: regular printer paper works fine since they don't need to be structural.",
  },
  {
    question: "How do I get the kawaii style right when designing my own?",
    answer: "Use our AI Character Generator! Just describe what you want ('kawaii fox with flower crown') and the AI handles the art style automatically. It's trained on the kawaii aesthetic so every character comes out perfectly cute with big eyes, soft colors, and chibi proportions.",
  },
  {
    question: "Do you have kawaii crafts for adults?",
    answer: "Absolutely! Kawaii has no age limit. Our templates work great for journaling, scrapbooking, desk decoration, gift wrapping, and planner stickers. The Zen Garden, Sakura Spirits, and Celestial collections are especially popular with adult crafters.",
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
            headline: "Kawaii Paper Crafts Printable: Cute Characters You Can Make Today",
            description: "Free and premium kawaii paper craft printables! Adorable chibi characters, blind box templates, and cute paper toys.",
            image: "https://blindbox-creator.vercel.app/products/packs/chibi-kitty-club.png",
            author: { "@type": "Organization", name: "Blind Box Creator" },
            publisher: { "@type": "Organization", name: "Blind Box Creator" },
            datePublished: "2026-02-21",
            dateModified: "2026-02-21",
          }),
        }}
      />

      {/* Hero */}
      <header className="bg-gradient-to-b from-pink-50 to-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block bg-brand-pink/10 text-brand-pink px-4 py-1.5 rounded-full text-sm font-bold mb-4">
              Kawaii Crafts
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
              Kawaii Paper Crafts{" "}
              <span className="text-gradient">Printable</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              The ultimate guide to kawaii paper crafting. Learn the aesthetic, discover 75+ template packs, and create adorable chibi characters with AI. Print at home, craft with love.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/create"
                className="bg-brand-pink text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-brand-pink/90 transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Create Your Own Character
              </Link>
              <Link
                href="/shop"
                className="bg-white border-2 border-brand-blue text-brand-blue px-8 py-3.5 rounded-full font-bold text-sm hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Browse 75 Packs
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
            {[
              { icon: Heart, title: "Kawaii Style" },
              { icon: Palette, title: "75+ Packs" },
              { icon: Star, title: "900+ Characters" },
              { icon: Sparkles, title: "AI Generator" },
            ].map((stat) => (
              <div key={stat.title} className="bg-white rounded-xl p-4 border border-border text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-brand-pink" />
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
          <h2 className="text-3xl font-extrabold mb-6">What Makes Paper Crafts &quot;Kawaii&quot;?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Kawaii (かわいい) isn&apos;t just &quot;cute&quot; — it&apos;s an entire design language from Japan that has taken over the world. From Hello Kitty to Rilakkuma, from Pusheen to Molang, kawaii characters share a distinct set of visual rules that make them instantly recognizable and irresistibly adorable.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            When you apply these rules to paper crafts, something magical happens. Flat pieces of paper transform into <strong>3D characters with personality</strong>. A simple box becomes a mystery container hiding a chibi fox in a flower crown. A sheet of stickers becomes a collection of tiny friends.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Our kawaii paper craft printables follow all the classic rules of the aesthetic while adding a modern twist: <strong>AI-powered character design</strong>. You describe your dream character, and AI creates it in seconds — perfectly kawaii, perfectly unique, perfectly printable.
          </p>
        </section>

        {/* Kawaii Design Principles */}
        <section className="mb-16">
          <h2 className="text-3xl font-extrabold mb-8 text-center">The 4 Rules of Kawaii Design</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {kawaiiPrinciples.map((principle) => (
              <div key={principle.title} className="bg-muted rounded-2xl p-6">
                <div className="text-4xl mb-3">{principle.emoji}</div>
                <h3 className="font-extrabold mb-2">{principle.title}</h3>
                <p className="text-sm text-muted-foreground">{principle.description}</p>
              </div>
            ))}
          </div>
          <div className="bg-brand-pink/10 border-l-4 border-brand-pink p-4 rounded-r-lg mt-8">
            <p className="text-sm font-semibold text-brand-pink mb-1">Fun Fact</p>
            <p className="text-sm text-muted-foreground m-0">
              The kawaii aesthetic originated in 1970s Japan when teenagers started writing in a rounded, childlike handwriting style. It evolved into an entire subculture covering fashion, food, stationery, and — of course — paper crafts!
            </p>
          </div>
        </section>

        {/* Blind Box Culture */}
        <section className="prose prose-lg max-w-none mb-16">
          <h2 className="text-3xl font-extrabold mb-6">Kawaii Meets Blind Box Culture</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Blind boxes (ブラインドボックス) are sealed mystery packages where you don&apos;t know which character you&apos;ll get until you open it. They started in Japanese gashapon (capsule toy) machines and have grown into a global phenomenon worth billions.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Brands like Pop Mart, Sonny Angel, and Tokidoki sell millions of blind boxes every year. The appeal? <strong>The thrill of mystery + the joy of collecting + the rush of getting a rare character.</strong> It&apos;s the same psychology that makes trading cards and loot boxes addictive — but for physical toys.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Our <strong>printable kawaii blind boxes</strong> bring this experience home. Each template pack includes 12 characters with a built-in rarity system:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 not-prose mb-6">
            <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
              <div className="text-2xl mb-1">⬜</div>
              <div className="text-xs font-extrabold">Common</div>
              <div className="text-xs text-muted-foreground">6 per pack</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
              <div className="text-2xl mb-1">🔵</div>
              <div className="text-xs font-extrabold text-blue-700">Rare</div>
              <div className="text-xs text-muted-foreground">3 per pack</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 text-center border border-purple-200">
              <div className="text-2xl mb-1">🟣</div>
              <div className="text-xs font-extrabold text-purple-700">Epic</div>
              <div className="text-xs text-muted-foreground">2 per pack</div>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4 text-center border border-yellow-200">
              <div className="text-2xl mb-1">🌟</div>
              <div className="text-xs font-extrabold text-yellow-700">Legendary</div>
              <div className="text-xs text-muted-foreground">1 per pack</div>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Print the characters on different colored cardstock to match the rarity — white for Common, blue for Rare, purple/holographic for Epic, and gold/metallic for the Legendary. Kids go WILD for the Legendaries.
          </p>
        </section>

        {/* Craft Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-extrabold mb-8 text-center">Types of Kawaii Paper Crafts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {craftCategories.map((cat) => (
              <div key={cat.title} className="bg-muted rounded-2xl p-6">
                <h3 className="font-extrabold mb-2">{cat.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{cat.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-green">{cat.count}</span>
                  <Link href={cat.link} className="text-xs font-bold text-brand-blue flex items-center gap-1 hover:underline">
                    {cat.linkText}
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Collections Showcase */}
        <section className="mb-16">
          <h2 className="text-3xl font-extrabold mb-4 text-center">Explore Kawaii Collections</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            75 template packs organized into themed collections. From chibi animals to celestial dreamscapes, every kawaii style is covered.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {TEMPLATE_COLLECTIONS.map((col) => (
              <Link
                key={col.id}
                href={`/templates?collection=${col.id}`}
                className="group bg-muted rounded-xl p-5 text-center hover:bg-muted/80 transition-colors"
              >
                <div className="text-4xl mb-2">{col.emoji}</div>
                <h3 className="font-extrabold text-sm mb-1 group-hover:text-brand-pink transition-colors">{col.name}</h3>
                <p className="text-xs text-muted-foreground">{col.count} packs</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-brand-pink text-white px-8 py-3.5 rounded-full font-bold hover:bg-brand-pink/90 transition-colors"
            >
              See All 75 Packs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* AI Generator Promo */}
        <section className="bg-gradient-to-r from-brand-pink to-brand-purple rounded-3xl p-8 text-white mb-16 text-center">
          <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl font-extrabold mb-4">Design Your Own Kawaii Characters with AI</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Can&apos;t find exactly what you&apos;re looking for? Create it! Our AI Character Generator turns text prompts into kawaii characters in seconds. &quot;Steampunk cat librarian,&quot; &quot;galaxy penguin ballet dancer,&quot; &quot;ramen bowl surfing on a wave&quot; — if you can describe it, AI can draw it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/create"
              className="bg-white text-brand-pink px-8 py-3.5 rounded-full font-bold hover:bg-white/90 transition-colors flex items-center gap-2"
            >
              <Brush className="w-4 h-4" />
              Create a Character Now
            </Link>
            <Link
              href="/pricing"
              className="bg-white/20 text-white px-8 py-3.5 rounded-full font-bold hover:bg-white/30 transition-colors"
            >
              3 Free Daily - View Plans
            </Link>
          </div>
        </section>

        {/* Getting Started */}
        <section className="prose prose-lg max-w-none mb-16">
          <h2 className="text-3xl font-extrabold mb-6">How to Get Started with Kawaii Paper Crafts</h2>
          <div className="space-y-6 not-prose">
            {[
              {
                step: 1,
                title: "Pick a Template Pack (or Create Your Own)",
                description: "Browse our 75 kawaii template packs or use the AI generator to design custom characters. Each pack includes 12 characters, box designs, and assembly guides.",
              },
              {
                step: 2,
                title: "Print on Cardstock",
                description: "Download the PDF and print on 80lb or 110lb cardstock. Any home printer works! For extra sparkle, use holographic or metallic paper for rare characters.",
              },
              {
                step: 3,
                title: "Cut, Fold, and Assemble",
                description: "Follow the printed fold lines and cut guides. Fold along the creases, apply glue to the tabs, and press firmly. Each box takes about 5 minutes.",
              },
              {
                step: 4,
                title: "Seal and Surprise!",
                description: "Close the box with the character inside. Seal with a sticker or washi tape. Now it's a real blind box! Trade with friends or give as gifts.",
              },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-pink to-brand-purple text-white rounded-full flex items-center justify-center text-lg font-extrabold shrink-0">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-extrabold mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Kawaii Crafts */}
        <section className="prose prose-lg max-w-none mb-16">
          <h2 className="text-3xl font-extrabold mb-6">Why Kawaii Paper Crafts Are Having a Moment</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 not-prose">
            <div className="bg-muted rounded-xl p-6">
              <CheckCircle className="w-8 h-8 text-brand-green mb-3" />
              <h3 className="font-extrabold mb-2">Screen-Free Creativity</h3>
              <p className="text-sm text-muted-foreground">
                In a world of iPads and TikTok, paper crafting gives kids (and adults!) a tactile, meditative creative outlet. Cutting and folding is oddly satisfying.
              </p>
            </div>
            <div className="bg-muted rounded-xl p-6">
              <CheckCircle className="w-8 h-8 text-brand-green mb-3" />
              <h3 className="font-extrabold mb-2">Eco-Friendly</h3>
              <p className="text-sm text-muted-foreground">
                No plastic packaging, no overseas shipping, no landfill waste. Just paper you can recycle. The sustainable alternative to mass-produced toys.
              </p>
            </div>
            <div className="bg-muted rounded-xl p-6">
              <CheckCircle className="w-8 h-8 text-brand-green mb-3" />
              <h3 className="font-extrabold mb-2">Affordable</h3>
              <p className="text-sm text-muted-foreground">
                A $4.99 template pack prints unlimited times. That&apos;s 12 unique characters for the price of a latte. Compare to $10+ per retail blind box toy.
              </p>
            </div>
            <div className="bg-muted rounded-xl p-6">
              <CheckCircle className="w-8 h-8 text-brand-green mb-3" />
              <h3 className="font-extrabold mb-2">AI-Powered Personalization</h3>
              <p className="text-sm text-muted-foreground">
                With our AI generator, you&apos;re not limited to pre-designed characters. Create a kawaii version of your pet, your favorite food, or a totally imaginary creature.
              </p>
            </div>
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

        {/* Related Posts */}
        <section className="mb-16">
          <h2 className="text-3xl font-extrabold mb-6 text-center">More Kawaii Inspiration</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/blog/10-free-printable-blind-box-templates" className="group bg-muted rounded-xl p-5 hover:bg-muted/80 transition-colors">
              <h3 className="font-extrabold text-sm mb-1 group-hover:text-brand-pink transition-colors">10 Free Printable Templates</h3>
              <p className="text-xs text-muted-foreground">Download free kawaii templates to print at home.</p>
            </Link>
            <Link href="/blog/diy-blind-box-ideas-for-kids" className="group bg-muted rounded-xl p-5 hover:bg-muted/80 transition-colors">
              <h3 className="font-extrabold text-sm mb-1 group-hover:text-brand-pink transition-colors">7 DIY Blind Box Ideas for Kids</h3>
              <p className="text-xs text-muted-foreground">Step-by-step projects for kids of all ages.</p>
            </Link>
            <Link href="/blog/blind-box-party-favors" className="group bg-muted rounded-xl p-5 hover:bg-muted/80 transition-colors">
              <h3 className="font-extrabold text-sm mb-1 group-hover:text-brand-pink transition-colors">Blind Box Party Favors</h3>
              <p className="text-xs text-muted-foreground">Plan the ultimate blind box birthday party.</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-muted rounded-3xl p-8 text-center">
          <h2 className="text-3xl font-extrabold mb-4">Start Your Kawaii Collection</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            75 kawaii template packs. 900+ characters. AI generator for unlimited custom designs. Zero plastic, pure creativity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/create"
              className="bg-brand-pink text-white px-8 py-3.5 rounded-full font-bold hover:bg-brand-pink/90 transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Create a Character Free
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
