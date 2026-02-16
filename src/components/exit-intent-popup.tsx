"use client";

import { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";

export function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if user already dismissed
    if (typeof window !== "undefined" && localStorage.getItem("exit-popup-dismissed")) {
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if cursor leaves from top of page
      if (e.clientY <= 0 && !show && !dismissed) {
        setShow(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [show, dismissed]);

  const handleClose = () => {
    setShow(false);
    setDismissed(true);
    localStorage.setItem("exit-popup-dismissed", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role: "exit-intent" }),
      });
      setSubmitted(true);
      setTimeout(handleClose, 3000); // Auto-close after 3s
    } catch {
      // Fail silently
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 p-8 relative animate-in zoom-in-95 duration-300">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-brand-green" />
            </div>
            <h3 className="text-2xl font-extrabold mb-2">You&apos;re In!</h3>
            <p className="text-muted-foreground">
              Check your inbox for your free template pack!
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <span className="text-4xl mb-3 block">🎁</span>
              <h3 className="text-2xl md:text-3xl font-extrabold mb-2">
                Wait! Get a Free Template Pack
              </h3>
              <p className="text-muted-foreground">
                Join 2,500+ families crafting kawaii blind boxes. Get a free
                starter pack instantly!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-brand-pink focus:outline-none text-sm"
              />
              <button
                type="submit"
                className="w-full gradient-pink text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity"
              >
                Get My Free Pack
              </button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-4">
              No spam, ever. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
