# Exit-Intent Popup & Cart Abandonment System

**Goal:** Recover 10% of abandoned carts = $500+ monthly recovered revenue

**Trigger:** Mouse moves to close tab/window OR user inactive for 30+ seconds on checkout page

---

## POPUP DESIGN (Exit-Intent)

### When to Show:
- User on `/shop/[id]` product page (hasn't added to cart)
- User on `/pricing` page (hasn't selected tier)
- Mouse cursor moves above browser viewport (intent to close tab)
- OR 30 seconds of inactivity
- Only show once per session (cookie: `exit_intent_shown=1`)

### Popup Content:

```tsx
<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-in fade-in">
  <div className="bg-white rounded-3xl p-8 max-w-md mx-4 text-center animate-in zoom-in">
    {/* Close button */}
    <button className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
      <X className="w-6 h-6" />
    </button>

    {/* Emoji */}
    <div className="text-6xl mb-4">🎁</div>

    {/* Headline */}
    <h2 className="text-2xl font-extrabold mb-2">
      Wait! Don't Leave Empty-Handed
    </h2>

    {/* Offer */}
    <p className="text-muted-foreground mb-6">
      Get <strong className="text-brand-pink">15% off</strong> your first purchase if you complete checkout in the next <strong className="text-brand-pink">10 minutes</strong>!
    </p>

    {/* Countdown */}
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
      <div className="text-3xl font-extrabold text-red-600 font-mono">
        09:47
      </div>
      <div className="text-xs text-red-600 font-bold">Time Left</div>
    </div>

    {/* CTA */}
    <button className="bg-brand-pink text-white px-8 py-3.5 rounded-full font-bold w-full hover:bg-brand-pink/90 transition-colors mb-3">
      Claim 15% Off Now
    </button>

    {/* Promo code */}
    <p className="text-xs text-muted-foreground">
      Use code: <strong className="text-brand-pink">SAVE15</strong> at checkout
    </p>

    {/* Social proof */}
    <p className="text-xs text-muted-foreground mt-4">
      ✓ 2,500+ families trust Blind Box Creator
    </p>
  </div>
</div>
```

---

## CART ABANDONMENT EMAIL SEQUENCE

### Email 1: Abandoned Cart (1 Hour After)

**Subject:** "You left something behind! 🎁"

**Body:**
```
Hi [Name],

You left [Product Name] in your cart! We saved it for you:

[Product Image]
**[Product Name]**
$[Price]

[Big CTA Button: Complete Checkout]

Not sure yet? Here's why 2,500+ families love it:
✓ Screen-free fun for kids
✓ Zero plastic waste
✓ Perfect for parties & classrooms
✓ Print instantly at home

Questions? Just reply to this email!

Happy crafting,
[YourName]
Blind Box Creator

P.S. Your cart expires in 24 hours — grab it before it's gone!
```

---

### Email 2: Discount Offer (24 Hours After)

**Subject:** "Still interested? Here's 10% off 💰"

**Body:**
```
Hi [Name],

We noticed you didn't finish checkout. No worries!

Here's 10% off to sweeten the deal:

**Use code: BACK10**

[Big CTA Button: Complete Checkout (10% Off)]

Your cart:
- [Product Name] — $[Original Price] → $[Discounted Price]

This offer expires in 48 hours, so grab it while you can!

Cheers,
[YourName]

P.S. Over 2,500 families have already discovered the magic of blind boxes. Join them today!
```

---

### Email 3: Last Chance (72 Hours After)

**Subject:** "Last chance! Your cart expires in 24 hours ⏰"

**Body:**
```
Hi [Name],

This is your final reminder — your cart is about to expire!

⏰ **24 hours left** to complete your purchase.

[Product Image]
**[Product Name]** — $[Price]

[Big CTA Button: Complete Checkout Now]

Still on the fence? Here's what others are saying:

⭐⭐⭐⭐⭐ "My kids haven't touched their iPads in 3 days!" — Sarah M.

⭐⭐⭐⭐⭐ "Best birthday party activity ever!" — Emily J.

⭐⭐⭐⭐⭐ "My class is obsessed!" — Mr. Lee, 3rd Grade Teacher

Don't miss out — this is your last chance!

[YourName]
Blind Box Creator
```

---

## TECHNICAL IMPLEMENTATION

### 1. Exit-Intent Detection (React Hook)

```tsx
// hooks/useExitIntent.ts
import { useEffect, useState } from 'react';

export function useExitIntent() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if already shown this session
    if (sessionStorage.getItem('exit_intent_shown')) return;

    let timeout: NodeJS.Timeout;
    let lastActivity = Date.now();

    const handleMouseLeave = (e: MouseEvent) => {
      // Mouse moved to top of screen (intent to close)
      if (e.clientY <= 0) {
        setShowPopup(true);
        sessionStorage.setItem('exit_intent_shown', '1');
      }
    };

    const handleActivity = () => {
      lastActivity = Date.now();
    };

    // Check for inactivity every second
    const inactivityCheck = setInterval(() => {
      const inactive = Date.now() - lastActivity > 30000; // 30 seconds
      if (inactive) {
        setShowPopup(true);
        sessionStorage.setItem('exit_intent_shown', '1');
        clearInterval(inactivityCheck);
      }
    }, 1000);

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousemove', handleActivity);
    document.addEventListener('keypress', handleActivity);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', handleActivity);
      document.removeEventListener('keypress', handleActivity);
      clearInterval(inactivityCheck);
      clearTimeout(timeout);
    };
  }, []);

  return { showPopup, setShowPopup };
}
```

---

### 2. Countdown Timer Component

```tsx
// components/countdown-timer.tsx
'use client';

import { useState, useEffect } from 'react';

export function CountdownTimer({ minutes = 10 }) {
  const [timeLeft, setTimeLeft] = useState(minutes * 60); // Convert to seconds

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <div className="text-3xl font-extrabold text-red-600 font-mono">
      {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
    </div>
  );
}
```

---

### 3. Abandoned Cart Tracking

**Stripe Webhook: Track Incomplete Checkouts**

```ts
// app/api/webhook/route.ts

// Add new event handler
if (event.type === 'checkout.session.expired') {
  const session = event.data.object;

  // Save abandoned cart data
  await supabase.from('abandoned_carts').insert({
    email: session.customer_email,
    stripe_session_id: session.id,
    products: session.line_items, // What they added
    total_cents: session.amount_total,
    abandoned_at: new Date(),
    recovery_status: 'pending' // pending, email_sent, recovered
  });

  // Trigger email sequence (via Klaviyo/Resend)
  await sendAbandonedCartEmail({
    email: session.customer_email,
    products: session.line_items,
    checkoutUrl: session.url
  });
}
```

---

### 4. Email Automation (Klaviyo or Resend)

**Option A: Klaviyo Flow (Recommended)**
1. Create "Abandoned Cart" flow in Klaviyo dashboard
2. Trigger: `checkout.session.expired` webhook → POST to Klaviyo API
3. Flow: Email 1 (1h) → Email 2 (24h with 10% code) → Email 3 (72h)

**Option B: Custom Cron Job**
```ts
// scripts/send-abandoned-cart-emails.ts
// Run every hour via Vercel Cron

import { supabase } from '@/lib/supabase';
import { sendEmail } from '@/lib/resend';

export async function sendAbandonedCartEmails() {
  const now = new Date();

  // Email 1: Send 1 hour after abandonment
  const email1Carts = await supabase
    .from('abandoned_carts')
    .select('*')
    .eq('recovery_status', 'pending')
    .gte('abandoned_at', new Date(now.getTime() - 2 * 60 * 60 * 1000)) // 1-2h ago
    .lte('abandoned_at', new Date(now.getTime() - 1 * 60 * 60 * 1000));

  for (const cart of email1Carts.data || []) {
    await sendEmail({
      to: cart.email,
      subject: 'You left something behind! 🎁',
      template: 'abandoned-cart-1',
      data: { ...cart }
    });

    await supabase
      .from('abandoned_carts')
      .update({ recovery_status: 'email_1_sent' })
      .eq('id', cart.id);
  }

  // Email 2: Send 24 hours after (with discount)
  // Email 3: Send 72 hours after (final warning)
  // ... similar logic
}
```

---

## SMS RECOVERY (Optional, Advanced)

**If phone number collected:**

```ts
// Via Twilio
await twilio.messages.create({
  to: user.phone,
  from: '+1234567890',
  body: 'Hey! You left [Product] in your cart. Complete checkout here: [link]'
});
```

**When to send:** 2 hours after abandonment (before Email 2)

**Cost:** $0.0075/SMS (US)

---

## PERFORMANCE METRICS

| Metric | Baseline | Target | Formula |
|--------|----------|--------|---------|
| **Abandonment Rate** | 70% | 60% | Abandoned / Total Carts |
| **Recovery Rate** | 5% | 10% | Recovered / Abandoned |
| **Popup Conversion** | 2% | 5% | Popup → Checkout |
| **Email Open Rate** | 20% | 30% | Opens / Sent |
| **Email Click Rate** | 5% | 10% | Clicks / Opens |
| **Recovered Revenue** | $0 | $500/mo | Sum(Recovered Orders) |

---

## A/B TESTING IDEAS

### Popup Variations:
- **A:** 15% off, 10min countdown
- **B:** Free shipping (if applicable)
- **C:** Free pack upgrade ($4.99 value)
- **D:** "Chat with founder" (personalized help)

### Email Subject Lines:
- **A:** "You left something behind! 🎁"
- **B:** "Oops! Did you forget your cart?"
- **C:** "Still thinking about [Product]?"
- **D:** "Your blind boxes are waiting! 📦"

### Discount Tiers:
- **A:** 10% off immediately
- **B:** 15% off after 1 hour
- **C:** 20% off after 24 hours (urgency)

**Test for 2 weeks, pick winner, deploy permanently**

---

## NEXT STEPS

1. ✅ Implement `useExitIntent` hook
2. ✅ Create exit-intent popup component
3. ✅ Add countdown timer
4. ✅ Set up Stripe webhook for `checkout.session.expired`
5. ✅ Create abandoned cart email templates (Resend or Klaviyo)
6. ✅ Set up cron job for email automation
7. ✅ Test full flow (checkout → abandon → receive emails)
8. ✅ A/B test popup variations
9. ✅ Monitor metrics weekly, optimize

**Recover those lost sales! 💰**
