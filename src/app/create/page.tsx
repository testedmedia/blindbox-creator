"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  X,
  Download,
  RefreshCw,
  Loader2,
  CheckCircle2,
  Crown,
  Camera,
  Wand2,
  Scissors,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const EXAMPLES = [
  "A cute girl picnicking with her stuffed animals",
  "Astronaut cat floating in a candy galaxy",
  "Baby dragon hatching from a crystal egg",
  "Magical girl with rainbow wings and a wand",
  "Sleepy panda in cozy pajamas holding a pillow",
  "Fox in a chunky knit sweater reading a tiny book",
  "Mermaid kitten swimming through bubblegum coral",
  "Little witch stirring a cauldron of sparkles",
];

// Showcase images from existing product packs
const SHOWCASE = [
  { src: "/products/packs/chibi-kitty-club.png", label: "Chibi Kitty" },
  { src: "/products/packs/dragon-nursery.png", label: "Baby Dragon" },
  { src: "/products/packs/crystal-fairies.png", label: "Crystal Fairy" },
  { src: "/products/packs/unicorn-dreams.png", label: "Unicorn" },
  { src: "/products/packs/moon-rabbit.png", label: "Moon Rabbit" },
  { src: "/products/packs/mahou-shoujo.png", label: "Magical Girl" },
];

const RARITY_STYLES: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  Common: { bg: "bg-gray-100", border: "border-gray-300", text: "text-gray-600", glow: "" },
  Rare: { bg: "bg-blue-50", border: "border-blue-400", text: "text-blue-600", glow: "shadow-[0_0_20px_rgba(59,130,246,0.3)]" },
  Epic: { bg: "bg-purple-50", border: "border-purple-400", text: "text-purple-600", glow: "shadow-[0_0_25px_rgba(139,92,246,0.4)]" },
  Legendary: { bg: "bg-amber-50", border: "border-amber-400", text: "text-amber-600", glow: "shadow-[0_0_30px_rgba(245,158,11,0.5)]" },
};

const QUOTA_KEY = "blindbox_gen_count";
const QUOTA_DATE_KEY = "blindbox_gen_date";
const MAX_FREE = 999;

function getQuota(): number {
  if (typeof window === "undefined") return MAX_FREE;
  const today = new Date().toISOString().slice(0, 10);
  const savedDate = localStorage.getItem(QUOTA_DATE_KEY);
  if (savedDate !== today) {
    localStorage.setItem(QUOTA_DATE_KEY, today);
    localStorage.setItem(QUOTA_KEY, "0");
    return MAX_FREE;
  }
  return Math.max(0, MAX_FREE - parseInt(localStorage.getItem(QUOTA_KEY) || "0", 10));
}

function useQuota() {
  const today = new Date().toISOString().slice(0, 10);
  localStorage.setItem(QUOTA_DATE_KEY, today);
  localStorage.setItem(QUOTA_KEY, String(parseInt(localStorage.getItem(QUOTA_KEY) || "0", 10) + 1));
}

interface GenerationResult {
  imageUrl: string;
  rarity: string;
  rarityColor: string;
  rarityEffect: string;
  id: string;
  isSample?: boolean;
  samplePack?: string;
}

