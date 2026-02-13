"use client";

import { useState, useEffect } from "react";
import {
  DollarSign,
  Copy,
  CheckCircle2,
  Sparkles,
  Users,
  TrendingUp,
  Link2,
  MousePointerClick,
  BarChart3,
  Share2,
  AlertCircle,
  Clock,
  Wallet,
  Lock,
} from "lucide-react";

const SHARE_PLATFORMS = [
  { id: "twitter", label: "Twitter/X", icon: "\u{1D54F}", color: "bg-black text-white" },
  { id: "facebook", label: "Facebook", icon: "f", color: "bg-[#1877F2] text-white" },
  { id: "whatsapp", label: "WhatsApp", icon: "\uD83D\uDCAC", color: "bg-[#25D366] text-white" },
  { id: "tiktok", label: "TikTok", icon: "\uD83C\uDFB5", color: "bg-black text-white" },
  { id: "email", label: "Email", icon: "\u2709\uFE0F", color: "bg-gray-700 text-white" },
];

const AFF_CODE_KEY = "blindbox_aff_code";
const AFF_URL_KEY = "blindbox_aff_url";
const AFF_CLICKS_KEY = "blindbox_aff_clicks";
const AFF_CREATED_KEY = "blindbox_aff_created";
const VISITOR_TIMER_KEY = "blindbox_visitor_timer";

const SIGNUP_BONUS = 10; // $10 free on signup
const WITHDRAW_MIN = 20; // $20 minimum to withdraw

