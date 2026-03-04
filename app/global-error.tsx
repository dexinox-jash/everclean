"use client";

/**
 * Global Error Boundary
 * V2.0 Infrastructure - Sentry Integration
 */

import * as Sentry from "@sentry/nextjs";
import Error from "next/error";
import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className="font-serif text-4xl text-stone-900 mb-4">
              Something went wrong
            </h1>
            <p className="text-stone-600 mb-8">
              We apologize for the inconvenience. Our team has been notified and is working to resolve the issue.
            </p>
            <a
              href="/"
              className="inline-flex items-center justify-center bg-navy-900 text-white px-8 py-3 hover:bg-navy-800 transition-colors"
            >
              Return Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
