import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV || "development",

  // Performance: Traces
  tracesSampleRate: 0.2,

  // Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Profiling (browser)
  profileSessionSampleRate: 0.1,
  profileLifecycle: "trace",

  // Structured Logging
  enableLogs: true,

  sendDefaultPii: false,

  integrations: [
    Sentry.replayIntegration(),
    Sentry.browserProfilingIntegration(),
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ],
});
