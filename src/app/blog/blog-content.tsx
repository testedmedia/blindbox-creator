"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  BookOpen,
  Calendar,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Send,
  Clock,
} from "lucide-react";

const posts = [
  {
    id: 1,
    title: "5 Creative Ways to Use Blind Boxes at Birthday Parties",
    excerpt:
      "From scavenger hunts to trading stations, these ideas will make your next birthday party unforgettable. Plus, free printable party planning checklist included.",
    date: "Coming Soon",
    readTime: "5 min read",
    gradient: "gradient-pink",
    tag: "Party Ideas",
    tagColor: "bg-brand-pink/10 text-brand-pink",
  },
  {
    id: 2,
    title: "Why Paper Crafts Are the Perfect Screen-Free Activity",
    excerpt:
      "In a world of tablets and phones, paper crafting offers kids something rare: hands-on creativity, fine motor skill development, and pure analog fun.",
    date: "Coming Soon",
    readTime: "4 min read",
    gradient: "gradient-blue",
    tag: "Parenting",
    tagColor: "bg-brand-blue/10 text-brand-blue",
  },
  {
    id: 3,
    title: "How AI is Revolutionizing Kids' Creative Play",
    excerpt:
      "AI isn't replacing creativity, it's supercharging it. See how tools like our Blind Box Generator let kids bring impossible ideas to life.",
    date: "Coming Soon",
    readTime: "6 min read",
    gradient: "gradient-fun",
    tag: "Technology",
    tagColor: "bg-brand-purple/10 text-brand-purple",
  },
];

export function BlogContent() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "blog" }),
      });

      if (res.ok) {
        setStatus("success");
        setMessage("Subscribed! You'll be the first to know when new posts drop.");
        setEmail("");
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 sm:py-24 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 text-brand-blue font-bold text-sm mb-4">
            <BookOpen className="w-4 h-4" />
            Our Blog
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
            The{" "}
            <span className="text-gradient">Blind Box</span>{" "}
            Blog
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Crafting tips, party ideas, parenting wins, and the latest from the
            world of paper blind boxes and AI creativity.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group bg-white rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-brand transition-all duration-300 hover:-translate-y-1"
              >
                {/* Placeholder image */}
                <div
                  className={`${post.gradient} h-44 flex items-center justify-center relative`}
                >
                  <div className="text-white/30 text-6xl font-extrabold">
                    {post.id}
                  </div>
                  <div className="absolute top-3 left-3">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full bg-white/90 ${post.tagColor.split(" ")[1]}`}
                    >
                      {post.tag}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="font-extrabold text-base mb-2 group-hover:text-brand-blue transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  <span className="text-brand-blue text-sm font-bold flex items-center gap-1 opacity-60">
                    Coming Soon
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Coming Soon Note */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl px-8 py-6">
              <p className="text-lg font-extrabold mb-1">
                More articles coming soon!
              </p>
              <p className="text-sm text-muted-foreground">
                We&apos;re working on crafting tips, tutorials, and creative
                inspiration. Subscribe below to get notified.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section className="py-16 sm:py-20 bg-muted px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
            Never Miss a Post
          </h2>
          <p className="text-muted-foreground mb-8">
            Get crafting tips, party ideas, and AI generator updates delivered
            to your inbox. No spam, just the good stuff.
          </p>

          {status === "success" ? (
            <div className="flex items-center justify-center gap-2 bg-brand-green/10 text-brand-green rounded-xl py-4 px-6">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-bold text-sm">{message}</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-5 py-3.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-colors"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="gradient-blue text-white px-6 py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="mt-3 text-sm text-red-500">{message}</p>
          )}

          <p className="text-xs text-muted-foreground mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Browse CTA */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-extrabold mb-4">
            Can&apos;t Wait for Blog Posts?
          </h2>
          <p className="text-muted-foreground mb-6">
            Jump right into creating. Browse our template packs and start
            crafting today.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 gradient-pink text-white px-8 py-3.5 rounded-full font-bold text-sm hover:opacity-90 transition-opacity"
          >
            Browse Templates
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
