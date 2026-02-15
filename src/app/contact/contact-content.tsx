"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  Mail,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Building2,
  GraduationCap,
  PartyPopper,
  ShoppingBag,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

const subjects = [
  "General Question",
  "Order Support",
  "Technical Issue",
  "Feature Request",
  "Business Inquiry",
  "Press & Media",
  "Partnership",
  "Other",
];

const businessTypes = [
  {
    icon: <PartyPopper className="w-6 h-6" />,
    title: "Party Planners",
    description: "Custom party kits, bulk orders, and co-branded templates for events.",
    color: "bg-brand-pink/10 text-brand-pink",
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: "Schools & Educators",
    description: "Classroom bundles, lesson plan integrations, and school-wide licenses.",
    color: "bg-brand-blue/10 text-brand-blue",
  },
  {
    icon: <ShoppingBag className="w-6 h-6" />,
    title: "Retailers & Brands",
    description: "White-label templates, retail partnerships, and branded collections.",
    color: "bg-brand-purple/10 text-brand-purple",
  },
];

export function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Question",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMessage, setResponseMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setResponseMessage("Message sent! We'll get back to you within 24-48 hours.");
        setFormData({ name: "", email: "", subject: "General Question", message: "" });
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setResponseMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setResponseMessage("Network error. Please try again.");
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 sm:py-24 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 text-brand-blue font-bold text-sm mb-4">
            <Mail className="w-4 h-4" />
            Get in Touch
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
            We&apos;d Love to{" "}
            <span className="text-gradient">Hear From You</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Questions about templates, AI generator, bulk orders, or just want
            to say hi? We&apos;re here to help.
          </p>
        </div>
      </section>

      {/* Contact Form + Sidebar */}
      <section className="pb-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-extrabold mb-6">Send Us a Message</h2>

              {status === "success" ? (
                <div className="flex items-center gap-3 bg-brand-green/10 text-brand-green rounded-xl p-6">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                  <div>
                    <p className="font-bold">Message Sent!</p>
                    <p className="text-sm opacity-80">{responseMessage}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-bold mb-1.5"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-bold mb-1.5"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-bold mb-1.5"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-colors bg-white"
                    >
                      {subjects.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-bold mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-colors resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {responseMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="gradient-blue text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center gap-2"
                  >
                    {status === "loading" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    {status === "loading" ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Email */}
            <div className="bg-muted rounded-2xl p-6">
              <h3 className="font-bold text-sm mb-3">Email Us Directly</h3>
              <a
                href="mailto:hello@blindboxgenerator.com"
                className="text-brand-blue font-semibold text-sm hover:underline flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                hello@blindboxgenerator.com
              </a>
            </div>

            {/* Social */}
            <div className="bg-muted rounded-2xl p-6">
              <h3 className="font-bold text-sm mb-3">Follow Us</h3>
              <div className="space-y-2">
                <a
                  href="https://tiktok.com/@blindboxgenerator"
                  target="_blank"
                  rel="noopener"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  TikTok
                </a>
                <a
                  href="https://instagram.com/blindboxgenerator"
                  target="_blank"
                  rel="noopener"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Instagram
                </a>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="bg-muted rounded-2xl p-6">
              <h3 className="font-bold text-sm mb-2">Looking for Answers?</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Check our FAQ for quick answers about pricing, templates, and
                the AI generator.
              </p>
              <Link
                href="/pricing#faq"
                className="text-brand-blue font-semibold text-sm hover:underline flex items-center gap-2"
              >
                <HelpCircle className="w-4 h-4" />
                View FAQ
              </Link>
            </div>

            {/* Response Time */}
            <div className="bg-brand-blue/5 rounded-2xl p-6 border border-brand-blue/10">
              <p className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">Response time:</span>{" "}
                We typically respond within 24-48 hours on business days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Inquiries */}
      <section className="py-16 sm:py-20 bg-muted px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-brand-purple font-bold text-sm mb-3">
              <Building2 className="w-4 h-4" />
              Business Inquiries
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Partner With Us
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We work with party planners, schools, and retailers to bring blind
              box magic to their communities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {businessTypes.map((biz) => (
              <div
                key={biz.title}
                className="bg-white rounded-2xl p-6 border border-border shadow-sm text-center"
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 ${biz.color}`}
                >
                  {biz.icon}
                </div>
                <h3 className="font-extrabold text-base mb-2">{biz.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {biz.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-sm text-muted-foreground mb-4">
              For bulk orders and partnerships, email us at
            </p>
            <a
              href="mailto:hello@blindboxgenerator.com?subject=Business Inquiry"
              className="inline-block gradient-fun text-white px-8 py-3.5 rounded-full font-bold text-sm hover:opacity-90 transition-opacity"
            >
              hello@blindboxgenerator.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
