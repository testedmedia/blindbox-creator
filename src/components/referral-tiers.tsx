"use client";

import { REFERRAL_TIERS, getCurrentTier, getNextTier } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n";

interface ReferralTiersProps {
  conversions: number;
}

export function ReferralTiers({ conversions }: ReferralTiersProps) {
  const { t, lang } = useTranslation();
  const currentTier = getCurrentTier(conversions);
  const nextTier = getNextTier(conversions);

  const currentTierIndex = REFERRAL_TIERS.findIndex(
    (tier) => tier.id === currentTier.id
  );

  return (
    <div className="bg-white rounded-2xl border border-border p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-extrabold mb-1">
          {t("referral.rewardTiers")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t("referral.rewardTiersDesc")}
        </p>
      </div>

      {/* Current tier badge + progress to next */}
      <div className="flex items-center gap-4 mb-6 bg-gray-50 rounded-xl p-4 border border-border">
        <div className="text-5xl">{currentTier.emoji}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-lg font-bold ${currentTier.color.replace('text-emerald-400', 'text-emerald-600').replace('text-pink-400', 'text-pink-600').replace('text-amber-400', 'text-amber-600').replace('text-orange-400', 'text-orange-600').replace('text-cyan-400', 'text-cyan-600')}`}>
              {lang === "es" ? currentTier.nameEs : currentTier.name}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-gray-200 px-2 py-0.5 rounded-full">
              {t("referral.currentTier")}
            </span>
          </div>
          {nextTier ? (
            <>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">
                  {conversions}/{nextTier.referralsRequired}{" "}
                  {t("referral.referrals")}
                </span>
                <span className="text-muted-foreground">
                  {nextTier.referralsRequired - conversions}{" "}
                  {t("referral.referralsToNext")}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-brand-pink to-brand-purple"
                  style={{
                    width: `${Math.min(
                      100,
                      (conversions / nextTier.referralsRequired) * 100
                    )}%`,
                  }}
                />
              </div>
            </>
          ) : (
            <p className="text-sm text-brand-green font-bold">
              {t("referral.maxTier")}
            </p>
          )}
        </div>
      </div>

      {/* Tier ladder */}
      <div className="space-y-3">
        {REFERRAL_TIERS.map((tier, index) => {
          const isUnlocked = conversions >= tier.referralsRequired;
          const isCurrent = tier.id === currentTier.id;
          const tierIndex = index;

          // Map dark-theme colors to light-theme equivalents
          const lightColor = tier.color
            .replace("text-emerald-400", "text-emerald-600")
            .replace("text-pink-400", "text-pink-600")
            .replace("text-amber-400", "text-amber-600")
            .replace("text-orange-400", "text-orange-600")
            .replace("text-cyan-400", "text-cyan-600");

          const lightBorder = tier.borderColor
            .replace("/30", "/50");

          return (
            <div
              key={tier.id}
              className={`relative flex items-center gap-4 rounded-xl p-4 transition-all duration-200 ${
                isCurrent
                  ? `bg-white border-2 ${lightBorder} shadow-sm`
                  : isUnlocked
                  ? "bg-gray-50 border border-border"
                  : "bg-gray-50/50 border border-gray-100 opacity-50"
              }`}
            >
              {/* Connector line */}
              {index < REFERRAL_TIERS.length - 1 && (
                <div
                  className={`absolute left-[2.1rem] top-full w-0.5 h-3 ${
                    tierIndex < currentTierIndex
                      ? "bg-brand-green/40"
                      : "bg-gray-200"
                  }`}
                />
              )}

              {/* Emoji + tier number */}
              <div className="flex flex-col items-center shrink-0 w-10">
                <span className="text-3xl">{tier.emoji}</span>
                <span className="text-[10px] font-bold text-muted-foreground mt-0.5">
                  {tier.referralsRequired}
                </span>
              </div>

              {/* Tier info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className={`font-bold text-sm ${
                      isUnlocked ? lightColor : "text-gray-400"
                    }`}
                  >
                    {lang === "es" ? tier.nameEs : tier.name}
                  </span>
                  {isCurrent && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-pink bg-brand-pink/10 px-2 py-0.5 rounded-full">
                      {t("referral.current")}
                    </span>
                  )}
                </div>
                <p
                  className={`text-xs ${
                    isUnlocked ? "text-muted-foreground" : "text-gray-300"
                  }`}
                >
                  {lang === "es" ? tier.rewardLabelEs : tier.rewardLabel}
                </p>
              </div>

              {/* Status badge */}
              <div className="shrink-0">
                {isUnlocked ? (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green bg-brand-green/10 px-2.5 py-1 rounded-full">
                    {t("referral.unlocked")}
                  </span>
                ) : (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                    {t("referral.locked")}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
