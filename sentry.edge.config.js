import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://82c19a90a8f3e10be9446abc307108eb@o4507257370968064.ingest.de.sentry.io/4507257380798544",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // ...

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
