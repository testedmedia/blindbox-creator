import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Document-Policy",
            value: "js-profiling",
          },
        ],
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  org: "tested-media",
  project: "blindbox-creator",
  silent: !process.env.CI,
  authToken: process.env.SENTRY_AUTH_TOKEN, // read at build time only for source map upload
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  disableLogger: true,
  automaticVercelMonitors: true,
});
