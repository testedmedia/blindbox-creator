import * as Sentry from "@sentry/nextjs";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
import { openAIIntegration } from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV || "development",

  // Performance: Traces
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,

  // Structured Logging
  enableLogs: true,

  sendDefaultPii: false,

  integrations: [
    nodeProfilingIntegration(),
    openAIIntegration(),
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ],
});
