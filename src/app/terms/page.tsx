import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${SITE_NAME}. Read our terms covering digital product sales, subscriptions, usage rights, and more.`,
};

export default function TermsPage() {
  const lastUpdated = "February 12, 2026";

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Last updated: {lastUpdated}
        </p>

        <div className="mt-10 space-y-10 text-gray-700 leading-relaxed">
          {/* 1. Acceptance */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              1. Acceptance of Terms
            </h2>
            <p className="mt-3">
              By accessing or using {SITE_NAME} ({SITE_URL}), you agree to be
              bound by these Terms of Service. If you do not agree to these
              terms, do not use our service.
            </p>
          </section>

          {/* 2. Service Description */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              2. Service Description
            </h2>
            <p className="mt-3">
              {SITE_NAME} provides digital paper blind box templates, party
              kits, classroom bundles, and an AI-powered character generator.
              All products are delivered as downloadable digital files (PDF,
              PNG, or similar formats) intended for personal printing and
              assembly.
            </p>
          </section>

          {/* 3. Digital Product Sales */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              3. Digital Product Sales
            </h2>
            <p className="mt-3">
              All sales of digital products are <strong>final and non-refundable</strong>.
              Because our products are instantly delivered digital downloads,
              we cannot offer refunds once a purchase is completed and the
              download link has been provided.
            </p>
            <p className="mt-3">
              If you experience a technical issue preventing you from
              downloading your purchase (corrupted file, broken download
              link), contact us within 7 days and we will provide a
              replacement download.
            </p>
            <p className="mt-3">
              Prices are listed in US Dollars (USD). We reserve the right to
              change pricing at any time, but changes will not affect
              previously completed purchases.
            </p>
          </section>

          {/* 4. Subscriptions */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              4. Subscription Terms
            </h2>
            <p className="mt-3">
              Subscription plans (Free Explorer, Founding Creator, Founding
              Pro) provide access to the AI Generator and additional features
              as described on our pricing page.
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-2">
              <li>
                <strong>Auto-Renewal:</strong> Paid subscriptions automatically
                renew at the end of each billing period (monthly or annually)
                unless canceled before the renewal date.
              </li>
              <li>
                <strong>Cancellation:</strong> You may cancel your subscription
                at any time through your account settings or by contacting us.
                Cancellation takes effect at the end of the current billing
                period. No partial refunds are issued for unused time.
              </li>
              <li>
                <strong>Founding Member Pricing:</strong> If you subscribe during
                our founding member period, your discounted rate is locked in
                for as long as your subscription remains active and in good
                standing. If you cancel and later re-subscribe, the founding
                rate is not guaranteed.
              </li>
              <li>
                <strong>Free Tier:</strong> The Free Explorer tier may be
                modified or discontinued at any time. We will provide
                reasonable notice before removing free tier access.
              </li>
            </ul>
          </section>

          {/* 5. Usage Rights */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              5. Usage Rights & Licensing
            </h2>
            <p className="mt-3">
              When you purchase a digital product or subscribe to our service,
              you receive a license to use the content as follows:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-2">
              <li>
                <strong>Standard License (Individual Purchases & Creator Tier):</strong>{" "}
                You may print, assemble, and use the templates for personal,
                non-commercial purposes. This includes home use, personal
                gifts, and personal party or classroom use. You may not resell,
                redistribute, or sublicense the digital files.
              </li>
              <li>
                <strong>Pro License (Pro Tier):</strong> You may use the
                templates for commercial purposes including reselling assembled
                physical products, using them in paid party planning services,
                or incorporating them into paid educational programs. You may
                not resell or redistribute the raw digital template files
                themselves.
              </li>
              <li>
                <strong>Classroom Bundles:</strong> Licensed for use within a
                single classroom or educational setting. Redistribution outside
                the purchasing institution is not permitted.
              </li>
            </ul>
          </section>

          {/* 6. COPPA Compliance */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              6. Age Requirements & COPPA Compliance
            </h2>
            <p className="mt-3">
              {SITE_NAME} is designed for use by parents, guardians, educators,
              and other adults. Our service is <strong>not directed at children
              under 13</strong>. We do not knowingly collect personal information
              from children under the age of 13 in compliance with the
              Children&apos;s Online Privacy Protection Act (COPPA).
            </p>
            <p className="mt-3">
              All purchases must be made by an adult (18 years or older) or by
              a minor with verifiable parental/guardian consent. If you are a
              parent or guardian and believe your child under 13 has provided
              personal information to us, please contact us immediately and we
              will delete that information.
            </p>
          </section>

          {/* 7. Intellectual Property */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              7. Intellectual Property
            </h2>
            <p className="mt-3">
              All content on {SITE_NAME}, including but not limited to template
              designs, character artwork, website design, logos, and text, is
              owned by {SITE_NAME} or its licensors and is protected by
              copyright and intellectual property laws.
            </p>
            <p className="mt-3">
              AI-generated content created through our generator is licensed to
              you according to your subscription tier (see Section 5). We
              retain the right to use anonymized, aggregated data about
              generation patterns to improve our service.
            </p>
            <p className="mt-3">
              You may not copy, modify, distribute, sell, or lease any part of
              our service or included software, nor may you reverse engineer or
              attempt to extract the source code of our software.
            </p>
          </section>

          {/* 8. User Conduct */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              8. User Conduct
            </h2>
            <p className="mt-3">You agree not to:</p>
            <ul className="mt-3 list-disc pl-6 space-y-2">
              <li>Use the AI generator to create offensive, harmful, or inappropriate content</li>
              <li>Attempt to circumvent usage limits or access controls</li>
              <li>Share your account credentials with unauthorized users</li>
              <li>Use automated tools to scrape or bulk-download content</li>
              <li>Misrepresent our templates as your own original work for the purpose of reselling the digital files</li>
            </ul>
            <p className="mt-3">
              Violation of these rules may result in account suspension or
              termination without refund.
            </p>
          </section>

          {/* 9. Limitation of Liability */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              9. Limitation of Liability
            </h2>
            <p className="mt-3">
              {SITE_NAME} is provided &quot;as is&quot; and &quot;as available&quot; without
              warranties of any kind, either express or implied.
            </p>
            <p className="mt-3">
              To the maximum extent permitted by law, {SITE_NAME} and its
              operators shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages, including but not
              limited to loss of profits, data, or use, arising out of or
              related to your use of our service.
            </p>
            <p className="mt-3">
              Our total liability for any claim arising from your use of the
              service shall not exceed the amount you paid us in the 12 months
              preceding the claim.
            </p>
          </section>

          {/* 10. Termination */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              10. Termination
            </h2>
            <p className="mt-3">
              We may suspend or terminate your access to the service at any
              time for violations of these terms, with or without notice. Upon
              termination, your right to use the service ceases immediately,
              but licenses for previously purchased and downloaded digital
              products remain valid according to their original terms.
            </p>
          </section>

          {/* 11. Affiliate Program */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              11. Affiliate Program
            </h2>
            <p className="mt-3">
              {SITE_NAME} offers an affiliate program allowing users to earn
              commissions by referring new customers. By participating, you agree
              to the following:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-2">
              <li>
                <strong>Commission Rate:</strong> Affiliates earn 50% commission
                on qualifying sales made through their unique referral link.
                Commission rates may change with 30 days&apos; notice.
              </li>
              <li>
                <strong>Cookie Duration:</strong> Referral cookies last 30 days
                from the initial click. Sales attributed after the cookie
                expires do not qualify for commission.
              </li>
              <li>
                <strong>Self-Referrals:</strong> You may not use your own
                affiliate link to purchase products for yourself. Self-referral
                commissions will be voided.
              </li>
              <li>
                <strong>Prohibited Activities:</strong> Spam, misleading
                advertising, brand impersonation, cookie stuffing, incentivized
                clicks, and paid ads bidding on our brand name are prohibited.
                Violation results in immediate termination and forfeiture of
                unpaid commissions.
              </li>
              <li>
                <strong>Minimum Payout:</strong> Commissions require a minimum
                balance of $20.00 before a withdrawal can be requested.
                New affiliates receive a one-time $10.00 signup bonus
                credited to their account.
                Payouts are processed via PayPal to the email registered with
                your affiliate account within 3 business days.
              </li>
              <li>
                <strong>Termination:</strong> We may terminate your affiliate
                account at any time for any reason. Earned, unpaid commissions
                for legitimate sales will be paid out within 30 days of
                termination.
              </li>
            </ul>
          </section>

          {/* 12. Referral Credits */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              12. Referral Credits & Promotions
            </h2>
            <p className="mt-3">
              Users arriving via a valid referral link may receive a promotional
              credit (e.g., $5) toward their first purchase. These credits are
              subject to the following:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-2">
              <li>
                Credits expire 24 hours after the referral click unless
                otherwise stated.
              </li>
              <li>
                Credits are non-transferable, have no cash value, and cannot be
                combined with other promotional offers.
              </li>
              <li>
                One credit per person. Multiple accounts created to abuse
                credits will result in all associated accounts being banned.
              </li>
              <li>
                We reserve the right to modify, suspend, or discontinue
                promotional credits at any time without notice.
              </li>
              <li>
                Credits are applied at checkout and reduce the purchase total.
                No change or refund is given for unused credit amounts.
              </li>
            </ul>
          </section>

          {/* 13. Cookies & Tracking */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              13. Cookies & Tracking
            </h2>
            <p className="mt-3">
              We use cookies for affiliate referral tracking and promotional
              credit attribution. By using our service, you consent to the
              following cookies:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-2">
              <li>
                <strong>blindbox_ref:</strong> Stores the affiliate referral
                code for attribution (30-day duration).
              </li>
              <li>
                <strong>blindbox_credit:</strong> Stores promotional credit
                information (24-hour duration).
              </li>
            </ul>
            <p className="mt-3">
              Click tracking uses IP address hashing for fraud prevention. We
              do not store raw IP addresses. Hashed values cannot be reversed
              to identify individuals.
            </p>
          </section>

          {/* 14. Changes to Terms */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              14. Changes to These Terms
            </h2>
            <p className="mt-3">
              We may update these terms from time to time. We will notify
              registered users of material changes via email. Continued use of
              the service after changes are posted constitutes acceptance of
              the updated terms.
            </p>
          </section>

          {/* 15. Governing Law */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              15. Governing Law
            </h2>
            <p className="mt-3">
              These terms are governed by and construed in accordance with the
              laws of the United States. Any disputes arising from these terms
              or your use of the service shall be resolved through binding
              arbitration in accordance with applicable rules.
            </p>
          </section>

          {/* 16. Contact */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              16. Contact Us
            </h2>
            <p className="mt-3">
              If you have questions about these Terms of Service, contact us
              at:
            </p>
            <p className="mt-2 font-medium">
              Email:{" "}
              <a
                href="mailto:support@blindboxgenerator.com"
                className="text-blue-600 hover:underline"
              >
                support@blindboxgenerator.com
              </a>
            </p>
            <p className="mt-1 font-medium">
              Or use our{" "}
              <a href="/contact" className="text-blue-600 hover:underline">
                contact form
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
