"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { X, Gift, CheckCircle } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const DISMISS_KEY = "blindbox_exit_dismissed";
const EMAIL_KEY = "blindbox_email_captured";
const DISMISS_DAYS = 7;

function isDismissed(): boolean {
  if (typeof window === "undefined") return true;
  const stored = localStorage.getItem(DISMISS_KEY);
  if (!stored) return false;
  const dismissedAt = parseInt(stored, 10);
  const daysSince = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
  return daysSince < DISMISS_DAYS;
}

function hasEmailCaptured(): boolean {
  if (typeof window === "undefined") return true;
  return !!localStorage.getItem(EMAIL_KEY);
}

export function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const triggered = useRef(false);
  const lastScrollY = useRef(0);
  const scrollUpDistance = useRef(0);
  const { t } = useTranslation();

  const dismiss = useCallback(() => {
    setShow(false);
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
  }, []);

  const trigger = useCallback(() => {
    if (triggered.current || isDismissed() || hasEmailCaptured()) return;
    triggered.current = true;
    setShow(true);
  }, []);

  useEffect(() => {
    if (isDismissed() || hasEmailCaptured()) return;

    // Desktop: mouse leaves viewport from top
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };

    // Mobile: rapid scroll-up detection (150px+ upward while near top)
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < lastScrollY.current) {
        scrollUpDistance.current += lastScrollY.current - currentY;
        if (scrollUpDistance.current > 150 && currentY < 100) {
          trigger();
        }
      } else {
        scrollUpDistance.current = 0;
      }
      lastScrollY.current = currentY;
    };

    // Inactivity: 30 seconds idle
    let lastActivity = Date.now();
    const handleActivity = () => {
      lastActivity = Date.now();
    };
    const inactivityInterval = setInterval(() => {
      if (Date.now() - lastActivity > 30000) {
        trigger();
        clearInterval(inactivityInterval);
      }
    }, 1000);

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mousemove", handleActivity);
    document.addEventListener("keydown", handleActivity);
    document.addEventListener("touchstart", handleActivity);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousemove", handleActivity);
      document.removeEventListener("keydown", handleActivity);
      document.removeEventListener("touchstart", handleActivity);
      clearInterval(inactivityInterval);
    };
  }, [trigger]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role: "exit-intent" }),
      });
      if (res.ok) {
        localStorage.setItem(EMAIL_KEY, email);
        setSubmitted(true);
      }
    } catch {
      // Silently fail — user can still dismiss
    } finally {
      setSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={t("exitPopup.title")}
    >
      <div className="relative bg-foreground text-white rounded-3xl p-8 max-w-md w-full text-center animate-in zoom-in-95 duration-300 shadow-2xl">
        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
          aria-label={t("exitPopup.close")}
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div>
            <div className="w-16 h-16 rounded-full bg-brand-green/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-brand-green" />
            </div>
            <h2 className="text-2xl font-extrabold mb-2">
              {t("exitPopup.successTitle")}
            </h2>
            <p className="text-white/70 text-sm mb-6">
              {t("exitPopup.successDesc")}
            </p>
            <button
              onClick={dismiss}
              className="gradient-pink text-white px-8 py-3 rounded-full font-bold w-full hover:opacity-90 transition-opacity"
            >
              {t("exitPopup.continue")}
            </button>
          </div>
        ) : (
          <div>
            {/* Gift icon */}
            <div className="mb-4">
              <Gift className="w-12 h-12 text-brand-pink mx-auto animate-wiggle" />
            </div>

            <h2 className="text-2xl font-extrabold mb-2">
              {t("exitPopup.title")}
            </h2>
            <p className="text-white/70 text-sm mb-6">
              {t("exitPopup.subtitle")}
            </p>

            {/* Discount badge */}
            <div className="bg-brand-pink/20 border border-brand-pink/30 rounded-xl p-4 mb-6">
              <div className="text-3xl font-extrabold text-brand-pink">
                15% OFF
              </div>
              <div className="text-xs text-white/60 font-bold mt-1">
                {t("exitPopup.useCode")}{" "}
                <span className="text-brand-pink font-mono">SAVE15</span>
              </div>
            </div>

            {/* Email form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("exitPopup.emailPlaceholder")}
                required
                className="w-full h-12 px-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink/30 transition-colors"
              />
              <button
                type="submit"
                disabled={submitting}
                className="gradient-pink text-white px-8 py-3.5 rounded-full font-bold w-full hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {submitting ? t("exitPopup.sending") : t("exitPopup.cta")}
              </button>
            </form>

            {/* Skip */}
            <button
              onClick={dismiss}
              className="text-xs text-white/40 hover:text-white/60 transition-colors mt-4 inline-block"
            >
              {t("exitPopup.noThanks")}
            </button>

            {/* Social proof */}
            <p className="text-xs text-white/40 mt-4">
              {t("exitPopup.socialProof")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
