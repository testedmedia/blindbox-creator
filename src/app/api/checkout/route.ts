import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";
import { TEMPLATE_PACKS, PARTY_KITS, CLASSROOM_BUNDLES, MEGA_BUNDLE, Product } from "@/lib/constants";

const ALL_PRODUCTS: Product[] = [...TEMPLATE_PACKS, ...PARTY_KITS, ...CLASSROOM_BUNDLES, MEGA_BUNDLE];

export async function GET(request: NextRequest) {
  const productId = request.nextUrl.searchParams.get("product");

  if (!productId) {
    return NextResponse.json({ error: "Missing product parameter." }, { status: 400 });
  }

  const product = ALL_PRODUCTS.find((p) => p.id === productId);
  if (!product) {
    return NextResponse.json({ error: `Product "${productId}" not found.` }, { status: 404 });
  }

  try {
    const session = await createCheckoutSession(
      [{ name: product.name, price: product.price, quantity: 1 }]
    );
    if (session.url) {
      return NextResponse.redirect(session.url);
    }
    return NextResponse.json({ error: "Could not create checkout session." }, { status: 500 });
  } catch (error) {
    console.error("[checkout GET] Error:", error);
    // Stripe not configured yet - redirect to a friendly page
    const errorMessage = error instanceof Error ? error.message : "Checkout not available";
    if (errorMessage.includes("STRIPE_SECRET_KEY")) {
      return NextResponse.json(
        { error: "Payments are being set up. Please check back soon!", product: { name: product.name, price: product.price } },
        { status: 503 }
      );
    }
    return NextResponse.json({ error: "Checkout failed. Please try again." }, { status: 500 });
  }
}

interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutBody {
  items: CheckoutItem[];
  email?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutBody = await request.json();

    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: "Items array is required and must not be empty." },
        { status: 400 }
      );
    }

    for (const item of body.items) {
      if (!item.name || typeof item.price !== "number" || item.price <= 0) {
        return NextResponse.json(
          { error: `Invalid item: ${item.name || "unknown"}. Name and positive price are required.` },
          { status: 400 }
        );
      }
      if (!item.quantity || item.quantity < 1) {
        return NextResponse.json(
          { error: `Invalid quantity for item: ${item.name}.` },
          { status: 400 }
        );
      }
    }

    const session = await createCheckoutSession(
      body.items.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      body.email
    );

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[checkout] Error creating checkout session:", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON in request body." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create checkout session. Please try again." },
      { status: 500 }
    );
  }
}
