"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";

const footerLinks = {
  services: [
    { label: "Estate Cleaning", href: "/services#estate" },
    { label: "Concierge Maintenance", href: "/services#concierge" },
    { label: "Pre-Event Preparation", href: "/services#event" },
    { label: "Gift Cards", href: "/gift-cards" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about#team" },
    { label: "Careers", href: "/contact?subject=careers" },
    { label: "Press", href: "/contact?subject=press" },
  ],
  support: [
    { label: "Client Portal", href: "/portal" },
    { label: "FAQs", href: "/faqs" },
    { label: "Cancellation Policy", href: "/terms#cancellation" },
    { label: "Contact Concierge", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-[var(--color-ivory)]">
      {/* Main Footer */}
      <div className="container-luxury section-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <span className="font-serif text-2xl font-medium">Everclean</span>
              <span className="block text-xs uppercase tracking-[0.2em] text-[var(--color-ivory)]/60 mt-1">
                Luxury Services
              </span>
            </Link>
            <p className="text-[var(--color-ivory)]/70 text-sm leading-relaxed mb-6 max-w-sm">
              Waterloo Region&apos;s premier white-glove cleaning and estate care service. 
              Discretion, excellence, and meticulous attention to detail since 2020.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-flex items-center px-3 py-1 text-xs bg-[var(--color-ivory)]/10 text-[var(--color-ivory)]/80">
                $5M Insured
              </span>
              <span className="inline-flex items-center px-3 py-1 text-xs bg-[var(--color-ivory)]/10 text-[var(--color-ivory)]/80">
                Bonded
              </span>
              <span className="inline-flex items-center px-3 py-1 text-xs bg-[var(--color-ivory)]/10 text-[var(--color-ivory)]/80">
                Vetted Staff
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-ivory)]/60 hover:text-gold-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-ivory)]/60 hover:text-gold-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-ivory)]/60 hover:text-gold-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold-500 mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-ivory)]/70 hover:text-[var(--color-ivory)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold-500 mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-ivory)]/70 hover:text-[var(--color-ivory)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold-500 mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-ivory)]/70 hover:text-[var(--color-ivory)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold-500 mb-4">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+15195550123"
                  className="flex items-center gap-2 text-sm text-[var(--color-ivory)]/70 hover:text-[var(--color-ivory)] transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold-500" />
                  <span>(519) 555-0123</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:concierge@everclean.ca"
                  className="flex items-center gap-2 text-sm text-[var(--color-ivory)]/70 hover:text-[var(--color-ivory)] transition-colors"
                >
                  <Mail className="w-4 h-4 text-gold-500" />
                  <span>concierge@everclean.ca</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-[var(--color-ivory)]/70">
                <MapPin className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                <span>Waterloo Region, Ontario</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--color-ivory)]/10">
        <div className="container-luxury py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[var(--color-ivory)]/50">
              &copy; {currentYear} Everclean Luxury Services. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-[var(--color-ivory)]/50 hover:text-[var(--color-ivory)]/80 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
