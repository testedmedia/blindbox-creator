"use client";

import { useTranslation } from "@/lib/i18n";

const TESTIMONIALS = [
  {
    nameKey: "testimonial.name1",
    roleKey: "testimonial.role1",
    quoteKey: "testimonial.quote1",
    avatar: "👩‍👧",
  },
  {
    nameKey: "testimonial.name2",
    roleKey: "testimonial.role2",
    quoteKey: "testimonial.quote2",
    avatar: "👩‍🏫",
  },
  {
    nameKey: "testimonial.name3",
    roleKey: "testimonial.role3",
    quoteKey: "testimonial.quote3",
    avatar: "✍️",
  },
  {
    nameKey: "testimonial.name4",
    roleKey: "testimonial.role4",
    quoteKey: "testimonial.quote4",
    avatar: "👨‍👧‍👦",
  },
  {
    nameKey: "testimonial.name5",
    roleKey: "testimonial.role5",
    quoteKey: "testimonial.quote5",
    avatar: "🎉",
  },
  {
    nameKey: "testimonial.name6",
    roleKey: "testimonial.role6",
    quoteKey: "testimonial.quote6",
    avatar: "🎨",
  },
];

export function Testimonials() {
  const { t } = useTranslation();

  return (
    <section className="bg-gradient-to-b from-white to-pink-50/30 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            {t("testimonials.title")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("testimonials.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.nameKey}
              className="bg-white rounded-2xl p-6 shadow-sm border border-border hover:shadow-brand transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{item.avatar}</span>
                <div>
                  <p className="font-bold text-sm">{t(item.nameKey)}</p>
                  <p className="text-xs text-muted-foreground">{t(item.roleKey)}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                &ldquo;{t(item.quoteKey)}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
