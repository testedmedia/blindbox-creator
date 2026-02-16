import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface OrderEmailParams {
  email: string;
  products: { name: string; qty: number; price: number }[];
  totalCents: number;
}

export async function sendOrderConfirmation({ email, products, totalCents }: OrderEmailParams) {
  if (!resend) {
    console.log("[resend] RESEND_API_KEY not set, skipping order confirmation email");
    return;
  }

  const productRows = products
    .map(
      (p) =>
        `<tr>
          <td style="padding:8px 16px;border-bottom:1px solid #f0f0f0">${p.name}</td>
          <td style="padding:8px 16px;border-bottom:1px solid #f0f0f0;text-align:right">$${(p.price / 100).toFixed(2)}</td>
        </tr>`
    )
    .join("");

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family:'Nunito',Arial,sans-serif;background:#fdf2f8;margin:0;padding:0">
  <div style="max-width:560px;margin:0 auto;padding:32px 16px">
    <div style="background:white;border-radius:16px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.06)">
      <!-- Header -->
      <div style="text-align:center;margin-bottom:24px">
        <h1 style="font-size:24px;font-weight:800;margin:0 0 8px">🎉 Order Confirmed!</h1>
        <p style="color:#6b7280;margin:0;font-size:14px">Your kawaii templates are ready to download</p>
      </div>

      <!-- Order Summary -->
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
        <thead>
          <tr style="background:#fdf2f8">
            <th style="padding:8px 16px;text-align:left;font-size:12px;text-transform:uppercase;color:#9ca3af">Item</th>
            <th style="padding:8px 16px;text-align:right;font-size:12px;text-transform:uppercase;color:#9ca3af">Price</th>
          </tr>
        </thead>
        <tbody>
          ${productRows}
          <tr>
            <td style="padding:12px 16px;font-weight:700">Total</td>
            <td style="padding:12px 16px;text-align:right;font-weight:700;color:#FF6B9D">$${(totalCents / 100).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <!-- Print Instructions -->
      <div style="background:#f0fdf4;border-radius:12px;padding:20px;margin-bottom:24px">
        <h3 style="font-size:16px;font-weight:700;margin:0 0 12px">🖨️ Print Instructions</h3>
        <ol style="margin:0;padding-left:20px;color:#374151;font-size:14px;line-height:1.8">
          <li>Download your templates from the order page</li>
          <li>Print on <strong>80lb cardstock</strong> for best results</li>
          <li>Cut along solid lines, fold on dotted lines</li>
          <li>Glue tabs and let dry for 2 minutes</li>
          <li>Put characters in the box — surprise time!</li>
        </ol>
      </div>

      <!-- Supplies Upsell -->
      <div style="background:#eff6ff;border-radius:12px;padding:20px;margin-bottom:24px;text-align:center">
        <p style="font-size:14px;font-weight:700;margin:0 0 8px">📄 Need supplies?</p>
        <p style="font-size:13px;color:#6b7280;margin:0 0 12px">Cardstock, scissors, and glue — under $24 on Amazon</p>
        <a href="https://blindbox-creator.vercel.app/supplies" style="display:inline-block;background:#4A90D9;color:white;padding:10px 24px;border-radius:99px;text-decoration:none;font-weight:700;font-size:13px">View Supplies</a>
      </div>

      <!-- Affiliate CTA -->
      <div style="border:2px solid #f3e8ff;border-radius:12px;padding:20px;text-align:center">
        <p style="font-size:14px;font-weight:700;margin:0 0 8px">💰 Love blind boxes? Earn 50%</p>
        <p style="font-size:13px;color:#6b7280;margin:0 0 12px">Share your link, earn 50% of every sale. No signup needed.</p>
        <a href="https://blindbox-creator.vercel.app/affiliate" style="display:inline-block;background:#9B59B6;color:white;padding:10px 24px;border-radius:99px;text-decoration:none;font-weight:700;font-size:13px">Get My Affiliate Link</a>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:24px 0;color:#9ca3af;font-size:12px">
      <p style="margin:0 0 4px">Blind Box Generator — AI-powered kawaii paper crafts</p>
      <p style="margin:0"><a href="https://blindbox-creator.vercel.app" style="color:#FF6B9D;text-decoration:none">blindbox-creator.vercel.app</a></p>
    </div>
  </div>
</body>
</html>`;

  try {
    await resend.emails.send({
      from: "Blind Box Generator <noreply@blindbox-creator.vercel.app>",
      to: email,
      subject: "🎉 Your kawaii templates are ready!",
      html,
    });
    console.log("[resend] Order confirmation sent to:", email);
  } catch (error) {
    console.error("[resend] Failed to send order confirmation:", error);
  }
}
