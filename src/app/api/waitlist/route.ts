import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { addToWaitlist } from "@/lib/supabase";

interface WaitlistBody {
  email: string;
  role?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const _metricsStart = Date.now();
  try {
    const body: WaitlistBody = await request.json();

    if (!body.email || !EMAIL_REGEX.test(body.email)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const email = body.email.toLowerCase().trim();
    const role = body.role?.trim() || undefined;

    try {
      await addToWaitlist(email, role);
    } catch (_dbError) {
      // Supabase not configured yet - still accept the signup gracefully
      console.log("[waitlist] DB not available, email captured in logs:", email);
    }

    Sentry.metrics.count("api.requests", 1, { attributes: { endpoint: "/api/waitlist", method: "POST", status: "200" } });
    Sentry.metrics.distribution("api.latency_ms", Date.now() - _metricsStart, { attributes: { endpoint: "/api/waitlist" } });
    return NextResponse.json({
      success: true,
      message: "You're on the list! We'll notify you when the AI Generator launches.",
    });
  } catch (error) {
    console.error("[waitlist] Error adding to waitlist:", error);
    Sentry.metrics.count("api.errors", 1, { attributes: { endpoint: "/api/waitlist" } });
    Sentry.metrics.distribution("api.latency_ms", Date.now() - _metricsStart, { attributes: { endpoint: "/api/waitlist" } });

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON in request body." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
