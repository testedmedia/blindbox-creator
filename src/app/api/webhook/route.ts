import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createOrder, createSubscription } from "@/lib/supabase";
import type Stripe from "stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(request: NextRequest) {
  let event: Stripe.Event;

  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing stripe-signature header." },
        { status: 400 }
      );
    }

    event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[webhook] Signature verification failed:", message);
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        console.log("[webhook] Checkout completed:", {
          id: session.id,
          email: session.customer_email || session.customer_details?.email,
          amount: session.amount_total,
          mode: session.mode,
        });

        if (session.mode === "payment") {
          const email =
            session.customer_email ||
            session.customer_details?.email ||
            "unknown";

          const lineItems = await getStripe().checkout.sessions.listLineItems(
            session.id
          );

          await createOrder({
            email,
            stripe_session_id: session.id,
            stripe_payment_intent: session.payment_intent as string,
            products: lineItems.data.map((item) => ({
              id: item.price?.id || "unknown",
              name: item.description || "Unknown Product",
              qty: item.quantity || 1,
              price: item.amount_total || 0,
            })),
            total_cents: session.amount_total || 0,
            status: "completed",
          });

          console.log("[webhook] Order recorded for:", email);
        }

        break;
      }

      case "customer.subscription.created": {
        const subscription = event.data.object as Stripe.Subscription;

        console.log("[webhook] Subscription created:", {
          id: subscription.id,
          customer: subscription.customer,
          status: subscription.status,
        });

        const customerId =
          typeof subscription.customer === "string"
            ? subscription.customer
            : subscription.customer.id;

        const customer = (await getStripe().customers.retrieve(
          customerId
        )) as Stripe.Customer;

        await createSubscription({
          email: customer.email || "unknown",
          stripe_customer_id: customerId,
          stripe_subscription_id: subscription.id,
          tier: subscription.items.data[0]?.price?.lookup_key || "unknown",
        });

        console.log("[webhook] Subscription recorded for:", customer.email);
        break;
      }

      default:
        console.log("[webhook] Unhandled event type:", event.type);
    }
  } catch (error) {
    console.error("[webhook] Error processing event:", error);
    // Return 200 anyway so Stripe doesn't retry endlessly for processing errors.
    // The event was received and verified; we just failed to process it.
    return NextResponse.json(
      { received: true, error: "Processing error logged." },
      { status: 200 }
    );
  }

  return NextResponse.json({ received: true });
}
