import { NextRequest, NextResponse } from "next/server";

interface ContactBody {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body: ContactBody = await request.json();

    const missing: string[] = [];
    if (!body.name?.trim()) missing.push("name");
    if (!body.email?.trim()) missing.push("email");
    if (!body.subject?.trim()) missing.push("subject");
    if (!body.message?.trim()) missing.push("message");

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}.` },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(body.email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Log the contact form submission. Resend email integration coming later.
    console.log("[contact] New contact form submission:", {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      subject: body.subject.trim(),
      message: body.message.trim().substring(0, 200) + (body.message.length > 200 ? "..." : ""),
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Message received! We'll get back to you within 24 hours.",
    });
  } catch (error) {
    console.error("[contact] Error processing contact form:", error);

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
