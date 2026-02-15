"use client";

import { useState, useEffect } from "react";
import { X, Mail } from "lucide-react";
import { trackEvent } from "@/components/analytics";
import { useTranslation } from "@/lib/i18n";

const MODAL_KEY = "blindbox_email_modal_shown";

export function EmailCaptureModal({ show }: { show: boolean }) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  useEffect(() => {
    if (!show) return;
    // Only show once per browser
    if (typeof window !== "undefined" && localStorage.getItem(MODAL_KEY)) return;

    const timer = setTimeout(() => {
      setVisible(true);
      localStorage.setItem(MODAL_KEY, "1");
    }, 2000);

    return () => clearTimeout(timer);
  }, [show]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role: "generator" }),
      });
      setStatus("success");
      trackEvent("email_signup", { source: "generator_modal" });
    } catch {
      setStatus("idle");
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full relative shadow-2xl">
        <button
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="w-14 h-14 gradient-pink rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-7 h-7 text-white" />
          </div>

          {status === "success" ? (
            <>
              <h3 className="font-extrabold text-xl mb-2">{t("emailModal.successTitle")}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t("emailModal.successDesc")}</p>
              <button
                onClick={() => setVisible(false)}
                className="gradient-pink text-white px-6 py-2.5 rounded-full font-bold text-sm"
              >
                {t("emailModal.continue")}
              </button>
            </>
          ) : (
            <>
              <h3 className="font-extrabold text-xl mb-2">{t("emailModal.title")}</h3>
              <p className="text-sm text-muted-foreground mb-5">{t("emailModal.desc")}</p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("emailModal.placeholder")}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-brand-pink"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full gradient-pink text-white py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {status === "loading" ? "..." : t("emailModal.button")}
                </button>
              </form>
              <button
                onClick={() => setVisible(false)}
                className="text-xs text-muted-foreground mt-3 hover:underline"
              >
                {t("emailModal.noThanks")}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
