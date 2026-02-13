import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe() {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY not configured");
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-12-18.acacia" as Stripe.LatestApiVersion,
    });
  }
  return _stripe;
}

export async function createCheckoutSession(items: { priceId?: string; name: string; price: number; quantity: number }[], customerEmail?: string) {
  const stripe = getStripe();
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(item => {
    if (item.priceId) {
      return { price: item.priceId, quantity: item.quantity };
    }
    return {
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/shop?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/shop?canceled=true`,
    customer_email: customerEmail,
  });

  return session;
}

export async function createSubscriptionSession(priceId: string, customerEmail?: string) {
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?canceled=true`,
    customer_email: customerEmail,
  });

  return session;
}
