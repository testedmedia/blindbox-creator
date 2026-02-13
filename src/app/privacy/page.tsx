import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE_NAME}. Learn how we collect, use, and protect your data. COPPA compliant.`,
};

export default function PrivacyPage() {
  const lastUpdated = "February 11, 2026";

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Last updated: {lastUpdated}
        </p>

        <div className="mt-10 space-y-10 text-gray-700 leading-relaxed">
          {/* Intro */}
          <section>
            <p>
              {SITE_NAME} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates {SITE_URL}. This
              Privacy Policy explains what information we collect, how we use
              it, and your rights regarding your data. We are committed to
              protecting your privacy and complying with applicable data
              protection laws, including the Children&apos;s Online Privacy
              Protection Act (COPPA).
            </p>
          </section>

          {/* 1. Information We Collect */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              1. Information We Collect
            </h2>

            <h3 className="mt-4 text-lg font-medium text-gray-800">
              Information You Provide
            </h3>
            <ul className="mt-2 list-disc pl-6 space-y-2">
              <li>
                <strong>Email Address:</strong> When you join our waitlist,
                create an account, make a purchase, or contact us.
              </li>
              <li>
                <strong>Name:</strong> When you contact us or submit forms on
                our website.
              </li>
              <li>
                <strong>Payment Information:</strong> When you make a purchase.
                Payment details (credit card numbers, billing address) are
                processed directly by Stripe and are never stored on our
                servers.
              </li>
            </ul>

            <h3 className="mt-4 text-lg font-medium text-gray-800">
              Information Collected Automatically
            </h3>
            <ul className="mt-2 list-disc pl-6 space-y-2">
              <li>
                <strong>Usage Data:</strong> Pages visited, time spent on pages,
                and general interaction patterns to help us improve the site.
              </li>
              <li>
                <strong>Device Information:</strong> Browser type, operating
                system, and screen size for compatibility and optimization
                purposes.
              </li>
              <li>
                <strong>IP Address:</strong> Collected automatically by our
                hosting provider for security and analytics purposes.
              </li>
            </ul>
          </section>

          {/* 2. Children's Privacy */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              2. Children&apos;s Privacy (COPPA Compliance)
            </h2>
            <p className="mt-3">
              {SITE_NAME} is a service for parents, guardians, and educators.{" "}
              <strong>
                We do not knowingly collect personal information from children
                under the age of 13.
              </strong>
            </p>
            <p className="mt-3">
              Our website does not require children to provide any personal
              information. All account creation, purchases, and form
              submissions must be completed by a parent, guardian, or other
              adult.
            </p>
            <p className="mt-3">
              If we learn that we have inadvertently collected personal
              information from a child under 13, we will delete that
              information promptly. If you are a parent or guardian and believe
              your child has provided personal information to us, please
              contact us immediately at{" "}
              <a
                href="mailto:privacy@blindboxgenerator.com"
                className="text-blue-600 hover:underline"
              >
                privacy@blindboxgenerator.com
              </a>
              .
            </p>
          </section>

          {/* 3. How We Use Your Data */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              3. How We Use Your Information
            </h2>
            <ul className="mt-3 list-disc pl-6 space-y-2">
              <li>
                <strong>Order Fulfillment:</strong> To process purchases and
                deliver digital downloads.
              </li>
              <li>
                <strong>Account Management:</strong> To manage your subscription
                and provide access to paid features.
              </li>
              <li>
                <strong>Communication:</strong> To send order confirmations,
                important service updates, and (with your consent) marketing
                emails. You can unsubscribe from marketing emails at any time.
              </li>
              <li>
                <strong>Service Improvement:</strong> To understand how our site
                is used and make it better.
              </li>
              <li>
                <strong>Security:</strong> To detect and prevent fraud, abuse,
                and unauthorized access.
              </li>
            </ul>
          </section>

          {/* 4. Third-Party Services */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              4. Third-Party Services
            </h2>
            <p className="mt-3">
              We use the following third-party services to operate {SITE_NAME}:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-2">
              <li>
                <strong>Stripe</strong> (payments): Processes all payment
                transactions. Stripe collects and processes your payment
                information according to their own{" "}
                <a
                  href="https://stripe.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Privacy Policy
                </a>
                . We never see or store your full credit card number.
              </li>
              <li>
                <strong>Supabase</strong> (database): Stores account data,
                orders, and waitlist information. Data is encrypted at rest and
                in transit.
              </li>
              <li>
                <strong>Vercel</strong> (hosting): Hosts our website and
                serverless functions. Vercel may collect IP addresses and
                request metadata as part of standard web hosting. See their{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Privacy Policy
                </a>
                .
              </li>
            </ul>
            <p className="mt-3">
              We do not sell, rent, or trade your personal information to any
              third party for marketing purposes.
            </p>
          </section>

          {/* 5. Cookies */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              5. Cookies
            </h2>
            <p className="mt-3">
              We use minimal, functional cookies only. Specifically:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-2">
              <li>
                <strong>Session Cookies:</strong> To maintain your login state
                if you have an account. These expire when you close your
                browser or after a set period.
              </li>
              <li>
                <strong>Preference Cookies:</strong> To remember your settings
                (such as theme preference). These are stored locally and do
                not track you across other sites.
              </li>
            </ul>
            <p className="mt-3">
              We do <strong>not</strong> use third-party tracking cookies,
              advertising cookies, or social media tracking pixels. We do not
              participate in cross-site tracking or behavioral advertising.
            </p>
          </section>

          {/* 6. Data Retention */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              6. Data Retention
            </h2>
            <p className="mt-3">
              We retain your personal information only for as long as necessary
              to fulfill the purposes described in this policy:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-2">
              <li>
                <strong>Account data:</strong> Retained while your account is
                active. Deleted within 30 days of account deletion request.
              </li>
              <li>
                <strong>Order records:</strong> Retained for 7 years for tax and
                legal compliance purposes.
              </li>
              <li>
                <strong>Waitlist emails:</strong> Retained until you unsubscribe
                or request removal.
              </li>
              <li>
                <strong>Contact form submissions:</strong> Retained for up to 1
                year, then deleted.
              </li>
            </ul>
          </section>

          {/* 7. Your Rights */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              7. Your Rights
            </h2>
            <p className="mt-3">You have the right to:</p>
            <ul className="mt-3 list-disc pl-6 space-y-2">
              <li>
                <strong>Access:</strong> Request a copy of the personal data we
                hold about you.
              </li>
              <li>
                <strong>Correction:</strong> Request correction of inaccurate
                personal data.
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your personal
                data (subject to legal retention requirements).
              </li>
              <li>
                <strong>Opt-Out:</strong> Unsubscribe from marketing
                communications at any time.
              </li>
              <li>
                <strong>Data Portability:</strong> Request your data in a
                commonly used, machine-readable format.
              </li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at{" "}
              <a
                href="mailto:privacy@blindboxgenerator.com"
                className="text-blue-600 hover:underline"
              >
                privacy@blindboxgenerator.com
              </a>
              . We will respond within 30 days.
            </p>
          </section>

          {/* 8. Security */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              8. Data Security
            </h2>
            <p className="mt-3">
              We implement industry-standard security measures to protect your
              data, including HTTPS encryption for all data in transit,
              encrypted database storage, and secure authentication practices.
              However, no method of transmission over the internet is 100%
              secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* 9. Changes */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              9. Changes to This Policy
            </h2>
            <p className="mt-3">
              We may update this Privacy Policy from time to time. We will
              notify registered users of material changes via email and update
              the &quot;Last updated&quot; date at the top of this page. We encourage
              you to review this policy periodically.
            </p>
          </section>

          {/* 10. Contact */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              10. Contact Us
            </h2>
            <p className="mt-3">
              For privacy-related questions or requests, contact us at:
            </p>
            <p className="mt-2 font-medium">
              Email:{" "}
              <a
                href="mailto:privacy@blindboxgenerator.com"
                className="text-blue-600 hover:underline"
              >
                privacy@blindboxgenerator.com
              </a>
            </p>
            <p className="mt-1 font-medium">
              Or use our{" "}
              <a href="/contact" className="text-blue-600 hover:underline">
                contact form
              </a>{" "}
              and select &quot;Privacy&quot; as the subject.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