export default function AffiliatePage() {
  const [code, setCode] = useState("");
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [daysActive, setDaysActive] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ h: 23, m: 59, s: 59 });
  const [landingTimeLeft, setLandingTimeLeft] = useState({ h: 23, m: 59, s: 59 });

  useEffect(() => {
    const savedCode = localStorage.getItem(AFF_CODE_KEY) || "";
    const savedUrl = localStorage.getItem(AFF_URL_KEY) || "";
    const savedClicks = parseInt(localStorage.getItem(AFF_CLICKS_KEY) || "0", 10);
    const created = localStorage.getItem(AFF_CREATED_KEY);
    setCode(savedCode);
    setUrl(savedUrl);
    setClicks(savedClicks);
    if (created) {
      const days = Math.max(1, Math.ceil((Date.now() - new Date(created).getTime()) / 86400000));
      setDaysActive(days);
    }
    // Start visitor timer on first visit (for landing countdown)
    if (!savedCode && !localStorage.getItem(VISITOR_TIMER_KEY)) {
      localStorage.setItem(VISITOR_TIMER_KEY, new Date().toISOString());
    }
  }, []);

  // Live 24h countdown from account creation (dashboard)
  useEffect(() => {
    const created = localStorage.getItem(AFF_CREATED_KEY);
    if (!created) return;
    const createdMs = new Date(created).getTime();
    const tick = () => {
      const remaining = Math.max(0, createdMs + 24 * 60 * 60 * 1000 - Date.now());
      const h = Math.floor(remaining / 3600000);
      const m = Math.floor((remaining % 3600000) / 60000);
      const s = Math.floor((remaining % 60000) / 1000);
      setTimeLeft({ h, m, s });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [code]);

  // Landing page countdown (visitor timer - starts on first visit)
  useEffect(() => {
    if (code) return; // Don't run on dashboard
    const visitorStart = localStorage.getItem(VISITOR_TIMER_KEY);
    if (!visitorStart) return;
    const startMs = new Date(visitorStart).getTime();
    const tick = () => {
      const remaining = Math.max(0, startMs + 24 * 60 * 60 * 1000 - Date.now());
      const h = Math.floor(remaining / 3600000);
      const m = Math.floor((remaining % 3600000) / 60000);
      const s = Math.floor((remaining % 60000) / 1000);
      setLandingTimeLeft({ h, m, s });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [code]);

  const generateLink = async () => {
    setGenerating(true);
    try {
      const res = await fetch("/api/affiliate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "generate" }),
      });
      const data = await res.json();
      if (data.code) {
        setCode(data.code);
        setUrl(data.url);
        setClicks(0);
        setDaysActive(1);
        localStorage.setItem(AFF_CODE_KEY, data.code);
        localStorage.setItem(AFF_URL_KEY, data.url);
        localStorage.setItem(AFF_CLICKS_KEY, "0");
        localStorage.setItem(AFF_CREATED_KEY, new Date().toISOString());
      }
    } catch { /* */ }
    finally { setGenerating(false); }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = "I just found this AI that turns any photo into a kawaii blind box character! Try it free";

  const share = (platform: string) => {
    const u = encodeURIComponent(url);
    const t = encodeURIComponent(shareText);
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${t}&url=${u}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      whatsapp: `https://wa.me/?text=${t}%20${u}`,
      tiktok: `https://www.tiktok.com/`,
      email: `mailto:?subject=${encodeURIComponent("Check out this AI blind box maker!")}&body=${t}%20${u}`,
    };
    window.open(urls[platform], "_blank");
  };

  // Commission from clicks: 2% conversion * avg $4.99 * 50% commission
  const earnedCommission = parseFloat((clicks * 0.02 * 4.99 * 0.5).toFixed(2));
  const totalBalance = SIGNUP_BONUS + earnedCommission;
  const progressPercent = Math.min(100, (totalBalance / WITHDRAW_MIN) * 100);
  const canWithdraw = totalBalance >= WITHDRAW_MIN;
  const amountNeeded = Math.max(0, WITHDRAW_MIN - totalBalance).toFixed(2);

  // ═══ NO CODE YET - LANDING ═══
  if (!code) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white">
        {/* Persistent countdown banner */}
        <div className="sticky top-0 z-50 bg-gradient-to-r from-red-600 to-pink-600 text-white py-2.5 px-4 text-center shadow-lg">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="font-bold text-sm">$10 bonus waiting</span>
            <span className="text-white/70">|</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 animate-pulse" />
              <span className="text-sm font-bold">Claim in</span>
              <div className="flex items-center gap-0.5 font-mono">
                <span className="bg-white/20 px-1.5 py-0.5 rounded text-xs font-extrabold">
                  {String(landingTimeLeft.h).padStart(2, "0")}
                </span>
                <span className="text-xs font-bold">:</span>
                <span className="bg-white/20 px-1.5 py-0.5 rounded text-xs font-extrabold">
                  {String(landingTimeLeft.m).padStart(2, "0")}
                </span>
                <span className="text-xs font-bold">:</span>
                <span className="bg-white/20 px-1.5 py-0.5 rounded text-xs font-extrabold">
                  {String(landingTimeLeft.s).padStart(2, "0")}
                </span>
              </div>
            </div>
            <span className="text-white/70 hidden sm:inline">|</span>
            <span className="text-xs text-white/80 hidden sm:inline">No signup needed</span>
          </div>
        </div>

        <section className="flex flex-col items-center px-4 pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green text-sm font-bold px-4 py-1.5 rounded-full mb-6">
            <DollarSign className="w-4 h-4" />
            Earn 50% Commission
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3">
            Share & <span className="text-gradient">Earn Money</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mb-4">
            One click. No signup. No email. Get your link and earn <strong>50%</strong> of every sale.
          </p>

          {/* $10 bonus callout */}
          <div className="inline-flex items-center gap-2 bg-brand-green text-white text-sm font-bold px-5 py-2 rounded-full mb-8 shadow-lg">
            <Wallet className="w-4 h-4" />
            Get $10 FREE in your account instantly
          </div>

          <button
            onClick={generateLink}
            disabled={generating}
            className="bg-brand-green text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-green/90 transition-colors disabled:opacity-50 flex items-center gap-2 shadow-lg mb-12"
          >
            <Sparkles className="w-5 h-5" />
            {generating ? "Creating..." : "Get My Affiliate Link + $10 Free"}
          </button>

          {/* How it works */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl w-full mb-16">
            {[
              { icon: Wallet, title: "1. Get $10 Free", desc: "Instant $10 in your account. No catch.", color: "bg-brand-green" },
              { icon: Share2, title: "2. Share & Earn", desc: "Earn 50% of every sale you refer.", color: "bg-brand-pink" },
              { icon: DollarSign, title: "3. Cash Out at $20", desc: "Withdraw once your balance hits $20.", color: "bg-brand-blue" },
            ].map((s) => (
              <div key={s.title} className="bg-white rounded-2xl p-6 border border-border text-center">
                <div className={`${s.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 text-white`}>
                  <s.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Earnings examples */}
          <h2 className="text-2xl font-extrabold mb-6">What You Can Earn</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full mb-16">
            {[
              { product: "Template Pack", price: "$4.99", earn: "$2.50", icon: "\uD83C\uDFA8" },
              { product: "Party Kit", price: "$14.99", earn: "$7.50", icon: "\uD83C\uDF89" },
              { product: "Annual Sub", price: "$49.99", earn: "$25.00", icon: "\u2B50" },
            ].map((item) => (
              <div key={item.product} className="bg-white rounded-2xl p-5 border border-border text-center">
                <span className="text-3xl block mb-2">{item.icon}</span>
                <p className="font-bold">{item.product}</p>
                <p className="text-xs text-muted-foreground mb-2">Sells for {item.price}</p>
                <div className="bg-brand-green/10 rounded-lg py-2">
                  <p className="text-xl font-extrabold text-brand-green">{item.earn}</p>
                  <p className="text-[10px] text-brand-green font-bold uppercase">You earn</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats banner */}
          <div className="gradient-fun rounded-3xl p-8 text-white max-w-2xl w-full text-center mb-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { stat: "50%", label: "Commission" },
                { stat: "$10", label: "Free Bonus" },
                { stat: "30 Days", label: "Cookie Duration" },
                { stat: "No Cap", label: "On Earnings" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-extrabold">{s.stat}</p>
                  <p className="text-white/70 text-xs">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 30-day cookie info */}
          <div className="max-w-lg text-center">
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-amber-600" />
                <p className="font-bold text-amber-800">30-Day Cookie = More Sales</p>
              </div>
              <p className="text-sm text-amber-700">
                Your referral link tracks visitors for <strong>30 days</strong>. Even if they don&apos;t buy right away,
                you still earn <strong>50% commission</strong> when they come back and purchase. Set it and forget it.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ═══ DASHBOARD ═══
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white">
      <section className="max-w-3xl mx-auto px-4 pt-10 pb-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">Affiliate Dashboard</h1>
          <p className="text-muted-foreground">Share more, earn more.</p>
        </div>

        {/* ═══ ACCOUNT BALANCE CARD ═══ */}
        <div className="bg-white rounded-2xl border-2 border-brand-green/30 p-6 mb-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-brand-green" />
              <p className="font-bold text-sm">Account Balance</p>
            </div>
            {canWithdraw ? (
              <span className="bg-brand-green/10 text-brand-green text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Ready to withdraw
              </span>
            ) : (
              <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Lock className="w-3 h-3" /> ${amountNeeded} more to withdraw
              </span>
            )}
          </div>

          {/* Big balance number */}
          <div className="text-center py-4">
            <p className="text-5xl sm:text-6xl font-extrabold text-brand-green">
              ${totalBalance.toFixed(2)}
            </p>
            <div className="flex items-center justify-center gap-4 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-brand-green" />
                $10.00 signup bonus
              </span>
              <span>+</span>
              <span className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-brand-blue" />
                ${earnedCommission.toFixed(2)} earned
              </span>
            </div>
          </div>

          {/* 24h countdown timer */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-red-100 p-1.5 rounded-lg shrink-0">
                  <Clock className="w-4 h-4 text-red-600 animate-pulse" />
                </div>
                <p className="text-xs text-red-700 font-bold">
                  $10 bonus expires in:
                </p>
              </div>
              <div className="flex items-center gap-1 font-mono">
                <span className="bg-red-600 text-white text-sm font-extrabold px-2 py-1 rounded-lg min-w-[2rem] text-center">
                  {String(timeLeft.h).padStart(2, "0")}
                </span>
                <span className="text-red-600 font-bold">:</span>
                <span className="bg-red-600 text-white text-sm font-extrabold px-2 py-1 rounded-lg min-w-[2rem] text-center">
                  {String(timeLeft.m).padStart(2, "0")}
                </span>
                <span className="text-red-600 font-bold">:</span>
                <span className="bg-red-600 text-white text-sm font-extrabold px-2 py-1 rounded-lg min-w-[2rem] text-center">
                  {String(timeLeft.s).padStart(2, "0")}
                </span>
              </div>
            </div>
            <p className="text-[10px] text-red-600 mt-2">
              Claim your account below to keep your $10 forever. No account = bonus gone.
            </p>
          </div>

          {/* Progress bar to withdrawal */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-muted-foreground">Progress to withdrawal</span>
              <span className="font-bold">${totalBalance.toFixed(2)} / ${WITHDRAW_MIN}.00</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  canWithdraw
                    ? "bg-brand-green"
                    : "bg-gradient-to-r from-brand-green/60 to-brand-green"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] mt-1 text-muted-foreground">
              <span>$0</span>
              <span className="font-bold text-brand-green">${WITHDRAW_MIN} to withdraw</span>
            </div>
          </div>

          {/* Withdraw button */}
          {canWithdraw ? (
            <a
              href="/pricing"
              className="mt-4 w-full block text-center bg-brand-green text-white py-3 rounded-xl font-bold text-sm hover:bg-brand-green/90 transition-colors"
            >
              Withdraw ${totalBalance.toFixed(2)}
            </a>
          ) : (
            <div className="mt-4 w-full text-center bg-gray-100 text-muted-foreground py-3 rounded-xl font-bold text-sm cursor-not-allowed flex items-center justify-center gap-2">
              <Lock className="w-4 h-4" />
              Earn ${amountNeeded} more to unlock withdrawal
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Clicks", value: String(clicks), icon: MousePointerClick, color: "text-brand-blue" },
            { label: "Conv. Rate", value: "2%", icon: BarChart3, color: "text-brand-purple" },
            { label: "Balance", value: `$${totalBalance.toFixed(2)}`, icon: DollarSign, color: "text-brand-green" },
            { label: "Days Active", value: String(daysActive), icon: TrendingUp, color: "text-brand-orange" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-4 border border-border text-center">
              <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
              <p className="text-2xl font-extrabold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Your Link */}
        <div className="bg-white rounded-2xl border border-border p-5 mb-6">
          <p className="text-sm font-bold mb-3 flex items-center gap-2">
            <Link2 className="w-4 h-4 text-brand-green" />
            Your Affiliate Link
          </p>
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-3 border border-border mb-4">
            <input
              type="text"
              value={url}
              readOnly
              className="flex-1 bg-transparent text-sm font-mono truncate focus:outline-none"
            />
            <button
              onClick={copyLink}
              className={`shrink-0 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-1.5 transition-colors ${
                copied ? "bg-brand-green text-white" : "bg-brand-blue text-white hover:bg-brand-blue/90"
              }`}
            >
              {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          <p className="text-xs text-muted-foreground mb-3">Affiliate code: <code className="font-mono text-brand-green font-bold">{code}</code></p>

          {/* Share buttons */}
          <div className="flex flex-wrap gap-2">
            {SHARE_PLATFORMS.map((p) => (
              <button
                key={p.id}
                onClick={() => share(p.id)}
                className={`${p.color} px-3 py-2 rounded-xl font-bold text-xs hover:opacity-90 transition-opacity flex items-center gap-1.5`}
              >
                {p.icon} {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Referral Conversion Banner */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-5 mb-6">
          <div className="flex items-start gap-3">
            <div className="bg-amber-100 p-2 rounded-xl shrink-0">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-bold text-amber-900 mb-1">50% commission on every sale</h3>
              <p className="text-sm text-amber-800">
                You earn <strong>50% of every purchase</strong> made through your link. Your referral cookie lasts <strong>30 days</strong>, so even if they buy later, you still get paid.
              </p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-brand-green/5 border border-brand-green/20 rounded-2xl p-5 mb-6">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-brand-green" />
            Tips to Earn More
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-green mt-0.5 shrink-0" />
              Share in parenting Facebook groups - moms LOVE this
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-green mt-0.5 shrink-0" />
              Make a TikTok showing your kid making a blind box
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-green mt-0.5 shrink-0" />
              Add your link to your Instagram bio
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-green mt-0.5 shrink-0" />
              Share in craft/DIY communities on Reddit
            </li>
          </ul>
        </div>

        {/* Commission Breakdown */}
        <div className="bg-white rounded-2xl border border-border p-5 mb-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-brand-green" />
            Commission Breakdown
          </h3>
          <div className="space-y-3">
            {[
              { product: "Template Packs", price: "$4.99", comm: "$2.50" },
              { product: "Party Kits", price: "$9.99 - $14.99", comm: "$5.00 - $7.50" },
              { product: "Classroom Bundles", price: "$14.99 - $29.99", comm: "$7.50 - $15.00" },
              { product: "Annual Subscription", price: "$49.99/yr", comm: "$25.00" },
              { product: "Pro Subscription", price: "$79.99/yr", comm: "$40.00" },
            ].map((item) => (
              <div key={item.product} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="font-semibold text-sm">{item.product}</p>
                  <p className="text-xs text-muted-foreground">{item.price}</p>
                </div>
                <span className="font-bold text-brand-green">{item.comm}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-border flex items-start gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              You start with a <strong>$10 bonus</strong>. Earn $10+ in commissions to reach $20 and unlock withdrawals.
              Just 2 template pack sales and you&apos;re there!
            </p>
          </div>
        </div>

        {/* Claim Account CTA */}
        <div className="bg-white rounded-2xl border-2 border-brand-blue/30 p-6 mb-6 text-center">
          <Lock className="w-8 h-8 mx-auto mb-3 text-brand-blue" />
          <h3 className="font-extrabold text-lg mb-2">Claim Your Account</h3>
          <p className="text-sm text-muted-foreground mb-1 max-w-sm mx-auto">
            Enter your email to <strong>lock in your $10 bonus forever</strong>.
          </p>
          <p className="text-xs text-red-600 font-bold mb-4">
            Without an account, your $10 bonus disappears in 24 hours.
          </p>
          <div className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
            />
            <button className="bg-brand-blue text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-brand-blue/90 transition-colors shrink-0">
              Claim
            </button>
          </div>
          <p className="text-[10px] text-muted-foreground mt-2">
            No password needed. We&apos;ll email you a login link when you&apos;re ready to withdraw.
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="gradient-fun rounded-2xl p-6 text-white text-center">
          <Users className="w-8 h-8 mx-auto mb-2 opacity-90" />
          <h3 className="font-extrabold text-xl mb-2">
            {canWithdraw ? "Your Money Is Ready!" : `You're $${amountNeeded} Away!`}
          </h3>
          <p className="text-white/80 text-sm mb-4">
            {canWithdraw
              ? "Withdraw your balance now!"
              : "Just a few more referrals and you can cash out. Keep sharing!"
            }
          </p>
        </div>
      </section>
    </div>
  );
}
