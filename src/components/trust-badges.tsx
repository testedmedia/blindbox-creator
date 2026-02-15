import { Shield, Clock, Heart, CheckCircle } from "lucide-react";

export function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: "30-Day Guarantee",
      description: "Not happy? Full refund, no questions asked",
    },
    {
      icon: Clock,
      title: "Instant Download",
      description: "Start crafting within 2 minutes",
    },
    {
      icon: Heart,
      title: "2,500+ Families",
      description: "Trusted by parents and teachers",
    },
    {
      icon: CheckCircle,
      title: "Print Unlimited",
      description: "No hidden fees or extra charges",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {badges.map((badge) => (
        <div
          key={badge.title}
          className="flex flex-col items-center text-center p-4 bg-muted rounded-xl"
        >
          <badge.icon className="w-6 h-6 text-brand-pink mb-2" />
          <div className="text-xs font-bold mb-1">{badge.title}</div>
          <div className="text-[10px] text-muted-foreground">
            {badge.description}
          </div>
        </div>
      ))}
    </div>
  );
}

export function GuaranteeBadge() {
  return (
    <div className="bg-gradient-to-r from-brand-green/10 to-brand-blue/10 border-2 border-brand-green/30 rounded-2xl p-6 text-center">
      <Shield className="w-12 h-12 text-brand-green mx-auto mb-3" />
      <h3 className="font-extrabold text-lg mb-2">30-Day Money-Back Guarantee</h3>
      <p className="text-sm text-muted-foreground max-w-md mx-auto">
        Try Blind Box Generator risk-free. If you&apos;re not completely satisfied,
        we&apos;ll refund your purchase within 30 days. No questions asked.
      </p>
    </div>
  );
}
