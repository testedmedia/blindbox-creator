import type { Metadata } from "next";
import Link from "next/link";
import { Trophy, Gift, Star, Upload, Instagram, CheckCircle, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Win $500 + Featured Pack | UGC Contest",
  description:
    "Show us your blind box creation and win $500 cash plus your own featured template pack! Contest ends soon.",
  openGraph: {
    title: "Win $500 + Featured Pack | Blind Box Creator Contest",
    description: "Show us your best blind box creation for a chance to win big!",
  },
};

const prizes = [
  {
    place: "1st Place",
    emoji: "🥇",
    prize: "$500 Cash + Custom Featured Pack",
    description: "Your character designs become an official pack + $500 PayPal",
    color: "bg-gradient-to-r from-amber-400 to-orange-500",
  },
  {
    place: "2nd Place",
    emoji: "🥈",
    prize: "Founding Pro (1 Year) + $100",
    description: "12 months of unlimited access + $100 cash",
    color: "bg-gradient-to-r from-gray-300 to-gray-400",
  },
  {
    place: "3rd Place",
    emoji: "🥉",
    prize: "Founding Pro (6 Months) + $50",
    description: "6 months unlimited access + $50 cash",
    color: "bg-gradient-to-r from-amber-600 to-amber-700",
  },
];

const rules = [
  "Create at least 1 blind box character using our templates or AI generator",
  "Post a photo/video to Instagram, TikTok, or Twitter",
  "Tag @blindboxcreator and use hashtag #MyBlindBoxStory",
  "Submit your entry using the form below",
  "Entries must be your original work (no copying other designs)",
  "Contest ends February 29, 2026 at 11:59pm PT",
];

const judgingCriteria = [
  {
    icon: Star,
    title: "Creativity",
    description: "Unique designs, color choices, personal touches",
    weight: "40%",
  },
  {
    icon: Gift,
    title: "Craftsmanship",
    description: "Clean cuts, neat folds, assembled well",
    weight: "30%",
  },
  {
    icon: Instagram,
    title: "Story",
    description: "Share why you made it, who it's for, what it means",
    weight: "30%",
  },
];

export default function ContestPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-pink-50 to-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-1.5 rounded-full text-sm font-bold mb-4 animate-pulse">
            <Clock className="w-4 h-4" />
            Contest Ends Feb 29, 2026
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
            Win $500 + Your Own{" "}
            <span className="text-gradient">Featured Pack!</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Show us your best blind box creation for a chance to win big! Grand prize winner gets
            $500 cash PLUS their character designs turned into an official Blind Box Creator pack.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#submit"
              className="bg-brand-pink text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-brand-pink/90 transition-colors flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Submit Your Entry
            </a>
            <Link
              href="/create"
              className="bg-white border-2 border-brand-pink text-brand-pink px-8 py-3.5 rounded-full font-bold text-sm hover:bg-pink-50 transition-colors"
            >
              Create Your First Character
            </Link>
          </div>
        </div>
      </section>

      {/* Prizes */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-12 text-center">
            🏆 Prizes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {prizes.map((prize) => (
              <div
                key={prize.place}
                className="bg-white rounded-2xl p-6 border-2 border-border shadow-lg text-center"
              >
                <div className={`${prize.color} text-white rounded-xl p-4 mb-4`}>
                  <div className="text-5xl mb-2">{prize.emoji}</div>
                  <div className="font-extrabold">{prize.place}</div>
                </div>
                <h3 className="font-extrabold text-lg mb-2">{prize.prize}</h3>
                <p className="text-sm text-muted-foreground">{prize.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Enter */}
      <section className="py-16 px-4 bg-muted">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center">
            How to Enter
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-pink to-brand-purple text-white rounded-full flex items-center justify-center text-xl font-extrabold mx-auto mb-4">
                1
              </div>
              <h3 className="font-extrabold mb-2">Create</h3>
              <p className="text-sm text-muted-foreground">
                Make a blind box character (template or AI generator)
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-pink to-brand-purple text-white rounded-full flex items-center justify-center text-xl font-extrabold mx-auto mb-4">
                2
              </div>
              <h3 className="font-extrabold mb-2">Post</h3>
              <p className="text-sm text-muted-foreground">
                Share on Instagram/TikTok/Twitter with #MyBlindBoxStory
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-pink to-brand-purple text-white rounded-full flex items-center justify-center text-xl font-extrabold mx-auto mb-4">
                3
              </div>
              <h3 className="font-extrabold mb-2">Tag</h3>
              <p className="text-sm text-muted-foreground">
                Tag @blindboxcreator so we can find your entry
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-pink to-brand-purple text-white rounded-full flex items-center justify-center text-xl font-extrabold mx-auto mb-4">
                4
              </div>
              <h3 className="font-extrabold mb-2">Submit</h3>
              <p className="text-sm text-muted-foreground">
                Fill out the form below with your post link
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Judging Criteria */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center">
            Judging Criteria
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {judgingCriteria.map((criteria) => (
              <div key={criteria.title} className="bg-muted rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <criteria.icon className="w-8 h-8 text-brand-pink" />
                  <div>
                    <h3 className="font-extrabold">{criteria.title}</h3>
                    <span className="text-xs text-brand-pink font-bold">{criteria.weight}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{criteria.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rules */}
      <section className="py-16 px-4 bg-muted">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center">
            Contest Rules
          </h2>
          <div className="bg-white rounded-2xl p-8 space-y-4">
            {rules.map((rule, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submit Form */}
      <section id="submit" className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center">
            Submit Your Entry
          </h2>

          <form
            action="/api/contest/submit"
            method="POST"
            className="bg-white rounded-2xl p-8 border-2 border-border shadow-lg space-y-6"
          >
            <div>
              <label className="block text-sm font-bold mb-2">Your Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-3 rounded-xl border border-border focus:border-brand-pink focus:outline-none"
                placeholder="Sarah Johnson"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-border focus:border-brand-pink focus:outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Post URL</label>
              <input
                type="url"
                name="post_url"
                required
                className="w-full px-4 py-3 rounded-xl border border-border focus:border-brand-pink focus:outline-none"
                placeholder="https://instagram.com/p/..."
              />
              <p className="text-xs text-muted-foreground mt-1">
                Link to your Instagram, TikTok, or Twitter post
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">
                Tell Us About Your Creation (Optional)
              </label>
              <textarea
                name="description"
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-border focus:border-brand-pink focus:outline-none"
                placeholder="Share your inspiration, process, or story behind your blind box..."
              />
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="agree"
                name="agree"
                required
                className="mt-1"
              />
              <label htmlFor="agree" className="text-sm text-muted-foreground">
                I agree to the contest rules and confirm this is my original work
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-pink text-white px-8 py-3.5 rounded-full font-bold hover:bg-brand-pink/90 transition-colors flex items-center justify-center gap-2"
            >
              <Trophy className="w-5 h-5" />
              Submit Entry
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Winners announced March 5, 2026 via email and social media
          </p>
        </div>
      </section>

      {/* Gallery Teaser */}
      <section className="py-16 px-4 bg-muted">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-4">
            See What Others Are Creating
          </h2>
          <p className="text-muted-foreground mb-8">
            Check Instagram and TikTok for <strong>#MyBlindBoxStory</strong> to see amazing entries!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://www.instagram.com/explore/tags/myblindboxstory/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold hover:opacity-90 transition-opacity"
            >
              View on Instagram
            </a>
            <a
              href="https://www.tiktok.com/tag/myblindboxstory"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors"
            >
              View on TikTok
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