export default function CreatePage() {
  const { t } = useTranslation();
  const [prompt, setPrompt] = useState("");
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [referencePreview, setReferencePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState("");
  const [remaining, setRemaining] = useState(() => getQuota());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);

  const loadingSteps = [t("loading.1"), t("loading.2"), t("loading.3"), t("loading.4"), t("loading.5")];

  // Auto-cycle placeholder prompts
  useEffect(() => {
    if (prompt) return; // stop cycling when user types
    const interval = setInterval(() => {
      setPlaceholderIdx((prev) => (prev + 1) % EXAMPLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [prompt]);

  const handleFileUpload = useCallback((file: File) => {
    if (file.size > 10 * 1024 * 1024 || !file.type.startsWith("image/")) {
      setError(t("create.photoError"));
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setReferenceImage(e.target?.result as string);
      setReferencePreview(e.target?.result as string);
      setError("");
    };
    reader.readAsDataURL(file);
  }, [t]);

  const removeImage = () => {
    setReferenceImage(null);
    setReferencePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleGenerate = async () => {
    if (!prompt.trim() && !referenceImage) {
      setError(t("create.typePrompt"));
      return;
    }
    if (remaining <= 0) return;

    setLoading(true);
    setError("");
    setResult(null);
    setLoadingStep(0);

    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => Math.min(prev + 1, loadingSteps.length - 1));
    }, 3000);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim(), referenceImage }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Generation failed"); return; }
      useQuota();
      setRemaining(getQuota());
      setResult(data);
    } catch {
      setError(t("create.networkError"));
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!result?.imageUrl) return;
    try {
      const res = await fetch(result.imageUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `blindbox-${result.rarity.toLowerCase()}-${result.id.slice(0, 8)}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      window.open(result.imageUrl, "_blank");
    }
  };

  const handleReset = () => {
    setResult(null);
    setPrompt("");
    setReferenceImage(null);
    setReferencePreview(null);
    setError("");
  };

  const rarityStyle = result ? RARITY_STYLES[result.rarity] || RARITY_STYLES.Common : null;

  // ═══ RESULT VIEW ═══
  if (result) {
    // For base64 images (from Gemini), store in sessionStorage and pass key
    let printUrl: string;
    if (result.isSample && result.samplePack) {
      printUrl = `/print?pack=${result.samplePack}`;
    } else if (result.imageUrl.startsWith("data:")) {
      const storageKey = `blindbox-img-${result.id}`;
      try { sessionStorage.setItem(storageKey, result.imageUrl); } catch { /* storage full */ }
      printUrl = `/print?key=${storageKey}&rarity=${result.rarity}&id=${result.id}`;
    } else {
      printUrl = `/print?img=${encodeURIComponent(result.imageUrl)}&rarity=${result.rarity}&id=${result.id}`;
    }

    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-white flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          {/* Sample character notice */}
          {result.isSample && (
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 mb-4 text-center">
              <p className="text-sm font-bold text-amber-800 mb-1">
                {t("create.sampleNoticeTitle")}
              </p>
              <p className="text-xs text-amber-700">
                {t("create.sampleNoticeDesc")}
              </p>
            </div>
          )}

          <div className="text-center mb-4">
            <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold ${rarityStyle?.bg} ${rarityStyle?.text} border ${rarityStyle?.border}`}>
              {result.rarity === "Legendary" && <Crown className="w-4 h-4" />}
              {result.rarity === "Epic" && <Sparkles className="w-4 h-4" />}
              {result.rarity}
            </span>
          </div>
          <div className={`rounded-2xl overflow-hidden border-2 ${rarityStyle?.border} ${rarityStyle?.glow} mb-5`}>
            <img src={result.imageUrl} alt="Your kawaii character" className="w-full h-auto" />
          </div>
          <div className="flex gap-3 mb-3">
            <button onClick={handleDownload} className="flex-1 gradient-blue text-white py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> {t("create.downloadPNG")}
            </button>
            <button onClick={handleReset} className="flex-1 bg-muted text-foreground py-3.5 rounded-xl font-bold text-sm hover:bg-muted/70 transition-colors flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4" /> {t("create.createAnother")}
            </button>
          </div>
          {/* Printable box template */}
          <Link
            href={printUrl}
            target="_blank"
            className="w-full gradient-pink text-white py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mb-3"
          >
            <Scissors className="w-4 h-4" /> {t("create.getPrintable")}
          </Link>
          <div className="bg-brand-blue/5 rounded-xl p-3 text-center">
            <p className="text-sm font-semibold text-brand-blue">
              {t("create.printTip")}{" "}
              <Link href="/supplies" className="underline">{t("create.getSupplies")}</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ═══ GENERATOR VIEW ═══
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-white">
      {/* Hero + Input - Centered */}
      <section className="flex flex-col items-center px-4 pt-12 sm:pt-16 pb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-2">
          {t("create.title")} <span className="text-gradient">{t("create.titleHighlight")}</span>
        </h1>
        <p className="text-muted-foreground text-center mb-8 max-w-md">
          {t("create.subtitle")}
        </p>

        {/* Photo preview */}
        {referencePreview && (
          <div className="flex items-center gap-3 mb-3 bg-white rounded-xl px-4 py-3 border border-border max-w-lg w-full">
            <img src={referencePreview} alt="Your photo" className="w-12 h-12 object-cover rounded-lg" />
            <span className="text-sm font-medium flex-1">{t("create.photoUploaded")}</span>
            <button onClick={removeImage} className="text-muted-foreground hover:text-red-500"><X className="w-4 h-4" /></button>
          </div>
        )}

        {/* Input card */}
        <div className="bg-white rounded-3xl border-2 border-brand-pink/20 shadow-pink p-4 sm:p-5 max-w-lg w-full mb-5 focus-within:border-brand-pink/50 transition-colors">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleGenerate(); } }}
            placeholder={EXAMPLES[placeholderIdx]}
            maxLength={500}
            rows={2}
            className="w-full text-base resize-none focus:outline-none placeholder:text-muted-foreground/40 mb-3"
          />
          <div className="flex items-center justify-between">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-muted-foreground hover:text-brand-pink transition-colors flex items-center gap-1.5 text-sm"
            >
              <Camera className="w-4 h-4" />
              <span className="hidden sm:inline">{referencePreview ? t("create.changePhoto") : t("create.uploadPhoto")}</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileUpload(f); }}
            />
          </div>
        </div>

        {/* BIG centered generate button */}
        <button
          onClick={handleGenerate}
          disabled={loading || remaining <= 0}
          className="gradient-pink text-white px-12 py-4 rounded-full font-extrabold text-lg hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-3 shadow-pink hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] mb-5"
        >
          <Wand2 className="w-6 h-6" />
          {t("create.button")}
        </button>

        {/* Quota dots */}
        {remaining > 0 ? (
          <div className="flex items-center gap-2 mb-6">
            <div className="flex gap-1">
              {Array.from({ length: MAX_FREE }).map((_, i) => (
                <div key={i} className={`w-2.5 h-2.5 rounded-full ${i < remaining ? "bg-brand-green" : "bg-gray-200"}`} />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">{remaining} {t("create.freeLeft")}</span>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-brand-purple/10 to-brand-pink/10 rounded-2xl p-5 text-center border border-brand-purple/20 mb-6 max-w-lg w-full">
            <Crown className="w-6 h-6 text-brand-purple mx-auto mb-2" />
            <p className="font-bold mb-1">{t("create.dailyLimit")}</p>
            <p className="text-sm text-muted-foreground mb-3">{t("create.upgrade")}</p>
            <Link href="/pricing" className="inline-block gradient-pink text-white px-5 py-2.5 rounded-full font-bold text-sm">
              {t("create.viewPlans")}
            </Link>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-600 text-sm font-medium px-4 py-3 rounded-xl mb-4 text-center max-w-lg w-full">
            {error}
          </div>
        )}
      </section>

      {/* Example Gallery - What You Can Create */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-2">
            {t("create.whatYouCanCreate")}
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            {t("create.kawaiiReady")}
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
            {SHOWCASE.map((item) => (
              <div key={item.label} className="group text-center">
                <div className="rounded-2xl overflow-hidden border border-border shadow-sm group-hover:shadow-brand transition-shadow mb-2">
                  <Image
                    src={item.src}
                    alt={item.label}
                    width={300}
                    height={300}
                    className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-xs font-semibold text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - 3 steps */}
      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-8">
            {t("create.3steps")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { num: "1", title: t("create.step1"), desc: t("create.step1desc"), emoji: "\u{1F4AC}" },
              { num: "2", title: t("create.step2"), desc: t("create.step2desc"), emoji: "\u2728" },
              { num: "3", title: t("create.step3"), desc: t("create.step3desc"), emoji: "\u{1F381}" },
            ].map((step) => (
              <div key={step.num} className="bg-white rounded-2xl p-6 border border-border">
                <span className="text-3xl mb-3 block">{step.emoji}</span>
                <h3 className="font-extrabold text-lg mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-16 px-4 text-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="gradient-pink text-white px-10 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity shadow-pink inline-flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          {t("create.createYour")}
        </button>
      </section>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center">
            <div className="w-16 h-16 gradient-pink rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-extrabold text-xl mb-6">{t("create.loading")}</h3>
            <div className="space-y-3 text-left mb-6">
              {loadingSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  {i < loadingStep ? (
                    <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0" />
                  ) : i === loadingStep ? (
                    <Loader2 className="w-5 h-5 text-brand-pink animate-spin shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-200 shrink-0" />
                  )}
                  <span className={`text-sm font-medium ${i <= loadingStep ? "text-foreground" : "text-muted-foreground"}`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="gradient-pink h-2 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(((loadingStep + 1) / loadingSteps.length) * 100, 95)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3">{t("create.timing")}</p>
          </div>
        </div>
      )}
    </div>
  );
}
