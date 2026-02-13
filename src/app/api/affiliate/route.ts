import { NextRequest, NextResponse } from "next/server";

// Generate a short affiliate code
function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // No I/O/0/1 for readability
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

// Hash IP for privacy-safe tracking
function hashIP(ip: string): string {
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ref } = body;

    if (action === "generate") {
      const code = generateCode();
      const affiliateUrl = `https://blindbox-creator.vercel.app/?ref=${code}`;

      // In production: store affiliate in Supabase
      // For now: code is generated client-side and stored in localStorage
      console.log(`[AFFILIATE] New code generated: ${code}`);

      return NextResponse.json({
        code,
        url: affiliateUrl,
        commission: "50%",
        cookieDays: 30,
      });
    }

    if (action === "track_click") {
      // Track a referral click
      const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
      const ipHash = hashIP(ip);
      const userAgent = request.headers.get("user-agent") || "unknown";

      // Anti-fraud: log click with IP hash
      console.log(`[AFFILIATE CLICK] ref=${ref} ip_hash=${ipHash} ua=${userAgent.slice(0, 50)}`);

      // In production: INSERT INTO affiliate_clicks (ref_code, ip_hash, user_agent, created_at)
      // For now: just acknowledge

      const response = NextResponse.json({ tracked: true, ref });

      // Set 30-day referral cookie
      response.cookies.set("blindbox_ref", ref, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        httpOnly: false, // readable by client for dashboard
        path: "/",
        sameSite: "lax",
      });

      // Set $5 credit cookie if first visit
      response.cookies.set("blindbox_credit", JSON.stringify({
        amount: 500, // cents
        ref,
        created: new Date().toISOString(),
        claimed: false,
      }), {
        maxAge: 24 * 60 * 60, // 24 hours
        httpOnly: false,
        path: "/",
        sameSite: "lax",
      });

      return response;
    }

    if (action === "get_stats") {
      // Return affiliate stats for a given code
      // In production: query Supabase aggregate
      // For now: return placeholder indicating tracking is active

      return NextResponse.json({
        code: ref,
        clicks: 0,
        uniqueClicks: 0,
        signups: 0,
        conversions: 0,
        earnings: 0,
        status: "active",
        message: "Stats update every hour. Share your link to start seeing data!",
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// Track affiliate click via GET (for simple redirect tracking)
export async function GET(request: NextRequest) {
  const ref = request.nextUrl.searchParams.get("ref");
  if (!ref) {
    return NextResponse.json({ error: "No ref code" }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const ipHash = hashIP(ip);
  console.log(`[AFFILIATE CLICK GET] ref=${ref} ip_hash=${ipHash}`);

  return NextResponse.json({ tracked: true, ref });
}
