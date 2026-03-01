"use client";

import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const DISMISS_KEY = "blindbox_social_proof_dismissed";
const DISMISS_HOURS = 24;
const ROTATE_INTERVAL = 5000;

interface ProofMessage {
  key: string;
  emoji: string;
}

const PROOF_MESSAGES: ProofMessage[] = [
  { key: "socialProof.purchase1", emoji: "🎉" },
  { key: "socialProof.purchase2", emoji: "🎁" },
  { key: "socialProof.purchase3", emoji: "✨" },
  { key: "socialProof.purchase4", emoji: "🎀" },
  { key: "socialProof.stat1", emoji: "⭐" },
  { key: "socialProof.stat2", emoji: "🖨️" },
  { key: "socialProof.stat3", emoji: "🏫" },
  { key: "socialProof.purchase5", emoji: "💖" },
  { key: "socialProof.stat4", emoji: "🔥" },
  { key: "socialProof.purchase6", emoji: "🎊" },
];

function isDismissed(): boolean {
  if (typeof window === "undefined") return true;
  const stored = localStorage.getItem(DISMISS_KEY);
  if (!stored) return false;
  const dismissedAt = parseInt(stored, 10);
  const hoursSince = (Date.now() - dismissedAt) / (1000 * 60 * 60);
  return hoursSince < DISMISS_HOURS;
}

export function SocialProofBanner() {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const { t } = useTranslation();

  const dismiss = useCallback(() => {
    setVisible(false);
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
  }, []);

  // Show banner after a short delay to not compete with page load
  useEffect(() => {
    if (isDismissed()) return;

    const showTimer = setTimeout(() => {
      setVisible(true);
    }, 3000);

    return () => clearTimeout(showTimer);
  }, []);

  // Rotate messages every 5 seconds
  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % PROOF_MESSAGES.length);
        setAnimating(false);
      }, 300);
    }, ROTATE_INTERVAL);

    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  const current = PROOF_MESSAGES[index];

  return (
    <div
      className="fixed bottom-4 left-4 z-40 max-w-sm animate-in slide-in-from-bottom-4 fade-in duration-500"
      role="status"
      aria-live="polite"
    >
      <div className="bg-foreground text-white rounded-xl px-4 py-3 shadow-2xl flex items-center gap-3 relative group">
        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute -top-2 -right-2 w-6 h-6 bg-foreground border border-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10"
          aria-label={t("socialProof.close")}
        >
          <X className="w-3 h-3 text-white/70" />
        </button>

        {/* Emoji */}
        <span className="text-2xl shrink-0">{current.emoji}</span>

        {/* Message */}
        <p
          className={`text-sm text-white/90 leading-snug transition-opacity duration-300 ${
            animating ? "opacity-0" : "opacity-100"
          }`}
        >
          {t(current.key)}
        </p>

        {/* Time ago */}
        <span className="text-[10px] text-white/40 shrink-0 self-end">
          {t("socialProof.justNow")}
        </span>
      </div>
    </div>
  );
}
