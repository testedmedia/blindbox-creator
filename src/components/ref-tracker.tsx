"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Gift, X, Clock } from "lucide-react";

export function RefTracker() {
  const [showBanner, setShowBanner] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [hoursLeft, setHoursLeft] = useState(24);

  useEffect(() => {
    // Check for ?ref= in URL
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");

    if (ref && ref.length >= 4) {
      // Track the click
      fetch("/api/affiliate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "track_click", ref }),
      }).catch(() => {});

      // Store ref in localStorage
      localStorage.setItem("blindbox_ref", ref);
      localStorage.setItem("blindbox_credit_ts", Date.now().toString());

      // Show credit banner
      setShowBanner(true);

      // Clean URL without reload
      const url = new URL(window.location.href);
      url.searchParams.delete("ref");
      window.history.replaceState({}, "", url.pathname + url.search);
    } else {
      // Check if there's an existing credit that hasn't expired
      const creditTs = localStorage.getItem("blindbox_credit_ts");
      const creditDismissed = localStorage.getItem("blindbox_credit_dismissed");
      if (creditTs && !creditDismissed) {
        const elapsed = Date.now() - parseInt(creditTs, 10);
        const remaining = 24 * 60 * 60 * 1000 - elapsed;
        if (remaining > 0) {
          setHoursLeft(Math.ceil(remaining / (60 * 60 * 1000)));
          setShowBanner(true);
        }
      }
    }
  }, []);

  // Update countdown every minute
  useEffect(() => {
    if (!showBanner) return;
    const interval = setInterval(() => {
      const creditTs = localStorage.getItem("blindbox_credit_ts");
      if (creditTs) {
        const elapsed = Date.now() - parseInt(creditTs, 10);
        const remaining = 24 * 60 * 60 * 1000 - elapsed;
        if (remaining <= 0) {
          setShowBanner(false);
        } else {
          setHoursLeft(Math.ceil(remaining / (60 * 60 * 1000)));
        }
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [showBanner]);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem("blindbox_credit_dismissed", "1");
  };

  if (!showBanner || dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-brand-green via-emerald-500 to-brand-green text-white">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Gift className="w-5 h-5 shrink-0" />
          <p className="text-sm font-bold truncate">
            You have a <span className="underline underline-offset-2">$5 FREE credit</span>!
          </p>
          <div className="hidden sm:flex items-center gap-1 text-white/80 text-xs shrink-0">
            <Clock className="w-3.5 h-3.5" />
            <span>Expires in {hoursLeft}h</span>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/pricing"
            className="bg-white text-brand-green px-4 py-1.5 rounded-full font-bold text-xs hover:bg-white/90 transition-colors"
          >
            Claim $5 Now
          </Link>
          <button onClick={handleDismiss} className="text-white/70 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
