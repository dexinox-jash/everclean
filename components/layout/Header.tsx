"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/booking", label: "Book Now" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[var(--color-pure)]/95 backdrop-blur-md shadow-luxury"
          : "bg-transparent"
      }`}
    >
      <div className="container-luxury">
        <nav className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <span
              className={`font-serif text-xl md:text-2xl font-medium tracking-tight transition-colors duration-300 ${
                isScrolled ? "text-navy-700" : "text-[var(--color-ivory)]"
              }`}
            >
              Everclean
            </span>
            <span
              className={`hidden sm:block text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                isScrolled ? "text-stone-light" : "text-[var(--color-ivory)]/70"
              }`}
            >
              Luxury Services
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors duration-300 group ${
                  isScrolled
                    ? "text-stone hover:text-gold-500"
                    : "text-[var(--color-ivory)] hover:text-[var(--color-gold-400)]"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full ${
                    isScrolled ? "bg-gold-500" : "bg-[var(--color-gold-400)]"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="tel:+15195550123"
              className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
                isScrolled
                  ? "text-stone hover:text-gold-500"
                  : "text-[var(--color-ivory)] hover:text-[var(--color-gold-400)]"
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>(519) 555-0123</span>
            </a>
            <Link
              href="/booking"
              className={`inline-flex items-center px-6 py-2.5 text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                isScrolled
                  ? "bg-navy-700 text-[var(--color-ivory)] hover:bg-navy-800"
                  : "bg-[var(--color-gold-500)] text-navy-900 hover:bg-[var(--color-gold-400)]"
              }`}
            >
              Reserve Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors duration-300 ${
              isScrolled ? "text-navy-700" : "text-[var(--color-ivory)]"
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="lg:hidden bg-[var(--color-pure)] border-t border-[var(--color-border)]"
          >
            <div className="container-luxury py-6">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-medium text-stone hover:text-gold-500 transition-colors py-2"
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="border-[var(--color-border)] my-2" />
                <a
                  href="tel:+15195550123"
                  className="flex items-center gap-2 text-stone hover:text-gold-500 transition-colors py-2"
                >
                  <Phone className="w-5 h-5" />
                  <span>(519) 555-0123</span>
                </a>
                <Link
                  href="/booking"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium uppercase tracking-wider bg-navy-700 text-[var(--color-ivory)] hover:bg-navy-800 transition-colors mt-2"
                >
                  Reserve Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
