"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Loader2, AlertCircle } from "lucide-react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");
  
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/portal";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("email", {
        email,
        callbackUrl,
        redirect: false,
      });

      if (result?.error) {
        setError("Failed to send login link. Please try again.");
      } else {
        setIsSent(true);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8 text-navy-900" />
        </div>
        <h1 className="font-serif text-3xl text-[var(--color-ivory)] mb-4">
          Check Your Email
        </h1>
        <p className="text-light-tertiary mb-8">
          We&apos;ve sent a magic link to <strong>{email}</strong>. Click the link to sign in to your client portal.
        </p>
        <Link
          href="/"
          className="text-gold-500 hover:text-gold-400 transition-colors"
        >
          Return to Homepage
        </Link>
      </motion.div>
    );
  }

  return (
    <>
      <h1 className="font-serif text-2xl text-stone mb-2">Welcome Back</h1>
      <p className="text-text-secondary text-sm mb-8">
        Enter your email to receive a secure login link.
      </p>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 text-red-700 text-sm mb-6">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-stone mb-2">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-[var(--color-border)] focus:border-gold-500 focus:outline-none transition-colors"
            placeholder="you@example.com"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-navy-700 text-[var(--color-ivory)] text-sm font-medium uppercase tracking-wider hover:bg-navy-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Login Link
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-[var(--color-border)] text-center">
        <p className="text-sm text-text-secondary">
          Need help?{" "}
          <Link href="/contact" className="text-gold-600 hover:text-gold-700">
            Contact Concierge
          </Link>
        </p>
      </div>
    </>
  );
}

export default function PortalLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        {/* Logo */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block">
            <span className="font-serif text-3xl text-[var(--color-ivory)]">Everclean</span>
            <span className="block text-xs uppercase tracking-[0.2em] text-light-muted mt-1">
              Client Portal
            </span>
          </Link>
        </div>

        {/* Login Form */}
        <div className="bg-[var(--color-ivory)] p-8 md:p-10">
          <Suspense fallback={
            <div className="text-center py-8">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-gold-500" />
            </div>
          }>
            <LoginForm />
          </Suspense>
        </div>

        <p className="text-center mt-8 text-sm text-light-muted">
          &copy; {new Date().getFullYear()} Everclean Luxury Services
        </p>
      </motion.div>
    </div>
  );
}
